import { motion } from "framer-motion";
import type { Project } from "../../types";
import {
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden bg-surface-card border border-navy-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)] ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Image with gradient fallback */}
      <div
        className="aspect-[16/10] bg-gradient-to-br from-navy-700 via-navy-600 to-cyan-900 relative overflow-hidden"
        style={
          project.thumbnail
            ? {
                backgroundImage: `url(${project.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* Abstract geometric shapes as placeholder — only when no image */}
        {!project.thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-cyan-500/20" />
            <div className="absolute w-32 h-32 rounded-full border border-navy-400/10 rotate-45" />
            <div className="absolute text-6xl opacity-20 select-none">🗺️</div>
          </div>
        )}
        {/* Dark overlay for readability when image is present */}
        {project.thumbnail && (
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-navy-950/10" />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <span className="text-cyan-400 text-sm font-medium">
            点击查看详情 &rarr;
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-navy-950/70 backdrop-blur-sm border border-navy-600/50 text-cyan-400 text-xs font-medium">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5">
        <h3 className="text-white font-semibold text-sm sm:text-base mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {project.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-text-muted text-xs">
          <span className="flex items-center gap-1">
            <HiOutlineCalendarDays className="w-3.5 h-3.5" />
            {project.date}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineBuildingOffice2 className="w-3.5 h-3.5" />
            {project.client}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
