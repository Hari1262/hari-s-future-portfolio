import { Lightbulb, Brain, BarChart3, Globe, Cpu, Database } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const interests = [
  { icon: Brain, title: "Artificial Intelligence", description: "Deep learning, neural networks, and intelligent automation systems." },
  { icon: BarChart3, title: "Data Analytics", description: "Deriving actionable insights from complex datasets through statistical analysis." },
  { icon: Globe, title: "Web Technologies", description: "Modern frontend frameworks, progressive web apps, and responsive design." },
  { icon: Cpu, title: "Machine Learning", description: "Supervised and unsupervised learning, model optimization, and deployment." },
  { icon: Database, title: "Big Data", description: "Processing and analyzing large-scale datasets with distributed computing." },
  { icon: Lightbulb, title: "IoT & Embedded Systems", description: "Smart devices, sensor networks, and real-time data processing." },
];

const InterestCard = ({ interest, index }: { interest: typeof interests[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card-elevated rounded-2xl p-6 group cursor-default"
    >
      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
        <interest.icon size={20} className="text-accent" />
      </div>
      <h3 className="font-serif text-base font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
        {interest.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>
    </motion.div>
  );
};

const AreaOfInterest = () => {
  return (
    <section id="interests" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">Passions</p>
          <h2 className="editorial-heading text-center mb-16">
            Area of <span className="italic font-normal">Interest</span>
          </h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {interests.map((interest, i) => (
            <InterestCard key={interest.title} interest={interest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreaOfInterest;
