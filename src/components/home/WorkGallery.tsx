import { useRef, useEffect, useState } from "react";
import SectionTitle from "../common/SectionTitle";

// Auto-detect all images — just drop files in /public/images/work/ and rebuild
const workImages = import.meta.glob("/public/images/work/*.{jpg,jpeg,png,JPG,PNG}", { eager: true, query: "?url", import: "default" });
const photos = Object.values(workImages).map((url) => ({
  src: url as string,
}));

export default function WorkGallery() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);

  useEffect(() => {
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
  }, [paused]);

  const Card = ({ src }: { src: string }) => (
    <div className="flex-shrink-0 w-[200px] sm:w-[240px] lg:w-[280px] group">
      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-card border border-navy-700 group-hover:border-cyan-500/30 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
        <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
    </div>
  );

  return (
    <section className="relative py-20 md:py-28 bg-navy-950 overflow-hidden"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <SectionTitle title="工作掠影" subtitle="用镜头记录每一个精准瞬间" />
      </div>
      <div ref={row1Ref} className="flex gap-4 sm:gap-5 px-4 will-change-transform mb-4 sm:mb-6" style={{ transform: "translateX(0)" }}>
        {[...photos, ...photos].map((p, i) => <Card key={`r1-${i}`} src={p.src} />)}
      </div>
      <div ref={row2Ref} className="flex gap-4 sm:gap-5 px-4 will-change-transform" style={{ transform: "translateX(0)" }}>
        {[...photos].reverse().concat([...photos].reverse()).map((p, i) => <Card key={`r2-${i}`} src={p.src} />)}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-navy-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-navy-950 to-transparent pointer-events-none" />
    </section>
  );
}
