import React, { useEffect, useRef, useState } from 'react';
import { TOTAL_FRAMES, progressToFrameIndex } from '../utils/assemblyLogic';

interface BurgerFilmScrubberProps {
  progress: number; // 0.0 to 1.0
  onFrameLoaded?: (loadedCount: number, total: number) => void;
}

export const BurgerFilmScrubber: React.FC<BurgerFilmScrubberProps> = ({
  progress,
  onFrameLoaded
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentRenderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number>(0);

  // Preload frames progressively
  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `/frames/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
        onFrameLoaded?.(count, TOTAL_FRAMES);
        if (count === 1) {
          // Immediately draw first frame
          drawFrame(1);
        }
        if (count >= 15) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        count++;
        setLoadedCount(count);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  const drawFrame = (frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameNum - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover scale calculation
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, nx, ny, nw, nh);

    currentRenderedFrameRef.current = frameNum;
  };

  // Sync scroll progress to canvas draw
  useEffect(() => {
    const targetFrame = progressToFrameIndex(progress, TOTAL_FRAMES);

    if (targetFrame !== currentRenderedFrameRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = requestAnimationFrame(() => {
        drawFrame(targetFrame);
      });
    }
  }, [progress, loadedCount]);

  // Handle window resize for crisp retina resolution
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const targetFrame = progressToFrameIndex(progress, TOTAL_FRAMES);
      drawFrame(targetFrame);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#070709] select-none">
      {/* Background warm commercial spotlight atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(163,116,42,0.18)_0%,_rgba(10,10,12,0.85)_65%,_#070709_100%)] z-0" />

      {/* Main Scrubbing Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full object-cover filter contrast-[1.03] brightness-[1.01]"
        style={{ maxWidth: '100vw', maxHeight: '100vh' }}
      />

      {/* Subtle Warm Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/60" />
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-r from-[#08080a]/40 via-transparent to-[#08080a]/40" />

      {/* Initial Fast Loading Indicator */}
      {!isReady && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#08080a]/90 backdrop-blur-sm transition-opacity duration-500">
          <div className="w-14 h-14 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin mb-4" />
          <p className="font-cinzel text-xs tracking-[0.25em] text-amber-300 uppercase">
            Igniting Culinary Engine
          </p>
          <div className="w-48 h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-300 transition-all duration-200"
              style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 mt-2 font-mono">
            {Math.round((loadedCount / TOTAL_FRAMES) * 100)}% High-Res Frames
          </span>
        </div>
      )}
    </div>
  );
};
