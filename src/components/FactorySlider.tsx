import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  Clock, 
  Layers, 
  Settings, 
  CheckCircle2, 
  Compass, 
  TrendingUp 
} from 'lucide-react';

interface FactoryImage {
  id: string;
  url: string;
  type?: 'image' | 'video';
  title: string;
  subtitle: string;
  department: string;
  description: string;
  stats: {
    label: string;
    value: string;
    metric: string;
  }[];
}

const FACTORY_IMAGES: FactoryImage[] = [
  {
    id: 'material-prep',
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&h=675&q=80',
    title: 'Raw Material Pre-Processing & Cement Silos',
    subtitle: 'High precision multi-stage slurry preparation',
    department: 'PRE-TREATMENT DECK',
    description: 'Fly ash, lime, gypsum, and fine silica sand are blended in water-cooled micro-reactors. Fully computerized dosing guarantees an optimized weight-to-bulk matrix prior to chemical aeration.',
    stats: [
      { label: 'Raw Intake', value: '1,200', metric: 'tons/day' },
      { label: 'Slurry Consistency', value: '99.4', metric: '%' },
      { label: 'Chemical Precision', value: '\u00B10.05', metric: 'kg' }
    ]
  },
  {
    id: 'robotic-handling',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=675&q=80',
    title: 'Robotic Demolding & Block Handling',
    subtitle: 'Automated vacuum lift systems transferring green cakes',
    department: 'ROBOTIC REMOVAL UNIT',
    description: 'High-speed industrial vacuum gantry arms effortlessly unmold the freshly aerated green block cakes, aligning them perfectly on secondary steel cutting trolleys without inducing structural micro-cracks.',
    stats: [
      { label: 'Lifting Force', value: '4.8', metric: 'kN' },
      { label: 'Cycle Time', value: '48', metric: 'seconds' },
      { label: 'Fault Rate', value: '0.00', metric: '%' }
    ]
  },
  {
    id: 'cutting-station',
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&h=675&q=80',
    title: 'Computerized Wire Cutting Array',
    subtitle: 'Zero-tolerance horizontal and vertical block sculpting',
    department: 'SCULPTING DOCK',
    description: 'After initial bubble expansion and cake maturation, custom-designed pneumatic carriage cutters slice the aerated mass using high-tensile steel piano wires with a thickness accuracy of \u00B11.5mm.',
    stats: [
      { label: 'Cutter Velocity', value: '3.2', metric: 'm/sec' },
      { label: 'Cut Tolerance', value: '1.5', metric: 'mm' },
      { label: 'Reclaim Feedback', value: '100', metric: '% recycled' }
    ]
  },
  {
    id: 'autoclave-room',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=675&q=80',
    title: 'High-Pressure Direct Steam Autoclaves',
    subtitle: 'Hydrothermal synthesis for crystalline strength enhancement',
    department: 'DIHYDROGEN RETORT',
    description: 'The green blocks undergo 12 hours of high-temperature autoclaving at 190\u00B0C under 12 bars of saturated steam. This triggers a chemical reaction crystallizing our distinct Tobermorite cellular mesh.',
    stats: [
      { label: 'Steam Pressure', value: '12.0', metric: 'bar' },
      { label: 'Core Temp', value: '190', metric: '\u00B0C' },
      { label: 'Treatment Cycle', value: '12', metric: 'hours' }
    ]
  },
  {
    id: 'quality-control',
    url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&h=675&q=80',
    title: 'Ultrasonic Curing & Quality Control',
    subtitle: 'Nondestructive soundwave testing for internal density scan',
    department: 'DENSITY & SOUND LAB',
    description: 'Advanced ultrasonic transceivers measure the sound propagation speed across every block batch, immediately spotting hidden cavities and guaranteeing consistent density and thermal rating.',
    stats: [
      { label: 'Pulse Frequency', value: '54', metric: 'kHz' },
      { label: 'Material Density', value: '625', metric: 'kg/m³' },
      { label: 'Pass Ratio', value: '99.85', metric: '%' }
    ]
  },
  {
    id: 'delivery-yard',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&h=675&q=80',
    title: 'Finished Inventory & Structural Loading Dock',
    subtitle: 'Strict quality control, verification, and dispatch coordination',
    department: 'MAPPING & PACKING YARD',
    description: 'Once autoclaved, blocks are cooled down and immediately sent to automated structural check stations. Approved blocks are stacked, wood-palletized, shrink-wrapped, and tagged for dispatch coordination.',
    stats: [
      { label: 'Yard Storage Cap', value: '45,000', metric: 'm\u00B3' },
      { label: 'Inspection Rate', value: '100', metric: '% validated' },
      { label: 'Express Loading', value: '9.4', metric: 'min/truck' }
    ]
  }
];

