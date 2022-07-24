import React from 'react';
import Link from 'next/link';

export function TableOfContents({toc}) {
  const items = toc.filter(
    (item) => item.id && (item.level === 2 || item.level === 3)
  );

  if (items.length <= 1) {
    return null;
  }

  return (
    <nav className="toc sticky top-[calc(1.5rem+var(--top-nav-height))] max-h-[calc(100vh-var(--top-nav-height))] flex shrink-0 grow-0 basis-auto self-start mb-4 pt-2 px-0 pb-0 border-l border-solid border-[color:var(--border-color)]">
      <ul className="flex flex-col m-0 py-0 px-6">
        {items.map((item) => {
          const href = `#${item.id}`;
          const active =
            typeof window !== 'undefined' && window.location.hash === href;
          return (
            <li
              key={item.title}
              className={`mt-0 mx-0 mb-4 list-none ${[
                active ? 'active' : undefined,
                item.level === 3 ? 'pl-4' : undefined,
              ]
                .filter(Boolean)
                .join(' ')}`}
            >
              <Link href={href} passHref>
                <a className='no-underline hover:underline active:underline'>{item.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
