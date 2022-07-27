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
                    isAllowShowSearch &&
                    <div
                        onClick={() => setIsAllowShowSearch(false)}
                        className="fixed top-0 bottom-0 left-0 right-0 bg-slate-500/[.6] flex justify-center z-[110] pt-[30px]">

                        <div className="max-w-[500px] w-full">
                            <div
                                className="border bg-white p-8 w-full rounded border-[color:var(--border-color)] max-h-[500px] min-h-[102px]"
                                onClick={(e) => e.stopPropagation()}>
                                <Search/>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </nav>
    );
}
