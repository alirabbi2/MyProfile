import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  Linkedin,
  Github,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Play,
  Mail,
  Target,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenAdmin?: () => void;
  onOpenHireMe: () => void;
  onTriggerNotification?: () => void;
  notificationCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHireMe,
}) => {
  const { language, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'mission-vision', 'skills', 'projects', 'journey', 'certifications', 'tests', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.nav.about, icon: ShieldCheck },
    { id: 'mission-vision', label: language === 'bn' ? 'ভিশন' : 'Vision', icon: Target },
    { id: 'skills', label: t.nav.skills, icon: Cpu },
    { id: 'projects', label: t.nav.projects, icon: Briefcase },
    { id: 'journey', label: t.nav.experience, icon: GraduationCap },
    { id: 'certifications', label: language === 'bn' ? 'সনদপত্র' : 'Certifications', icon: Award },
    { id: 'tests', label: language === 'bn' ? 'টেস্ট স্যুট' : 'QA Tests', icon: Play },
    { id: 'contact', label: t.nav.contact, icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200/40 dark:border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2">
          {/* Logo / Personal Brand (Alirabbi.QA) */}
          <button
            id="brand-logo-btn"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none shrink-0"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-orange-500/60 text-orange-400 shadow-md shadow-orange-500/10 group-hover:scale-105 transition-transform shrink-0">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="font-extrabold text-base md:text-lg tracking-tight text-slate-900 dark:text-white flex items-center">
                <span>Alirabbi</span>
                <span className="text-orange-500">.QA</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium leading-none">
                Software QA Engineer
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links - Single, clean, non-wrapping bar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Circular GitHub Icon */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub Profile (akher-rabbi)"
              className="flex w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white items-center justify-center border border-slate-200 dark:border-slate-700 shadow-xs transition-transform hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Circular LinkedIn Icon */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile (Md. Akher Ali Rabbi)"
              className="flex w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 items-center justify-center border border-slate-200 dark:border-slate-700 shadow-xs transition-transform hover:scale-105"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Orange Pill "Hire Me" Button */}
            <button
              id="hire-me-nav-btn"
              onClick={onOpenHireMe}
              title="Send Hire Request / Hire SQA Engineer"
              className="px-4 sm:px-5 py-2 rounded-full bg-[#f95738] hover:bg-[#e8492a] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-md shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="whitespace-nowrap">Hire Me</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 space-y-2">
            {/* Mobile Hire Me Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHireMe();
              }}
              className="w-full py-2.5 rounded-xl bg-[#f95738] hover:bg-[#e8492a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Hire Me (Send Request)</span>
            </button>

            {/* Social Links Mobile */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
