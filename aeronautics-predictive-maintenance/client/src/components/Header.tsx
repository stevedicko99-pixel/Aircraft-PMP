import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Header Component
 * Design: Modern Technical Minimalism
 * - Aerospace blue primary with electric cyan accents
 * - Clean geometric layout with asymmetric navigation
 * - Responsive mobile menu with language selector
 * - Mobile optimized with proper spacing and touch targets
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t("header.home"), href: "/" },
    { label: t("header.learning"), href: "/learning" },
    { label: t("header.news"), href: "/news" },
    { label: t("header.blogs"), href: "/blogs" },
    { label: t("header.professionals"), href: "/inspiring-professionals" },
    { label: t("header.orientation"), href: "/bachelor-orientation" },
    { label: t("header.conferences"), href: "/conferences" },
    { label: t("header.forum"), href: "/forum" },
    { label: t("header.certifications"), href: "/certifications" },
    { label: t("header.community"), href: "/community" },
    { label: t("header.resources"), href: "/resources" },
    { label: t("header.about"), href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-9 md:w-10 h-9 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm md:text-lg">AM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm md:text-lg font-bold text-primary">Aircraft Maintenance</h1>
              <p className="text-xs text-muted-foreground">Predictive Hub</p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </Link>
          ))}
        </nav>

        {/* Language Selector & CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Selector - Desktop */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-1 px-2 md:px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-foreground uppercase">{language}</span>
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    setLanguage("en");
                    setIsLanguageOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                    language === "en" ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage("fr");
                    setIsLanguageOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                    language === "fr" ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  Français
                </button>
              </div>
            )}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/profile">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white text-xs md:text-sm px-3 py-2 h-auto"
              >
                {t("header.profile")}
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-blue-800 text-white text-xs md:text-sm px-3 py-2 h-auto">
              {t("header.join")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-secondary">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-white hover:text-primary rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-border mt-4">
              <p className="text-xs font-bold text-foreground mb-3 uppercase tracking-wide px-4">
                Language
              </p>
              <button
                onClick={() => {
                  setLanguage("en");
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-colors ${
                  language === "en" ? "bg-primary text-white font-semibold" : "text-foreground hover:bg-white"
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage("fr");
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-colors ${
                  language === "fr" ? "bg-primary text-white font-semibold" : "text-foreground hover:bg-white"
                }`}
              >
                Français
              </button>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-border space-y-2 mt-4">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white text-sm py-2"
              >
                {t("header.signin")}
              </Button>
              <Button className="w-full bg-primary hover:bg-blue-800 text-white text-sm py-2">
                {t("header.join")}
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
