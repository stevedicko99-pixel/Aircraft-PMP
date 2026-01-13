import { Button } from "@/components/ui/button";
import { BookOpen, Code, Database, Play, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Learning Hub Page
 * Design: Modern Technical Minimalism
 * - Comprehensive aerospace engineering courses
 * - Real resources and external links
 * - Mobile optimized with responsive grid
 */

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  platform?: string;
  link: string;
  type: "course" | "video" | "dataset";
}

const courses: Course[] = [
  {
    id: "1",
    title: "Predictive Maintenance with IoT and Machine Learning",
    description: "Design and simulate predictive maintenance systems using Python, machine learning models, and synthetic industrial data for real-time monitoring.",
    category: "Machine Learning",
    difficulty: "Intermediate",
    duration: "8-10 hours",
    platform: "Udemy",
    link: "https://www.udemy.com/course/predictive-maintenance-with-iot-and-machine-learning/",
    type: "course",
  },
  {
    id: "2",
    title: "AI for Predictive Maintenance Training Course",
    description: "Empower yourself with cutting-edge skills to implement AI-based predictive maintenance systems in aerospace operations.",
    category: "AI & Predictive",
    difficulty: "Advanced",
    duration: "5 days",
    platform: "Euromatech",
    link: "https://www.euromatech.com/course/ai-for-predictive-maintenance/",
    type: "course",
  },
  {
    id: "3",
    title: "Professional Certificate in Predictive Maintenance and AI in Aerospace",
    description: "Equip yourself with cutting-edge skills to optimize aircraft operations and implement AI-based maintenance strategies.",
    category: "Certification",
    difficulty: "Advanced",
    duration: "12 weeks",
    platform: "Stanmore",
    link: "https://www.stanmoreuk.org/Home/CourseDetail?courseId=38699",
    type: "course",
  },
  {
    id: "4",
    title: "Introduction to Aerospace Engineering",
    description: "Comprehensive introduction to aerospace fundamentals including aerodynamics, propulsion, structures, and flight mechanics from MIT.",
    category: "Fundamentals",
    difficulty: "Beginner",
    duration: "Self-paced",
    platform: "MIT",
    link: "https://www.youtube.com/playlist?list=PLHn_Zct-Dmnfj42Rq9SopfNHV1JMmnC3L",
    type: "video",
  },
  {
    id: "5",
    title: "Aerospace Engineering Lectures from IITs",
    description: "Technical lectures on aerospace engineering from Indian Institutes of Technology and Indian Institute of Science.",
    category: "Fundamentals",
    difficulty: "Intermediate",
    duration: "Self-paced",
    platform: "YouTube",
    link: "https://www.youtube.com/@aerospaceengineering1031",
    type: "video",
  },
  {
    id: "6",
    title: "Predictive Maintenance Using Deep Learning",
    description: "Learn how deep learning algorithms predict equipment failures and enable proactive maintenance strategies.",
    category: "Deep Learning",
    difficulty: "Advanced",
    duration: "2 hours",
    platform: "YouTube",
    link: "https://www.youtube.com/watch?v=InMlOMcUzM4",
    type: "video",
  },
  {
    id: "7",
    title: "How to Use Machine Learning for Predictive Maintenance",
    description: "Practical guide to implementing machine learning for maintenance prediction without requiring advanced engineering background.",
    category: "Machine Learning",
    difficulty: "Beginner",
    duration: "1.5 hours",
    platform: "YouTube",
    link: "https://www.youtube.com/watch?v=BApzsgq32mM",
    type: "video",
  },
  {
    id: "8",
    title: "NASA Turbofan Engine Degradation Dataset",
    description: "Real-world dataset from NASA's Prognostics Center of Excellence for training predictive maintenance models.",
    category: "Datasets",
    difficulty: "Intermediate",
    duration: "Self-paced",
    platform: "GitHub",
    link: "https://github.com/Sara-Esm/Predictive-Maintenance",
    type: "dataset",
  },
  {
    id: "9",
    title: "Aircraft Predictive Maintenance Project",
    description: "Complete GitHub project for predicting remaining useful life of aircraft components using machine learning.",
    category: "Projects",
    difficulty: "Advanced",
    duration: "Self-paced",
    platform: "GitHub",
    link: "https://github.com/archd3sai/Predictive-Maintenance-of-Aircraft-Engine",
    type: "dataset",
  },
  {
    id: "10",
    title: "LSTM Networks for Aircraft Engine Maintenance",
    description: "Deep learning approach using Long Short-Term Memory networks for analyzing sensor time series data.",
    category: "Deep Learning",
    difficulty: "Advanced",
    duration: "Self-paced",
    platform: "GitHub",
    link: "https://github.com/AjiteshMahalingam/Predictive-Maintenance-of-Aircraft-engine-using-LSTM-networks",
    type: "dataset",
  },
  {
    id: "11",
    title: "Aircraft Historical Maintenance Dataset",
    description: "Real-world maintenance dataset (2012-2017) with 6,169 instances of maintenance issues and fixes.",
    category: "Datasets",
    difficulty: "Beginner",
    duration: "Self-paced",
    platform: "Kaggle",
    link: "https://www.kaggle.com/datasets/merishnasuwal/aircraft-historical-maintenance-dataset",
    type: "dataset",
  },
  {
    id: "12",
    title: "NASA Learning Resources",
    description: "Comprehensive STEM education resources from NASA including aerospace careers, research, and educational materials.",
    category: "Resources",
    difficulty: "Beginner",
    duration: "Self-paced",
    platform: "NASA",
    link: "https://www.nasa.gov/learning-resources/",
    type: "video",
  },
];

