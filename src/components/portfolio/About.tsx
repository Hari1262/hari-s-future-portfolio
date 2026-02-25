import { Code2, Brain, Globe, Rocket, Zap, Shield, Database, Cpu, type LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { useAboutContent, useAboutPoints } from "@/hooks/usePortfolioData";

const iconMap: Record<string, LucideIcon> = {
  Brain, Code2, Globe, Rocket, Zap, Shield, Database, Cpu,
};

const AboutCard = ({ point, index }: { point: { icon_name: string; title: string; description: string }; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const IconComp = iconMap[point.icon_name] || Brain;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -10, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, rotateY: -10, filter: "blur(4px)" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 60px hsl(var(--shadow-elevation))" }}
      className="glass-card-elevated rounded-2xl p-7 group cursor-default"
      style={{ perspective: "800px" }}
    >
      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
        <IconComp size={22} className="text-accent" />
      </div>
      <h3 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
        {point.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
    </motion.div>
  );
};

const About = () => {
  const { data: content } = useAboutContent();
  const { data: points } = useAboutPoints();

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">About</p>
          <h2 className="editorial-heading text-center mb-6">
            {content?.heading?.split(" ").slice(0, -1).join(" ") || "Building the"}
            <br />
            <span className="italic font-normal">{content?.heading?.split(" ").pop() || "future"}</span>
          </h2>
          <p className="body-large text-center max-w-2xl mx-auto mb-16">
            {content?.description || ""}
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points?.map((point, i) => (
            <AboutCard key={point.id} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
