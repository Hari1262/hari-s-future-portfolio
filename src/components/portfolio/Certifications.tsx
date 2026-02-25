import { Award, BookOpen, Trophy, ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { useCertifications, useAwards } from "@/hooks/usePortfolioData";

const CertCard = ({ cert, index }: { cert: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card-elevated rounded-2xl p-5 flex items-center gap-4 group hover:border-accent/30 transition-all duration-300 float-3d"
    >
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 text-lg group-hover:scale-110 transition-transform">
        {cert.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{cert.name}</p>
        {cert.drive_url && (
          <a href={cert.drive_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline flex items-center gap-1 mt-0.5">
            <ExternalLink size={10} /> View Certificate
          </a>
        )}
      </div>
      <Award size={14} className="text-stone group-hover:text-accent transition-colors flex-shrink-0" />
    </motion.div>
  );
};

const Certifications = () => {
  const { data: certifications } = useCertifications();
  const { data: awards } = useAwards();

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">Credentials</p>
          <h2 className="editorial-heading text-center mb-12">
            Certifications<span className="text-gradient-warm">.</span>
          </h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {certifications?.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">Recognition</p>
          <h2 className="editorial-subheading text-center mb-10">
            Awards & <span className="italic font-normal">Research</span>
          </h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {awards?.map((award, i) => (
            <ScrollReveal key={award.id} delay={i * 0.15}>
              <div className="glass-card-elevated rounded-2xl p-6 float-3d">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    {i === 0 ? <Trophy size={18} className="text-accent" /> : <BookOpen size={18} className="text-accent" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{award.title}</h3>
                    <p className="text-sm text-muted-foreground">{award.subtitle}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
