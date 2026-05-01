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
    <div className="min-h-screen bg-transparent pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>Contact Us - StudySphere</title>
        <meta
          name="description"
          content="Get in touch with StudySphere. Connect with us on social media or send us a message."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information & Social Links */}
          <div className="bg-zinc-950/60 rounded-2xl shadow-xl p-8 border border-cyan-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Connect With Us
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mr-4 border border-cyan-500/20">
                  <MapPin className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Address</h3>
                    <p className="text-gray-400">Prayagraj, Uttar Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mr-4 border border-cyan-500/20">
                  <Phone className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <a
                    href="tel:+916307527950"
                    className="text-gray-400 hover:text-cyan-300 transition-colors"
                  >
                    +91 6307527950
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mr-4 border border-cyan-500/20">
                  <Mail className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <a
                    href="mailto:shaniprajapati630@gmail.com"
                    className="text-gray-400 hover:text-cyan-300 transition-colors"
                  >
                    shaniprajapati630@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-400 hover:bg-cyan-600 hover:text-white transition-all duration-300"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://leetcode.com/u/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-white transition-all duration-300"
                  title="LeetCode"
                >
                  <Code size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/shaniprajapatiii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-950/60 rounded-2xl shadow-xl p-8 border border-cyan-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none bg-black focus:bg-black text-white placeholder:text-gray-500"
                  placeholder="Shani Prajapati"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none bg-black focus:bg-black text-white placeholder:text-gray-500"
                  placeholder="shani@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none bg-black focus:bg-black resize-none text-white placeholder:text-gray-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-900/40 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-900/30"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
