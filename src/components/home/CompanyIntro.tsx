import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { companyIntro } from "../../data/company";
import SectionTitle from "../common/SectionTitle";

function AnimatedNumber({
  target,
  suffix,
  duration = 2,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function CompanyIntro() {
  return (
    <section className="py-20 md:py-28 bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={companyIntro.title}
          subtitle="甲级测绘资质 · 国家高新技术企业"
          light
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-text-dark-secondary leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              {companyIntro.description}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-navy-950 font-semibold text-sm hover:bg-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              了解更多 &rarr;
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {companyIntro.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative p-4 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-cyan-500/20 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-600 mb-1">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-text-dark-secondary font-medium">
                  {stat.label}
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-tr-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
