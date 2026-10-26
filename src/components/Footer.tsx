import React from 'react';
import { MapPin, Phone, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050507] border-t border-zinc-900 py-16 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="font-cinzel text-amber-300 font-extrabold text-xs">
                    FC
                  </span>
                </div>
              </div>
              <span className="font-cinzel font-bold text-lg text-white uppercase tracking-wider">
                The Food Co.
              </span>
            </div>
            <p className="font-playfair italic text-amber-200/90 text-sm">
              Good Food. Great Cravings.
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Crafting premium vegetarian food commercials into reality. Fire-toasted brioche, hand-blended herb patties, and slow reductions.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              100% Dedicated Pure Vegetarian
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#hero-assembly" className="hover:text-amber-300 transition-colors">
                  3D Burger Assembly Engine
                </a>
              </li>
              <li>
                <a href="#brand-story" className="hover:text-amber-300 transition-colors">
                  Our Culinary Philosophy
                </a>
              </li>
              <li>
                <a href="#signature-bites" className="hover:text-amber-300 transition-colors">
                  Artisanal Burgers & Rolls
                </a>
              </li>
              <li>
                <a href="#freshness-flavour" className="hover:text-amber-300 transition-colors">
                  Freshness & Daily Harvest
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-300 transition-colors">
                  Store Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kitchen & Hours */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Kitchen Hours
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-zinc-300 font-medium">Monday – Sunday</p>
              <p className="text-amber-300/90 font-mono">11:00 AM – 11:30 PM</p>
              <p className="text-zinc-500 pt-2 text-[11px] leading-relaxed">
                Counter dine-in, fast takeaway, and pre-packaged curbside collections.
              </p>
            </div>
          </div>

          {/* Col 4: Store Address */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300 leading-snug">
                  Plot No. 275/20, Shanti Nagar, Heera Nagar, Sector 11, Gurugram, Haryana 122001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-zinc-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} THE FOOD CO. All Rights Reserved. Good Food. Great Cravings.</p>
          <p className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>Crafted for true food lovers</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
