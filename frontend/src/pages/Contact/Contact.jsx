import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Code,
  Linkedin,
  Instagram,
  Sparkles,
} from "lucide-react";
import { buildCanonicalUrl } from "../../utils/seo";

const Contact = () => {
  const canonicalUrl = buildCanonicalUrl("/contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen theme-bg-base pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <Helmet>
        <title>Contact Us - StudySphere</title>
        <meta
          name="description"
          content="Get in touch with StudySphere. Connect with us on social media or send us a message."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-6xl mx-auto relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-1.5 rounded-full text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6 border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            <span>Connect with our team</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold theme-text-primary mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl theme-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions, feedback, or need support? Our team is here to help you on your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Information & Social Links */}
          <div className="lg:col-span-5 theme-bg-surface rounded-[48px] shadow-sm p-10 sm:p-12 theme-border border flex flex-col h-full">
            <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-primary mb-10 tracking-tight">
              Contact Information
            </h2>

            <div className="space-y-8 mb-16 flex-1">
              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                   <h3 className="text-xs font-extrabold uppercase tracking-widest theme-text-muted mb-1">Our Studio</h3>
                   <p className="text-lg font-bold theme-text-primary">Prayagraj, Uttar Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mr-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                   <h3 className="text-xs font-extrabold uppercase tracking-widest theme-text-muted mb-1">Direct Line</h3>
                   <a
                    href="tel:+916307527950"
                    className="text-lg font-bold theme-text-primary hover:text-amber-700 transition-colors"
                  >
                    +91 6307527950
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mr-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                   <h3 className="text-xs font-extrabold uppercase tracking-widest theme-text-muted mb-1">Support Email</h3>
                   <a
                    href="mailto:shaniprajapati630@gmail.com"
                    className="text-lg font-bold theme-text-primary hover:text-amber-700 transition-colors truncate block"
                  >
                    shaniprajapati630@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t theme-border">
              <h3 className="text-xs font-extrabold uppercase tracking-widest theme-text-muted mb-6">Social Ecosystem</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl theme-bg-surface-2 flex items-center justify-center theme-text-secondary hover:bg-amber-700 hover:text-white transition-all duration-500 border theme-border"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://leetcode.com/u/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl theme-bg-surface-2 flex items-center justify-center theme-text-secondary hover:bg-amber-600 hover:text-white transition-all duration-500 border theme-border"
                  title="LeetCode"
                >
                  <Code size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl theme-bg-surface-2 flex items-center justify-center theme-text-secondary hover:bg-amber-700 hover:text-white transition-all duration-500 border theme-border"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl theme-bg-surface-2 flex items-center justify-center theme-text-secondary hover:bg-rose-600 hover:text-white transition-all duration-500 border theme-border"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 theme-bg-surface rounded-[48px] shadow-2xl p-10 sm:p-14 theme-border border relative">
            <div className="absolute top-10 right-10 opacity-5">
               <Send size={120} className="text-amber-600" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-primary mb-3 tracking-tight relative z-10">
              Send a Message
            </h2>
            <p className="theme-text-secondary font-medium mb-10 relative z-10">We typically respond within 24 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-extrabold uppercase tracking-widest theme-text-muted ml-1"
                  >
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="ds-input-base"
                    placeholder="E.g. Shani Prajapati"
                  />
                </div>
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-extrabold uppercase tracking-widest theme-text-muted ml-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="ds-input-base"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="message"
                  className="block text-[10px] font-extrabold uppercase tracking-widest theme-text-muted ml-1"
                >
                  What's on your mind?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="ds-input-base resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-700 text-white font-extrabold py-5 px-8 rounded-[24px] hover:bg-amber-600 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-amber-900/10 group"
              >
                <span>Transmit Message</span>
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
