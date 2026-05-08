import React from "react";
import { Sparkles, BookOpen, Zap, Users, Brain, Target } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen theme-bg-base theme-text-primary overflow-hidden">
      {/* Hero Section */}
      <div className="theme-bg-base py-24 sm:py-32 px-6 border-b theme-border relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--ds-cyan-500),transparent_40%)] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-5 py-2 rounded-full text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-widest mb-8 border border-cyan-500/20 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Online Learning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
            We're Building the Future of <br />
            <span className="text-cyan-600 dark:text-cyan-400">Intelligent Education</span>
          </h1>
          <p className="text-lg md:text-2xl theme-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            StudySphere is your AI-powered companion that turns passive watching
            into active, measurable mastery.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="animate-in slide-in-from-left duration-1000">
            <h2 className="text-3xl sm:text-5xl font-extrabold theme-text-primary mb-8 tracking-tight">
              Our Mission
            </h2>
            <p className="theme-text-secondary text-lg sm:text-xl leading-relaxed mb-8 font-medium">
              In an era of information overload, finding content is easy, but
              truly learning from it is hard. We believe that education should
              be personalized, interactive, and efficient.
            </p>
            <p className="theme-text-secondary text-lg sm:text-xl leading-relaxed font-medium">
              Our mission is to empower learners by leveraging Artificial
              Intelligence to distill complex video content into digestible
              insights, actionable summaries, and interactive assessments. We
              help you learn faster and retain more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in slide-in-from-right duration-1000">
            <div className="theme-bg-surface p-8 rounded-[32px] border theme-border shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-extrabold theme-text-primary mb-3">AI Powered</h3>
              <p className="text-sm font-medium theme-text-secondary leading-relaxed">
                Advanced algorithms to summarize and explain complex video content.
              </p>
            </div>
            <div className="theme-bg-surface p-8 rounded-[32px] border theme-border shadow-sm hover:shadow-xl transition-all group mt-0 sm:mt-10">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-extrabold theme-text-primary mb-3">Goal Oriented</h3>
              <p className="text-sm font-medium theme-text-secondary leading-relaxed">
                Track your progress and achieve your learning milestones with ease.
              </p>
            </div>
            <div className="theme-bg-surface p-8 rounded-[32px] border theme-border shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-extrabold theme-text-primary mb-3">Efficient</h3>
              <p className="text-sm font-medium theme-text-secondary leading-relaxed">
                Save hours by getting straight to the key concepts and insights.
              </p>
            </div>
            <div className="theme-bg-surface p-8 rounded-[32px] border theme-border shadow-sm hover:shadow-xl transition-all group mt-0 sm:mt-10">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-extrabold theme-text-primary mb-3">Community</h3>
              <p className="text-sm font-medium theme-text-secondary leading-relaxed">
                Join a global community of lifelong learners and students.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story/Values Section */}
      <div className="theme-bg-surface py-24 sm:py-32 border-y theme-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-5xl font-extrabold theme-text-primary mb-6 tracking-tight">
              Why StudySphere?
            </h2>
            <p className="theme-text-secondary text-lg sm:text-xl font-medium leading-relaxed">
              We are solving the biggest problem in online education:{" "}
              <span className="font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest text-sm bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10 ml-1">Engagement</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
              {[
              {
                icon: <BookOpen className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />,
                title: "Curated Content",
                desc: "We don't just aggregate videos; we curate learning paths that guide you from beginner to expert with structured modules.",
              },
              {
                icon: <Brain className="w-7 h-7 text-blue-600 dark:text-blue-400" />,
                title: "Cognitive Enhancement",
                desc: "Our tools are designed to work with your brain, using spaced repetition and active recall techniques for long-term retention.",
              },
              {
                icon: <Sparkles className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />,
                title: "Premium Experience",
                desc: "A clean, distraction-free interface that puts your learning experience first with beautiful design and smooth interactions.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-10 rounded-[40px] theme-bg-base border theme-border hover:theme-border-cyan-500/30 hover:shadow-2xl transition-all duration-500">
                <div className="w-14 h-14 bg-cyan-500/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-cyan-500/10">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-extrabold theme-text-primary mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="theme-text-secondary leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 sm:py-32 px-6 theme-bg-base text-center">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[56px] theme-bg-surface theme-border border p-12 sm:p-20 shadow-2xl">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
           <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
           
           <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold theme-text-primary mb-8 tracking-tight">
                Ready to Transform Your Learning?
              </h2>
              <p className="theme-text-secondary text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Join thousands of students who are already learning smarter, not
                harder. Start your journey with StudySphere today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/feed"
                  className="ds-btn-primary px-10 py-4 font-extrabold shadow-xl shadow-cyan-900/10 text-lg"
                >
                  Start Learning Now
                </Link>
                <Link
                  to="/contact"
                  className="ds-btn-secondary px-10 py-4 font-extrabold text-lg"
                >
                  Contact Our Team
                </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
