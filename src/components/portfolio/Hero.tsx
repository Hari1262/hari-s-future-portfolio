import { motion } from "framer-motion";
import { ArrowDown, FileDown, Github, Linkedin, Mail } from "lucide-react";
import TypeWriter from "./TypeWriter";
import heroBg from "@/assets/hero-bg.jpg";
import profilePic from "@/assets/profile-pic.png";
import { useHeroSettings } from "@/hooks/usePortfolioData";

const Hero = () => {
  const { data: hero } = useHeroSettings();

  const name = hero?.name || "Hariprasath S";
  const title = hero?.title || "Data Science & Full Stack Developer";
  const subtitle = hero?.subtitle || "Portfolio 2026";
  const githubUrl = hero?.github_url || "#";
  const linkedinUrl = hero?.linkedin_url || "#";
  const emailAddr = hero?.email || "";
  const heroImage = hero?.profile_image_url || profilePic;

  // Dynamic sizing based on name length
  const nameLen = name.length;
  const imgSizeClass = nameLen > 15
    ? "w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56"
    : "w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-24 h-24 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [15, -15, 15], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-[10%] w-16 h-16 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative shrink-0"
          >
            <div className={`${imgSizeClass} rounded-full overflow-hidden border-[3px] border-accent/50 shadow-xl shadow-accent/20`}>
              <img src={heroImage} alt={name} className="w-full h-full object-cover" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1.5 rounded-full border border-dashed border-accent/30 pointer-events-none"
            />
          </motion.div>
          <h1 className="editorial-heading">
            {name.split(" ").slice(0, -1).join(" ")}
            <span className="text-gradient-warm italic font-normal"> {name.split(" ").pop()}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground mb-4 font-light"
        >
          {title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-8"
        >
          <TypeWriter />
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {[
            { icon: Github, href: githubUrl, label: "GitHub" },
            { icon: Linkedin, href: linkedinUrl, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${emailAddr}`, label: "Email" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 flex items-center gap-2"
          >
            View Projects
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-border text-foreground rounded-full text-sm font-medium tracking-wide hover:bg-secondary transition-all duration-300 flex items-center gap-2"
          >
            <FileDown size={16} />
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
