import { useState } from "react";
import HeroCarousel from "../components/home/HeroCarousel";
import CompanyIntro from "../components/home/CompanyIntro";
import ServiceHighlights from "../components/home/ServiceHighlights";
import ProjectHighlights from "../components/home/ProjectHighlights";
import WorkGallery from "../components/home/WorkGallery";
import AmapBlock from "../components/map/AmapBlock";
import SectionTitle from "../components/common/SectionTitle";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { certificates, patents, commendations } from "../data/company";
import LazyImage from "../components/common/LazyImage";

const TABS = [
  { key: "certs", label: "资质证书" },
  { key: "patents", label: "专利技术" },
  { key: "letters", label: "客户表扬" },
] as const;

export default function HomePage() {
  const [tab, setTab] = useState<string>("certs");

  const currentItems = tab === "certs" ? certificates.slice(0, 8) : tab === "patents" ? patents : commendations;

  return (
    <main>
      {/* ===== Hero Carousel (full screen) ===== */}
      <HeroCarousel />

      {/* ===== Company Intro ===== */}
      <CompanyIntro />

      {/* ===== Service Highlights ===== */}
      <ServiceHighlights />

      {/* ===== Project Carousel ===== */}
      <ProjectHighlights />

      {/* ===== Work Gallery ===== */}
      <WorkGallery />

      {/* ===== Certificates — tabs: 资质 / 专利 / 表扬 ===== */}
      <section className="py-20 md:py-28 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="资质荣誉" subtitle="专业认证，技术实力，客户信赖" />

          {/* Tab switcher */}
          <div className="mt-10 flex justify-center gap-2 sm:gap-4">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === t.key
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,212,255,0.1)]"
                    : "text-slate-400 hover:text-white border border-transparent hover:border-navy-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid with animated switch */}
          <div className="mt-10 relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {currentItems.map((item: any, i: number) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="group"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-card border border-navy-700 group-hover:border-cyan-500/30 transition-all group-hover:shadow-[0_0_20px_rgba(0,212,255,0.08)]">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                    <p className="text-white text-xs sm:text-sm font-medium mt-2 text-center group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/about#certificates"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-400 text-sm hover:bg-cyan-500/10 transition-all"
            >
              查看全部资质 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Map ===== */}
      <section className="py-20 md:py-28 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="公司位置" subtitle="深圳市龙岗区龙城大道177号荔园大楼4F" />
          <div className="mt-12">
            <AmapBlock className="h-[250px] sm:h-[450px]" />
          </div>
        </div>
      </section>
    </main>
  );
}
