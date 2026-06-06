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
    <div className="bg-white text-stone-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-stone-300 overflow-hidden bg-[#F5F2EA]/40">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#059212]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-12 w-80 h-80 bg-stone-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1.5 self-start bg-green-50 px-3.5 py-1.5 rounded-full border border-green-100 text-xs font-mono font-bold text-[#059212] uppercase tracking-widest mb-6 w-fit"
            >
              <Target className="w-3.5 h-3.5 text-[#059212]" />
              OUR CORPORATE LEGACY
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-stone-950 leading-tight tracking-tight"
            >
              Architecting the <span className="text-[#059212]">Future of Resistant Structures</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-600 text-sm md:text-base lg:text-lg leading-relaxed mt-6 font-medium"
            >
              Swift Eco Blox, a vital division of areally-recognized Swift Industries, is Central India's leading force in manufacturing high-density Autoclaved Aerated Concrete blocks. For over four decades, our parent organization has champion integrity, dispatch speed, and state-of-the-art BIS compliance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid of Stats */}
      <section className="py-16 bg-[#F5F2EA] border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-white border border-stone-300 p-6 rounded-2xl flex flex-col gap-2 relative group hover:border-[#059212]/50 hover:shadow-md transition-all shadow-sm"
              >
                <div className="absolute top-4 right-4 text-[10px] font-mono text-stone-400 font-bold group-hover:text-[#059212] transition-colors">
                  // 0{idx + 1}
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#059212] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-stone-900 font-mono font-bold text-[11px] tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
                <div className="text-stone-500 text-xs mt-1 leading-normal font-medium">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Founder Section - Extracted from Corporate Identity */}
      <section className="py-20 bg-stone-50 border-b border-stone-300 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#059212]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-24 bottom-0 w-80 h-80 bg-stone-100 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Portrait Card Column */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-center lg:items-start shrink-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-stone-300 p-4 sm:p-5 rounded-3xl shadow-lg lg:hover:shadow-xl transition-all duration-300 w-full max-w-sm shrink-0"
              >
                {/* Image Container with premium frame borders */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=600&h=600" 
                    alt="Mr. Prakash Patel, Founder & Director of Swift Group" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover lg:grayscale lg:hover:grayscale-0 transition-all duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Founder Professional Details */}
                <div className="mt-5 text-center sm:text-left">
                  <h4 className="font-display font-black text-lg sm:text-xl text-stone-900 tracking-tight leading-none uppercase">
                    Mr. Prakash Patel
                  </h4>
                  <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-stone-100 border border-stone-250 text-stone-600 px-2 py-0.5 rounded">
                      Founder & Director
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-green-50 border border-green-100 text-[#059212] px-2 py-0.5 rounded">
                      Swift Group
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Editorial Narrative Column */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-mono text-[#059212] font-bold uppercase tracking-widest block mb-2">
                  ESTD. 2005 / LEADERSHIP PROFILE
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-950 tracking-tight leading-tight">
                  The Visionary <span className="text-[#059212]">Behind the Trust</span>
                </h2>
              </div>

              {/* Quote Styled Body Text */}
              <div className="flex flex-col gap-5 text-stone-700 text-sm md:text-base leading-relaxed font-semibold">
                <p className="border-l-4 border-[#059212] pl-4 sm:pl-6 italic text-stone-800 text-sm sm:text-base">
                  "<strong>Swift Group</strong> was founded by <strong>Mr. Prakash Patel</strong>, a visionary leader with over 20 years of experience in the construction industry. We began our journey in 2005 with Swift Constructions, successfully completing more than 12 lakh square feet of built-up space across Madhya Pradesh. Over the years, we've had the privilege of working with several prestigious clients, earning a reputation for quality, trust, and timely delivery."
                </p>
                <p className="text-stone-600 font-medium font-semibold">
                  "Building on this strong foundation, we are now expanding into sustainable construction solutions with the launch of <strong>Swift Eco Blocs</strong>—our AAC block manufacturing unit focused on delivering eco-friendly, high-performance building materials. At Swift Group, we continue to grow with a commitment to innovation, sustainability, and excellence in every project we undertake."
                </p>
              </div>

              {/* Verified brand marker */}
              <div className="flex flex-wrap items-center gap-3 border-t border-stone-250 pt-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center border border-green-100 text-[#059212] font-display font-black text-xs">
                    SP
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-400 font-bold tracking-wider block leading-none mb-1">
                      Parent Enterprise
                    </span>
                    <span className="text-xs font-bold text-stone-850">
                      Swift Constructions
                    </span>
                  </div>
                </div>
                <div className="h-6 w-[1px] bg-stone-300 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FCF5E3] flex items-center justify-center border border-[#EED79D] text-[#CBB23E] font-display font-black text-xs">
                    20+
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-400 font-bold tracking-wider block leading-none mb-1">
                      Industry Standing
                    </span>
                    <span className="text-xs font-bold text-stone-850">
                      Years of Experience
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* The Swift Promise - Core Pillars */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#059212]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Content Side */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-4">
              <span className="text-[10px] font-mono text-[#059212] font-bold uppercase tracking-widest">
                WHAT DRIVES US
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-950 tracking-tight">
                Our Non-Negotiable Engineering Values
              </h2>
              <p className="text-stone-605 text-xs sm:text-sm leading-relaxed mt-2">
                We design and batch every block inside areally integrated digital autoclave setups. From sourcing the highest quality silica or premium fly-ash to fine-tuning the microscopic bubble suspension density, precision is non-negotiable.
              </p>
              
              <div className="mt-4 flex flex-col gap-2.5">
                <button 
                  onClick={() => onNavigateHomeAndScroll('#3d-material-studio')}
                  className="px-5 py-3.5 bg-[#F8F9FA] border border-stone-300 hover:bg-stone-100 text-stone-800 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Cpu className="w-3.5 h-3.5 text-[#059212]" />
                  Interactive 3D Studio
                </button>
              </div>
            </div>

            {/* Right Pillars Bento-like Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#FAF8F5] border border-stone-300 p-6 md:p-8 rounded-3xl flex flex-col gap-4 hover:shadow-md transition-all shadow-xs">
                <div className="bg-green-50 p-3 rounded-2xl border border-green-100 w-12 h-12 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[#059212]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-stone-950 mt-1">
                  100% Green Recycled Input
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-semibold">
                  Utilizing premium pulverised fly ash sourced cleanly from approved power systems, transforming industrial waste into high-grade resilient masonry without heavy clay excavation.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FAF8F5] border border-stone-300 p-6 md:p-8 rounded-3xl flex flex-col gap-4 hover:shadow-md transition-all shadow-xs">
                <div className="bg-[#FDF1EB] p-3 rounded-2xl border border-[#F5DDD1] w-12 h-12 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-[#CE7A58]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-stone-950 mt-1">
                  German Autoclaving Process
                </h3>
                <p className="text-stone-605 text-xs sm:text-sm leading-relaxed font-semibold">
                  Our curing block line works at 12 bar steam pressures with temperatures reaching 190°C. This triggers the unique tobermorite crystal phase, locking in extreme dimension stability.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#FAF8F5] border border-stone-300 p-6 md:p-8 rounded-3xl flex flex-col gap-4 hover:shadow-md transition-all shadow-xs">
                <div className="bg-green-50 p-3 rounded-2xl border border-green-100 w-12 h-12 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#059212]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-stone-950 mt-1">
                  BIS Certified standards
                </h3>
                <p className="text-stone-605 text-xs sm:text-sm leading-relaxed font-semibold">
                  Every batch of block manufactured undergoes strict crushing stress test, moisture content analysis, and size tolerance tests inside our in-house QA laboratories.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#FAF8F5] border border-stone-300 p-6 md:p-8 rounded-3xl flex flex-col gap-4 hover:shadow-md transition-all shadow-xs">
                <div className="bg-[#FCF5E3] p-3 rounded-2xl border border-[#EED79D] w-12 h-12 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#CBB23E]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-stone-950 mt-1">
                  Swift Industries Stamp
                </h3>
                <p className="text-stone-605 text-xs sm:text-sm leading-relaxed font-semibold">
                  Bringing you the customer satisfaction standard of Central India's premier industrial concrete and fly-ash enterprise. You are backed by transparent billing and precise site-dispatch.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Legacy Roadmap / History */}
      <section className="py-20 bg-[#F8F9FA] border-t border-b border-stone-300 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-[#059212] font-bold uppercase tracking-widest">
              OUR JOURNEY THROUGH TIME
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-950 tracking-tight mt-2">
              Chronology of Building Integrity
            </h2>
            <p className="text-stone-605 text-xs sm:text-sm leading-relaxed mt-3">
              From our origins back in the late seventies, we have continually upgraded our engineering infrastructure to adapt to clean ecological standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="bg-white border border-stone-300 p-6 rounded-2xl hover:border-[#059212] hover:shadow-lg transition-all flex flex-col gap-3 relative shadow-sm shadow-stone-100">
                {/* Horizontal flow connector lines for desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-stone-300 z-15" />
                )}
                <div className="text-xs font-mono font-bold text-[#059212] bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 w-fit">
                  {milestone.year}
                </div>
                <h4 className="font-display font-bold text-base text-stone-900 mt-1">
                  {milestone.title}
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Factory Coordinator Banner / CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#059212]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="bg-[#F8F9FA] border border-stone-300 p-8 sm:p-12 md:p-16 rounded-3xl shadow-xl backdrop-blur-md">
            <Sparkles className="w-10 h-10 text-[#059212] mx-auto mb-6 shrink-0" />
            <span className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-widest block mb-2">
              DISPATCH CO-ORDINATE SYSTEM
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-950 tracking-tight">
              Ready to construct with Central India's absolute standard?
            </h2>
            <p className="text-stone-605 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mt-4 font-medium">
              Get an instant quote, dispatch details, bulk logistic solutions, or size customisations directly from our Birholi technical plant desk.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#059212] hover:bg-[#048010] text-white font-mono text-xs font-black rounded-xl flex items-center justify-center gap-2 transition-all border border-green-600 shadow-md cursor-pointer uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-green-200 shrink-0" />
                Dispatch Desk Form
              </button>
              <button
                onClick={() => onNavigateHomeAndScroll('#calculator-section')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-750 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all border border-stone-250 cursor-pointer uppercase tracking-wider shadow-xs"
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
