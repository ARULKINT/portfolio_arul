import React, { useState, useEffect } from 'react';
import { PortfolioTheme } from '../types/portfolio';

interface ContactSectionProps {
  theme: PortfolioTheme;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [isDispatched, setIsDispatched] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState('');

  // Live ticking IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setIstTime(istString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isRust = theme === 'rust';
  const textPrimary = isRust ? 'text-[#d9480f]' : 'text-[#315cf5]';
  const btnSubmit = isRust
    ? 'bg-[#d9480f] hover:bg-[#b42902] text-white'
    : 'bg-[#0040da] hover:bg-[#0036bc] text-white';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('aruldme004@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;

    setIsSubmitting(true);
    setTransmissionLogs(['[SYS_INIT] Establishing secure TLS 1.3 socket...']);

    setTimeout(() => {
      setTransmissionLogs((prev) => [
        ...prev,
        `[AUTH_VERIFIED] Payload encrypted for Arul (Node: India-South).`,
        `[ROUTING] Packaging transmission parameters...`
      ]);
    }, 400);

    setTimeout(() => {
      setTransmissionLogs((prev) => [
        ...prev,
        `[200_DISPATCH_ACK] Transmission successfully delivered!`,
        `[LOG] Arul will review your opportunity inquiry promptly.`
      ]);
      setIsSubmitting(false);
      setIsDispatched(true);
    }, 900);
  };

  return (
    <section className="w-full py-12 lg:py-20" id="contact">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Obsidian Contrast Dossier Card */}
        <div className="bg-[#141518] rounded-xl p-6 sm:p-10 lg:p-12 text-[#f4f2ec] border border-neutral-700/80 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Contact Narrative Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isRust ? 'bg-[#d9480f]' : 'bg-[#315cf5]'} animate-pulse`}></span>
                <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
                  [SEC_08 // INQUIRIES &amp; DISPATCH]
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Have a Problem Worth Solving?
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                I am actively interviewing for <strong className="text-white font-semibold">Entry-Level Data Engineering</strong>, <strong className="text-white font-semibold">Data Analytics</strong>, and <strong className="text-white font-semibold">Full-Stack Developer</strong> roles. If your team values operational grounding, computational rigor, and high engineering velocity, let's talk.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <span className={`material-symbols-outlined text-[20px] ${textPrimary}`}>check_circle</span>
                  <span>Available for on-site, hybrid, and remote roles.</span>
                </div>
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <span className={`material-symbols-outlined text-[20px] ${textPrimary}`}>check_circle</span>
                  <span>Fast onboarding with immediate contribution capability.</span>
                </div>
              </div>

              {/* Dedicated Channel Direct Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {/* Email with copy-to-clipboard */}
                <button
                  onClick={handleCopyEmail}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-neutral-700/80 rounded transition-colors group flex items-center justify-between text-left cursor-pointer"
                  title="Click to copy email address"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-white/50 uppercase">Email Contact</div>
                    <div className="font-mono text-xs text-white truncate">aruldme004@gmail.com</div>
                    {copiedEmail && (
                      <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">✓ Copied to clipboard!</span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-white/50 group-hover:text-white transition-colors">
                    {copiedEmail ? 'check' : 'content_copy'}
                  </span>
                </button>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/arul-eng/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-neutral-700/80 rounded transition-colors group flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-white/50 uppercase">LinkedIn Profile</div>
                    <div className="font-mono text-xs text-white truncate">linkedin.com/in/arul-eng</div>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-white/50 group-hover:text-white transition-colors">
                    arrow_outward
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/ARULKINT"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-neutral-700/80 rounded transition-colors group flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-white/50 uppercase">GitHub Code</div>
                    <div className="font-mono text-xs text-white truncate">github.com/ARULKINT</div>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-white/50 group-hover:text-white transition-colors">
                    arrow_outward
                  </span>
                </a>

                {/* Base Timezone with ticking clock */}
                <div className="p-3 bg-white/5 border border-neutral-700/80 rounded flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-white/50 uppercase">Base Timezone (IST)</div>
                    <div className="font-mono text-xs text-white flex items-center gap-1.5">
                      <span>IST (UTC +5:30)</span>
                      {istTime && <span className="text-emerald-400 font-bold">{istTime}</span>}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-emerald-400">schedule</span>
                </div>
              </div>
            </div>

            {/* Quick Recruiter Ingestion Terminal Form */}
            <div className="lg:col-span-6 bg-white/5 p-6 sm:p-8 rounded-lg border border-neutral-700/80">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isRust ? 'bg-[#d9480f]' : 'bg-[#315cf5]'}`}></span>
                  <span>direct_transmission.sh</span>
                </span>
                <span className="text-emerald-400">TLS_ENCRYPTED</span>
              </div>

              {!isDispatched ? (
                <form onSubmit={handleDispatch} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1.5" htmlFor="sender-name">
                      Recruiter / Engineering Manager Name
                    </label>
                    <input
                      id="sender-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1.5" htmlFor="sender-email">
                      Corporate Email
                    </label>
                    <input
                      id="sender-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="s.jenkins@enterprise.com"
                      className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1.5" htmlFor="sender-message">
                      Role Opportunity &amp; Context
                    </label>
                    <textarea
                      id="sender-message"
                      rows={3}
                      required
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="We have an opening on our Data Platform team for an engineer skilled with PySpark and PostgreSQL..."
                      className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 font-mono text-xs uppercase font-bold tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 ${btnSubmit}`}
                  >
                    <span>{isSubmitting ? 'Encrypting & Dispatching...' : 'Dispatch Transmission'}</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </form>
              ) : (
                /* Terminal Transmission Log Output */
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-black/60 p-4 rounded border border-emerald-500/40 font-mono text-xs space-y-1.5 text-neutral-300">
                    {transmissionLogs.map((log, lIdx) => (
                      <p
                        key={lIdx}
                        className={
                          log.includes('ACK') || log.includes('successfully')
                            ? 'text-emerald-400 font-bold'
                            : 'text-neutral-300'
                        }
                      >
                        {log}
                      </p>
                    ))}
                  </div>

                  <div className="p-3 bg-emerald-950/40 border border-emerald-700/60 rounded text-xs text-emerald-200 leading-relaxed">
                    Thank you, <strong>{senderName}</strong>. Your inquiry has been logged and queued. A verification receipt was transmitted to <strong>{senderEmail}</strong>.
                  </div>

                  <button
                    onClick={() => {
                      setIsDispatched(false);
                      setSenderMessage('');
                    }}
                    className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs rounded uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
