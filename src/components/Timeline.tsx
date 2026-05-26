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
    <div className="bg-stone-900 rounded-3xl p-6 md:p-10 border border-stone-800 shadow-lg relative">
      
      {/* Title */}
      <div className="border-b border-stone-850 pb-6 mb-8">
        <div className="flex items-center gap-2 text-green-400 font-mono text-xs font-bold tracking-wider uppercase mb-1">
          <Wrench className="w-4 h-4" />
          Professional Mason Manual
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight">
          Bricklaying vs. Eco Blox Installation Guide
        </h3>
        <p className="text-stone-400 text-sm mt-1 max-w-2xl">
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
                    ? 'bg-stone-950 border-green-600 shadow-md translate-x-1.5'
                    : isCompleted
                    ? 'bg-stone-850/60 border-stone-800 text-stone-300 hover:bg-stone-800'
                    : 'bg-transparent border-transparent text-stone-400 hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Step bubble */}
                  <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : isCompleted
                      ? 'bg-green-950/80 text-green-400 border border-green-900/40'
                      : 'bg-stone-800 text-stone-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4.5 h-4.5" /> : `0${item.step}`}
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-stone-500 font-semibold block uppercase">
                      Stage 0{item.step}
                    </span>
                    <span className={`font-display text-xs font-bold tracking-tight block truncate ${
                      isActive ? 'text-white font-extrabold' : 'text-stone-300'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-green-400 translate-x-0.5' : 'text-stone-600 group-hover:translate-x-0.5'
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-stone-950 p-6 md:p-8 rounded-3xl border border-stone-850 shadow-sm flex flex-col gap-5 min-h-[360px]"
            >
              {/* Step indicator header */}
              <div className="flex items-center justify-between border-b border-stone-850 pb-4">
                <div>
                  <span className="text-[10px] font-semibold text-green-400 font-mono tracking-widest uppercase block">
                    ACTIVE CONSTRUCTION STAGE 0{selectedStepData.step} / 09
                  </span>
                  <h4 className="font-display text-xl font-bold text-white mt-1">
                    {selectedStepData.title}
                  </h4>
                </div>
                <div className="bg-stone-900 p-2.5 rounded-2xl border border-stone-800">
                  <Layers className="w-5 h-5 text-stone-300" />
                </div>
              </div>

              {/* Text Body info */}
              <p className="text-stone-300 text-sm leading-relaxed">
                {selectedStepData.description}
              </p>

              {/* Visual simulated widget representation */}
              <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 flex items-center justify-between gap-4 mt-1">
                <div className="flex items-center gap-3">
                  <div className="bg-green-950/80 text-green-400 border border-green-900/40 p-2 rounded-xl shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-stone-500 font-mono uppercase block">
                      Target Construction Spec
                    </span>
                    <span className="text-xs font-bold text-white">
                      {activeStep === 2 ? "Max thick: 1 Inch (Level Mortar)" : activeStep === 3 ? "2mm - 4mm adhesive layers" : activeStep === 7 ? "Stagger offset: > 200mm" : "Plumb balance checks critical"}
                    </span>
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono text-stone-505 font-bold uppercase shrink-0">
                  Stage {activeStep} Specs
                </div>
              </div>

              {/* Site Supervisor Pro-Tip Section */}
              <div className="bg-amber-955/20 p-5 rounded-2xl border border-amber-900/30 mt-auto flex flex-col sm:flex-row gap-4">
                <div className="bg-amber-900/40 p-2.5 rounded-2xl border border-amber-800/40 text-amber-400 shrink-0 self-start">
                  <AlertTriangle className="w-5 h-5" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wide">
                        Site Supervisor Alert
                      </span>
                      <span className="text-stone-600">|</span>
                      <span className="text-[10px] font-bold text-amber-305">
                        {activeTip.title}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed mt-1">
                      {activeTip.text}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-amber-900/20">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-stone-500 block font-bold">
                        Omission Risk
                      </span>
                      <span className="text-[11px] text-red-400 font-semibold">
                        {activeTip.risk}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono text-stone-500 block font-bold">
                        Safety Checkpoint
                      </span>
                      <span className="text-[11px] text-stone-300 font-semibold">
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
              className="px-4 py-2 text-xs font-bold text-stone-400 disabled:opacity-30 hover:text-white select-none cursor-pointer"
            >
              ← Previous Stage
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(9, prev + 1))}
              disabled={activeStep === 9}
              className="px-5 py-2.5 bg-stone-950 border border-stone-800 hover:bg-stone-800 disabled:opacity-30 ml-auto text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Next Stage →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
