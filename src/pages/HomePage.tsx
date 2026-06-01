import HeroCarousel from "../components/home/HeroCarousel";
import CompanyIntro from "../components/home/CompanyIntro";
import ServiceHighlights from "../components/home/ServiceHighlights";
import ProjectHighlights from "../components/home/ProjectHighlights";
import WorkGallery from "../components/home/WorkGallery";
import AmapBlock from "../components/map/AmapBlock";
import SectionTitle from "../components/common/SectionTitle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CertificatesSection from "./CertificatesSection";

export default function HomePage() {
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
      <CertificatesSection title="资质荣誉" subtitle="专业认证，信誉保障">
        <div className="text-center mt-8">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-400 text-sm hover:bg-cyan-500/10 transition-all"
          >
            查看全部资质 &rarr;
          </Link>
        </div>
      </CertificatesSection>

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
