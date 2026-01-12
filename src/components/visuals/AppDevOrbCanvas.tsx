"use client";

import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";

/* ─────────────────────────────────────────
   Reduced motion helper
───────────────────────────────────────── */
function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

/* ─────────────────────────────────────────
   Deterministic PRNG (seeded)
───────────────────────────────────────── */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─────────────────────────────────────────
   Fibonacci sphere points
───────────────────────────────────────── */
function fibonacciSpherePoints(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;

    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    pts.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
  }
  return pts;
}

/* ─────────────────────────────────────────
   Instanced "Orb Bubble" shader (VIVID + GLASSY feel)
   - Keeps your deformation as-is (we only improve color response)
   - More vivid palette (closer to LHWEB logo)
   - Colored rim + tinted spec (no white blowout)
   - Gentle highlight compression + vibrance curve
───────────────────────────────────────── */
class BubbleGlowMaterialImpl extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        // ✅ more vivid + closer to logo
        uCyan: { value: new THREE.Color("#19D6FF") },
        uPurple: { value: new THREE.Color("#7A4DFF") },
        uBase: { value: new THREE.Color("#04050a") },
        uTime: { value: 0 },

        // tuned
        uIdleGlow: { value: 0.46 },
        uBandGlow: { value: 2.05 },
        uRimStrength: { value: 0.82 },
        uSpecStrength: { value: 0.16 },
        uGlowStrength: { value: 1.0 },
      },

      vertexShader: `
        precision highp float;

        attribute float aGlow;
        attribute vec3  aAccent;

        varying float vGlow;
        varying vec3 vAccent;
        varying vec3 vNormalW;
        varying vec3 vPosW;

        void main(){
          vGlow = aGlow;
          vAccent = aAccent;

          vec4 worldPos = instanceMatrix * vec4(position, 1.0);
          worldPos = modelMatrix * worldPos;

          vPosW = worldPos.xyz;
          vNormalW = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);

          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,

      fragmentShader: `
        precision highp float;

        varying float vGlow;
        varying vec3 vAccent;
        varying vec3 vNormalW;
        varying vec3 vPosW;

        uniform vec3 uCyan;
        uniform vec3 uPurple;
        uniform vec3 uBase;
        uniform float uTime;

        uniform float uIdleGlow;
        uniform float uBandGlow;
        uniform float uRimStrength;
        uniform float uSpecStrength;
        uniform float uGlowStrength;

        float hash(vec2 p){
          return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
        }

        // Reinhard compression
        vec3 compress(vec3 c){
          c = max(c, vec3(0.0));
          return c / (1.0 + c);
        }

        // Simple "vibrance" (pushes saturation without killing skin tones)
        vec3 vibrance(vec3 c, float v){
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          vec3 gray = vec3(l);
          return mix(gray, c, v);
        }

        void main(){
          vec3 N = normalize(vNormalW);
          vec3 V = normalize(cameraPosition - vPosW);

          float fres = pow(1.0 - max(dot(N, V), 0.0), 2.25);

          float n = (hash(vPosW.xy * 3.4 + uTime * 0.12) - 0.5) * 0.06;

          vec3 col = uBase;

          // Gradient close to logo vibe
          float grad = 0.5 + 0.5 * sin(uTime * 0.30 + (vPosW.x + vPosW.y) * 1.12);
          vec3 idleCol = mix(uCyan, uPurple, grad);

          // More "glass" feel: accent influences but doesn't wash out
          idleCol = mix(idleCol, vAccent, 0.72);

          float g = clamp(vGlow * uGlowStrength, 0.0, 1.0);
          g = smoothstep(0.0, 1.0, g);

          // Lift uses color, not white
          float baseLift = 0.12 + uIdleGlow * 0.58;
          float bandLift = uBandGlow * (0.62 * g + 0.38 * g*g);

          col += idleCol * baseLift;
          col += idleCol * bandLift;

          // Colored rim (very little white)
          vec3 rimCol = mix(idleCol, vec3(1.0), 0.12);
          col += rimCol * (fres * uRimStrength) * (0.9 + 0.4*g);

          // Tinted spec (glass highlight)
          vec3 R = reflect(-V, N);
          float spec = pow(max(dot(R, vec3(0.0,0.0,1.0)), 0.0), 34.0);
          vec3 specCol = mix(vec3(1.0), idleCol, 0.35);
          col += specCol * (uSpecStrength * spec);

          // micro texture
          col += idleCol * n * (0.18 + 0.45 * g);

          // compress highlights to avoid "white fog"
          col = compress(col);

          // boost saturation (vivid) — slightly stronger on hover
          col = vibrance(col, 1.22 + 0.18 * g);

          // small gamma shift for punch
          col = pow(col, vec3(0.84));

          gl_FragColor = vec4(col, 1.0);
        }
      `,

      transparent: false,
      depthWrite: true,
      depthTest: true,
    });
  }
}

extend({ BubbleGlowMaterial: BubbleGlowMaterialImpl });

/* ─────────────────────────────────────────
   Burst Particles (points)
───────────────────────────────────────── */
function BurstParticles({
  activeRef,
  originRef,
  palette,
}: {
  activeRef: React.MutableRefObject<number>;
  originRef: React.MutableRefObject<THREE.Vector3>;
  palette: { cyan: string; purple: string };
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 520;

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);

    const cCyan = new THREE.Color(palette.cyan);
    const cPurple = new THREE.Color(palette.purple);
    const cWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] = 999;
      pos[i * 3 + 1] = 999;
      pos[i * 3 + 2] = 999;

      const pick = i % 10;
      let c = cWhite;
      if (pick === 0 || pick === 1) c = cCyan;
      if (pick === 2) c = cPurple;

      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [palette.cyan, palette.purple]);

  const posRef = useRef<Float32Array | null>(null);
  const velRef = useRef<Float32Array | null>(null);
  const tmpDir = useMemo(() => new THREE.Vector3(), []);

  if (posRef.current == null) {
    posRef.current = (geom.getAttribute("position") as THREE.BufferAttribute)
      .array as Float32Array;
  }
  if (velRef.current == null) {
    velRef.current = new Float32Array(COUNT * 3);
  }

  const spawnBurst = (center: THREE.Vector3, seed: number) => {
    const pos = posRef.current!;
    const vel = velRef.current!;
    const rand = mulberry32(seed);

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] = center.x;
      pos[i * 3 + 1] = center.y;
      pos[i * 3 + 2] = center.z;

      tmpDir
        .set((rand() - 0.5) * 2, (rand() - 0.2) * 2, (rand() - 0.5) * 2)
        .normalize();

      const spd = 0.8 + rand() * 2.0;
      vel[i * 3 + 0] = tmpDir.x * spd;
      vel[i * 3 + 1] = tmpDir.y * spd;
      vel[i * 3 + 2] = tmpDir.z * spd;
    }

    (geom.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  };

  useFrame((state, dt) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const pos = posRef.current!;
    const vel = velRef.current!;
    const a = activeRef.current;

    if (a > 0.95 && pts.userData._spawned !== true) {
      pts.userData._spawned = true;
      spawnBurst(originRef.current, Math.floor(state.clock.elapsedTime * 1000));
    }
    if (a < 0.2) pts.userData._spawned = false;

    const attr = geom.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      vel[i * 3 + 0] *= 0.96;
      vel[i * 3 + 1] *= 0.96;
      vel[i * 3 + 2] *= 0.96;

      pos[i * 3 + 0] += vel[i * 3 + 0] * dt * 2.4;
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt * 2.4;
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt * 2.4;

      if (a < 0.25) {
        pos[i * 3 + 0] = THREE.MathUtils.lerp(pos[i * 3 + 0], 999, 0.06);
        pos[i * 3 + 1] = THREE.MathUtils.lerp(pos[i * 3 + 1], 999, 0.06);
        pos[i * 3 + 2] = THREE.MathUtils.lerp(pos[i * 3 + 2], 999, 0.06);
      }
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geom}>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────
   Main Orb (Correct mouse: Ray → Sphere)
   (unchanged deformation, only color improved)
───────────────────────────────────────── */
function ReactiveBubbleOrb() {
  const reduced = useReducedMotion();

  const palette = useMemo(
    () => ({
      cyanHex: "#19D6FF",
      purpleHex: "#7A4DFF",
      cyan: new THREE.Color("#19D6FF"),
      purple: new THREE.Color("#7A4DFF"),
      white: new THREE.Color("#ffffff"),
    }),
    []
  );

  const groupRef = useRef<THREE.Group>(null);
  const instRef = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<BubbleGlowMaterialImpl | null>(null);

  const hoverTarget = useRef(0);
  const hoverValue = useRef(0);

  const ndc = useRef(new THREE.Vector2(0, 0));

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const invMat = useMemo(() => new THREE.Matrix4(), []);
  const localRay = useMemo(() => new THREE.Ray(), []);

  const COUNT = 980;
  const R = 1.15;

  const sphere = useMemo(
    () => new THREE.Sphere(new THREE.Vector3(0, 0, 0), R),
    [R]
  );
  const hitLocal = useMemo(() => new THREE.Vector3(0, 0, R), [R]);
  const fallbackHit = useMemo(() => new THREE.Vector3(0, 0, R), [R]);

  const impactLocal = useRef(new THREE.Vector3(0, 0, R));
  const impactWorld = useRef(new THREE.Vector3(0, 0, R));

  const burstActive = useRef(0);
  const burstOrigin = useRef(new THREE.Vector3(0, 0, 0));
  const zero = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const basePoints = useMemo(() => fibonacciSpherePoints(COUNT, R), []);
  const temp = useMemo(() => new THREE.Object3D(), []);

  const jitter = useMemo(() => {
    const rand = mulberry32(1337);
    const arr = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) arr[i] = (rand() - 0.5) * 1.0;
    return arr;
  }, [COUNT]);

  const aGlowAttrRef = useRef<THREE.InstancedBufferAttribute | null>(null);
  const aGlowArrayRef = useRef<Float32Array | null>(null);

  const aAccent = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    const rand = mulberry32(2025);

    for (let i = 0; i < COUNT; i++) {
      const p = rand();
      let c = palette.cyan;
      if (p > 0.58) c = palette.purple;
      if (p > 0.96) c = palette.white; // fewer whites => more “glass color”
      arr[i * 3 + 0] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [COUNT, palette.cyan, palette.purple, palette.white]);

  const aGlowArray = useMemo(() => {
    const arr = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) arr[i] = 0.12;
    return arr;
  }, [COUNT]);

  const particlePalette = useMemo(
    () => ({ cyan: palette.cyanHex, purple: palette.purpleHex }),
    [palette.cyanHex, palette.purpleHex]
  );

  // scratch vectors
  const n = useMemo(() => new THREE.Vector3(), []);
  const axisY = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const axisX = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const rise = useMemo(() => new THREE.Vector3(), []);
  const slide = useMemo(() => new THREE.Vector3(), []);
  const pinch = useMemo(() => new THREE.Vector3(), []);
  const finalPos = useMemo(() => new THREE.Vector3(), []);

  const material = useMemo(() => new BubbleGlowMaterialImpl(), []);

  useFrame((state, dt) => {
    const grp = groupRef.current;
    const inst = instRef.current;
    const mat = matRef.current;
    if (!grp || !inst) return;

    if (aGlowArrayRef.current == null) aGlowArrayRef.current = aGlowArray;

    const target = reduced ? 0 : hoverTarget.current;

    hoverValue.current = THREE.MathUtils.damp(
      hoverValue.current,
      target,
      10.5,
      dt
    );
    burstActive.current = THREE.MathUtils.damp(
      burstActive.current,
      target ? 1 : 0,
      12.0,
      dt
    );

    raycaster.setFromCamera(ndc.current, state.camera);

    grp.updateWorldMatrix(true, false);
    invMat.copy(grp.matrixWorld).invert();
    localRay.copy(raycaster.ray).applyMatrix4(invMat);

    const hit = localRay.intersectSphere(sphere, hitLocal);
    if (hit) {
      impactLocal.current.lerp(hitLocal, 0.22);
    } else {
      fallbackHit.set(0, 0, R);
      impactLocal.current.lerp(fallbackHit, 0.02);
    }

    impactWorld.current.copy(impactLocal.current);
    grp.localToWorld(impactWorld.current);

    const t = state.clock.elapsedTime;

    if (!reduced) {
      grp.rotation.y += 0.16 * dt;
      grp.rotation.x = Math.sin(t * 0.22) * 0.06;
    }

    if (mat) {
      mat.uniforms.uTime.value = t;

      // keep vivid, and add a *tiny* hover lift (no blowout)
      mat.uniforms.uGlowStrength.value = 1.0;
      mat.uniforms.uIdleGlow.value = 0.46 + 0.04 * hoverValue.current;
      mat.uniforms.uBandGlow.value = 2.05 + 0.1 * hoverValue.current;
      mat.uniforms.uRimStrength.value = 0.82 + 0.08 * hoverValue.current;
      mat.uniforms.uSpecStrength.value = 0.16 + 0.02 * hoverValue.current;
    }

    const bubbleBase = 0.062;
    const breatheAmp = 0.02;
    const influence = 0.72;
    const influenceGlow = 0.92;

    const bump = 0.3 * hoverValue.current;
    const swirl = 0.2 * hoverValue.current;
    const compress = 0.08 * hoverValue.current;

    const glowAttr = aGlowAttrRef.current;

    for (let i = 0; i < COUNT; i++) {
      const p = basePoints[i];

      n.copy(p).normalize();

      const d = p.distanceTo(impactLocal.current);

      const f = 1.0 - THREE.MathUtils.smoothstep(d, 0.0, influence);
      const fg = 1.0 - THREE.MathUtils.smoothstep(d, 0.0, influenceGlow);

      const breathe = Math.sin(t * 1.1 + i * 0.03) * breatheAmp;
      const wave = Math.sin(t * 2.2 + i * 0.08) * 0.5 + 0.5;

      tangent.copy(n).cross(axisY);
      if (tangent.lengthSq() < 1e-6) tangent.copy(n).cross(axisX);
      tangent.normalize();

      rise.copy(n).multiplyScalar(bump * f * (0.55 + 0.45 * wave));
      slide.copy(tangent).multiplyScalar(swirl * f * (wave - 0.5));
      pinch.copy(n).multiplyScalar(-compress * f * 0.25);

      finalPos.copy(p).add(rise).add(slide).add(pinch);

      const s =
        bubbleBase +
        breathe +
        f * (0.05 * hoverValue.current) +
        jitter[i] * 0.004;

      temp.position.copy(finalPos);
      temp.scale.setScalar(s);
      temp.lookAt(0, 0, 0);
      temp.updateMatrix();

      inst.setMatrixAt(i, temp.matrix);

      // vivid glow but controlled
      if (aGlowArrayRef.current) {
        const base = 0.12;
        const band = fg * (0.5 + 0.32 * wave) * hoverValue.current;
        aGlowArrayRef.current[i] = THREE.MathUtils.clamp(base + band, 0, 0.82);
      }
    }

    inst.instanceMatrix.needsUpdate = true;
    if (glowAttr) glowAttr.needsUpdate = true;

    if (hoverValue.current > 0.35) {
      burstOrigin.current.copy(impactWorld.current);
      burstOrigin.current.lerp(zero, 0.02);
    }
  });

  return (
    <group ref={groupRef}>
      <BurstParticles
        activeRef={burstActive}
        originRef={burstOrigin}
        palette={particlePalette}
      />

      <instancedMesh
        ref={instRef}
        args={[undefined, undefined, COUNT]}
        onPointerMove={(e) => {
          e.stopPropagation();
          hoverTarget.current = 1;
          ndc.current.copy(e.pointer);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          hoverTarget.current = 1;
          ndc.current.copy(e.pointer);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          hoverTarget.current = 0;
        }}
      >
        <sphereGeometry args={[1, 22, 22]}>
          <instancedBufferAttribute
            attach="attributes-aGlow"
            args={[aGlowArray, 1]}
            ref={(r) => {
              if (r && aGlowAttrRef.current == null) {
                aGlowAttrRef.current =
                  r as unknown as THREE.InstancedBufferAttribute;
              }
            }}
          />
          <instancedBufferAttribute
            attach="attributes-aAccent"
            args={[aAccent, 3]}
          />
        </sphereGeometry>

        <primitive
          object={material}
          ref={(m: unknown) => {
            if (m && matRef.current == null) {
              matRef.current = m as unknown as BubbleGlowMaterialImpl;
            }
          }}
        />
      </instancedMesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   Canvas
───────────────────────────────────────── */
export default function AppDevOrbCanvas() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", background: "transparent" }}
      frameloop="always"
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.setClearAlpha(0);
      }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 2, 2]} intensity={1.35} />
      <pointLight position={[-2, 0, 3]} intensity={0.95} />

      <ReactiveBubbleOrb />
    </Canvas>
  );
}
