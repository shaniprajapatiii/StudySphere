import React from "react";
import { CheckCircle2, AlertCircle, Scale, ShieldCheck, HelpCircle, FileText, Globe } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen theme-bg-base py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto theme-bg-surface rounded-[48px] shadow-2xl p-10 sm:p-16 theme-border border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8 border border-blue-500/20 shadow-sm">
            <Scale className="w-3 h-3" />
            <span>Standard Agreements</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold theme-text-primary mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-sm font-bold theme-text-muted uppercase tracking-widest mb-16 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Last Modified: December 4, 2025
          </p>

          <div className="space-y-16">
            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">1. Acceptance of Terms</h2>
              </div>
              <p className="theme-text-secondary text-lg leading-relaxed font-medium">
                By accessing and using StudySphere ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Platform.
              </p>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">2. Service Description</h2>
              </div>
              <p className="theme-text-secondary text-lg leading-relaxed font-medium mb-8">
                StudySphere provides an AI-powered educational platform that enables users to organize content, generate insights, and track their learning mastery.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                 {["YouTube content organization", "AI Summaries & Transcripts", "Interactive assessments", "Progress & Streak tracking"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 theme-bg-base rounded-2xl theme-border border shadow-sm">
                       <CheckCircle2 size={16} className="text-cyan-500" />
                       <span className="text-sm font-bold theme-text-primary">{item}</span>
                    </div>
                 ))}
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertCircle size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">3. User Conduct</h2>
              </div>
              <p className="theme-text-secondary font-medium mb-6">To ensure a safe environment, all users must agree NOT to:</p>
              <div className="grid gap-3">
                 {[
                   "Use the Platform for any illegal purposes",
                   "Attempt to disrupt Platform infrastructure",
                   "Abuse or overload AI processing services",
                   "Share copyrighted content without permission"
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-6 py-4 theme-bg-base rounded-2xl theme-border border-rose-500/10 border shadow-sm">
                       <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                       <span className="text-sm font-bold theme-text-secondary">{item}</span>
                    </div>
                 ))}
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">4. Intellectual Property</h2>
              </div>
              <div className="theme-bg-base p-8 rounded-[32px] theme-border border shadow-sm">
                 <p className="theme-text-secondary text-base leading-relaxed font-medium mb-6">
                   StudySphere retains all rights to Platform architecture and features. You retain ownership of your created content (playlists, notes) while granting us a license to process it for service delivery.
                 </p>
                 <p className="text-xs font-bold theme-text-muted bg-theme-surface-2 p-4 rounded-xl border theme-border italic">
                   Note: YouTube videos remain the property of their respective copyright holders via the YouTube API.
                 </p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HelpCircle size={20} />
                 </div>
                 <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">5. AI Accuracy Notice</h2>
              </div>
              <p className="theme-text-secondary text-lg leading-relaxed font-medium bg-amber-500/5 p-8 rounded-3xl border border-amber-500/10 shadow-sm">
                Our Platform uses Google Gemini AI to generate insights. While we strive for perfection, AI-generated content may contain inaccuracies. Users should verify critical information independently.
              </p>
            </section>

            <section className="pt-16 border-t theme-border text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] theme-text-muted mb-10 max-w-sm mx-auto">
                By using StudySphere, you acknowledge that you have read and agree to these Terms.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <a href="/contact" className="ds-btn-primary px-10">I Have Questions</a>
                 <a href="/privacy" className="ds-btn-secondary px-10">View Privacy</a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
