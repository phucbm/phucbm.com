import React from 'react';
import Link from 'next/link';

export function ProjectItem({title, href, description}: {title: string; href: string; description: string}) {
    return (
        <li>
            <Link href={href} className="title-link">{title}</Link>
            <p className="description">{description}</p>
        </li>
    );
}
