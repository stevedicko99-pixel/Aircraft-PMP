import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Video, ExternalLink, Clock } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Conferences & Webinars Page
 * Design: Modern Technical Minimalism
 * - Real aerospace conferences and webinars
 * - Upcoming events with registration links
 * - Virtual and in-person events
 */

interface Event {
  id: string;
  title: string;
  description: string;
  type: "Conference" | "Webinar" | "Workshop";
  date: string;
  time?: string;
  location: string;
  format: "Virtual" | "In-Person" | "Hybrid";
  category: string;
  attendees?: string;
  link: string;
  source: string;
  featured?: boolean;
  registrationStatus: "Open" | "Coming Soon" | "Full";
}

const events: Event[] = [
  {
    id: "1",
    title: "AIAA SciTech Forum 2026",
    description: "The premier aerospace R&D event of the year featuring cutting-edge research, technical presentations, and networking opportunities with industry leaders.",
    type: "Conference",
    date: "January 12-16, 2026",
    location: "Hyatt Regency Orlando, Orlando, Florida, USA",
    format: "In-Person",
    category: "Aerospace Research",
    attendees: "5000+",
    link: "https://aiaa.org/2025/10/09/aiaa-scitech-forum-2026-to-break-barriers-together/",
    source: "AIAA",
    featured: true,
    registrationStatus: "Open",
  },
  {
    id: "2",
    title: "IEEE Aerospace Conference 2026",
    description: "Discover the cutting edge of aerospace, Earth science, cosmology, and human cognition. Features plenary sessions from industry pioneers and technical tracks.",
    type: "Conference",
    date: "March 7-14, 2026",
    location: "Yellowstone Conference Center, Big Sky, Montana, USA",
    format: "In-Person",
    category: "Aerospace Technology",
    attendees: "3000+",
    link: "https://www.aeroconf.org/",
    source: "IEEE",
    featured: true,
    registrationStatus: "Open",
  },
  {
    id: "3",
    title: "AIAA AVIATION Forum 2026",
    description: "Your direct flight to the forefront of aviation business, research, development, and technology. Comprehensive coverage of commercial and military aviation.",
    type: "Conference",
    date: "June 8-12, 2026",
    location: "San Diego Convention Center, San Diego, California, USA",
    format: "In-Person",
    category: "Aviation",
    attendees: "4000+",
    link: "https://aiaa.org/aviation/",
    source: "AIAA",
    featured: true,
    registrationStatus: "Coming Soon",
  },
  {
    id: "4",
    title: "Predictive Aircraft Maintenance Conference 2026 - Europe",
    description: "Specialized conference focused on predictive maintenance technologies, AI applications, and maintenance optimization strategies for airlines and MRO operators.",
    type: "Conference",
    date: "February 2-3, 2026",
    location: "Dublin, Ireland",
    format: "In-Person",
    category: "Predictive Maintenance",
    attendees: "1500+",
    link: "https://www.predictiveaircraftmaintenance.com/",
    source: "PAM Europe",
    featured: true,
    registrationStatus: "Open",
  },
  {
    id: "5",
    title: "Predictive Aircraft Maintenance Conference 2026 - MENA",
    description: "Regional conference on predictive maintenance for Middle East and North Africa. Free attendance for airlines and operators. Sponsored by GE Aerospace.",
    type: "Conference",
    date: "February 2-3, 2026",
    location: "Dubai, United Arab Emirates",
    format: "In-Person",
    category: "Predictive Maintenance",
    attendees: "800+",
    link: "https://www.predictiveaircraftmaintenance.com/",
    source: "PAM MENA",
    registrationStatus: "Open",
  },
  {
    id: "6",
    title: "AIAA DEFENSE Forum 2026",
    description: "Focused on defense and military aerospace applications, featuring discussions on advanced technologies, systems integration, and strategic initiatives.",
    type: "Conference",
    date: "March 17-20, 2026",
    location: "Laurel, Maryland, USA",
    format: "In-Person",
    category: "Defense Aerospace",
    attendees: "2000+",
    link: "https://aiaa.org/events-learning/events/",
    source: "AIAA",
    registrationStatus: "Coming Soon",
  },
  {
    id: "7",
    title: "SpaceCom | Space Congress 2026",
    description: "The global conference and expo for the commercial space industry. Features keynotes, technical sessions, and networking with space industry decision makers.",
    type: "Conference",
    date: "January 28-30, 2026",
    location: "Orlando, Florida, USA",
    format: "In-Person",
    category: "Space Industry",
    attendees: "3500+",
    link: "https://www.spacecomexpo.com/",
    source: "SpaceCom",
    registrationStatus: "Open",
  },
  {
    id: "8",
    title: "IEEE SPACE 2026",
    description: "IEEE Space, Aerospace and Defense Conference bringing together researchers and professionals to discuss latest developments in space technology.",
    type: "Conference",
    date: "July 19-21, 2026",
    location: "Bengaluru, India",
    format: "In-Person",
    category: "Space Technology",
    attendees: "2500+",
    link: "https://ieeespace.org/",
    source: "IEEE",
    registrationStatus: "Coming Soon",
  },
  {
    id: "9",
    title: "AIAA Webinar: AI in Aerospace Engineering",
    description: "Explore how companies are deploying AI in aerospace engineering. Learn lessons from industry leaders and discover practical applications of AI technologies.",
    type: "Webinar",
    date: "December 16, 2025",
    time: "2:00 PM EST",
    location: "Online",
    format: "Virtual",
    category: "AI & Technology",
    link: "https://aviationweek.com/webinars/webinar-what-make-ai-aerospace-engineering",
    source: "Aviation Week",
    registrationStatus: "Open",
  },
  {
    id: "10",
    title: "KU Aerospace Free Webinar Series",
    description: "Free webinars presented by University of Kansas aerospace experts covering various topics in aeronautical and astronautical engineering.",
    type: "Webinar",
    date: "Ongoing",
    time: "Varies",
    location: "Online",
    format: "Virtual",
    category: "Education",
    link: "https://jayhawkglobal.ku.edu/aero-webinars",
    source: "University of Kansas",
    registrationStatus: "Open",
  },
  {
    id: "11",
    title: "NASA Small Business Programs Learning Series",
    description: "NASA Office of Small Business Programs offers webinars with in-depth training relevant to aerospace and space industry small businesses.",
    type: "Webinar",
    date: "Monthly",
    time: "Varies",
    location: "Online",
    format: "Virtual",
    category: "Business & Innovation",
    link: "https://www.nasa.gov/osbp/learning-series/",
    source: "NASA",
    registrationStatus: "Open",
  },
  {
    id: "12",
    title: "Hyperspace Challenge Webinar Series",
    description: "Space technology and innovation webinars connecting with industry leaders and government experts discussing crucial advancements in space.",
    type: "Webinar",
    date: "Bi-weekly",
    time: "Varies",
    location: "Online",
    format: "Virtual",
    category: "Space Innovation",
    link: "https://www.hyperspacechallenge.com/webinars/",
    source: "Hyperspace Challenge",
    registrationStatus: "Open",
  },
];

