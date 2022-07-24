import React from 'react';
import Link from 'next/link';

export function AppLink(props) {
    const target = props.href.startsWith('http') ? '_blank' : undefined;
    return (
        <Link href={props.href}>
            <a className='text-[color:green]' title={props.title} target={target}>{props.children}</a>
        </Link>
    );
}