import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from "@emailjs/browser";

// ─── EmailJS config from environment variables ───────────────────────────────
// Set these in your .env file (copy from .env.example):
//   VITE_EMAILJS_SERVICE_ID=your_service_id
//   VITE_EMAILJS_TEMPLATE_ID=your_template_id
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState('');
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_name") {
      setFormData({ ...formData, name: value });
    } else if (name === "user_email") {
      setFormData({ ...formData, email: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus({
        type: 'error',
        message: 'Email service is not configured. Please set up environment variables.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus({
        type: 'success',
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) => `
    w-full px-4 py-3.5 rounded-xl text-light-900 placeholder-light-700/40
    bg-white/5 border transition-all duration-300 focus:outline-none resize-none
    ${focused === field
      ? 'border-primary/60 ring-2 ring-primary/15 bg-white/8'
      : 'border-white/10 hover:border-white/20'
    }
  `;

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* ── Header ── */}
      <motion.section variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp} className="relative inline-block mb-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-light-900 leading-tight">
            Let's Build Something
            <span className="text-primary">.</span>
          </h2>
          <motion.div
            className="mt-4 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
        <motion.p variants={fadeUp} className="text-light-700 text-lg max-w-lg mt-4">
          Have a question or want to work together? Drop me a message and I'll respond within 24 hours.
        </motion.p>
      </motion.section>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Left Panel ── */}
        <motion.aside
          className="lg:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Availability Badge */}
          <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
            <div>
              <p className="text-light-900 font-semibold text-sm">Available for Projects</p>
              <p className="text-light-700 text-xs mt-0.5">Open to freelance &amp; full-time roles</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="glass-card rounded-2xl p-6 space-y-5 flex-1">
            <h3 className="text-lg font-bold text-light-900">Contact Details</h3>

            <ContactRow
              icon={<FaEnvelope size={16} />}
              label="Email"
              value="shreymehrotra011@gmail.com"
              href="mailto:shreymehrotra011@gmail.com"
            />

            <ContactRow
              icon={<FaMapMarkerAlt size={16} />}
              label="Location"
              value="Shahjahanpur, UP, India"
              href="#"
            />
          </div>

          {/* Decorative Quote Card */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-5 text-6xl font-serif text-primary/10 leading-none select-none">"</div>
            <p className="text-light-700 text-sm leading-relaxed italic relative z-10">
              I believe great products are built through great collaboration. Let's create something remarkable together.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-primary text-xs font-semibold tracking-wide">Shrey</span>
            </div>
          </div>
        </motion.aside>

        {/* ── Right Panel: Form ── */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 space-y-5"
          >
            <h3 className="text-xl font-bold text-light-900 mb-6">Send a Message</h3>

            {/* Name + Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingField label="Your Name" htmlFor="name">
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  required
                  className={inputClass('name')}
                  placeholder="John Doe"
                />
              </FloatingField>

              <FloatingField label="Email Address" htmlFor="email">
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  required
                  className={inputClass('email')}
                  placeholder="john@example.com"
                />
              </FloatingField>
            </div>

            {/* Subject */}
            <FloatingField label="Subject" htmlFor="subject">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused('')}
                required
                className={inputClass('subject')}
                placeholder="Project Inquiry"
              />
            </FloatingField>

            {/* Message */}
            <FloatingField label="Message" htmlFor="message">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                required
                rows="5"
                className={inputClass('message')}
                placeholder="Tell me about your project..."
              />
            </FloatingField>

            {/* Character hint */}
            <p className="text-xs text-light-700/50 -mt-2 text-right">
              {formData.message.length} characters
            </p>

            {/* Status */}
            {status.message && (
              <motion.div
                className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
                  status.type === 'success'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="mt-0.5">{status.type === 'success' ? '✓' : '✕'}</span>
                <span>{status.message}</span>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-primary text-dark-900 py-4 rounded-xl font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane size={15} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Small helpers ── */

function FloatingField({ label, htmlFor, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-xs font-semibold tracking-wide text-light-700 uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactRow({ icon, label, value, href }) {
  return (
    <motion.a
      href={href}
      className="flex items-center gap-3 group"
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="w-9 h-9 rounded-lg glass flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-light-700/60 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-light-900 group-hover:text-primary transition-colors truncate">
          {value}
        </p>
      </div>
    </motion.a>
  );
}

export default Contact;