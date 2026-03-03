import { Award, ExternalLink, Eye } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const certifications = [
  { name: "AWS Cloud Practitioner", icon: "☁️", drive_url: "https://drive.google.com/file/d/example1" },
  { name: "Artificial Intelligence Fundamentals-IBM SkillsBuild", icon: "📊", drive_url: "https://drive.google.com/file/d/17_soyKA8Uk_N8_i2QurNHxKJ-Nk466Aa/view?usp=drive_link" },
  { name: "Cisco Networking Essentials", icon: "🌐", drive_url: "https://drive.google.com/file/d/example3" },
  { name: "Oracle Certified Professional Certificate of Recognition", icon: "📈", drive_url: "https://drive.google.com/file/d/12anOEKagUz1DWW3uYREmDQDZfp_OksoV/view?usp=drive_link" },
  { name: "Cybersecurity Analyst Job Simulation-TATA Forage", icon: "🤖", drive_url: "https://drive.google.com/file/d/1ZrmPBQn3vqrZNCJJhtSvBiTcTS9U_CFW/view?usp=drive_link" },
  { name: "Machine Learning – Stanford Online", icon: "🤖", drive_url: "https://drive.google.com/file/d/example6" },
  { name: "AWS Cloud Practitioner", icon: "☁️", drive_url: "https://drive.google.com/file/d/example1" },
  { name: "AWS Cloud Practitioner", icon: "☁️", drive_url: "https://drive.google.com/file/d/example1" },
  { name: "AWS Cloud Practitioner", icon: "☁️", drive_url: "https://drive.google.com/file/d/example1" },
];

const CertCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
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
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {cert.drive_url && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(true)}
              className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors"
              aria-label="View certificate"
            >
              <Eye size={14} />
            </motion.button>
          )}
          <Award size={14} className="text-stone group-hover:text-accent transition-colors" />
        </div>
      </motion.div>

      <AnimatePresence>
        {showPreview && cert.drive_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/20 backdrop-blur-md"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-elevated rounded-3xl p-6 max-w-2xl w-full relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cert.icon}</span>
                  <h3 className="font-serif text-lg font-medium text-foreground">{cert.name}</h3>
                </div>
                <button onClick={() => setShowPreview(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">✕</button>
              </div>
              <div className="rounded-xl overflow-hidden bg-secondary/50 h-96 flex items-center justify-center mb-4">
                <iframe src={cert.drive_url.replace("/file/d/", "/file/d/").replace(/\/view.*$/, "/preview")} className="w-full h-full border-0" title={cert.name} />
              </div>
              <a
                href={cert.drive_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity w-fit mx-auto"
              >
                <ExternalLink size={14} /> Open in New Tab
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Certifications = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">Credentials</p>
          <h2 className="editorial-heading text-center mb-12">
            Certifications<span className="text-gradient-warm">.</span>
          </h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
