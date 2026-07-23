import { useState, useCallback, useRef } from 'react';

// Returns [copied, copy]. `copied` flips back to false on its own
// after `resetAfter` ms so callers don't have to manage a timer.
export function useClipboard(resetAfter = 1800) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Safari/old browsers or non-secure contexts: fall back to a
        // hidden textarea + execCommand.
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetAfter);
    },
    [resetAfter]
  );

  return [copied, copy];
}
