import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "../../types";
import {
  HiOutlineBuildingOffice2,
  HiOutlineMap,
  HiOutlineHomeModern,
  HiOutlineCamera,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineBeaker,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  HiOutlineBuildingOffice2,
  HiOutlineMap,
  HiOutlineHomeModern,
  HiOutlineCamera,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineBeaker,
  HiOutlineClipboardDocumentList,
};

export function getServiceIcon(iconName: string): IconType {
  return iconMap[iconName] || HiOutlineBuildingOffice2;
}

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ServiceCard({
  service,
  isExpanded,
  onToggle,
}: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);

  return (
    <motion.div
      layout
      className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
        isExpanded
          ? "bg-surface-card border-cyan-500/30 shadow-[0_0_30px_rgba(0,212,255,0.08)]"
          : "bg-surface-card border-navy-700 hover:border-cyan-500/20"
      }`}
      onClick={onToggle}
    >
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
              isExpanded
                ? "bg-cyan-500/20"
                : "bg-cyan-500/10 group-hover:bg-cyan-500/15"
            }`}
          >
            <Icon className="w-6 h-6 text-cyan-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-xl font-semibold mb-1 transition-colors ${
                isExpanded ? "text-cyan-400" : "text-white"
              }`}
            >
              {service.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {service.summary}
            </p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-500"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expandable detail */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-navy-700">
                <p className="text-text-secondary leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
