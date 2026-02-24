import { Code2, Brain, Globe, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const aboutPoints = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Strong foundation in building ML models for predictive analytics and data-driven decision making.",
  },
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Proficient in React, Node.js, and modern web technologies to build scalable applications.",
  },
  {
    icon: Globe,
    title: "Data Science",
    description: "Experienced in Python, data analysis, and visualization to extract actionable insights.",
  },
  {
    icon: Rocket,
    title: "Problem Solver",
    description: "Passionate about solving real-world problems through elegant, efficient software solutions.",
  },
];

const AboutCard = ({ point, index }: { point: typeof aboutPoints[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -10 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.02, rotateY: 3 }}
      className="glass-card-elevated rounded-2xl p-7 group cursor-default"
      style={{ perspective: "800px" }}
    >
      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
        <point.icon size={22} className="text-accent" />
      </div>
      <h3 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
        {point.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {point.description}
      </p>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">
            About
          </p>
          <h2 className="editorial-heading text-center mb-6">
            Building the
            <br />
            <span className="italic font-normal">future</span>
          </h2>
          <p className="body-large text-center max-w-2xl mx-auto mb-16">
            Motivated B.Tech Information Technology student seeking entry-level
            Software Developer role. Strong foundation in Java, Python, Web
            Development, and Machine Learning.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aboutPoints.map((point, i) => (
            <AboutCard key={point.title} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
