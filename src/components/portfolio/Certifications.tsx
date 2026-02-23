import { Award, BookOpen, Trophy } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const certifications = [
  "AWS Skill Builder",
  "IBM AI Fundamentals",
  "Cisco Introduction to Cybersecurity",
  "Future Skills Prime – Acquiring Data",
  "Tata Forage – Cybersecurity Analyst Simulation",
  "Infosys Springboard – Java",
  "Oracle – Generative AI",
];

const awards = [
  {
    title: "3rd Prize – Technical Quiz",
    subtitle: "Tech Cacus 2024 Symposium",
  },
  {
    title: "Research Paper: Smart Pharma",
    subtitle: "AI & IoT for Real-Time Compliance",
  },
];

const Certifications = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Certifications */}
          <div>
            <ScrollReveal>
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4">
                Credentials
              </p>
              <h2 className="editorial-subheading mb-10">
                Certifications<span className="text-gradient-warm">.</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <ScrollReveal key={cert} delay={i * 0.05}>
                  <div className="flex items-center gap-3 py-3 border-b border-border/50 group hover:border-accent/30 transition-colors duration-300">
                    <Award
                      size={16}
                      className="text-stone group-hover:text-accent transition-colors flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {cert}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <ScrollReveal>
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4">
                Recognition
              </p>
              <h2 className="editorial-subheading mb-10">
                Awards & <span className="italic font-normal">Research</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-6">
              {awards.map((award, i) => (
                <ScrollReveal key={award.title} delay={i * 0.15}>
                  <div className="glass-card-elevated rounded-2xl p-6 float-3d">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        {i === 0 ? (
                          <Trophy size={18} className="text-accent" />
                        ) : (
                          <BookOpen size={18} className="text-accent" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">
                          {award.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {award.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
