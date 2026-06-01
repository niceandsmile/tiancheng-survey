import PageHeader from "../components/common/PageHeader";
import SectionTitle from "../components/common/SectionTitle";
import ScrollReveal from "../components/common/ScrollReveal";
import LazyImage from "../components/common/LazyImage";
import { motion } from "framer-motion";
import {
  companyIntro,
  companyHistory,
  companyCulture,
  companyStructure,
  certificates,
  companyQualifications,
} from "../data/company";
import {
  HiOutlineLightBulb,
  HiOutlineStar,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineWrenchScrewdriver,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="走进天成"
        subtitle="精准求实 · 诚信创新"
      />

      {/* ===== Company Profile ===== */}
      <section className="py-16 md:py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="公司概况" light />
          <ScrollReveal>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-text-dark-secondary leading-relaxed text-sm sm:text-base lg:text-lg mb-4">
                  {companyIntro.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {["甲级测绘资质", "国家高新技术企业", "ISO 四大体系认证", "AAA 级信用企业"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-xs sm:text-sm font-medium"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {companyIntro.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-100 text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold text-navy-600">
                      {stat.value}
                      <span className="text-xl sm:text-2xl">{stat.suffix}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-text-dark-secondary mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Development History ===== */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="发展历程" subtitle="从创立到壮大的成长轨迹" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {companyHistory.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative p-4 sm:p-6 rounded-2xl bg-surface-card border border-navy-700 hover:border-cyan-500/20 transition-all"
              >
                {i < companyHistory.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+1.5rem)] w-[calc(100%-1.5rem)] h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                )}
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-500 mb-2">{item.year}</div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-2">{item.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Equipment Strength ===== */}
      <section className="py-16 md:py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="设备实力"
            subtitle="先进测绘设备保障项目精准交付"
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {companyIntro.equipment.map((eq, i) => (
              <motion.div
                key={eq.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-3 sm:p-4 rounded-xl bg-surface-card border border-navy-700 flex items-center gap-3"
              >
                <HiOutlineWrenchScrewdriver className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">{eq.count}台/套</div>
                  <div className="text-text-muted text-xs">{eq.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Organizational Structure ===== */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="组织架构" subtitle="高效协同的专业团队" />
          <div className="mt-10">
            {/* 总经理 — top row alone */}
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="px-6 sm:px-8 py-4 rounded-xl border bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-semibold text-base sm:text-lg"
              >
                {companyStructure.management[0]}
              </motion.div>
            </div>
            {/* Arrow down to managers */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-gradient-to-b from-cyan-500/30 to-cyan-500/10" />
            </div>
            {/* 生产经理 / 行政经理 / 经营经理 — second row */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4">
              {companyStructure.management.slice(1).map((role, i) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 sm:px-6 py-3 rounded-xl border bg-surface-card border-navy-700 text-white font-semibold text-sm sm:text-base"
                >
                  {role}
                </motion.div>
              ))}
            </div>
            {/* Arrow down to departments */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-8 bg-gradient-to-b from-cyan-500/30 to-transparent" />
            </div>
            {/* Departments */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {companyStructure.departments.map((dept, i) => (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-3 sm:p-4 rounded-xl bg-surface-card border border-navy-700 text-center text-white text-xs sm:text-sm font-medium hover:border-cyan-500/20 transition-all"
                >
                  <HiOutlineUserGroup className="w-5 h-5 text-cyan-500 mx-auto mb-2" />
                  {dept}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Corporate Culture ===== */}
      <section className="py-16 md:py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="企业文化" />

          {/* Core principles */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: "企业精神", value: companyCulture.spirit, icon: HiOutlineLightBulb },
              { label: "质量方针", value: companyCulture.qualityPolicy, icon: HiOutlineStar },
              { label: "经营理念", value: companyCulture.businessPhilosophy, icon: HiOutlineShieldCheck },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-surface-card border border-navy-700 text-center"
              >
                <item.icon className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                <div className="text-text-muted text-xs mb-2">{item.label}</div>
                <div className="text-white font-semibold text-base sm:text-lg">{item.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
            {companyCulture.values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-4 sm:p-5 rounded-2xl bg-surface-card border border-navy-700 hover:border-cyan-500/30 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-cyan-500/20 transition-colors">
                  {i % 3 === 0 && <HiOutlineLightBulb className="w-5 h-5 text-cyan-500" />}
                  {i % 3 === 1 && <HiOutlineStar className="w-5 h-5 text-cyan-500" />}
                  {i % 3 === 2 && <HiOutlineShieldCheck className="w-5 h-5 text-cyan-500" />}
                </div>
                <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">{v.label}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Vision & Mission banner */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/20 text-center"
            >
              <p className="text-cyan-400 text-xs sm:text-sm font-medium mb-1">企业使命</p>
              <p className="text-white text-base sm:text-xl font-semibold">{companyCulture.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10 text-center"
            >
              <p className="text-cyan-400 text-xs sm:text-sm font-medium mb-1">企业愿景</p>
              <p className="text-white text-base sm:text-xl font-semibold">{companyCulture.vision}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Qualifications ===== */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="资质荣誉" subtitle="以实力赢得认可" />
          <div className="mt-10 space-y-8">
            {companyQualifications.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.15 }}
              >
                <h3 className="text-cyan-400 text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <HiOutlineBuildingOffice2 className="w-5 h-5" />
                  {group.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {group.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-4 rounded-xl bg-surface-card border border-navy-700 text-center text-white text-xs sm:text-sm"
                    >
                      {item.name}
                      {item.desc && (
                        <div className="text-text-muted text-xs mt-1">{item.desc}</div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Certificates Gallery ===== */}
      <section className="py-16 md:py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="资质证书" subtitle="权威认证，信誉保证" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-card border border-navy-700 group-hover:border-cyan-500/30 transition-all group-hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]">
                  <LazyImage
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <p className="text-white text-xs sm:text-sm font-medium mt-2 text-center group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
