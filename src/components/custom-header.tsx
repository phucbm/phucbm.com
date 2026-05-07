import React from 'react';
import {Logo} from "@/components/logo";
import Link from 'next/link'
import {ThemeSwitch} from "nextra-theme-blog";
import {NextraSearchDialog} from "@/components/nextra-search-dialog";
import {getPagesFromPageMap} from "@/lib/getPagesFromPageMap";
import {getPageMap} from "nextra/page-map";

const NAV_ITEMS = [
    {href: '/bookmarks', title: 'Bookmarks'},
    {href: '/components', title: 'Components'},
]

const CustomHeader = async () => {
    const pages = await getPagesFromPageMap({pageMap: await getPageMap()})

    return (
        <div className="flex items-center justify-between gap-6" data-pagefind-ignore="all">
            {/*left*/}
            <div className="flex items-center justify-start gap-6">
                <Logo/>
                <nav className="flex gap-4">
                    {NAV_ITEMS.map(({href, title, external}) => (
                        <Link
                            key={href}
                            href={href}
                            className="nav-link text-sm no-underline"
                            {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                        >
                            {title}
                        </Link>
                    ))}
                </nav>
            </div>
            {/*right*/}
            <div className="flex items-center justify-end gap-6">
                <NextraSearchDialog placeholder="Search" pages={pages}/>
                <ThemeSwitch/>
            </div>
        </div>
    );
};

export default CustomHeader;
