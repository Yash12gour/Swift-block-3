import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../googleAuth';
import { User } from 'firebase/auth';
import { 
  MessageSquare, 
  LogOut, 
  RefreshCw, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  FileSpreadsheet, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  Hash
} from 'lucide-react';

interface Space {
  name: string;
  displayName: string;
  spaceType: string;
}

interface GoogleChatPortalProps {
  blockQty: number;
  co2MitigatedKg: number;
  structuralWeightSavedTons: number;
  blockVolumeM3: number;
  fullName: string;
  organization: string;
  inquiryType: string;
}

export default function GoogleChatPortal({
  blockQty,
  co2MitigatedKg,
  structuralWeightSavedTons,
  blockVolumeM3,
  fullName,
  organization,
  inquiryType
}: GoogleChatPortalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Chat API states
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(false);
  const [customSpaceId, setCustomSpaceId] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Message dispatcher states
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Mutation Confirmation Panel State
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');

  // Auto-generate templates based on active block calculators
  const generateTemplateText = (type: 'specs' | 'consult' | 'demo') => {
    const orgStr = organization ? ` (${organization})` : '';
    const nameStr = fullName ? fullName : 'A site builder / builder';
    
    if (type === 'specs') {
      return `📦 *SWIFT ECO BLOX - DIGITAL DISPATCH ORDER* 📦\n\n` +
             `*Builder/Contact:* ${nameStr}${orgStr}\n` +
             `*Inquiry Nature:* Factory Batch Booking\n` +
             `*Block Volume request:* ${blockVolumeM3.toFixed(2)} m³ (${blockQty.toLocaleString()} core units)\n` +
             `🍃 *CO₂ Offset Saved:* ${co2MitigatedKg.toLocaleString()} kg\n` +
             `🏗️ *Structural Weight Saved:* ${structuralWeightSavedTons.toLocaleString()} tons\n\n` +
             `_Note: Submitted from the online Swift Eco Blox technical desk._`;
    } else if (type === 'consult') {
      return `❓ *AAC TECHNICAL RESEARCH CONSULTATION* ❓\n\n` +
             `*Inquirer:* ${nameStr}${orgStr}\n` +
             `*Inquiry Scope:* ${inquiryType.toUpperCase()}\n` +
             `*Current calculator load:* ${blockQty.toLocaleString()} concrete units\n` +
             `*Required action:* Swift Industries engineering desk review requested regarding compressive load parameters (4-5 N/mm² standard).`;
    } else {
      return `⚙️ *SAMPLE SHIPMENT REQUEST TRIGGER* ⚙️\n\n` +
             `*Contact:* ${nameStr}${orgStr}\n` +
             `*Requested Material:* Concrete block sample (standard layout scale: 600x200x150 mm).\n` +
             `*Request details:* Please coordinate delivery coordinates with direct user channel.`;
    }
  };

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch spaces when token changes
  useEffect(() => {
    if (token) {
      fetchSpaces();
    }
  }, [token]);

  // Handle direct sign in
  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMsg('');
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authorization failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout trigger
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setSpaces([]);
      setSelectedSpace('');
      setNeedsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Google Chat spaces
  const fetchSpaces = async () => {
    if (!token) return;
    setIsLoadingSpaces(true);
    setErrorMsg('');
    try {
      const response = await fetch('https://chat.googleapis.com/v1/spaces', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to load Google Chat rooms. Status: ${response.status}`);
      }
      const data = await response.json();
      const loadedSpaces = data.spaces || [];
      setSpaces(loadedSpaces);
      
      if (loadedSpaces.length > 0) {
        setSelectedSpace(loadedSpaces[0].name);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Could not fetch spaces. Check workspace connection.');
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  // Initiate message dispatch with confirmation safeguard
  const handleInitiateSend = (text: string) => {
    if (!text.trim()) {
      setErrorMsg('Please specify some text or select a template to dispatch!');
      return;
    }
    const targetSpace = showCustomInput ? customSpaceId : selectedSpace;
    if (!targetSpace) {
      setErrorMsg('Please select a target space or input a Space ID.');
      return;
    }
    setErrorMsg('');
    setPendingMessage(text);
    setShowConfirmation(true);
  };

  // Dispatch the message actually
  const handleConfirmSend = async () => {
    setShowConfirmation(false);
    if (!token) return;
    setIsSending(true);
    setSendSuccess(false);
    setErrorMsg('');
    
    const targetSpace = showCustomInput ? customSpaceId : selectedSpace;
    try {
      const response = await fetch(`https://chat.googleapis.com/v1/${targetSpace}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: pendingMessage
        })
      });

      if (!response.ok) {
        const errDetail = await response.text();
        throw new Error(`API Error: ${response.status} - ${errDetail}`);
      }

      setSendSuccess(true);
      setMessageText('');
      setTimeout(() => setSendSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Dispatch failed. Verify space membership policies.');
    } finally {
      setIsSending(false);
    }
  };

  // Quick select a template
  const applyTemplate = (type: 'specs' | 'consult' | 'demo') => {
    const text = generateTemplateText(type);
    setMessageText(text);
  };

  return (
    <div id="google-chat-portal" className="bg-stone-900/30 border border-stone-850 rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-md shadow-2xl relative w-full">
      
      {/* Header section with clean branding */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-800 pb-5 mb-6">
        <div>
          <span className="text-[9px] font-mono text-green-400 font-bold uppercase tracking-widest block mb-1">
            INTEGRATED WORKSPACE SERVICE
          </span>
          <h4 className="font-display font-black text-white text-xl flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-400" />
            Google Chat Dispatch Portal
          </h4>
        </div>
        
        {user && (
          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className="flex flex-col text-right">
              <span className="text-[10px] sm:text-xs font-semibold text-white leading-none">
                {user.displayName || 'Google Member'}
              </span>
              <span className="text-[9px] font-mono text-stone-500 mt-0.5">
                {user.email}
              </span>
            </div>
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'pic'} 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />
            )}
            <button 
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-xl bg-stone-950 border border-stone-850 hover:border-red-500/30 text-stone-400 hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
              title="Disconnect Google Account"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {needsAuth ? (
        <div className="py-8 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-green-950 border border-green-900/40 rounded-2xl flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-green-405" />
          </div>
          <h5 className="font-display font-bold text-white text-base tracking-tight mb-2">
            Connect to Google Chat Space
          </h5>
          <p className="text-stone-400 text-xs max-w-sm mx-auto mb-6 leading-relaxed">
            Instantly dispatch your calculated brick quantity metrics, structural spec sheets, and project scopes directly to your company's internal Google Chat rooms.
          </p>

          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="gsi-material-button relative overflow-hidden transition-all active:scale-95 duration-200 cursor-pointer w-full max-w-xs"
            id="google-chat-signin-btn"
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper flex items-center justify-center gap-2 bg-white text-stone-900 border border-stone-200 px-5 py-3 rounded-xl font-bold text-xs select-none">
              <div className="gsi-material-button-icon shrink-0">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block', width: '18px', height: '18px' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]">
                {isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}
              </span>
            </div>
          </button>
          
          {errorMsg && (
            <div className="flex items-center gap-2 mt-4 text-red-400 bg-red-950/40 px-4 py-2 rounded-xl border border-red-900/40 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main Controls Header: Space selector */}
          <div className="bg-stone-950 border border-stone-850 rounded-2xl p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div>
                <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-wider block">
                  CHOOSE GOOGLE CHAT TARGET SPACE
                </span>
                <span className="text-[9px] text-stone-500">Pick where your dispatch envelope will go</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={fetchSpaces}
                  disabled={isLoadingSpaces}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                  title="Reload Space Listings"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingSpaces ? 'animate-spin' : ''}`} />
                  Refresh Rooms
                </button>
                <button
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    showCustomInput 
                      ? 'bg-green-950 border-green-800/40 text-green-400' 
                      : 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white'
                  }`}
                >
                  {showCustomInput ? 'Select Listed Room' : 'Manual Space ID'}
                </button>
              </div>
            </div>

            {isLoadingSpaces ? (
              <div className="py-4 text-center text-xs text-stone-500 font-mono flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 border border-stone-500 border-t-transparent rounded-full animate-spin" />
                Interrogating workspace chat rooms...
              </div>
            ) : showCustomInput ? (
              <div className="space-y-2">
                <input 
                  type="text"
                  placeholder="Insert Chat Space ID here (e.g., spaces/AAAAAAAAAAA)"
                  value={customSpaceId}
                  onChange={(e) => setCustomSpaceId(e.target.value)}
                  className="w-full bg-stone-900 rounded-xl px-4 py-2.5 text-stone-100 text-xs border border-stone-800 focus:border-green-600/60 focus:outline-hidden transition-all placeholder:text-stone-605"
                />
                <span className="text-[9px] font-mono text-stone-500 block">
                  Find the Space ID in the browser URL of Google Chat. Example: spaces/AAAAA_BBBBB
                </span>
              </div>
            ) : spaces.length === 0 ? (
              <div className="p-3 bg-stone-900 border border-stone-850 rounded-xl text-center text-xs text-stone-400 space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-stone-400">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span>No general Google Chat spaces found for this account.</span>
                </div>
                <p className="text-[10px] text-stone-500 leading-normal max-w-sm mx-auto">
                  Try creating a chat space first in your Google Chat app, or toggle "Manual Space ID" above and copy-paste the URL key.
                </p>
              </div>
            ) : (
              <div className="relative">
                <select 
                  value={selectedSpace}
                  onChange={(e) => setSelectedSpace(e.target.value)}
                  className="w-full bg-stone-900 rounded-xl px-4 py-2.5 text-stone-300 text-xs border border-stone-800 focus:border-green-600/60 focus:outline-hidden transition-all uppercase font-mono tracking-wider font-bold"
                >
                  {spaces.map(sp => (
                    <option key={sp.name} value={sp.name}>
                      💬 {sp.displayName || sp.name.replace('spaces/', 'Room: ')} [{sp.spaceType === 'DIRECT_MESSAGE' ? 'DM' : 'Space'}]
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Quick templates group */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
              PRE-COMPILED DISPATCH TEMPLATES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => applyTemplate('specs')}
                className="p-3 rounded-xl bg-stone-950 border border-stone-855 hover:border-green-800/40 text-left transition-all hover:bg-stone-900 group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-mono font-bold mb-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-green-400" />
                  Order Specs
                </div>
                <p className="text-[9px] text-stone-450 leading-relaxed">
                  Drafts standard calculations, total {blockQty.toLocaleString()} pieces, offsets & loads.
                </p>
              </button>
              
              <button
                type="button"
                onClick={() => applyTemplate('consult')}
                className="p-3 rounded-xl bg-stone-950 border border-stone-855 hover:border-green-800/40 text-left transition-all hover:bg-stone-900 group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs text-orange-400 font-mono font-bold mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
                  AAC Consultation
                </div>
                <p className="text-[9px] text-stone-450 leading-relaxed">
                  Inquires on thermal resistance and compressive guidelines with sample metrics.
                </p>
              </button>

              <button
                type="button"
                onClick={() => applyTemplate('demo')}
                className="p-3 rounded-xl bg-stone-950 border border-stone-855 hover:border-green-800/40 text-left transition-all hover:bg-stone-900 group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs text-stone-300 font-mono font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-stone-400" />
                  Sample Shipment
                </div>
                <p className="text-[9px] text-stone-450 leading-relaxed">
                  Triggers immediate sample evaluation on field site parameters.
                </p>
              </button>
            </div>
          </div>

          {/* Message input area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                MESSAGE ENVELOPE BODY (MARKDOWN SUPPORTED)
              </span>
              <span className="text-[9px] text-stone-600 font-mono">
                {messageText.length} characters
              </span>
            </div>
            <textarea 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
              placeholder="Select a dynamic template above or type your direct query..."
              className="w-full bg-stone-950 rounded-xl px-4 py-3 text-stone-100 text-xs border border-stone-850 focus:border-green-600/60 focus:outline-hidden transition-all placeholder:text-stone-600 font-mono"
            />
          </div>

          {/* Errors/success state display */}
          {errorMsg && (
            <div className="flex items-center gap-2 text-red-400 bg-red-950/30 px-4 py-2.5 rounded-xl border border-red-905 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {sendSuccess && (
            <div className="flex items-center gap-2 text-green-400 bg-green-950/40 px-4 py-2.5 rounded-xl border border-green-905 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 animate-bounce" />
              <span>Inquiry dispatched securely to Google Chat space! Check your space.</span>
            </div>
          )}

          {/* Core dispatch action */}
          <button
            type="button"
            onClick={() => handleInitiateSend(messageText)}
            disabled={isSending || (!selectedSpace && !showCustomInput)}
            className={`w-full py-4 rounded-xl font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isSending
                ? 'bg-stone-800 text-stone-550 border border-stone-705 pointer-events-none'
                : 'bg-green-600 hover:bg-green-500 active:scale-98 text-white shadow-lg shadow-green-950/40 border border-green-700'
            }`}
          >
            {isSending ? (
              <>
                <div className="w-4.5 h-4.5 border-2 border-stone-500 border-t-transparent rounded-full animate-spin" />
                Posting to Google Chat...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-green-300" />
                Dispatch to Google Chat Room
              </>
            )}
          </button>
          
          <p className="text-[9px] font-mono text-stone-600 leading-normal text-center">
            🔒 Fully authenticated connection to workspace servers. Active encryption secures payload logs during flight.
          </p>

        </div>
      )}

      {/* DETAILED WORKSPACE MUTATION CONFIRMATION SAFEGUARD MODAL */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmation(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs" 
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl z-10 flex flex-col gap-5 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-950/80 p-3 rounded-xl border border-green-800 text-green-400 shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-display font-black text-white text-lg tracking-tight">
                    Confirm Dispatch to Google Chat?
                  </h5>
                  <p className="text-stone-400 text-xs leading-relaxed mt-1">
                    You are sending an authorized material inquiry message on behalf of <strong className="text-white">{user?.displayName || 'your account'}</strong> to Google Chat Space <strong className="text-white">{showCustomInput ? customSpaceId : spaces.find(s => s.name === selectedSpace)?.displayName || selectedSpace}</strong>.
                  </p>
                </div>
              </div>

              {/* Box previewing the message content */}
              <div className="bg-stone-950 rounded-xl p-3.5 border border-stone-850 max-h-48 overflow-y-auto text-xs font-mono text-stone-300 whitespace-pre-line leading-relaxed">
                {pendingMessage}
              </div>

              <div className="flex items-center gap-3 w-full self-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-3 px-4 border border-stone-850 hover:border-stone-750 text-stone-400 hover:text-white transition-colors text-xs font-mono font-bold rounded-xl uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSend}
                  className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-mono font-black text-xs rounded-xl tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                >
                  Confirm Send
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
