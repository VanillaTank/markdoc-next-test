import React, { useState } from 'react';
import Link from 'next/link';
import Search from './Search';

export function TopNav({children}) {

    const [isAllowShowSearch, setIsAllowShowSearch] = useState(false)

    return (
        <nav
            className='fixed top-0 w-full z-[100] flex items-center justify-between gap-4 py-4 px-10 bg-[#ffffff] border-b border-solid border-[color:var(--border-color)]'>
            <Link href="/" className="flex">
                Home
            </Link>
            <section className='items-center flex gap-4 p-0'>
                {children}
                <button type="button" onClick={() => setIsAllowShowSearch(true)}>Search</button>
                {
                    isAllowShowSearch && <Search  isAllowShowSearch={isAllowShowSearch} setIsAllowShowSearch={setIsAllowShowSearch}/>

                }
            </section>
        </nav>
    );
}
