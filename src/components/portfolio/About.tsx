import { GraduationCap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left - editorial label */}
          <ScrollReveal>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4">
              About
            </p>
            <h2 className="editorial-heading mb-8">
              Building the
              <br />
              <span className="italic font-normal">future</span>
            </h2>
          </ScrollReveal>

          {/* Right - content */}
          <ScrollReveal delay={0.2}>
            <p className="body-large mb-8">
              Motivated B.Tech Information Technology student seeking entry-level
              Software Developer role. Strong foundation in Java, Python, Web
              Development, and Machine Learning. Passionate about building
              scalable applications and solving real-world problems.
            </p>
            <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <GraduationCap size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  B.Tech Information Technology
                </h3>
                <p className="text-sm text-muted-foreground">
                  Panimalar Engineering College — CGPA: 7.8/10
                </p>
                <p className="text-xs text-stone mt-1">Expected Graduation 2027</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
