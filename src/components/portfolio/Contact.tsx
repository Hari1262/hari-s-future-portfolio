import { useState } from "react";
import { Mail, Phone, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder – would integrate EmailJS or backend
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-4 text-center">
            Get In Touch
          </p>
          <h2 className="editorial-heading text-center mb-6">
            Let's <span className="italic font-normal">connect</span>
          </h2>
          <p className="body-large text-center max-w-xl mx-auto mb-16">
            Open to opportunities, collaborations, and interesting conversations.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <ScrollReveal>
            <div className="space-y-6">
              <a
                href="tel:9342666042"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="font-medium text-foreground">9342666042</p>
                </div>
              </a>

              <a
                href="mailto:sasiprasath1290@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Email
                  </p>
                  <p className="font-medium text-foreground">
                    sasiprasath1290@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/hariprasath-s-600989297/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Linkedin size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    LinkedIn
                  </p>
                  <p className="font-medium text-foreground">
                    Hariprasath S
                  </p>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-stone text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-stone text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
              <textarea
                placeholder="Your Message"
                required
                maxLength={1000}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-stone text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {sent ? "Message Sent ✓" : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default Contact;
