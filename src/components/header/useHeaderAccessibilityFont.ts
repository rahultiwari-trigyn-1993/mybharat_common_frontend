import { useEffect } from 'react';
import { installHeaderAccessibilityFont } from './headerAccessibilityFont';

/** Binds gov-strip font size controls (`#increasetext`, `#decreasetext`, `#resettext`). */
export function useHeaderAccessibilityFont(enabled = true): void {
  useEffect(() => {
    if (!enabled) return undefined;
    return installHeaderAccessibilityFont();
  }, [enabled]);
}

export default useHeaderAccessibilityFont;
