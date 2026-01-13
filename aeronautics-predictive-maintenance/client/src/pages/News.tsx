import { Button } from "@/components/ui/button";
import ContentCard from "@/components/ContentCard";
import { Search, Filter, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * News Page
 * Design: Modern Technical Minimalism
 * - Featured news with filters
 * - Real aerospace industry news
 * - Search functionality
 */

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  source: string;
  link: string;
  featured?: boolean;
  image?: string;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Moving Beyond the Hype of Predictive Maintenance",
    description: "Honeywell explores how prescriptive maintenance solutions are revolutionizing aircraft operations with 30-50% reduction in operational disruptions and 99% predictive accuracy.",
    category: "Technology",
    date: "Dec 2025",
    source: "Honeywell Aerospace",
    link: "https://aerospace.honeywell.com/us/en/about-us/blogs/moving-beyond-the-hype-of-predictive-maintenance",
    featured: true,
    image: "/images/ai-predictive-maintenance.png",
  },
  {
    id: "2",
    title: "Predictive Maintenance in Aerospace: Future Unlocked",
    description: "Comprehensive analysis of how predictive maintenance is transforming aerospace asset management by enhancing safety, cutting costs, and preventing unexpected failures.",
    category: "Industry News",
    date: "Sep 2025",
    source: "eInfochips",
    link: "https://www.einfochips.com/blog/predictive-maintenance-the-future-of-asset-management-in-aerospace/",
    featured: true,
    image: "/images/hero-aircraft-blueprint.png",
  },
  {
    id: "3",
    title: "How Predictive Maintenance is Revolutionizing Aircraft Reliability",
    description: "Veryon's AI-powered predictive maintenance is slashing unscheduled downtime, improving FAA compliance, and empowering maintenance teams with actionable insights.",
    category: "Technology",
    date: "Apr 2025",
    source: "Veryon",
    link: "https://veryon.com/blog/how-predictive-maintenance-is-revolutionizing-aircraft-reliability",
    featured: true,
    image: "/images/aerospace-community.png",
  },
  {
    id: "4",
    title: "The Generative AI Opportunity in Airline Maintenance",
    description: "McKinsey explores how generative AI can improve productivity in airline maintenance, from repair copilots to clerical assistants, addressing labor shortages.",
    category: "AI & Innovation",
    date: "Apr 2024",
    source: "McKinsey",
    link: "https://www.mckinsey.com/industries/aerospace-and-defense/our-insights/the-generative-ai-opportunity-in-airline-maintenance",
  },
  {
    id: "5",
    title: "Airbus Reaches Revised 2025 Target with 793 Aircraft Deliveries",
    description: "Airbus maintains its position as the world's leading planemaker, delivering 793 aircraft in 2025 and reaching record orders of 1,000 jets.",
    category: "Industry News",
    date: "Jan 2026",
    source: "Reuters",
    link: "https://www.reuters.com/business/aerospace-defense/airbus-jetliner-deliveries-rose-4-2025-2026-01-12/",
  },
  {
    id: "6",
    title: "F-35 Programme Sets New Record with 191 Jets Delivered in 2025",
    description: "Lockheed Martin breaks records in the F-35 programme, delivering 191 aircraft in 2025, demonstrating advanced aerospace manufacturing capabilities.",
    category: "Defense",
    date: "Jan 2026",
    source: "Aero Magazine",
    link: "https://www.aero-mag.com/",
  },
  {
    id: "7",
    title: "AI Advances Predict Aircraft Engine Failures",
    description: "Contemporary airline operations control centers are revolutionizing aircraft engine health management through AI-powered predictive maintenance systems.",
    category: "Technology",
    date: "Dec 2025",
    source: "ePlane AI",
    link: "https://www.eplaneai.com/news/ai-advances-predict-aircraft-engine-failures",
  },
  {
    id: "8",
    title: "Predictive Aircraft Maintenance Conference 2026",
    description: "Industry leaders gather in Dubai and Europe for the Predictive Aircraft Maintenance Conference to discuss latest innovations and best practices.",
    category: "Events",
    date: "Feb 2026",
    source: "PAM Conference",
    link: "https://www.predictiveaircraftmaintenance.com/",
  },
];

const categories = [
  "All",
  "Technology",
  "Industry News",
  "AI & Innovation",
  "Defense",
  "Events",
];

export default function News() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsItems.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredNews = filteredNews.filter((item) => item.featured).slice(0, 3);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
              {t("news.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-foreground/70">
              {t("news.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 md:py-8 bg-secondary border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("news.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-foreground" />
              <h3 className="text-xs md:text-sm font-bold text-foreground uppercase tracking-wide">
                {t("news.filter.category")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
              {t("news.featured")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredNews.map((item) => (
                <ContentCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  date={item.date}
                  image={item.image}
                  type="news"
                  href={item.link}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
            {t("news.latest")}
          </h2>

          {regularNews.length > 0 ? (
            <div className="space-y-4">
              {regularNews.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-white border border-border rounded-lg hover:border-accent hover:shadow-md transition-all duration-300 block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full w-fit">
                          {item.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                        <span className="text-xs text-muted-foreground">{item.source}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-foreground/70">
                        {item.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70 mb-4">
                No news found matching your search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full transform translate-x-20 md:translate-x-32 -translate-y-20 md:-translate-y-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              {t("news.newsletter.title")}
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
              {t("news.newsletter.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t("news.newsletter.placeholder")}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent text-sm md:text-base"
              />
              <Button className="bg-accent hover:bg-cyan-400 text-primary px-6 md:px-8 py-3 text-sm md:text-base h-auto">
                {t("news.newsletter.button")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
