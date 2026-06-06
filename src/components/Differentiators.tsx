import React, { useState } from 'react';
import { DIFFERENTIATORS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Leaf, 
  Trash2, 
  Flame, 
  ShieldCheck, 
  Clock, 
  User,
  Activity,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const getPillarImage = (num: string): string => {
  switch (num) {
    case "01": // Fully Automatic Plant
      return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80";
    case "02": // Eco-Friendly Footprint
      return "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80";
    case "03": // Lightweight Architecture
      return "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80";
    case "04": // Speed & Uniformity
      return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";
    case "05": // Rigorous Strength Standards
      return "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&w=1200&q=80";
    case "06": // Microclimatic Insulation
      return "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80";
    default:
      return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";
  }
};

export default function Differentiators() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>("01");

  // Map icon component to differentiator index
  const getIcon = (num: string) => {
    switch (num) {
      case "01":
        return <Cpu className="w-5 h-5 text-[#059212]" />;
      case "02":
        return <Leaf className="w-5 h-5 text-[#059212]" />;
      case "03":
        return <Trash2 className="w-5 h-5 text-[#C42D2D]" />;
      case "04":
        return <Clock className="w-5 h-5 text-[#059212]" />;
      case "05":
        return <ShieldCheck className="w-5 h-5 text-[#059212]" />;
      case "06":
        return <Activity className="w-5 h-5 text-[#C42D2D]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#059212]" />;
    }
  };

  const activeDifferentiatorData = DIFFERENTIATORS.find(d => d.num === selectedCard) || DIFFERENTIATORS[0];

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      
      {/* Structural Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <span className="text-xs font-mono text-[#059212] font-bold uppercase tracking-wider block mb-1">
            Innovative Technology
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            The Strength of Automated Innovation
          </h3>
          <p className="text-stone-605 text-sm md:text-base mt-2 max-w-xl font-medium">
            Swift Eco Blox operates the region's only fully automatic, zero-contact AAC manufacturing unit. Precision steam curing & wire sliced tolerances guarantee unmatched physical strength.
          </p>
        </div>

        <div className="lg:col-span-5 flex lg:justify-end">
          <div className="bg-white border border-stone-300 p-4 rounded-xl text-[11px] font-mono leading-relaxed text-stone-655 flex gap-2 max-w-sm shadow-sm">
            <span className="bg-green-50 text-[#059212] border border-green-100 font-bold px-1.5 py-0.5 rounded text-[9px] h-fit shrink-0">
              DID YOU KNOW
            </span>
            <span className="font-medium">
              Traditional red brick manufacturing uses up to 3 tons of fertile agricultural river topsoil per 1,000 bricks. AAC completely preserves it.
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Bento-Grid style Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Aspect: The Selector Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DIFFERENTIATORS.map((diff) => {
            const isSelected = selectedCard === diff.num;
            return (
              <div
                key={diff.num}
                onClick={() => setSelectedCard(diff.num)}
                onMouseEnter={() => setHoveredCard(diff.num)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 relative group ${
                  isSelected
                    ? 'bg-[#F8F9FA] border-[#059212] shadow-md ring-2 ring-[#059212]/20 translate-y-[-2px]'
                    : 'bg-white hover:bg-stone-50 border-stone-300 hover:border-stone-400 hover:shadow-md'
                }`}
              >
                {/* Micro index */}
                <div className="text-[10px] font-mono text-stone-500 font-bold tracking-wider uppercase flex items-center justify-between">
                  <span>0{diff.num}</span>
                  <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-green-50 border border-green-100' : 'bg-[#FAF8F5]'}`}>
                    {getIcon(diff.num)}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm md:text-base">
                    {diff.title}
                  </h4>
                  <p className="text-stone-500 text-[11px] leading-relaxed mt-1 line-clamp-2 font-medium">
                    {diff.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#059212] opacity-0 group-hover:opacity-100 transition-opacity mt-1 self-start">
                  <span>Inspect Spec Range</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Aspect: Detailed parameter spec visualizer */}
        <div className="lg:col-span-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-300 shadow-lg h-full flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-stone-50 rounded-full blur-3xl opacity-50 -z-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCard}
                initial={{ opacity: 0, scale: 0.98, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full flex flex-col justify-between gap-6"
              >
                {/* Pillar Header */}
                <div>
                  <span className="text-[10px] font-bold text-[#059212] font-mono tracking-widest uppercase block mb-1">
                    PILLAR DETAILS 0{activeDifferentiatorData.num} OF 06
                  </span>
                  <h4 className="font-display text-2xl font-black text-stone-900 tracking-tight">
                    {activeDifferentiatorData.title}
                  </h4>
                  <p className="text-stone-605 text-xs md:text-sm leading-relaxed mt-2 font-medium">
                    {activeDifferentiatorData.description}
                  </p>
                </div>

                {/* Real-time Showcase Image */}
                <div className="relative group overflow-hidden rounded-2xl border border-stone-300 shadow-md h-40 md:h-44 flex flex-col justify-end">
                  <img 
                    src={getPillarImage(activeDifferentiatorData.num)} 
                    alt={activeDifferentiatorData.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent pointer-events-none" />
                  
                  {/* Overlay Specification Tag on the photo */}
                  <div className="relative p-3 flex items-center justify-between gap-2.5 text-white z-10 w-full">
                    <span className="text-[9px] font-mono text-[#059212] bg-green-50/95 border border-green-100/10 py-0.5 px-2 rounded-md font-bold uppercase tracking-wider backdrop-blur-xs">
                      Live Manufacturing Showcase
                    </span>
                    <span className="text-[9px] font-mono text-stone-300 font-bold uppercase">
                      Pillar {activeDifferentiatorData.num} Spec
                    </span>
                  </div>
                </div>

                {/* Visual core subpoints checklist */}
                <div className="flex flex-col gap-3 py-4 border-t border-b border-stone-150">
                  <span className="text-[10px] font-mono text-stone-700 font-bold uppercase tracking-wider block">
                    Technical Execution Highlights
                  </span>
                  
                  {activeDifferentiatorData.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-green-50 border border-green-100 text-[#059212] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-stone-700 text-xs md:text-sm font-semibold">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Simulated verification certificate footer */}
                <div className="bg-[#F8F9FA] p-4 rounded-xl border border-stone-300 flex items-center gap-3 shadow-xs">
                  <div className="bg-green-50 text-[#059212] border border-green-100 p-2 rounded-lg font-bold text-xs shrink-0 font-mono">
                    ISI Standards Compliance
                  </div>
                  <p className="text-[10px] text-stone-600 leading-normal font-semibold">
                    Subjected to structural core compression tests. Authorized for heavy load masonry configurations. Certified eco-byproduct material.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>

    </div>
  );
}
