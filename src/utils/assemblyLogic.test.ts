import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ASSEMBLY_STEPS,
  getCurrentStep,
  progressToFrameIndex,
  interpolateLayerY,
  calculateExplodedY
} from './assemblyLogic';

test('assembly has 8 distinct steps matching commercial brief', () => {
  assert.equal(ASSEMBLY_STEPS.length, 8);
  assert.equal(ASSEMBLY_STEPS[0].id, 1);
  assert.equal(ASSEMBLY_STEPS[7].id, 8);
});

test('getCurrentStep returns step 1 at progress 0.0', () => {
  const step = getCurrentStep(0.0);
  assert.equal(step.id, 1);
  assert.match(step.name, /Toasted Sesame Bun/i);
});

test('getCurrentStep transitions through steps as progress increases', () => {
  assert.equal(getCurrentStep(0.20).id, 2); // Patty
  assert.equal(getCurrentStep(0.35).id, 3); // Cheese
  assert.equal(getCurrentStep(0.48).id, 4); // Lettuce & Tomato
  assert.equal(getCurrentStep(0.65).id, 5); // Onion & Sauce
  assert.equal(getCurrentStep(0.78).id, 6); // Crown Bun
  assert.equal(getCurrentStep(0.90).id, 7); // Reveal
  assert.equal(getCurrentStep(1.0).id, 8);  // Final message
});

test('progressToFrameIndex maps 0..1 to 1..120 correctly', () => {
  assert.equal(progressToFrameIndex(0, 120), 1);
  assert.equal(progressToFrameIndex(0.5, 120), 60);
  assert.equal(progressToFrameIndex(1, 120), 120);
});

test('interpolateLayerY correctly computes spawn vs rest positions', () => {
  const spawnY = 8;
  const restY = 1.2;
  const before = interpolateLayerY(0.1, 0.2, 0.4, spawnY, restY);
  assert.equal(before.y, spawnY);
  assert.equal(before.settled, false);

  const after = interpolateLayerY(0.5, 0.2, 0.4, spawnY, restY);
  assert.equal(after.y, restY);
  assert.equal(after.settled, true);
  assert.equal(after.opacity, 1);

  const during = interpolateLayerY(0.3, 0.2, 0.4, spawnY, restY);
  assert.ok(during.y < spawnY && during.y > restY);
});

test('calculateExplodedY expands layers proportionally', () => {
  const restY = 0;
  const exploded0 = calculateExplodedY(restY, 0, 5);
  assert.equal(exploded0, restY);

  const explodedHigh = calculateExplodedY(restY, 1.0, 6);
  assert.ok(explodedHigh > 0);

  const explodedLow = calculateExplodedY(restY, 1.0, 1);
  assert.ok(explodedLow < 0);
});
