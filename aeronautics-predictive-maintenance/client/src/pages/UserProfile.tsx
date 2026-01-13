import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Calendar, Award, Settings, LogOut, Mail, Bell } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * User Profile Page
 * Design: Modern Technical Minimalism
 * - User dashboard with favorites and progress
 * - Saved courses, articles, events
 * - Certification and badges
 */

interface UserData {
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  bio: string;
  coursesCompleted: number;
  certificatesEarned: number;
  favoriteItems: number;
}

interface FavoriteItem {
  id: string;
  title: string;
  type: "Course" | "Article" | "Event" | "Blog";
  date: string;
  category: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
}

export default function UserProfile() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock user data
  const userData: UserData = {
    name: "Alex Johnson",
    email: "alex.johnson@aerospace.com",
    joinDate: "January 15, 2025",
    avatar: "AJ",
    bio: "Passionate aerospace engineer interested in predictive maintenance and AI applications.",
    coursesCompleted: 3,
    certificatesEarned: 2,
    favoriteItems: 12,
  };

  const favorites: FavoriteItem[] = [
    {
      id: "1",
      title: "Predictive Maintenance with IoT and Machine Learning",
      type: "Course",
      date: "Added Jan 20, 2025",
      category: "Learning",
    },
    {
      id: "2",
      title: "Moving Beyond the Hype of Predictive Maintenance",
      type: "Article",
      date: "Added Jan 18, 2025",
      category: "Blogs",
    },
    {
      id: "3",
      title: "AIAA SciTech Forum 2026",
      type: "Event",
      date: "Added Jan 15, 2025",
      category: "Conferences",
    },
    {
      id: "4",
      title: "AI in Aerospace Engineering Webinar",
      type: "Article",
      date: "Added Jan 12, 2025",
      category: "News",
    },
  ];

  const badges: Badge[] = [
    {
      id: "1",
      name: "Learning Enthusiast",
      description: "Complete 3 courses",
      icon: "📚",
      earned: true,
      progress: 100,
    },
    {
      id: "2",
      name: "Community Champion",
      description: "Post 10 forum messages",
      icon: "🏆",
      earned: false,
      progress: 60,
    },
    {
      id: "3",
      name: "Event Attendee",
      description: "Register for 5 events",
      icon: "📅",
      earned: false,
      progress: 40,
    },
    {
      id: "4",
      name: "Expert Contributor",
      description: "Write 5 blog posts",
      icon: "✍️",
      earned: false,
      progress: 20,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header Section */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Profile Info */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-xl md:text-2xl">
                {userData.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {userData.name}
                </h1>
                <p className="text-sm md:text-base text-foreground/60 mb-2">
                  {userData.email}
                </p>
                <p className="text-xs md:text-sm text-foreground/50">
                  {t("profile.joined")} {userData.joinDate}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="bg-primary hover:bg-blue-800 text-white w-full md:w-auto"
              >
                <Settings className="w-4 h-4 mr-2" />
                {t("profile.editProfile")}
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                <LogOut className="w-4 h-4 mr-2" />
                {t("profile.logout")}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {userData.coursesCompleted}
              </p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("profile.coursesCompleted")}
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {userData.certificatesEarned}
              </p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("profile.certificates")}
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {userData.favoriteItems}
              </p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("profile.favorites")}
              </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center col-span-3 md:col-span-1">
              <p className="text-2xl md:text-3xl font-bold text-accent">5</p>
              <p className="text-xs md:text-sm text-foreground/60 mt-1">
                {t("profile.badges")}
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
              { id: "dashboard", label: t("profile.tab.dashboard"), icon: "📊" },
              { id: "favorites", label: t("profile.tab.favorites"), icon: "❤️" },
              { id: "badges", label: t("profile.tab.badges"), icon: "🏅" },
              { id: "notifications", label: t("profile.tab.notifications"), icon: "🔔" },
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
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bio Section */}
                <div className="p-6 md:p-8 bg-white rounded-lg border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {t("profile.about")}
                  </h3>
                  {isEditingProfile ? (
                    <textarea
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                      rows={4}
                      defaultValue={userData.bio}
                    />
                  ) : (
                    <p className="text-sm text-foreground/70">{userData.bio}</p>
                  )}
                </div>

                {/* Preferences Section */}
                <div className="p-6 md:p-8 bg-white rounded-lg border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {t("profile.preferences")}
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-foreground">
                        {t("profile.emailNotifications")}
                      </span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-foreground">
                        {t("profile.newCourses")}
                      </span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-foreground">
                        {t("profile.eventReminders")}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Learning Progress */}
              <div className="p-6 md:p-8 bg-white rounded-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  {t("profile.learningProgress")}
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Predictive Maintenance Basics", progress: 100 },
                    { name: "AI Applications in Aerospace", progress: 75 },
                    { name: "Advanced Machine Learning", progress: 45 },
                  ].map((course, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {course.name}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground mb-6">
                {t("profile.savedItems")} ({favorites.length})
              </h3>
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="p-4 md:p-6 bg-white rounded-lg border border-border hover:border-accent transition-all flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                        {item.type}
                      </span>
                      <span className="text-xs text-foreground/60">{item.date}</span>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm md:text-base">
                      {item.title}
                    </h4>
                  </div>
                  <button className="text-red-500 hover:text-red-700 transition-colors">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === "badges" && (
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">
                {t("profile.achievements")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      badge.earned
                        ? "bg-accent/5 border-accent"
                        : "bg-secondary border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{badge.icon}</span>
                      {badge.earned && (
                        <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                          {t("profile.unlocked")}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-foreground mb-1">{badge.name}</h4>
                    <p className="text-xs text-foreground/60 mb-3">
                      {badge.description}
                    </p>
                    {badge.progress !== undefined && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-foreground/60">Progress</span>
                          <span className="text-xs font-semibold text-primary">
                            {badge.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${badge.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">
                {t("profile.notificationSettings")}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: t("profile.newCourses"),
                    description: "Get notified when new courses are added",
                  },
                  {
                    title: t("profile.eventReminders"),
                    description: "Reminders for upcoming conferences and webinars",
                  },
                  {
                    title: t("profile.newArticles"),
                    description: "Notifications for new blog posts and articles",
                  },
                  {
                    title: t("profile.communityUpdates"),
                    description: "Updates from community discussions",
                  },
                ].map((notif, idx) => (
                  <div
                    key={idx}
                    className="p-4 md:p-6 bg-white rounded-lg border border-border flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-foreground text-sm md:text-base">
                        {notif.title}
                      </h4>
                      <p className="text-xs md:text-sm text-foreground/60 mt-1">
                        {notif.description}
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
