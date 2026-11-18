import React from 'react';
import {Logo} from "@/components/logo";
import Link from 'next/link'
import {ThemeSwitch} from "nextra-theme-blog";
import {NextraSearchDialog} from "@/components/nextra-search-dialog";
import {getPagesFromPageMap} from "@/lib/getPagesFromPageMap";
import {getPageMap} from "nextra/page-map";
import {MobileMenu} from "@/components/mobile-menu";

const NAV_ITEMS: { href: string; title: string; external?: boolean }[] = [
    {href: '/bookmarks', title: 'Bookmarks'},
    {href: '/components', title: 'Components'},
]

const CustomHeader = async () => {
    const pages = await getPagesFromPageMap({pageMap: await getPageMap()})

    return (
        <div className="flex items-center justify-between gap-4 sm:gap-6" data-pagefind-ignore="all">
            {/*left*/}
            <div className="flex items-center justify-start gap-4 sm:gap-6">
                <Logo/>
                <nav className="hidden sm:flex gap-4">
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
            <div className="flex items-center justify-end gap-3 sm:gap-6">
                <NextraSearchDialog placeholder="Search" pages={pages}/>
                <div className="hidden sm:flex"><ThemeSwitch/></div>
                <MobileMenu navItems={NAV_ITEMS}/>
            </div>
        </div>
    );
};

export default CustomHeader;
