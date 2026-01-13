import { Button } from "@/components/ui/button";
import { Award, ExternalLink, Linkedin } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Inspiring Professionals Page
 * Design: Modern Technical Minimalism
 * - Showcase aerospace engineering leaders and innovators
 * - Real success stories and career paths
 * - Inspiring biographies with achievements
 */

interface Professional {
  id: string;
  name: string;
  title: string;
  achievement: string;
  bio: string;
  category: string;
  field: string;
  image?: string;
  era: string;
  impact: string;
}

const professionals: Professional[] = [
  {
    id: "1",
    name: "Elon Musk",
    title: "Founder & CEO of SpaceX",
    achievement: "Revolutionized commercial space travel and reusable rockets",
    bio: "Elon Musk founded SpaceX in 2002 with the goal of reducing space transportation costs and enabling Mars colonization. Under his leadership, SpaceX developed the Falcon 9 rocket and Dragon spacecraft, achieving numerous milestones including the first commercial resupply mission to the International Space Station.",
    category: "Space Innovation",
    field: "Commercial Space",
    era: "2000s-Present",
    impact: "Transformed the aerospace industry by making space accessible and economically viable",
  },
  {
    id: "2",
    name: "Neil Armstrong",
    title: "Astronaut & Aerospace Engineer",
    achievement: "First human to walk on the Moon (Apollo 11, 1969)",
    bio: "Neil Armstrong was a legendary astronaut and aerospace engineer who made history as the first person to set foot on the Moon. He graduated from Purdue University with a degree in aeronautical engineering and served as a test pilot before joining NASA's astronaut program.",
    category: "Space Exploration",
    field: "Astronautics",
    era: "1960s-1970s",
    impact: "Pioneered human space exploration and inspired generations of aerospace engineers",
  },
  {
    id: "3",
    name: "Wernher von Braun",
    title: "Rocket Scientist & Engineer",
    achievement: "Developed the Saturn V rocket that took humans to the Moon",
    bio: "Wernher von Braun was a pioneering rocket scientist who designed the Saturn V rocket, which powered the Apollo missions. His work was fundamental to the success of the Apollo program and the achievement of landing humans on the Moon.",
    category: "Rocket Science",
    field: "Propulsion Systems",
    era: "1940s-1970s",
    impact: "Established the foundation for modern space exploration and rocket technology",
  },
  {
    id: "4",
    name: "Kalpana Chawla",
    title: "Astronaut & Aerospace Engineer",
    achievement: "First woman of Indian origin to go to space",
    bio: "Kalpana Chawla was a pioneering astronaut and aerospace engineer who became the first woman of Indian origin to go to space. She earned a PhD in aerospace engineering and flew on two Space Shuttle missions before the tragic loss of Space Shuttle Columbia in 2003.",
    category: "Space Exploration",
    field: "Astronautics",
    era: "1990s-2000s",
    impact: "Inspired women and minorities to pursue careers in aerospace engineering",
  },
  {
    id: "5",
    name: "Sergei Korolev",
    title: "Chief Designer of Soviet Space Program",
    achievement: "Designed Sputnik and Vostok spacecraft",
    bio: "Sergei Korolev was the brilliant chief designer behind the Soviet space program's greatest achievements, including Sputnik and the Vostok spacecraft that carried Yuri Gagarin to become the first human in space.",
    category: "Space Exploration",
    field: "Spacecraft Design",
    era: "1950s-1960s",
    impact: "Pioneered the space age and demonstrated the feasibility of human spaceflight",
  },
  {
    id: "6",
    name: "Sir George Cayley",
    title: "Pioneer of Aeronautics",
    achievement: "Founder of modern aeronautics",
    bio: "Sir George Cayley was an English engineer and inventor who laid the foundations of modern aeronautics. He designed the first successful glider and established the scientific principles of flight that would guide aviation development for centuries.",
    category: "Aviation Pioneer",
    field: "Aerodynamics",
    era: "1800s",
    impact: "Established scientific principles that made powered flight possible",
  },
  {
    id: "7",
    name: "The Wright Brothers",
    title: "Pioneers of Powered Flight",
    achievement: "First powered, controlled, sustained airplane flight",
    bio: "Orville and Wilbur Wright achieved the first powered, controlled, sustained airplane flight on December 17, 1903. Their meticulous engineering approach and systematic testing methods revolutionized aviation and changed the world forever.",
    category: "Aviation Pioneer",
    field: "Aircraft Design",
    era: "1900s",
    impact: "Invented the airplane and established principles of aircraft control",
  },
  {
    id: "8",
    name: "Robert Hutchings Goddard",
    title: "Rocket Pioneer",
    achievement: "Invented the liquid-fueled rocket",
    bio: "Robert Goddard was an American engineer and physicist who pioneered rocket development. He designed and built the first liquid-fueled rocket, which launched in 1926, establishing the foundation for modern rocketry.",
    category: "Rocket Science",
    field: "Propulsion Systems",
    era: "1920s-1940s",
    impact: "Invented liquid-fueled rockets, enabling modern space exploration",
  },
  {
    id: "9",
    name: "Valentina Tereshkova",
    title: "Cosmonaut & Engineer",
    achievement: "First woman in space",
    bio: "Valentina Tereshkova became the first woman in space when she flew aboard Vostok 6 in 1963. Her achievement demonstrated that women could perform equally well in space exploration and inspired generations of female aerospace engineers.",
    category: "Space Exploration",
    field: "Astronautics",
    era: "1960s-Present",
    impact: "Proved women's capability in space exploration and engineering",
  },
  {
    id: "10",
    name: "Sally Ride",
    title: "Astronaut & Physics Educator",
    achievement: "First American woman in space",
    bio: "Sally Ride became the first American woman in space in 1983 aboard the Space Shuttle Challenger. She earned a PhD in physics and later dedicated her career to science education, inspiring young people to pursue STEM careers.",
    category: "Space Exploration",
    field: "Astronautics",
    era: "1980s-Present",
    impact: "Broke barriers for women in space and became a champion of STEM education",
  },
];

