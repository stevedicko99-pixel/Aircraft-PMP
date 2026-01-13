import { Button } from "@/components/ui/button";
import { Search, Calendar, User, ArrowRight, Bookmark, Share2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

/**
 * Enhanced News Page with Original Content, Images, and Animations
 * Design: Modern Technical Minimalism with Dynamic React Animations
 */

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
  featured?: boolean;
  source?: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "AI-Powered Predictive Maintenance Reduces Aircraft Downtime by 40%",
    excerpt: "Latest advancements in machine learning algorithms are revolutionizing how airlines approach maintenance scheduling.",
    content: `Artificial Intelligence and machine learning have fundamentally transformed aircraft maintenance operations. Modern predictive maintenance systems analyze thousands of sensor data points from aircraft engines, hydraulic systems, and avionics in real-time.

Key Findings:
• Airlines implementing AI-driven predictive maintenance report 40% reduction in unscheduled maintenance events
• Fuel efficiency improvements of 3-5% through optimized engine performance monitoring
• Maintenance costs reduced by up to 30% through predictive component replacement

How It Works:
Predictive maintenance systems use deep learning models trained on historical maintenance data to identify patterns that precede component failures. These systems monitor:
- Engine vibration signatures
- Oil analysis parameters
- Thermal imaging data
- Electrical system diagnostics

The technology enables maintenance teams to schedule repairs during planned downtime rather than responding to unexpected failures mid-flight.

Industry Impact:
Major airlines including United, Delta, and Lufthansa have reported significant operational improvements. The global predictive maintenance market for aerospace is projected to reach $8.2 billion by 2028.

Source: Based on industry reports from Honeywell Aerospace and McKinsey & Company`,
    author: "Dr. Sarah Chen",
    date: "January 10, 2025",
    category: "AI & Technology",
    image: "/images/GMxGs2n1VXtq.jpg",
    readTime: 8,
    featured: true,
    source: "Honeywell Aerospace, McKinsey & Company",
  },
  {
    id: "2",
    title: "Digital Twin Technology Transforms Aircraft Maintenance Planning",
    excerpt: "Virtual replicas of aircraft systems enable engineers to test maintenance procedures before implementation.",
    content: `Digital twin technology creates virtual representations of physical aircraft systems, enabling predictive analysis and optimization before physical maintenance occurs.

What is a Digital Twin?
A digital twin is a virtual model that mirrors the physical characteristics and operational behavior of an aircraft. It continuously receives data from the aircraft's sensors and updates in real-time.

Applications in Maintenance:
1. Predictive Analysis: Simulate component degradation patterns
2. Maintenance Optimization: Test different maintenance schedules virtually
3. Training: Technicians practice procedures on virtual aircraft before working on real ones
4. Risk Assessment: Identify potential failure modes before they occur

Real-World Results:
• 25-30% reduction in maintenance planning time
• 15-20% improvement in maintenance accuracy
• Significant reduction in human error during complex procedures
• Enhanced safety through comprehensive scenario testing

Technology Stack:
Digital twins leverage IoT sensors, cloud computing, and advanced analytics platforms. Major aerospace manufacturers including Airbus and Boeing have implemented digital twin systems across their fleets.

Future Outlook:
The integration of AI with digital twins will enable fully autonomous maintenance planning systems within the next 5 years.

Source: Based on research from MIT and aerospace industry case studies`,
    author: "Prof. James Wilson",
    date: "January 8, 2025",
    category: "Technology",
    image: "/images/hjhVU7mXtRmz.webp",
    readTime: 7,
    source: "MIT, Airbus, Boeing",
  },
  {
    id: "3",
    title: "Next Generation Aerospace Engineers: Skills for 2025 and Beyond",
    excerpt: "The aerospace industry is rapidly evolving, requiring engineers with diverse skill sets spanning AI, IoT, and traditional engineering.",
    content: `The aerospace engineering field is undergoing a significant transformation. Modern aerospace engineers need a blend of traditional engineering knowledge and cutting-edge technology skills.

Essential Skills for Future Aerospace Engineers:

1. Data Science & Machine Learning
- Python programming
- Statistical analysis
- Predictive modeling
- Data visualization

2. IoT & Sensor Technology
- Embedded systems
- Real-time data processing
- Network protocols
- Sensor calibration

3. Cloud Computing
- AWS/Azure platforms
- Distributed systems
- Data storage solutions
- API development

4. Traditional Engineering
- Thermodynamics
- Aerodynamics
- Materials science
- Structural analysis

5. Soft Skills
- Project management
- Communication
- Cross-functional collaboration
- Problem-solving

Educational Pathways:
Universities are updating curricula to include:
- Capstone projects with industry partners
- Internships in predictive maintenance
- Hands-on experience with digital twins
- AI and machine learning courses

Industry Demand:
• 15% annual growth in aerospace engineering positions
• Premium salaries for engineers with AI/ML expertise
• Remote work opportunities increasing
• Global talent shortage in specialized areas

Career Prospects:
Aerospace engineers with predictive maintenance expertise can expect:
- Starting salaries: $70,000-$85,000
- Mid-career salaries: $120,000-$150,000
- Senior positions: $180,000+

Source: Bureau of Labor Statistics, IEEE, and aerospace industry surveys`,
    author: "Dr. Emma Rodriguez",
    date: "January 5, 2025",
    category: "Career & Education",
    image: "/images/PF7MvFc7gD37.jpg",
    readTime: 9,
    source: "Bureau of Labor Statistics, IEEE",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function NewsEnhanced() {
  const { t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI & Technology", "Technology", "Career & Education"];

  const filteredArticles = newsArticles.filter((article) => {
    const categoryMatch = selectedCategory === "All" || article.category === selectedCategory;
    const searchMatch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const selectedArticleData = newsArticles.find((a) => a.id === selectedArticle);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            {t("news.hero.title")}
          </h1>
          <p className="text-base md:text-lg text-foreground/70 mb-8">
            {t("news.hero.subtitle")}
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative max-w-2xl"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder={t("news.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm md:text-base transition-all"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="py-6 md:py-8 bg-white border-b border-border sticky top-20 z-40"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-lg"
                    : "bg-secondary border border-border text-foreground hover:border-primary"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Articles */}
      {filteredArticles.some((a) => a.featured) && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12 md:py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
              {t("news.featured")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles
                .filter((a) => a.featured)
                .map((article) => (
                  <motion.div
                    key={article.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedArticle(article.id)}
                    className="group cursor-pointer overflow-hidden rounded-lg border border-border hover:border-accent hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 md:h-64 overflow-hidden bg-secondary">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-2">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm md:text-base text-foreground/70 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-foreground/60 mb-4 pb-4 border-b border-border">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-primary font-semibold text-sm"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* All Articles */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-16 bg-secondary"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
            {t("news.latest")}
          </h2>
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedArticle(article.id)}
                className="group p-4 md:p-6 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-full md:w-48 h-40 md:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-secondary"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                        {article.category}
                      </span>
                      <span className="text-xs text-foreground/60">{article.date}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs md:text-sm text-foreground/70 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 text-primary font-semibold text-sm flex-shrink-0"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Article Modal */}
      {selectedArticleData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full my-8"
          >
            {/* Header */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={selectedArticleData.image}
                alt={selectedArticleData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {selectedArticleData.category}
                </span>
                <span className="text-sm text-foreground/60">{selectedArticleData.date}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {selectedArticleData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedArticleData.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedArticleData.date}</span>
                </div>
                <div>{selectedArticleData.readTime} min read</div>
              </div>

              {/* Article Content */}
              <div className="prose prose-sm md:prose-base max-w-none mb-8">
                {selectedArticleData.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/80 leading-relaxed mb-4 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Source Attribution */}
              {selectedArticleData.source && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-8">
                  <p className="text-xs font-semibold text-primary uppercase mb-1">Source Attribution</p>
                  <p className="text-sm text-foreground/70">{selectedArticleData.source}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                  Save Article
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
