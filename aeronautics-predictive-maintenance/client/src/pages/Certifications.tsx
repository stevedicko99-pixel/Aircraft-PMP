import { Button } from "@/components/ui/button";
import { Award, Download, Share2, Calendar, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Certifications & Achievements Page
 * Design: Modern Technical Minimalism
 * - Course certificates
 * - Achievement badges
 * - Skill verification
 */

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  completionDate: string;
  credentialId: string;
  skills: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  criteria: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

const certificates: Certificate[] = [
  {
    id: "1",
    title: "Predictive Maintenance with IoT and Machine Learning",
    issuer: "Udemy",
    completionDate: "January 15, 2025",
    credentialId: "UC-a1b2c3d4e5f6",
    skills: ["Machine Learning", "IoT", "Predictive Analytics", "Python"],
    level: "Intermediate",
    icon: "🤖",
  },
  {
    id: "2",
    title: "AI for Predictive Maintenance in Aerospace",
    issuer: "Euromatech",
    completionDate: "December 20, 2024",
    credentialId: "EM-x9y8z7w6v5u4",
    skills: ["AI Applications", "Aerospace Systems", "Data Analysis", "Deep Learning"],
    level: "Advanced",
    icon: "✈️",
  },
  {
    id: "3",
    title: "Introduction to Aerospace Engineering",
    issuer: "MIT OpenCourseWare",
    completionDate: "November 10, 2024",
    credentialId: "MIT-f1e2d3c4b5a6",
    skills: ["Aerodynamics", "Flight Mechanics", "Aircraft Design", "Engineering Fundamentals"],
    level: "Beginner",
    icon: "🛩️",
  },
];

const badges: Badge[] = [
  {
    id: "1",
    name: "Learning Enthusiast",
    description: "Complete 3 courses",
    icon: "📚",
    earnedDate: "January 20, 2025",
    criteria: "3 / 3 courses completed",
    rarity: "Common",
  },
  {
    id: "2",
    name: "Tech Pioneer",
    description: "Master AI and Machine Learning",
    icon: "🚀",
    earnedDate: "January 15, 2025",
    criteria: "Advanced AI course completed",
    rarity: "Rare",
  },
  {
    id: "3",
    name: "Aerospace Expert",
    description: "Complete aerospace specialization",
    icon: "🌌",
    earnedDate: "January 10, 2025",
    criteria: "3 aerospace courses completed",
    rarity: "Epic",
  },
  {
    id: "4",
    name: "Community Leader",
    description: "Contribute 50 forum posts",
    icon: "👑",
    earnedDate: "January 5, 2025",
    criteria: "50 / 50 posts",
    rarity: "Legendary",
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-700";
    case "Intermediate":
      return "bg-blue-100 text-blue-700";
    case "Advanced":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common":
      return "border-gray-300 bg-gray-50";
    case "Rare":
      return "border-blue-300 bg-blue-50";
    case "Epic":
      return "border-purple-300 bg-purple-50";
    case "Legendary":
      return "border-yellow-300 bg-yellow-50";
    default:
      return "border-gray-300 bg-gray-50";
  }
};

export default function Certifications() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("certificates");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              {t("certifications.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-foreground/70">
              {t("certifications.hero.subtitle")}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-white rounded-lg border border-border">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {certificates.length}
              </p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("certifications.certificates")}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-border">
              <p className="text-2xl md:text-3xl font-bold text-accent">
                {badges.length}
              </p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("certifications.badges")}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-border">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {certificates.reduce((acc, cert) => acc + cert.skills.length, 0)}
              </p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("certifications.skillsLearned")}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-border">
              <p className="text-2xl md:text-3xl font-bold text-accent">95%</p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("certifications.completion")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 md:gap-8 overflow-x-auto">
            {[
              { id: "certificates", label: t("certifications.tab.certificates"), icon: "📜" },
              { id: "badges", label: t("certifications.tab.badges"), icon: "🏅" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 md:px-4 font-medium text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/60 hover:text-foreground"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Certificates Tab */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 md:p-8 bg-white rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div className="text-5xl md:text-6xl flex-shrink-0">{cert.icon}</div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            {cert.title}
                          </h3>
                          <p className="text-sm md:text-base text-foreground/60 mb-3">
                            {t("certifications.issuedBy")} {cert.issuer}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap ${getLevelColor(
                            cert.level
                          )}`}
                        >
                          {cert.level}
                        </span>
                      </div>

                      {/* Credentials */}
                      <div className="mb-4 p-3 md:p-4 bg-secondary rounded-lg">
                        <p className="text-xs md:text-sm text-foreground/60 mb-1">
                          {t("certifications.credentialId")}
                        </p>
                        <p className="font-mono text-sm md:text-base text-foreground">
                          {cert.credentialId}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-xs md:text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                          {t("certifications.skillsGained")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs md:text-sm font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-foreground/60 mb-6 pb-6 border-b border-border">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{cert.completionDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{t("certifications.verified")}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => setSelectedCertificate(cert.id)}
                          className="bg-primary hover:bg-blue-800 text-white text-sm"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          {t("certifications.viewCertificate")}
                        </Button>
                        <Button variant="outline" className="text-sm">
                          <Download className="w-4 h-4 mr-2" />
                          {t("certifications.download")}
                        </Button>
                        <Button variant="outline" className="text-sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          {t("certifications.share")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === "badges" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-6 md:p-8 rounded-lg border-2 transition-all ${getRarityColor(
                    badge.rarity
                  )}`}
                >
                  <div className="text-center mb-4">
                    <p className="text-6xl md:text-7xl mb-3">{badge.icon}</p>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-3">{badge.description}</p>
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                      {badge.rarity}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-current border-opacity-20">
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">
                        {t("certifications.criteria")}
                      </p>
                      <p className="text-sm text-foreground">{badge.criteria}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">
                        {t("certifications.earnedDate")}
                      </p>
                      <p className="text-sm text-foreground">{badge.earnedDate}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 text-sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t("certifications.shareBadge")}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certificate Preview Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {t("certifications.certificatePreview")}
              </h2>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="text-foreground/60 hover:text-foreground text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 aspect-video flex items-center justify-center border-2 border-dashed border-primary/30">
              <div className="text-center">
                <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-xl font-bold text-foreground mb-2">
                  {certificates.find((c) => c.id === selectedCertificate)?.title}
                </p>
                <p className="text-sm text-foreground/60">
                  {t("certifications.certificatePreviewText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
