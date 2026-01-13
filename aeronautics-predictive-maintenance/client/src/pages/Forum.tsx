import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Eye, Clock, User, Search, Plus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Forum/Discussion Page
 * Design: Modern Technical Minimalism
 * - Community discussion threads
 * - Topic categories
 * - Real-time interactions
 */

interface Thread {
  id: string;
  title: string;
  category: string;
  author: string;
  avatar: string;
  replies: number;
  views: number;
  likes: number;
  lastReply: string;
  isPinned: boolean;
  isAnswered: boolean;
  tags: string[];
}

interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isAnswer: boolean;
}

const categories = [
  "All",
  "Predictive Maintenance",
  "AI & Machine Learning",
  "Aircraft Systems",
  "Career & Education",
  "General Discussion",
];

const threads: Thread[] = [
  {
    id: "1",
    title: "Best practices for implementing predictive maintenance in commercial airlines",
    category: "Predictive Maintenance",
    author: "Sarah Chen",
    avatar: "SC",
    replies: 24,
    views: 1250,
    likes: 89,
    lastReply: "2 hours ago",
    isPinned: true,
    isAnswered: true,
    tags: ["maintenance", "best-practices", "airlines"],
  },
  {
    id: "2",
    title: "Machine learning models for engine failure prediction",
    category: "AI & Machine Learning",
    author: "Dr. James Wilson",
    avatar: "JW",
    replies: 18,
    views: 892,
    likes: 67,
    lastReply: "4 hours ago",
    isPinned: false,
    isAnswered: true,
    tags: ["ML", "engine", "prediction"],
  },
  {
    id: "3",
    title: "Transitioning from traditional to predictive maintenance",
    category: "Career & Education",
    author: "Michael Rodriguez",
    avatar: "MR",
    replies: 12,
    views: 654,
    likes: 45,
    lastReply: "6 hours ago",
    isPinned: false,
    isAnswered: false,
    tags: ["career", "transition", "learning"],
  },
  {
    id: "4",
    title: "IoT sensors and data collection for aircraft monitoring",
    category: "Aircraft Systems",
    author: "Emma Thompson",
    avatar: "ET",
    replies: 16,
    views: 743,
    likes: 52,
    lastReply: "8 hours ago",
    isPinned: false,
    isAnswered: true,
    tags: ["IoT", "sensors", "monitoring"],
  },
  {
    id: "5",
    title: "Real-time data processing frameworks for maintenance systems",
    category: "AI & Machine Learning",
    author: "Alex Kumar",
    avatar: "AK",
    replies: 9,
    views: 421,
    likes: 34,
    lastReply: "12 hours ago",
    isPinned: false,
    isAnswered: false,
    tags: ["real-time", "data", "frameworks"],
  },
];

const replies: Reply[] = [
  {
    id: "r1",
    author: "Dr. Robert Lee",
    avatar: "RL",
    content:
      "Great question! In our experience, the key is to start with a pilot program on a single aircraft type. This allows you to validate your data collection and model accuracy before scaling up.",
    timestamp: "2 hours ago",
    likes: 23,
    isAnswer: true,
  },
  {
    id: "r2",
    author: "Patricia Martinez",
    avatar: "PM",
    content:
      "We've had success combining multiple sensor types and using ensemble methods. The redundancy helps catch edge cases that single models might miss.",
    timestamp: "3 hours ago",
    likes: 18,
    isAnswer: false,
  },
];

export default function Forum() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  const filteredThreads = threads.filter((thread) => {
    const categoryMatch = selectedCategory === "All" || thread.category === selectedCategory;
    const searchMatch =
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                {t("forum.title")}
              </h1>
              <p className="text-base md:text-lg text-foreground/70">
                {t("forum.subtitle")}
              </p>
            </div>
            <Button className="bg-primary hover:bg-blue-800 text-white px-6 md:px-8 py-3 h-auto text-sm md:text-base w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              {t("forum.newThread")}
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 md:py-8 bg-white border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder={t("forum.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-secondary border border-border text-foreground hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Threads List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => setSelectedThread(thread.id)}
                    className="p-4 md:p-6 bg-white rounded-lg border border-border hover:border-accent hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                        {thread.avatar}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {thread.isPinned && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                              📌 {t("forum.pinned")}
                            </span>
                          )}
                          {thread.isAnswered && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              ✓ {t("forum.answered")}
                            </span>
                          )}
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                            {thread.category}
                          </span>
                        </div>

                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 text-sm md:text-base line-clamp-2">
                          {thread.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {thread.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-foreground/60 bg-secondary px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-foreground/60">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{thread.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{thread.views} {t("forum.views")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{thread.replies} {t("forum.replies")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{thread.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{thread.lastReply}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-border">
                  <p className="text-lg text-foreground/70">
                    {t("forum.noThreads")}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Contributors */}
              <div className="p-6 bg-white rounded-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {t("forum.topContributors")}
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Dr. Robert Lee", posts: 127, avatar: "RL" },
                    { name: "Sarah Chen", posts: 98, avatar: "SC" },
                    { name: "James Wilson", posts: 87, avatar: "JW" },
                    { name: "Emma Thompson", posts: 76, avatar: "ET" },
                  ].map((contributor, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                          {contributor.avatar}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {contributor.name}
                        </span>
                      </div>
                      <span className="text-xs text-foreground/60">
                        {contributor.posts} {t("forum.posts")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forum Rules */}
              <div className="p-6 bg-accent/5 rounded-lg border border-accent/20">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {t("forum.rules")}
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-foreground/70">
                  <li>✓ {t("forum.rule1")}</li>
                  <li>✓ {t("forum.rule2")}</li>
                  <li>✓ {t("forum.rule3")}</li>
                  <li>✓ {t("forum.rule4")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thread Detail Modal (simplified) */}
      {selectedThread && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {threads.find((t) => t.id === selectedThread)?.title}
              </h2>
              <button
                onClick={() => setSelectedThread(null)}
                className="text-foreground/60 hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              {replies.map((reply) => (
                <div key={reply.id} className="pb-6 border-b border-border last:border-0">
                  <div className="flex gap-4 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-bold text-primary">
                      {reply.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {reply.author}
                      </p>
                      <p className="text-xs text-foreground/60">{reply.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">{reply.content}</p>
                  <div className="flex gap-4 text-xs text-foreground/60">
                    <button className="hover:text-primary transition-colors">
                      👍 {reply.likes}
                    </button>
                    <button className="hover:text-primary transition-colors">
                      💬 Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
