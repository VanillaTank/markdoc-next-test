import React from 'react';
import Link from 'next/link';
import { DocSearch } from '@docsearch/react';

function Search() {
    return (
        <div>
            <DocSearch
                appId={'0SNY69OLGK'}
                apiKey={'8d4aec2d9afe6404e555ce51fd7838ee'}
                indexName="test"
            />
        </div>

    );
}

export function TopNav({ children }) {
    return (
        <nav className='fixed top-0 w-full z-[100] flex items-center justify-between gap-4 py-4 px-10 bg-[#ffffff] border-b border-solid border-[color:var(--border-color)]'>
            <Link href="/" className="flex">
                Home
            </Link>
            <section className='items-center flex gap-4 p-0'>
                {children}
                <Search />
            </section>
        </nav>
    );
}
