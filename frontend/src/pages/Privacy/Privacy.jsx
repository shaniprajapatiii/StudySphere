import React from "react";
import { Sparkles, Shield, Lock, Eye, RefreshCw, Smartphone, FileText } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen theme-bg-base py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto theme-bg-surface rounded-[48px] shadow-2xl p-10 sm:p-16 theme-border border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8 border border-emerald-500/20 shadow-sm">
            <Shield className="w-3 h-3" />
            <span>Data Protection First</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold theme-text-primary mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-sm font-bold theme-text-muted uppercase tracking-widest mb-16 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Effective: December 4, 2025
          </p>

          <div className="space-y-16">
            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">1. Introduction</h2>
              </div>
              <p className="theme-text-secondary text-lg leading-relaxed font-medium">
                Welcome to StudySphere ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">2. Information We Collect</h2>
              </div>
              
              <div className="space-y-8">
                 <div className="theme-bg-base p-8 rounded-3xl border theme-border shadow-sm">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest theme-text-primary mb-4 flex items-center gap-2">
                       <User size={14} className="text-cyan-500" /> 2.1 Personal Information
                    </h3>
                    <p className="theme-text-secondary font-medium mb-6">When you create an account, we collect:</p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {["Name and email address", "Profile picture via Google", "Account preferences", "Login timestamps"].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm font-bold theme-text-primary">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> {item}
                         </li>
                      ))}
                    </ul>
                 </div>

                 <div className="theme-bg-base p-8 rounded-3xl border theme-border shadow-sm">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest theme-text-primary mb-4 flex items-center gap-2">
                       <Smartphone size={14} className="text-blue-500" /> 2.2 Usage Data
                    </h3>
                    <p className="theme-text-secondary font-medium mb-6">We automatically collect information about your platform interactions:</p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {["Videos and learning progress", "Playlists created", "Quiz attempts and scores", "Study streaks", "Device info and IP address"].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm font-bold theme-text-primary">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {item}
                         </li>
                      ))}
                    </ul>
                 </div>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <RefreshCw size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">3. Data Usage & AI</h2>
              </div>
              <p className="theme-text-secondary text-lg leading-relaxed font-medium mb-8">
                We use your data to power the core StudySphere experience, including AI-driven insights that help you learn faster.
              </p>
              <div className="grid gap-4">
                 {["Provide educational services", "Generate AI summaries and quizzes", "Track mastery progress", "Improve AI response quality"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 theme-bg-base rounded-2xl theme-border border shadow-sm">
                       <CheckCircle2 size={18} className="text-emerald-500" />
                       <span className="text-sm font-bold theme-text-primary">{item}</span>
                    </div>
                 ))}
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lock size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">4. Security Infrastructure</h2>
              </div>
              <p className="theme-text-secondary text-lg leading-relaxed font-medium bg-amber-500/5 p-8 rounded-3xl border border-amber-500/10 shadow-sm">
                Your data is stored securely in MongoDB databases with industry-standard encryption. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
              </p>
            </section>

            <section className="pt-16 border-t theme-border text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] theme-text-muted mb-6">Questions about your data?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <a href="mailto:shaniprajapati630@gmail.com" className="ds-btn-primary px-8">Email Support</a>
                 <a href="/contact" className="ds-btn-secondary px-8">Contact Form</a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal icons for this page only
function User({ size, className }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function CheckCircle2({ size, className }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> }
