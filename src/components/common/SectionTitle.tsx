import ScrollReveal from "./ScrollReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <ScrollReveal>
      <div className={align === "center" ? "text-center" : "text-left"}>
        <div className="flex items-center gap-3 mb-4 justify-center">
          {align === "left" && (
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-cyan-500 to-transparent" />
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                  light ? "text-text-dark-primary" : "text-text-primary"
                }`}
              >
                {title}
              </h2>
            </div>
          )}
          {align === "center" && (
            <>
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                  light ? "text-text-dark-primary" : "text-text-primary"
                }`}
              >
                {title}
              </h2>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
            </>
          )}
          {align !== "left" && align !== "center" && (
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                light ? "text-text-dark-primary" : "text-text-primary"
              }`}
            >
              {title}
            </h2>
          )}
        </div>
        {subtitle && (
          <p
            className={`text-base sm:text-lg max-w-2xl ${
              align === "center" ? "mx-auto" : ""
            } ${
              light ? "text-text-dark-secondary" : "text-text-secondary"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
