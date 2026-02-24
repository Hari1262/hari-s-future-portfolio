import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, Github } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Diabetes Prediction System",
    subtitle: "Machine Learning",
    description:
      "Built an ML model using glucose, BMI, and age data to predict diabetes risk for early detection. Helps healthcare providers identify at-risk patients.",
    tags: ["Python", "Scikit-Learn", "Data Analysis"],
    color: "from-accent/20 to-accent/5",
  },
  {
    title: "ERP College Management Portal",
    subtitle: "Full Stack Web App",
    description:
      "React-based ERP system managing 1,000+ student and staff records with centralized dashboards for streamlined academic operations.",
    tags: ["React", "Node.js", "MongoDB"],
    color: "from-primary/10 to-secondary/30",
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 80, rotateX: 15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: 15 }}
        transition={{
          duration: 0.9,
          delay: index * 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          perspective: "1200px",
          transform: `perspective(1200px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setOpen(true)}
        className="glass-card-elevated rounded-3xl overflow-hidden cursor-pointer group"
      >
        {/* Gradient header */}
        <div className={`h-2 bg-gradient-to-r ${project.color}`} />
        
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent px-3 py-1 rounded-full bg-accent/10">
              {project.subtitle}
            </span>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ExternalLink
                size={18}
                className="text-muted-foreground group-hover:text-accent transition-colors duration-300"
              />
            </motion.div>
          </div>
          <h3 className="editorial-subheading mb-4 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="body-large text-base mb-6 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border/50 hover:border-accent/40 hover:text-accent transition-all duration-300 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/20 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotateX: -10 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-elevated rounded-3xl p-8 md:p-12 max-w-lg w-full relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.color}`} />
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </motion.button>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block px-3 py-1 rounded-full bg-accent/10 w-fit">
                {project.subtitle}
              </span>
              <h3 className="editorial-subheading mb-4">{project.title}</h3>
              <p className="body-large text-base mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
