import { Button } from "@/components/ui/button";
import ContentCard from "@/components/ContentCard";
import { ArrowRight, BookOpen, Users, Zap, TrendingUp, Code } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Home Page
 * Design: Modern Technical Minimalism
 * - Hero section with blueprint background
 * - Asymmetric layout with diagonal elements
 * - Featured content and community highlights
 * - Mobile optimized with responsive typography and spacing
 */

export default function Home() {
  const { t } = useLanguage();

  const featuredBlogs = [
    {
      title: "Predictive Maintenance: AI Algorithms for Aircraft Safety",
      description:
        "Explore how machine learning algorithms predict aircraft maintenance needs before failures occur, improving safety and reducing downtime.",
      category: "AI & Predictive",
      date: "Jan 10, 2025",
      readTime: "8 min read",
      author: "Dr. Sarah Chen",
      tags: ["AI", "Maintenance", "ML"],
      image: "/images/ai-predictive-maintenance.png",
    },
    {
      title: "The Future of Aerospace Engineering Education",
      description:
        "Universities are revolutionizing aerospace engineering programs with hands-on learning, industry partnerships, and cutting-edge research opportunities.",
      category: "Education",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      author: "Prof. James Mitchell",
      tags: ["Education", "Universities", "Careers"],
      image: "/images/aerospace-community.png",
    },
    {
      title: "Sustainable Aviation: The Next Frontier in Aerospace",
      description:
        "Discover how the aerospace industry is embracing sustainable practices and developing eco-friendly aircraft technologies for a greener future.",
      category: "Sustainability",
      date: "Jan 5, 2025",
      readTime: "7 min read",
      author: "Emma Rodriguez",
      tags: ["Sustainability", "Innovation", "Environment"],
      image: "/images/hero-aircraft-blueprint.png",
    },
  ];

  const newsItems = [
    {
      title: "NASA Announces New Hypersonic Aircraft Research Program",
      description: "NASA launches $50M initiative to develop next-generation hypersonic aircraft technologies.",
      category: "Industry News",
      date: "Jan 12, 2025",
      type: "news" as const,
    },
    {
      title: "Boeing and Airbus Invest in AI-Powered Maintenance Systems",
      description: "Major aircraft manufacturers adopt AI for predictive maintenance to enhance fleet reliability.",
      category: "Technology",
      date: "Jan 11, 2025",
      type: "news" as const,
    },
    {
      title: "MIT Launches Aerospace Engineering Innovation Lab",
      description: "New research facility focuses on autonomous systems and advanced materials for aviation.",
      category: "University News",
      date: "Jan 9, 2025",
      type: "news" as const,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Learning",
      description: "Master aircraft maintenance, predictive analytics, and aerospace engineering fundamentals.",
    },
    {
      icon: Zap,
      title: "AI & Predictive Tech",
      description: "Learn cutting-edge machine learning applications in aircraft maintenance and operations.",
    },
    {
      icon: TrendingUp,
      title: "Industry News",
      description: "Stay updated with latest aerospace industry developments and technological breakthroughs.",
    },
    {
      icon: Code,
      title: "Technical Resources",
      description: "Access tools, APIs, datasets, and open-source projects for aerospace development.",
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with aerospace engineers, researchers, and enthusiasts worldwide.",
    },
    {
      icon: BookOpen,
      title: "Expert Blogs",
      description: "Read in-depth articles from industry professionals and academic researchers.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-20 md:pb-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-aircraft-blueprint.png"
            alt="Aircraft Blueprint"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            {/* Accent Line */}
            <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-primary to-accent mb-6 md:mb-8"></div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6 leading-tight">
              {t("home.hero.title")}
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-xl text-foreground/80 mb-6 md:mb-8 max-w-xl leading-relaxed">
              {t("home.hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/learning">
                <Button className="bg-primary hover:bg-blue-800 text-white px-6 md:px-8 py-3 md:py-6 text-base md:text-lg h-auto w-full sm:w-auto">
                  {t("home.hero.explore")}
                  <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
                </Button>
              </Link>
              <Link href="/community">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 md:px-8 py-3 md:py-6 text-base md:text-lg h-auto w-full sm:w-auto"
                >
                  {t("home.hero.community")}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 mt-10 md:mt-12 pt-8 md:pt-8 border-t border-primary/20">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
                <p className="text-xs md:text-sm text-foreground/60">{t("home.stats.courses")}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">10K+</p>
                <p className="text-xs md:text-sm text-foreground/60">{t("home.stats.members")}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">200+</p>
                <p className="text-xs md:text-sm text-foreground/60">{t("home.stats.articles")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal SVG Divider */}
        <svg
          className="absolute bottom-0 left-0 w-full h-16 md:h-24 text-white"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,50 1200,0 1200,100 0,100" fill="currentColor" />
        </svg>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 md:p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Diagonal Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-2">
                {t("home.featured.title")}
              </h2>
              <p className="text-foreground/70 text-sm md:text-base">
                {t("home.featured.subtitle")}
              </p>
            </div>
            <Link href="/blogs">
              <Button variant="outline" className="hidden md:flex">
                View All Blogs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredBlogs.map((blog, index) => (
              <ContentCard
                key={index}
                {...blog}
                href="/blogs"
                type="blog"
              />
            ))}
          </div>

          <div className="flex md:hidden mt-8">
            <Link href="/blogs" className="w-full">
              <Button className="w-full bg-primary hover:bg-blue-800 text-white">
                View All Blogs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-2">
                {t("home.news.title")}
              </h2>
              <p className="text-foreground/70 text-sm md:text-base">
                {t("home.news.subtitle")}
              </p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="hidden md:flex">
                View All News
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3 md:space-y-4">
            {newsItems.map((news, index) => (
              <div
                key={index}
                className="group p-4 md:p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full w-fit">
                        {news.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {news.title}
                    </h3>
                    <p className="text-xs md:text-sm text-foreground/70">
                      {news.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex md:hidden mt-8">
            <Link href="/news" className="w-full">
              <Button className="w-full bg-primary hover:bg-blue-800 text-white">
                View All News
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-white relative overflow-hidden">
        {/* Diagonal Accent */}
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full transform translate-x-20 md:translate-x-32 -translate-y-20 md:-translate-y-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              {t("home.cta.title")}
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
              {t("home.cta.subtitle")}
            </p>
            <Link href="/community">
              <Button className="bg-accent hover:bg-cyan-400 text-primary px-6 md:px-8 py-3 md:py-6 text-base md:text-lg h-auto">
                {t("home.cta.button")}
                <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
