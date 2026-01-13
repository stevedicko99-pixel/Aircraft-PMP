import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Calendar, Award, ArrowRight } from "lucide-react";

/**
 * Community Page
 * Design: Modern Technical Minimalism
 */

export default function Community() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="display-large text-primary mb-4">Aerospace Community</h1>
            <p className="text-lg text-foreground/70">
              Connect with thousands of aerospace engineers, researchers, and enthusiasts worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <MessageCircle className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Discussion Forums</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Join active discussions on maintenance, AI, careers, and aerospace innovation.
              </p>
              <a href="#" className="text-primary font-semibold text-sm hover:text-accent transition-colors">
                Explore Forums →
              </a>
            </div>

            <div className="group p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <Users className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Member Directory</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Find and connect with aerospace professionals and fellow enthusiasts.
              </p>
              <a href="#" className="text-primary font-semibold text-sm hover:text-accent transition-colors">
                Browse Members →
              </a>
            </div>

            <div className="group p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <Calendar className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Events & Webinars</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Attend virtual events, webinars, and networking sessions with industry experts.
              </p>
              <a href="#" className="text-primary font-semibold text-sm hover:text-accent transition-colors">
                View Events →
              </a>
            </div>

            <div className="group p-8 bg-secondary rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <Award className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Expert Q&A</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Ask questions and get answers from aerospace engineering experts.
              </p>
              <a href="#" className="text-primary font-semibold text-sm hover:text-accent transition-colors">
                Ask Question →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">10K+</p>
              <p className="text-foreground/70">Active Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-foreground/70">Discussion Topics</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">200+</p>
              <p className="text-foreground/70">Events Hosted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">100K+</p>
              <p className="text-foreground/70">Conversations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full transform translate-x-32 -translate-y-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="display-medium text-white mb-4">Join Our Community</h2>
            <p className="text-lg text-blue-100 mb-8">
              Connect with aerospace professionals, share knowledge, collaborate on projects, and advance your career in the aerospace industry.
            </p>
            <Button className="bg-accent hover:bg-cyan-400 text-primary px-8 py-6 text-lg h-auto">
              Create Your Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
