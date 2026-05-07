import React from 'react';

export function SectionHeader({title}: {title: string}) {
    return (
        <h2 className="section-title mb-6">{title}</h2>
    );
}
