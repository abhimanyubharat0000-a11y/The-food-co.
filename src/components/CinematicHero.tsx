import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BurgerFilmScrubber } from './BurgerFilmScrubber';
import { Burger3DScene } from './Burger3DScene';
import { ASSEMBLY_STEPS, getCurrentStep } from '../utils/assemblyLogic';
import {
  playWhoosh,
  playThud,
  playGoldChime,
  getSoundMuted,
  setSoundMuted,
} from '../utils/soundEffects';
import {
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  ChevronDown,
  ArrowDown,
  Compass,
  RotateCw,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CinematicHeroProps {
  onExploreMenu: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onExploreMenu }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinTargetRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(ASSEMBLY_STEPS[0]);
  const [viewMode, setViewMode] = useState<'film' | '3d'>('film');
  const [explodeFactor, setExplodeFactor] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const lastStepIdRef = useRef(1);

  // Setup GSAP ScrollTrigger for pinned scroll scrubbing
  useEffect(() => {
    const pinEl = pinTargetRef.current;
    const container = containerRef.current;
    if (!pinEl || !container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinEl,
      scrub: 0.25, // smooth scrubbing
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        const current = getCurrentStep(p);
        setActiveStep(current);

        // Sound trigger on step advancement
        if (current.id !== lastStepIdRef.current) {
          if (current.id === 8) {
            playGoldChime();
          } else if (current.id > lastStepIdRef.current) {
            playWhoosh();
            setTimeout(() => playThud(70 + current.id * 10), 120);
          }
          lastStepIdRef.current = current.id;
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const toggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (!nextMuted) {
      playGoldChime();
    }
  };

  const handleManualScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setActiveStep(getCurrentStep(newProgress));

    // Scroll window proportionally
    const container = containerRef.current;
    if (container) {
      const top = container.offsetTop;
      const height = container.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + height * newProgress,
        behavior: 'auto',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-assembly"
      className="relative w-full h-[450vh] bg-[#070709]"
    >
      {/* Pinned viewport frame */}
      <div
        ref={pinTargetRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Background 3D or Film Canvas */}
        <div className="absolute inset-0 z-0">
          {viewMode === 'film' ? (
            <BurgerFilmScrubber progress={progress} />
          ) : (
            <Burger3DScene
              progress={progress}
              explodeFactor={explodeFactor}
              interactive={true}
            />
          )}
        </div>

        {/* Ambient Dark Gradients for contrast */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-transparent pointer-events-none z-10" />

        {/* Top Header Floating Badge / Mode Toggle */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-24 md:pt-28 flex items-center justify-between">
          {/* Active Step Indicator Pill */}
          <div className="flex items-center gap-3 bg-[#121216]/80 border border-amber-500/20 rounded-full px-4 py-2 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-cinzel text-xs font-semibold tracking-widest text-amber-300 uppercase">
              {activeStep.subhead}
            </span>
          </div>

          {/* View Mode & Audio Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#121216]/90 border border-amber-500/20 rounded-full p-1 shadow-xl">
              <button
                type="button"
                onClick={() => setViewMode('film')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'film'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Cinematic Commercial Scrub"
              >
                Commercial 4K
              </button>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === '3d'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Interactive 3D WebGL Studio"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Studio</span>
              </button>
            </div>

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={toggleAudio}
              className="p-2.5 rounded-full bg-[#121216]/90 border border-amber-500/20 text-amber-300 hover:text-amber-100 hover:border-amber-400/40 transition-colors shadow-xl"
              aria-label={isAudioMuted ? 'Enable Sound' : 'Mute Sound'}
              title={isAudioMuted ? 'Sound FX Off' : 'Sound FX Active'}
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>
          </div>
        </div>

        {/* Center Side Info Cards (Appearing dynamically during scroll) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pointer-events-none flex flex-col justify-center flex-1">
          {progress < 0.88 ? (
            <div className="max-w-md bg-[#0e0e12]/85 border border-amber-500/25 p-5 md:p-6 rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-amber-400 tracking-wider uppercase font-semibold">
                  {activeStep.tag}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {Math.round(progress * 100)}% Stacked
                </span>
              </div>
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-2">
                {activeStep.name}
              </h2>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                {activeStep.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-amber-300/80">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>100% Pure Vegetarian Kitchen Guarantee</span>
              </div>
            </div>
          ) : (
            /* Final Message: GOOD FOOD. GREAT CRAVINGS. */
            <div className="text-center mx-auto max-w-2xl pointer-events-auto transform transition-all duration-500">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel font-semibold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Masterpiece Assembled
              </span>
              <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gold-gradient uppercase mb-4 leading-tight">
                Good Food.
                <br />
                Great Cravings.
              </h1>
              <p className="text-zinc-300 text-sm md:text-base font-light max-w-lg mx-auto mb-8 leading-relaxed">
                Slow-crafted vegetarian indulgence. From fire-roasted buns to crispy plant-powered patties, experience food made for pure obsession.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-cinzel font-bold text-xs md:text-sm tracking-wider uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Explore Our Menu
                </button>
                <a
                  href="#location"
                  className="px-6 py-3.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-200 font-cinzel font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-zinc-800 transition-colors"
                >
                  Visit The Food Co.
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Ergonomic Dock: Scrub Slider & Step Indicators */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-6">
          <div className="bg-[#101014]/90 border border-amber-500/20 rounded-2xl p-4 backdrop-blur-md shadow-2xl flex flex-col gap-3">
            {/* Top row: step dots and scrub label */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-cinzel text-amber-200 uppercase font-semibold">
                  Assembly Scrub
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  (Scroll page or drag slider)
                </span>
              </div>

              {/* 3D explode toggle when in 3D mode */}
              {viewMode === '3d' && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400 font-mono">Explode:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={explodeFactor}
                    onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                    className="w-24 accent-amber-500 cursor-pointer"
                    aria-label="Explode 3D layers"
                  />
                  <span className="text-[10px] text-amber-400 font-mono">
                    {Math.round(explodeFactor * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Scrub Slider Input */}
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={progress}
                onChange={handleManualScrub}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
                aria-label="Burger Assembly Progress"
              />
            </div>

            {/* Step markers */}
            <div className="grid grid-cols-8 gap-1 pt-1">
              {ASSEMBLY_STEPS.map((step) => {
                const isActive = activeStep.id >= step.id;
                const isCurrent = activeStep.id === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      const newProgress = step.scrollStart + 0.02;
                      setProgress(newProgress);
                      setActiveStep(step);
                      const container = containerRef.current;
                      if (container) {
                        const top = container.offsetTop;
                        const height = container.offsetHeight - window.innerHeight;
                        window.scrollTo({
                          top: top + height * newProgress,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className={`flex flex-col items-center group transition-all text-left ${
                      isCurrent ? 'opacity-100' : isActive ? 'opacity-70' : 'opacity-30'
                    }`}
                    title={step.name}
                  >
                    <div
                      className={`h-1.5 w-full rounded-full transition-all ${
                        isCurrent
                          ? 'bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                          : isActive
                          ? 'bg-amber-600'
                          : 'bg-zinc-800'
                      }`}
                    />
                    <span className="text-[9px] font-mono text-zinc-400 truncate w-full hidden sm:block mt-1">
                      0{step.id} {step.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Initial Scroll Down Helper Prompt */}
          {progress < 0.08 && (
            <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-zinc-400 animate-bounce">
              <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Scroll down to build your burger layer by layer</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
