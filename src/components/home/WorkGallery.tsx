import { useRef, useEffect, useState } from "react";
import SectionTitle from "../common/SectionTitle";

// Auto-detect all images — just drop files in /public/images/work/ and rebuild
const workImages = import.meta.glob("/public/images/work/*.{jpg,jpeg,png,JPG,PNG}", { eager: true, query: "?url", import: "default" });
const allPhotos = Object.values(workImages).map((url) => ({
  src: url as string,
}));

// Shuffle and pick N to reduce simultaneous requests
function pick<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function WorkGallery() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);

  // Pick 18 random photos (reduces load from 140 to 18 base images)
  const [photos] = useState(() => pick(allPhotos, 18));
  const [batches, setBatches] = useState(0); // progressive reveal

  // IntersectionObserver — delay rendering until gallery nears viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "600px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Progressive reveal — load images in batches of 4 every 150ms
  useEffect(() => {
    if (!visible) return;
    if (batches >= photos.length) return;
    const t = setInterval(() => {
      setBatches((p) => {
        const next = p + 4;
        return Math.min(next, photos.length);
      });
    }, 150);
    return () => clearInterval(t);
  }, [visible, batches, photos.length]);

  // Scrolling animation
  useEffect(() => {
    if (!visible) return;
    let id: number;
    const animate = () => {
      if (!paused) {
        offset1Ref.current += 0.8;
        offset2Ref.current -= 0.85;
        if (row1Ref.current) row1Ref.current.style.transform = `translateX(${-offset1Ref.current}px)`;
        if (row2Ref.current) row2Ref.current.style.transform = `translateX(${offset2Ref.current}px)`;
        const w = row1Ref.current?.scrollWidth || 0;
        if (offset1Ref.current >= w / 2) offset1Ref.current = 0;
        if (offset2Ref.current <= -w / 2) offset2Ref.current = 0;
      }
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [paused, visible]);

  const Card = ({ src }: { src: string }) => (
    <div className="flex-shrink-0 w-[200px] sm:w-[240px] lg:w-[280px] group">
      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-card border border-navy-700 group-hover:border-cyan-500/30 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
        {visible ? (
          <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" fetchPriority="low" />
        ) : (
          <div className="w-full h-full bg-navy-800" />
        )}
      </div>
    </div>
  );

  // Progressive: only show images up to the current batch
  const revealed = visible ? photos.slice(0, batches) : [];
  const row1 = visible ? [...revealed, ...revealed] : Array.from({ length: 6 }, () => ({ src: "", _placeholder: true }));
  const row2 = visible ? [...revealed].reverse().concat([...revealed].reverse()) : Array.from({ length: 6 }, () => ({ src: "", _placeholder: true }));

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-navy-950 overflow-hidden"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <SectionTitle title="工作掠影" subtitle="用镜头记录每一个精准瞬间" />
      </div>
      <div ref={row1Ref} className="flex gap-4 sm:gap-5 px-4 will-change-transform mb-4 sm:mb-6" style={{ transform: "translateX(0)" }}>
        {row1.map((p: any, i) => <Card key={`r1-${i}`} src={p.src} />)}
      </div>
      <div ref={row2Ref} className="flex gap-4 sm:gap-5 px-4 will-change-transform" style={{ transform: "translateX(0)" }}>
        {row2.map((p: any, i) => <Card key={`r2-${i}`} src={p.src} />)}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-navy-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-navy-950 to-transparent pointer-events-none" />
    </section>
  );
}
