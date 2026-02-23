import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Diabetes Prediction System",
    subtitle: "Machine Learning",
    description:
      "Built an ML model using glucose, BMI, and age data to predict diabetes risk for early detection. Helps healthcare providers identify at-risk patients.",
    tags: ["Python", "Scikit-Learn", "Data Analysis"],
  },
  {
    title: "ERP College Management Portal",
    subtitle: "Full Stack Web App",
    description:
      "React-based ERP system managing 1,000+ student and staff records with centralized dashboards for streamlined academic operations.",
    tags: ["React", "Node.js", "MongoDB"],
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onClick={() => setOpen(true)}
        className="glass-card-elevated rounded-3xl p-8 md:p-10 cursor-pointer float-3d group"
      >
        <div className="flex items-start justify-between mb-6">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent">
            {project.subtitle}
          </span>
          <ExternalLink
            size={18}
            className="text-stone group-hover:text-accent transition-colors"
          />
        </div>
        <h3 className="editorial-subheading mb-4">{project.title}</h3>
        <p className="body-large text-base mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card-elevated rounded-3xl p-8 md:p-12 max-w-lg w-full relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">
              {project.subtitle}
            </span>
            <h3 className="editorial-subheading mb-4">{project.title}</h3>
            <p className="body-large text-base mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4">
            Selected Work
          </p>
          <h2 className="editorial-heading mb-16">
            Projects<span className="text-gradient-warm">.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
