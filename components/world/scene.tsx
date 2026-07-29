"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Float,
  Html,
  OrbitControls,
  Stars,
  Environment,
  Lightformer,
  SoftShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Group } from "three";
import { projects, type Project } from "@/lib/projects";

/* -------------------------------------------------------------------------- */
/*  Deterministic pseudo-random                                               */
/* -------------------------------------------------------------------------- */
function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Soft radial glow pool placed flat on the ground under a monument. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function GlowPool({ color, intensity = 0.5, scale = 3.2 }: { color: string; intensity?: number; scale?: number }) {
  const tex = useGlowTexture();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={tex}
        color={color}
        transparent
        opacity={intensity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reusable rounded voxel                                                    */
/* -------------------------------------------------------------------------- */
function Vox({
  size = [1, 1, 1],
  position,
  color,
  emissive,
  emissiveIntensity = 0,
  roughness = 0.55,
  metalness = 0.05,
  radius = 0.09,
}: {
  size?: [number, number, number];
  position: [number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
  radius?: number;
}) {
  return (
    <RoundedBox
      args={size}
      radius={Math.min(radius, Math.min(...size) / 2 - 0.001)}
      smoothness={3}
      creaseAngle={0.5}
      position={position}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissiveIntensity}
        roughness={roughness}
        metalness={metalness}
      />
    </RoundedBox>
  );
}

/* thin cylinder rod between two points (Kavela graph edges) */
function Rod({ a, b, color }: { a: [number, number, number]; b: [number, number, number]; color: string }) {
  const { pos, quat, len } = useMemo(() => {
    const va = new THREE.Vector3(...a);
    const vb = new THREE.Vector3(...b);
    const dir = vb.clone().sub(va);
    const length = dir.length();
    const mid = va.clone().add(vb).multiplyScalar(0.5);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    return { pos: mid.toArray() as [number, number, number], quat: q, len: length };
  }, [a, b]);
  return (
    <mesh position={pos} quaternion={quat}>
      <cylinderGeometry args={[0.035, 0.035, len, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.4} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Island                                                                    */
/* -------------------------------------------------------------------------- */
function Island({ fuzzy }: { fuzzy: boolean }) {
  const blocks = useMemo(() => {
    const rand = mulberry(2027);
    const out: {
      pos: [number, number, number];
      h: number;
      tone: number;
      flower: boolean;
    }[] = [];
    const R = 7;
    for (let x = -R; x <= R; x++) {
      for (let z = -R; z <= R; z++) {
        const d = Math.sqrt(x * x + z * z);
        if (d > R - rand() * 1.4) continue;
        const h = 1 + Math.max(0, (R - d) * 0.16 + (rand() - 0.5) * 0.5);
        out.push({
          pos: [x, -h / 2, z],
          h,
          tone: rand(),
          flower: rand() > 0.94,
        });
      }
    }
    return out;
  }, []);

  const grass = fuzzy
    ? ["#3a1a5c", "#4a2170", "#2d1447"]
    : ["#3a6a49", "#356243", "#2c5138"];
  const soil = fuzzy ? "#1a0c2b" : "#1c2f22";
  const flower = fuzzy ? "#22d3ee" : "#f4d06b";

  return (
    <group>
      {blocks.map((b, i) => (
        <group key={i}>
          <Vox
            size={[1, b.h, 1]}
            position={b.pos}
            color={grass[Math.floor(b.tone * grass.length)]}
            roughness={0.9}
            radius={0.12}
          />
          {b.flower && (
            <Vox
              size={[0.16, 0.16, 0.16]}
              position={[b.pos[0], 0.12, b.pos[2]]}
              color={flower}
              emissive={flower}
              emissiveIntensity={fuzzy ? 2.4 : 1.4}
              radius={0.04}
            />
          )}
        </group>
      ))}
      {/* soil underbelly */}
      <mesh position={[0, -2.6, 0]} castShadow>
        <cylinderGeometry args={[6.4, 3.4, 3.4, 6]} />
        <meshStandardMaterial color={soil} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Crafted monuments                                                         */
/* -------------------------------------------------------------------------- */
function BlindBox({ color, glow, fuzzy }: { color: string; glow: string; fuzzy: boolean }) {
  const ei = fuzzy ? 1.1 : 0.55;
  return (
    <group>
      {/* body */}
      <Vox size={[1.15, 1, 1.15]} position={[0, 0.75, 0]} color={color} emissive={color} emissiveIntensity={ei * 0.35} roughness={0.35} />
      {/* lid */}
      <Vox size={[1.32, 0.26, 1.32]} position={[0, 1.35, 0]} color={color} emissive={color} emissiveIntensity={ei * 0.4} roughness={0.3} />
      {/* ribbons */}
      <Vox size={[0.16, 1.02, 1.2]} position={[0, 0.75, 0]} color={glow} emissive={glow} emissiveIntensity={ei} roughness={0.25} radius={0.04} />
      <Vox size={[1.2, 1.02, 0.16]} position={[0, 0.75, 0]} color={glow} emissive={glow} emissiveIntensity={ei} roughness={0.25} radius={0.04} />
      <Vox size={[0.16, 0.28, 1.36]} position={[0, 1.35, 0]} color={glow} emissive={glow} emissiveIntensity={ei} roughness={0.25} radius={0.04} />
      <Vox size={[1.36, 0.28, 0.16]} position={[0, 1.35, 0]} color={glow} emissive={glow} emissiveIntensity={ei} roughness={0.25} radius={0.04} />
      {/* bow */}
      <Vox size={[0.34, 0.34, 0.2]} position={[-0.22, 1.62, 0]} color={glow} emissive={glow} emissiveIntensity={ei} radius={0.06} />
      <Vox size={[0.34, 0.34, 0.2]} position={[0.22, 1.62, 0]} color={glow} emissive={glow} emissiveIntensity={ei} radius={0.06} />
    </group>
  );
}

function NodeGraph({ color, glow, fuzzy }: { color: string; glow: string; fuzzy: boolean }) {
  const ei = fuzzy ? 1.4 : 0.7;
  const nodes: [number, number, number][] = [
    [0, 1.05, 0],
    [0.75, 0.55, 0.35],
    [-0.6, 0.6, 0.5],
    [0.25, 1.5, -0.5],
    [-0.4, 1.15, -0.35],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 3],
  ];
  return (
    <group>
      {edges.map(([i, j], k) => (
        <Rod key={k} a={nodes[i]} b={nodes[j]} color={glow} />
      ))}
      {nodes.map((p, i) => (
        <Vox
          key={i}
          size={i === 0 ? [0.62, 0.62, 0.62] : [0.42, 0.42, 0.42]}
          position={p}
          color={color}
          emissive={glow}
          emissiveIntensity={ei}
          roughness={0.3}
          metalness={0.15}
        />
      ))}
    </group>
  );
}

function Compass({ color, glow, fuzzy }: { color: string; glow: string; fuzzy: boolean }) {
  const ei = fuzzy ? 1.3 : 0.7;
  const star = useRef<Group>(null);
  useFrame((state) => {
    if (star.current) star.current.rotation.y = state.clock.elapsedTime * 0.8;
  });
  return (
    <group>
      {/* pedestal */}
      <Vox size={[1.1, 0.5, 1.1]} position={[0, 0.35, 0]} color={color} emissive={color} emissiveIntensity={ei * 0.25} roughness={0.4} radius={0.1} />
      {/* dial */}
      <mesh position={[0, 0.63, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.12, 32]} />
        <meshStandardMaterial color="#141c1f" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* needle (two-tone) */}
      <Vox size={[0.12, 0.06, 0.7]} position={[0, 0.72, 0.18]} color={glow} emissive={glow} emissiveIntensity={ei} radius={0.03} />
      <Vox size={[0.12, 0.06, 0.7]} position={[0, 0.72, -0.18]} color="#e7e2d6" radius={0.03} />
      {/* floating north star */}
      <group ref={star} position={[0, 2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
          <octahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={ei * 1.6} roughness={0.2} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function Garden({ color, fuzzy }: { color: string; fuzzy: boolean }) {
  const trunk = fuzzy ? "#7a649e" : "#6b4e36";
  const canopy = fuzzy ? "#22d3ee" : "#7cc26b";
  const trees: [number, number, number][] = [
    [-0.45, 0, -0.3],
    [0.45, 0, 0.32],
    [0.1, 0, -0.5],
  ];
  return (
    <group>
      {/* mound */}
      <Vox size={[1.7, 0.55, 1.7]} position={[0, 0.32, 0]} color={color} roughness={0.85} radius={0.22} />
      {trees.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
            <meshStandardMaterial color={trunk} roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <icosahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color={canopy}
              emissive={fuzzy ? canopy : "#000000"}
              emissiveIntensity={fuzzy ? 1.1 : 0}
              roughness={0.75}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function MissionGrid({ color, fuzzy }: { color: string; glow: string; fuzzy: boolean }) {
  // A raised console with a 3x3 grid of agent tiles that glow amber / blue /
  // indigo — the "mission control" of parallel coding agents.
  const ei = fuzzy ? 1.6 : 0.9;
  const palette = ["#FBBF24", "#22D3EE", color]; // done / needs-you / idle
  const tiles: { pos: [number, number, number]; c: string }[] = [];
  const step = 0.42;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      tiles.push({
        pos: [(c - 1) * step, 0.62, (r - 1) * step],
        c: palette[(r * 3 + c + r) % 3],
      });
    }
  }
  return (
    <group>
      {/* console base, tilted slightly toward the viewer */}
      <group rotation={[-0.18, 0, 0]}>
        <Vox size={[1.7, 0.35, 1.7]} position={[0, 0.4, 0]} color={color} emissive={color} emissiveIntensity={ei * 0.2} roughness={0.45} radius={0.1} />
        {tiles.map((t, i) => (
          <Vox
            key={i}
            size={[0.3, 0.12, 0.3]}
            position={t.pos}
            color={t.c}
            emissive={t.c}
            emissiveIntensity={ei}
            roughness={0.3}
            radius={0.04}
          />
        ))}
      </group>
    </group>
  );
}

function MonumentModel({ kind, color, fuzzy }: { kind: Project["monument"]["kind"]; color: string; fuzzy: boolean }) {
  // A lighter "glow" tint derived from the base color.
  const glow = useMemo(() => new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.35).getStyle(), [color]);
  switch (kind) {
    case "box":
      return <BlindBox color={color} glow={glow} fuzzy={fuzzy} />;
    case "cluster":
      return <NodeGraph color={color} glow={glow} fuzzy={fuzzy} />;
    case "compass":
      return <Compass color={color} glow={glow} fuzzy={fuzzy} />;
    case "garden":
      return <Garden color={color} fuzzy={fuzzy} />;
    case "grid":
      return <MissionGrid color={color} glow={glow} fuzzy={fuzzy} />;
    case "tower":
      return <NodeGraph color={color} glow={glow} fuzzy={fuzzy} />;
  }
}

function Monument({
  project,
  fuzzy,
  active,
  onSelect,
}: {
  project: Project;
  fuzzy: boolean;
  active: boolean;
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered || active ? 1.1 : 1;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.12;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group position={project.monument.position}>
      <GlowPool
        color={project.monument.color}
        intensity={hovered || active ? 0.9 : 0.45}
        scale={project.monument.kind === "garden" ? 3.6 : 3.1}
      />
      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.4} floatingRange={[0, 0.14]}>
        <group
          ref={ref}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
        >
          <MonumentModel kind={project.monument.kind} color={project.monument.color} fuzzy={fuzzy} />
        </group>

        {(hovered || active) && (
          <Html center position={[0, 3, 0]} distanceFactor={11} zIndexRange={[20, 0]}>
            <div className="pointer-events-none -translate-y-2 whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur">
              {project.name}
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene root                                                                */
/* -------------------------------------------------------------------------- */
export function WorldScene({
  fuzzy,
  lowPerf = false,
  onSelect,
  activeSlug,
}: {
  fuzzy: boolean;
  lowPerf?: boolean;
  onSelect: (p: Project) => void;
  activeSlug: string | null;
}) {
  const bg = fuzzy ? "#0b0510" : "#0a0e0c";
  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 20, 40]} />

      {!lowPerf && <SoftShadows size={22} samples={8} focus={0.8} />}

      <ambientLight intensity={fuzzy ? 0.35 : 0.5} />
      <directionalLight
        position={[7, 13, 5]}
        intensity={fuzzy ? 1.4 : 2.1}
        castShadow={!lowPerf}
        shadow-mapSize={lowPerf ? [1024, 1024] : [2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />

      {/* Inline studio environment for reflections — no external HDR (CSP-safe). */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={fuzzy ? 2 : 1.4} position={[5, 6, 5]} scale={8} color="#ffffff" />
        <Lightformer intensity={fuzzy ? 3 : 1} position={[-6, 3, -4]} scale={6} color={fuzzy ? "#ff2fb0" : "#8fdcc9"} />
        <Lightformer intensity={1} position={[0, -4, 2]} scale={10} color={fuzzy ? "#7c3aed" : "#3a6a49"} />
      </Environment>

      <Stars
        radius={70}
        depth={40}
        count={lowPerf ? 400 : fuzzy ? 1600 : 700}
        factor={3.5}
        saturation={0}
        fade
        speed={0.5}
      />

      <group position={[0, 0.5, 0]}>
        <Island fuzzy={fuzzy} />
        {projects.map((p) => (
          <Monument key={p.slug} project={p} fuzzy={fuzzy} active={activeSlug === p.slug} onSelect={onSelect} />
        ))}
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={9}
        maxDistance={22}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.4}
        target={[0, 1, 0]}
        enableDamping
        dampingFactor={0.08}
      />

      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={fuzzy ? 1.15 : 0.7}
          luminanceThreshold={fuzzy ? 0.35 : 0.6}
          luminanceSmoothing={0.3}
        />
        <Vignette eskil={false} offset={0.2} darkness={fuzzy ? 0.7 : 0.5} />
        <SMAA />
      </EffectComposer>
    </>
  );
}
