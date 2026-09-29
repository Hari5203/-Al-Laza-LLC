/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Zap, 
  Cpu, 
  Target, 
  Rocket, 
  Info,
  Handshake,
  Building2,
  ExternalLink,
  Users,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Send,
  MessageSquare,
  MessageCircle
} from 'lucide-react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'satisfaction', label: 'Client Success' },
  { id: 'vision', label: 'Vision' },
  { id: 'contact', label: 'Contact' }
];

const GALLERY_IMAGES = []; // Not used anymore

const CompanyLogo = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left Part */}
    <path d="M 0 90 H 45 C 45 90 48 88 48 80 C 48 65 38 45 18 25 L 5 40 C 25 60 30 75 30 80 H 0 Z" />
    {/* Right Part */}
    <path d="M 100 90 H 55 C 55 90 52 88 52 80 C 52 65 62 45 82 25 L 95 40 C 75 60 70 75 70 80 H 100 Z" />
  </svg>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastSubmitted, setLastSubmitted] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  const businessEmail = "allazatradingllc@gmail.com";
  const businessPhone = "+971 56 276 8681";
  const rawWhatsAppNumber = "971562768681";

  const getWhatsAppUrl = (data = formData) => {
    const lines = [
      `*Enquiry for Al-Laza Trading L.L.C*`,
      `*Name:* ${data.name ? data.name : 'Prospective Client'}`,
      data.email ? `*Email:* ${data.email}` : null,
      data.subject ? `*Subject:* ${data.subject}` : null,
      `*Message:* ${data.message || 'Hello, I would like to enquire about your electrical and trading products.'}`
    ].filter(Boolean).join('\n');
    return `https://wa.me/${rawWhatsAppNumber}?text=${encodeURIComponent(lines)}`;
  };

  const getSmsUrl = (data = formData) => {
    const text = `Al-Laza Trading Enquiry - From: ${data.name || 'Client'}${data.subject ? ` [${data.subject}]` : ''}: ${data.message || 'Hello, I want to enquire about your services.'}`;
    return `sms:+971562768681?&body=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 1. Send to Backend (Nodemailer dispatches to allazatrading19@gmail.com)
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setLastSubmitted({ ...formData });
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#1A1B1E] text-white font-sans scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-[#1A1B1E]/90 backdrop-blur-lg border-b border-white/5' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 bg-[#D1644D] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-[#D1644D]/20">
              <CompanyLogo className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] text-white/40 mb-0.5">اللذة للتجارة ذ.م.م</span>
              <span className="text-2xl font-bold tracking-tighter">AL-LAZA</span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-[#D1644D] font-bold mt-0.5">Trading L.L.C</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-[#D1644D] transition-colors font-medium"
              >
                {s.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-[#D1644D] hover:bg-[#b5523d] rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#D1644D]/20 flex items-center gap-2 cursor-pointer"
            >
              Enquire Now <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-[#1A1B1E] border-b border-white/5 p-6 flex flex-col gap-4 md:hidden"
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="text-left text-lg font-medium py-2 border-b border-white/5"
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1920" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1B1E]/80 via-transparent to-[#1A1B1E]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-none mb-4">
              AL-LAZA
            </h1>
            <p className="text-2xl md:text-5xl font-light text-[#D1644D] uppercase tracking-[0.4em] mb-12">
              Trading L.L.C.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => scrollToSection('about')}
                className="px-10 py-4 bg-[#D1644D] hover:bg-[#b5523d] rounded-full text-sm uppercase tracking-widest font-bold transition-all shadow-xl shadow-[#D1644D]/30 flex items-center gap-3"
              >
                Explore Profile <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-white/40 font-mono tracking-widest">EST. DUBAI 2022</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#D1644D]">
                <Info className="w-6 h-6" />
                <span className="text-sm uppercase tracking-[0.3em] font-bold">About Us</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Specializing in <br />
                <span className="text-[#D1644D]">Electrical And Electronics Excellence</span>
              </h2>
            </div>
            <p className="text-xl leading-relaxed text-white/60 font-light">
              Al-Laza Trading LLC, founded in Dubai in 2022, specializes in electrical and electronic products. Our main office is in the H.H. Shaikh Saud Bin Saqar Building, near the Salah Al Din Metro Station. We serve a wide range of clients across the UAE with a growing supply network. We are committed to innovation and excellence, aiming to set new industry standards. Our team of seasoned professionals is dedicated to delivering top-notch service and ensuring customer satisfaction, fostering long-lasting relationships built on trust and transparency.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-4xl font-bold text-white mb-1">2022</p>
                <p className="text-xs uppercase tracking-widest text-[#D1644D]">Founded</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-1">UAE</p>
                <p className="text-xs uppercase tracking-widest text-[#D1644D]">Coverage</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Modern Dubai Building" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-[#D1644D] p-10 rounded-[2rem] shadow-2xl hidden md:block">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold">Our Services</h2>
            <p className="text-xl text-white/50">
              Extensive selection of electrical materials and electronics, dedicated to maintaining high quality and consistent value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                title: 'Electrical Material', 
                icon: <Zap className="w-10 h-10" />, 
                desc: 'Basic electrical components to advanced industrial materials.',
                img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800"
              },
              { 
                title: 'Electronics', 
                icon: <Cpu className="w-10 h-10" />, 
                desc: 'Cutting-edge electronic products for residential and commercial needs.',
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[3rem] bg-[#2D2E32] border border-white/5"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="p-10 space-y-4">
                  <div className="w-20 h-20 bg-[#D1644D] rounded-2xl flex items-center justify-center -mt-20 relative z-10 shadow-xl shadow-[#D1644D]/20">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold">{service.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Satisfaction Section */}
      <section id="satisfaction" className="py-40 bg-black text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D1644D]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center space-y-16 relative z-10">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 bg-[#D1644D]/10 border border-[#D1644D]/20 px-6 py-2 rounded-full"
            >
              <Users className="w-5 h-5 text-[#D1644D]" />
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-[#D1644D]">Client Success</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter">
              Your Satisfaction, <br />
              Is Our <span className="text-[#D1644D]">Top Priority.</span>
            </h2>
            <div className="w-24 h-1 bg-[#D1644D] mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto">
            {[
              "Seasoned professionals dedicated to service",
              "Long-lasting relationships built on trust",
              "Consistent value and reliable products",
              "Continuous strive to exceed expectations"
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 p-8 bg-zinc-900/50 rounded-3xl border border-white/5 backdrop-blur-sm hover:border-[#D1644D]/30 transition-colors group"
              >
                <CheckCircle2 className="w-8 h-8 text-[#D1644D] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-medium leading-tight text-white/90">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-12"
          >
            <p className="text-9xl font-bold text-[#D1644D] opacity-20 select-none">100%</p>
            <p className="text-xl font-light tracking-[0.5em] uppercase -mt-12 text-white/60">Commitment to Excellence</p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-32 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              className="group relative overflow-hidden rounded-[3rem] bg-white/5 border border-white/10"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Our Vision" 
                  className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-12 space-y-6 relative z-10 -mt-20">
                <div className="w-20 h-20 bg-[#D1644D] rounded-2xl flex items-center justify-center shadow-xl shadow-[#D1644D]/20">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold">Our Vision</h3>
                <p className="text-lg text-white/60 leading-relaxed">
                  Our objective is to maintain our position as a premier supplier of high-quality and durable equipments, accessories, with an unwavering emphasis on customer service. We carefully import products that minimize environmental impact while ensuring they remain competitively priced for our customers.
                </p>
              </div>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-[3rem] bg-white/5 border border-white/10"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000" 
                  alt="Our Mission" 
                  className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-12 space-y-6 relative z-10 -mt-20">
                <div className="w-20 h-20 bg-[#D1644D] rounded-2xl flex items-center justify-center shadow-xl shadow-[#D1644D]/20">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold">Our Mission</h3>
                <p className="text-lg text-white/60 leading-relaxed">
                  Our main mission and aim has always been our commitment to deliver exceptional service and outstanding product quality, complemented by innovative accessories that introduce new products to the market. We prioritize the professional development of our employees to empower them to succeed.
                </p>
              </div>
            </motion.div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                  Let's make some <br />
                  <span className="text-[#D1644D]">happy good deals</span>
                </h2>
                <div className="w-24 h-2 bg-[#D1644D]" />
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#D1644D] transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Call Us / WhatsApp</p>
                    <a href="tel:+971562768681" className="text-2xl font-bold hover:text-[#D1644D] transition-colors block">
                      +971 56 276 8681
                    </a>
                    <a 
                      href="https://wa.me/971562768681" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1.5 mt-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#D1644D] transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Email Us</p>
                    <a 
                      href="mailto:allazatradingllc@gmail.com" 
                      className="text-xl md:text-2xl font-bold hover:text-[#D1644D] transition-colors block break-all"
                    >
                      allazatradingllc@gmail.com
                    </a>
                    <p className="text-xs text-white/40 mt-1">Direct inbox monitored daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#D1644D] transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-xl font-medium text-white/70">Al-Laza Trading LLC, H.H Shaikh Saud Bin Saqar Building, Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#2D2E32] p-8 md:p-12 rounded-[3rem] border border-white/5 space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">Send an Enquiry</h3>
                <p className="text-sm text-white/50">
                  Delivered directly to <span className="text-[#D1644D] font-mono">allazatradingllc@gmail.com</span> & WhatsApp (<span className="text-emerald-400 font-mono">+971 56 276 8681</span>)
                </p>
              </div>

              {submitStatus === 'success' && lastSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 space-y-5 text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white">Enquiry Dispatched to {businessEmail}!</h4>
                      <p className="text-sm text-white/70">
                        Thank you <span className="font-semibold text-white">{lastSubmitted.name}</span>. Your message has been routed to our team inbox.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Also Notify Phone ({businessPhone})</span>
                    </div>
                    <p className="text-xs text-white/60">
                      Want an instant reply? You can also forward your message directly to our official WhatsApp or SMS right now:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      <a 
                        href={getWhatsAppUrl(lastSubmitted)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" /> Open in WhatsApp (+971 56 276 8681)
                      </a>
                      <a 
                        href={getSmsUrl(lastSubmitted)}
                        className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Send SMS
                      </a>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => {
                      setSubmitStatus('idle');
                      setLastSubmitted(null);
                    }}
                    className="text-xs text-white/40 hover:text-white underline block mx-auto pt-1 cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-[#D1644D] outline-none transition-colors" 
                    />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your Email" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-[#D1644D] outline-none transition-colors" 
                    />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Subject (e.g. Electrical Supplies Enquiry)" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-[#D1644D] outline-none transition-colors" 
                  />
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Message / Details of your requirement" 
                    rows={4} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-[#D1644D] outline-none transition-colors" 
                  />

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-2 text-left">
                      <p className="text-red-400 font-medium text-sm">
                        Network issue communicating with server. You can still reach us directly:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp to +971 56 276 8681
                        </a>
                        <a 
                          href={`mailto:allazatradingllc@gmail.com?subject=${encodeURIComponent(formData.subject || 'Enquiry')}&body=${encodeURIComponent(formData.message)}`}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" /> Email Direct
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#D1644D] hover:bg-[#b5523d] rounded-2xl font-bold uppercase tracking-widest transition-all shadow-xl shadow-[#D1644D]/20 disabled:opacity-50 flex items-center justify-center gap-3 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending to allazatradingllc@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <span>Send to allazatradingllc@gmail.com</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-white/10"></div>
                      <span className="flex-shrink mx-4 text-xs text-white/40 uppercase tracking-widest font-mono">or send directly to phone</span>
                      <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <a 
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-2 text-white cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Chat on WhatsApp (+971 56 276 8681)</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <CompanyLogo className="w-8 h-8 text-[#D1644D]" />
            <div className="flex flex-col leading-none">
              <span className="text-[8px] text-white/20 mb-0.5">اللذة للتجارة ذ.م.م</span>
              <span className="text-xl font-bold tracking-tighter">AL-LAZA</span>
              <span className="text-[7px] uppercase tracking-[0.3em] text-[#D1644D] font-bold mt-0.5">Trading L.L.C</span>
            </div>
          </div>
          <p className="text-white/20 text-xs uppercase tracking-[0.5em]">
            © 2022 Al-Laza Trading L.L.C. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-white/40 hover:text-white transition-colors"><Users className="w-5 h-5" /></button>
            <button className="text-white/40 hover:text-white transition-colors"><Building2 className="w-5 h-5" /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}
