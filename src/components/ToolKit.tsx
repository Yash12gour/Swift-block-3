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
  const [selectedTool, setSelectedTool] = useState<string>("Plastic Bucket");

  const activeToolData = TOOL_KIT.find(t => t.name === selectedTool) || TOOL_KIT[0];

  const renderToolIllustration = (name: string) => {
    switch (name) {
      case "Plastic Bucket":
        return (
          <svg viewBox="0 0 400 400" className="w-full h-auto max-h-[160px] md:max-h-[200px]" fill="none" xmlns="http://www.w3.org/2000/svg" id="g-bucket-svg">
            <defs>
              <linearGradient id="metalHandle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db"/>
                <stop offset="30%" stopColor="#9ca3af"/>
                <stop offset="50%" stopColor="#f3f4f6"/>
                <stop offset="70%" stopColor="#6b7280"/>
                <stop offset="100%" stopColor="#4b5563"/>
              </linearGradient>
              <linearGradient id="bucketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e1f22"/>
                <stop offset="25%" stopColor="#2e3035"/>
                <stop offset="60%" stopColor="#1a1b1d"/>
                <stop offset="85%" stopColor="#0f1011"/>
                <stop offset="100%" stopColor="#080809"/>
              </linearGradient>
              <linearGradient id="innerRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a0a0b"/>
                <stop offset="50%" stopColor="#121315"/>
                <stop offset="100%" stopColor="#060607"/>
              </linearGradient>
            </defs>
            <ellipse cx="200" cy="360" rx="120" ry="16" fill="#1c1917" fillOpacity="0.12" />
            <ellipse cx="200" cy="360" rx="80" ry="10" fill="#000000" fillOpacity="0.18" />
            <path d="M 98 210 C 98 100, 302 100, 302 210" stroke="url(#metalHandle)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 160 110 Q 200 100 240 110" stroke="#18181b" strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M 175 110 Q 200 102 225 110" stroke="#27272a" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="180" cy="109" r="7" fill="#09090b" />
            <circle cx="200" cy="106" r="7" fill="#09090b" />
            <circle cx="220" cy="109" r="7" fill="#09090b" />
            <path d="M 88 195 L 98 190 L 102 225 L 88 230 Z" fill="#18181b" stroke="#09090b" strokeWidth="1" />
            <circle cx="95" cy="210" r="4.5" fill="black" />
            <path d="M 312 195 L 302 190 L 298 225 L 312 230 Z" fill="#18181b" stroke="#09090b" strokeWidth="1" />
            <circle cx="305" cy="210" r="4.5" fill="black" />
            <path d="M 92 205 L 122 345 C 124 353, 130 355, 138 355 L 262 355 C 270 355, 276 353, 278 345 L 308 205 Z" fill="url(#bucketBody)" />
            <path d="M 148 205 L 165 355 L 175 355 L 156 205 Z" fill="#000000" fillOpacity="0.15" />
            <path d="M 194 205 L 198 355 L 202 355 L 198 205 Z" fill="#ffffff" fillOpacity="0.04" />
            <path d="M 115 205 L 138 345" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="3" />
            <path d="M 285 205 L 262 345" stroke="#000000" strokeOpacity="0.3" strokeWidth="5" />
            <ellipse cx="200" cy="205" rx="108" ry="15" fill="#1f2023" stroke="#121314" strokeWidth="2" />
            <ellipse cx="200" cy="205" rx="102" ry="12" fill="url(#innerRim)" />
            <g transform="translate(195, 235) rotate(1.5)">
              <text x="45" y="18" fill="#eab308" fontFamily="monospace, sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.05em" textAnchor="middle" fillOpacity="0.85">12L / 3 GAL</text>
              <text x="45" y="36" fill="#eab308" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.08em" textAnchor="middle" fillOpacity="0.9">HEAVY DUTY</text>
              <text x="45" y="50" fill="#eab308" fontFamily="sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.22em" textAnchor="middle" fillOpacity="0.85">MAX</text>
            </g>
            <text x="240" y="344" fill="#4b5563" fontFamily="monospace" fontWeight="bold" fontSize="5.5" letterSpacing="0.02em" textAnchor="middle" opacity="0.75">DATE CE0E-C00E</text>
          </svg>
        );

      case "Joint Finishing Blade":
        return (
          <svg viewBox="0 0 450 300" className="w-full h-auto max-h-[140px] md:max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="shadowBlur-trowel" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <linearGradient id="bladeLeftFin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="20%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="75%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="bladeRightFin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="30%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#cbd5e1" />
                <stop offset="85%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="vgrooveLeft" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="40%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="vgrooveRight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="35%" stopColor="#ffffff" />
                <stop offset="75%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="chromeNeck" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="25%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="75%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="woodHandleGradFin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8c5a3c" />
                <stop offset="15%" stopColor="#a57c5d" />
                <stop offset="40%" stopColor="#5c3821" />
                <stop offset="70%" stopColor="#3a2010" />
                <stop offset="95%" stopColor="#1d0e06" />
                <stop offset="100%" stopColor="#0f0703" />
              </linearGradient>
              <linearGradient id="ferruleMetal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="30%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            {/* Ambient drop shadow simulating the subtle camera render shadow */}
            <g filter="url(#shadowBlur-trowel)" opacity="0.16">
              {/* Blade shadow */}
              <path d="M 65 220 L 150 250 L 255 220 L 375 130 L 295 130 L 195 160 Z" fill="#000000" />
              {/* Handle shadow */}
              <path d="M 240 120 Q 300 110, 370 85 Q 380 95, 330 130 Z" fill="#000000" />
            </g>

            {/* TROWEL BLADE */}
            {/* Front thickness edge under the blade to give a sense of solid metal sheet depth */}
            <path d="M 70 215 L 148 245 L 157 236 L 165 245 L 246 215 L 246 217.5 L 165 247.5 L 157 238.5 L 148 247.5 L 70 217.5 Z" fill="#334155" />

            {/* Left wing flat sheet of blade */}
            <path d="M 70 215 L 148 245 L 273 155 L 195 125 Z" fill="url(#bladeLeftFin)" stroke="#cbd5e1" strokeWidth="0.5" />
            
            {/* Inverted V-groove left slope */}
            <path d="M 148 245 L 157 236 L 282 146 L 273 155 Z" fill="url(#vgrooveLeft)" />

            {/* Inverted V-groove right slope */}
            <path d="M 157 236 L 165 245 L 290 155 L 282 146 Z" fill="url(#vgrooveRight)" />
            
            {/* Right wing flat sheet of blade */}
            <path d="M 165 245 L 246 215 L 371 125 L 290 155 Z" fill="url(#bladeRightFin)" stroke="#cbd5e1" strokeWidth="0.5" />

            {/* Specular crest line highlight on the fold edge of V-groove */}
            <line x1="157" y1="236" x2="282" y2="146" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />

            {/* STRAP/MOUNT BASE */}
            {/* The mounting bracket supporting the stem, welded directly along the V-notch crest */}
            <path d="M 205 201 Q 206 195 212 195 L 235 178 Q 241 174 241 180 Z" fill="url(#chromeNeck)" opacity="0.95" />
            <path d="M 212 195 C 218 190, 222 186, 235 178" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.4" />

            {/* NECK / STEM */}
            {/* Round chrome bar raising from the mount base and bending back elegantly into the handle */}
            <path d="M 218 191 C 216 160, 215 120, 252 110" stroke="url(#chromeNeck)" strokeWidth="10.5" strokeLinecap="round" fill="none" />
            {/* Specular highlight running along the curve of the metallic neck */}
            <path d="M 218.5 186 C 217.5 161, 217 122, 251.5 111.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />

            {/* ROTATED HANDLE ASSEMBLY GROUP */}
            <g transform="translate(250, 110) rotate(-22)">
              {/* FERRULE (Polished chrome collar piece) */}
              <rect x="0" y="-11.5" width="13" height="23" fill="url(#ferruleMetal)" stroke="#94a3b8" strokeWidth="0.5" />
              {/* Cylindrical highlight reflection */}
              <rect x="0" y="-8" width="13" height="3" fill="#ffffff" fillOpacity="0.35" />
              <rect x="0" y="5" width="13" height="3" fill="#000000" fillOpacity="0.15" />

              {/* WOOD HANDLE (Gorgeous walnut wood grain spindle layout) */}
              <path d="M 13 -11.5 Q 65 -18 120 -11.5 C 127 -11.5 127 11.5 120 11.5 Q 65 18 13 11.5 Z" fill="url(#woodHandleGradFin)" />
              
              {/* Realistic wood grains overlay */}
              <g opacity="0.3" stroke="#1c0a00" strokeLinecap="round" fill="none">
                <path d="M 18 -7 Q 65 -13, 114 -8.5" strokeWidth="1" />
                <path d="M 15 -3 Q 65 -5, 118 -3" strokeWidth="1.2" />
                <path d="M 22 2 Q 65 3, 116 1.5" strokeWidth="0.8" />
                <path d="M 20 6 Q 65 11, 112 7" strokeWidth="1.1" />
              </g>

              {/* Sophisticated organic walnut burl spots / grain swirls for high-end feel */}
              <path d="M 52 -3 Q 57 -6 63 -3 Q 60 1 52 -3" stroke="#1c0a00" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.45" />
              <path d="M 85 4 Q 90 7 94 3 Q 91 1 85 4" stroke="#1c0a00" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />

              {/* Light reflection gloss glaze overlay */}
              <path d="M 13 -11.5 Q 65 -18 120 -11.5" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.22" strokeLinecap="round" />
              
              {/* Deep lower shadow glaze overlay */}
              <path d="M 13 4 Q 65 18 120 11.5" stroke="#000000" strokeWidth="4.5" fill="none" opacity="0.4" strokeLinecap="round" />
            </g>
          </svg>
        );

      case "Angle Grinder":
        return (
          <svg viewBox="0 0 500 320" className="w-full h-auto max-h-[140px] md:max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="grinderShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              
              {/* Metallic Silver/Chrome gradients */}
              <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#e2e8f0" />
                <stop offset="60%" stopColor="#64748b" />
                <stop offset="90%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="castMetalHead" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="25%" stopColor="#f1f5f9" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="75%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              {/* Matte Black Polycarbonate Gradients */}
              <linearGradient id="matteBlackPlastic" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="15%" stopColor="#1e293b" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="95%" stopColor="#020617" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              
              <linearGradient id="matteBlackBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="20%" stopColor="#1e293b" />
                <stop offset="70%" stopColor="#0f172a" />
                <stop offset="95%" stopColor="#020617" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>

              {/* Flexible rubber black cords */}
              <linearGradient id="cordGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* Fiber reinforced grinding disc body texture */}
              <radialGradient id="discGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#52525b" />
                <stop offset="50%" stopColor="#27272a" />
                <stop offset="85%" stopColor="#18181b" />
                <stop offset="95%" stopColor="#09090b" />
                <stop offset="100%" stopColor="#1c1917" />
              </radialGradient>
            </defs>

            {/* Ambient drop shadow simulating the photography studio setup */}
            <g filter="url(#grinderShadow)" opacity="0.18">
              <ellipse cx="125" cy="225" rx="72" ry="12" fill="#000000" />
              <path d="M 120 220 L 175 195 L 340 152 L 350 162 L 180 230 Z" fill="#000000" />
              <path d="M 175 193 L 260 216 L 270 234 L 185 208 Z" fill="#000000" />
              <path d="M 360 155 Q 390 145 420 165 T 350 210 Q 320 235 370 250 T 435 220" stroke="#000000" strokeWidth="12" fill="none" strokeLinecap="round" />
            </g>

            {/* MAIN GRINDING WHEEL (FIBER DISC IN PERSPECTIVE) */}
            <g transform="translate(120, 218) rotate(18) scale(1.0, 0.35)">
              <circle cx="0" cy="0" r="70" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="68" fill="url(#discGrad)" />
              {/* Fiber texturing accents */}
              <circle cx="0" cy="0" r="56" stroke="#3f3f46" strokeWidth="0.5" strokeDasharray="3 4" fill="none" opacity="0.3" />
              <circle cx="0" cy="0" r="44" stroke="#52525b" strokeWidth="1" strokeDasharray="6 2" fill="none" opacity="0.4" />
              <circle cx="0" cy="0" r="30" stroke="#71717a" strokeWidth="0.5" fill="none" opacity="0.2" />
              {/* Decorative Warning Ring */}
              <circle cx="0" cy="0" r="36" fill="none" stroke="#ef4444" strokeWidth="1.2" opacity="0.4" />
              {/* Chrome structural center washer core */}
              <circle cx="0" cy="0" r="20" fill="url(#chromeMetal)" stroke="#475569" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="12" fill="#334155" />
              <circle cx="0" cy="0" r="7" fill="#000000" />
            </g>

            {/* CHROME SAFETY HOOD GUARD */}
            <path d="M 64 195 C 57 185, 76 153, 116 140 C 146 130, 176 142, 185 156 L 181 186 C 176 172, 151 160, 121 166 C 93 171, 77 184, 79 194 Z" fill="url(#chromeMetal)" stroke="#475569" strokeWidth="0.5" />
            <path d="M 64 195 C 57 185, 76 153, 116 140 C 146 130, 176 142, 185 156" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.8" />
            {/* Guard clamping collar mechanism */}
            <path d="M 124 153 Q 134 147 147 151" stroke="#334155" strokeWidth="4.2" fill="none" strokeLinecap="round" />
            <circle cx="147" cy="151" r="2.2" fill="#f1f5f9" stroke="#334155" strokeWidth="0.5" />

            {/* CAST ALUMINUM GEAR CASE END COVER (HEAD) */}
            <path d="M 100 163 C 94 153, 97 138, 107 128 Q 114 108, 136 108 Q 157 108, 166 123 Q 187 130, 187 146 L 182 176 L 157 183 L 127 180 Z" fill="url(#castMetalHead)" stroke="#475569" strokeWidth="0.5" />
            
            {/* Spindle lock button casing and pin */}
            <path d="M 143 114 C 142 111, 154 111, 153 114 L 151 119 C 150 121, 145 121, 144 119 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
            <polygon points="121,118 133,118 133,121 121,121" fill="#334155" />
            <polygon points="121,124 133,124 133,127 121,127" fill="#334155" />

            {/* Structural cast ribbing and screw locks */}
            <circle cx="108" cy="134" r="2" fill="url(#chromeMetal)" stroke="#334155" strokeWidth="0.5" />
            <line x1="107" y1="134" x2="109" y2="134" stroke="#1e293b" strokeWidth="0.8" />
            <circle cx="170" cy="130" r="2" fill="url(#chromeMetal)" stroke="#334155" strokeWidth="0.5" />
            <line x1="169" y1="130" x2="171" y2="130" stroke="#1e293b" strokeWidth="0.8" />
            <circle cx="168" cy="162" r="2" fill="url(#chromeMetal)" stroke="#334155" strokeWidth="0.5" />
            <line x1="167" y1="162" x2="169" y2="162" stroke="#1e293b" strokeWidth="0.8" />

            {/* AUXILIARY MOUNTING HANDLE */}
            {/* Mounting connector socket */}
            <path d="M 172 147 L 178 149" stroke="url(#chromeMetal)" strokeWidth="3" />
            {/* Textured Finger-flange safeguard */}
            <path d="M 183 133 C 178 137, 185 174, 193 171 C 198 167, 190 130, 183 133 Z" fill="url(#matteBlackPlastic)" stroke="#09090b" strokeWidth="0.5" />
            {/* Ribbed safety grip cylinder */}
            <path d="M 184 144 L 253 170 C 258 172, 258 178, 253 181 L 189 157 Z" fill="url(#matteBlackPlastic)" />
            {/* Grip ridges overlaying the texture */}
            <ellipse cx="204" cy="154" rx="2" ry="7" fill="#111827" transform="rotate(22 204 154)" />
            <ellipse cx="216" cy="159" rx="2" ry="7" fill="#111827" transform="rotate(22 216 159)" />
            <ellipse cx="228" cy="164" rx="2" ry="7" fill="#111827" transform="rotate(22 228 164)" />
            <ellipse cx="240" cy="169" rx="2" ry="7" fill="#111827" transform="rotate(22 240 169)" />
            {/* Expanded handle flare cap */}
            <path d="M 252 170 C 255 171, 258 175, 256 179 C 254 182, 250 181, 248 177 Z" fill="#0f172a" />

            {/* BRIGHT STEEL INTERFACE RING CLAMP */}
            <path d="M 178 168 L 186 165 L 196 133 L 188 136 Z" fill="url(#chromeMetal)" stroke="#334155" strokeWidth="0.5" />

            {/* MAIN MOTOR HOUSING COVERS */}
            {/* Forward housing section */}
            <path d="M 185 166 L 235 150 C 238 149, 240 144, 238 138 L 195 133 Q 188 152 185 166 Z" fill="url(#matteBlackPlastic)" />
            
            {/* Red Slide Switch Lock (Slider Switch is mounted on left lateral face) */}
            <rect x="208" y="142" width="14" height="6" rx="1.5" transform="rotate(-18 208 142)" fill="#ef4444" />
            <rect x="212" y="143" width="5" height="4" rx="1" transform="rotate(-18 212 143)" fill="#ffffff" opacity="0.8" />

            {/* Rear main motor handle barrel */}
            <path d="M 235 150 L 338 119 C 345 117, 351 122, 353 130 L 361 154 C 363 162, 357 167, 350 169 L 241 180 Z" fill="url(#matteBlackBody)" />
            {/* Joint cover line panel */}
            <path d="M 241 180 L 235 150" stroke="#020617" strokeWidth="1.2" />

            {/* Exhaust Vent Ducts (Slanted layout) */}
            <rect x="312" y="128" width="16" height="3" rx="1" transform="rotate(-17 312 128)" fill="#020617" />
            <rect x="310" y="133" width="16" height="3" rx="1" transform="rotate(-17 310 133)" fill="#020617" />
            <rect x="308" y="138" width="16" height="3" rx="1" transform="rotate(-17 308 138)" fill="#020617" />
            <rect x="306" y="143" width="16" height="3" rx="1" transform="rotate(-17 306 143)" fill="#020617" />

            {/* ADAPTER TAIL RUBBER COLLAR */}
            <path d="M 353 130 C 356 127, 358 127, 362 131 L 372 135 C 375 137, 375 141, 371 143 L 361 154 Z" fill="#020617" />
            <path d="M 368 136 L 388 139 C 391 140, 391 143, 388 145 L 371 143 Z" fill="#1e293b" />

            {/* REALISTIC FLEXIBLE BLACK SUPPLY COIL CORDS */}
            <path d="M 386 142 C 438 130, 452 146, 430 168 C 390 196, 310 174, 308 206 C 306 235, 345 244, 400 230 C 445 218, 461 200, 465 198" stroke="url(#cordGrad)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            {/* Specular cable shine streak overlay */}
            <path d="M 386 142 C 438 130, 452 146, 430 168 C 390 196, 310 174, 308 206" stroke="#ffffff" strokeWidth="1" opacity="0.2" fill="none" />

            {/* EUROPLUG 2-PIN CONNECTOR */}
            <g transform="translate(460, 190) rotate(16)">
              {/* Plug body cylinder */}
              <rect x="0" y="-8" width="18" height="16" rx="3" fill="#09090b" stroke="#1f2937" strokeWidth="0.5" />
              <rect x="18" y="-6" width="6" height="12" rx="1" fill="#1e293b" />
              {/* Ground pins */}
              <line x1="24" y1="-3" x2="33" y2="-3" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="24" y1="3" x2="33" y2="3" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          </svg>
        );

      case "Block Cleaning Brush":
        return (
          <svg viewBox="0 0 500 320" className="w-full h-auto max-h-[140px] md:max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="brushShadowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              
              {/* Wood Gradients */}
              <linearGradient id="woodTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3dfca" />
                <stop offset="40%" stopColor="#e9ceb3" />
                <stop offset="80%" stopColor="#d4b290" />
                <stop offset="100%" stopColor="#bf9d7a" />
              </linearGradient>
              
              <linearGradient id="woodFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#caa47e" />
                <stop offset="30%" stopColor="#b18c64" />
                <stop offset="70%" stopColor="#96714a" />
                <stop offset="100%" stopColor="#75522e" />
              </linearGradient>

              {/* Steel Wire/Brush Gradients */}
              <linearGradient id="wireBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="40%" stopColor="#334155" />
                <stop offset="85%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient id="steelNozzleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="20%" stopColor="#f1f5f9" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="80%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient id="nozzleInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Ambient drop shadow simulating photo studio floor occlusion */}
            <g filter="url(#brushShadowFilter)" opacity="0.18">
              {/* Soft blur shadow under bristles */}
              <path d="M 60 190 Q 70 200, 100 215 T 180 240 T 260 265 T 350 275 L 360 265 L 120 185 Z" fill="#000000" />
              {/* Additional shadow concentration directly beneath dense wires */}
              <ellipse cx="200" cy="240" rx="140" ry="25" fill="#000000" />
            </g>

            {/* REAR METAL HANDLE SOCKET SLEEVE */}
            {/* The mounting tube angled backwards/upwards */}
            <g transform="translate(274, 52)">
              {/* Socket cylinder sleeve */}
              <path d="M 0 35 L 14 13 C 16 10, 24 15, 22 18 L 10 40 Z" fill="url(#steelNozzleGrad)" stroke="#475569" strokeWidth="0.5" />
              {/* Inner dark bore */}
              <ellipse cx="18" cy="15" rx="5" ry="2.5" fill="#1e293b" transform="rotate(-30 18 15)" />
              {/* Side index key lock slot */}
              <path d="M 6 22 L 9 17 L 13 20 L 10 25 Z" fill="#334155" opacity="0.8" />
            </g>

            {/* CORE WIRE BRISTLES BACKGROUND DENSITY */}
            {/* Opaque dark shape blocking out background to provide rich depth and density */}
            <path d="M 115 110 
                     C 200 110, 215 103, 230 103 
                     L 280 103 
                     C 295 103, 310 117, 380 145
                     L 380 152
                     L 352 263
                     C 270 245, 190 220, 72 178
                     Z" fill="url(#wireBaseGrad)" />

            {/* DETAILED STEEL WIRE BRISTLES - MASS CONCENTRATE ROWS */}
            {/* Back row of wire bundles (Darker shadows) */}
            <g stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" opacity="0.65">
              {/* Drawn procedurally as fan-out groups */}
              <line x1="120" y1="110" x2="75" y2="172" />
              <line x1="130" y1="110" x2="88" y2="175" />
              <line x1="140" y1="110" x2="102" y2="178" />
              <line x1="150" y1="112" x2="115" y2="182" />
              <line x1="160" y1="114" x2="128" y2="185" />
              
              <line x1="170" y1="115" x2="142" y2="190" />
              <line x1="185" y1="116" x2="160" y2="195" />
              <line x1="200" y1="117" x2="178" y2="199" />
              <line x1="215" y1="118" x2="195" y2="204" />
              <line x1="230" y1="110" x2="212" y2="208" />

              <line x1="245" y1="108" x2="230" y2="212" />
              <line x1="260" y1="108" x2="248" y2="216" />
              <line x1="275" y1="108" x2="265" y2="220" />
              <line x1="290" y1="110" x2="280" y2="224" />
              <line x1="305" y1="115" x2="295" y2="228" />

              <line x1="320" y1="120" x2="310" y2="234" />
              <line x1="335" y1="125" x2="324" y2="239" />
              <line x1="350" y1="130" x2="336" y2="245" />
              <line x1="365" y1="135" x2="348" y2="251" />
              <line x1="378" y1="142" x2="352" y2="258" />
            </g>

            {/* Middle row of wire bundles (Medium tone, highly detailed) */}
            <g stroke="#475569" strokeWidth="1.1" strokeLinecap="round">
              <line x1="122" y1="112" x2="73" y2="175" />
              <line x1="126" y1="112" x2="80" y2="176" />
              <line x1="134" y1="113" x2="93" y2="178" />
              <line x1="138" y1="113" x2="98" y2="179" />
              <line x1="146" y1="114" x2="108" y2="182" />
              
              <line x1="154" y1="115" x2="120" y2="185" />
              <line x1="162" y1="116" x2="130" y2="188" />
              <line x1="172" y1="117" x2="144" y2="192" />
              <line x1="182" y1="118" x2="155" y2="196" />
              <line x1="192" y1="119" x2="168" y2="199" />

              <line x1="202" y1="120" x2="180" y2="202" />
              <line x1="212" y1="120" x2="192" y2="205" />
              <line x1="222" y1="118" x2="204" y2="208" />
              <line x1="232" y1="114" x2="216" y2="211" />
              <line x1="242" y1="112" x2="228" y2="214" />

              <line x1="252" y1="112" x2="240" y2="217" />
              <line x1="262" y1="112" x2="252" y2="220" />
              <line x1="272" y1="113" x2="264" y2="223" />
              <line x1="282" y1="115" x2="276" y2="226" />
              <line x1="292" y1="118" x2="288" y2="230" />

              <line x1="302" y1="121" x2="298" y2="234" />
              <line x1="312" y1="124" x2="308" y2="238" />
              <line x1="322" y1="127" x2="318" y2="242" />
              <line x1="332" y1="130" x2="326" y2="246" />
              <line x1="342" y1="133" x2="334" y2="250" />
              <line x1="352" y1="136" x2="342" y2="254" />
              <line x1="362" y1="139" x2="348" y2="257" />
              <line x1="372" y1="143" x2="351" y2="261" />
            </g>

            {/* Foreground row of wire bundles (Brightest steel highlights + wire tip specular glints) */}
            <g stroke="#94a3b8" strokeWidth="0.95" strokeLinecap="round">
              <line x1="118" y1="114" x2="71" y2="173" />
              <line x1="128" y1="115" x2="84" y2="176" />
              <line x1="136" y1="116" x2="97" y2="181" />
              <line x1="144" y1="117" x2="108" y2="185" />
              <line x1="152" y1="118" x2="119" y2="188" />

              <line x1="164" y1="119" x2="134" y2="192" />
              <line x1="176" y1="120" x2="151" y2="196" />
              <line x1="188" y1="121" x2="166" y2="201" />
              <line x1="200" y1="122" x2="180" y2="205" />
              <line x1="212" y1="122" x2="194" y2="208" />

              <line x1="224" y1="121" x2="208" y2="212" />
              <line x1="236" y1="117" x2="222" y2="215" />
              <line x1="248" y1="114" x2="236" y2="218" />
              <line x1="260" y1="114" x2="250" y2="221" />
              <line x1="272" y1="115" x2="264" y2="224" />

              <line x1="284" y1="118" x2="278" y2="228" />
              <line x1="296" y1="121" x2="292" y2="232" />
              <line x1="308" y1="125" x2="304" y2="237" />
              <line x1="320" y1="129" x2="316" y2="242" />
              <line x1="332" y1="133" x2="326" y2="247" />

              <line x1="344" y1="137" x2="336" y2="252" />
              <line x1="356" y1="141" x2="344" y2="257" />
              <line x1="368" y1="145" x2="350" y2="262" />
            </g>

            {/* Specular tip glints (Small circles/dots at wire tips to give authentic steel fiber twinkle) */}
            <g fill="#f1f5f9" opacity="0.8">
              <circle cx="71" cy="173" r="0.6" />
              <circle cx="84" cy="176" r="0.6" />
              <circle cx="97" cy="181" r="0.6" />
              <circle cx="108" cy="185" r="0.6" />
              <circle cx="119" cy="188" r="0.6" />
              <circle cx="134" cy="192" r="0.6" />
              <circle cx="151" cy="196" r="0.6" />
              <circle cx="166" cy="201" r="0.6" />
              <circle cx="180" cy="205" r="0.6" />
              <circle cx="194" cy="208" r="0.6" />
              <circle cx="208" cy="212" r="0.6" />
              <circle cx="222" cy="215" r="0.6" />
              <circle cx="236" cy="218" r="0.6" />
              <circle cx="250" cy="221" r="0.6" />
              <circle cx="264" cy="224" r="0.6" />
              <circle cx="278" cy="228" r="0.6" />
              <circle cx="292" cy="232" r="0.6" />
              <circle cx="304" cy="237" r="0.6" />
              <circle cx="316" cy="242" r="0.6" />
              <circle cx="326" cy="247" r="0.6" />
              <circle cx="336" cy="252" r="0.6" />
              <circle cx="344" cy="257" r="0.6" />
              <circle cx="350" cy="262" r="0.6" />
            </g>

            {/* CROOKED / STRAY WIRES FOR EXTRAORDINARY BESPOKE PHYSICAL REALISM */}
            <g stroke="#ffffff" strokeWidth="0.8" opacity="0.4">
              <line x1="120" y1="113" x2="63" y2="171" />
              <line x1="202" y1="122" x2="168" y2="209" />
              <path d="M 368 145 C 361 170, 365 210, 353 266" fill="none" />
            </g>

            {/* WOOD BLOCK BASE - SHADED SIDE FACE (FRONT PORTION) */}
            <path d="M 115 110 
                     C 200 110, 215 103, 230 103 
                     L 280 103 
                     C 295 103, 310 117, 380 145
                     L 380 165
                     C 310 137, 295 123, 280 123
                     L 230 123
                     C 215 123, 200 130, 115 130
                     Z" fill="url(#woodFrontGrad)" stroke="#75522e" strokeWidth="0.3" />

            {/* WOOD BLOCK BASE - TOP GLOSS FACE */}
            <path d="M 115 110 
                     C 200 110, 215 103, 230 103 
                     L 280 103 
                     C 295 103, 310 117, 380 145
                     C 388 135, 388 125, 380 118
                     C 310 90, 295 76, 280 76
                     L 230 76
                     C 215 76, 200 83, 115 83
                     C 107 90, 107 103, 115 110
                     Z" fill="url(#woodTopGrad)" stroke="#b18c64" strokeWidth="0.5" />

            {/* NATURAL WOOD GRAINS AND ORGANIC TEXTURING DETAILS */}
            <g opacity="0.22" stroke="#5a3a1e" strokeLinecap="round" fill="none">
              <path d="M 118 86 C 180 86, 210 80, 230 80 L 280 80 C 300 80, 320 90, 376 121" strokeWidth="0.8" />
              <path d="M 125 93 C 185 94, 205 84, 232 84 L 278 84 C 305 84, 315 97, 372 129" strokeWidth="1.2" />
              <path d="M 130 101 C 190 102, 200 90, 235 90 L 275 90 C 310 90, 320 105, 365 136" strokeWidth="0.5" />
              
              <path d="M 150 90 C 158 90, 162 94, 155 98 C 148 100, 142 95, 147 91" strokeWidth="0.6" />
              <path d="M 144 89 C 160 89, 168 96, 158 102" strokeWidth="0.8" />

              <path d="M 118 114 C 180 114, 205 107, 230 107 L 280 107 C 300 107, 310 120, 376 149" strokeWidth="0.7" />
              <path d="M 124 122 C 185 122, 200 115, 232 115 L 278 115 C 310 115, 315 121, 370 156" strokeWidth="1.0" />
            </g>

            {/* HAIR-LINE FIBER GAP/CRACK (Fissure for organic high-end look) */}
            <path d="M 364 126 C 366 132, 363 140, 367 149 M 365 134 Q 369 135 371 138" stroke="#3a1d05" strokeWidth="0.9" fill="none" opacity="0.7" strokeLinecap="round" />

            {/* METALLIC BRASS/SILVER THREADED SLEEVE INSERT (CENTER PIECE) */}
            <g transform="translate(254, 82)">
              <ellipse cx="0" cy="0" rx="15" ry="7.5" fill="url(#steelNozzleGrad)" stroke="#475569" strokeWidth="0.5" />
              
              <ellipse cx="0" cy="-2" rx="14" ry="7" fill="none" stroke="#f1f5f9" strokeWidth="1.2" opacity="0.8" />
              <ellipse cx="0" cy="-2" rx="14.5" ry="7.25" fill="url(#steelNozzleGrad)" stroke="#475569" strokeWidth="0.3" />

              <ellipse cx="0" cy="-4.5" rx="13.5" ry="6.5" fill="url(#steelNozzleGrad)" stroke="#334155" strokeWidth="0.3" />
              <ellipse cx="0" cy="-4.5" rx="13" ry="6.25" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />

              <ellipse cx="0" cy="-4.5" rx="11" ry="5.25" fill="url(#nozzleInnerGrad)" />
              
              <ellipse cx="0" cy="-3.5" rx="9" ry="4" fill="none" stroke="#475569" strokeWidth="1.0" clipPath="ellipse(0, -3.5, 9, 3)" />
              <ellipse cx="0" cy="-2.5" rx="7.2" ry="3" fill="none" stroke="#52525b" strokeWidth="0.8" />
              <ellipse cx="0" cy="-1.5" rx="5" ry="2" fill="none" stroke="#18181b" strokeWidth="0.6" />
            </g>
          </svg>
        );

      case "Rubber Mallet":
        return (
          <svg viewBox="0 0 500 320" className="w-full h-auto max-h-[140px] md:max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="malletShadowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              
              {/* Rubber Material Gradients */}
              <linearGradient id="rubberBodyGrad" x1="0%" y1="0%" x2="40%" y2="100%">
                <stop offset="0%" stopColor="#4b5563" />
                <stop offset="12%" stopColor="#2e3540" />
                <stop offset="42%" stopColor="#1e222b" />
                <stop offset="78%" stopColor="#0f1115" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>

              <radialGradient id="strikingFaceGrad" cx="32%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#3d4452" />
                <stop offset="40%" stopColor="#1e222b" />
                <stop offset="85%" stopColor="#0f1115" />
                <stop offset="100%" stopColor="#030405" />
              </radialGradient>

              <linearGradient id="farFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e222b" />
                <stop offset="100%" stopColor="#050506" />
              </linearGradient>

              {/* Wooden Handle Gradients */}
              <linearGradient id="woodHandleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbf3e3" />
                <stop offset="15%" stopColor="#f7ebd5" />
                <stop offset="50%" stopColor="#e3c59e" />
                <stop offset="85%" stopColor="#bd966b" />
                <stop offset="100%" stopColor="#805b38" />
              </linearGradient>

              <clipPath id="handleClip">
                <path d="M 148 171 C 200 162, 260 148, 430 110 C 440 108, 448 118, 442 128 C 436 138, 420 138, 410 137 C 260 156, 200 168, 155 183 Z" />
              </clipPath>
            </defs>

            {/* AMBIENT SOFT STUDIO LIGHT SHADOW */}
            <g filter="url(#malletShadowFilter)" opacity="0.18">
              {/* Heavy rubber head occlusion shadow */}
              <ellipse cx="135" cy="216" rx="66" ry="18" fill="#000000" />
              {/* Soft shadow stretching along the handle */}
              <path d="M 130 216 L 440 142 L 440 156 L 140 230 Z" fill="#000000" />
            </g>

            {/* WOODEN ERGONOMIC CHISELED HANDLE */}
            <g clipPath="url(#handleClip)">
              {/* Core Handle base gradient */}
              <rect x="130" y="90" width="330" height="110" fill="url(#woodHandleGrad)" />
              
              {/* Simulated 3D volumetric cylinder top-highlight */}
              <path d="M 148 171 C 200 162, 260 148, 430 110" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.35" />
              
              {/* High-end realistic wood grain lines overlay */}
              <path d="M 140 176 Q 250 160, 440 120" stroke="#8d643d" strokeWidth="1.2" opacity="0.32" fill="none" />
              <path d="M 142 173 C 240 158, 300 142, 440 115" stroke="#78532f" strokeWidth="0.8" opacity="0.25" fill="none" />
              <path d="M 148 179 C 220 164, 320 148, 440 125" stroke="#a17c58" strokeWidth="1.5" opacity="0.2" fill="none" />
              <path d="M 144 171 C 260 152, 330 132, 440 110" stroke="#78532f" strokeWidth="0.6" opacity="0.3" fill="none" />
              <path d="M 152 181 C 200 171, 350 155, 440 132" stroke="#5c3e21" strokeWidth="0.9" opacity="0.18" fill="none" />
              
              {/* Deep wood bottom core shadow edge */}
              <path d="M 155 183 C 200 168, 260 156, 410 137 C 420 138, 436 138, 442 128" stroke="#5a3a1e" strokeWidth="4.5" fill="none" opacity="0.45" />
            </g>

            {/* RUBBER MALLET CYLINDER HEAD */}
            {/* The main solid solid rubber connector block */}
            <polygon points="54,82 112,154 172,230 106,148" fill="url(#rubberBodyGrad)" />

            {/* Rear elliptical face to close cylinder back */}
            <ellipse cx="80" cy="115" rx="20" ry="42" transform="rotate(-38 80 115)" fill="url(#farFaceGrad)" stroke="#111827" strokeWidth="0.5" />

            {/* Central molded ridge line seam split split (gives premium manufactured finish) */}
            <ellipse cx="111" cy="153" rx="22" ry="45" transform="rotate(-38 111 153)" stroke="#111827" strokeWidth="1.4" fill="none" opacity="0.65" />
            <ellipse cx="112" cy="154" rx="22" ry="45" transform="rotate(-38 112 154)" stroke="#4b5563" strokeWidth="0.8" fill="none" opacity="0.3" />

            {/* Striking front flat face nearest nearest to camera */}
            <ellipse cx="142" cy="192" rx="24" ry="48" transform="rotate(-38 142 192)" fill="url(#strikingFaceGrad)" />
            {/* Beveled edge highlights around the striker surface bounds */}
            <ellipse cx="142" cy="192" rx="24" ry="48" transform="rotate(-38 142 192)" stroke="#5d6778" strokeWidth="1.1" fill="none" opacity="0.45" />
            <ellipse cx="141" cy="191" rx="23" ry="46.5" transform="rotate(-38 141 191)" stroke="#111827" strokeWidth="1.5" fill="none" opacity="0.75" />

            {/* Dark contact joint recess where handle penetrates head block */}
            <path d="M 148 171 Q 152 177, 155 183 L 150 180 Q 147 175, 148 171" fill="#000000" opacity="0.25" />
          </svg>
        );

      case "Notched Trowel":
        return (
          <svg viewBox="0 0 500 320" className="w-full h-auto max-h-[140px] md:max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Soft ambient shadow filter */}
              <filter id="trowelShadowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" />
              </filter>

              {/* Polished stainless steel gradient for blade */}
              <linearGradient id="metalBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="75%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              {/* Chrome reflecting gradient for shank */}
              <linearGradient id="chromeStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="35%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              {/* Matte black rubber gradient */}
              <linearGradient id="handleBlackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="20%" stopColor="#1e293b" />
                <stop offset="70%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* Tactile yellow rubber insert gradient */}
              <linearGradient id="handleYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="20%" stopColor="#facc15" />
                <stop offset="70%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>
            </defs>

            {/* AMBIENT SHADOW */}
            <g filter="url(#trowelShadowFilter)" opacity="0.18">
              <polygon points="60,200 170,270 440,160 330,100" fill="#000000" />
              <path d="M 200 110 L 320 65 L 320 75 L 200 120 Z" fill="#000000" />
            </g>

            {/* BEVEL THICKNESS UNDERBLADE EDGE */}
            {/* Dup of the main notched blade, colored charcoal, shifted slightly down for thickness */}
            <path d="
              M 60 191
              L 74 200 L 83 197 L 96 205 L 87 208 L 101 217 L 110 214 L 123 222 L 114 225 L 128 234 L 137 231 L 150 239 L 141 242 L 155 251 L 164 248 L 177 256 L 168 259 L 170 261
              L 184 255 L 173 248 L 186 243 L 197 250 L 211 244 L 200 237 L 213 232 L 224 239 L 238 233 L 227 226 L 240 221 L 251 228 L 265 222 L 254 215 L 267 210 L 278 217 L 292 211 L 281 204 L 294 199 L 305 206 L 319 200 L 308 193 L 321 188 L 332 195 L 346 189 L 335 182 L 348 177 L 359 184 L 373 178 L 362 171 L 375 166 L 386 173 L 400 167 L 389 160 L 402 155 L 413 162 L 440 151
              L 330 91 L 60 191 Z
            " stroke="#111827" strokeWidth="1" fill="#475569" transform="translate(0, 1.5)" />

            {/* POLISHED METALLIC BLADE SURFACE */}
            <path d="
              M 60 190
              L 74 199 L 83 196 L 96 204 L 87 207 L 101 216 L 110 213 L 123 221 L 114 224 L 128 233 L 137 230 L 150 238 L 141 241 L 155 250 L 164 247 L 177 255 L 168 258 L 170 260
              L 184 254 L 173 247 L 186 242 L 197 249 L 211 243 L 200 236 L 213 231 L 224 238 L 238 232 L 227 225 L 240 220 L 251 227 L 265 221 L 254 214 L 267 209 L 278 216 L 292 210 L 281 203 L 294 198 L 305 205 L 319 199 L 308 192 L 321 187 L 332 194 L 346 188 L 335 181 L 348 176 L 359 183 L 373 177 L 362 170 L 375 165 L 386 172 L 400 166 L 389 159 L 402 154 L 413 161 L 440 150
              L 330 90 L 60 190 Z
            " fill="url(#metalBladeGrad)" stroke="#64748b" strokeWidth="0.8" />

            {/* SPECULAR LIGHT STRIP ALONG STRAIGHT REAR LONG EDGE */}
            <line x1="60" y1="190" x2="330" y2="90" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.7" />

            {/* BRIGHT METALLIC SHINEY SPINE ON BLADE SURFACE */}
            {/* Ground shadow beneath the spine */}
            <path d="M 193 195 L 325 146 C 328 145, 331 148, 331 150 C 331 152, 327 154, 324 155 L 192 204 Z" fill="#1e293b" opacity="0.3" />
            
            {/* Core rounded steel spine */}
            <path d="M 200 193 L 330 145" stroke="url(#chromeStemGrad)" strokeWidth="11" strokeLinecap="round" />
            <path d="M 200 192 L 330 144" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.65" />
            <path d="M 200 194 L 330 146" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3" />

            {/* RISING ERGONOMIC CHROME SHOULDER/BRACKET STEM */}
            {/* Thick support metal rising from back of spine, bending up-front then entering handle */}
            <path d="M 215 188 C 210 162, 192 135, 202 112" stroke="url(#chromeStemGrad)" strokeWidth="15" strokeLinecap="round" fill="none" />
            {/* Support reflections highlight */}
            <path d="M 213.5 188 C 208.5 163, 190.5 136, 200.5 113.5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
            {/* Support underside shadow */}
            <path d="M 216.5 188 C 211.5 161, 193.5 134, 203.5 110.5" stroke="#090d16" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.35" />

            {/* FRONT COLLAR RUBBER BOOT (YELLOW ACCENT COUPLING) */}
            {/* Yellow plastic coupling flare surrounding stem interface */}
            <path d="
              M 183 118 
              C 180 114, 185 106, 198 100 
              C 211 94, 222 96, 225 101
              L 219 123
              C 216 128, 186 122, 183 118 Z" 
              fill="url(#handleYellowGrad)" stroke="#111827" strokeWidth="0.8" />
            {/* Bright specular highlight on yellow coupling flare */}
            <path d="M 185 115 C 183 112, 186 107, 197 102" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

            {/* TWO-TONE REINFORCED CO-MOLDED GRIP HANDLE */}
            {/* The core black rubber chassis of the grip */}
            <path d="
              M 213 110
              L 323 65
              C 334 60, 345 74, 334 84
              L 224 129
              C 213 134, 202 120, 213 110 Z" 
              fill="url(#handleBlackGrad)" stroke="#09090b" strokeWidth="1" />

            {/* Specular gloss streak on black grip chassis top side */}
            <path d="M 221 106 L 316 67" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.12" fill="none" />

            {/* ERGONOMIC BRIGHT YELLOW THERMOPLASTIC GRIP INSERT PANELS */}
            {/* Two-tone tactile yellow overlay panel */}
            <path d="
              M 235 109 
              Q 275 92, 315 76
              C 319 74, 321 78, 318 81
              Q 278 98, 238 114
              C 234 116, 232 112, 235 109 Z" 
              fill="url(#handleYellowGrad)" stroke="#a16207" strokeWidth="0.5" />
              
            {/* Deep groove shadow within yellow soft grip area */}
            <path d="M 243 105 Q 278 91, 308 78" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.32" />
            <path d="M 243 105 Q 278 91, 308 78" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />

            {/* UPPER HAND SHADOW EDGE (Underneath back handle body) */}
            <path d="M 224 129 L 324 88" stroke="#000000" strokeWidth="3.2" strokeLinecap="round" opacity="0.5" />

            {/* YELLOW BACK REAR CAP COUPLING */}
            <ellipse cx="328" cy="73" rx="8" ry="14" transform="rotate(-22 328 73)" fill="url(#handleYellowGrad)" stroke="#78350f" strokeWidth="0.8" />
            <ellipse cx="327" cy="72" rx="6" ry="11.5" transform="rotate(-22 327 72)" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.45" />
          </svg>
        );

      case "Mortar Mixer":
        return (
          <svg viewBox="0 0 540 360" className="w-full h-auto max-h-[140px] md:max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Soft shadow filter */}
              <filter id="mixerSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              
              {/* Shiny glossy orange gradient for drum & wheel */}
              <linearGradient id="drumOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff8533" />
                <stop offset="25%" stopColor="#ff5500" />
                <stop offset="65%" stopColor="#d33b00" />
                <stop offset="100%" stopColor="#8d2000" />
              </linearGradient>

              {/* Chrome/Steel specular highlights */}
              <linearGradient id="steelGleam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#e2e8f0" />
                <stop offset="60%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              
              {/* Matte black / premium frame coatings */}
              <linearGradient id="frameBlack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3f3f46" />
                <stop offset="35%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>

              {/* Deep inside drum shadow */}
              <radialGradient id="innerDrumGrad" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#3f3f46" />
                <stop offset="45%" stopColor="#1e1e24" />
                <stop offset="75%" stopColor="#111115" />
                <stop offset="100%" stopColor="#050507" />
              </radialGradient>
              
              {/* Tire rubber texture */}
              <linearGradient id="tireRubberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#27272a" />
                <stop offset="50%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
            </defs>

            {/* GROUND SHADOWS */}
            <g filter="url(#mixerSoftShadow)" opacity="0.18">
              {/* Under left stand plate */}
              <ellipse cx="150" cy="315" rx="30" ry="7" fill="#000000" />
              {/* Under tire 1 (front) */}
              <ellipse cx="280" cy="305" rx="35" ry="10" fill="#000000" />
              {/* Under tire 2 (back) */}
              <ellipse cx="360" cy="275" rx="30" ry="8" fill="#000000" />
            </g>

            {/* FRAME STANDS (Deep charcoal/black coated metal beams) */}
            {/* Left vertical pole support */}
            <path d="M 148 110 L 158 110 L 158 310 L 148 310 Z" fill="url(#frameBlack)" stroke="#09090b" strokeWidth="0.5" />
            <path d="M 149 110 L 151 110 L 151 310" stroke="#71717a" strokeWidth="0.8" opacity="0.4" />
            
            {/* Bottom horizontal structural beam */}
            <path d="M 158 200 L 315 190 L 315 204 L 158 214 Z" fill="url(#frameBlack)" stroke="#09090b" strokeWidth="0.5" />
            <path d="M 158 201 L 315 191" stroke="#71717a" strokeWidth="0.8" opacity="0.3" />

            {/* Left stand bottom pad helper block */}
            <path d="M 134 310 L 172 310 L 168 316 L 138 316 Z" fill="#18181b" stroke="#09090b" strokeWidth="0.5" />
            <circle cx="142" cy="313" r="1.5" fill="#52525b" />
            <circle cx="164" cy="313" r="1.5" fill="#52525b" />

            {/* A-frame diagonal support tube (running from central block to axle junction) */}
            <path d="M 314 190 L 292 280 L 282 278 L 304 188 Z" fill="url(#frameBlack)" />
            <path d="M 314 190 L 358 250 L 350 254 L 304 194 Z" fill="url(#frameBlack)" />

            {/* WHEEL REAR AXLE AND TIRES */}
            {/* Axle rod connecting the wheels */}
            <path d="M 285 272 L 355 242" stroke="url(#steelGleam)" strokeWidth="6" strokeLinecap="round" />
            <path d="M 285 270 L 355 240" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

            {/* REAR WHEEL (Slightly further away and smaller) */}
            <g transform="translate(355, 240) rotate(-20)">
              {/* Outer tire body */}
              <ellipse cx="0" cy="0" rx="20" ry="32" fill="url(#tireRubberGrad)" stroke="#000000" strokeWidth="0.8" />
              {/* Inner metal rim */}
              <ellipse cx="0" cy="0" rx="11" ry="18" fill="url(#steelGleam)" stroke="#475569" strokeWidth="0.5" />
              <ellipse cx="0" cy="0" rx="7" ry="11" fill="#1e293b" />
              {/* Axle bolt head */}
              <circle cx="0" cy="0" r="3.5" fill="url(#steelGleam)" />
            </g>

            {/* FRONT WHEEL (Larger and closer to camera) */}
            <g transform="translate(285, 270) rotate(-20)">
              {/* Outer tire body */}
              <ellipse cx="0" cy="0" rx="25" ry="40" fill="url(#tireRubberGrad)" stroke="#000000" strokeWidth="0.8" />
              {/* Horizontal treads details along the outer tire radius */}
              <path d="M -24 -12 Q -25 0 -24 12" stroke="#111" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M 24 -12 Q 25 0 24 12" stroke="#111" strokeWidth="2.5" fill="none" opacity="0.6" />
              {/* Inner high-contrast metal rim */}
              <ellipse cx="0" cy="0" rx="14" ry="24" fill="url(#steelGleam)" stroke="#334155" strokeWidth="0.6" />
              <ellipse cx="0" cy="0" rx="9" ry="16" fill="#18181b" />
              {/* Wheel cap hub and lug nuts pins */}
              <circle cx="0" cy="0" r="4.5" fill="url(#steelGleam)" />
              <circle cx="0" cy="-6" r="1.2" fill="#94a3b8" />
              <circle cx="0" cy="6" r="1.2" fill="#94a3b8" />
            </g>

            {/* MOTOR / GEAR cabinet enclosing cage (on the right) */}
            <path d="M 314 110 L 344 112 C 348 112, 350 115, 350 119 L 346 186 C 346 190, 342 193, 338 193 L 310 190 Z" fill="url(#frameBlack)" stroke="#09090b" strokeWidth="0.8" />
            {/* Metallic status badge / vents */}
            <rect x="320" y="125" width="22" height="6" rx="1.2" fill="#52525b" stroke="#27272a" strokeWidth="0.5" />
            <line x1="324" y1="128" x2="338" y2="128" stroke="#111" strokeWidth="1" />
            <rect x="320" y="136" width="22" height="2" fill="#09090b" />
            <rect x="320" y="141" width="22" height="2" fill="#09090b" />
            
            {/* LEFT DRAG HANDLE AND BAR WITH RUBBER HAND GRIP */}
            <path d="M 148 115 C 138 100, 110 88, 98 88" stroke="url(#frameBlack)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 148 115 C 138 100, 110 88, 98 88" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.25" />
            {/* Textured rubber hand grip cap */}
            <path d="M 104 88 L 86 88 L 86 92 L 104 92 Z" fill="#09090b" />
            {/* Small safety ring on hand grip */}
            <circle cx="86" cy="90" r="3" fill="#18181b" />

            {/* ORANGE DOUBLE-CONE REFLECTING CONTAINER (DRUM) */}
            <g transform="translate(230, 150) rotate(32)">
              {/* Backdrop shadow of the drum onto the pivot shaft */}
              <ellipse cx="-15" cy="5" rx="35" ry="12" fill="#09090b" opacity="0.3" />

              {/* Rear dome piece */}
              <path d="M-65 -45 C -75 -25, -75 25, -65 45 L -10 50 L -10 -50 Z" fill="url(#drumOrangeGrad)" />
              {/* Inner shine highlight on rear dome curve */}
              <path d="M -64 -35 C -72 -15, -72 15, -64 35" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.32" />

              {/* Raised sprocket center band ring of the cement mixer */}
              <path d="M -11 -54 L -4 -54 L -4 54 L -11 54 Z" fill="#2d3748" stroke="#000" strokeWidth="0.5" />
              <path d="M -4 -52 L 2 -52 L 2 52 L -4 52 Z" fill="url(#drumOrangeGrad)" />
              {/* Little rivets bolt circles around sprocket ring */}
              <circle cx="-7.5" cy="-40" r="1.5" fill="#f1f5f9" />
              <circle cx="-7.5" cy="-20" r="1.5" fill="#f1f5f9" />
              <circle cx="-7.5" cy="0" r="1.5" fill="#f1f5f9" />
              <circle cx="-7.5" cy="20" r="1.5" fill="#f1f5f9" />
              <circle cx="-7.5" cy="40" r="1.5" fill="#f1f5f9" />

              {/* Tapering front cone section */}
              <path d="M 2 -52 L 54 -36 C 54 -36, 56 -18, 56 0 C 56 18, 54 36, 54 36 L 2 52 Z" fill="url(#drumOrangeGrad)" />
              {/* Dynamic shine highlight on tapering cone top surface */}
              <path d="M 4 -46 L 50 -32" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.35" />

              {/* Front mouth rim circle with thick high-contrast steel collar reflection */}
              <ellipse cx="55" cy="0" rx="8" ry="36" fill="url(#steelGleam)" stroke="#1a202c" strokeWidth="0.8" />
              
              {/* Core dark hollow black drum bore */}
              <ellipse cx="55" cy="0" rx="5" ry="32" fill="url(#innerDrumGrad)" />

              {/* Mixing blades inside the hollow bore */}
              {/* upper blade */}
              <path d="M 52 -18 Q 42 -22 36 -12 Q 40 -6 53 -10 Z" fill="#eb6f00" stroke="#4a1a00" strokeWidth="0.5" />
              <path d="M 44 -19 L 40 -15" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              {/* lower blade */}
              <path d="M 52 10 Q 42 6 36 16 Q 40 22 53 18 Z" fill="#ff7f16" stroke="#4a1a00" strokeWidth="0.5" />
            </g>

            {/* PIVOT AXIS SHAFT / BEARING BLOCK FOR DRUM SUPPORT */}
            <path d="M 158 165 C 158 165, 175 160, 210 162" stroke="url(#frameBlack)" strokeWidth="14" strokeLinecap="round" />
            <path d="M 158 165 C 158 165, 175 160, 210 162" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />

            {/* TILT CONTROL WHEEL (Orange hand wheel on left vertical post) */}
            <g transform="translate(136, 150) rotate(15)">
              {/* Heavy ground shadow of control wheel */}
              <ellipse cx="0" cy="15" rx="5" ry="35" fill="#000000" opacity="0.18" filter="url(#mixerSoftShadow)" />
              
              {/* Outer Orange Ring (tilted ellipse in perspective) */}
              <ellipse cx="0" cy="0" rx="8" ry="42" fill="none" stroke="url(#drumOrangeGrad)" strokeWidth="7" />
              <ellipse cx="0" cy="0" rx="8" ry="42" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.45" />

              {/* Heavy industrial center hub */}
              <ellipse cx="0" cy="0" rx="4" ry="10" fill="url(#steelGleam)" stroke="#1a202c" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="2.5" fill="#000000" />

              {/* Wheel Spoke Beams connecting hub to outer orange ring */}
              <line x1="0" y1="-8" x2="0" y2="-40" stroke="url(#drumOrangeGrad)" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="0" y1="-8" x2="0" y2="-40" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
              
              <line x1="0" y1="8" x2="0" y2="40" stroke="url(#drumOrangeGrad)" strokeWidth="4.5" strokeLinecap="round" />
              
              {/* Diagonal spoke angling in perspective */}
              <line x1="-3" y1="-3" x2="-6" y2="-15" stroke="url(#drumOrangeGrad)" strokeWidth="4" />
              <line x1="3" y1="3" x2="6" y2="15" stroke="url(#drumOrangeGrad)" strokeWidth="4" />
            </g>

            {/* SMALL DETAILS: LOCK PIN & FOOT PEDAL AT PLATES */}
            <path d="M 148 290 Q 134 290, 131 285" stroke="url(#steelGleam)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <circle cx="131" cy="285" r="1.5" fill="#ef4444" />
          </svg>
        );

      case "Hand Saw": {
        // Let's procedurally calculate the sawtooth path to capture perfect teeth realism.
        const startX = 114;
        const startY = 145;
        const endX = 456;
        const endY = 254;
        const N = 95; // realistic fine-toothed pitch
        const dx = endX - startX;
        const dy = endY - startY;
        const len = Math.sqrt(dx * dx + dy * dy);
        const nx = -dy / len;
        const ny = dx / len;
        const toothHeight = 2.4;

        let teethPath = `M ${startX} ${startY} `;
        for (let i = 0; i < N; i++) {
          const t1 = i / N;
          const t2 = (i + 0.55) / N;
          const t3 = (i + 1) / N;
          const xM = startX + dx * t2;
          const yM = startY + dy * t2;
          const x2 = startX + dx * t3;
          const y2 = startY + dy * t3;
          const tipX = xM + nx * toothHeight;
          const tipY = yM + ny * toothHeight;
          teethPath += `L ${tipX.toFixed(1)} ${tipY.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} `;
        }

        return (
          <svg viewBox="0 0 540 300" className="w-full h-auto max-h-[140px] md:max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Soft blur for ambient surface shadow */}
              <filter id="sawSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="7" />
              </filter>

              {/* Brushed premium high-carbon steel reflection */}
              <linearGradient id="sawSteelBlade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="20%" stopColor="#e2e8f0" />
                <stop offset="45%" stopColor="#cbd5e1" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="90%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              {/* Polished glossy varnished walnut/mahogany handles */}
              <linearGradient id="walnutWood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a76f44" />
                <stop offset="25%" stopColor="#854c22" />
                <stop offset="60%" stopColor="#5a2e0e" />
                <stop offset="85%" stopColor="#371701" />
                <stop offset="100%" stopColor="#180700" />
              </linearGradient>

              {/* Premium shining brass buttons */}
              <linearGradient id="brassScrewGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="30%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              {/* Darker walnut shadow */}
              <linearGradient id="woodDeepShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#53290b" />
                <stop offset="100%" stopColor="#100300" />
              </linearGradient>
            </defs>

            {/* GROUND SHADOW */}
            <g filter="url(#sawSoftShadow)" opacity="0.14">
              {/* Wooden grip handle shadow */}
              <ellipse cx="110" cy="115" rx="55" ry="32" fill="#000000" />
              {/* Tapered steel blade shadow */}
              <polygon points="120,155 456,260 440,270 120,180" fill="#000000" />
            </g>

            {/* STEEL BLADE */}
            {/* Main body of the steel sheet blade */}
            <path d="M 114 145 H 122 L 160 106 L 460 250 L 456 254 Z" fill="url(#sawSteelBlade)" stroke="#475569" strokeWidth="0.5" />
            
            {/* Fine procedural steel teeth */}
            <path d={teethPath} fill="url(#sawSteelBlade)" stroke="#334155" strokeWidth="0.8" strokeLinejoin="miter" />

            {/* Gleaming brushed light reflect bands parallel to the blade tooth edge */}
            <polygon points="160,107 458,250 456,252 156,112" fill="#ffffff" opacity="0.12" />
            <polygon points="140,118 454,251 450,253 134,124" fill="#ffffff" opacity="0.08" />

            {/* Pure white specular gleam along the top spine edge */}
            <line x1="160" y1="106" x2="460" y2="250" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />

            {/* Subtle horizontal grinding lines across the steel blade */}
            <line x1="164" y1="112" x2="456" y2="246" stroke="#94a3b8" strokeWidth="0.5" opacity="0.15" />
            <line x1="168" y1="118" x2="452" y2="242" stroke="#94a3b8" strokeWidth="0.5" opacity="0.11" />
            <line x1="172" y1="124" x2="448" y2="238" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.18" />
            <line x1="176" y1="130" x2="444" y2="234" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.12" />

            {/* CRISP IRWIN BRAND LABELS */}
            {/* Tilted aligned group: Aligns text perfectly to the ~25.6 degree slope of the saw spine */}
            <g transform="translate(180, 142) rotate(25.6)">
              {/* Brand logo in heavy italic sans-serif bold */}
              <text x="5" y="0" fill="#1e293b" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" letterSpacing="0.04em">IRWIN</text>
              {/* Sub-text containing model/spec */}
              <text x="5.5" y="8" fill="#475569" fontFamily="sans-serif" fontWeight="700" fontSize="4.2" letterSpacing="0.05em" opacity="0.85">JACKSON • PRO-CUT • HARDENED STEEL • 20"/500mm - 8TPI</text>
            </g>

            {/* WOODEN HANDLE */}
            {/* Uses evenodd fill rule to cut the inside grip opening out of the outer handle block */}
            <path d="
              M 90 60
              C 130 68, 150 78, 170 88
              C 190 92, 205 102, 205 110
              C 195 115, 175 118, 165 124
              C 155 128, 155 142, 140 148
              C 130 152, 110 155, 95 152
              C 80 150, 70 144, 60 142
              C 50 135, 45 125, 52 115
              C 65 105, 72 85, 60 70
              C 55 64, 75 58, 90 60 Z

              M 98 84 
              C 114 86, 126 92, 126 102 
              C 126 112, 114 116, 96 118 
              C 84 108, 86 94, 98 84 Z" 
              fill="url(#walnutWood)" 
              stroke="#2e1201" 
              strokeWidth="0.8" 
              fillRule="evenodd" 
            />

            {/* Organic Wood Grain Lines Overlay */}
            <g stroke="#1d0700" strokeWidth="0.8" strokeLinecap="round" opacity="0.32" fill="none">
              <path d="M 88 64 Q 120 71, 165 83" />
              <path d="M 72 135 Q 105 143, 142 141" />
              <path d="M 80 88 Q 102 102, 122 114" />
              <path d="M 66 110 Q 84 122, 112 128" />
              <path d="M 94 68 C 112 74, 128 88, 142 98" />
            </g>

            {/* Specular Edge Highlights (Gives wood a polished varnished lustre) */}
            <path d="M 90 60 C 130 68, 150 78, 170 88" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.25" />
            <path d="M 60 142 C 50 135, 45 125, 52 115" stroke="#ffffff" strokeWidth="1.0" fill="none" opacity="0.18" />
            <path d="M 98 84 C 114 86, 126 92, 126 102" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.12" />

            {/* Bottom Shade Core (Enhances 3D depth of handle bulge) */}
            <path d="M 70 144 C 60 142, 50 135, 45 130" stroke="#000000" strokeWidth="2.5" fill="none" opacity="0.35" />

            {/* BRASS REVENUE SCREWS & MEDALLION COVERS */}
            
            {/* Medallion Seal (Left central part of the wood handle cheek) */}
            <g transform="translate(148, 105)">
              {/* Outer brass ring */}
              <circle cx="0" cy="0" r="7" fill="url(#brassScrewGrad)" stroke="#452300" strokeWidth="0.6" />
              {/* Inner details */}
              <circle cx="0" cy="0" r="4.8" fill="none" stroke="#fef08a" strokeWidth="0.5" opacity="0.8" />
              <circle cx="0" cy="0" r="3.2" fill="url(#brassScrewGrad)" />
              {/* Embossed seal details */}
              <circle cx="0" cy="0" r="1.5" fill="#452300" opacity="0.4" />
              {/* Drop shadow on the wood */}
              <circle cx="1" cy="1" r="7" stroke="#100300" strokeWidth="0.8" fill="none" opacity="0.3" />
            </g>

            {/* Brass Screw 1 (Top-right lobe) */}
            <g transform="translate(182, 113)">
              <circle cx="0" cy="0" r="4.5" fill="url(#brassScrewGrad)" stroke="#452300" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="2.8" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.45" />
              {/* Screwdriver Flathead Slot */}
              <line x1="-2.8" y1="-1.2" x2="2.8" y2="1.2" stroke="#3b1b01" strokeWidth="0.9" />
              <line x1="-2.8" y1="-1.2" x2="2.8" y2="1.2" stroke="#ffffff" strokeWidth="0.3" opacity="0.4" />
              {/* Cast shadow */}
              <path d="M 1 4 A 4.5 4.5 0 0 0 4 1" stroke="#180700" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
            </g>

            {/* Brass Screw 2 (Bottom-right lobe) */}
            <g transform="translate(136, 136)">
              <circle cx="0" cy="0" r="4.5" fill="url(#brassScrewGrad)" stroke="#452300" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="2.8" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.45" />
              {/* Screwdriver Flathead Slot */}
              <line x1="-1.2" y1="-2.8" x2="1.2" y2="2.8" stroke="#3b1b01" strokeWidth="0.9" />
              <line x1="-1.2" y1="-2.8" x2="1.2" y2="2.8" stroke="#ffffff" strokeWidth="0.3" opacity="0.4" />
              {/* Cast shadow */}
              <path d="M 1 4 A 4.5 4.5 0 0 0 4 1" stroke="#180700" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
            </g>

            {/* Brass Screw 3 (Lower-left back cheek) */}
            <g transform="translate(118, 128)">
              <circle cx="0" cy="0" r="4.5" fill="url(#brassScrewGrad)" stroke="#452300" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="2.8" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.45" />
              {/* Screwdriver Flathead Slot */}
              <line x1="-2.5" y1="1.8" x2="2.5" y2="-1.8" stroke="#3b1b01" strokeWidth="0.9" />
              <line x1="-2.5" y1="1.8" x2="2.5" y2="-1.8" stroke="#ffffff" strokeWidth="0.3" opacity="0.4" />
              {/* Cast shadow */}
              <path d="M 1 4 A 4.5 4.5 0 0 0 4 1" stroke="#180700" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
            </g>
          </svg>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-300 shadow-lg flex flex-col gap-8 md:gap-10 relative">
      <div className="absolute left-0 bottom-0 top-0 w-64 bg-[#059212]/5 rounded-full blur-3xl -z-10 opacity-60" />

      {/* Grid: Sizes selection on left, Tool Kit selector on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Aspect: 11 Standard Sizes Catalog */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#059212] font-bold uppercase tracking-wider mb-1">
              <Box className="w-4 h-4" />
              Dimensions Directory
            </div>
            <h4 className="font-display text-2xl font-bold text-stone-900 tracking-tight">
              Standard Block Proportions
            </h4>
            <p className="text-stone-605 text-xs md:text-sm mt-1 max-w-md leading-relaxed">
              AAC blocks are strictly engineered for uniform width layouts. Select a standard dimensional size profile to view and resize the 3D model:
            </p>
          </div>

          <div className="flex flex-col gap-5 max-h-[420px] overflow-y-auto p-1.5 pr-2 scrollbar-thin">
            {/* Standard Block Proportions Group */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059212]" />
                <span className="text-[10px] uppercase font-mono font-bold text-[#059212] tracking-wider">
                  Standard Block Proportions
                </span>
                <span className="text-[9px] font-mono text-stone-500 font-bold px-1.5 py-0.5 bg-stone-100 border border-stone-250 rounded">
                  Common Stock
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STANDARD_SIZES.filter(size => size.id === 's2' || size.id === 's3' || size.id === 's4').map((size) => {
                  const isSelected = activeSize.id === size.id;
                  return (
                    <button
                       key={size.id}
                       onClick={() => onSelectSize(size)}
                       className={`p-2 rounded-lg text-left border transition-all flex flex-col justify-between gap-0.5 ${
                         isSelected
                           ? 'bg-[#F8F9FA] border-[#059212] text-stone-900 shadow-sm'
                           : 'bg-white text-stone-700 border-stone-300 hover:bg-[#F8F9FA]/50 hover:border-stone-400'
                       }`}
                     >
                       <div className="flex items-center justify-between w-full">
                         <span className="text-[8px] uppercase font-mono font-bold tracking-wider opacity-65 text-[#059212]">
                           Standard Core Size
                         </span>
                         {isSelected && (
                           <span className="w-1.5 h-1.5 rounded-full bg-[#059212] animate-pulse" />
                         )}
                       </div>

                       <div className="flex items-baseline gap-0.5 mt-0.5">
                         <span className="font-display font-extrabold text-[#111111] text-xs md:text-sm">
                           {size.l}
                         </span>
                         <span className="text-[9px] opacity-40">x</span>
                         <span className="font-display font-extrabold text-[#111111] text-xs md:text-sm">
                           {size.h}
                         </span>
                         <span className="text-[9px] opacity-40">x</span>
                         <span className="font-display font-extrabold text-xs md:text-sm text-[#059212]">
                           {size.w}
                         </span>
                         <span className="text-[8px] font-mono opacity-50 ml-0.5">mm</span>
                       </div>

                       <div className="text-[8px] opacity-75 leading-normal border-t pt-0.5 mt-0.5 border-stone-150 flex justify-between w-full">
                         <span>{size.w === 75 ? "Slim Partition" : size.w >= 200 ? "Heavy External" : "Standard Core"}</span>
                         <span className="font-mono">W:{size.w}</span>
                       </div>
                     </button>
                  );
                })}
              </div>
            </div>

            {/* Special Block Proportions Group */}
            <div className="border-t border-stone-200 pt-4">
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                <span className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">
                  Special Block Proportions
                </span>
                <span className="text-[9px] font-mono text-stone-500 font-bold px-1.5 py-0.5 bg-stone-100 border border-stone-250 rounded">
                  Special Order
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STANDARD_SIZES.filter(size => size.id !== 's2' && size.id !== 's3' && size.id !== 's4').map((size) => {
                  const isSelected = activeSize.id === size.id;
                  return (
                    <button
                       key={size.id}
                       onClick={() => onSelectSize(size)}
                       className={`p-2 rounded-lg text-left border transition-all flex flex-col justify-between gap-0.5 ${
                         isSelected
                           ? 'bg-[#F8F9FA] border-[#059212] text-stone-900 shadow-sm'
                           : 'bg-white text-stone-700 border-stone-300 hover:bg-[#F8F9FA]/50 hover:border-stone-400'
                       }`}
                     >
                       <div className="flex items-center justify-between w-full">
                         <span className="text-[8px] uppercase font-mono font-bold tracking-wider opacity-65">
                           Special Variant Size
                         </span>
                         {isSelected && (
                           <span className="w-1.5 h-1.5 rounded-full bg-[#059212] animate-pulse" />
                         )}
                       </div>

                       <div className="flex items-baseline gap-0.5 mt-0.5">
                         <span className="font-display font-extrabold text-[#111111] text-xs md:text-sm">
                           {size.l}
                         </span>
                         <span className="text-[9px] opacity-40">x</span>
                         <span className="font-display font-extrabold text-[#111111] text-xs md:text-sm">
                           {size.h}
                         </span>
                         <span className="text-[9px] opacity-40">x</span>
                         <span className="font-display font-extrabold text-xs md:text-sm text-[#059212]">
                           {size.w}
                         </span>
                         <span className="text-[8px] font-mono opacity-50 ml-0.5">mm</span>
                       </div>

                       <div className="text-[8px] opacity-75 leading-normal border-t pt-0.5 mt-0.5 border-stone-150 flex justify-between w-full">
                         <span>{size.w === 75 ? "Slim Partition" : size.w >= 200 ? "Heavy External" : "Standard Core"}</span>
                         <span className="font-mono">W:{size.w}</span>
                       </div>
                     </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sizing impact note */}
          <div className="bg-[#F8F9FA] border border-stone-300 p-4 rounded-xl text-[11px] text-stone-605 leading-normal flex items-start gap-2.5 shadow-sm">
            <Minimize2 className="w-4.5 h-4.5 text-stone-500 shrink-0 mt-0.5" />
            <span>
              All blocks feature a uniform length of <strong className="text-stone-900">600mm</strong>, accelerating construction timelines. Custom depths cut on site seamlessly with our carbide hand saw.
            </span>
          </div>

        </div>

        {/* Right Aspect: Masonry Tool Kit Selector */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#059212] font-bold uppercase tracking-wider mb-1">
              <Hammer className="w-4 h-4" />
              Equipment Index
            </div>
            <h4 className="font-display text-2xl font-bold text-stone-900 tracking-tight">
              AAC Specialist Tool Kit
            </h4>
            <p className="text-stone-605 text-xs md:text-sm mt-1 max-w-md leading-relaxed">
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
                      ? 'bg-[#059212] border-green-600 text-white shadow-md'
                      : 'bg-[#F8F9FA] text-stone-705 border-stone-300 hover:bg-[#EAEFF8] hover:border-stone-400 shadow-xs'
                  }`}
                >
                  {tool.name}
                </button>
              );
            })}
          </div>

          {/* Active Tool card details with responsive illustration visible on every device */}
          <div className="bg-[#F8F9FA]/60 border border-stone-300 p-6 rounded-2xl relative shadow-md flex flex-col sm:flex-row gap-6 items-center sm:items-stretch justify-between min-h-[220px]">
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between border-b pb-3 border-stone-250">
                  <span className="text-[10px] font-bold text-[#059212] font-mono uppercase tracking-wider">
                    Equipment Standard Specifications
                  </span>
                  <span className="text-stone-700 font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-stone-200">
                    {activeToolData.name}
                  </span>
                </div>

                <p className="text-stone-605 text-xs md:text-sm mt-4 leading-relaxed font-semibold">
                  {activeToolData.description}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-250 flex items-center justify-between gap-3 text-[11px] shadow-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#059212] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-stone-500 font-bold leading-none">Primary Site Use</span>
                    <strong className="text-stone-900 font-extrabold mt-0.5 leading-tight">{activeToolData.useCase}</strong>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </div>
            </div>

            {/* Micro Product Display: Adapts beautifully on mobile and desktop, displaying the exact bucket image requested */}
            <div className="w-full sm:w-[150px] md:w-[180px] lg:w-[160px] xl:w-[200px] flex items-center justify-center p-3.5 bg-white rounded-xl border border-stone-250 shadow-inner shrink-0 self-center">
              {renderToolIllustration(activeToolData.name)}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
