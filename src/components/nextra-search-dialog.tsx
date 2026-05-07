'use client'

import {useEffect, useRef, useState} from "react";
import {addBasePath} from 'next/dist/client/add-base-path';
import {useRouter} from "next/navigation";
import {PageItem} from "@/lib/getPagesFromPageMap";
import {SearchIcon} from "lucide-react";
import {Command as CommandPrimitive} from "cmdk";
import {Kbd} from "@/components/ui/kbd";
import {CommandDialog, CommandEmpty, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";

type Props = {
    placeholder?: string;
    pages?: PageItem[];
};
type OnSelect = (url: string) => void;

export function NextraSearchDialog({placeholder = "Search...", pages = []}: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PagefindResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const instanceId = useRef(Math.random().toString()).current;
    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
        if (activeSearchInstances.size > 0) {
            return; // Another instance exists, don't render
        }
        activeSearchInstances.add(instanceId);
        setCanRender(true);

        return () => {
            activeSearchInstances.delete(instanceId);
        };
    }, [instanceId]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (!open) {
            setQuery("");
            setResults([]);
            setError("");
        }
    }, [open]);

    useEffect(() => {
        let active = true;
        const handleSearch = async (value: string) => {
            if (!value) {
                if (!active) return;
                setResults([]);
                setError("");
                setLoading(false);
                return;
            }

            setLoading(true);

            if (!window.pagefind) {
                try {
                    await importPagefind();
                } catch (err) {
                    if (!active) return;
                    setError("Failed to load search index.");
                    setLoading(false);
                    return;
                }
            }

            try {
                const response = await window.pagefind!.debouncedSearch<PagefindResult>(value);
                if (!active) return;
                if (!response) {
                    setResults([]);
                    setLoading(false);
                    return;
                }

                const data = await Promise.all(response.results.map(o => o.data()));

                const processedResults = data.map(newData => ({
                    ...newData,
                    sub_results: (newData.sub_results || []).map(r => {
                        const url = r.url.replace(/\.html$/, '').replace(/\.html#/, '#');
                        return {...r, url};
                    })
                }));

                setResults(processedResults);
                setLoading(false);
                setError("");
            } catch (err) {
                if (!active) return;
                setError("Search failed.");
                setLoading(false);
            }
        };

        handleSearch(query);
        return () => {
            active = false;
        };
    }, [query]);

    if (!canRender) return null;

    const handleResultClick = (url: string) => {
        setOpen(false);
        router.push(url);
    };


    function SearchContent() {
        if (!query) return <SearchWelcomePages pages={pages} onSelect={handleResultClick}/>;
        if (error) return <SearchError message={error}/>;
        if (loading) return <SearchLoading/>;
        if (!results || results.length === 0) return <SearchNoResults/>;
        return <SearchResults results={results} query={query} onSelect={handleResultClick}/>;
    }

    return (
        <>
            <SearchTrigger placeholder={placeholder} onClick={() => setOpen(true)}/>

            <CommandDialog open={open} onOpenChange={setOpen}
                           showCloseButton={false}
                           className="!p-0 !max-w-[720px] !bg-[var(--color-background)] !border !border-[var(--color-border)] !shadow-none !rounded-none [&_[data-slot=command]]:bg-transparent">

                <SearchInput
                    placeholder={placeholder}
                    query={query}
                    onQueryChange={setQuery}
                />

                <CommandList className="h-96 border-t border-[var(--color-border)]" aria-label="Search results list">
                    <SearchContent/>
                </CommandList>

            </CommandDialog>
        </>
    );
}

function SearchWelcomePages(
    {pages = [], onSelect}:
    {
        pages: PageItem[],
        onSelect?: OnSelect
    }) {
    if (pages.length === 0) {
        return null;
    }

    return (
        <CommandGroup heading="Pages">
            {pages.map(({title, url, parent, description}, index) => (
                <SearchItem
                    key={`${url}-${index}`}
                    value={title}
                    title={title}
                    parent={parent}
                    onSelect={() => onSelect(url)}
                    description={description}
                />
            ))}
        </CommandGroup>
    );
}

function SearchInput({
                         placeholder, query, onQueryChange,
                     }: {
    placeholder: string;
    query: string;
    onQueryChange: (value: string) => void;
}) {
    return (
        <div className="flex items-center gap-2 px-4 py-3">
            <SearchIcon className="size-4 shrink-0 text-[var(--color-secondary)]"/>
            <CommandPrimitive.Input
                data-slot="command-input"
                className="flex-1 bg-transparent text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-secondary)] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={query}
                onValueChange={onQueryChange}
            />
        </div>
    )
}