const categories = ["All", "Space Exploration", "Space Innovation", "Rocket Science", "Aviation Pioneer"];
const eras = ["All", "1800s", "1900s", "1920s-1940s", "1950s-1960s", "1960s-1970s", "1980s-Present", "1990s-2000s", "2000s-Present"];

export default function InspiringProfessionals() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEra, setSelectedEra] = useState("All");

  const filteredProfessionals = professionals.filter((prof) => {
    const categoryMatch = selectedCategory === "All" || prof.category === selectedCategory;
    const eraMatch = selectedEra === "All" || prof.era === selectedEra;
    return categoryMatch && eraMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">
              {t("professionals.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-foreground/70">
              {t("professionals.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 md:py-8 bg-secondary border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("professionals.filter.category")}
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

          {/* Era Filter */}
          <div>
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("professionals.filter.era")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {eras.map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                    selectedEra === era
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professionals Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-xs md:text-sm text-foreground/70 mb-8">
            {t("professionals.showing")} <span className="font-bold text-primary">{filteredProfessionals.length}</span> {t("professionals.count")}
          </p>

          {filteredProfessionals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredProfessionals.map((prof) => (
                <div
                  key={prof.id}
                  className="group p-6 md:p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {prof.name}
                      </h3>
                      <p className="text-xs md:text-sm text-primary font-semibold">{prof.title}</p>
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="mb-4 p-3 md:p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <p className="text-xs md:text-sm font-semibold text-accent">
                      ✨ {prof.achievement}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-xs md:text-sm text-foreground/70 mb-4 flex-grow">
                    {prof.bio}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6 text-xs md:text-sm border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Field:</span>
                      <span className="font-medium text-primary">{prof.field}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Category:</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">
                        {prof.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Era:</span>
                      <span className="font-medium text-foreground">{prof.era}</span>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-xs md:text-sm text-primary font-medium">
                      <span className="font-bold">Impact:</span> {prof.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70 mb-4">No professionals found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedEra("All");
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
              {t("professionals.cta.title")}
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
              {t("professionals.cta.subtitle")}
            </p>
            <Button className="bg-accent hover:bg-cyan-400 text-primary px-6 md:px-8 py-3 text-sm md:text-base h-auto">
              {t("professionals.cta.button")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
