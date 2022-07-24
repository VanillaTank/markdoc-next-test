import * as React from 'react';

export function Callout({ title, children }) {

  return (
    <div className="rounded-[4px] flex flex-col py-[12px] px-[16px] bg-[color:#f6f9fc] border border-solid border-[#dce6e9]">
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  );
}
