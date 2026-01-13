import { Button } from "@/components/ui/button";
import { Code, Database, BookOpen, Zap, Download, Github } from "lucide-react";

/**
 * Resources Page
 * Design: Modern Technical Minimalism
 */

const resources = [
  {
    icon: Code,
    title: "Code Examples",
    description: "Python, MATLAB, and C++ implementations for predictive maintenance algorithms.",
    items: ["Python Libraries", "MATLAB Toolkits", "C++ Frameworks"],
  },
  {
    icon: Database,
    title: "Datasets",
    description: "Real-world aircraft maintenance and flight data for research and development.",
    items: ["Flight Data", "Maintenance Records", "Sensor Data"],
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive technical guides and API references for aerospace tools.",
    items: ["API Docs", "User Guides", "Technical Specs"],
  },
  {
    icon: Zap,
    title: "Tools & Software",
    description: "Open-source and commercial tools for aerospace engineering and analysis.",
    items: ["Simulation Tools", "Analysis Software", "Visualization Apps"],
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="display-large text-primary mb-4">Resources</h1>
            <p className="text-lg text-foreground/70">
              Access tools, code, datasets, and documentation for aerospace engineering projects.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4">{resource.description}</p>
                  <div className="space-y-2 mb-6">
                    {resource.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-primary hover:bg-blue-800 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Explore
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="display-medium text-primary mb-12">Featured Open Source Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Predictive Maintenance Toolkit",
                description: "Complete Python toolkit for building predictive maintenance models.",
                stars: 2400,
              },
              {
                name: "Aircraft Data Analyzer",
                description: "Real-time analysis tool for flight and maintenance data.",
                stars: 1800,
              },
              {
                name: "Aerospace Simulation Suite",
                description: "Comprehensive simulation framework for aircraft systems.",
                stars: 1200,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-border rounded-lg hover:border-accent hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
                  <Github className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-foreground/70 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">⭐ {project.stars} stars</span>
                  <a href="#" className="text-primary font-semibold text-sm hover:text-accent transition-colors">
                    View on GitHub →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
