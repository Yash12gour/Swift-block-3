import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  User, 
  Building2, 
  MessageSquare, 
  FileText, 
  Send, 
  CheckCircle2, 
  Leaf, 
  Sparkles, 
  Sliders, 
  ChevronRight
} from 'lucide-react';
import GoogleChatPortal from './GoogleChatPortal';

interface ContactFormData {
  fullName: string;
  email: string;
  organization: string;
  inquiryType: 'booking' | 'sample' | 'partnership' | 'consultancy';
  blockQty: number;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    organization: '',
    inquiryType: 'booking',
    blockQty: 10000,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dispatchTab, setDispatchTab] = useState<'gmail' | 'chat'>('gmail');

  // Dynamic calculations based on inquiring quantities
  const blockVolumeM3 = (formData.blockQty * (0.6 * 0.2 * 0.15)); // standard 600x200x150 block in cubic meters
  const co2MitigatedKg = Math.round(formData.blockQty * 4.2); // ~4.2kg offset potential per block vs traditional red clay bricks
  const structuralWeightSavedTons = Math.round((formData.blockQty * 18.5) / 1000); // lightweight compared to heavy red bricks (~18.5kg saved per block)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      blockQty: parseInt(e.target.value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate interactive transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1800);
  };

  // Pre-compiled Email Body formatted for Gmail client connection
  const mailtoSubject = encodeURIComponent(`Swift Eco Blox inquiry from ${formData.fullName}`);
  const mailtoBody = encodeURIComponent(
    `Hello Swift Industries Team,\n\n` +
    `I am reaching out regarding Swift Eco Blox.\n\n` +
    `-- CONTACT DETAILS --\n` +
    `Name: ${formData.fullName}\n` +
    `Organization: ${formData.organization || 'Individual'}\n` +
    `Email: ${formData.email}\n\n` +
    `-- INQUIRY HIGHLIGHTS --\n` +
    `Type: ${formData.inquiryType.toUpperCase()}\n` +
    `Estimated Block Quantity: ${formData.blockQty.toLocaleString()} units\n` +
    `Calculated Co2 Offset: ${co2MitigatedKg.toLocaleString()} kg\n` +
    `Structural Weight Saved: ${structuralWeightSavedTons} tons\n\n` +
    `-- ADDITIONAL MESSAGE --\n` +
    `${formData.message || 'No additional message provided.'}\n\n` +
    `Regards,\n` +
    `${formData.fullName}`
  );

  const directGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=swiftindustries79@gmail.com&su=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <section id="contact-portal" className="py-24 bg-stone-950 border-b border-stone-900 relative overflow-hidden scroll-mt-24">
      
      {/* Background glow lines */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[300px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[200px] bg-stone-800/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Title with premium layout alignment */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-widest block mb-2">
            STATION 06 / CLIENT INTEGRATION
          </span>
          <h3 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-4">
            Interactive <span className="text-green-400">Dispatch Desk</span>
          </h3>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed">
            Configure your technical inquiry directly on the module below. Select an estimated booking quantity to live-calculate environmental impact parameters. You can dispatch natively directly via your Gmail.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Control Interface & Form (Col Span 7) */}
          <div className="lg:col-span-7 bg-stone-900/40 rounded-3xl border border-stone-850 p-4 sm:p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
            
            {/* Header with Sub Tabs & Port Status (Fully responsive layout flow) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-800 pb-4 mb-6">
              <div className="flex bg-stone-955 p-1 rounded-xl border border-stone-800 self-start">
                <button
                  type="button"
                  id="tab-gmail-dispatch"
                  onClick={() => setDispatchTab('gmail')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                    dispatchTab === 'gmail'
                      ? 'bg-stone-800 text-white shadow-md'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Gmail Despatch
                </button>
                <button
                  type="button"
                  id="tab-google-chat"
                  onClick={() => setDispatchTab('chat')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    dispatchTab === 'chat'
                      ? 'bg-green-600/20 text-green-400 border border-green-800/15 shadow-md shadow-green-950/20'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                  Google Chat
                </button>
              </div>
              <div className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/80 border border-stone-800 text-[9px] font-mono font-bold text-stone-500 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                PORT 3000 CONSOLE
              </div>
            </div>

            {dispatchTab === 'chat' ? (
              <GoogleChatPortal
                blockQty={formData.blockQty}
                co2MitigatedKg={co2MitigatedKg}
                structuralWeightSavedTons={structuralWeightSavedTons}
                blockVolumeM3={blockVolumeM3}
                fullName={formData.fullName}
                organization={formData.organization}
                inquiryType={formData.inquiryType}
              />
            ) : (
              <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 px-4 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-green-950 border border-green-800/40 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="font-display font-black text-2xl text-white tracking-tight mb-2">
                    Inquiry Encoded Successfully!
                  </h4>
                  <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto mb-8">
                    Your interest details for <strong className="text-white">{formData.blockQty.toLocaleString()} blocks</strong> have been verified locally. You are now prepared to launch direct Gmail submission.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <a 
                      href={directGmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-5 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white text-xs font-mono font-black rounded-xl tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/30 transition-all active:scale-95 duration-200"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      Open in Gmail Client
                    </a>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="px-5 py-3 border border-stone-800 hover:border-stone-700 text-stone-300 text-xs font-mono font-bold rounded-xl uppercase tracking-wider transition-colors"
                    >
                      Reset Form
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-stone-553 block mt-4">
                    Will connect directly to swiftindustries79@gmail.com
                  </span>
                </motion.div>
              ) : (
                <motion.form 
                  key="form-view"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label id="lbl-fullname" className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wider flex items-center gap-1">
                        <User className="w-3 h-3 text-green-400" />
                        Full Name / Contact Person *
                      </label>
                      <input 
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Anand Sharma"
                        className="w-full bg-stone-950 rounded-xl px-4 py-3 text-stone-100 text-sm border border-stone-850 focus:border-green-600/60 focus:outline-hidden transition-all placeholder:text-stone-600"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label id="lbl-email" className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wider flex items-center gap-1">
                        <Mail className="w-3 h-3 text-green-400" />
                        Direct Email Coordinates *
                      </label>
                      <input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="anand@construction.com"
                        className="w-full bg-stone-950 rounded-xl px-4 py-3 text-stone-100 text-sm border border-stone-850 focus:border-green-600/60 focus:outline-hidden transition-all placeholder:text-stone-600"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Organization Container */}
                    <div className="flex flex-col gap-1.5">
                      <label id="lbl-org" className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wider flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-green-400" />
                        Organization / Project Name
                      </label>
                      <input 
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Infrastructures"
                        className="w-full bg-stone-950 rounded-xl px-4 py-3 text-stone-100 text-sm border border-stone-850 focus:border-green-600/60 focus:outline-hidden transition-all placeholder:text-stone-600"
                      />
                    </div>

                    {/* Primary Inquiry Type */}
                    <div className="flex flex-col gap-1.5">
                      <label id="lbl-inquiry" className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wider flex items-center gap-1">
                        <FileText className="w-3 h-3 text-green-400" />
                        Inquiry Scope Sector
                      </label>
                      <select 
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full bg-stone-950 rounded-xl px-4 py-3 text-stone-300 text-sm border border-stone-850 focus:border-green-600/60 focus:outline-hidden transition-all"
                      >
                        <option value="booking">Direct Factory Booking</option>
                        <option value="sample">Product Sample Request</option>
                        <option value="partnership">Eco Audit Partnership</option>
                        <option value="consultancy">Technical AAC Consultation</option>
                      </select>
                    </div>

                  </div>

                  {/* Quantity Slider Panel */}
                  <div className="bg-stone-950 rounded-2xl border border-stone-850 p-4 md:p-5 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-wider block">
                          ESTIMATED STOCK QUANTITY
                        </span>
                        <span className="text-[9px] text-stone-500">Determine dynamic calculation scale</span>
                      </div>
                      <div className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-1 font-mono text-xs font-black text-white text-right">
                        {formData.blockQty.toLocaleString()} Blocks
                      </div>
                    </div>

                    <input 
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={formData.blockQty}
                      onChange={handleSliderChange}
                      className="w-full accent-green-600 h-1.5 bg-stone-900 rounded-lg cursor-pointer"
                    />

                    <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 mt-2">
                      <span>Min: 500 blocks</span>
                      <span>Max: 100,000 blocks</span>
                    </div>
                  </div>

                  {/* Message Form field */}
                  <div className="flex flex-col gap-1.5">
                    <label id="lbl-message" className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-green-400" />
                      Inquiry Notes / Technical Message
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Specify size requests, location details, delivery speed parameters..."
                      className="w-full bg-stone-950 rounded-xl px-4 py-3 text-stone-100 text-sm border border-stone-850 focus:border-green-600/60 focus:outline-hidden transition-all placeholder:text-stone-600"
                    />
                  </div>

                  {/* Dispatch Action Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isSubmitting 
                        ? 'bg-stone-800 text-stone-500 border border-stone-700 pointer-events-none' 
                        : 'bg-green-650 hover:bg-green-600 active:scale-98 text-white shadow-lg shadow-green-950/40 border border-green-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4.5 h-4.5 border-2 border-stone-500 border-t-transparent rounded-full animate-spin" />
                        Generating Inquiry Envelope...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-green-300" />
                        Dispatch Specification Envelope
                      </>
                    )}
                  </button>

                  <span className="text-[9px] font-mono text-stone-600 text-center block leading-relaxed">
                    This simulation compiles parameters and connects directly with local mail dispatch structures to deliver high fidelity lead logs safely.
                  </span>

                </motion.form>
              )}
            </AnimatePresence>
            )}

          </div>

          {/* RIGHT COLUMN: Real-Time Environmental Impact Feedback (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            {/* Real-Time Parameter Meter Section */}
            <div className="bg-stone-900/25 border border-stone-850 rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col gap-6">
              
              <div className="border-b border-stone-800 pb-4">
                <span className="text-[9px] font-mono text-stone-500 font-bold uppercase tracking-wider block mb-1">
                  IMPACT VERIFICATION UNIT
                </span>
                <h4 className="font-display font-bold text-lg text-white">Live-Generated Calculations</h4>
              </div>

              {/* Metric 1 */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-green-950/70 p-2.5 sm:p-3 rounded-2xl border border-green-905 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase block tracking-wider leading-none mb-1">
                    ESTIMATED CO2 OFFSET
                  </span>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-green-400">
                    {co2MitigatedKg.toLocaleString()} kg CO₂
                  </div>
                  <p className="text-[11px] text-stone-400 leading-normal mt-0.5">
                    Reduced carbon output vs standard coal-fired traditional clay brick setups.
                  </p>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-start gap-3 sm:gap-4 border-t border-stone-850/60 pt-5">
                <div className="bg-orange-950/70 p-2.5 sm:p-3 rounded-2xl border border-orange-905 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase block tracking-wider leading-none mb-1">
                    DEAD WEIGHT SAVING
                  </span>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-orange-400">
                    {structuralWeightSavedTons.toLocaleString()} Tons
                  </div>
                  <p className="text-[11px] text-stone-400 leading-normal mt-0.5">
                    Dead structural weights trimmed. Reduces ultimate foundation and steel layout demands.
                  </p>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-start gap-3 sm:gap-4 border-t border-stone-850/60 pt-5">
                <div className="bg-stone-950/80 p-2.5 sm:p-3 rounded-2xl border border-stone-800 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5 text-stone-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold uppercase block tracking-wider leading-none mb-1">
                    VOLUME DENSE CAPACITY
                  </span>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    {blockVolumeM3.toFixed(2)} m³
                  </div>
                  <p className="text-[11px] text-stone-400 leading-normal mt-0.5">
                    Volumetric storage density calculated directly based on standard dry density guidelines.
                  </p>
                </div>
              </div>

            </div>

            {/* Support Coordination Info Card */}
            <div className="bg-[#1c3d26]/12 border border-green-950/40 rounded-3xl p-4 sm:p-6 flex flex-col gap-4">
              <span className="text-[9px] font-mono text-green-400 font-semibold uppercase tracking-widest block">
                TECHNICAL DISPATCH PARTNERSHIP
              </span>
              <p className="text-stone-300 text-xs leading-relaxed">
                Our central-state sales team verifies every inquiry envelope within <strong className="text-white">12 working hours</strong>. For speedy order verification or fast shipping container quotas, you can dial our Factory Coordination office lines directly in the footer below.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold font-mono mt-1">
                <span>SECURED LOCAL DISPATCH</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
