import { AssemblyStep } from '../types/burger';

export const TOTAL_FRAMES = 120;

export const ASSEMBLY_STEPS: AssemblyStep[] = [
  {
    id: 1,
    name: 'Toasted Sesame Bun',
    subhead: 'Step 1 of 8 — The Foundation',
    description: 'Golden-brown toasted brioche base lightly buttered and warmed to perfection over flame.',
    scrollStart: 0.0,
    scrollEnd: 0.12,
    color: '#d4af37',
    tag: 'Artisan Bake',
  },
  {
    id: 2,
    name: 'Artisan Veggie Patty',
    subhead: 'Step 2 of 8 — 100% Vegetarian Core',
    description: 'Hand-crafted blend of spiced lentils, organic quinoa, roasted sweet corn, and garden herbs.',
    scrollStart: 0.12,
    scrollEnd: 0.26,
    color: '#c97a38',
    tag: 'Crispy & Tender',
  },
  {
    id: 3,
    name: 'Molten Cheddar Slice',
    subhead: 'Step 3 of 8 — Decadent Blanket',
    description: 'Rich vegetarian cheddar gently melting across the sizzling hot textured patty.',
    scrollStart: 0.26,
    scrollEnd: 0.40,
    color: '#f59e0b',
    tag: 'Gooey Melt',
  },
  {
    id: 4,
    name: 'Crisp Lettuce & Tomato',
    subhead: 'Step 4 of 8 — Garden Freshness',
    description: 'Crunchy hydroponic green lettuce followed by thick, sweet vine-ripened red tomato slices.',
    scrollStart: 0.40,
    scrollEnd: 0.55,
    color: '#10b981',
    tag: 'Daily Harvest',
  },
  {
    id: 5,
    name: 'Onion & Signature Sauce',
    subhead: 'Step 5 of 8 — Tang & Punch',
    description: 'Crisp purple onion rings cradling our glossy, chef-crafted smoky spiced tomato relish.',
    scrollStart: 0.55,
    scrollEnd: 0.70,
    color: '#ec4899',
    tag: 'House Secret',
  },
  {
    id: 6,
    name: 'Golden Crown Bun',
    subhead: 'Step 6 of 8 — The Seal',
    description: 'Oven-baked dome encrusted with toasted white sesame seeds descending to complete the stack.',
    scrollStart: 0.70,
    scrollEnd: 0.84,
    color: '#eab308',
    tag: 'Sesame Crown',
  },
  {
    id: 7,
    name: 'The Commercial Reveal',
    subhead: 'Step 7 of 8 — 360° Culinary Glory',
    description: 'Full stack alignment illuminated by golden amber spotlights, reflective stone, and floating embers.',
    scrollStart: 0.84,
    scrollEnd: 0.94,
    color: '#f59e0b',
    tag: 'Chef Certified',
  },
  {
    id: 8,
    name: 'Good Food. Great Cravings.',
    subhead: 'Step 8 of 8 — Pure Indulgence',
    description: 'Ready to satisfy your deepest appetite. Crafted with passion, zero compromise.',
    scrollStart: 0.94,
    scrollEnd: 1.0,
    color: '#d4af37',
    tag: 'The Food Co.',
  },
];

/**
 * Finds the currently active step based on scrub progress (0.0 to 1.0)
 */
export function getCurrentStep(progress: number): AssemblyStep {
  const clamped = Math.max(0, Math.min(1, progress));
  for (let i = ASSEMBLY_STEPS.length - 1; i >= 0; i--) {
    if (clamped >= ASSEMBLY_STEPS[i].scrollStart) {
      return ASSEMBLY_STEPS[i];
    }
  }
  return ASSEMBLY_STEPS[0];
}

/**
 * Maps scroll progress (0..1) to frame index (1..TOTAL_FRAMES)
 */
export function progressToFrameIndex(progress: number, totalFrames: number = TOTAL_FRAMES): number {
  const clamped = Math.max(0, Math.min(1, progress));
  const frame = Math.floor(clamped * (totalFrames - 1)) + 1;
  return Math.max(1, Math.min(totalFrames, frame));
}

/**
 * Smooth cubic ease-out calculation
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Interpolates an ingredient layer's vertical Y position between spawn in air and settled rest position
 */
export function interpolateLayerY(
  progress: number,
  startP: number,
  endP: number,
  spawnY: number,
  restY: number
): { y: number; opacity: number; settled: boolean } {
  if (progress <= startP) {
    return { y: spawnY, opacity: 0, settled: false };
  }
  if (progress >= endP) {
    return { y: restY, opacity: 1, settled: true };
  }

  const localT = (progress - startP) / (endP - startP);
  const eased = easeOutCubic(localT);
  const y = spawnY + (restY - spawnY) * eased;
  const opacity = Math.min(1, localT * 2.5);

  return { y, opacity, settled: localT >= 0.99 };
}

/**
 * Calculates exploded vertical offset for 3D inspection
 */
export function calculateExplodedY(restY: number, explodeFactor: number, layerIndex: number): number {
  // Center is layer 3-4 (roughly Y = 0)
  const offsetFromCenter = (layerIndex - 3.5) * 1.8;
  return restY + offsetFromCenter * explodeFactor;
}
