"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Globe, 
  GraduationCap, 
  Award, 
  Menu, 
  X, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ChevronDown,
  Linkedin,
  Instagram
} from "lucide-react";
import clsx from "clsx";

import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

// --- Components ---

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Please verify you are not a robot!");
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        recaptchaRef.current?.reset();
      } else {
        setStatus("error");
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      setStatus("error");
      alert("Failed to send message.");
    }
  };

  return (
    <div className="glass-panel p-10 rounded-3xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 shadow-sm" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 shadow-sm" 
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</label>
          <textarea 
            rows={4} 
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 resize-none shadow-sm"
          ></textarea>
        </div>
        
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Test key or env var
          />
        </div>

        <button 
          type="submit" 
          disabled={status === "sending" || status === "success"}
          className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-glow hover:bg-rose-600 transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
        </button>
        {status === "success" && <p className="text-green-600 text-center font-bold">Thank you! We will get back to you soon.</p>}
        {status === "error" && <p className="text-red-600 text-center font-bold">Failed to send. Please try again.</p>}
      </form>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Focus", href: "#focus" },
    { name: "About", href: "#about" },
    { name: "Patrons", href: "#patrons" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl py-2 border-slate-200/50 shadow-sm" 
          : "bg-transparent py-6 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group relative z-50">
          <div className={clsx("relative transition-all duration-500", scrolled ? "w-16 h-16" : "w-28 h-28")}>
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <img src="/assets/logo.png" alt="PAA Logo" className="w-full h-full object-contain relative z-10 drop-shadow-md" />
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 bg-white/50 backdrop-blur-md px-8 py-2 rounded-full border border-white/40 shadow-sm">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold text-slate-600 hover:text-primary transition-colors relative group tracking-[0.15em] uppercase"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://goo.gl/forms/sCrJ2Q0l8Fx97yeq2" 
            target="_blank"
            className="px-6 py-2.5 bg-gradient-to-r from-primary to-rose-600 text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all text-xs uppercase tracking-widest flex items-center gap-2"
          >
            Register <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display text-slate-700 hover:text-primary transition-colors border-b border-slate-100 pb-2"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://goo.gl/forms/sCrJ2Q0l8Fx97yeq2" 
                target="_blank"
                className="mt-4 px-6 py-3 bg-primary text-center text-white font-bold rounded-lg uppercase tracking-wider"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const SectionTitle = ({ title, subtitle, align = "center" }: { title: string, subtitle: string, align?: "left" | "center" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={clsx("mb-20", align === "center" ? "text-center" : "text-left")}
  >
    <span className="text-primary font-bold tracking-[0.3em] text-sm uppercase mb-4 block">{subtitle}</span>
    <h2 className="font-display text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
      {title}
    </h2>
    <div className={clsx("w-24 h-1.5 bg-gradient-to-r from-primary to-gold rounded-full mt-6", align === "center" ? "mx-auto" : "")}></div>
  </motion.div>
);

// --- Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <div className="absolute inset-0 bg-white/20 z-10 mix-blend-overlay backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 via-80% to-transparent z-20"></div>
          <img 
            src="https://preparatoryalumni.org/wp-content/uploads/2019/03/mainbg.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-110 opacity-80"
          />
        </motion.div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: y2 }}
        className="relative z-30 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-slate-600 text-xs font-bold tracking-[0.2em] uppercase">Est. 2013 • Dhaka, Bangladesh</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center font-display text-slate-900 mb-8 md:mb-10 drop-shadow-sm text-center leading-[0.8]"
        >
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-200 drop-shadow-sm border-slate-200">
            PREPARATORY
          </span>
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter relative group cursor-default -mt-2 md:-mt-4">
            <span className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="text-gradient-primary relative inline-block animate-text-shimmer bg-[length:200%_auto]">
              NETWORK
            </span>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Forging a legacy of excellence and unity. We are the official global community for alumni of <span className="text-primary font-bold">Mohammadpur Preparatory School & College</span>, connecting generations since 2013.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <a 
            href="https://goo.gl/forms/sCrJ2Q0l8Fx97yeq2" 
            target="_blank"
            className="group relative px-8 py-4 bg-primary text-white font-bold text-sm rounded-full overflow-hidden shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all w-full sm:w-auto min-w-[200px]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 uppercase tracking-widest flex items-center justify-center gap-2">
              Join Now <ArrowRight size={16} />
            </span>
          </a>
          <a 
            href="#about"
            className="px-8 py-4 bg-white/50 backdrop-blur-md border border-white/60 text-slate-700 font-bold text-sm rounded-full hover:bg-white hover:text-primary transition-all uppercase tracking-widest hover:border-primary/20 w-full sm:w-auto min-w-[200px] shadow-sm"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>


      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-slate-400"
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>
  );
};

const FocusCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    className="group glass-panel p-10 rounded-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-100 to-transparent rounded-bl-full transition-transform duration-500 group-hover:scale-110"></div>
    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-8 border border-slate-200 group-hover:bg-primary group-hover:border-primary transition-all duration-300 relative z-10 shadow-sm group-hover:shadow-lg">
      <Icon className="text-primary group-hover:text-white transition-colors duration-300" size={32} />
    </div>
    <h3 className="font-display font-bold text-xl md:text-2xl text-slate-900 mb-4 relative z-10 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-slate-600 leading-relaxed relative z-10 group-hover:text-slate-800 transition-colors">
      {desc}
    </p>
  </motion.div>
);

const StatCard = ({ number, label, delay }: { number: string, label: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200 text-center group hover:border-primary/30 transition-all duration-300 shadow-sm"
  >
    <div className="font-display text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-400 to-slate-600 mb-2 group-hover:from-primary group-hover:to-orange-500 transition-all duration-300">
      {number}
    </div>
    <div className="text-xs font-bold text-primary uppercase tracking-[0.2em]">{label}</div>
  </motion.div>
);

const PatronCard = ({ name, role, img, delay, featured = false, fbLink }: { name: string, role: string, img: string, delay: number, featured?: boolean, fbLink?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={clsx("group relative", featured ? "h-full" : "")}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
    <div className={clsx(
      "bg-white border border-slate-200 rounded-2xl flex flex-col items-center text-center relative z-10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl h-full",
      featured ? "p-12 justify-center" : "p-8"
    )}>
      <div className={clsx(
        "rounded-full p-1 bg-gradient-to-br from-gold to-primary mb-6 shadow-gold-glow group-hover:scale-110 transition-transform duration-500",
        featured ? "w-48 h-48" : "w-24 h-24"
      )}>
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      <h3 className={clsx(
        "font-display font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors",
        featured ? "text-3xl" : "text-xl"
      )}>{name}</h3>
      <div className="h-px w-12 bg-slate-200 my-3 group-hover:w-24 group-hover:bg-primary transition-all duration-300"></div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">{role}</p>
      
      {/* Social Icons */}
      {fbLink && (
        <div className="flex gap-4 mt-auto">
          <a href={fbLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors transform hover:scale-110"><Facebook size={featured ? 24 : 18} /></a>
        </div>
      )}
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <main className="bg-white text-slate-600 min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      
      <Hero />

      {/* Focus Section */}
      <section id="focus" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle 
            title="OUR CORE MISSION" 
            subtitle="Why We Exist" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FocusCard 
              icon={Globe}
              title="Global Network" 
              desc="Creating a solid foothold everywhere and in every walk of life for our alumni spread across the world."
              delay={0.1}
            />
            <FocusCard 
              icon={Users}
              title="Lifelong Bonds" 
              desc="Fostering enduring relationships among alumni through diverse activities and reunion events."
              delay={0.2}
            />
            <FocusCard 
              icon={GraduationCap}
              title="Mentorship" 
              desc="Providing career counseling and mentorship programs to guide the next generation of leaders."
              delay={0.3}
            />
            <FocusCard 
              icon={Award}
              title="Celebrating Success" 
              desc="Promoting and celebrating the professional achievements and success stories of our members."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* About Section - Split Layout */}
      <section id="about" className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-200/50 skew-x-12 transform origin-top-right"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle 
                title="A LEGACY OF EXCELLENCE" 
                subtitle="About Us" 
                align="left"
              />
              <div className="prose prose-lg prose-slate text-slate-600 font-light">
                <p className="mb-6">
                  The <strong className="text-slate-900">Preparatory Alumni Association (PAA)</strong> serves as the vital bridge connecting the illustrious history of <strong className="text-slate-900">Mohammadpur Preparatory School & College</strong> with the promising future of its graduates. Since our establishment in 2013, we have evolved into a vibrant <strong className="text-slate-900">alumni network</strong> of professionals, leaders, and changemakers across Dhaka and the globe.
                </p>
                <p className="mb-6">
                  We are more than just an association; we are a hub for career development, lifelong learning, and social impact. Our members hold leading positions in top local and foreign enterprises, bringing glory to our alma mater.
                </p>
                <p>
                  Collaborating closely with the Governing Body, we strive to maintain the high educational standards that shaped us, ensuring the institution continues to produce exceptional individuals.
                </p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10"
              >
                <a href="#contact" className="text-primary font-bold uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2 group">
                  Get In Touch <span className="group-hover:translate-x-2 transition-transform">→</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <StatCard number="2013" label="Established" delay={0.2} />
              <StatCard number="50+" label="Events Hosted" delay={0.3} />
              <StatCard number="100%" label="Alumni Run" delay={0.4} />
              <StatCard number="Global" label="Community" delay={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Patrons Section */}
      <section id="patrons" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle 
            title="LEADERSHIP" 
            subtitle="Our Patrons" 
          />
          
          <div className="flex justify-center mb-16">
            <p className="max-w-2xl text-center text-slate-500 text-lg">
              Guided by a dedicated team of patrons who oversee operations and foster individual relationships within different groups.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
             {/* President - Highlighted Column */}
             <div className="lg:col-span-5">
                <PatronCard 
                  name="Syeda Sabera Arefin (Juthika)" 
                  role="President" 
                  img="/assets/president-syeda-sabera-arefin.jpg"
                  delay={0.1} 
                  featured={true}
                  fbLink="https://www.facebook.com/juthika.13"
                />
             </div>
 
             {/* Other Patrons - Bento Grid Column */}
             <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
                <PatronCard 
                  name="Saleema Najenin Siddiqua" 
                  role="Vice President" 
                  img="/assets/vp-saleema-150x150.jpg"
                  delay={0.2} 
                  fbLink="https://www.facebook.com/tanjeema/"
                />
                <PatronCard 
                  name="Tonima Rahman" 
                  role="VP, Operations" 
                  img="/assets/vp-tonima-150x150.jpg"
                  delay={0.3} 
                  fbLink="https://www.facebook.com/tonima.rahman.5"
                />
                <PatronCard 
                  name="Raisa Tabassum" 
                  role="General Secretary" 
                  img="/assets/gs-raisa-150x150.jpg"
                  delay={0.4} 
                  fbLink="https://www.facebook.com/raisa.tabassum.92"
                />
                <PatronCard 
                  name="Mohammad Sakhawat Hussin Sakib" 
                  role="Joint Secretary" 
                  img="/assets/sh-saqib-150x150.jpg"
                  delay={0.5} 
                  fbLink="https://www.facebook.com/Sakibshah"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <footer id="contact" className="bg-slate-100 border-t border-slate-200 pt-32 pb-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 mb-20">
            <div>
              <SectionTitle title="LET'S CONNECT" subtitle="Contact Us" align="left" />
              <p className="text-slate-600 text-lg mb-10 max-w-md">
                Have questions or want to join the network? We are here to help you connect with your fellow alumni.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-primary shadow-sm"><MapPin size={24} /></div>
                  <div>
                    <h4 className="text-slate-900 font-bold uppercase tracking-wider mb-1">Visit Us</h4>
                    <p className="text-slate-600">15/1, Iqbal Road, Mohammadpur, Dhaka-1207</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-primary shadow-sm"><Mail size={24} /></div>
                  <div>
                    <h4 className="text-slate-900 font-bold uppercase tracking-wider mb-1">Email Us</h4>
                    <p className="text-slate-600">info@preparatoryalumni.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-primary shadow-sm"><Phone size={24} /></div>
                  <div>
                    <h4 className="text-slate-900 font-bold uppercase tracking-wider mb-1">Call Us</h4>
                    <p className="text-slate-600">+8801825815508</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="https://www.facebook.com/info.PAA/" target="_blank" className="p-4 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 border border-blue-100">
                  <Facebook size={24} />
                </a>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="border-t border-slate-200 pt-10 text-center">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Preparatory Alumni Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
