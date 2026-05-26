import React, { useState } from 'react';
import { DIFFERENTIATORS } from '../data';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Leaf, 
  Trash2, 
  Flame, 
  ShieldCheck, 
  Clock, 
  User,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function Differentiators() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>("01");

  // Map icon component to differentiator index
  const getIcon = (num: string) => {
    switch (num) {
      case "01":
        return <Cpu className="w-5 h-5 text-green-400" />;
      case "02":
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      case "03":
        return <Trash2 className="w-5 h-5 text-amber-400" />;
      case "04":
        return <Clock className="w-5 h-5 text-blue-400" />;
      case "05":
        return <ShieldCheck className="w-5 h-5 text-teal-400" />;
      case "06":
        return <Activity className="w-5 h-5 text-indigo-400" />;
      default:
        return <Cpu className="w-5 h-5 text-green-400" />;
    }
  };

  const activeDifferentiatorData = DIFFERENTIATORS.find(d => d.num === selectedCard) || DIFFERENTIATORS[0];

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      
      {/* Structural Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block mb-1">
            Innovative Technology
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Strength of Automated Innovation
          </h3>
          <p className="text-stone-400 text-sm md:text-base mt-2 max-w-xl">
            Swift Eco Blox operates the region's only fully automatic, zero-contact AAC manufacturing unit. Precision steam curing & wire sliced tolerances guarantee unmatched physical strength.
          </p>
        </div>

        <div className="lg:col-span-5 flex lg:justify-end">
          <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl text-[11px] font-mono leading-relaxed text-stone-400 flex gap-2 max-w-sm">
            <span className="bg-green-950/80 text-green-400 border border-green-900/45 font-bold px-1.5 py-0.5 rounded text-[9px] h-fit shrink-0">
              DID YOU KNOW
            </span>
            <span>
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
                    ? 'bg-stone-850 border-green-600 shadow-md ring-2 ring-green-900/40 translate-y-[-2px]'
                    : 'bg-stone-900 hover:bg-stone-850 border-stone-800/80 hover:border-stone-700/80 hover:shadow-xs'
                }`}
              >
                {/* Micro index */}
                <div className="text-[10px] font-mono text-stone-500 font-bold tracking-wider uppercase flex items-center justify-between">
                  <span>0{diff.num}</span>
                  <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-green-950/50 border border-green-900/40' : 'bg-stone-800'}`}>
                    {getIcon(diff.num)}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold text-white text-sm md:text-base">
                    {diff.title}
                  </h4>
                  <p className="text-stone-400 text-[11px] leading-relaxed mt-1 line-clamp-2">
                    {diff.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1 self-start">
                  <span>Inspect Spec Range</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Aspect: Detailed parameter spec visualizer */}
        <div className="lg:col-span-6">
          <div className="bg-stone-900 p-6 md:p-8 rounded-3xl border border-stone-800 shadow-lg h-full flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-stone-950 rounded-full blur-3xl opacity-50 -z-10" />

            {/* Pillar Header */}
            <div>
              <span className="text-[10px] font-bold text-white font-mono tracking-widest uppercase block mb-1">
                PILLAR DETAILS 0{activeDifferentiatorData.num} OF 06
              </span>
              <h4 className="font-display text-2xl font-black text-white tracking-tight">
                {activeDifferentiatorData.title}
              </h4>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed mt-2">
                {activeDifferentiatorData.description}
              </p>
            </div>

            {/* Visual core subpoints checklist */}
            <div className="flex flex-col gap-3 py-4 border-t border-b border-stone-800">
              <span className="text-[10px] font-mono text-white font-bold uppercase tracking-wider block">
                Technical Execution Highlights
              </span>
              
              {activeDifferentiatorData.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-green-950/80 border border-green-900/60 text-green-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-stone-300 text-xs md:text-sm font-medium">
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            {/* Simulated verification certificate footer */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center gap-3">
              <div className="bg-green-950/80 text-white border border-green-900/40 p-2 rounded-lg font-bold text-xs shrink-0 font-mono">
                ISI Standards Compliance
              </div>
              <p className="text-[10px] text-white leading-normal">
                Subjected to structural core compression tests. Authorized for heavy load masonry configurations. Certified eco-byproduct material.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
