import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePhone, HiOutlineXMark, HiOutlineUser } from "react-icons/hi2";
import { COMPANY_INFO } from "../../utils/constants";

const COMPANY_PHONE = COMPANY_INFO.phone;
const MANAGER_PHONE = "13590149062";
const MANAGER_NAME = "张经理";

export default function FloatingCall() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 min-w-[230px]"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-800 font-semibold text-sm">免费咨询</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <HiOutlineXMark className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={`tel:${COMPANY_PHONE}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-50 transition-colors group mb-2"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                <HiOutlinePhone className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="text-xs text-slate-400">公司电话</div>
                <div className="text-slate-800 font-semibold text-sm">{COMPANY_PHONE}</div>
              </div>
            </a>

            <a
              href={`tel:${MANAGER_PHONE}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <HiOutlineUser className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-slate-400">{MANAGER_NAME}</div>
                <div className="text-slate-800 font-semibold text-sm">{MANAGER_PHONE}</div>
              </div>
            </a>

            <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
              点击号码直接拨打
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button — right center, prominent */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`flex flex-col items-center justify-center gap-1 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl shadow-lg font-medium text-xs transition-all duration-300 ${
          open
            ? "bg-slate-800 text-white shadow-slate-800/25"
            : "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-cyan-500/30 hover:shadow-cyan-500/40"
        }`}
      >
        <motion.div
          animate={{ scale: open ? 1 : [1, 1.15, 1] }}
          transition={{ repeat: open ? 0 : Infinity, duration: 2, ease: "easeInOut" }}
        >
          <HiOutlinePhone className="w-6 h-6" />
        </motion.div>
        <span className="text-[10px] leading-none">免费电话</span>
      </motion.button>
    </div>
  );
}
