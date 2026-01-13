import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter } from "lucide-react";

/**
 * About Page
 * Design: Modern Technical Minimalism
 */

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="display-large text-primary mb-4">About Us</h1>
            <p className="text-lg text-foreground/70">
              Building the future of aerospace engineering through education, innovation, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="display-medium text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-foreground/70 mb-6">
              Aircraft Maintenance Predictive is dedicated to democratizing aerospace engineering knowledge and fostering innovation in predictive maintenance technologies. We believe that by connecting engineers, researchers, and enthusiasts worldwide, we can accelerate the development of safer, more efficient, and sustainable aviation systems.
            </p>
            <p className="text-lg text-foreground/70">
              Our platform serves as a comprehensive hub for learning, sharing knowledge, and collaborating on projects that push the boundaries of aerospace technology and aircraft maintenance excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="display-medium text-primary mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-white rounded-lg border border-border">
              <h3 className="text-lg font-bold text-primary mb-3">Innovation</h3>
              <p className="text-sm text-foreground/70">
                We embrace cutting-edge technologies and methodologies to advance aerospace engineering and predictive maintenance.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-border">
              <h3 className="text-lg font-bold text-primary mb-3">Community</h3>
              <p className="text-sm text-foreground/70">
                We foster collaboration and knowledge sharing among aerospace professionals and enthusiasts worldwide.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-border">
              <h3 className="text-lg font-bold text-primary mb-3">Excellence</h3>
              <p className="text-sm text-foreground/70">
                We maintain the highest standards in education, content quality, and technical accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="display-medium text-primary mb-6">Get In Touch</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Have questions, suggestions, or want to collaborate? We would love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-blue-800 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="display-medium text-primary mb-12 text-center">Our Partners</h2>
          <p className="text-center text-foreground/70 mb-8 max-w-2xl mx-auto">
            We collaborate with leading universities, research institutions, and aerospace companies to bring you the best content and resources.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {["MIT", "Stanford", "Caltech", "NASA", "Boeing", "Airbus", "GE Aviation", "Rolls-Royce"].map((partner, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-border text-center hover:border-accent hover:shadow-md transition-all"
              >
                <p className="font-semibold text-foreground">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
