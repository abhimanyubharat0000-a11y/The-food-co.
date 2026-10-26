import React from 'react';
import { Leaf, SunMedium, Clock, Award } from 'lucide-react';

export const FreshnessFlavour: React.FC = () => {
  return (
    <section id="freshness-flavour" className="relative py-28 md:py-36 bg-[#0a0a0d] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-cinzel font-semibold tracking-widest uppercase mb-4">
            <Leaf className="w-3.5 h-3.5" />
            Freshness & Flavour
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-gradient uppercase tracking-tight mb-4">
            Crafted With Care. Measured In Flavour.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            Every layer in our kitchen is prepared with patience and technique. We focus on natural crunch, balanced acidity, and deep caramelization.
          </p>
        </div>

        {/* Editorial 3-Card Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#121217] border border-zinc-800/90 rounded-3xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col">
            <div className="relative h-64 overflow-hidden bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                alt="Fresh garden vegetables"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/20" />
              <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-amber-300">
                <SunMedium className="w-5 h-5" />
              </div>
            </div>
            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  Field to Kitchen
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white mt-1 mb-3">
                  Crisp Hydroponic Greens
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Washed in cold filtered water and spun crisp just before assembly so every bite retains its crisp, refreshing snap.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
                Harvested Fresh Daily
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#121217] border border-zinc-800/90 rounded-3xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col">
            <div className="relative h-64 overflow-hidden bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
                alt="Artisan baked buns"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/20" />
              <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-amber-300">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  Small-Batch Bakes
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white mt-1 mb-3">
                  Toasted Sesame Brioche
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Light, airy, and gently enriched. Each bun is split and grilled on a flat-top until golden-brown and fragrant.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
                Baked Fresh Each Morning
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#121217] border border-zinc-800/90 rounded-3xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col">
            <div className="relative h-64 overflow-hidden bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                alt="Spices and secret relishes"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/20" />
              <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-amber-300">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  Chef Formulations
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white mt-1 mb-3">
                  Signature Spiced Relishes
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Crafted in-house from vine-ripened tomatoes, roasted aromatics, and toasted whole spices for balanced umami.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
                House Cooked • Zero Preservatives
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
