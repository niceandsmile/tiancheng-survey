import { useRef, useEffect, useState } from "react";
import SectionTitle from "../common/SectionTitle";

const workModules = import.meta.glob("/public/images/work/*.{jpg,jpeg,png,JPG,PNG}", { eager: true, query: "?url", import: "default" });

const allPhotos = Object.entries(workModules)
  .map(([path, url]) => ({ src: url as string, name: path.split("/").pop() || "" }))
  .sort((a, b) => {
    // work-new 排最前面
    const aNew = a.name.startsWith("work-new");
    const bNew = b.name.startsWith("work-new");
    if (aNew && !bNew) return -1;
    if (!aNew && bNew) return 1;
    return a.name.localeCompare(b.name);
  });

// Split into two rows
const half = Math.ceil(allPhotos.length / 2);
const row1Photos = allPhotos.slice(0, half);
const row2Photos = allPhotos.slice(half);

export default function WorkGallery() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const set1Ref = useRef(0);
  const set2Ref = useRef(0);

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

  // Measure one full set width for each row
  useEffect(() => {
    if (!visible) return;
    const measure = () => {
      [row1Ref, row2Ref].forEach((ref, idx) => {
        if (!ref.current) return;
        const kids = ref.current.children;
        const halfCount = kids.length / 2;
        let w = 0;
        for (let i = 0; i < halfCount; i++) {
          const el = kids[i] as HTMLElement;
          w += el.offsetWidth;
          if (i < halfCount - 1) w += parseFloat(getComputedStyle(ref.current).gap) || 20;
        }
        if (idx === 0) set1Ref.current = w;
        else set2Ref.current = w;
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible]);

  // Scroll: row1 → right, row2 → left
  useEffect(() => {
    if (!visible) return;
    let id: number;
    const animate = () => {
      if (!paused) {
        offset1Ref.current += 1.0;
        offset2Ref.current += 0.95;
        if (set1Ref.current > 0 && offset1Ref.current >= set1Ref.current) offset1Ref.current -= set1Ref.current;
        if (set2Ref.current > 0 && offset2Ref.current >= set2Ref.current) offset2Ref.current -= set2Ref.current;
        if (row1Ref.current) row1Ref.current.style.transform = `translateX(${-offset1Ref.current}px)`;
        if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-offset2Ref.current}px)`;
      }
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [paused, visible]);

  const PhotoCard = ({ photo: p }: { photo: { src: string; name: string } }) => (
    <div className="flex-shrink-0 w-[220px] sm:w-[260px] group">
      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-card border border-navy-700 group-hover:border-cyan-500/30 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
        {visible ? (
          <img src={p.src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
        ) : (
          <div className="w-full h-full bg-navy-800 animate-pulse" />
        )}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-navy-950 overflow-hidden"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <SectionTitle title="工作掠影" subtitle="用镜头记录每一个精准瞬间" />
      </div>

      {/* Row 1 */}
      <div className="relative mb-4 sm:mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />
        <div ref={row1Ref} className="flex gap-3 sm:gap-5 px-4 sm:px-8 will-change-transform" style={{ transform: "translateX(0)" }}>
          {[...row1Photos, ...row1Photos].map((p, i) => <PhotoCard key={`r1-${p.name}-${i}`} photo={p} />)}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />
        <div ref={row2Ref} className="flex gap-3 sm:gap-5 px-4 sm:px-8 will-change-transform" style={{ transform: "translateX(0)" }}>
          {[...row2Photos, ...row2Photos].map((p, i) => <PhotoCard key={`r2-${p.name}-${i}`} photo={p} />)}
        </div>
      </div>
    </section>
  );
}
