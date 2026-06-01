import { Link } from "react-router-dom";
import { navItems } from "../../data/navigation";
import { COMPANY_INFO } from "../../utils/constants";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
} from "react-icons/hi2";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Main row — horizontal layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Logo + name */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/images/logo-transparent.png"
              alt={COMPANY_INFO.shortName}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-115"
            />
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-sm sm:text-base">
                {COMPANY_INFO.shortName}
              </span>
              <span className="text-cyan-400/50 text-xs text-center">{COMPANY_INFO.tagline}</span>
            </div>
          </Link>

          {/* Center: Nav links — horizontal */}
          <div className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-slate-400 hover:text-cyan-400 text-xs sm:text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Contact info — compact */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:gap-6 text-slate-400 text-xs">
            <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors whitespace-nowrap">
              <HiOutlinePhone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs">{COMPANY_INFO.phone}</span>
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors whitespace-nowrap">
              <HiOutlineEnvelope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs">{COMPANY_INFO.email}</span>
            </a>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <HiOutlineMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs">{COMPANY_INFO.address}</span>
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-5 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-xs">
          <span>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}
          </span>
          <span>粤ICP备XXXXXXXX号-X</span>
        </div>
      </div>
    </footer>
  );
}
