import { Button } from "@/components/ui/button";
import ContentCard from "@/components/ContentCard";
import { Search, Calendar, User, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Blogs Page
 * Design: Modern Technical Minimalism
 * - Expert articles and technical blogs
 * - Real aerospace engineering content
 * - Search and filter functionality
 */

interface BlogPost {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  link: string;
  source: string;
  image?: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Moving Beyond the Hype of Predictive Maintenance",
    description: "Josh Melin from Honeywell explores how prescriptive maintenance solutions are delivering real results with 30-50% reduction in operational disruptions and 99% predictive accuracy.",
    author: "Josh Melin",
    category: "Predictive Maintenance",
    date: "Dec 2025",
    readTime: "8 min",
    source: "Honeywell Aerospace",
    link: "https://aerospace.honeywell.com/us/en/about-us/blogs/moving-beyond-the-hype-of-predictive-maintenance",
    image: "/images/hero-aircraft-blueprint.png",
    featured: true,
  },
  {
    id: "2",
    title: "Predictive Maintenance in Aerospace: Future Unlocked",
    description: "Comprehensive analysis of how predictive maintenance is transforming aerospace asset management, enhancing safety, reducing costs, and preventing unexpected failures.",
    author: "eInfochips Team",
    category: "AI & Technology",
    date: "Sep 2025",
    readTime: "12 min",
    source: "eInfochips",
    link: "https://www.einfochips.com/blog/predictive-maintenance-the-future-of-asset-management-in-aerospace/",
    image: "/images/ai-predictive-maintenance.png",
    featured: true,
  },
  {
    id: "3",
    title: "Predictive Maintenance Machine Learning: A Practical Guide",
    description: "Detailed guide on how AI and machine learning are used in predictive maintenance by monitoring sensors and analyzing data to provide actionable insights.",
    author: "NeuralConcept",
    category: "Machine Learning",
    date: "Nov 2025",
    readTime: "10 min",
    source: "NeuralConcept",
    link: "https://www.neuralconcept.com/post/how-ai-is-used-in-predictive-maintenance",
    featured: true,
  },
  {
    id: "4",
    title: "How AI Is Transforming Aviation Maintenance and MRO Operations",
    description: "Explore how AI-driven predictive maintenance uses machine learning to analyze aircraft sensor data, operational history, and environmental conditions.",
    author: "Pilot John",
    category: "Aviation Maintenance",
    date: "Dec 2025",
    readTime: "9 min",
    source: "Pilot John",
    link: "https://pilotjohn.com/blog/how-ai-is-transforming-aviation-maintenance-and-mro-operations",
  },
  {
    id: "5",
    title: "Staying Ahead: Leveraging Predictive Maintenance in Aviation Operations",
    description: "Groundbreaking approach to aviation maintenance that hinges on strategic use of data analytics, real-time monitoring, and AI-powered decision making.",
    author: "Brightpath Associates",
    category: "Operations",
    date: "Dec 2025",
    readTime: "11 min",
    source: "Brightpath Associates",
    link: "https://brightpathassociates.com/staying-ahead-leveraging-predictive-maintenance-in-aviation-operations/",
  },
  {
    id: "6",
    title: "Revolutionizing Aerospace Maintenance With Predictive Analytics",
    description: "How predictive maintenance powered by AI allows aerospace firms to anticipate potential failures by analyzing real-time data collected from aircraft sensors.",
    author: "Verdantix",
    category: "Predictive Analytics",
    date: "Oct 2025",
    readTime: "7 min",
    source: "Verdantix",
    link: "https://www.verdantix.com/client-portal/blog/revolutionizing-aerospace-maintenance-with-predictive-analytics",
  },
  {
    id: "7",
    title: "The Generative AI Opportunity in Airline Maintenance",
    description: "McKinsey explores how generative AI can improve productivity in airline maintenance operations, from repair copilots to clerical assistants.",
    author: "McKinsey & Company",
    category: "AI & Innovation",
    date: "Apr 2024",
    readTime: "13 min",
    source: "McKinsey",
    link: "https://www.mckinsey.com/industries/aerospace-and-defense/our-insights/the-generative-ai-opportunity-in-airline-maintenance",
  },
  {
    id: "8",
    title: "Integrating Big Data and Artificial Intelligence in Aircraft Maintenance",
    description: "Explores the challenges in aircraft maintenance and proposes digital transformation using big data and AI technologies.",
    author: "I Kabashkin",
    category: "Digital Transformation",
    date: "2025",
    readTime: "15 min",
    source: "ScienceDirect",
    link: "https://www.sciencedirect.com/science/article/pii/S2352146525000791",
  },
  {
    id: "9",
    title: "AI in Aviation: The Future is Now",
    description: "Comprehensive overview of AI standards in aviation maintenance and the future of intelligent systems in aerospace operations.",
    author: "Aerospace Innovations",
    category: "Future Technology",
    date: "Dec 2025",
    readTime: "10 min",
    source: "Aerospace Innovations",
    link: "https://aerospace-innovations.com/ai-in-aviation-the-future-is-now/",
  },
];

const categories = [
  "All",
  "Predictive Maintenance",
  "Machine Learning",
  "AI & Innovation",
  "Aviation Maintenance",
  "Operations",
  "Digital Transformation",
];

export default function Blogs() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogPosts.filter((post) => {
    const categoryMatch = selectedCategory === "All" || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredBlogs = filteredBlogs.filter((post) => post.featured).slice(0, 3);
  const regularBlogs = filteredBlogs.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
              {t("blogs.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-foreground/70">
              {t("blogs.hero.subtitle")}
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
                placeholder={t("blogs.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm md:text-base"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("blogs.filter.category")}
            </h3>
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

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
              {t("blogs.featured")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredBlogs.map((post) => (
                <ContentCard
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  date={post.date}
                  image={post.image}
                  type="blog"
                  href={post.link}
                  author={post.author}
                  readTime={post.readTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Blogs */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
            {t("blogs.latest")}
          </h2>

          {regularBlogs.length > 0 ? (
            <div className="space-y-4">
              {regularBlogs.map((post) => (
                <a
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-white border border-border rounded-lg hover:border-accent hover:shadow-md transition-all duration-300 block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 flex-wrap">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full w-fit">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                        <span className="text-xs text-muted-foreground">{post.readTime} read</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs md:text-sm text-foreground/70">
                        {post.description}
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
                No blogs found matching your search.
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

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full transform translate-x-20 md:translate-x-32 -translate-y-20 md:-translate-y-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              {t("blogs.cta.title")}
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
              {t("blogs.cta.subtitle")}
            </p>
            <Button className="bg-accent hover:bg-cyan-400 text-primary px-6 md:px-8 py-3 text-sm md:text-base h-auto">
              {t("blogs.cta.button")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
