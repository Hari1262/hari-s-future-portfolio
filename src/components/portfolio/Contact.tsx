import { useState } from "react";
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message too long (max 1000 chars)"),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const validate = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // Simulated send
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  const inputClasses = (field: keyof FormErrors) =>
    `w-full px-5 py-3.5 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
      errors[field]
        ? "border-destructive focus:ring-destructive/30"
        : "border-border focus:ring-accent/30 hover:border-accent/40"
    }`;

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
          {/* Contact info + Map */}
          <ScrollReveal>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: "9342666042", href: "tel:9342666042" },
                { icon: Mail, label: "Email", value: "sasiprasath1290@gmail.com", href: "mailto:sasiprasath1290@gmail.com" },
                { icon: Linkedin, label: "LinkedIn", value: "Hariprasath S", href: "https://www.linkedin.com/in/hariprasath-s-600989297/", external: true },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}

            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={inputClasses("name")}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle size={12} /> {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={inputClasses("email")}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle size={12} /> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  maxLength={1000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  className={`${inputClasses("message")} resize-none`}
                />
                <div className="flex justify-between items-center mt-1">
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-destructive flex items-center gap-1"
                      >
                        <AlertCircle size={12} /> {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p className="text-xs text-muted-foreground/50 ml-auto">
                    {form.message.length}/1000
                  </p>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-60"
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Send Message <Send size={16} />
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                      Sending...
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-300">
                      <CheckCircle size={16} /> Message Sent!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
