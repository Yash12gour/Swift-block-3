import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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
  ChevronDown,
  Layers,
  TrendingUp
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
import FactorySlider from './components/FactorySlider';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
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

  // Preloader simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 200); // Super prompt fade-out upon completion
          return 100;
        }
        // Rapid but highly fluid increments
        const delta = Math.random() * 6 + 4;
        return Math.min(prev + delta, 100);
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation triggers on load - Tuned to be slightly slower and smoother
  useEffect(() => {
    if (isLoading) return;

    // Elegant floating glide-up for our hero section attributes
    gsap.fromTo(".gsap-hero-badge", 
      { opacity: 0, scale: 0.92 }, 
      { opacity: 1, scale: 1, duration: 1.0, ease: "back.out(1.2)" }
    );
    gsap.fromTo(".gsap-hero-title", 
      { opacity: 0, y: 35 }, 
      { opacity: 1, y: 0, duration: 1.4, delay: 0.2, ease: "power3.out" }
    );
    gsap.fromTo(".gsap-hero-desc", 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 1.3, delay: 0.45, ease: "power2.out" }
    );
    gsap.fromTo(".gsap-hero-cta", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.2, delay: 0.65, ease: "power2.out" }
    );
    gsap.fromTo(".gsap-hero-stats", 
      { opacity: 0, scale: 0.97 }, 
      { opacity: 1, scale: 1, duration: 1.4, delay: 0.85, ease: "power2.out" }
    );
  }, [isLoading]);

  const handleSelectSize = (size: StandardBlockSize) => {
    setActiveSize(size);
    
    // Trigger localized small flash animation overlay
    gsap.fromTo(".gsap-model-flash", 
      { backgroundColor: "rgba(5, 146, 18, 0.20)" }, 
      { backgroundColor: "rgba(5, 146, 18, 0)", duration: 0.8 }
    );
  };

  return (
    <div className="bg-[#F8F9FA] font-sans min-h-screen text-stone-800 leading-normal antialiased selection:bg-[#059212] selection:text-white relative">
      
      {/* High-Fidelity Minimalist Brand Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.04,
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8F9FA]"
          >
            <div className="flex flex-col items-center max-w-sm px-6 text-center select-none">
              
              {/* Interlocking 3D Eco Block Wireframe Animation */}
              <motion.div 
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                {/* Floating eco-blox visual stack (minimal aesthetic with perspective) */}
                <div className="relative w-24 h-24 flex items-center justify-center" style={{ perspective: 1000 }}>
                  
                  {/* Backdrop glowing soft mint spot that pulses inversely with float */}
                  <motion.div 
                    animate={{
                      scale: [0.92, 1.15, 0.92],
                      opacity: [0.7, 0.95, 0.7],
                      rotate: [0, 45, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-[#059212]/15 rounded-3xl blur-2xl" 
                  />
                  
                  {/* Bevelled Core Block */}
                  <motion.div 
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.015, 1],
                      rotateY: [0, 180, 360]
                    }}
                    transition={{ 
                      y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                      rotateY: { duration: 6.0, repeat: Infinity, ease: "linear" }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative z-10 w-16 h-16 bg-[#059212] rounded-2xl flex items-center justify-center shadow-xl shadow-[#059212]/20 border border-[#048010]"
                  >
                    <Leaf className="w-8 h-8 text-white fill-white/10 animate-pulse" />
                  </motion.div>
                  
                  {/* Satellite mini-dots representing aerated bubble structures */}
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#059212]/40 animate-ping" />
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-[#059212]/30" />
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Moving Parallax Background Elements */}
      <Background3D />
      
      {/* Header Navbar */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main page transition wrapper */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* MAIN HERO SECTION: Vanguard Factory Showcase Slider */}
            <section className="relative overflow-hidden pt-8 md:pt-12 pb-16 md:pb-20 border-b border-stone-300">
              
              {/* Parallax ambient lines & shapes */}
              <motion.div 
                style={{ y: bgGlowY1 }}
                className="absolute right-0 top-1/4 w-96 h-96 bg-[#059212]/5 rounded-full blur-3xl pointer-events-none -translate-x-12" 
              />
              <motion.div 
                style={{ y: bgGlowY2 }}
                className="absolute left-1/4 top-1/2 w-80 h-80 bg-stone-100/10 rounded-full blur-3xl pointer-events-none -translate-y-12" 
              />

              {/* Floating Wireframe blocks for parallax depth */}
              <motion.div 
                style={{ y: blockFloatY1, rotate: blockFloatRotate1 }}
                className="absolute right-24 top-1/2 w-32 h-16 border border-stone-200/80 bg-white/70 backdrop-blur-xs rounded-xl pointer-events-none z-10 hidden xl:flex flex-col p-3 md:p-3.5 justify-between shadow-lg"
              >
                <div className="flex justify-between items-center text-[8px] font-mono text-[#059212] font-bold">
                  <span>AAC-BLOX #04</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059212] animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-stone-500">DENSITY: 620kg/m³</div>
              </motion.div>

              <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-10 md:gap-14">
                
                {/* Introduction Header Block with dynamic title */}
                <div className="flex flex-col lg:flex-row gap-6 lg:items-end lg:justify-between">
                  <div className="flex flex-col gap-4 max-w-3xl">
                    
                    {/* Green Leaf Badge */}
                    <div className="gsap-hero-badge flex items-center gap-1.5 self-start bg-green-50 px-3.5 py-1.5 rounded-full border border-green-200 text-xs font-mono font-bold text-[#059212] uppercase tracking-widest shadow-xs">
                      <Leaf className="w-3.5 h-3.5 text-[#059212] animate-pulse" />
                      Smarter Way to Build • Greener Way to Grow
                    </div>

                    {/* Hero typography */}
                    <div>
                      <h2 className="gsap-hero-title font-display font-black text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.05] tracking-tight">
                        Swift Autoclaved Aerated Concrete <span className="text-[#059212]">Eco Blox</span>
                      </h2>
                      <p className="gsap-hero-desc text-stone-605 text-sm md:text-base leading-relaxed mt-4 max-w-2xl font-semibold">
                        Redefining architectural layout boundaries. Swift Eco Blox couples lightweight structure with massive insulating thermal performance, cutting overall building dead-weights by up to 30%.
                      </p>
                    </div>

                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="gsap-hero-cta flex flex-wrap items-center gap-3.5 shrink-0 h-fit lg:mb-2 w-full sm:w-auto lg:w-auto">
                    <a 
                      href="#calculator-section" 
                      className="px-6 py-3.5 bg-[#059212] hover:bg-[#048010] font-bold text-xs tracking-wider text-white rounded-xl transition-all shadow-md hover:shadow-[#059212]/10 active:scale-95 uppercase flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      Eco Impact Audit
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a 
                      href="#3d-material-studio" 
                      className="px-6 py-3.5 bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 font-bold text-xs tracking-wider text-stone-700 rounded-xl transition-all shadow-xs active:scale-95 uppercase flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <Tv2 className="w-4 h-4 text-stone-500" />
                      3D Spec Sandbox
                    </a>
                  </div>
                </div>

                {/* The Majestic Factory Showcase Slider */}
                <div className="w-full">
                  <FactorySlider />
                </div>

                {/* Core metrics panel below the slider showcase */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-300">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 text-[#059212] p-2.5 rounded-xl border border-green-100">
                      <ShieldCheck className="w-5 h-5 text-[#059212]" />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-stone-900 text-xs uppercase tracking-wider">Structural Integrity</h5>
                      <p className="text-stone-500 text-xs mt-1 font-semibold leading-relaxed">Compression strength of 4-5 N/mm² • ISI Standard approved matrix</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#FDF1EB] text-[#C42D2D] p-2.5 rounded-xl border border-[#F5DDD1]">
                      <TrendingUp className="w-5 h-5 text-[#C42D2D]" />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-stone-900 text-xs uppercase tracking-wider">Dynamic Cost Savings</h5>
                      <p className="text-stone-500 text-xs mt-1 font-semibold leading-relaxed">Saves up to ₹ 145+ per square meter compared to standard masonry</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 text-[#059212] p-2.5 rounded-xl border border-green-100">
                      <Layers className="w-5 h-5 text-[#059212]" />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-stone-900 text-xs uppercase tracking-wider">Insulation Value</h5>
                      <p className="text-stone-500 text-xs mt-1 font-semibold leading-relaxed">Water absorption below 10%, high-rated micro-pore airflow barriers</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* INTERACTIVE 3D MATERIAL STUDIO */}
            <section id="3d-material-studio" className="py-20 bg-[#F8F9FA] border-b border-stone-300 relative overflow-hidden scroll-mt-24">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Left Side: Explanatory Copy for 3D sandbox */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div>
                      <span className="text-[10px] font-mono text-[#059212] font-extrabold uppercase tracking-widest block mb-2">
                        REAL-TIME MATERIAL DECK
                      </span>
                      <h3 className="font-display font-black text-stone-900 text-3xl leading-tight">
                        Dimensional Spec Sandbox
                      </h3>
                      <p className="text-stone-605 text-xs md:text-sm leading-relaxed mt-4 font-semibold">
                        Rotate, inspect, and analyze the precision-baked porous structure of AAC blocks in real-time. Toggle different specifications under our directory below to visualize real-time structure dynamics and lightweight cellular matrices.
                      </p>
                    </div>

                    {/* Specification features list */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-300 shadow-xs">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#059212] animate-pulse shrink-0" />
                        <span className="text-[11px] font-mono text-stone-700 font-bold tracking-wider">ACCURATE WIREFRAME SHADER</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-300 shadow-xs">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#C42D2D] shrink-0" />
                        <span className="text-[11px] font-mono text-stone-700 font-bold tracking-wider">WEIGHT LOGIC CALCULATIONS</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-300 shadow-sm text-stone-605 text-xs font-semibold leading-relaxed">
                      💡 <strong>Live Calibration:</strong> Selecting custom block sizes under the <em>Specifications Directory</em> below updates this 3-dimensional model viewport instantly.
                    </div>
                  </div>

                  {/* Right Interactive 3D Model Sandbox Column */}
                  <div className="lg:col-span-7 h-[450px] md:h-[550px] relative gsap-hero-canvas flex flex-col pt-4">
                    <div className="gsap-model-flash absolute inset-0 rounded-3xl pointer-events-none z-20 transition-colors" />
                    <ThreeCanvas activeSize={activeSize} />
                  </div>

                </div>
              </div>
            </section>

            {/* STRATEGIC PILLARS SECTION (6 DIFFERENTIATORS) */}
            <section id="strategic-pillars" className="py-20 bg-[#F8F9FA] border-b border-stone-300 relative overflow-hidden scroll-mt-24">
              <motion.div 
                style={{ y: pillarsBgY }}
                className="absolute -left-20 top-20 w-72 h-72 bg-[#059212]/5 rounded-full blur-3xl pointer-events-none" 
              />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <Differentiators />
              </div>
            </section>

            {/* DIMENSIONAL DIRECTORY SECTION & EQUIPMENT */}
            <section className="py-20 bg-[#F8F9FA] border-b border-stone-300 relative overflow-hidden">
              <motion.div 
                style={{ y: directoryBgY }}
                className="absolute right-10 bottom-10 w-64 h-64 bg-stone-205/10 rounded-full blur-3xl pointer-events-none" 
              />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <ToolKit onSelectSize={handleSelectSize} activeSize={activeSize} />
              </div>
            </section>

            {/* ECO-CONSTRUCTION IMPACT ESTIMATOR SECTION */}
            <section id="calculator-section" className="py-20 bg-[#F8F9FA] border-b border-stone-300 relative overflow-hidden scroll-mt-24">
              <motion.div 
                style={{ y: calculatorBgY }}
                className="absolute -right-24 top-10 w-80 h-80 bg-[#059212]/5 rounded-full blur-3xl pointer-events-none" 
              />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <Calculator />
              </div>
            </section>

            {/* INSTALLATION MASON GUIDE TIMELINE */}
            <section id="timeline-section" className="py-20 bg-[#F8F9FA] relative scroll-mt-24">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <Timeline />
              </div>
            </section>

            {/* INTERACTIVE DISPATCH DESK & GMAIL CONNECT PORTAL */}
            <ContactForm />
          </motion.div>
        ) : (
          <motion.div
            key="about-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          >
            <About 
              onNavigateHomeAndScroll={(sectionId) => {
                setCurrentPage('home');
                setTimeout(() => {
                  const target = document.querySelector(sectionId);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 580); // Synchronized beautifully with the exit page transition duration
              }}
              onNavigateContact={() => {
                setCurrentPage('home');
                setTimeout(() => {
                  const target = document.querySelector('#contact-portal');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 580); // Synchronized beautifully with the exit page transition duration
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RICH BRAND PORTAL & CONTACT INFO FOOTER */}
      <Footer />

    </div>
  );
}
