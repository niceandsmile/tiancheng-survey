import PageHeader from "../components/common/PageHeader";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import SectionTitle from "../components/common/SectionTitle";

import AmapBlock from "../components/map/AmapBlock";

const COMPANY_ADDRESS = "深圳市龙岗区龙城街道盛平社区龙城大道177号荔园大楼4F";

export default function Contact() {
  return (
    <main>
      <PageHeader title="联系我们" subtitle="期待与您的合作，欢迎随时咨询" />

      <section className="py-16 md:py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-20">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="公司位置" subtitle={COMPANY_ADDRESS} />
          <div className="mt-12">
            <AmapBlock className="h-[250px] sm:h-[450px]" />
          </div>
        </div>
      </section>
    </main>
  );
}