const types = ["All", "Conference", "Webinar", "Workshop"];
const formats = ["All", "Virtual", "In-Person", "Hybrid"];
const categories = ["All", "Aerospace Research", "Predictive Maintenance", "Aviation", "Space Industry", "AI & Technology", "Education"];

export default function Conferences() {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = events.filter((event) => {
    const typeMatch = selectedType === "All" || event.type === selectedType;
    const formatMatch = selectedFormat === "All" || event.format === selectedFormat;
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    return typeMatch && formatMatch && categoryMatch;
  });

  const featuredEvents = filteredEvents.filter((e) => e.featured).slice(0, 3);
  const regularEvents = filteredEvents.filter((e) => !e.featured);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700";
      case "Coming Soon":
        return "bg-blue-100 text-blue-700";
      case "Full":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
              {t("conferences.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-foreground/70">
              {t("conferences.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 md:py-8 bg-secondary border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          {/* Type Filter */}
          <div className="mb-6">
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("conferences.filter.type")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                    selectedType === type
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Format Filter */}
          <div className="mb-6">
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("conferences.filter.format")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                    selectedFormat === format
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("conferences.filter.category")}
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

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
              {t("conferences.featured")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredEvents.map((event) => (
                <a
                  key={event.id}
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 md:p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {event.type}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.registrationStatus)}`}>
                      {event.registrationStatus}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {event.title}
                  </h3>

                  <p className="text-xs md:text-sm text-foreground/70 mb-4 flex-grow">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-xs md:text-sm text-foreground/60 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    {event.format === "Virtual" && (
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-accent" />
                        <span>Online Event</span>
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-primary mb-8 uppercase tracking-wide">
            {t("conferences.all")}
          </h2>

          {regularEvents.length > 0 ? (
            <div className="space-y-4">
              {regularEvents.map((event) => (
                <a
                  key={event.id}
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 md:p-6 bg-white border border-border rounded-lg hover:border-accent hover:shadow-md transition-all duration-300 block"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                          {event.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(event.registrationStatus)}`}>
                          {event.registrationStatus}
                        </span>
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                          {event.format}
                        </span>
                      </div>

                      <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {event.title}
                      </h3>

                      <p className="text-xs md:text-sm text-foreground/70 mb-3">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs md:text-sm text-foreground/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        {event.attendees && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{event.attendees} attendees</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <ExternalLink className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2 md:mt-0" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70 mb-4">No events found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedType("All");
                  setSelectedFormat("All");
                  setSelectedCategory("All");
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
              {t("conferences.cta.title")}
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
              {t("conferences.cta.subtitle")}
            </p>
            <Button className="bg-accent hover:bg-cyan-400 text-primary px-6 md:px-8 py-3 text-sm md:text-base h-auto">
              {t("conferences.cta.button")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
