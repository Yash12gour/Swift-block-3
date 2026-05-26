import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Leaf, 
  Target, 
  ShieldCheck, 
  History, 
  Briefcase, 
  Users, 
  Phone,
  Settings2,
  Cpu,
  Bookmark,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface AboutProps {
  onNavigateHomeAndScroll: (sectionId: string) => void;
  onNavigateContact: () => void;
}

export default function About({ onNavigateHomeAndScroll, onNavigateContact }: AboutProps) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const stats = [
    { value: '15,000 m³', label: 'Monthly Factory Capacity', desc: 'Raw delivery strength at Birholi plant' },
    { value: '30%+', label: 'Dead-Weight Savings', desc: 'Slashed static structural building loads' },
    { value: '4.5 N/mm²', label: 'Compressive Strength', desc: 'Meets stringent IS-2185 standard limits' },
    { value: '4+ Hr', label: 'Fire Endurance Rating', desc: 'Superior heat and thermal resistance' },
  ];

  const milestones = [
    {
      year: '1979',
      title: 'Swift Industries Inception',
      desc: 'Formed as an engineering team targeting heavy building frameworks and materials across Madhya Pradesh.'
    },
    {
      year: '2008',
      title: 'Aerated Tech Shift',
      desc: 'First local investments in micro-aerated concrete testing, aligning with high thermal barrier trends.'
    },
    {
      year: '2016',
      title: 'Birholi Mega Plant',
      desc: 'Inaugurated the Dist. Raisen factory with advanced German-spec foaming autoclaves and high-precision cutting wires.'
    },
    {
      year: 'Active',
      title: 'Carbon Neutrality Drive',
      desc: 'Leading Central India in active building carbon offset, recycling water loops, and sourcing fly-ash responsibly.'
    }
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-stone-900 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-12 w-80 h-80 bg-stone-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1.5 self-start bg-green-950/80 px-3.5 py-1.5 rounded-full border border-green-905 text-xs font-mono font-bold text-green-400 uppercase tracking-widest mb-6 w-fit"
            >
              <Target className="w-3.5 h-3.5 text-green-400" />
              OUR CORPORATE LEGACY
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight"
            >
              Architecting the <span className="text-green-400">Future of Green Structures</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed mt-6"
            >
              Swift Eco Blox, a vital division of areally-recognized Swift Industries, is Central India's leading force in manufacturing high-density Autoclaved Aerated Concrete blocks. For over four decades, our parent organization has champion integrity, dispatch speed, and state-of-the-art BIS compliance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid of Stats */}
      <section className="py-16 bg-stone-900/10 border-b border-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-stone-900/35 border border-stone-850 p-6 rounded-2xl flex flex-col gap-2 relative group hover:border-green-905/40 transition-all shadow-md"
              >
                <div className="absolute top-4 right-4 text-[10px] font-mono text-stone-600 font-bold group-hover:text-green-500 transition-colors">
                  // 0{idx + 1}
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-green-400 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-white font-mono font-black text-[11px] tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
                <div className="text-stone-500 text-xs mt-1 leading-normal">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Swift Promise - Core Pillars */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Content Side */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-4">
              <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-widest">
                WHAT DRIVES US
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Our Non-Negotiable Engineering Values
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mt-2">
                We design and batch every block inside areally integrated digital autoclave setups. From sourcing the highest quality silica or premium fly-ash to fine-tuning the microscopic bubble suspension density, precision is non-negotiable.
              </p>
              
              <div className="mt-4 flex flex-col gap-2.5">
                <button 
                  onClick={() => onNavigateHomeAndScroll('#showroom-sandbox')}
                  className="px-5 py-3.5 bg-stone-900 border border-stone-800 hover:border-stone-750 text-stone-300 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Cpu className="w-3.5 h-3.5 text-green-400" />
                  Test Weight in 3D Sandbox
                </button>
              </div>
            </div>

            {/* Right Pillars Bento-like Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-3xl flex flex-col gap-4">
                <div className="bg-green-950/60 p-3 rounded-2xl border border-green-905 w-12 h-12 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mt-1">
                  100% Green Recycled Input
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Utilizing premium pulverised fly ash sourced cleanly from approved power systems, transforming industrial waste into high-grade resilient masonry without heavy clay excavation.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-3xl flex flex-col gap-4">
                <div className="bg-orange-950/60 p-3 rounded-2xl border border-orange-905 w-12 h-12 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mt-1">
                  German Autoclaving Process
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Our curing block line works at 12 bar steam pressures with temperatures reaching 190°C. This triggers the unique tobermorite crystal phase, locking in extreme dimension stability.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-3xl flex flex-col gap-4">
                <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800 w-12 h-12 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mt-1">
                  BIS Certified Standard compliance
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Every batch of block manufactured undergoes strict crushing stress test, moisture content analysis, and size tolerance tests inside our in-house QA laboratories.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-3xl flex flex-col gap-4">
                <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800 w-12 h-12 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mt-1">
                  Swift Industries Trusted Stamp
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Bringing you the customer satisfaction standard of Central India's premier industrial concrete and fly-ash enterprise. You are backed by transparent billing and precise site-dispatch.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Legacy Roadmap / History */}
      <section className="py-20 bg-stone-900/20 border-t border-b border-stone-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-widest">
              OUR JOURNEY THROUGH TIME
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-2">
              Chronology of Building Integrity
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mt-3">
              From our origins back in the late seventies, we have continually upgraded our engineering infrastructure to adapt to clean ecological standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="bg-stone-900/35 border border-stone-850/60 p-6 rounded-2xl hover:border-stone-700 transition-all flex flex-col gap-3 relative">
                {/* Horizontal flow connector lines for desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-stone-800 z-15" />
                )}
                <div className="text-xs font-mono font-extrabold text-green-400 bg-green-950/60 px-2.5 py-1 rounded-lg border border-green-905 w-fit">
                  {milestone.year}
                </div>
                <h4 className="font-display font-bold text-base text-white mt-1">
                  {milestone.title}
                </h4>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Factory Coordinator Banner / CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="bg-stone-900/45 border border-stone-800 p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl backdrop-blur-md">
            <Sparkles className="w-10 h-10 text-green-400 mx-auto mb-6 shrink-0" />
            <span className="text-[9px] font-mono text-stone-500 font-bold uppercase tracking-widest block mb-2">
              DISPATCH CO-ORDINATE SYSTEM
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Ready to construct with Central India's absolute standard?
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mt-4">
              Get an instant quote, dispatch details, bulk logistic solutions, or size customisations directly from our Birholi technical plant desk.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto px-6 py-3.5 bg-green-605 hover:bg-green-505 text-white font-mono text-xs font-black rounded-xl flex items-center justify-center gap-2 transition-all border border-green-600 shadow-lg shadow-green-950/25 cursor-pointer uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-green-305 shrink-0" />
                Dispatch Desk Form
              </button>
              <button
                onClick={() => onNavigateHomeAndScroll('#calculator-section')}
                className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-850 text-stone-300 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all border border-stone-800 hover:border-stone-700 cursor-pointer uppercase tracking-wider"
              >
                Calculate Live CO₂ Impact
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
