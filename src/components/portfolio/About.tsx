import { Code2, Brain, Globe, Rocket, type LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const points = [
  { icon_name: "Brain", title: "Machine Learning", description: "Building predictive models and intelligent systems using modern ML frameworks." },
  { icon_name: "Code2", title: "Full Stack Development", description: "Creating responsive web applications with React, Node.js, and modern tooling." },
  { icon_name: "Globe", title: "Data Science", description: "Extracting insights from complex datasets using Python, SQL, and visualization tools." },
  { icon_name: "Rocket", title: "Problem Solving", description: "Tackling algorithmic challenges and optimizing solutions for real-world applications." },
];

const iconMap: Record<string, LucideIcon> = { Brain, Code2, Globe, Rocket };

const AboutCard = ({ point, index }: { point: typeof points[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const IconComp = iconMap[point.icon_name] || Brain;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(4px)" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="glass-card-elevated rounded-2xl p-7 group cursor-default"
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
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">About</p>
          <h2 className="editorial-heading text-center mb-6">
            Building the<br />
            <span className="italic font-normal">future</span>
          </h2>
          <p className="body-large text-center max-w-2xl mx-auto mb-16">
            Aspiring Data Scientist and Full Stack Developer passionate about creating intelligent, user-centric applications.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map((point, i) => (
            <AboutCard key={point.title} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
