import { useState, useEffect, useRef, type ImgHTMLAttributes } from "react";

/**
 * Image that only starts loading when within 400px of the viewport.
 * Falls back to a dark placeholder until then.
 */
export default function LazyImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
      {visible ? (
        <img {...props} loading="lazy" decoding="async" fetchPriority="low" />
      ) : (
        <div className="w-full h-full bg-navy-800" />
      )}
    </div>
  );
}
