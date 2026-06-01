import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePaperAirplane, HiCheck, HiXMark } from "react-icons/hi2";

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm: FormData = {
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "请输入姓名";
    if (!formData.phone.trim()) newErrors.phone = "请输入电话";
    if (!formData.email.trim()) {
      newErrors.email = "请输入邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "邮箱格式不正确";
    }
    if (!formData.message.trim()) newErrors.message = "请输入咨询内容";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setStatus("success");
      setFormData(initialForm);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass =
    "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-navy-800 border border-navy-700 text-white placeholder-text-muted focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-base";
  const errorClass = "border-red-500/50 focus:border-red-500/50";

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">在线咨询</h3>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <HiCheck className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-white text-lg font-semibold mb-2">
              提交成功！
            </h4>
            <p className="text-text-secondary text-sm">
              感谢您的咨询，我们将尽快与您联系。
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 px-6 py-2 rounded-lg border border-navy-700 text-text-secondary text-sm hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
            >
              继续咨询
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="sr-only" htmlFor="cf-name">姓名</label>
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  placeholder="姓名 *"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.name ? errorClass : ""}`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="sr-only" htmlFor="cf-company">公司名称</label>
                <input
                  id="cf-company"
                  type="text"
                  name="company"
                  placeholder="公司名称"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="sr-only" htmlFor="cf-phone">电话</label>
                <input
                  id="cf-phone"
                  type="tel"
                  name="phone"
                  placeholder="电话 *"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.phone ? errorClass : ""}`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="sr-only" htmlFor="cf-email">邮箱</label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  placeholder="邮箱 *"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.email ? errorClass : ""}`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="咨询内容 *"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none ${
                  errors.message ? errorClass : ""
                }`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <HiOutlinePaperAirplane className="w-4 h-4" />
                  提交咨询
                </>
              )}
            </button>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm"
                >
                  <HiXMark className="w-4 h-4" />
                  提交失败，请稍后重试
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