export default function FactorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const duration = 6000; // 6 seconds per slide

  // Restart progression whenever index changes or autoplay is toggled
  useEffect(() => {
    setProgress(0);
    lastTimeRef.current = performance.now();

    if (isAutoplay) {
      const updateProgress = (time: number) => {
        const delta = time - lastTimeRef.current;
        lastTimeRef.current = time;

        setProgress(prev => {
          const next = prev + (delta / duration) * 100;
          if (next >= 100) {
            handleNext();
            return 0;
          }
          return next;
        });

        frameRef.current = requestAnimationFrame(updateProgress);
      };

      frameRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [currentIndex, isAutoplay]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % FACTORY_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + FACTORY_IMAGES.length) % FACTORY_IMAGES.length);
  };

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  };

  const currentActive = FACTORY_IMAGES[currentIndex];

  return (
    <div className="bg-white rounded-3xl border border-stone-300 shadow-xl overflow-hidden relative p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8">
      {/* Absolute decorative telemetry lines */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#059212] via-[#CE7A58] to-stone-400 opacity-60" />
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-150 pb-5">
        <div>
          <span className="text-[9px] font-mono text-[#059212] font-extrabold uppercase tracking-widest block mb-1">
            Active Industrial Telemetry
          </span>
          <h3 className="font-display font-black text-stone-900 text-xl md:text-2xl flex items-center gap-2">
            <Compass className="w-5.5 h-5.5 text-[#059212] shrink-0" />
            Vanguard AAC Fabrication Units
          </h3>
        </div>
        
        {/* Dynamic Telemetry controller */}
        <div className="flex items-center gap-3.5 self-start md:self-auto bg-[#F5F2EA] border border-stone-250 p-2.5 rounded-xl text-xs">
          <div className="flex items-center gap-2 font-mono font-bold text-stone-600">
            <Clock className="w-3.5 h-3.5 text-[#059212] animate-pulse" />
            <span>Cycle Delay: 6.0s</span>
          </div>
          <div className="h-4 w-[1px] bg-stone-300" />
          <button
            onClick={toggleAutoplay}
            className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider text-stone-800 hover:text-green-900 cursor-pointer transition-colors"
          >
            {isAutoplay ? (
              <>
                <Pause className="w-3 h-3 text-[#059212]" />
                <span>Live Feed</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-stone-500" />
                <span>Feed Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Left is descriptive, Right is the beautiful image monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* TEXT DETAILS MODULE (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6 justify-between h-full py-2">
          
          <div className="space-y-4">
            {/* Dept tag with fractional view indicator */}
            <div className="flex items-center justify-between">
              <span className="bg-green-50 text-green-900 border border-green-200/60 p-1.5 px-3 rounded-lg text-[9px] font-mono font-extrabold tracking-widest">
                UNIT MODULE: {currentActive.department}
              </span>
              <span className="font-mono text-xs font-black text-stone-400">
                <span className="text-stone-900">0{currentIndex + 1}</span> / 0{FACTORY_IMAGES.length}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h4 className="font-display font-black text-stone-900 text-lg md:text-xl leading-tight">
                {currentActive.title}
              </h4>
              <span className="text-xs text-[#CE7A58] font-bold block mt-1.5 italic font-sans leading-snug">
                {currentActive.subtitle}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-stone-605 leading-relaxed font-semibold">
              {currentActive.description}
            </p>
          </div>

          {/* Core Dept Specifications */}
          <div className="bg-[#F5F2EA] rounded-2xl border border-stone-300 p-4 flex flex-col gap-3 shadow-xs">
            <span className="text-[8px] font-mono text-stone-500 font-bold uppercase tracking-wider block border-b border-stone-250 pb-1.5">
              Automated Operations Spec Sheet
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {currentActive.stats.map((st, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[17px] font-display font-black text-stone-900 leading-none">
                    {st.value}
                  </span>
                  <span className="text-[8px] font-mono text-[#059212] font-bold uppercase tracking-wide mt-1 leading-none">
                    {st.label}
                  </span>
                  <span className="text-[8px] text-stone-400 block font-semibold leading-tight mt-0.5">
                    {st.metric}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation and Indicators control panel */}
          <div className="flex items-center justify-between gap-4 mt-2">
            {/* Small manual buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer shadow-xs active:scale-95"
                title="Previous Telemetry Feed"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-[#059212] border border-green-600 text-white hover:bg-[#048010] flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title="Next Telemetry Feed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Dot Selectors */}
            <div className="flex items-center gap-1.5">
              {FACTORY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectSlide(i)}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    i === currentIndex 
                      ? 'w-7 bg-[#059212]' 
                      : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  title={`Go to department ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* IMAGE DISPLAY DECK (7 columns) */}
        <div className="lg:col-span-7 relative h-[250px] sm:h-[350px] md:h-[420px] rounded-2xl overflow-hidden border border-stone-300 bg-stone-950 group shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentActive.id}
              initial={{ opacity: 0, scale: 1.012 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.988 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {currentActive.type === 'video' ? (
                <video
                  src={currentActive.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={currentActive.url}
                  alt={currentActive.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              )}
              {/* Subtle dark overlay for readability and premium tone */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Autoplay Active Progress line overlay */}
          <div className="absolute bottom-0 left-0 h-1 bg-[#059212]/90 transition-all pointer-events-none z-20" style={{ width: `${progress}%` }} />

          {/* Floating Department Coordinate telemetry pin */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-stone-300/80 p-2 rounded-xl flex items-center gap-2 text-[9px] font-mono text-stone-800 font-extrabold select-none shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#059212] animate-pulse" />
            <span>LIVE FED FEED UNIT • ST-{currentIndex + 1}</span>
          </div>

          {/* Visual camera overlay borders for factory aesthetic */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/50 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/50 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/50 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/50 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
