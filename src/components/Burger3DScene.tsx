import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { interpolateLayerY, calculateExplodedY } from '../utils/assemblyLogic';

interface Burger3DSceneProps {
  progress: number;
  explodeFactor?: number;
  rotationSpeed?: number;
  interactive?: boolean;
}

export const Burger3DScene: React.FC<Burger3DSceneProps> = ({
  progress,
  explodeFactor = 0,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const burgerGroupRef = useRef<THREE.Group | null>(null);

  // References to individual ingredient meshes
  const bottomBunRef = useRef<THREE.Group | null>(null);
  const pattyRef = useRef<THREE.Mesh | null>(null);
  const cheeseRef = useRef<THREE.Mesh | null>(null);
  const lettuceRef = useRef<THREE.Mesh | null>(null);
  const tomatoesRef = useRef<THREE.Group | null>(null);
  const onionRef = useRef<THREE.Group | null>(null);
  const sauceRef = useRef<THREE.Mesh | null>(null);
  const topBunRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Interaction tracking
  const pointerDownRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const userRotationRef = useRef({ x: 0.1, y: 0 });
  const targetUserRotationRef = useRef({ x: 0.1, y: 0 });

  const progressRef = useRef(progress);
  progressRef.current = progress;
  const explodeRef = useRef(explodeFactor);
  explodeRef.current = explodeFactor;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Setup Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x08080a, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 8.5);
    cameraRef.current = camera;

    // 3. Setup WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Procedural Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
    scene.add(ambientLight);

    const warmKeyLight = new THREE.DirectionalLight(0xffeedd, 2.6);
    warmKeyLight.position.set(4, 8, 5);
    warmKeyLight.castShadow = !isSoftwareGl;
    if (warmKeyLight.castShadow) {
      warmKeyLight.shadow.mapSize.width = 1024;
      warmKeyLight.shadow.mapSize.height = 1024;
      warmKeyLight.shadow.bias = -0.0005;
      warmKeyLight.shadow.normalBias = 0.02;
    }
    scene.add(warmKeyLight);

    const amberRimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    amberRimLight.position.set(-5, 4, -4);
    scene.add(amberRimLight);

    const softFillLight = new THREE.PointLight(0xffb703, 1.2, 15);
    softFillLight.position.set(0, -1, 3);
    scene.add(softFillLight);

    // 6. Ground Reflective Slate Stone Counter
    const groundGeo = new THREE.CylinderGeometry(4.2, 4.2, 0.2, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.35,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1.5;
    ground.receiveShadow = !isSoftwareGl;
    scene.add(ground);

    // Contact shadow soft plane
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sctx = shadowCanvas.getContext('2d')!;
    const grad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0,0,0,0.75)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.38;
    scene.add(shadowMesh);

    // Helper: generate procedural bun texture
    const createBunTexture = (isTop: boolean) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d')!;
      const bGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
      if (isTop) {
        bGrad.addColorStop(0, '#d88b35');
        bGrad.addColorStop(0.65, '#c27321');
        bGrad.addColorStop(1, '#944f12');
      } else {
        bGrad.addColorStop(0, '#f1c27d');
        bGrad.addColorStop(0.7, '#d69748');
        bGrad.addColorStop(1, '#9b5e1b');
      }
      ctx.fillStyle = bGrad;
      ctx.fillRect(0, 0, 512, 512);

      // Micro toast granules
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(80,30,0,0.12)';
        ctx.fillRect(x, y, 1.5, 1.5);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // Helper: generate veggie patty texture (quinoa, herbs, lentils)
    const createPattyTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#543015';
      ctx.fillRect(0, 0, 512, 512);

      // Texture flecks: lentils (tan), herbs (green), roasted quinoa (golden)
      for (let i = 0; i < 8000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random();
        if (r < 0.25) ctx.fillStyle = '#2f5223'; // fresh herb fleck
        else if (r < 0.55) ctx.fillStyle = '#d49b57'; // toasted quinoa grain
        else if (r < 0.8) ctx.fillStyle = '#7a421c'; // spiced red lentil
        else ctx.fillStyle = '#1c0f05'; // charred crust edge
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);
    burgerGroupRef.current = burgerGroup;

    // --- Layer 1: Bottom Bun ---
    const bottomBunGroup = new THREE.Group();
    const bottomBunMat = new THREE.MeshStandardMaterial({
      map: createBunTexture(false),
      roughness: 0.65,
      metalness: 0.05,
    });
    const bottomBunMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 1.5, 0.45, 48),
      bottomBunMat
    );
    bottomBunMesh.castShadow = !isSoftwareGl;
    bottomBunMesh.receiveShadow = !isSoftwareGl;
    bottomBunGroup.add(bottomBunMesh);
    bottomBunGroup.position.y = -1.15;
    burgerGroup.add(bottomBunGroup);
    bottomBunRef.current = bottomBunGroup;

    // --- Layer 2: Artisanal Vegetarian Patty ---
    const pattyMat = new THREE.MeshStandardMaterial({
      map: createPattyTexture(),
      roughness: 0.88,
      metalness: 0.1,
    });
    const pattyMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.68, 1.62, 0.52, 48),
      pattyMat
    );
    pattyMesh.castShadow = !isSoftwareGl;
    pattyMesh.receiveShadow = !isSoftwareGl;
    pattyMesh.position.y = 8; // initial spawn in air
    burgerGroup.add(pattyMesh);
    pattyRef.current = pattyMesh;

    // --- Layer 3: Melted Cheddar Slice ---
    // Curved/folded cheese geometry
    const cheeseShape = new THREE.Shape();
    const s = 1.35;
    cheeseShape.moveTo(-s, -s);
    cheeseShape.lineTo(s, -s);
    cheeseShape.lineTo(s, s);
    cheeseShape.lineTo(-s, s);
    cheeseShape.closePath();

    const cheeseGeo = new THREE.ExtrudeGeometry(cheeseShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.04,
    });
    cheeseGeo.center();
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.22,
      metalness: 0.08,
    });
    const cheeseMesh = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheeseMesh.rotation.x = Math.PI / 2;
    cheeseMesh.rotation.z = Math.PI / 4; // 45 degree angle so corners drape
    cheeseMesh.castShadow = !isSoftwareGl;
    cheeseMesh.position.y = 10;
    burgerGroup.add(cheeseMesh);
    cheeseRef.current = cheeseMesh;

    // --- Layer 4: Crisp Fresh Lettuce ---
    // Procedural undulating organic leaf
    const lettuceGeo = new THREE.PlaneGeometry(3.2, 3.2, 32, 32);
    const pos = lettuceGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const dist = Math.sqrt(u * u + v * v);
      // Ruffled edge waves
      const wave = Math.sin(u * 7) * Math.cos(v * 7) * 0.14 * (dist / 1.5);
      pos.setZ(i, wave);
    }
    lettuceGeo.computeVertexNormals();
    const lettuceMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.45,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const lettuceMesh = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuceMesh.rotation.x = -Math.PI / 2;
    lettuceMesh.position.y = 12;
    lettuceMesh.castShadow = !isSoftwareGl;
    burgerGroup.add(lettuceMesh);
    lettuceRef.current = lettuceMesh;

    // --- Layer 5: Vine-Ripened Tomato Slices ---
    const tomatoesGroup = new THREE.Group();
    const tomatoMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.2,
      metalness: 0.05,
    });
    const tomatoGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.16, 32);
    const t1 = new THREE.Mesh(tomatoGeo, tomatoMat);
    t1.position.set(-0.6, 0, 0.3);
    t1.rotation.y = 0.2;
    t1.castShadow = !isSoftwareGl;

    const t2 = new THREE.Mesh(tomatoGeo, tomatoMat);
    t2.position.set(0.65, 0.02, -0.2);
    t2.rotation.y = -0.4;
    t2.castShadow = !isSoftwareGl;

    tomatoesGroup.add(t1, t2);
    tomatoesGroup.position.y = 14;
    burgerGroup.add(tomatoesGroup);
    tomatoesRef.current = tomatoesGroup;

    // --- Layer 6: Red Onion Rings & Relish Sauce ---
    const onionGroup = new THREE.Group();
    const onionMat = new THREE.MeshStandardMaterial({
      color: 0xa21caf,
      roughness: 0.3,
      metalness: 0.1,
    });
    const o1 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.1, 16, 36), onionMat);
    o1.rotation.x = Math.PI / 2;
    o1.position.set(0.1, 0, 0.1);

    const o2 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.08, 16, 36), onionMat);
    o2.rotation.x = Math.PI / 2;
    o2.position.set(-0.35, 0.03, -0.2);

    onionGroup.add(o1, o2);
    onionGroup.position.y = 16;
    burgerGroup.add(onionGroup);
    onionRef.current = onionGroup;

    // Glossy Sauce Drizzle
    const sauceGeo = new THREE.CylinderGeometry(0.7, 0.95, 0.12, 32);
    const sauceMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.12,
      metalness: 0.05,
    });
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    sauceMesh.position.y = 18;
    burgerGroup.add(sauceMesh);
    sauceRef.current = sauceMesh;

    // --- Layer 7: Golden Crown Bun with Sesame Seeds ---
    const topBunGroup = new THREE.Group();
    const topBunGeo = new THREE.SphereGeometry(1.68, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const topBunMat = new THREE.MeshStandardMaterial({
      map: createBunTexture(true),
      roughness: 0.55,
      metalness: 0.08,
    });
    const topBunMesh = new THREE.Mesh(topBunGeo, topBunMat);
    topBunMesh.castShadow = !isSoftwareGl;
    topBunGroup.add(topBunMesh);

    // Scattered 3D sesame seeds on crown
    const sesameCount = 85;
    const sesameGeo = new THREE.ConeGeometry(0.04, 0.12, 6);
    const sesameMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.4,
      metalness: 0.1,
    });
    const sesameMesh = new THREE.InstancedMesh(sesameGeo, sesameMat, sesameCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < sesameCount; i++) {
      const phi = Math.acos(1 - Math.random() * 0.55);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.68;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      dummy.position.set(x, y - 0.2, z);
      dummy.lookAt(x * 2, y * 2, z * 2);
      dummy.updateMatrix();
      sesameMesh.setMatrixAt(i, dummy.matrix);
    }
    sesameMesh.instanceMatrix.needsUpdate = true;
    topBunGroup.add(sesameMesh);

    topBunGroup.position.y = 20;
    burgerGroup.add(topBunGroup);
    topBunRef.current = topBunGroup;

    // Floating Golden Culinary Particles / Embers
    const particleCount = isSoftwareGl ? 30 : 90;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 8;
      pPos[i + 1] = Math.random() * 5 - 1;
      pPos[i + 2] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf6c85f,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Pointer events for rotating burger when interacting
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      pointerDownRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointerPosRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!pointerDownRef.current || !interactive) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - pointerPosRef.current.x;
      const dy = clientY - pointerPosRef.current.y;
      pointerPosRef.current = { x: clientX, y: clientY };

      targetUserRotationRef.current.y += dx * 0.008;
      targetUserRotationRef.current.x = Math.max(-0.4, Math.min(0.6, targetUserRotationRef.current.x + dy * 0.008));
    };

    const onPointerUp = () => {
      pointerDownRef.current = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // Main Animation / Render Loop
    let animId = 0;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const p = progressRef.current;
      const exp = explodeRef.current;

      // Smooth user rotation damping
      userRotationRef.current.x += (targetUserRotationRef.current.x - userRotationRef.current.x) * 0.08;
      userRotationRef.current.y += (targetUserRotationRef.current.y - userRotationRef.current.y) * 0.08;

      // Base rotation + gentle auto-spin when burger is fully assembled
      if (burgerGroupRef.current) {
        const autoSpin = p >= 0.85 ? (p - 0.85) * 3.5 : 0;
        burgerGroupRef.current.rotation.y = userRotationRef.current.y + autoSpin;
        burgerGroupRef.current.rotation.x = userRotationRef.current.x;
      }

      // Kinematic Assembly Positioning for each layer
      // Layer 1: Bottom bun rests at -0.95
      if (bottomBunRef.current) {
        const rest = -0.95;
        bottomBunRef.current.position.y = calculateExplodedY(rest, exp, 1);
      }

      // Layer 2: Patty (descends 0.12 -> 0.26)
      if (pattyRef.current) {
        const kin = interpolateLayerY(p, 0.12, 0.26, 6.0, -0.45);
        pattyRef.current.position.y = calculateExplodedY(kin.y, exp, 2);
        pattyRef.current.rotation.y = kin.settled ? 0.1 : (1 - p) * 4;
      }

      // Layer 3: Cheddar Slice (descends 0.26 -> 0.40)
      if (cheeseRef.current) {
        const kin = interpolateLayerY(p, 0.26, 0.40, 6.5, -0.15);
        cheeseRef.current.position.y = calculateExplodedY(kin.y, exp, 3);
      }

      // Layer 4: Lettuce (descends 0.40 -> 0.55)
      if (lettuceRef.current) {
        const kin = interpolateLayerY(p, 0.40, 0.55, 7.0, -0.05);
        lettuceRef.current.position.y = calculateExplodedY(kin.y, exp, 4);
      }

      // Layer 5: Tomato Slices (descends 0.50 -> 0.62)
      if (tomatoesRef.current) {
        const kin = interpolateLayerY(p, 0.50, 0.62, 7.5, 0.18);
        tomatoesRef.current.position.y = calculateExplodedY(kin.y, exp, 5);
      }

      // Layer 6: Onions & Sauce (descends 0.60 -> 0.72)
      if (onionRef.current) {
        const kin = interpolateLayerY(p, 0.60, 0.72, 8.0, 0.35);
        onionRef.current.position.y = calculateExplodedY(kin.y, exp, 6);
      }
      if (sauceRef.current) {
        const kin = interpolateLayerY(p, 0.63, 0.74, 8.2, 0.42);
        sauceRef.current.position.y = calculateExplodedY(kin.y, exp, 6);
      }

      // Layer 7: Top Bun (descends 0.70 -> 0.84)
      if (topBunRef.current) {
        const kin = interpolateLayerY(p, 0.70, 0.84, 9.0, 0.58);
        topBunRef.current.position.y = calculateExplodedY(kin.y, exp, 7);
        topBunRef.current.rotation.y = kin.settled ? 0 : (1 - p) * 3;
      }

      // Floating particles drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y += dt * 0.04;
      }

      // Camera dolly zoom based on progress
      if (cameraRef.current) {
        // Dramatic close-up on assembly completion
        const targetZ = 8.5 - p * 1.8;
        const targetY = 2.0 - p * 0.4;
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(0, -0.1, 0);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Drag to rotate burger in 3D"
    />
  );
};
