"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { colors } from "@/lib/constants";

/** Panel aspect ~4:2.5 with real bezel thickness */
const PANEL_W = 4;
const PANEL_H = 2.5;
const PANEL_D = 0.05;

const MAX_TILT_RAD = (8 * Math.PI) / 180;
const LERP = 0.065;
const FLOAT_AMP = 0.05;
/** ~5s full float cycle */
const FLOAT_PERIOD = 5;
const DRIFT_AMP_X = 0.012;
const DRIFT_AMP_Y = 0.018;

export type DraftedScreenProps = {
  className?: string;
  /**
   * Static rest pose — no useFrame idle/pointer motion.
   * Set by DraftingScene when useReducedMotion() is true.
   */
  staticPose?: boolean;
};

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fine;
}

/**
 * Glass browser panel with layered UI geometry, idle float, and optional
 * pointer tilt (desktop / fine pointer only).
 */
function ScreenMesh({
  staticPose,
  enablePointerTilt,
}: {
  staticPose: boolean;
  enablePointerTilt: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (staticPose || !groupRef.current) return;

    const t = state.clock.elapsedTime;
    const floatY = Math.sin((t * Math.PI * 2) / FLOAT_PERIOD) * FLOAT_AMP;
    const driftX = Math.cos(t * 0.22) * DRIFT_AMP_X;
    const driftY = Math.sin(t * 0.18) * DRIFT_AMP_Y;

    let targetRotX = driftX;
    let targetRotY = driftY;

    if (enablePointerTilt) {
      // R3F pointer is NDC; tip toward cursor, clamped ±8°
      targetRotX += THREE.MathUtils.clamp(
        -pointer.y * MAX_TILT_RAD,
        -MAX_TILT_RAD,
        MAX_TILT_RAD,
      );
      targetRotY += THREE.MathUtils.clamp(
        pointer.x * MAX_TILT_RAD,
        -MAX_TILT_RAD,
        MAX_TILT_RAD,
      );
    }

    const g = groupRef.current;
    g.position.y = THREE.MathUtils.lerp(g.position.y, floatY, LERP);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, LERP);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, LERP);
  });

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colors.background),
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.6,
        thickness: 0.3,
        transparent: true,
        ior: 1.45,
        envMapIntensity: 0.85,
      }),
    [],
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(colors.accent),
        toneMapped: false,
      }),
    [],
  );

  const creamMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(colors.text),
        toneMapped: false,
      }),
    [],
  );

  // Front face sits just proud of the glass box
  const faceZ = PANEL_D / 2 + 0.008;

  return (
    <group ref={groupRef}>
      {/* Extruded glass body — bezel/edge visible at angle */}
      <mesh material={glassMat} castShadow>
        <boxGeometry args={[PANEL_W, PANEL_H, PANEL_D]} />
      </mesh>

      {/* Gold nav suggestion */}
      <mesh
        position={[0, PANEL_H * 0.32, faceZ]}
        material={goldMat}
      >
        <planeGeometry args={[PANEL_W * 0.72, 0.11]} />
      </mesh>

      {/* Cream headline suggestion */}
      <mesh
        position={[0, PANEL_H * 0.12, faceZ + 0.002]}
        material={creamMat}
      >
        <planeGeometry args={[PANEL_W * 0.62, 0.16]} />
      </mesh>

      {/* Cream subhead suggestion */}
      <mesh
        position={[0, PANEL_H * -0.02, faceZ + 0.004]}
        material={creamMat}
      >
        <planeGeometry args={[PANEL_W * 0.42, 0.08]} />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      {/* Soft warm ambient */}
      <ambientLight intensity={0.4} color={colors.text} />
      {/* Key — upper-front gold, drives glass specular */}
      <directionalLight
        position={[2.5, 3.2, 4]}
        intensity={1.15}
        color={colors.goldLight}
        castShadow={false}
      />
      {/* Cool rim — back/side edge definition on navy */}
      <directionalLight
        position={[-3.5, 0.8, -2.5]}
        intensity={0.32}
        color={colors.subtle}
      />
    </>
  );
}

function SceneContent({ staticPose }: { staticPose: boolean }) {
  const enablePointerTilt = useFinePointer();

  return (
    <>
      <SceneLights />
      {/* Minimal env so MeshPhysicalMaterial transmission/refraction reads */}
      <Environment preset="city" environmentIntensity={0.55} />
      <ScreenMesh
        staticPose={staticPose}
        enablePointerTilt={!staticPose && enablePointerTilt}
      />
    </>
  );
}

/**
 * Client-only WebGL stand-in for DraftingScene Phase 3 —
 * a glass browser panel with real geometry UI layers.
 * Import via next/dynamic `{ ssr: false }`.
 */
export function DraftedScreen({
  className = "",
  staticPose = false,
}: DraftedScreenProps) {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>();

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <div
      className={`h-full w-full ${className}`.trim()}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 32, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        // Track pointer across the page so tilt works behind hero copy
        eventSource={eventSource}
        eventPrefix="client"
        // Reduced motion: render once, no continuous useFrame loop
        frameloop={staticPose ? "demand" : "always"}
      >
        <SceneContent staticPose={staticPose} />
        {staticPose ? <InvalidateOnce /> : null}
      </Canvas>
    </div>
  );
}

/** Kick a single frame when frameloop is "demand" (static / reduced-motion). */
function InvalidateOnce() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [invalidate]);
  return null;
}
