import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import profilePic from "@/assets/profile-pic.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Profile pic + Name */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={profilePic}
            alt="Hariprasath S"
            className="w-9 h-9 rounded-full object-cover border-2 border-accent/40 group-hover:border-accent transition-colors"
          />
          <span className="font-serif text-lg font-medium text-foreground tracking-tight">
            Hariprasath<span className="text-gradient-warm"> S</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Resume download */}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-accent-foreground text-xs font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a
            href="/resume.pdf"
            download
            className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center"
            aria-label="Download Resume"
          >
            <Download size={14} />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-card mt-2 mx-6 rounded-2xl p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
