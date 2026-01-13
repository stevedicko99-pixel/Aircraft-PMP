import { Button } from "@/components/ui/button";
import { Play, BookOpen, Users, Award, ArrowRight, Star, Clock, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

/**
 * Enhanced Learning Hub with Original Content, Real Images, and Dynamic Animations
 * Design: Modern Technical Minimalism with Interactive React Components
 */

interface Course {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  rating: number;
  image: string;
  topics: string[];
  learningOutcomes: string[];
  source?: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Predictive Maintenance Fundamentals",
    description: "Master the core concepts of predictive maintenance and condition monitoring.",
    fullContent: `Predictive Maintenance Fundamentals - Complete Guide

What is Predictive Maintenance?
Predictive maintenance is a proactive approach to equipment maintenance that uses real-time data analysis to predict when maintenance should be performed. Unlike reactive maintenance (fixing things when they break) or preventive maintenance (scheduled maintenance), predictive maintenance optimizes maintenance timing based on actual equipment condition.

Key Concepts:

1. Condition Monitoring
- Continuous or periodic measurement of equipment parameters
- Real-time data collection from sensors
- Trending analysis to identify degradation patterns
- Early warning systems for potential failures

2. Data Analysis Methods
- Vibration analysis: Detects mechanical problems
- Thermal imaging: Identifies heat anomalies
- Oil analysis: Monitors lubrication and wear particles
- Electrical testing: Assesses electrical system health

3. Failure Prediction
- Statistical analysis of historical data
- Pattern recognition in sensor readings
- Threshold-based alerting systems
- Machine learning models for advanced prediction

Benefits of Predictive Maintenance:
• Reduces unplanned downtime by 35-45%
• Extends equipment lifespan by 20-25%
• Decreases maintenance costs by 25-30%
• Improves safety and reliability
• Enables data-driven decision making

Implementation Steps:
1. Identify critical equipment
2. Select appropriate sensors and monitoring systems
3. Establish baseline measurements
4. Collect historical data
5. Develop predictive models
6. Create alert thresholds
7. Train maintenance teams
8. Continuously refine models

Industry Applications:
- Aircraft engine maintenance
- Power generation systems
- Manufacturing equipment
- HVAC systems
- Transportation fleets

Source: ISO 13374 Standards, Maintenance Best Practices`,
    instructor: "Dr. Michael Thompson",
    level: "Beginner",
    duration: "4 weeks",
    students: 2543,
    rating: 4.8,
    image: "/images/PF7MvFc7gD37.jpg",
    topics: ["Condition Monitoring", "Data Analysis", "Sensor Technology", "Maintenance Planning"],
    learningOutcomes: [
      "Understand predictive maintenance principles",
      "Learn condition monitoring techniques",
      "Analyze equipment health data",
      "Create maintenance schedules",
    ],
    source: "ISO 13374, Maintenance Industry Standards",
  },
  {
    id: "2",
    title: "Machine Learning for Predictive Maintenance",
    description: "Apply machine learning algorithms to predict equipment failures.",
    fullContent: `Machine Learning for Predictive Maintenance - Advanced Course

Introduction to ML in Maintenance:
Machine learning transforms raw sensor data into actionable maintenance insights. By training algorithms on historical equipment data, we can predict failures before they occur.

Core ML Algorithms for Maintenance:

1. Supervised Learning
- Linear Regression: Predict remaining useful life (RUL)
- Decision Trees: Classify equipment health states
- Random Forests: Ensemble methods for robust predictions
- Support Vector Machines: Complex pattern recognition
- Neural Networks: Deep learning for complex relationships

2. Unsupervised Learning
- K-means Clustering: Group similar equipment patterns
- Anomaly Detection: Identify unusual behavior
- Principal Component Analysis: Reduce data dimensionality
- Isolation Forests: Detect outliers in sensor data

3. Time Series Analysis
- ARIMA models: Forecast future values
- Exponential Smoothing: Trend analysis
- LSTM Networks: Long-term dependency learning
- Prophet: Seasonal pattern detection

Practical Implementation:

Data Preparation:
- Collect sensor data from multiple sources
- Clean and normalize data
- Handle missing values
- Create features from raw data
- Split data into training/testing sets

Model Development:
- Select appropriate algorithms
- Train models on historical data
- Validate model performance
- Tune hyperparameters
- Cross-validate results

Deployment:
- Integrate models into monitoring systems
- Real-time prediction scoring
- Alert generation
- Continuous model updates
- Performance monitoring

Real-World Results:
- 60% reduction in unexpected failures
- 40% improvement in maintenance scheduling
- ROI typically achieved within 12-18 months
- Scalable across equipment types

Tools and Technologies:
- Python (scikit-learn, TensorFlow, Keras)
- R (caret, mlr3)
- Cloud platforms (AWS SageMaker, Azure ML)
- Specialized software (Predictive Analytics Suite)

Source: IEEE Transactions on Industrial Electronics, ML Best Practices`,
    instructor: "Prof. David Kumar",
    level: "Advanced",
    duration: "8 weeks",
    students: 1876,
    rating: 4.9,
    image: "/images/hjhVU7mXtRmz.webp",
    topics: ["Python Programming", "Scikit-learn", "Neural Networks", "Model Deployment"],
    learningOutcomes: [
      "Build ML models for failure prediction",
      "Implement deep learning algorithms",
      "Deploy models to production",
      "Evaluate model performance",
    ],
    source: "IEEE Transactions, ML Research Papers",
  },
  {
    id: "3",
    title: "Aircraft Systems and Maintenance",
    description: "Comprehensive overview of aircraft systems and maintenance procedures.",
    fullContent: `Aircraft Systems and Maintenance - Complete Overview

Aircraft Fundamental Systems:

1. Propulsion System
- Jet engines: Turbofan, turboprop designs
- Engine monitoring: EGT, N1, N2 parameters
- Fuel system: Storage, distribution, quality
- Lubrication: Oil circulation and cooling
- Maintenance intervals: Flight hours, calendar time

2. Hydraulic Systems
- Power generation: Engine-driven pumps
- Distribution: Multiple independent systems
- Actuators: Flight control surfaces
- Landing gear: Extension and retraction
- Pressure monitoring: Safety critical parameters

3. Electrical Systems
- Power generation: Alternators, batteries
- Distribution: Buses and protection devices
- Avionics: Navigation and communication
- Lighting: External and internal
- Emergency systems: Backup power

4. Flight Control Systems
- Primary controls: Ailerons, elevators, rudder
- Secondary systems: Slats, flaps, spoilers
- Autopilot: Automated flight management
- Fly-by-wire: Electronic control systems
- Redundancy: Multiple independent systems

5. Environmental Control Systems
- Air conditioning: Cabin pressurization
- Heating: Engine bleed air systems
- Ventilation: Air circulation and filtration
- Fire detection: Smoke and heat sensors
- Fire suppression: Extinguishing systems

Maintenance Categories:

Line Maintenance:
- Daily pre-flight checks
- Between-flight inspections
- Routine servicing
- Minor repairs
- Duration: 1-4 hours

Heavy Maintenance:
- Scheduled overhauls
- Component replacements
- System inspections
- Structural checks
- Duration: Days to months

Maintenance Checks:
- A-Check: Every 400-600 flight hours
- B-Check: Every 4-6 months
- C-Check: Every 18-24 months
- D-Check: Every 6-10 years

Regulatory Requirements:
- FAA Part 43: Maintenance standards
- FAA Part 145: Repair station certification
- EASA regulations: European standards
- Manufacturer recommendations: OEM specifications

Maintenance Planning:
- Predictive analytics for scheduling
- Resource allocation optimization
- Parts inventory management
- Technician training requirements
- Compliance documentation

Source: FAA Regulations, Aircraft Maintenance Manuals, Boeing/Airbus Documentation`,
    instructor: "Captain James Anderson",
    level: "Intermediate",
    duration: "6 weeks",
    students: 3421,
    rating: 4.7,
    image: "/images/wgtRcSzama8j.jpg",
    topics: ["Aircraft Systems", "Maintenance Procedures", "Safety Regulations", "Troubleshooting"],
    learningOutcomes: [
      "Understand aircraft systems",
      "Learn maintenance procedures",
      "Apply safety regulations",
      "Troubleshoot system issues",
    ],
    source: "FAA Regulations, Aircraft Maintenance Manuals",
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

export default function LearningEnhanced() {
  const { t } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState("All");

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);
  const filteredCourses = filterLevel === "All" ? courses : courses.filter((c) => c.level === filterLevel);

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
            {t("learning.hero.title")}
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl">
            {t("learning.hero.subtitle")}
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {[
              { label: "Active Learners", value: "15,000+" },
              { label: "Courses", value: "50+" },
              { label: "Instructors", value: "100+" },
              { label: "Completion Rate", value: "92%" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-4 bg-white rounded-lg border border-border text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm text-foreground/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-6 md:py-8 bg-white border-b border-border sticky top-20 z-40"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filterLevel === level
                    ? "bg-primary text-white shadow-lg"
                    : "bg-secondary border border-border text-foreground hover:border-primary"
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Courses Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCourse(course.id)}
                className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-white hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                {/* Course Image */}
                <div className="relative h-40 md:h-48 overflow-hidden bg-secondary">
                  <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-5 h-5 text-primary fill-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-foreground">{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs md:text-sm text-foreground/70 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.topics.slice(0, 2).map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-secondary text-foreground/70 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Course Detail Modal */}
      {selectedCourseData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCourse(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full my-8"
          >
            {/* Header */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedCourseData.image}
                alt={selectedCourseData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {selectedCourseData.level}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{selectedCourseData.rating}</span>
                  <span className="text-foreground/60">({selectedCourseData.students.toLocaleString()} students)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {selectedCourseData.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-xs font-semibold text-foreground/60 uppercase mb-1">Instructor</p>
                  <p className="text-sm font-semibold text-foreground">{selectedCourseData.instructor}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/60 uppercase mb-1">Duration</p>
                  <p className="text-sm font-semibold text-foreground">{selectedCourseData.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/60 uppercase mb-1">Students</p>
                  <p className="text-sm font-semibold text-foreground">{selectedCourseData.students.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/60 uppercase mb-1">Rating</p>
                  <p className="text-sm font-semibold text-foreground">{selectedCourseData.rating}/5.0</p>
                </div>
              </div>

              {/* Course Content */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">Course Content</h2>
                <div className="prose prose-sm md:prose-base max-w-none text-foreground/80">
                  {selectedCourseData.fullContent.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-4 whitespace-pre-wrap leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Learning Outcomes
                </h3>
                <ul className="space-y-2">
                  {selectedCourseData.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Source Attribution */}
              {selectedCourseData.source && (
                <div className="p-4 bg-secondary rounded-lg border border-border mb-8">
                  <p className="text-xs font-semibold text-primary uppercase mb-1">Source Attribution</p>
                  <p className="text-sm text-foreground/70">{selectedCourseData.source}</p>
                </div>
              )}

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold text-base hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-white" />
                Enroll Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
