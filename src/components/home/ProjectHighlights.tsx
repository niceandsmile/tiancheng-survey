import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "../projects/ProjectCard";
import { projects } from "../../data/projects";
import type { Project } from "../../types";
import {
  HiXMark,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

const SCROLL_SPEED = 0.5;

export default function ProjectHighlights() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const touchStartRef = useRef(0);
  const touchOffsetRef = useRef(0);
  const [selected, setSelected] = useState<Project | null>(null);

  // Measure half-track width
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const children = trackRef.current.children;
      const half = children.length / 2;
      let w = 0;
      for (let i = 0; i < half; i++) {
        const el = children[i] as HTMLElement;
        w += el.offsetWidth;
        const style = getComputedStyle(trackRef.current);
        w += parseFloat(style.gap) || 0;
      }
      halfWidthRef.current = w || projects.length * 300;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-scroll
  useEffect(() => {
    let id: number;
    const animate = () => {
      if (!isPaused) {
        offsetRef.current += SCROLL_SPEED;
        if (halfWidthRef.current > 0 && offsetRef.current >= halfWidthRef.current) {
          offsetRef.current -= halfWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
        }
      }
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isPaused]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchOffsetRef.current = offsetRef.current;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const dx = touchStartRef.current - e.touches[0].clientX;
    offsetRef.current = touchOffsetRef.current + dx;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="mb-10 px-4 sm:px-6 lg:px-8">
        <SectionTitle title="精选案例" subtitle="以专业实力赢得客户信赖" />
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-navy-900 via-navy-900/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-navy-900 via-navy-900/70 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 will-change-transform px-4 sm:px-6 lg:px-8"
          style={{ transform: "translateX(0px)" }}
        >
          {[...projects, ...projects].map((project, i) => (
            <div
              key={`${project.id}-${i}`}
              className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
            >
              <ProjectCard project={project} onClick={() => setSelected(project)} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-cyan-500/30 text-cyan-400 font-medium hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all"
        >
          查看全部案例 &rarr;
        </Link>
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
              className="relative bg-surface-card border border-navy-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-navy-800/80 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              >
                <HiXMark className="w-5 h-5" />
              </button>
              <div
                className="aspect-[16/9] bg-gradient-to-br from-navy-700 via-navy-600 to-cyan-900 relative flex items-center justify-center"
                style={
                  selected.thumbnail
                    ? { backgroundImage: `url(${selected.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : undefined
                }
              >
                {!selected.thumbnail && <div className="text-8xl opacity-20 select-none">🗺️</div>}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-navy-950/70 backdrop-blur-sm border border-navy-600/50 text-cyan-400 text-sm font-medium">
                  {selected.category}
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{selected.title}</h2>
                <div className="flex flex-wrap items-center gap-4 mb-6 text-text-muted text-sm">
                  <span className="flex items-center gap-1.5">
                    <HiOutlineCalendarDays className="w-4 h-4 text-cyan-500" />
                    {selected.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiOutlineBuildingOffice2 className="w-4 h-4 text-cyan-500" />
                    {selected.client}
                  </span>
                </div>
                <p className="text-text-secondary leading-relaxed">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
