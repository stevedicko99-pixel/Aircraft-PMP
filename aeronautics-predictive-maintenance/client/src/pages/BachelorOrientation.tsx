import { Button } from "@/components/ui/button";
import { BookOpen, Globe, MapPin, Users, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Bachelor's Orientation Guide Page
 * Design: Modern Technical Minimalism
 * - Guide for high school graduates
 * - Aerospace engineering specialties
 * - French and English-speaking programs
 */

interface Specialty {
  id: string;
  name: string;
  description: string;
  specialization: string;
  duration: string;
  difficulty: string;
  careerPaths: string[];
  schools: string[];
  region: string;
  country: string;
  language: string;
  link?: string;
}

const specialties: Specialty[] = [
  // French Programs
  {
    id: "1",
    name: "Ingénieur Aéronautique - ISAE-SUPAERO",
    description: "Formation d'excellence en ingénierie aéronautique et spatiale. Programme reconnu internationalement avec spécialisations en conception, propulsion et systèmes.",
    specialization: "Aéronautique & Spatial",
    duration: "5 ans (Bac+5)",
    difficulty: "Très Difficile",
    careerPaths: ["Ingénieur Conception", "Ingénieur Systèmes", "Responsable Projet", "Chercheur"],
    schools: ["ISAE-SUPAERO", "Toulouse"],
    region: "Occitanie",
    country: "France",
    language: "Français",
    link: "https://www.isae-supaero.fr/",
  },
  {
    id: "2",
    name: "Ingénieur Aéronautique - IPSA",
    description: "École spécialisée en aéronautique et spatial depuis 1961. Offre des programmes de Bac à Bac+5 avec des projets pratiques et des partenariats industriels.",
    specialization: "Aéronautique",
    duration: "5 ans (Bac+5)",
    difficulty: "Difficile",
    careerPaths: ["Ingénieur Avionique", "Ingénieur Structure", "Ingénieur Maintenance", "Chef de Projet"],
    schools: ["IPSA", "Ivry-sur-Seine"],
    region: "Île-de-France",
    country: "France",
    language: "Français",
    link: "https://www.ipsa.fr/",
  },
  {
    id: "3",
    name: "Ingénieur Aéronautique - ESTACA",
    description: "Formation en aéronautique, automobile et spatial. Plus de 400 heures de formation assurées par des ingénieurs de Dassault, Safran et Airbus.",
    specialization: "Aéronautique & Spatial",
    duration: "5 ans (Bac+5)",
    difficulty: "Difficile",
    careerPaths: ["Ingénieur Conception", "Ingénieur Qualité", "Ingénieur Essais", "Ingénieur Production"],
    schools: ["ESTACA", "Laval"],
    region: "Pays de la Loire",
    country: "France",
    language: "Français",
    link: "https://www.estaca.fr/",
  },
  {
    id: "4",
    name: "Ingénieur Aéronautique - ENAC",
    description: "École nationale de l'aviation civile. Formation spécialisée en aviation civile, navigation aérienne et systèmes aéroportuaires.",
    specialization: "Aviation Civile",
    duration: "5 ans (Bac+5)",
    difficulty: "Très Difficile",
    careerPaths: ["Contrôleur Aérien", "Ingénieur Navigation", "Ingénieur Trafic", "Responsable Sécurité"],
    schools: ["ENAC", "Toulouse"],
    region: "Occitanie",
    country: "France",
    language: "Français",
    link: "https://www.enac.fr/",
  },
  {
    id: "5",
    name: "Licence Professionnelle Maintenance Aéronautique",
    description: "Formation courte spécialisée en maintenance d'aéronefs. Accès après Bac+2 avec alternance en entreprise.",
    specialization: "Maintenance Aéronautique",
    duration: "1 an (Bac+3)",
    difficulty: "Moyen",
    careerPaths: ["Technicien Maintenance", "Mécanicien Aéronautique", "Inspecteur Maintenance", "Responsable Maintenance"],
    schools: ["IUT Marseille", "Universités partenaires"],
    region: "Provence-Alpes-Côte d'Azur",
    country: "France",
    language: "Français",
  },
  {
    id: "6",
    name: "Master Ingénierie Aéronautique - Université PSL",
    description: "Programme de master avancé en ingénierie aéronautique avec recherche et projets industriels. Université de prestige reconnue mondialement.",
    specialization: "Aéronautique Avancée",
    duration: "2 ans (Bac+5)",
    difficulty: "Très Difficile",
    careerPaths: ["Chercheur", "Ingénieur R&D", "Ingénieur Conception Avancée", "Consultant"],
    schools: ["Université PSL", "Paris"],
    region: "Île-de-France",
    country: "France",
    language: "Français/Anglais",
    link: "https://www.bachelorsportal.com/study-options/268599333/aerospace-engineering-france.html",
  },

  // English-Speaking Programs
  {
    id: "7",
    name: "BEng Aerospace Engineering - University of Manchester",
    description: "Comprehensive aerospace engineering degree covering aircraft and spacecraft systems, performance, and design. Strong industry partnerships and practical experience.",
    specialization: "Aerospace Engineering",
    duration: "3-4 years (Honours)",
    difficulty: "Difficult",
    careerPaths: ["Aerospace Engineer", "Systems Engineer", "Design Engineer", "Project Manager"],
    schools: ["University of Manchester", "Manchester"],
    region: "North West England",
    country: "United Kingdom",
    language: "English",
    link: "https://www.manchester.ac.uk/study/undergraduate/courses/2026/03333/beng-aerospace-engineering/",
  },
  {
    id: "8",
    name: "BEng Aeronautical Engineering - University of Southampton",
    description: "Only Russell Group university combining aeronautics and astronautics. Develop theory and practical knowledge with state-of-the-art facilities.",
    specialization: "Aeronautics & Astronautics",
    duration: "3-4 years (Honours)",
    difficulty: "Difficult",
    careerPaths: ["Aeronautical Engineer", "Astronautical Engineer", "Research Engineer", "Flight Test Engineer"],
    schools: ["University of Southampton", "Southampton"],
    region: "South Coast England",
    country: "United Kingdom",
    language: "English",
    link: "https://www.southampton.ac.uk/study/subjects/aeronautical-astronautical-engineering",
  },
  {
    id: "9",
    name: "BEng Aerospace Engineering - University of Birmingham",
    description: "Develop expertise in aerospace systems from fundamental mechanics to aerodynamics and systems engineering. Strong emphasis on practical skills.",
    specialization: "Aerospace Engineering",
    duration: "3-4 years (Honours)",
    difficulty: "Difficult",
    careerPaths: ["Aerospace Engineer", "Aerodynamics Engineer", "Structures Engineer", "Avionics Engineer"],
    schools: ["University of Birmingham", "Birmingham"],
    region: "Midlands England",
    country: "United Kingdom",
    language: "English",
    link: "https://www.birmingham.ac.uk/study/undergraduate/subjects/aerospace-engineering-courses/aerospace-engineering-beng",
  },
  {
    id: "10",
    name: "BS Aerospace Engineering - Georgia Tech",
    description: "One of the top aerospace engineering programs in the USA. Covers design, propulsion, structures, and aerodynamics with excellent career outcomes.",
    specialization: "Aerospace Engineering",
    duration: "4 years (Bachelor of Science)",
    difficulty: "Very Difficult",
    careerPaths: ["Aerospace Engineer", "Flight Test Engineer", "Systems Engineer", "Research Engineer"],
    schools: ["Georgia Institute of Technology", "Atlanta"],
    region: "Georgia",
    country: "United States",
    language: "English",
    link: "https://catalog.gatech.edu/programs/aerospace-engineering-bs/",
  },
  {
    id: "11",
    name: "BS Aerospace Engineering - Purdue University",
    description: "Comprehensive program with specializations in aerodynamics, propulsion, structures, and dynamics. Strong aerospace industry connections.",
    specialization: "Aerospace Engineering",
    duration: "4 years (Bachelor of Science)",
    difficulty: "Very Difficult",
    careerPaths: ["Aerospace Engineer", "Propulsion Engineer", "Dynamics & Control Engineer", "Design Engineer"],
    schools: ["Purdue University", "West Lafayette"],
    region: "Indiana",
    country: "United States",
    language: "English",
    link: "https://catalog.purdue.edu/preview_program.php?catoid=9&poid=12272",
  },
  {
    id: "12",
    name: "BS Aerospace Engineering - University of Arizona",
    description: "Program focused on space flight and exploration. Students learn to create technologies for space applications with hands-on experience.",
    specialization: "Space Flight & Exploration",
    duration: "4 years (Bachelor of Science)",
    difficulty: "Very Difficult",
    careerPaths: ["Space Systems Engineer", "Spacecraft Designer", "Mission Planner", "Research Engineer"],
    schools: ["University of Arizona", "Tucson"],
    region: "Arizona",
    country: "United States",
    language: "English",
    link: "https://engineering.arizona.edu/majors/aerospace",
  },
];

const countries = ["All", "France", "United Kingdom", "United States"];
const specializations = ["All", "Aéronautique & Spatial", "Aéronautique", "Aviation Civile", "Maintenance Aéronautique", "Aerospace Engineering", "Aeronautics & Astronautics", "Space Flight & Exploration"];

export default function BachelorOrientation() {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  const filteredSpecialties = specialties.filter((spec) => {
    const countryMatch = selectedCountry === "All" || spec.country === selectedCountry;
    const specMatch = selectedSpecialization === "All" || spec.specialization === selectedSpecialization;
    return countryMatch && specMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Moyen":
        return "bg-green-100 text-green-700";
      case "Difficile":
        return "bg-yellow-100 text-yellow-700";
      case "Très Difficile":
      case "Very Difficult":
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
              {t("orientation.hero.title")}
            </h1>
            <p className="text-base md:text-lg text-foreground/70">
              {t("orientation.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 md:py-8 bg-secondary border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          {/* Country Filter */}
          <div className="mb-6">
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("orientation.filter.country")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                    selectedCountry === country
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Specialization Filter */}
          <div>
            <h3 className="text-xs md:text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("orientation.filter.specialization")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                    selectedSpecialization === spec
                      ? "bg-primary text-white"
                      : "bg-white border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-xs md:text-sm text-foreground/70 mb-8">
            {t("orientation.showing")} <span className="font-bold text-primary">{filteredSpecialties.length}</span> {t("orientation.programs")}
          </p>

          {filteredSpecialties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {filteredSpecialties.map((spec) => (
                <div
                  key={spec.id}
                  className="group p-6 md:p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {spec.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                          <MapPin className="w-3 h-3" />
                          {spec.country}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                          <Globe className="w-3 h-3" />
                          {spec.language}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:text-right">
                      <span className={`px-3 py-1 rounded font-medium text-xs w-fit md:w-auto ${getDifficultyColor(spec.difficulty)}`}>
                        {spec.difficulty}
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-primary">{spec.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-foreground/70 mb-4">
                    {spec.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-lg border border-border">
                    <div>
                      <p className="text-xs font-bold text-foreground/60 uppercase mb-2">Specialization</p>
                      <p className="text-sm font-semibold text-foreground">{spec.specialization}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground/60 uppercase mb-2">Location</p>
                      <p className="text-sm font-semibold text-foreground">{spec.schools[1] || spec.schools[0]}</p>
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-foreground/60 uppercase mb-2">Career Paths</p>
                    <div className="flex flex-wrap gap-2">
                      {spec.careerPaths.map((path, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/20">
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  {spec.link ? (
                    <a href={spec.link} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-primary hover:bg-blue-800 text-white text-xs md:text-sm py-2">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" className="w-full text-xs md:text-sm py-2">
                      More Information
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70 mb-4">No programs found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCountry("All");
                  setSelectedSpecialization("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-12">
            {t("orientation.info.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-white rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("orientation.info.requirements.title")}
              </h3>
              <p className="text-sm text-foreground/70">
                {t("orientation.info.requirements.desc")}
              </p>
            </div>

            <div className="p-6 md:p-8 bg-white rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t("orientation.info.support.title")}
              </h3>
              <p className="text-sm text-foreground/70">
                {t("orientation.info.support.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
