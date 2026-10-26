import React from 'react';
import { ShieldCheck, Flame, Sparkles, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="relative py-28 md:py-36 bg-[#0a0a0d] overflow-hidden">
      {/* Subtle gold radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/5 blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Pre-tag */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-cinzel font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            The Culinary Philosophy
          </span>
        </div>

        {/* Primary Headline */}
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-gold-gradient uppercase tracking-tight max-w-4xl mx-auto mb-8 leading-[1.15]">
          Your Cravings Deserve Something Better.
        </h2>

        {/* Lead Narrative */}
        <p className="text-zinc-300 text-base md:text-xl font-light text-center max-w-3xl mx-auto leading-relaxed mb-16">
          At <strong className="text-amber-200 font-medium">THE FOOD CO.</strong>, we rejected the notion that vegetarian dining is an afterthought or a compromise. We elevate everyday fast food into a culinary obsession — combining artisanal fire-bakes, complex spice reductions, and wholesome plant-based textures that hit with immediate crunch and lingering richness.
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121217] border border-zinc-800/80 hover:border-amber-500/40 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              100% Pure Vegetarian
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              A sacred, dedicated kitchen free from non-vegetarian cross-contamination. Pure ingredients, pristine ethics.
            </p>
          </div>

          <div className="bg-[#121217] border border-zinc-800/80 hover:border-amber-500/40 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              Flame-Kissed Crunch
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Smoked paneer, wok-charred noodles, and golden smashed quinoa patties with authentic high-heat maillard depth.
            </p>
          </div>

          <div className="bg-[#121217] border border-zinc-800/80 hover:border-amber-500/40 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              House-Secret Relishes
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Slow-simmered smoky tomato reductions, roasted garlic aioli, and freshly pounded green chillies. Zero synthetic flavourings.
            </p>
          </div>

          <div className="bg-[#121217] border border-zinc-800/80 hover:border-amber-500/40 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white mb-2">
              Daily Farm Harvest
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Hydroponic crisp butterhead lettuce, vine-plucked tomatoes, and crunchy purple shallots sliced fresh per order.
            </p>
          </div>
        </div>

        {/* Editorial Quote Banner */}
        <div className="mt-16 bg-gradient-to-r from-zinc-900/90 via-[#16161c] to-zinc-900/90 border border-amber-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="text-4xl text-amber-500/20 font-serif leading-none mb-3">“</div>
          <p className="font-playfair text-xl md:text-2xl text-amber-100/90 italic font-medium max-w-2xl mx-auto mb-4">
            We don't make fast food to fill time. We craft it to create cravings you remember hours later.
          </p>
          <span className="font-cinzel text-xs tracking-widest text-amber-400 uppercase font-bold">
            Executive Kitchen Team — The Food Co.
          </span>
        </div>
      </div>
    </section>
  );
};
