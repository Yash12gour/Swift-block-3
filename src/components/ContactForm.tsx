import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  User, 
  Building2, 
  MessageSquare, 
  CheckCircle2
} from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formTilt, setFormTilt] = useState({ x: 0, y: 0 });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -3;
    const tiltY = (x / (rect.width / 2)) * 3;
    setFormTilt({ x: tiltX, y: tiltY });
  };

  const handleFormMouseLeave = () => {
    setFormTilt({ x: 0, y: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate high-quality, reliable dispatch action
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSuccess(false);
  };

  return (
    <section id="contact-portal" className="py-24 bg-[#F5F2EA] border-b border-stone-300 relative overflow-hidden scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#059212_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#059212]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Simple & Aesthetic Heading Layout */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#059212] font-bold uppercase tracking-widest bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full shadow-2xs">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-stone-900 tracking-tight mt-3 mb-4">
            Connect With <span className="text-[#059212]">Our Experts</span>
          </h2>
          <p className="text-stone-605 text-sm md:text-base leading-relaxed font-semibold">
            Have structures to build or customized parameters to ask? Send us a direct line and our plant coordinators will correspondence within 12 hours.
          </p>
        </div>

        {/* Centered Beautiful Animated Contact Form Container */}
        <div className="max-w-2xl mx-auto">
          
          <motion.form 
            ref={formRef}
            onMouseMove={handleFormMouseMove}
            onMouseLeave={handleFormMouseLeave}
            onSubmit={handleSubmit}
            style={{
              transform: `perspective(1000px) rotateX(${formTilt.x}deg) rotateY(${formTilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
            className="bg-white rounded-[24px] border border-stone-300 p-6 sm:p-8 md:p-10 shadow-[0_20px_45px_rgba(28,41,35,0.06),0_6px_18px_rgba(28,41,35,0.04)] relative overflow-hidden"
          >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-emerald-50 border-2 border-[#059212]/30 rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden shadow-2xs">
                      <div className="absolute inset-0 bg-[#059212]/5 animate-pulse" />
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 relative z-10" />
                    </div>

                    <h3 className="font-display font-black text-2xl text-stone-900 tracking-tight mb-2">
                      Message Dispatched
                    </h3>
                    
                    <p className="text-stone-500 text-xs font-semibold leading-relaxed max-w-sm mx-auto mb-8">
                      Thank you for contacting Swift Industries. Your parameters have been saved in our correspondence queue. Our desk manager will contact you shortly.
                    </p>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 bg-stone-900 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#059212] active:scale-97 transition-all cursor-pointer shadow-sm"
                    >
                      Fill Another Request
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    
                    <div className="flex items-center justify-between border-b border-stone-150 pb-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#059212] rounded-xs shadow-sm shadow-[#059212]/30 inline-block" />
                        <span className="font-display font-black text-stone-900 text-lg">
                          Digital Correspondence Draft
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-stone-400 font-bold uppercase bg-stone-50 border border-stone-200 px-2 py-0.5 rounded shadow-2xs">
                        SSL SECURE
                      </span>
                    </div>

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5 relative">
                      <label 
                        className={`text-[9.5px] font-mono uppercase font-black tracking-widest transition-colors flex items-center gap-1 ${
                          focusedField === 'name' ? 'text-[#059212]' : 'text-stone-400'
                        }`}
                      >
                        <User className="w-3 h-3" />
                        Full Name / Contact *
                      </label>
                      <div className="relative">
                        <input 
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Anand Sharma"
                          className={`w-full bg-[#FBF9F5] rounded-xl px-4 py-3 text-stone-850 text-sm border focus:bg-white focus:outline-none transition-all placeholder:text-stone-400 font-semibold shadow-[offset_1px_1px_3px_rgba(0,0,0,0.03)] ${
                            focusedField === 'name' 
                              ? 'border-[#059212] ring-2 ring-[#059212]/10' 
                              : 'border-t-stone-300 border-l-stone-300 border-r-stone-200 border-b-stone-200'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 relative">
                      <label 
                        className={`text-[9.5px] font-mono uppercase font-black tracking-widest transition-colors flex items-center gap-1 ${
                          focusedField === 'email' ? 'text-[#059212]' : 'text-stone-400'
                        }`}
                      >
                        <Mail className="w-3 h-3" />
                        Email Address *
                      </label>
                      <div className="relative">
                        <input 
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="anand@construction.com"
                          className={`w-full bg-[#FBF9F5] rounded-xl px-4 py-3 text-stone-850 text-sm border focus:bg-white focus:outline-none transition-all placeholder:text-stone-400 font-semibold shadow-[offset_1px_1px_3px_rgba(0,0,0,0.03)] ${
                            focusedField === 'email' 
                              ? 'border-[#059212] ring-2 ring-[#059212]/10' 
                              : 'border-t-stone-300 border-l-stone-300 border-r-stone-200 border-b-stone-200'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5 relative">
                      <label 
                        className={`text-[9.5px] font-mono uppercase font-black tracking-widest transition-colors flex items-center gap-1 ${
                          focusedField === 'company' ? 'text-[#059212]' : 'text-stone-400'
                        }`}
                      >
                        <Building2 className="w-3 h-3" />
                        Company / Contractor (Optional)
                      </label>
                      <div className="relative">
                        <input 
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="e.g., Summit Construction Group"
                          className={`w-full bg-[#FBF9F5] rounded-xl px-4 py-3 text-stone-850 text-sm border focus:bg-white focus:outline-none transition-all placeholder:text-stone-400 font-semibold shadow-[offset_1px_1px_3px_rgba(0,0,0,0.03)] ${
                            focusedField === 'company' 
                              ? 'border-[#059212] ring-2 ring-[#059212]/10' 
                              : 'border-t-stone-300 border-l-stone-300 border-r-stone-200 border-b-stone-200'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5 relative">
                      <label 
                        className={`text-[9.5px] font-mono uppercase font-black tracking-widest transition-colors flex items-center gap-1 ${
                          focusedField === 'message' ? 'text-[#059212]' : 'text-stone-400'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Inquiry / Specifications Details *
                      </label>
                      <div className="relative">
                        <textarea 
                          rows={4}
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Details on project size, specialized block density options, or required sample packets..."
                          className={`w-full bg-[#FBF9F5] rounded-xl px-4 py-3 text-stone-850 text-sm border focus:bg-white focus:outline-none transition-all placeholder:text-stone-400 font-semibold shadow-[offset_1px_1px_3px_rgba(0,0,0,0.03)] ${
                            focusedField === 'message' 
                              ? 'border-[#059212] ring-2 ring-[#059212]/10' 
                              : 'border-t-stone-300 border-l-stone-300 border-r-stone-200 border-b-stone-200'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Tactile Motion Action Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-xl font-mono text-xs font-black tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:translate-y-[4px] active:shadow-none shadow-[0_4px_0px_#046b0d] ${
                          isSubmitting 
                            ? 'bg-stone-200 text-stone-400 border border-stone-300 pointer-events-none shadow-none translate-y-[4px]' 
                            : 'bg-[#059212] hover:bg-[#048210] text-white border-b-4 border-[#046b0d] hover:brightness-[1.02]'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
                            Establishing Satellite Link...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-green-200" />
                            Submit Envelope Inquiry
                          </>
                        )}
                      </button>
                    </div>

                    <span className="text-[9px] font-mono text-stone-400 tracking-wider block text-center mt-2 font-bold leading-none">
                      SWIFT DISPATCH PROTOCOLS // ACTIVE SECURE SESSION
                    </span>

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>

        </div>

      </div>
    </section>
  );
}
