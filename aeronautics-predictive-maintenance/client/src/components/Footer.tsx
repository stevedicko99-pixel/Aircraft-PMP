import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Footer Component
 * Design: Modern Technical Minimalism
 * - Asymmetric layout with multiple columns
 * - Aerospace blue background with light text
 * - Geometric accent lines
 * - Mobile optimized with responsive grid
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white mt-12 md:mt-20">
      {/* Diagonal SVG Divider */}
      <svg
        className="w-full h-12 md:h-16 lg:h-24 text-primary"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <polygon points="0,50 1200,0 1200,100 0,100" fill="currentColor" />
      </svg>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">AM</span>
              </div>
              <h3 className="text-base md:text-lg font-bold">Aircraft Maintenance</h3>
            </div>
            <p className="text-xs md:text-sm text-blue-100 mb-6">
              Master predictive maintenance and aerospace engineering through learning, innovation, and community.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-blue-700 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-700 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-700 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Learning Column */}
          <div>
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-wide mb-4 md:mb-6 text-accent">
              {t("footer.learning")}
            </h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li>
                <a href="/learning" className="hover:text-accent transition-colors">
                  {t("footer.courses")}
                </a>
              </li>
              <li>
                <a href="/learning" className="hover:text-accent transition-colors">
                  {t("footer.documentation")}
                </a>
              </li>
              <li>
                <a href="/learning" className="hover:text-accent transition-colors">
                  {t("footer.certifications")}
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-wide mb-4 md:mb-6 text-accent">
              {t("footer.community")}
            </h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li>
                <a href="/community" className="hover:text-accent transition-colors">
                  {t("footer.forums")}
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-accent transition-colors">
                  {t("footer.events")}
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-accent transition-colors">
                  {t("footer.networking")}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-wide mb-4 md:mb-6 text-accent">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <li>
                <a href="/resources" className="hover:text-accent transition-colors">
                  {t("footer.tools")}
                </a>
              </li>
              <li>
                <a href="/resources" className="hover:text-accent transition-colors">
                  {t("footer.datasets")}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-accent transition-colors">
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
            <p className="text-blue-100">
              © {currentYear} Aircraft Maintenance Predictive. {t("footer.rights")}
            </p>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm flex-wrap justify-center">
              <a href="#" className="hover:text-accent transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                {t("footer.terms")}
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                {t("footer.cookies")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
