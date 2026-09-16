import { useEffect } from 'react';

/**
 * useKeyboardShortcut: Hook to listen for key combos (e.g. Ctrl+K, Meta+K, Escape)
 */
export const useKeyboardShortcut = (key, callback, options = { ctrlKey: false, metaKey: false }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();
      const isCtrlMatch = options.ctrlKey ? event.ctrlKey || event.metaKey : true;
      const isMetaMatch = options.metaKey ? event.metaKey : true;

      if (isKeyMatch && isCtrlMatch && isMetaMatch) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, options]);
};
