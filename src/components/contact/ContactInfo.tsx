import { COMPANY_INFO } from "../../utils/constants";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from "react-icons/hi2";

export default function ContactInfo() {
  const items = [
    {
      icon: HiOutlineMapPin,
      label: "公司地址",
      value: COMPANY_INFO.address,
    },
    {
      icon: HiOutlinePhone,
      label: "联系电话",
      value: COMPANY_INFO.phone,
    },
    {
      icon: HiOutlineEnvelope,
      label: "电子邮箱",
      value: COMPANY_INFO.email,
    },
    {
      icon: HiOutlineClock,
      label: "工作时间",
      value: COMPANY_INFO.workHours,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-6">联系方式</h3>
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
          </div>
          <div>
            <div className="text-text-muted text-xs mb-0.5">{item.label}</div>
            <div className="text-white text-xs sm:text-sm">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
