import React, { useState } from 'react';
import { Leaf, Menu, Phone, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: 'home' | 'about';
  setCurrentPage: (page: 'home' | 'about') => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#showroom-sandbox', label: '3D Sandbox', isRoute: false },
    { href: '#strategic-pillars', label: 'Pillars', isRoute: false },
    { href: '#calculator-section', label: 'Impact Audit', isRoute: false },
    { href: '#timeline-section', label: 'Laying Manual', isRoute: false },
    { href: 'about', label: 'About Us', isRoute: true },
    { href: '#sibling-divisions', label: 'Sibling Divisions', isRoute: false }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (link.isRoute) {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = link.href.replace('#', '');
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleLogoClick = () => {
    setCurrentPage('home');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800/60 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo block */}
        <button 
          id="header-logo-button"
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-left cursor-pointer focus:outline-none group"
        >
          <div className="bg-green-600 p-2 rounded-xl text-white shadow-md shadow-green-600/10 transition-transform group-hover:scale-105">
            <Leaf className="w-5 h-5 fill-white/10" />
          </div>
          <div>
            <h1 className="font-display font-black text-white text-base tracking-tight select-none leading-none">
              SWIFT <span className="text-green-400">ECO BLOX</span>
            </h1>
            <span className="text-[9px] font-mono text-stone-500 font-bold tracking-widest block select-none mt-0.5 leading-none">
              BY SWIFT INDUSTRIES
            </span>
          </div>
        </button>

        {/* Desktop Navigation (Upgraded to lg to avoid tablet collisions) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = link.isRoute 
              ? currentPage === 'about'
              : currentPage === 'home' && false; // we can style accordingly

            return (
              <a 
                key={link.href}
                id={`desktop-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link)}
                className={`text-xs font-semibold tracking-wide uppercase transition-colors relative py-1 ${
                  isActive 
                    ? 'text-green-400' 
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Lead action button */}
        <div className="flex items-center gap-3">
          <a
            id="header-contact-button"
            href="#contact-portal"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage !== 'home') {
                setCurrentPage('home');
                setTimeout(() => {
                  const el = document.getElementById('contact-portal');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
              } else {
                const el = document.getElementById('contact-portal');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="hidden sm:flex px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs rounded-xl items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer border border-stone-700/40 animate-pulse"
          >
            <Phone className="w-3.5 h-3.5 text-green-400" />
            Contact Factory
          </a>
          
          {/* Toggle Button for Mobile and Tablet Drawer */}
          <button 
            id="toggle-mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-stone-400 hover:text-white hover:bg-stone-900 rounded-xl transition-all cursor-pointer border border-stone-800/40"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Floating Interactive Drawer for Mobile / Tablet devices */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-stone-950 border-t border-stone-900 mt-4 overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 py-4 px-2">
              {navLinks.map((link, idx) => {
                const isActive = link.isRoute && currentPage === 'about';
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                    id={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all block ${
                      isActive 
                        ? 'bg-stone-900 text-green-400 border border-green-950/40' 
                        : 'text-stone-300 hover:text-white hover:bg-stone-900'
                    }`}
                  >
                    <span>{link.label}</span>
                  </motion.a>
                );
              })}

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 mt-2 border-t border-stone-900 px-4"
              >
                <a
                  id="mobile-drawer-contact-button"
                  href="#contact-portal"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    if (currentPage !== 'home') {
                      setCurrentPage('home');
                      setTimeout(() => {
                        const el = document.getElementById('contact-portal');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 200);
                    } else {
                      const el = document.getElementById('contact-portal');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-mono text-xs font-black rounded-xl flex items-center justify-center gap-2 transition-colors border border-green-500 shadow-lg shadow-green-950/20 uppercase tracking-widest cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-green-305 shrink-0" />
                  Contact Factory Desk
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
