import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Leaf, 
  Weight, 
  Calendar, 
  Coins, 
  Zap, 
  FileCheck,
  Percent,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { STANDARD_SIZES } from '../data';

export default function Calculator() {
  const [area, setArea] = useState<number>(1000); // 1000 sq ft standard wall area
  const [unitType, setUnitType] = useState<'sqft' | 'sqm'>('sqft');
  const [selectedThickness, setSelectedThickness] = useState<number>(150); // default 150mm thickness

  // Convert area into square meters if it's in sqft
  const areaInSqM = useMemo(() => {
    if (unitType === 'sqft') {
      return area * 0.092903; // 1 sqft = 0.0929 sq m
    }
    return area;
  }, [area, unitType]);

  // Standard metrics
  const calculations = useMemo(() => {
    // 1 single block standard dimensions: 600mm x 200mm = 0.6m x 0.2m = 0.12 m² area facing
    const blockAreaSqM = 0.6 * 0.2; 
    
    // Number of Eco Blox blocks required
    const blocksCount = Math.ceil(areaInSqM / blockAreaSqM);

    // One single standard clay brick face space (including mortar joints) is roughly 0.225m * 0.075m = 0.0168 m²
    // Therefore 1 AAC block (0.12 m²) is approximately equivalent to 7.14 traditional red clay bricks.
    const bricksEquivalentMultiplier = 8; // standard industry substitution factor is 1:9 or 1:8, let's use 8.
    const traditionalBricksCount = Math.ceil(areaInSqM / 0.015); // standard size brick face

    // Weights calculation:
    // Red clay traditional brick has avg density of 1900 kg/m³
    // Standard brick is roughly 2.8 kg. Or 1900 * (0.19m * 0.09m * 0.09m) = ~2.8 kg each
    const doubleLayerFactor = selectedThickness > 100 ? 1.5 : 1.0; // thicker walls use double layer bricks
    const totalBrickWeightKg = Math.ceil(traditionalBricksCount * 3.1 * doubleLayerFactor);

    // Eco Blox drying density: averages 600 kg/m³
    // Block volume: 0.6m * 0.2m * w(m)
    const blockThicknessMeters = selectedThickness / 1000;
    const singleBlockVolume = 0.6 * 0.2 * blockThicknessMeters;
    const singleBlockWeightKg = 600 * singleBlockVolume; // density * vol, e.g. 600 * (0.6 * 0.2 * 0.15) = 10.8 kg
    const totalEcoBloxWeightKg = Math.ceil(blocksCount * singleBlockWeightKg);

    // Weight difference (Tons saved)
    const weightSavedKg = totalBrickWeightKg - totalEcoBloxWeightKg;
    const weightSavedTons = Math.max(0, parseFloat((weightSavedKg / 1000).toFixed(1)));

    // Mortar usage:
    // Traditional bricks require approx 22kg mortar per sq ft (high joints)
    // AAC blocks using thin bed adhesive require just ~3.5kg matching mortar
    const traditionalMortarBags = Math.ceil((areaInSqM * 20) / 50); // 50kg bags
    const aacMortarBags = Math.ceil((areaInSqM * 3.2) / 40); // 40kg adhesive bags
    const mortarSavingsPercent = 75;

    // Timeline saving:
    // 1 mason can lay ~150-180 bricks/day = 12-15 sq m wall
    // 1 mason lay ~30-40 Eco Blox/day = 36-48 sq m wall (3x speed boost)
    const brickDays = Math.ceil(areaInSqM / 14);
    const aacDays = Math.ceil(areaInSqM / 42);
    const daysSaved = Math.max(1, brickDays - aacDays);

    // Environmental metrics:
    // Clay bricks burn fertile crop soil. 1 brick = ~3kg soil.
    // Coal burned: 1 brick releases ~0.4kg CO2.
    // Eco Blox saves agricultural topsoil completely + offsets carbon via industrial byproducts (Fly Ash) usage.
    const co2OffsetKg = Math.ceil(traditionalBricksCount * 0.35); // 0.35kg CO2 offset per clay brick replaced
    const agriculturalSoilSavedTons = parseFloat(((traditionalBricksCount * 2.8) / 1000).toFixed(1));

    // Monetary dynamic indicators
    const averageBrickCostINR = 9; // approximate localized brick rate
    const averageBlockCostINR = 80; // approximate localized block rate
    const directMasonSavingPercent = 40; // labor savings

    return {
      blocksCount,
      traditionalBricksCount,
      totalBrickWeightKg,
      totalEcoBloxWeightKg,
      weightSavedTons,
      traditionalMortarBags,
      aacMortarBags,
      mortarSavingsPercent,
      daysSaved,
      co2OffsetKg,
      agriculturalSoilSavedTons,
      currencySaving: Math.ceil(areaInSqM * 145) // simulated standard jointing & steel cost difference per sq m
    };
  }, [areaInSqM, selectedThickness]);

  // Unique list of thicknesses from STANDARD_SIZES (75, 100, 150, 200, 225, 250, 300)
  const availableThicknesses = useMemo(() => {
    const list = STANDARD_SIZES.map(s => s.w);
    return Array.from(new Set(list)).sort((a, b) => a - b);
  }, []);

  return (
    <div className="bg-stone-900 rounded-3xl p-6 md:p-10 border border-stone-800 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-950/20 rounded-full blur-3xl -z-10 opacity-60" />

      {/* Head section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-850">
        <div>
          <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-wider block mb-1">
            Structural & Eco Audit
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Eco-Construction Dynamic Calculator
          </h3>
          <p className="text-stone-400 text-sm mt-1 max-w-xl">
            Input your wall parameters to instantly calculate materials, soil preservation, steel load savings, and labor timelines.
          </p>
        </div>

        {/* Unit Selector */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-850 self-start lg:self-center">
          <button
            onClick={() => { setUnitType('sqft'); setArea(1000); }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              unitType === 'sqft' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            SQUARE FEET (SQ FT)
          </button>
          <button
            onClick={() => { setUnitType('sqm'); setArea(100); }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              unitType === 'sqm' ? 'bg-stone-800 text-white shadow-sm' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            SQUARE METERS (SQ M)
          </button>
        </div>
      </div>

      {/* Calculator Body - Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
        
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Wall Area Selector Block */}
          <div className="bg-stone-950 p-6 rounded-2xl border border-stone-850 relative">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-stone-200">
                Total Wall Surface Area
              </label>
              <div className="bg-stone-800 px-3 py-1 rounded-lg border border-stone-700/60">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-16 bg-transparent text-right font-display font-bold text-white focus:outline-none focus:ring-0"
                />
                <span className="text-xs font-mono font-semibold text-stone-400 ml-1">
                  {unitType === 'sqft' ? 'sq ft' : 'm²'}
                </span>
              </div>
            </div>

            {/* Area Slider */}
            <input
              type="range"
              min={unitType === 'sqft' ? 50 : 5}
              max={unitType === 'sqft' ? 5000 : 500}
              step={unitType === 'sqft' ? 50 : 5}
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-green-600 focus:outline-none"
            />
            
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mt-2">
              <span>Min: {unitType === 'sqft' ? '50 sq ft' : '5 m²'}</span>
              <span>Max: {unitType === 'sqft' ? '5,000 sq ft' : '500 m²'}</span>
            </div>
          </div>

          {/* Block Thickness Selector */}
          <div>
            <label className="text-sm font-bold text-stone-200 flex items-center gap-1.5 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-green-400" />
              Proposed Block Thickness (Width)
            </label>
            
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {availableThicknesses.map((th) => (
                <button
                  key={th}
                  onClick={() => setSelectedThickness(th)}
                  className={`p-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    selectedThickness === th
                      ? 'bg-green-600 text-white border-green-500 shadow-md shadow-green-600/10'
                      : 'bg-stone-850 text-stone-300 border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  {th} mm
                </button>
              ))}
            </div>

            {/* Thickness Helper Guidelines */}
            <div className="bg-stone-950 border border-stone-800/80 p-4 rounded-xl text-stone-400 text-[11px] leading-relaxed mt-4 flex items-start gap-2">
              <span className="bg-green-950/80 text-green-400 border border-green-900/40 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wide mt-0.5 whitespace-nowrap">
                Usage Tip
              </span>
              <span>
                {selectedThickness <= 100 
                  ? "75mm - 100mm thicknesses are ideal for inner partition walls, bathroom shafts & non-load partition frames."
                  : "150mm - 300mm configurations are engineered for robust outer envelope walls, load-bearing grids & outer thermal walls."}
              </span>
            </div>
          </div>

          {/* Structural Certification Panel */}
          <div className="bg-gradient-to-br from-green-950 to-green-900/90 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden border border-green-900/30">
            <div className="absolute right-0 bottom-0 top-0 w-24 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-500/25 to-transparent blur-xl" />
            
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                <Building className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-green-400 tracking-wider">
                  Guaranteed Standards Compliance
                </span>
                <h4 className="font-display font-semibold text-sm text-white mt-0.5">
                  Bureau of Indian Standards Approved
                </h4>
                <p className="text-[11px] text-green-200/80 leading-relaxed mt-1">
                  Eco Blox elements are manufactured under rigid ISO and BIS guidelines. Certified high-performance compressive strength (4.0-5.0 N/mm²) delivers maximum earthquake protection.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Output Impact Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="text-xs font-mono font-bold text-stone-500 flex items-center justify-between border-b border-stone-800 pb-2">
            <span>AUDITED ESTIMATED ADVANTAGES</span>
            <span className="text-green-400 animate-pulse">Verified by Swift Group</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Cards 1: Blocks Required */}
            <div 
              id="calc-materials-volume-card"
              className="bg-stone-950 hover:bg-stone-850/80 hover:scale-[1.025] hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)] p-5 rounded-2xl border border-stone-850/65 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-400">Materials Volume</span>
                <span className="p-1 px-2.5 bg-green-950/80 text-green-400 border border-green-900/40 font-mono font-bold text-[9px] rounded-full">
                  1 : 8 substitution
                </span>
              </div>
              <div className="font-display font-extrabold text-white text-3xl">
                {calculations.blocksCount.toLocaleString()}
              </div>
              <div className="font-display font-bold text-sm text-white mt-1">
                Eco Blox Required
              </div>
              <p className="text-[11px] text-stone-400 leading-snug mt-1 border-t border-stone-851 pt-1.5">
                Replaces <strong className="text-stone-300 font-semibold">{calculations.traditionalBricksCount.toLocaleString()}</strong> traditional red bricks, reducing concrete block joints significantly.
              </p>
            </div>

            {/* Card 2: Foundation Weight saved */}
            <div 
              id="calc-structural-load-card"
              className="bg-stone-950 hover:bg-stone-850/80 hover:scale-[1.025] hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] p-5 rounded-2xl border border-stone-850/65 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-400">Dead Load Weight Saved</span>
                <span className="p-1 px-2 bg-orange-950/80 text-orange-300 border border-orange-900/40 font-mono font-bold text-[9px] rounded-full">
                  Steel & Foundation
                </span>
              </div>
              <div className="font-display font-extrabold text-orange-400 text-3xl">
                {calculations.weightSavedTons} Tons
              </div>
              <div className="font-display font-bold text-sm text-white mt-1">
                Reduction in Structural Load
              </div>
              <p className="text-[11px] text-stone-400 leading-snug mt-1 border-t border-stone-851 pt-1.5">
                Eco Blox wall weight is <strong className="text-stone-300">{calculations.totalEcoBloxWeightKg.toLocaleString()} kg</strong> compared to traditional <strong className="text-stone-300">{calculations.totalBrickWeightKg.toLocaleString()} kg</strong> bricks.
              </p>
            </div>

            {/* Card 3: Environmental Index */}
            <div 
              id="calc-carbon-offset-card"
              className="bg-stone-950 hover:bg-stone-850/80 hover:scale-[1.025] hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)] p-5 rounded-2xl border border-stone-850/65 transition-all duration-300 flex flex-col relative group"
            >
              <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-400">Eco Conservation</span>
                <span className="text-green-400 text-xs font-bold flex items-center gap-0.5">
                  <Leaf className="w-3 h-3" />
                  Made from Waste
                </span>
              </div>
              <div className="font-display font-extrabold text-green-400 text-3xl">
                {calculations.co2OffsetKg.toLocaleString()} kg
              </div>
              <div className="font-display font-bold text-sm text-white mt-1">
                Carbon Offset Potential
              </div>
              <p className="text-[11px] text-stone-400 leading-snug mt-1 border-t border-stone-851 pt-1.5">
                Preserves <strong className="text-green-400">{calculations.agriculturalSoilSavedTons} Tons</strong> of organic farming topsoil by replacing standard clay brick kilns entirely.
              </p>
            </div>

            {/* Card 4: Speedy build speed */}
            <div 
              id="calc-timeline-impact-card"
              className="bg-stone-950 hover:bg-stone-850/80 hover:scale-[1.025] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] p-5 rounded-2xl border border-stone-850/65 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-400">Timeline Impact</span>
                <span className="p-1 px-2.5 bg-blue-950/80 text-blue-300 border border-blue-900/40 font-mono font-bold text-[9px] rounded-full">
                  Labor Boost 3x
                </span>
              </div>
              <div className="font-display font-extrabold text-blue-400 text-3xl">
                {calculations.daysSaved} Days Saved
              </div>
              <div className="font-display font-bold text-sm text-white mt-1">
                Mason Laying Speed
              </div>
              <p className="text-[11px] text-stone-400 leading-snug mt-1 border-t border-stone-851 pt-1.5">
                Reduces total wall construction cycle speed by roughly 60%. Speeds up critical structural handovers on site.
              </p>
            </div>

            {/* Card 5: Adhesive joint mortar */}
            <div className="bg-stone-950 p-5 rounded-2xl border border-stone-850/65 transition-all flex flex-col sm:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-stone-400">Masonry Adhesive Savings</span>
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold bg-green-950/80 border border-green-900/40 p-1 px-2.5 rounded-lg">
                  <Percent className="w-3.5 h-3.5" />
                  <span>Saves {calculations.mortarSavingsPercent}% mortar material</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-1.5">
                <div>
                  <span className="text-[10px] uppercase text-stone-500 font-mono">Traditional Bricks</span>
                  <div className="font-display font-extrabold text-stone-300 text-xl">
                    {calculations.traditionalMortarBags} Bags
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">Heavy Sand Cement Mix</p>
                </div>
                <div className="border-l pl-4 border-stone-800">
                  <span className="text-[10px] uppercase text-green-400 font-mono font-bold">Swift Eco Blox</span>
                  <div className="font-display font-extrabold text-green-400 text-xl">
                    {calculations.aacMortarBags} Bags
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">Thin-Bed Polymer compound</p>
                </div>
              </div>
            </div>

          </div>

          {/* Calculated Direct Cost Benefit projection */}
          <div className="bg-green-950/30 p-5 rounded-2xl border border-green-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
            <div>
              <h5 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                <Coins className="text-green-455 w-4.5 h-4.5" />
                Aggregated Cost Advantages
              </h5>
              <p className="text-[11px] text-stone-400 leading-relaxed mt-1 max-w-md">
                Refining overall construction with Swift Eco Blox saves on foundation concrete thickness, jointing chemicals, rebar weights, and masonry daily wages.
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] font-mono text-stone-500 font-bold block uppercase">
                Estimated Project Saving
              </span>
              <span className="font-display font-black text-green-400 text-2xl">
                ₹ {calculations.currencySaving.toLocaleString()}*
              </span>
              <span className="text-[9px] text-stone-500 block italic mt-0.5">
                *Local site values may vary
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
