import React from "react";

const FOOTER_LINKS = [
    {href: '/connect', title: 'Connect'},
    {href: '/uses', title: 'Uses'},
    {href: '/now', title: 'Now'},
    {href: '/colophon', title: 'Colophon'},
    {href: '/stats', title: 'Stats'},
    {href: 'https://github.com/phucbm', title: 'GitHub', external: true},
    {href: '/feed.xml', title: 'RSS'},
]

const CustomFooter = () => {
    return (
        <div className="border-t-hairline pt-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start sm:gap-8 text-sm" data-pagefind-ignore="all">
            <span className="">© {new Date().getFullYear()} Phuc Bui</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-end">
                {FOOTER_LINKS.map(({href, title, external}) => (
                    <a
                        key={href}
                        href={href}
                        className="no-underline text-current hover:text-brand-accent"
                        {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                    >
                        {title}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CustomFooter;
