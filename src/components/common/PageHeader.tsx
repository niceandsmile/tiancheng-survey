interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-navy-900 to-navy-950">
      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #00D4FF 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #00D4FF 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
