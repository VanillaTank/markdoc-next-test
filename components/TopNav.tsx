import React from 'react';
import Link from 'next/link';

export function TopNav({ children }) {
    return (
        <nav className='fixed top-0 w-full z-[100] flex items-center justify-between gap-4 py-4 px-10 bg-[#ffffff] border-b border-solid border-[color:var(--border-color)]'>
            <Link href="/" className="flex">
                Home
            </Link>
            <section className='items-center flex gap-4 p-0'>
                {children}
            </section>
        </nav>
    );
}
