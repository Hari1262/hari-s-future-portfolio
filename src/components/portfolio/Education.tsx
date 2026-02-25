import { GraduationCap, School, BookOpen, type LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { useEducation } from "@/hooks/usePortfolioData";

const iconMap: Record<number, LucideIcon> = {
  0: BookOpen,
  1: School,
  2: GraduationCap,
};

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { data: educationSteps } = useEducation();

  return (
    <section id="education" className="section-padding bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">Education</p>
          <h2 className="editorial-heading text-center mb-16">
            Academic <span className="italic font-normal">Journey</span>
          </h2>
        </ScrollReveal>
        <div ref={ref} className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border origin-top md:-translate-x-px"
          />
          <div className="space-y-12">
            {educationSteps?.map((step, i) => {
              const isRight = i % 2 === 0;
              const IconComp = iconMap[i] || GraduationCap;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isRight ? -60 : 60, filter: "blur(4px)" }}
                  animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: isRight ? -60 : 60, filter: "blur(4px)" }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.25 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        step.is_current ? "bg-accent border-accent text-accent-foreground" : "bg-card border-border text-muted-foreground"
                      }`}
                    >
                      <IconComp size={20} />
                    </motion.div>
                  </div>
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${isRight ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8 md:text-left"}`}>
                    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="glass-card-elevated rounded-2xl p-6 group hover:border-accent/30 transition-all duration-300">
                      <span className="text-xs font-mono text-accent tracking-wider">{step.year}</span>
                      <h3 className="font-serif text-xl font-medium text-foreground mt-2 mb-1 group-hover:text-accent transition-colors duration-300">{step.degree}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{step.institution}</p>
                      <p className="text-xs text-muted-foreground/70">{step.detail}</p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
