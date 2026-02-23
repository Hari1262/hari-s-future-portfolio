import { Github, Linkedin, Instagram, Mail, Code2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/hariprasath-s",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hariprasath-s-600989297/",
    icon: Linkedin,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/hariprasath-s",
    icon: Code2,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/hariprasath_s",
    icon: Instagram,
  },
  {
    label: "Email",
    href: "mailto:sasiprasath1290@gmail.com",
    icon: Mail,
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
              Connect with me
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>

            <p className="text-xs text-stone tracking-wider mt-4">
              © 2026 Hariprasath S. Crafted with precision.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
