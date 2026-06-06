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
import Building3D from './Building3D';

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
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-300 shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#059212]/5 rounded-full blur-3xl -z-10 opacity-60" />

      {/* Head section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono text-[#059212] font-bold uppercase tracking-wider block mb-1">
            Structural & Eco Audit
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            Eco-Construction Dynamic Calculator
          </h3>
          <p className="text-stone-605 text-sm mt-1 max-w-xl">
            Input your wall parameters to instantly calculate materials, soil preservation, steel load savings, and labor timelines.
          </p>
        </div>

        {/* Unit Selector */}
        <div className="flex bg-stone-200/50 p-1 rounded-xl border border-stone-250 self-start lg:self-center">
          <button
            onClick={() => { setUnitType('sqft'); setArea(1000); }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              unitType === 'sqft' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            SQUARE FEET (SQ FT)
          </button>
          <button
            onClick={() => { setUnitType('sqm'); setArea(100); }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              unitType === 'sqm' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
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
          <div className="bg-white p-6 rounded-2xl border border-stone-300 relative shadow-md">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-stone-700">
                Total Wall Surface Area
              </label>
              <div className="bg-stone-100/80 px-3 py-1 rounded-lg border border-stone-300 shadow-xs">
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-16 bg-transparent text-right font-display font-bold text-stone-900 focus:outline-none focus:ring-0"
                />
                <span className="text-xs font-mono font-semibold text-stone-500 ml-1">
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
              className="w-full h-1.5 bg-stone-150 rounded-lg appearance-none cursor-pointer accent-[#059212] focus:outline-none"
            />
            
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mt-2">
              <span>Min: {unitType === 'sqft' ? '50 sq ft' : '5 m²'}</span>
              <span>Max: {unitType === 'sqft' ? '5,000 sq ft' : '500 m²'}</span>
            </div>
          </div>

          {/* Block Thickness Selector */}
          <div>
            <label className="text-sm font-bold text-stone-700 flex items-center gap-1.5 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-[#059212]" />
              Proposed Block Thickness (Width)
            </label>
            
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {availableThicknesses.map((th) => (
                <button
                  key={th}
                  onClick={() => setSelectedThickness(th)}
                  className={`p-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    selectedThickness === th
                      ? 'bg-[#059212] text-white border-green-600 shadow-md'
                      : 'bg-[#F8F9FA] text-stone-850 border-stone-300 hover:bg-stone-200 hover:border-stone-400 shadow-xs'
                  }`}
                >
                  {th} mm
                </button>
              ))}
            </div>

            {/* Thickness Helper Guidelines */}
            <div className="bg-[#F8F9FA] border border-stone-300 p-4 rounded-xl text-stone-605 text-[11px] leading-relaxed mt-4 flex items-start gap-2 shadow-sm">
              <span className="bg-green-50 text-[#059212] border border-green-200/50 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wide mt-0.5 whitespace-nowrap">
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
          <div className="bg-[#059212] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden border border-green-800">
            <div className="absolute right-0 bottom-0 top-0 w-24 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/15 to-transparent blur-xl" />
            
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                <Building className="w-5 h-5 text-green-200" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-green-100 tracking-wider">
                  Guaranteed Standards Compliance
                </span>
                <h4 className="font-display font-semibold text-sm text-white mt-0.5">
                  Bureau of Indian Standards Approved
                </h4>
                <p className="text-[11px] text-stone-200/80 leading-relaxed mt-1">
                  Eco Blox elements are manufactured under rigid ISO and BIS guidelines. Certified high-performance compressive strength (4.0-5.0 N/mm²) delivers maximum earthquake protection.
                </p>
              </div>
            </div>
          </div>

          {/* Elegant 3D rotating desktop architect showcase */}
          <div className="hidden lg:block">
            <Building3D />
          </div>

        </div>

        {/* Right Column: Dynamic Output Impact Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="text-xs font-mono font-semibold text-stone-553 flex items-center justify-between border-b border-stone-200 pb-2">
            <span>AUDITED ESTIMATED ADVANTAGES</span>
            <span className="text-[#059212] font-bold">Verified by Swift Group</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Cards 1: Blocks Required with Red Brick Comparison */}
            <div 
              id="calc-materials-volume-card"
              className="bg-[#F8F9FA] hover:bg-white hover:scale-[1.015] hover:border-[#059212] hover:shadow-lg p-5 rounded-2xl border border-stone-300 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-600">Materials Comparison</span>
                  <span className="p-1 px-2.5 bg-green-50 text-[#059212] border border-green-200 font-mono font-bold text-[9px] rounded-full">
                    1 : 8 Volumetric Ratio
                  </span>
                </div>

                {/* Comparative Volume Layout */}
                <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-3 mb-3">
                  <div>
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      🟩 ECO BLOX
                    </div>
                    <div className="font-display font-extrabold text-stone-900 text-3xl leading-none">
                      {calculations.blocksCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-stone-600 font-bold mt-1">
                      Lightweight Units
                    </div>
                  </div>

                  <div className="border-l border-stone-200 pl-4">
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      🟥 RED BRICKS
                    </div>
                    <div className="font-display font-extrabold text-[#C42D2D] text-3xl leading-none">
                      {calculations.traditionalBricksCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-stone-600 font-bold mt-1">
                      Traditional Clay
                    </div>
                  </div>
                </div>

                {/* Volumetric ratio visual container */}
                <div className="bg-stone-100 rounded-xl p-3 border border-stone-250/60 space-y-2 mb-3">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-600">
                    <span>Laying Footprint Equivalent</span>
                    <span className="text-[#059212] font-semibold">-87.5% pieces needed</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Eco Block Representative Shape */}
                    <div className="w-[30%] bg-emerald-600 h-7 rounded border border-emerald-700 flex items-center justify-center text-white text-[9px] font-mono font-black" title="1 Swift Eco Blox Unit">
                      1 BLOCK
                    </div>
                    
                    <span className="text-stone-400 text-xs font-semibold font-mono font-bold">≈</span>
                    
                    {/* Clay Brick Grid Equivalent */}
                    <div className="flex-1 grid grid-cols-4 gap-1 h-7">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="bg-red-600/95 rounded-[3px] border border-red-700/80 flex items-center justify-center text-white text-[7px] font-bold font-mono" title={`Clay Brick Unit ${idx + 1}`}>
                          🧱
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-605 leading-relaxed pt-1">
                A single lightweight Eco Blox replaces <strong className="text-stone-850 font-bold">8 traditional red brick blocks</strong>, streamlining construction, reducing handling, and cutting jointing mortar consumption.
              </p>
            </div>

            {/* Card 2: Foundation Weight saved */}
            <div 
              id="calc-structural-load-card"
              className="bg-[#F8F9FA] hover:bg-white hover:scale-[1.015] hover:border-[#059212] hover:shadow-lg p-5 rounded-2xl border border-stone-300 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-600">Structural Load Saved</span>
                  <span className="p-1 px-2.5 bg-red-50 text-[#C42D2D] border border-red-100 font-mono font-bold text-[9px] rounded-full">
                    -65% Dead Load
                  </span>
                </div>

                {/* Comparative Weight Load Layout */}
                <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-3 mb-3">
                  <div>
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      🟩 ECO BLOX WEIGHT
                    </div>
                    <div className="font-display font-extrabold text-stone-900 text-2xl leading-none">
                      {(calculations.totalEcoBloxWeightKg / 1000).toFixed(2)} T
                    </div>
                    <div className="text-xs text-stone-605 font-medium mt-1">
                      ({calculations.totalEcoBloxWeightKg.toLocaleString()} kg)
                    </div>
                  </div>

                  <div className="border-l border-stone-200 pl-4">
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      🟥 RED BRICKS WEIGHT
                    </div>
                    <div className="font-display font-extrabold text-[#C42D2D] text-2xl leading-none">
                      {(calculations.totalBrickWeightKg / 1000).toFixed(2)} T
                    </div>
                    <div className="text-xs text-stone-605 font-medium mt-1">
                      ({calculations.totalBrickWeightKg.toLocaleString()} kg)
                    </div>
                  </div>
                </div>

                {/* Load weight bar dynamic visual */}
                <div className="bg-stone-100 rounded-xl p-3 border border-stone-250/60 space-y-2 mb-3">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-600">
                    <span>Dead-Weight Load Comparison</span>
                    <span className="text-emerald-750 font-black">{calculations.weightSavedTons} Tons lighter</span>
                  </div>

                  <div className="space-y-1.5 pt-0.5">
                    {/* Eco Block Bar */}
                    <div>
                      <div className="flex justify-between text-[9px] font-mono text-emerald-800 font-bold mb-0.5">
                        <span>Swift Eco Blox</span>
                        <span>~30% Weight</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden border border-stone-300">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '30%' }} />
                      </div>
                    </div>

                    {/* Clay Brick Bar */}
                    <div>
                      <div className="flex justify-between text-[9px] font-mono text-[#C42D2D] font-bold mb-0.5">
                        <span>Traditional Red Bricks</span>
                        <span>100% Weight</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden border border-stone-300">
                        <div className="bg-red-600 h-full rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-605 leading-relaxed pt-1">
                Savings of <strong className="text-stone-850 font-bold">{calculations.weightSavedTons} Tons</strong> in structural load decreases deep foundation costs and steel reinforcement quantities required.
              </p>
            </div>

            {/* Card 3: Environmental Index */}
            <div 
              id="calc-carbon-offset-card"
              className="bg-[#F8F9FA] hover:bg-white hover:scale-[1.015] hover:border-[#059212] hover:shadow-lg p-5 rounded-2xl border border-stone-300 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-600">Environmental Impact</span>
                  <span className="p-1 px-2.5 bg-green-50 text-[#059212] border border-green-100 font-mono font-bold text-[9px] rounded-full">
                    Eco Protection
                  </span>
                </div>

                {/* Comparative Environmental Metrics */}
                <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-3 mb-3">
                  <div>
                    <div className="text-[9px] font-mono text-[#059212] font-black uppercase tracking-wider mb-1">
                      🌿 ECO BLOX SAVINGS
                    </div>
                    <div className="font-display font-extrabold text-[#059212] text-2xl leading-none">
                      {calculations.co2OffsetKg.toLocaleString()} kg
                    </div>
                    <div className="text-xs text-stone-605 font-medium mt-1">
                      Carbon Offset Made
                    </div>
                  </div>

                  <div className="border-l border-stone-200 pl-4">
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      ⚠️ CLAY SOIL LOST
                    </div>
                    <div className="font-display font-extrabold text-[#C42D2D] text-2xl leading-none">
                      {calculations.agriculturalSoilSavedTons} T
                    </div>
                    <div className="text-xs text-stone-605 font-medium mt-1">
                      Topsoil Excavated
                    </div>
                  </div>
                </div>

                {/* Topsoil preservation bar visual */}
                <div className="bg-stone-100 rounded-xl p-3 border border-stone-250/60 space-y-2 mb-3">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-600">
                    <span>Agricultural Topsoil Status</span>
                    <span className="text-[#059212] font-bold">100% Soil Protected</span>
                  </div>

                  <div className="space-y-1.5 pt-0.5">
                    {/* Eco Blox soil protection status */}
                    <div>
                      <div className="flex justify-between text-[9px] font-mono text-emerald-800 font-semibold mb-0.5">
                        <span>Using Eco Blox (Fly-ash composite)</span>
                        <span>0% Crop Soil Used</span>
                      </div>
                      <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden border border-emerald-200">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>

                    {/* Red clay brick strip-mining impact */}
                    <div>
                      <div className="flex justify-between text-[9px] font-mono text-red-800 font-semibold mb-0.5">
                        <span>Red Brick Kilns (Raw Clay soil)</span>
                        <span>{calculations.agriculturalSoilSavedTons} Tons Soil Burned</span>
                      </div>
                      <div className="w-full bg-red-100 rounded-full h-2 overflow-hidden border border-red-200">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '35%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-605 leading-relaxed pt-1">
                Replacing clay kiln firings preserves <strong className="text-stone-850 font-bold">{calculations.agriculturalSoilSavedTons} Tons</strong> of fertile organic agricultural topsoil from deep destructive excavation.
              </p>
            </div>

            {/* Card 4: Speedy build speed */}
            <div 
              id="calc-timeline-impact-card"
              className="bg-[#F8F9FA] hover:bg-white hover:scale-[1.015] hover:border-[#059212] hover:shadow-lg p-5 rounded-2xl border border-stone-300 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-600">Timeline Impact</span>
                  <span className="p-1 px-2.5 bg-green-50 text-[#059212] border border-green-100 font-mono font-bold text-[9px] rounded-full">
                    3x Faster Laying
                  </span>
                </div>

                {/* Comparative Timeline values */}
                <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-3 mb-3">
                  <div>
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      🟩 ECO BLOX SPEED
                    </div>
                    <div className="font-display font-extrabold text-[#059212] text-2xl leading-none">
                      {calculations.daysSaved} Days Saved
                    </div>
                    <div className="text-xs text-stone-605 font-medium mt-1">
                      Rapid Handover
                    </div>
                  </div>

                  <div className="border-l border-stone-200 pl-4">
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      🟥 RED BRICKS LAYING
                    </div>
                    <div className="font-display font-extrabold text-[#C42D2D] text-2xl leading-none">
                      3x Time
                    </div>
                    <div className="text-xs text-stone-605 font-medium mt-1">
                      Prolonged Labour
                    </div>
                  </div>
                </div>

                {/* Timeline completion speed race bars */}
                <div className="bg-stone-100 rounded-xl p-3 border border-stone-250/60 space-y-2 mb-3">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-600">
                    <span>Project Speed to Completion</span>
                    <span className="text-[#059212] font-semibold">Saves ~60% timeline</span>
                  </div>

                  <div className="space-y-1.5 pt-0.5">
                    {/* Eco Blox Lane */}
                    <div>
                      <div className="flex justify-between text-[9px] font-mono text-emerald-800 font-bold mb-0.5">
                        <span>Swift Eco Blox timeline</span>
                        <span>Fast Tracked</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden border border-stone-300">
                        <div className="bg-[#059212] h-full rounded-full" style={{ width: '35%' }} />
                      </div>
                    </div>

                    {/* Traditional Bricks Lane */}
                    <div>
                      <div className="flex justify-between text-[9px] font-mono text-red-800 font-bold mb-0.5">
                        <span>Traditional Red Brick timeline</span>
                        <span>Standard Project</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden border border-stone-300">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-605 leading-relaxed pt-1">
                The lightweight and large surface layout profile of Eco Blox enables a mason to construct walls three times faster than laying traditional bricks, shortening structural loops.
              </p>
            </div>

            {/* Card 5: Adhesive joint mortar */}
            <div 
              id="calc-mortar-savings-card"
              className="bg-[#F8F9FA] hover:bg-white hover:border-[#059212] hover:shadow-lg p-5 rounded-2xl border border-stone-300 shadow-sm transition-all duration-300 flex flex-col justify-between sm:col-span-2"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-stone-600">Masonry Adhesive Savings</span>
                  <div className="flex items-center gap-1.5 text-xs text-[#059212] font-bold bg-green-50 border border-green-200 p-1 px-2.5 rounded-lg w-fit">
                    <Percent className="w-3.5 h-3.5 text-[#059212]" />
                    <span>Saves {calculations.mortarSavingsPercent}% mortar material</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-stone-200 pb-4 mb-4">
                  <div>
                    <div className="text-[9px] font-mono text-[#059212] font-black uppercase tracking-wider mb-1">
                      🟩 SWIFT ECO BLOX (THIN-BED COMPOUND)
                    </div>
                    <div className="font-display font-extrabold text-[#059212] text-3xl leading-none flex items-baseline gap-1">
                      {calculations.aacMortarBags} <span className="text-sm text-stone-605 font-bold font-sans">Bags Required</span>
                    </div>
                    <p className="text-[10px] text-stone-453 font-mono mt-1">
                      1-2mm thin-bed joint polymer adhesive
                    </p>
                  </div>

                  <div className="border-t sm:border-t-0 sm:border-l border-stone-200 pt-4 sm:pt-0 sm:pl-6">
                    <div className="text-[9px] font-mono text-stone-400 font-black uppercase tracking-wider mb-1">
                      🟥 TRADITIONAL BRICKS (SAND-CEMENT MIX)
                    </div>
                    <div className="font-display font-extrabold text-stone-900 text-3xl leading-none flex items-baseline gap-1">
                      {calculations.traditionalMortarBags} <span className="text-sm text-stone-654 font-bold font-sans">Bags Required</span>
                    </div>
                    <p className="text-[10px] text-stone-453 font-mono mt-1">
                      10-12mm thick coarse cement sand mortar mix
                    </p>
                  </div>
                </div>

                {/* Visual Grid comparison of bags */}
                <div className="bg-stone-100 rounded-xl p-4 border border-stone-250/60 pb-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="flex-1 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-stone-605">
                        Mortar bags consumption ratio
                      </div>
                      <div className="text-[11px] text-stone-654 leading-normal font-medium">
                        Adhesive-based jointing cuts weight and raw material haulage on your site by up to <strong>-75%</strong>.
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-stone-200">
                      
                      {/* Compact adhesive representation */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-14 bg-[#059212] rounded-lg border border-emerald-700 shadow-sm flex flex-col items-center justify-center text-white relative">
                          <span className="text-[14px] font-black leading-none">🧳</span>
                          <span className="text-[8px] font-mono font-black uppercase mt-1">ECO</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-stone-600 mt-1">
                          {calculations.aacMortarBags} Thin-bed Bags
                        </span>
                      </div>

                      <span className="text-stone-453 font-display font-black text-xl">vs</span>

                      {/* Heavy sand stack representation */}
                      <div className="flex flex-col items-center">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 bg-stone-500 rounded-lg border border-stone-605 shadow-sm flex flex-col items-center justify-center text-white relative transform translate-y-1">
                            <span className="text-[10px]">🧳</span>
                          </div>
                          <div className="w-10 h-11 bg-stone-600 rounded-lg border border-stone-701 shadow-md flex flex-col items-center justify-center text-white relative z-10 transform -translate-y-1">
                            <span className="text-[11px] font-black">🧳</span>
                            <span className="text-[6px] font-mono font-black uppercase">HEAVY</span>
                          </div>
                          <div className="w-10 h-10 bg-stone-553 rounded-lg border border-stone-605 shadow-sm flex flex-col items-center justify-center text-white relative transform translate-y-1">
                            <span className="text-[10px]">🧳</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-stone-600 mt-1">
                          {calculations.traditionalMortarBags} Coarse Bags
                        </span>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Calculated Direct Cost Benefit projection */}
          <div className="bg-[#FFF5F5] p-5 rounded-2xl border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1 shadow-xs">
            <div>
              <h5 className="font-display font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Coins className="text-[#C42D2D] w-4.5 h-4.5" />
                Aggregated Cost Advantages
              </h5>
              <p className="text-[11px] text-stone-605 leading-relaxed mt-1 max-w-md">
                Refining overall construction with Swift Eco Blox saves on foundation concrete thickness, jointing chemicals, rebar weights, and masonry daily wages.
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] font-mono text-stone-500 font-bold block uppercase">
                Estimated Project Saving
              </span>
              <span className="font-display font-black text-[#C42D2D] text-2xl">
                ₹ {calculations.currencySaving.toLocaleString()}*
              </span>
              <span className="text-[9px] text-stone-453 block italic mt-0.5">
                *Local site values may vary
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