function SearchTrigger({placeholder, onClick}: { placeholder: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex w-full relative items-center gap-2 text-sm cursor-pointer outline-none bg-transparent border-none p-0 text-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
        >
            <SearchIcon className="size-3.5 shrink-0"/>
            <span className="flex-1 text-left">{placeholder}</span>
            <Kbd className="text-[10px] opacity-50"><span>⌘</span>K</Kbd>
        </button>
    );
}

function SearchLoading() {
    return (
        <div className="py-6 text-center text-sm text-[var(--color-secondary)]">
            <div className="inline-block animate-spin h-3.5 w-3.5 border border-[var(--color-border)] border-t-[var(--color-accent)]"></div>
            <span className="ml-2">Searching...</span>
        </div>
    );
}

function SearchError({message}: { message: string }) {
    return (
        <div className="py-6 px-4 text-center text-sm text-[var(--color-secondary)]">
            {message}
        </div>
    );
}

function SearchNoResults() {
    return <CommandEmpty>No results found.</CommandEmpty>;
}

function SearchResultItem({subResult, parentTitle, query, onSelect}: {
    subResult: PagefindResult['sub_results'][0];
    parentTitle: string;
    query: string;
    onSelect: OnSelect
}) {
    const cleanExcerpt = (subResult.excerpt || '').replace(/<[^>]*>/g, '').substring(0, 100);

    return (
        <SearchItem url={subResult.url}
                    title={highlightQuery(subResult.title || '', query)}
                    description={<>{highlightQuery(cleanExcerpt, query)}...</>}
                    onSelect={onSelect}
                    value={`${parentTitle} ${subResult.title}`}
        />
    );
}

function SearchItem({url, title, description, onSelect, value, parent}: {
    url?: string;
    parent?: string;
    title: any | string;
    description: any | string;
    onSelect?: OnSelect;
    value?: string;
}) {
    return (
        <CommandItem onSelect={() => onSelect(url)} value={value} className="cursor-pointer">
            <div className="flex flex-col gap-0.5 w-full">
                <div className="flex items-center gap-1">
                    {parent && (
                        <>
                            <span className="text-xs text-[var(--color-secondary)]">{parent}</span>
                            <span className="text-xs text-[var(--color-border)]">/</span>
                        </>
                    )}
                    <div className="text-sm font-medium text-[var(--color-foreground)]">{title}</div>
                </div>
                <div className="text-xs text-[var(--color-secondary)] leading-relaxed">
                    {description}
                </div>
            </div>
        </CommandItem>
    )
}

function SearchResults({results, query, onSelect}: {
    results: PagefindResult[];
    query: string;
    onSelect: OnSelect
}) {
    return (
        <>
            {results.map((result) => (
                <CommandGroup
                    key={result.url}
                    heading={result.meta.title}
                >
                    {(result.sub_results || []).map((subResult) => (
                        <SearchResultItem
                            key={subResult.url}
                            subResult={subResult}
                            parentTitle={result.meta.title}
                            query={query}
                            onSelect={() => onSelect(subResult.url)}
                        />
                    ))}
                </CommandGroup>
            ))}
        </>
    );
}

function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightQuery(text: string, query: string) {
    if (!query) return text;
    const cleanedQuery = escapeRegExp(query.trim());
    if (!cleanedQuery) return text;
    const regex = new RegExp(`(${cleanedQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        regex.test(part) ? <mark key={index}
                                 className="bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-medium">{part}</mark> : part
    );
}


declare global {
    interface Window {
        pagefind?: {
            debouncedSearch: <T>(query: string, options?: any) => Promise<{
                results: Array<{
                    data: () => Promise<T>;
                }>;
            } | null>;
            options: (options: { baseUrl: string }) => Promise<void>;
        };
    }
}

async function importPagefind() {
    if (window.pagefind) return;
    window.pagefind = await import(
        /* webpackIgnore: true */ addBasePath('/_pagefind/pagefind.js')
        );
    await window.pagefind.options({
        baseUrl: '/'
    });
}

type PagefindResult = {
    excerpt: string;
    meta: {
        title: string;
    };
    raw_url: string;
    sub_results: {
        excerpt: string;
        title: string;
        url: string;
    }[];
    url: string;
};
const activeSearchInstances = new Set<string>();