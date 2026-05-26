import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Tv2, 
  Lock, 
  ShieldCheck, 
  CheckCircle,
  Construction,
  Phone,
  Cpu,
  Bookmark,
  ChevronDown
} from 'lucide-react';

// Data imports
import { STANDARD_SIZES } from './data';
import { StandardBlockSize } from './types';

// Component imports
import Header from './components/Header';
import ThreeCanvas from './components/ThreeCanvas';
import Differentiators from './components/Differentiators';
import Calculator from './components/Calculator';
import Timeline from './components/Timeline';
import ToolKit from './components/ToolKit';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import About from './components/About';
import Background3D from './components/Background3D';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [activeSize, setActiveSize] = useState<StandardBlockSize>(STANDARD_SIZES[2]); // Initial default is 600x200x150 mm

  // Parallax Scroll Coordinates
  const { scrollY } = useScroll();
  
  // Subtle parallax translation values
  const bgGlowY1 = useTransform(scrollY, [0, 1000], [0, 85]);
  const bgGlowY2 = useTransform(scrollY, [0, 1000], [0, -110]);
  const blockFloatY1 = useTransform(scrollY, [100, 1500], [0, -180]);
  const blockFloatY2 = useTransform(scrollY, [150, 2200], [20, 140]);
  const blockFloatRotate1 = useTransform(scrollY, [100, 1500], [0, 30]);
  const blockFloatRotate2 = useTransform(scrollY, [150, 2200], [0, -25]);
  const calculatorBgY = useTransform(scrollY, [800, 3000], [-80, 80]);
  const pillarsBgY = useTransform(scrollY, [200, 1800], [40, -100]);
  const directoryBgY = useTransform(scrollY, [500, 2200], [-30, 90]);

  // GSAP animation triggers on load
  useEffect(() => {
    // Elegant slide-up for our hero section attributes
    gsap.fromTo(".gsap-hero-badge", 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
    );
    gsap.fromTo(".gsap-hero-title", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: "power3.out" }
    );
    gsap.fromTo(".gsap-hero-desc", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.9, delay: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(".gsap-hero-cta", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(".gsap-hero-stats", 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 1, delay: 0.7, ease: "power2.out" }
    );
  }, []);

  const handleSelectSize = (size: StandardBlockSize) => {
    setActiveSize(size);
    
    // Trigger localized small flash animation overlay
    gsap.fromTo(".gsap-model-flash", 
      { backgroundColor: "rgba(34, 197, 94, 0.25)" }, 
      { backgroundColor: "rgba(34, 197, 94, 0)", duration: 0.6 }
    );
  };

  return (
    <div className="bg-stone-950 font-sans min-h-screen text-stone-105 leading-normal antialiased selection:bg-green-600 selection:text-white relative">
      
      {/* 3D Moving Parallax Background Elements */}
      <Background3D />
      
      {/* Header Navbar */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'home' ? (
        <>
          {/* HERO SECTION Split */}
          <section className="relative overflow-hidden pt-8 md:pt-16 pb-16 md:pb-24 border-b border-stone-900">
            
            {/* Parallax ambient shapes */}
            <motion.div 
              style={{ y: bgGlowY1 }}
              className="absolute right-0 top-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none -translate-x-12" 
            />
            <motion.div 
              style={{ y: bgGlowY2 }}
              className="absolute left-1/4 top-1/2 w-80 h-80 bg-stone-900/10 rounded-full blur-3xl pointer-events-none -translate-y-12" 
            />

            {/* Floating Wireframe blocks for parallax depth */}
            <motion.div 
              style={{ y: blockFloatY1, rotate: blockFloatRotate1 }}
              className="absolute right-24 top-1/4 w-32 h-16 border border-stone-800/80 bg-stone-900/10 backdrop-blur-xs rounded-xl pointer-events-none z-10 hidden xl:flex flex-col p-3 md:p-3.5 justify-between shadow-xl"
            >
              <div className="flex justify-between items-center text-[8px] font-mono text-green-400 font-bold">
                <span>AAC-BLOX #04</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-stone-400">DENSITY: 620kg/m³</div>
            </motion.div>

            <motion.div 
              style={{ y: blockFloatY2, rotate: blockFloatRotate2 }}
              className="absolute left-12 top-1/3 w-36 h-20 border border-green-900/30 bg-green-950/10 backdrop-blur-xs rounded-xl pointer-events-none z-10 hidden xl:flex flex-col p-3 md:p-3.5 justify-between shadow-xl"
            >
              <div className="text-[8px] font-mono text-green-400 font-bold tracking-wider">IS-2185 SPECIFICATION</div>
              <div className="h-3 w-full bg-green-500/15 rounded-sm" />
              <div className="text-[9px] font-mono text-stone-300 font-extrabold text-right">PREASSEMBLED</div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Content Column */}
                <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8">
                  
                  {/* Green Leaf Badge */}
                  <div className="gsap-hero-badge flex items-center gap-1.5 self-start bg-green-950/80 px-3.5 py-1.5 rounded-full border border-green-900/40 text-xs font-mono font-bold text-green-400 uppercase tracking-widest">
                    <Leaf className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                    Smarter Way to Build • Greener Way to Grow
                  </div>

                  {/* High impact display typography */}
                  <div>
                    <h2 className="gsap-hero-title font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight gap-1.5">
                      Swift Aerated Concrete <span className="text-green-400 block">Eco Blox</span>
                    </h2>
                    <p className="gsap-hero-desc text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-4 max-w-xl">
                      Redefining architectural layout boundaries. Swift Eco Blox couples lightweight structure with massive insulating thermal performance, cutting overall building dead-weights by up to 30%.
                    </p>
                  </div>

                  {/* Quick Actions CTA group */}
                  <div className="gsap-hero-cta flex flex-wrap items-center gap-3.5">
                    <a 
                      href="#calculator-section" 
                      className="px-6 py-3 bg-green-600 hover:bg-green-500 font-bold text-xs tracking-wider text-white rounded-xl transition-all shadow-lg hover:shadow-green-600/20 active:scale-95 uppercase flex items-center gap-2 cursor-pointer"
                    >
                      Eco Impact Audit
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a 
                      href="#showroom-sandbox" 
                      className="px-6 py-3 bg-stone-900 border border-stone-800 hover:border-stone-700 font-bold text-xs tracking-wider text-stone-300 rounded-xl transition-all shadow-xs active:scale-95 uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Tv2 className="w-4 h-4 text-stone-400" />
                      3D Sandbox
                    </a>
                  </div>

                  {/* Live Technical Spec Bar */}
                  <div className="gsap-hero-stats border-l-4 border-green-600 pl-4 py-1 flex flex-col gap-1.5">
                    <span className="text-stone-500 font-mono text-[10px] font-bold tracking-widest uppercase block leading-none">
                      Core Structural Metrics
                    </span>
                    <span className="font-display font-black text-white text-lg leading-tight">
                      ₹ 145+ saved per square meter • ISI Approved
                    </span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-green-400" /> 
                        Compression strength: 4-5 N/mm²
                      </span>
                      <span className="text-stone-700">|</span>
                      <span className="flex items-center gap-1">
                        <Bookmark className="w-4 h-4 text-green-400" /> 
                        Water absorption: &lt; 10%
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right Interactive 3D Model Sandbox Column */}
                <div id="showroom-sandbox" className="lg:col-span-6 h-[520px] md:h-[620px] lg:h-[680px] relative gsap-hero-canvas flex flex-col scroll-mt-28">
                  <div className="gsap-model-flash absolute inset-0 rounded-3xl pointer-events-none z-20 transition-colors" />
                  <ThreeCanvas activeSize={activeSize} />
                </div>

              </div>

              {/* Quick jump anchor arrow */}
              <div className="flex justify-center mt-12 md:mt-16 text-stone-500">
                <a href="#strategic-pillars" className="flex flex-col items-center gap-1 hover:text-white transition-colors pointer-events-auto">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Explore Specifications</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </div>

            </div>
          </section>

          {/* STRATEGIC PILLARS SECTION (6 DIFFERENTIATORS) */}
          <section id="strategic-pillars" className="py-20 bg-stone-900/20 border-b border-stone-900 relative overflow-hidden scroll-mt-24">
            <motion.div 
              style={{ y: pillarsBgY }}
              className="absolute -left-20 top-20 w-72 h-72 bg-green-500/5 rounded-full blur-3xl pointer-events-none" 
            />
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <Differentiators />
            </div>
          </section>

          {/* DIMENSIONAL DIRECTORY SECTION & EQUIPMENT */}
          <section className="py-20 bg-stone-950 border-b border-stone-900 relative overflow-hidden">
            <motion.div 
              style={{ y: directoryBgY }}
              className="absolute right-10 bottom-10 w-64 h-64 bg-stone-800/10 rounded-full blur-3xl pointer-events-none" 
            />
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <ToolKit onSelectSize={handleSelectSize} activeSize={activeSize} />
            </div>
          </section>

          {/* ECO-CONSTRUCTION IMPACT ESTIMATOR SECTION */}
          <section id="calculator-section" className="py-20 bg-stone-900/20 border-b border-stone-900 relative overflow-hidden scroll-mt-24">
            <motion.div 
              style={{ y: calculatorBgY }}
              className="absolute -right-24 top-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none" 
            />
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <Calculator />
            </div>
          </section>

          {/* INSTALLATION MASON GUIDE TIMELINE */}
          <section id="timeline-section" className="py-20 bg-stone-950 relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <Timeline />
            </div>
          </section>

          {/* INTERACTIVE DISPATCH DESK & GMAIL CONNECT PORTAL */}
          <ContactForm />
        </>
      ) : (
        <About 
          onNavigateHomeAndScroll={(sectionId) => {
            setCurrentPage('home');
            setTimeout(() => {
              const target = document.querySelector(sectionId);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 180);
          }}
          onNavigateContact={() => {
            setCurrentPage('home');
            setTimeout(() => {
              const target = document.querySelector('#contact-portal');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 180);
          }}
        />
      )}

      {/* RICH BRAND PORTAL & CONTACT INFO FOOTER */}
      <Footer />

    </div>
  );
}
