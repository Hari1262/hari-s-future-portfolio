import { Briefcase } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useExperiences } from "@/hooks/usePortfolioData";

const Experience = () => {
  const { data: experiences } = useExperiences();

  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4">Experience</p>
          <h2 className="editorial-heading mb-16">Internships<span className="text-gradient-warm">.</span></h2>
        </ScrollReveal>
        <div className="space-y-8">
          {experiences?.map((exp, i) => (
            <ScrollReveal key={exp.id} delay={i * 0.15}>
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:shadow-lg transition-shadow duration-500">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/30 group-hover:bg-accent transition-colors duration-500" />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium text-foreground">{exp.role}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-stone tracking-wider sm:mt-2">{exp.year}</span>
                </div>
                <ul className="ml-14 space-y-2">
                  {(exp.details || []).map((d: string) => (
                    <li key={d} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
