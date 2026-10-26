import React from 'react';
import { ArrowRight, MapPin, Sparkles, MessageCircle } from 'lucide-react';

export const FinalCta: React.FC = () => {
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    'Hi The Food Co! I would like to place an order from your menu.'
  )}`;

  return (
    <section className="relative py-32 md:py-44 bg-[#060608] overflow-hidden border-t border-zinc-900">
      {/* Background Hero Burger Close-up Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/frames/frame_0115.jpg"
          alt="The Food Co. Handcrafted Burger"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.08] scale-105"
        />
        {/* Radial dark gradient overlay to ensure perfect typography legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(8,8,10,0.5)_0%,_#060608_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#08080a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Pre-title badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-semibold tracking-widest uppercase mb-6 shadow-xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          The Final Touch
        </div>

        {/* Headline */}
        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gold-gradient uppercase tracking-tight mb-6 leading-[1.1]">
          Your Next Craving Starts Here.
        </h2>

        {/* Supporting text */}
        <p className="font-playfair text-xl sm:text-2xl md:text-3xl text-amber-200/90 italic font-medium mb-10 tracking-wide">
          Good Food. Great Cravings.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#location"
            className="px-9 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-cinzel font-bold text-xs md:text-sm tracking-wider uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
          >
            <MapPin className="w-4 h-4 fill-black" />
            <span>Find Us</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-zinc-950/80 border border-amber-500/30 text-amber-200 font-cinzel font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-zinc-900 transition-colors backdrop-blur-md flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Direct Order</span>
          </a>
        </div>

        {/* Brand Signoff */}
        <div className="mt-14 flex items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>100% Pure Vegetarian Gourmet Kitchen • Sector 11, Gurugram</span>
        </div>
      </div>
    </section>
  );
};
