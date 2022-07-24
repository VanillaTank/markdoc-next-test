import Prism from 'prismjs';

import * as React from 'react';

export function CodeBlock({children, language}) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false);
  }, [children]);

  return (
    <div className="relative" aria-live="polite">
      <pre
        ref={ref}
        className={`language-${language} rounded-[4px]`}
      >
        {children}
      </pre>
    </div>
  );
}
