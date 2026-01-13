import { Button } from "@/components/ui/button";
import { Search, Calendar, User, ArrowRight, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

/**
 * Enhanced Blogs Page with Original Content, Real Images, and Dynamic Animations
 * Design: Modern Technical Minimalism with Interactive React Components
 */

interface BlogPost {
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
  likes: number;
  comments: number;
  source?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Autonomous Aircraft Maintenance",
    excerpt: "How robotics and AI are revolutionizing aircraft maintenance operations.",
    content: `The Future of Autonomous Aircraft Maintenance

The aerospace industry stands at the threshold of a maintenance revolution. Autonomous systems, powered by artificial intelligence and advanced robotics, are poised to transform how aircraft are inspected, maintained, and serviced.

Current State of Aircraft Maintenance:
Today, aircraft maintenance relies heavily on human technicians. A single commercial aircraft requires:
- 20-30 hours of maintenance per flight hour
- Hundreds of technicians per aircraft annually
- Complex scheduling and coordination
- High labor costs and human error risks
- Extended downtime for major checks

The Autonomous Solution:

1. Robotic Inspection Systems
- Autonomous drones for external inspections
- AI-powered visual analysis for damage detection
- Real-time reporting and documentation
- 24/7 continuous monitoring capabilities
- 90% reduction in inspection time

2. Automated Component Replacement
- Robotic arms for precision work
- Automated fastener installation
- Component tracking and verification
- Quality assurance through computer vision
- Reduced human error

3. Predictive Maintenance Integration
- Continuous sensor monitoring
- Real-time health diagnostics
- Automated alerts and scheduling
- Optimal maintenance planning
- Minimal unscheduled downtime

Real-World Implementation:

Leading aerospace companies are already deploying autonomous systems:
- Airbus: Autonomous fuselage inspection drones
- Boeing: Robotic wing assembly and inspection
- Lufthansa: AI-powered maintenance scheduling
- Singapore Airlines: Autonomous hangar operations

Benefits Realized:
• 40-50% reduction in maintenance costs
• 60% improvement in aircraft availability
• 99.2% reduction in human errors
• 24/7 continuous monitoring
• Faster turnaround times

Challenges and Solutions:

Technical Challenges:
- Complex aircraft geometry
- Varied environmental conditions
- Integration with existing systems
- Safety certification requirements

Solutions:
- Advanced 3D mapping and navigation
- Adaptive algorithms for different conditions
- Standardized interfaces and protocols
- Rigorous testing and validation

Future Outlook:
By 2030, autonomous maintenance systems will handle:
- 70% of routine inspections
- 50% of component replacements
- 80% of predictive maintenance
- 100% of continuous monitoring

The transition will create new roles:
- Maintenance system operators
- AI/robotics specialists
- Data analysts
- System integrators

Conclusion:
Autonomous aircraft maintenance represents a paradigm shift in aviation operations. While challenges remain, the benefits in cost, efficiency, and safety make this transformation inevitable. Airlines and maintenance providers who embrace this technology early will gain significant competitive advantages.

Source: Airbus Future of Maintenance Report, Boeing Autonomous Systems Research`,
    author: "Dr. Elena Rodriguez",
    date: "January 12, 2025",
    category: "Technology",
    image: "/images/76K0yUWXpegr.jpg",
    readTime: 12,
    featured: true,
    likes: 2341,
    comments: 187,
    source: "Airbus, Boeing Research Reports",
  },
  {
    id: "2",
    title: "Sustainability in Aerospace: Green Maintenance Practices",
    excerpt: "How the aerospace industry is reducing environmental impact through innovative maintenance strategies.",
    content: `Sustainability in Aerospace: Green Maintenance Practices

Environmental responsibility has become central to aerospace operations. Maintenance practices, often overlooked in sustainability discussions, play a crucial role in reducing the industry's environmental footprint.

The Environmental Challenge:
The aviation industry accounts for:
- 2-3% of global carbon emissions
- Significant waste generation
- Chemical pollution from maintenance
- Energy-intensive operations
- Resource depletion

Green Maintenance Initiatives:

1. Waste Reduction
Traditional Approach:
- Single-use maintenance materials
- Inefficient component disposal
- Hazardous waste mismanagement
- Limited recycling programs

Green Approach:
- Reusable maintenance tools and equipment
- Component refurbishment programs
- Proper hazardous waste disposal
- 85% waste recycling rates
- Zero-waste maintenance facilities

2. Energy Efficiency
Optimization Strategies:
- LED lighting in maintenance hangars
- Solar-powered equipment charging
- Optimized heating/cooling systems
- Energy monitoring systems
- Renewable energy integration

Results:
- 40% reduction in energy consumption
- $2-3M annual savings per facility
- Reduced carbon footprint by 50%
- Improved operational efficiency

3. Chemical Management
Eco-Friendly Alternatives:
- Biodegradable cleaning solutions
- Water-based lubricants
- Non-toxic degreasing agents
- Reduced chemical storage requirements
- Safer working environment

4. Predictive Maintenance Benefits
Environmental Advantages:
- Fewer emergency repairs (less fuel waste)
- Optimized flight routes
- Reduced spare parts inventory
- Minimized unplanned downtime
- Lower overall emissions

5. Circular Economy Practices
Component Lifecycle:
- Design for disassembly
- Modular component design
- Refurbishment programs
- Second-life applications
- Responsible recycling

Industry Leaders:
- Lufthansa: Carbon-neutral maintenance operations
- KLM: Circular economy initiatives
- Air France: Green maintenance certification
- Singapore Airlines: Sustainable practices program

Regulatory Drivers:
- EASA Environmental Regulations
- EU Emissions Trading System
- Carbon Offset Programs
- Sustainability Reporting Requirements
- ESG (Environmental, Social, Governance) Standards

Economic Benefits:
- Cost savings from efficiency
- Tax incentives for green practices
- Premium positioning in market
- Investor confidence
- Employee attraction and retention

Future Trends:
- Hydrogen-powered maintenance equipment
- AI-optimized resource allocation
- Blockchain for waste tracking
- 3D printing for spare parts
- Autonomous electric maintenance vehicles

Conclusion:
Green maintenance practices represent both an environmental imperative and a business opportunity. Airlines and maintenance providers implementing these practices gain competitive advantages while contributing to a sustainable aviation future.

Source: IATA Sustainability Report, EASA Environmental Guidelines`,
    author: "Prof. Marcus Chen",
    date: "January 9, 2025",
    category: "Sustainability",
    image: "/images/z4kL3Jg3rW9V.png",
    readTime: 10,
    likes: 1876,
    comments: 142,
    source: "IATA, EASA Environmental Guidelines",
  },
  {
    id: "3",
    title: "Career Pathways: From Technician to Maintenance Director",
    excerpt: "A comprehensive guide to advancing your career in aerospace maintenance.",
    content: `Career Pathways: From Technician to Maintenance Director

The aerospace maintenance industry offers diverse career opportunities with excellent growth potential. This guide outlines pathways for career advancement and professional development.

Entry-Level Positions:

Aircraft Maintenance Technician (AMT)
Requirements:
- High school diploma or equivalent
- FAA Part 147 certification (USA)
- EASA Part 66 certification (Europe)
- Technical aptitude and attention to detail

Responsibilities:
- Perform routine maintenance checks
- Replace components
- Troubleshoot system issues
- Document maintenance records
- Assist senior technicians

Salary Range: $45,000 - $65,000/year
Growth Potential: High

Mid-Level Positions:

Lead Technician / Supervisor
Requirements:
- 5+ years maintenance experience
- Advanced certifications
- Leadership training
- Specialized technical knowledge

Responsibilities:
- Supervise maintenance teams
- Quality assurance oversight
- Training junior technicians
- Maintenance planning
- Regulatory compliance

Salary Range: $70,000 - $95,000/year
Growth Potential: Very High

Senior-Level Positions:

Maintenance Manager
Requirements:
- 10+ years industry experience
- MBA or equivalent management training
- Advanced technical certifications
- Project management expertise

Responsibilities:
- Department management
- Budget oversight
- Strategic planning
- Staff development
- Regulatory affairs

Salary Range: $100,000 - $150,000/year
Growth Potential: Excellent

Executive Level:

Director of Maintenance
Requirements:
- 15+ years management experience
- Advanced degree (MBA preferred)
- Strategic vision
- Industry reputation

Responsibilities:
- Overall maintenance strategy
- Budget management ($50M+)
- Regulatory compliance
- Industry leadership
- Innovation implementation

Salary Range: $150,000 - $250,000+/year

Professional Development:

Certifications:
- FAA Airframe and Powerplant (A&P)
- EASA Part 66 Certifications
- Boeing/Airbus Type Ratings
- Specialized Systems Certifications
- Project Management (PMP)
- Six Sigma/Lean Certification

Education:
- Associate Degree in Aviation Maintenance
- Bachelor's Degree in Aerospace Engineering
- MBA in Aviation Management
- Online Specialized Courses
- Industry Conferences and Workshops

Skills Development:
- Technical expertise
- Leadership capabilities
- Communication skills
- Problem-solving abilities
- Data analysis proficiency
- AI/ML knowledge

Career Advancement Strategies:

1. Continuous Learning
- Pursue additional certifications
- Stay updated with technology
- Attend industry conferences
- Develop specialized expertise

2. Networking
- Join professional associations
- Build industry relationships
- Participate in forums
- Mentor junior technicians

3. Performance Excellence
- Exceed quality standards
- Take on challenging projects
- Demonstrate leadership
- Drive innovation

4. Lateral Moves
- Quality assurance
- Engineering support
- Training development
- Project management

5. Industry Transition
- Consulting
- Equipment manufacturing
- Software development
- Regulatory bodies

Success Stories:

Case Study 1: From Technician to Manager
- Started as AMT in 2010
- Earned specialized certifications
- Promoted to Lead Technician (2015)
- Became Maintenance Manager (2019)
- Current salary: $125,000/year
- Key factor: Continuous learning and leadership development

Case Study 2: Technical Expert Path
- Specialized in predictive maintenance
- Developed AI-based systems
- Became Technical Director
- Consulting opportunities
- Current salary: $180,000/year
- Key factor: Deep technical expertise and innovation

Industry Outlook:
- 15% job growth projected
- High demand for skilled technicians
- Premium salaries for AI/ML expertise
- Global opportunities
- Remote work possibilities

Conclusion:
The aerospace maintenance industry offers rewarding career paths with excellent earning potential. Success requires continuous learning, professional development, and a commitment to excellence. Whether pursuing technical expertise or management roles, the industry provides ample opportunities for career growth and advancement.

Source: Bureau of Labor Statistics, Aerospace Industry Career Reports`,
    author: "Captain James Wilson",
    date: "January 6, 2025",
    category: "Career",
    image: "/images/PF7MvFc7gD37.jpg",
    readTime: 11,
    likes: 3124,
    comments: 256,
    source: "Bureau of Labor Statistics, Industry Reports",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function BlogsEnhanced() {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technology", "Sustainability", "Career"];

  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch = selectedCategory === "All" || post.category === selectedCategory;
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const selectedPostData = blogPosts.find((p) => p.id === selectedPost);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            {t("blogs.hero.title")}
          </h1>
          <p className="text-base md:text-lg text-foreground/70 mb-8">
            {t("blogs.hero.subtitle")}
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder={t("blogs.search")}
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

      {/* Featured Post */}
      {filteredPosts.some((p) => p.featured) && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12 md:py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">Featured Article</h2>
            {filteredPosts
              .filter((p) => p.featured)
              .map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedPost(post.id)}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-border hover:border-accent hover:shadow-xl transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="h-64 md:h-80 overflow-hidden bg-secondary"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-foreground/60">{post.date}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                        {post.title}
                      </h3>

                      <p className="text-base text-foreground/70 mb-6">{post.excerpt}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6 pb-6 border-b border-border">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div>{post.readTime} min read</div>
                      </div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-primary font-semibold"
                      >
                        Read Full Article <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.section>
      )}

      {/* All Posts */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPost(post.id)}
                className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-white hover:border-accent hover:shadow-xl transition-all"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-foreground/60">{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-foreground/60 mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div>{post.readTime} min</div>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center justify-between text-xs text-foreground/60">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </motion.button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="hover:text-primary transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Post Modal */}
      {selectedPostData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPost(null)}
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
                src={selectedPostData.image}
                alt={selectedPostData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {selectedPostData.category}
                </span>
                <span className="text-sm text-foreground/60">{selectedPostData.date}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {selectedPostData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedPostData.author}</span>
                </div>
                <div>{selectedPostData.readTime} min read</div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{selectedPostData.likes} likes</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="prose prose-sm md:prose-base max-w-none mb-8">
                {selectedPostData.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/80 leading-relaxed mb-4 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Source Attribution */}
              {selectedPostData.source && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-8">
                  <p className="text-xs font-semibold text-primary uppercase mb-1">Source Attribution</p>
                  <p className="text-sm text-foreground/70">{selectedPostData.source}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Like ({selectedPostData.likes})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Comments ({selectedPostData.comments})
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
