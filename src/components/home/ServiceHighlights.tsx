import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import ScrollReveal from "../common/ScrollReveal";
import { services } from "../../data/services";
import { getServiceIcon } from "../services/ServiceCard";
import type { Service } from "../../types";
import { HiXMark } from "react-icons/hi2";

const featuredServices = services.slice(0, 4);

export default function ServiceHighlights() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="服务项目"
          subtitle="覆盖测绘全领域，提供一站式解决方案"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredServices.map((service, i) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <ScrollReveal key={service.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-2xl bg-surface-card border border-navy-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {service.summary}
                    </p>
                    <button
                      onClick={() => setSelected(service)}
                      className="inline-flex items-center gap-1 text-cyan-500 text-sm font-medium hover:text-cyan-400 transition-colors"
                    >
                      了解更多
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-cyan-500/30 text-cyan-400 font-medium hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all"
          >
            查看全部服务 &rarr;
          </Link>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-surface-card border border-navy-700 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-navy-800/80 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              >
                <HiXMark className="w-5 h-5" />
              </button>
              <div className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  {(() => { const I = getServiceIcon(selected.icon); return <I className="w-7 h-7 text-cyan-500" />; })()}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{selected.title}</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{selected.description}</p>
                <ul className="space-y-2">
                  {selected.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
