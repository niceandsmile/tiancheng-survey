import HeroCarousel from "../components/home/HeroCarousel";
import CompanyIntro from "../components/home/CompanyIntro";
import ServiceHighlights from "../components/home/ServiceHighlights";
import ProjectHighlights from "../components/home/ProjectHighlights";
import WorkGallery from "../components/home/WorkGallery";
import AmapBlock from "../components/map/AmapBlock";
import SectionTitle from "../components/common/SectionTitle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { certificates } from "../data/company";

export default function HomePage() {
  const featuredCerts = certificates;

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

      {/* ===== Certificates — full width ===== */}
      <section className="py-20 md:py-28 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="资质荣誉" subtitle="专业认证，信誉保障" />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredCerts.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-card border border-navy-700 group-hover:border-cyan-500/30 transition-all group-hover:shadow-[0_0_20px_rgba(0,212,255,0.08)]">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain p-3"
                    loading="lazy"
                  />
                </div>
                <p className="text-white text-xs sm:text-sm font-medium mt-2 text-center group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/about"
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
