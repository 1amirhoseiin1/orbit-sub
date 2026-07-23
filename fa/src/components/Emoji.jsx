import { useEffect, useRef } from 'react';
import twemoji from 'twemoji';

// Windows doesn't draw regional-indicator flag emoji as icons - it falls
// back to plain letter pairs (DE, NL, ...). Twemoji swaps the raw emoji
// character for a small SVG so flags look the same on every OS.
export default function Emoji({ children, size = 20 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    twemoji.parse(ref.current, {
      folder: 'svg',
      ext: '.svg',
      className: 'twemoji-emoji-inline',
      base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/'
    });
  }, [children]);

  return (
    <span
      ref={ref}
      className="inline-flex items-center align-middle"
      style={{ '--twemoji-size': `${size}px` }}
    >
      {children}
    </span>
  );
}
