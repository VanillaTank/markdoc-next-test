import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { pathesToFiles } from '../pathes'


export function SideNav() {

    let items = pathesToFiles;
    const reg = /^\/[-\a-zA-Z]+/;
    const router = useRouter();

    const pathName = router.pathname.match(reg) ? `${router.pathname.match(reg)[0]}` : undefined;
    if (pathName) {
        items = items.filter(item => item.route === pathName);
    }


    return (
        <nav className=" shrink-0 grow-0 basis-[240px] flex-col sticky top-[var(--top-nav-height)] h-screen flex overflow-y-auto pt-10 px-8 pb-8 border-r border-solid border-[color:var(--border-color)]">
            {items.map((item) => (
                <div key={item.title}>
                    <span className='px-2 px-0 text-[18px] font-medium	'>{item.title}</span>
                    <ul className="flex flex-col p-0">
                        {item.links.map((link) => {
                            const active = router.pathname === link.href;
                            return (
                                <li key={link.href} className={`m-0 list-none ${active ? 'underline' : ''}`}>
                                    <Link {...link}>
                                        <a className='no-underline hover:underline active:underline' href={link.href}>{link.children}</a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    );
}
