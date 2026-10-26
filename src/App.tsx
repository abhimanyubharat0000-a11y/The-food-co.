import React from 'react';
import { Navbar } from './components/Navbar';
import { CinematicHero } from './components/CinematicHero';
import { BrandStory } from './components/BrandStory';
import { SignatureBitesMenu } from './components/SignatureBitesMenu';
import { FreshnessFlavour } from './components/FreshnessFlavour';
import { LocationContact } from './components/LocationContact';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

export default function App() {
  const handleExploreMenu = () => {
    const el = document.getElementById('signature-bites');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section A: Cinematic Scroll-Driven Burger Assembly Hero */}
        <CinematicHero onExploreMenu={handleExploreMenu} />

        {/* Section B: Brand Story */}
        <BrandStory />

        {/* Section C: Our Signature Bites Menu */}
        <SignatureBitesMenu />

        {/* Section D: Freshness and Flavour */}
        <FreshnessFlavour />

        {/* Section E: Location and Contact */}
        <LocationContact />

        {/* Section F: Final Cinematic CTA */}
        <FinalCta />
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
