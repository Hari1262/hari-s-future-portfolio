import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, Github } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Diabetes Prediction System",
    subtitle: "Machine Learning",
    description: "A machine learning model to predict diabetes using patient health metrics. Built with Python, Scikit-learn, and Flask for the web interface.",
    tags: ["Python", "Scikit-learn", "Flask", "Pandas"],
    color: "from-accent/20 to-accent/5",
    github_url: "https://github.com/hariprasath-s",
    demo_url: null,
    image_url: null,
  },
  {
    title: "ERP College Management Portal",
    subtitle: "Full Stack",
    description: "A comprehensive ERP portal for college management with student records, attendance tracking, and administrative tools.",
    tags: ["React", "Node.js", "MySQL", "Express"],
    color: "from-primary/20 to-primary/5",
    github_url: "https://github.com/hariprasath-s",
    demo_url: null,
    image_url: null,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [open, setOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 80, rotateX: 15, filter: "blur(6px)" }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          perspective: "1200px",
          transform: `perspective(1200px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        onClick={() => setOpen(true)}
        className="glass-card-elevated rounded-3xl overflow-hidden cursor-pointer group"
      >
        <div className={`h-2 bg-gradient-to-r ${project.color}`} />
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent px-3 py-1 rounded-full bg-accent/10">
              {project.subtitle}
            </span>
            <div className="flex gap-2">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-accent transition-colors">
                  <Github size={16} />
                </a>
              )}
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-300" />
            </div>
          </div>
          <h3 className="editorial-subheading mb-4 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
          <p className="body-large text-base mb-6 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span key={tag} whileHover={{ scale: 1.08, y: -2 }} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border/50 hover:border-accent/40 hover:text-accent transition-all duration-300 cursor-default">
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/20 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-elevated rounded-3xl p-8 md:p-12 max-w-lg w-full relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.color}`} />
              <button onClick={() => setOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"><X size={16} /></button>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block px-3 py-1 rounded-full bg-accent/10 w-fit">{project.subtitle}</span>
              <h3 className="editorial-subheading mb-4">{project.title}</h3>
              <p className="body-large text-base mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border/50">{tag}</span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-accent/10 hover:text-accent transition-colors">
                    <Github size={14} /> View on GitHub
                  </a>
                )}
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
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4">Selected Work</p>
          <h2 className="editorial-heading mb-16">Projects<span className="text-gradient-warm">.</span></h2>
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
