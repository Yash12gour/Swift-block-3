import React from 'react';
import { GROUP_COMPANIES } from '../data';
import { 
  Building2, 
  Mail, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  Leaf, 
  Award,
  Globe2
} from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer-section" className="bg-[#FAF8F5] text-stone-800 pt-16 pb-12 px-6 md:px-12 border-t border-stone-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#059212]/5 rounded-full blur-3xl opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Core Corporate Identity & Factory Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-stone-200 pb-12">
          
          {/* Main Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#059212] p-2 rounded-xl text-white shadow-lg shadow-[#059212]/10">
                <Leaf className="w-5 h-5 fill-white/10" />
              </div>
              <div>
                <h3 className="font-display font-black text-stone-900 text-xl tracking-wide">
                  SWIFT ECO BLOX
                </h3>
                <span className="text-[10px] font-mono text-stone-500 block tracking-widest leading-none font-bold uppercase">
                  A Division of Swift Industries
                </span>
              </div>
            </div>

            <p className="text-stone-605 text-xs md:text-sm leading-relaxed mt-1 font-semibold">
              Central India's premier manufacturer of high-density Autoclaved Aerated Concrete (AAC) blocks. Committed to high-density precision, carbon offset, and faster building lifecycles.
            </p>

            <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-stone-200 self-start">
              <Award className="w-5 h-5 text-[#059212] shrink-0" />
              <div className="text-[10px] uppercase font-mono font-bold leading-normal text-stone-700">
                Authorized ISI brand standard • BIS Certified
              </div>
            </div>
          </div>

          {/* Sibling Divisions Column */}
          <div id="sibling-divisions" className="lg:col-span-5 flex flex-col gap-4 scroll-mt-24">
            <h4 className="font-display font-black text-stone-900 text-sm uppercase tracking-wider">
              SWIFT GROUP SIBLING DIVISION PORTAL
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {GROUP_COMPANIES.map((company, index) => (
                <div key={index} className="bg-white hover:bg-[#FAF8F5]/80 p-4 rounded-xl border border-stone-200 transition-colors flex flex-col justify-between min-h-[140px] shadow-xs">
                  <div>
                    <h5 className="text-stone-900 font-bold text-xs font-display">
                      {company.name}
                    </h5>
                    <p className="text-stone-500 text-[10px] leading-tight mt-1 font-semibold">
                      {company.sub}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-stone-500 mt-2 font-semibold">
                    <span className="block truncate">{company.address.split(',')[0]}</span>
                    <span className="block text-[#059212] mt-1 font-bold">{company.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Office & Factory contacts Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-display font-black text-stone-900 text-sm uppercase tracking-wider">
              OFFICE & FACTORY COORDINATES
            </h4>

            <div className="flex flex-col gap-3 text-xs text-stone-605 sm:font-semibold">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#059212] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-bold">Factory Address:</strong>
                  <span className="text-[11px] leading-relaxed text-stone-600">
                    Khasra No. 11/2/2/2, 12/1/2, Birholi, Dist. Raisen, Madhya Pradesh.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#059212] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-bold">Factory Booking Lines:</strong>
                  <span className="text-[11px] font-mono text-stone-600 block">+91 90748 09981</span>
                  <span className="text-[11px] font-mono text-stone-600 block">+91 78696 60964</span>
                  <span className="text-[11px] font-mono text-stone-600 block">+91 98262 89079</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#059212] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-bold">Email Dispatch Desk:</strong>
                  <span className="text-[11px] font-mono text-stone-600 block hover:text-[#059212] transition-colors">
                    swiftindustries79@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500 pt-2 pb-4">
          <div>
            © {new Date().getFullYear()} Swift Industries. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059212]" />
              BIS & ISI Approved
            </span>
            <span className="text-stone-300">|</span>
            <span className="flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-green-600" />
              Bhopal, MP, India
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
