import React, { useState } from 'react';
import { TOOL_KIT, STANDARD_SIZES } from '../data';
import { StandardBlockSize } from '../types';
import { 
  Minimize2, 
  HelpCircle, 
  ChevronRight, 
  Box, 
  Hammer,
  Sparkles,
  Layers,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface ToolKitProps {
  onSelectSize: (size: StandardBlockSize) => void;
  activeSize: StandardBlockSize;
}

export default function ToolKit({ onSelectSize, activeSize }: ToolKitProps) {
  const [selectedTool, setSelectedTool] = useState<string>("Notched Trowel");

  const activeToolData = TOOL_KIT.find(t => t.name === selectedTool) || TOOL_KIT[0];

  return (
    <div className="bg-stone-900 rounded-3xl p-6 md:p-10 border border-stone-800 shadow-xl flex flex-col gap-8 md:gap-10 relative">
      <div className="absolute left-0 bottom-0 top-0 w-64 bg-green-950/20 rounded-full blur-3xl -z-10 opacity-60" />

      {/* Grid: Sizes selection on left, Tool Kit selector on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Aspect: 11 Standard Sizes Catalog */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-green-400 font-bold uppercase tracking-wider mb-1">
              <Box className="w-4 h-4" />
              Dimensions Directory
            </div>
            <h4 className="font-display text-2xl font-bold text-white tracking-tight">
              Standard Block Proportions
            </h4>
            <p className="text-stone-400 text-xs md:text-sm mt-1 max-w-md leading-relaxed">
              AAC blocks are strictly engineered for uniform width layouts. Select a standard dimensional size profile to view and resize the 3D model:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
            {STANDARD_SIZES.map((size) => {
              const isSelected = activeSize.id === size.id;
              return (
                <button
                   key={size.id}
                   onClick={() => onSelectSize(size)}
                   className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-1.5 ${
                     isSelected
                       ? 'bg-stone-950 border-green-600 text-white shadow-md scale-[1.01]'
                       : 'bg-stone-850/80 text-stone-300 border-stone-800 hover:bg-stone-800 hover:border-stone-750'
                   }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider opacity-60">
                      Standard Size Block
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display font-black text-lg md:text-xl">
                      {size.l}
                    </span>
                    <span className="text-xs opacity-50">x</span>
                    <span className="font-display font-black text-lg md:text-xl">
                      {size.h}
                    </span>
                    <span className="text-xs opacity-50">x</span>
                    <span className="font-display font-black text-lg md:text-xl text-green-400">
                      {size.w}
                    </span>
                    <span className="text-[9px] font-mono opacity-55 ml-1">mm</span>
                  </div>

                  <div className="text-[10px] opacity-70 leading-normal border-t pt-1 border-stone-800 flex justify-between">
                    <span>Width: {size.w === 75 ? "Slim Partition" : size.w >= 200 ? "Heavy External" : "Standard Core"}</span>
                    <span>W: {size.w} mm</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sizing impact note */}
          <div className="bg-stone-950 border border-stone-800/80 p-4 rounded-xl text-[11px] text-stone-400 leading-normal flex items-start gap-2.5">
            <Minimize2 className="w-4.5 h-4.5 text-stone-500 shrink-0 mt-0.5" />
            <span>
              All blocks feature a uniform length of <strong className="text-white">600mm</strong>, accelerating construction timelines. Custom depths cut on site seamlessly with our carbide hand saw.
            </span>
          </div>

        </div>

        {/* Right Aspect: Masonry Tool Kit Selector */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-green-400 font-bold uppercase tracking-wider mb-1">
              <Hammer className="w-4 h-4" />
              Equipment Index
            </div>
            <h4 className="font-display text-2xl font-bold text-white tracking-tight">
              AAC Specialist Tool Kit
            </h4>
            <p className="text-stone-400 text-xs md:text-sm mt-1 max-w-md leading-relaxed">
              Laying autoclaved elements utilizes precision chemical adhesive rather than thick dry sand mud. Hover or inspect our specialist high-efficiency toolkit:
            </p>
          </div>

          {/* Tools Scrolling Horizontal or grid Selector */}
          <div className="flex flex-wrap gap-2">
            {TOOL_KIT.map((tool) => {
              const isSelected = selectedTool === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => setSelectedTool(tool.name)}
                  className={`p-2.5 px-4 text-xs font-semibold rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-green-600 border-green-554 text-white shadow-md shadow-green-900/20'
                      : 'bg-stone-850 text-stone-300 border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  {tool.name}
                </button>
              );
            })}
          </div>

          {/* Active Tool card details */}
          <div className="bg-stone-950 border border-stone-800 p-6 rounded-2xl relative shadow-xs flex flex-col justify-between gap-5 min-h-[220px]">
            <div>
              <div className="flex items-center justify-between border-b pb-3 border-stone-805">
                <span className="text-[10px] font-bold text-green-400 font-mono uppercase tracking-wider">
                  Equipment Standard Specifications
                </span>
                <span className="text-stone-553 font-mono text-xs font-semibold">
                  {activeToolData.name}
                </span>
              </div>

              <p className="text-stone-300 text-sm mt-4 leading-relaxed">
                {activeToolData.description}
              </p>
            </div>

            <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-stone-500 font-medium">Primary Site Use:</span>
                <strong className="text-white font-bold">{activeToolData.useCase}</strong>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-600" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
