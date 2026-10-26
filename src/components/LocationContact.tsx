import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Clock,
  Compass,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export const LocationContact: React.FC = () => {
  // Configurable contact placeholders as specified
  const phoneNumber = '+919876543210';
  const displayPhone = '+91 98765 43210';
  const whatsappNumber = '919876543210';
  const addressText = 'Plot No. 275/20, Shanti Nagar, Heera Nagar, Sector 11, Gurugram, Haryana 122001';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi The Food Co! I would like to inquire about your vegetarian menu and place an order.'
  )}`;

  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="relative py-28 md:py-36 bg-[#08080a] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-cinzel font-semibold tracking-widest uppercase mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Kitchen & Counter
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-gradient uppercase tracking-tight mb-4">
            Visit The Food Co.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Experience our fresh-off-the-flame vegetarian creations in Sector 11, Gurugram. Dine-in, curbside pickup, and direct counter service.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Business Details & Action Buttons */}
          <div className="lg:col-span-6 bg-[#121217] border border-zinc-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Open Today • 11:00 AM – 11:30 PM
                </span>
              </div>

              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-3">
                THE FOOD CO.
              </h3>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-zinc-100 leading-snug">
                        Plot No. 275/20, Shanti Nagar, Heera Nagar
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Sector 11, Gurugram, Haryana 122001
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex-shrink-0"
                    title="Copy Address"
                    aria-label="Copy Address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Operating Hours Info */}
              <div className="flex items-center gap-3 text-xs text-zinc-400 mb-8 font-light">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Monday – Sunday: 11:00 AM to 11:30 PM (Fresh service all day)</span>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-zinc-800/80">
              {/* Call Button */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex-1 py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-amber-500/20 text-zinc-200 hover:text-amber-200 border border-zinc-800 hover:border-amber-500/40 text-xs font-cinzel font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Us</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-xs font-cinzel font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {/* Google Maps Button */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:brightness-110 text-xs font-cinzel font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Compass className="w-4 h-4" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Visual Map Card */}
          <div className="lg:col-span-6 bg-[#121217] border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Map Preview Graphic */}
            <div className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 mb-6">
              {/* Stylized Dark Grid Map Simulation */}
              <div
                className="absolute inset-0 bg-cover bg-center filter contrast-[1.1] opacity-75"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-[#0c0c10]/80 backdrop-blur-[2px]" />

              {/* Center Map Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-amber-500/30 animate-ping absolute inset-0" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black font-bold shadow-xl border-2 border-white">
                    <MapPin className="w-6 h-6 fill-black" />
                  </div>
                </div>
                <div className="mt-3 bg-black/90 border border-amber-500/40 px-3 py-1.5 rounded-full text-[11px] font-cinzel font-bold text-amber-300 shadow-xl tracking-wider">
                  THE FOOD CO.
                </div>
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute bottom-3 right-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-zinc-700 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Directions</span>
                </a>
              </div>
            </div>

            {/* Service Features Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                <span className="text-[11px] font-mono text-zinc-300 block">Dine-In</span>
                <span className="text-[10px] text-zinc-500">Cozy Counter</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                <span className="text-[11px] font-mono text-zinc-300 block">Takeaway</span>
                <span className="text-[10px] text-zinc-500">Fast Boxed</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                <span className="text-[11px] font-mono text-zinc-300 block">Pure Veg</span>
                <span className="text-[10px] text-zinc-500">100% Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
