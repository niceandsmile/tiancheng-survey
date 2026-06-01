import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import ScrollReveal from "../components/common/ScrollReveal";
import ServiceCard from "../components/services/ServiceCard";
import { services } from "../data/services";

export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <main>
      <PageHeader
        title="服务项目"
        subtitle="以专业技术和先进设备，提供全方位测绘地理信息服务"
      />

      {/* Service intro */}
      <section className="py-12 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-text-secondary text-center max-w-3xl mx-auto leading-relaxed">
              公司持有甲级测绘资质，专业范围涵盖工程测量、海洋测绘、界线与不动产测绘、测绘航空摄影、地理信息系统工程、地图编制六大板块。配备 GNSS 接收机16台、全站仪20台、无人机航测系统5套、地下管线探测仪8台等先进设备。每一项服务严格遵循国家技术标准，由经验丰富的专业团队实施，确保成果精准可靠。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Service List */}
      <section className="py-12 md:py-20 bg-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {services.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 0.05}>
                <ServiceCard
                  service={service}
                  isExpanded={expandedId === service.id}
                  onToggle={() => handleToggle(service.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