const categories = ["All", "Machine Learning", "AI & Predictive", "Deep Learning", "Fundamentals", "Datasets", "Projects", "Resources", "Certification"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Learning() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredCourses = courses.filter((course) => {
    const categoryMatch = selectedCategory === "All" || course.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "All" || course.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />;
      case "video":
        return <Play className="w-4 h-4" />;
      case "dataset":
        return <Database className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
              {t("learning.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-foreground/70">
              {t("learning.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-secondary border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("learning.filter.category")}
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

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("learning.filter.difficulty")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                    selectedDifficulty === diff
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 md:py-6 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-xs md:text-sm text-foreground/70">
            {t("learning.showing")} <span className="font-bold text-primary">{filteredCourses.length}</span> {t("learning.courses")}
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group p-6 md:p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                          {getTypeIcon(course.type)}
                          <span className="capitalize">{course.type}</span>
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-foreground/70 mb-4 flex-grow">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6 text-xs md:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Category:</span>
                      <span className="font-medium text-primary">{course.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Difficulty:</span>
                      <span className={`px-2 py-1 rounded font-medium text-xs ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Duration:</span>
                      <span className="font-medium text-foreground">{course.duration}</span>
                    </div>
                    {course.platform && (
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/60">Platform:</span>
                        <span className="font-medium text-foreground">{course.platform}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-primary hover:bg-blue-800 text-white text-xs md:text-sm py-2">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Access Course
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70 mb-4">No courses found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
            {t("learning.resources.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("learning.resources.code")}
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                {t("learning.resources.code.desc")}
              </p>
              <a href="https://github.com/archd3sai/Predictive-Maintenance-of-Aircraft-Engine" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full text-xs md:text-sm py-2">
                  Explore on GitHub
                </Button>
              </a>
            </div>

            <div className="p-6 md:p-8 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("learning.resources.datasets")}
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                {t("learning.resources.datasets.desc")}
              </p>
              <a href="https://www.kaggle.com/datasets/merishnasuwal/aircraft-historical-maintenance-dataset" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full text-xs md:text-sm py-2">
                  Download from Kaggle
                </Button>
              </a>
            </div>

            <div className="p-6 md:p-8 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("learning.resources.docs")}
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                {t("learning.resources.docs.desc")}
              </p>
              <a href="https://data.nasa.gov/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full text-xs md:text-sm py-2">
                  NASA Data Portal
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
