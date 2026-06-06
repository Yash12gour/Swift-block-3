import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  INSTALLATION_STEPS 
} from '../data';
import { 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Layers,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Flame,
  Hammer
} from 'lucide-react';

const getStepImage = (stepNum: number): string => {
  switch (stepNum) {
    case 1: // Surface preparation
      return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80";
    case 2: // Base Course
      return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";
    case 3: // Mortar Prepare
      return "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80";
    case 4: // First course laying
      return "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80";
    case 5: // Corner Checks
      return "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&w=1200&q=80";
    case 6: // Level checking (laser/spirit level)
      return "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80";
    case 7: // Staggering layout
      return "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80";
    case 8: // Anti-crack mesh
      return "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80";
    case 9: // Joint scraper / final
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
    default:
      return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";
  }
};

export default function Timeline() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const selectedStepData = INSTALLATION_STEPS.find(s => s.step === activeStep) || INSTALLATION_STEPS[0];

  // Specific Site Supervisor Pro-Tips matched to each chronological construction phase
  const getProTip = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return {
          title: "Slab Moisture Factor",
          text: "Never place blocks on dusty, dry concrete floors. Moisture is quickly sucked from the bonding PMC mortar, causing micro joint cracks. Dampen the slab fully first.",
          risk: "High bond separation if neglected.",
          check: "Rubble cleared, dust brushed away, water sprinkled."
        };
      case 2:
        return {
          title: "Level is Everything",
          text: "The first course determines the overall alignment of the entire 12-foot wall. If the first block is even 2mm off, the top wall will lean heavily. Use a high-quality rich 1:6 sand cement bed.",
          risk: "Wavy courses on subsequent rows.",
          check: "Wait 24-48 hours before building high if base mortar exceeds 1\" thickness."
        };
      case 3:
        return {
          title: "Thin bed chemical mixing",
          text: "Do NOT mix standard dirt-sand with Polymer Modified Cement (PMC). Mix inside a clean bucket using a mechanical mixer drill. The mortar should flow like thick syrup.",
          risk: "Standard cement will dehydrate & shrink, cracking the block junctions.",
          check: "Water-to-powder ratio 1:3 by volume. Mix for 5 mins, let it rest 2 mins, re-stir."
        };
      case 4:
        return {
          title: "Anchor Hackings",
          text: "Where the AAC wall meets concrete RCC columns, hack the columns deeply (60-80 indentations/sq ft). Insert galvanized steel tie ties (anchors) every 2nd course.",
          risk: "Joint separation at building structural beam joints.",
          check: "Steel anchors installed, column sprayed with cement slurries."
        };
      case 5:
        return {
          title: "Plumb Checkpoints",
          text: "Build your corners first! Set leading blocks at both extremes of the grid, run a tight line dori (alignment string) along the top edges, and align middle filler blocks perfectly.",
          risk: "Irregular walls requiring massive plaster coats to level.",
          check: "Diagonal corners squared off using 3-4-5 rule."
        };
      case 6:
        return {
          title: "Continuous Spirit bubble checks",
          text: "After laying every block, run a wood level or spirit bubble over the horizontal and vertical faces. Tap with a smooth black rubber mallet only. Never hit with steel trowels.",
          risk: "Accidental block fractures and cracked structural corners.",
          check: "Rubber mallet tap checks on every single piece."
        };
      case 7:
        return {
          title: "Interlocking Overlaps",
          text: "The vertical joints of consecutive rows must stagger horizontally. Ensure an 8-inch overlap. If short blocks are used, make custom cuts using a carbide hand-saw.",
          risk: "Structural split fault lines if vertical seams line up.",
          check: "Overlap is strictly greater than 200mm (8 inches)."
        };
      case 8:
        return {
          title: "Anti-Crack Mesh Grid",
          text: "Settle a 150mm wide fiberglass self-fused mesh or steel mesh over columns-to-block interfaces before plastering. This handles differing structural expansion coefficients beautifully.",
          risk: "Hairline plasters cracks during winter-to-summer transitions.",
          check: "Mesh pinned tight with concrete nails before coating."
        };
      case 9:
        return {
          title: "Adhesive scrapings & Curing",
          text: "Jointing adhesives (PMC) are self-curing and don't need continuous 10-day watering! Scrape off spilled mortar immediately. Let set for 48 hours before chasing conduit lines.",
          risk: "Thick concrete globs that require hard grinding to clear.",
          check: "Zero cement spills left on walls overnight, self-curing PMC active."
        };
      default:
        return {
          title: "General Site Protocol",
          text: "Ensure safety gear is worn. Cut blocks slowly with cutting saw to minimize dust floating.",
          risk: "None",
          check: "Helmets & dust masks active."
        };
    }
  };

  const activeTip = getProTip(activeStep);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-300 shadow-lg relative">
      
      {/* Title */}
      <div className="border-b border-stone-150 pb-6 mb-8">
        <div className="flex items-center gap-2 text-[#059212] font-mono text-xs font-bold tracking-wider uppercase mb-1">
          <Wrench className="w-4 h-4" />
          Professional Mason Manual
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-stone-900 leading-tight">
          Bricklaying vs. Eco Blox Installation Guide
        </h3>
        <p className="text-stone-605 text-sm mt-1 max-w-2xl font-medium">
          AAC concrete blocks are light weight and highly dense in volume. Click through the sequential steps below to visual the correct professional laying guidelines on site.
        </p>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Vertical Step Picker track */}
        <div className="lg:col-span-5 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
          {INSTALLATION_STEPS.map((item) => {
            const isCompleted = item.step < activeStep;
            const isActive = item.step === activeStep;

            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 group ${
                  isActive
                    ? 'bg-white border-[#059212] shadow-md translate-x-1.5 ring-2 ring-[#059212]/15'
                    : isCompleted
                    ? 'bg-white border-stone-300 text-stone-705 hover:bg-stone-50 hover:shadow-xs'
                    : 'bg-transparent border-transparent text-stone-500 hover:bg-[#F5F2EA]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Step bubble */}
                  <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#059212] text-white'
                      : isCompleted
                      ? 'bg-green-50 text-[#059212] border border-green-150'
                      : 'bg-stone-100 text-stone-500'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4.5 h-4.5" /> : `0${item.step}`}
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-stone-400 font-semibold block uppercase">
                      Stage 0{item.step}
                    </span>
                    <span className={`font-display text-xs font-bold tracking-tight block truncate ${
                      isActive ? 'text-stone-900 font-black' : 'text-stone-700'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-[#059212] translate-x-0.5' : 'text-stone-400 group-hover:translate-x-0.5'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Visual step explainer & Supervisor Tip panel */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-stone-300 shadow-lg flex flex-col gap-5 min-h-[360px]"
            >
              {/* Step indicator header */}
              <div className="flex items-center justify-between border-b border-stone-150 pb-4">
                <div>
                  <span className="text-[10px] font-semibold text-[#059212] font-mono tracking-widest uppercase block">
                    ACTIVE CONSTRUCTION STAGE 0{selectedStepData.step} / 09
                  </span>
                  <h4 className="font-display text-xl font-bold text-stone-900 mt-1">
                    {selectedStepData.title}
                  </h4>
                </div>
                <div className="bg-[#F5F2EA] p-2.5 rounded-2xl border border-stone-300">
                  <Layers className="w-5 h-5 text-[#C42D2D]" />
                </div>
              </div>

              {/* Text Body info */}
              <p className="text-stone-605 text-sm leading-relaxed font-semibold">
                {selectedStepData.description}
              </p>

              {/* Visual construction photo representation */}
              <div className="relative group overflow-hidden rounded-2xl border border-stone-300 shadow-md h-48 md:h-56 mt-1 flex flex-col justify-end">
                <img 
                  src={getStepImage(activeStep)} 
                  alt={selectedStepData.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent pointer-events-none" />
                
                {/* Overlay Specification Tag on the photo */}
                <div className="relative p-4 flex flex-col gap-1 text-white z-10 w-full">
                  <div className="flex items-center justify-between gap-2.5 w-full">
                    <span className="text-[9px] font-mono text-[#059212] bg-green-50/95 border border-green-100/10 py-0.5 px-2 rounded-md font-bold uppercase tracking-wider backdrop-blur-xs">
                      Live Site Photo Spec
                    </span>
                    <span className="text-[9px] font-mono text-stone-350 font-bold uppercase">
                      Stage {activeStep} Layout
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-white tracking-tight drop-shadow-sm">
                      {activeStep === 2 
                        ? "Max spacing: 1 Inch (Level Mortar Bed)" 
                        : activeStep === 3 
                        ? "Uniform 2mm - 4mm thin PMC adhesive" 
                        : activeStep === 7 
                        ? "Interlocking stagger offset: > 200mm" 
                        : activeStep === 1 
                        ? "Clear, dust-free moistened slab base"
                        : activeStep === 4 
                        ? "Clean rubber mallet leveling & column hacking"
                        : activeStep === 5
                        ? "90° diagonal right-angle corner setting"
                        : activeStep === 6
                        ? "Continuous spirit bubble level alignment checks"
                        : activeStep === 8
                        ? "Anti-crack glass fiber joint mesh grid pre-lay"
                        : "PMC scraped perfectly & joint gaps cured"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Site Supervisor Pro-Tip Section */}
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 mt-auto flex flex-col sm:flex-row gap-4">
                <div className="bg-amber-100 p-2.5 rounded-2xl border border-amber-200 text-amber-600 shrink-0 self-start">
                  <AlertTriangle className="w-5 h-5" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-700 font-mono uppercase tracking-wide">
                        Site Supervisor Alert
                      </span>
                      <span className="text-amber-200">|</span>
                      <span className="text-[10px] font-bold text-amber-800">
                        {activeTip.title}
                      </span>
                    </div>
                    <p className="text-xs text-stone-605 leading-relaxed mt-1 font-semibold">
                      {activeTip.text}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-amber-200">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-stone-500 block font-bold">
                        Omission Risk
                      </span>
                      <span className="text-[11px] text-red-655 font-bold">
                        {activeTip.risk}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono text-stone-500 block font-bold">
                        Safety Checkpoint
                      </span>
                      <span className="text-[11px] text-stone-705 font-bold">
                        ✓ {activeTip.check}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Previous/Next micro navigation */}
          <div className="flex items-center justify-between p-2">
            <button
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="px-4 py-2 text-xs font-bold text-stone-500 disabled:opacity-30 hover:text-stone-900 select-none cursor-pointer"
            >
              ← Previous Stage
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(9, prev + 1))}
              disabled={activeStep === 9}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-30 ml-auto text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Next Stage →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
