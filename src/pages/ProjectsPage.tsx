import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/common/PageHeader";
import ScrollReveal from "../components/common/ScrollReveal";
import ProjectCard from "../components/projects/ProjectCard";
import { projects, projectCategories } from "../data/projects";
import type { Project } from "../types";
import {
  HiXMark,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice2,
  HiOutlineMapPin,
} from "react-icons/hi2";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("全部");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === "全部"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <main>
      <PageHeader
        title="项目案例"
        subtitle="以品质赢得信任，以实力铸就口碑"
      />

      {/* Filter Tabs */}
      <section className="py-10 bg-navy-950 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    : "text-text-secondary hover:text-white border border-transparent hover:border-navy-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-12 md:py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollReveal delay={i * 0.05}>
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </ScrollReveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-surface-card border border-navy-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-navy-800/80 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              >
                <HiXMark className="w-5 h-5" />
              </button>

              {/* Image with gradient fallback */}
              <div
                className="aspect-[16/9] bg-gradient-to-br from-navy-700 via-navy-600 to-cyan-900 relative flex items-center justify-center"
                style={
                  selectedProject.thumbnail
                    ? {
                        backgroundImage: `url(${selectedProject.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              >
                {!selectedProject.thumbnail && (
                  <div className="text-8xl opacity-20 select-none">🗺️</div>
                )}
                {selectedProject.thumbnail && (
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                )}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-navy-950/70 backdrop-blur-sm border border-navy-600/50 text-cyan-400 text-sm font-medium">
                  {selectedProject.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-text-muted text-sm">
                  <span className="flex items-center gap-1.5">
                    <HiOutlineCalendarDays className="w-4 h-4 text-cyan-500" />
                    {selectedProject.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiOutlineBuildingOffice2 className="w-4 h-4 text-cyan-500" />
                    {selectedProject.client}
                  </span>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
