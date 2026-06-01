import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const B = import.meta.env.BASE_URL;
const slides = [
  { image: `${B}images/carousel/carousel-1.jpg`, title: "精准测绘", subtitle: "勘测无限天地，成就锦绣蓝图" },
  { image: `${B}images/carousel/carousel-2.jpg`, title: "甲级资质", subtitle: "国家高新技术企业 · ISO 四大体系认证" },
  { image: `${B}images/carousel/carousel-3.jpg`, title: "专业团队", subtitle: "63 名员工 · 51 名技术骨干 · 深耕行业十年" },
  { image: `${B}images/carousel/carousel-4.jpg`, title: "服务大湾区", subtitle: "深圳 · 广州 · 惠东 · 白云 · 福州 · 南山 — 覆盖全国"},
  { image: `${B}images/carousel/carousel-5.jpg`, title: "精准求实", subtitle: "勘测无限天地，成就锦绣蓝图" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  // Auto-rotate — continuous, never pauses
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative w-full bg-[#0a101f] aspect-[1/1] sm:aspect-[3/2] md:aspect-[16/9]"
      style={{ maxHeight: "750px", overflow: "hidden" }}
    >
      {/* —— Slide image —— */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#0a101f]"
          style={{ overflow: "hidden" }}
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            fetchPriority={current === 0 ? "high" : undefined}
            loading={current === 0 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover object-center"
            style={{ transform: "scale(1)", maxWidth: "100%", maxHeight: "100%" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* —— Text overlay —— */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 flex items-end pb-8 sm:pb-10 md:pb-12">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            key={`t-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-1 sm:mb-2">
              {slides[current].title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-xl mb-4 sm:mb-6">
              {slides[current].subtitle}
            </p>
            <div className="flex gap-3">
              <Link to="/about" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-cyan-500 text-slate-900 font-semibold text-sm sm:text-base hover:bg-cyan-400 transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                走进天成 &rarr;
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl border border-white/30 text-white font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm">
                了解业务
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* —— Dot indicators —— */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              padding: "6px",
              width: i === current ? 24 : 6,
              height: 6,
              background: i === current ? "#00D4FF" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`第 ${i + 1} 张`}
          />
        ))}
      </div>

      {/* —— Left / Right arrows —— */}
      <button onClick={prev}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
        aria-label="上一张">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={next}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
        aria-label="下一张">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
}
