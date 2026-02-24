import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const skillCategories = [
  {
    title: "Programming",
    skills: ["Java", "Python", "HTML", "CSS"],
  },
  {
    title: "Databases",
    skills: ["SQL", "MongoDB"],
  },
  {
    title: "Tools",
    skills: ["Git", "VS Code", "Eclipse", "Jupyter Notebook"],
  },
  {
    title: "Domains",
    skills: [
      "Machine Learning",
      "Data Analysis",
      "Full Stack Development",
      "Business & Data Analytics",
      "Cybersecurity",
    ],
  },
];

const SkillCard = ({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 40, rotateX: 8 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="glass-card-elevated rounded-2xl p-8 float-3d"
      style={{ perspective: "1000px" }}
    >
      <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-6">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 + si * 0.06 }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border/50 hover:border-accent/40 hover:bg-accent/10 hover:text-accent transition-all duration-300 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">
            Expertise
          </p>
          <h2 className="editorial-heading text-center mb-16">
            Skills & <span className="italic font-normal">Tools</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
