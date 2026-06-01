import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import { certificates } from "../data/company";

interface Props {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function CertificatesSection({ title = "资质证书", subtitle = "权威认证，信誉保证", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  // IntersectionObserver — only load when section nears viewport
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

  // Progressive reveal — 3 images every 200ms
  useEffect(() => {
    if (!visible || count >= certificates.length) return;
    const t = setInterval(() => {
      setCount((p) => Math.min(p + 3, certificates.length));
    }, 200);
    return () => clearInterval(t);
  }, [visible, count]);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={i < count ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-card border border-navy-700 group-hover:border-cyan-500/30 transition-all group-hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]">
                {i < count ? (
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                ) : (
                  <div className="w-full h-full bg-navy-800" />
                )}
              </div>
              <p className="text-white text-xs sm:text-sm font-medium mt-2 text-center group-hover:text-cyan-400 transition-colors">
                {cert.name}
              </p>
            </motion.div>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
