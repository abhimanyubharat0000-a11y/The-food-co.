import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Assembly', href: '#hero-assembly' },
    { name: 'Our Story', href: '#brand-story' },
    { name: 'Signature Bites', href: '#signature-bites' },
    { name: 'Freshness', href: '#freshness-flavour' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090c]/90 border-b border-zinc-800/80 backdrop-blur-md py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero-assembly" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1px] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <div className="w-full h-full rounded-full bg-[#09090c] flex items-center justify-center">
              <span className="font-cinzel text-amber-300 font-extrabold text-sm tracking-wider">
                FC
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel font-extrabold text-base md:text-lg tracking-widest text-white group-hover:text-amber-200 transition-colors uppercase">
              The Food Co.
            </span>
            <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase">
              Good Food. Great Cravings.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-cinzel font-medium tracking-widest text-zinc-300 hover:text-amber-300 transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+919876543210"
            className="p-2 rounded-full text-zinc-400 hover:text-amber-300 hover:bg-zinc-800 transition-colors"
            title="Call Store"
            aria-label="Call Store"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href="#location"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-cinzel font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Us</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c10] border-b border-zinc-800 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-cinzel font-semibold tracking-wider text-zinc-300 hover:text-amber-300 py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-amber-500 text-black text-center font-cinzel font-bold text-xs tracking-wider uppercase"
              >
                Visit Counter • Sector 11 Gurugram
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
