import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../data/navigation";
import { COMPANY_INFO } from "../../utils/constants";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        {/* Background — transparent → frosted white on scroll */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isScrolled
              ? "rgba(30,41,59,0.7)"
              : "rgba(30,41,59,0.3)",
            backdropFilter: isScrolled ? "blur(8px)" : "blur(4px)",
            WebkitBackdropFilter: isScrolled ? "blur(8px)" : "blur(4px)",
            borderBottom: isScrolled
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(255,255,255,0.04)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo + Brand */}
            <Link to="/" className="flex items-center gap-3 md:gap-5 group flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-transparent.png`}
                alt={COMPANY_INFO.shortName}
                className="w-9 h-9 sm:w-[58px] sm:h-[58px] object-contain animate-[logoGlow_3s_ease-in-out_infinite]"
              />
              <div className="flex flex-col min-w-0">
                <span
                  className="font-bold text-sm md:text-base tracking-wide leading-tight whitespace-nowrap transition-colors duration-500"
                  style={{ color: "#ffffff" }}
                >
                  {COMPANY_INFO.name}
                </span>
                <span
                  className="text-xs sm:text-sm font-semibold tracking-wider leading-tight whitespace-nowrap text-center transition-colors duration-500"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  {COMPANY_INFO.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 ml-auto sm:ml-8 lg:ml-12">
              {navItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);
                const base = "relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all duration-300";
                const activeClass = isActive
                  ? "text-cyan-300 bg-white/10"
                  : "";
                const inactiveClass = !isActive
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "";
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${base} ${activeClass} ${inactiveClass}`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-cyan-500" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-3 -mr-2 transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.85)" }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiOutlineMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
            className="absolute inset-0"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative flex flex-col items-center justify-center h-full gap-5">
            {navItems.map((item, i) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-2xl font-medium transition-all ${
                    isActive
                      ? "text-cyan-400"
                      : "text-white/70 hover:text-white"
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <div className="h-0.5 w-8 mx-auto mt-1 bg-cyan-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
