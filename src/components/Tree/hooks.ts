import { useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';
import ResizeObserver from 'resize-observer-polyfill';

export function usePrevious(value: boolean) {
  const ref = useRef<boolean | null>(null);
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export function useMeasure() {
  const ref = useRef<HTMLElement>(null);
  const [rect, setRect] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => setRect(entry.contentRect)),
  );
  useEffect(() => {
    if (ref.current != null) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ro]);
  return [{ ref }, rect] as const;
}

export function useAnimation(isOpen: boolean, viewHeight: number) {
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
    },
  });
  return { height, opacity, transform };
}
