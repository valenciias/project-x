import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Float,
  Stars,
  Html
} from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import * as THREE from 'three';

function HolographicToken({ onSummon }: { onSummon: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float
      speed={2}
      rotationIntensity={2}
      floatIntensity={2}
      position={[0, 0, 0]}
    >
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onSummon}
        scale={hovered ? 1.2 : 1}
      >
        <mesh>
          <torusGeometry args={[2, 0.5, 32, 100]} />
          <meshStandardMaterial
            color="#37a169"
            metalness={0.9}
            roughness={0.1}
            emissive="#37a169"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>

        <Html center>
          <div className="text-center pointer-events-none">
            <p className="text-primary text-lg font-bold mb-2">Project-X Token</p>
            <p className="text-sm text-muted-foreground">Click to summon</p>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function ParticleField({ active }: { active: boolean }) {
  const particlesCount = 1000;
  const [positions] = useState(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  });

  return (
    <points scale={active ? 2 : 1}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#37a169"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SummoningZone() {
  const [summoning, setSummoning] = useState(false);

  const handleSummon = () => {
    setSummoning(true);
    setTimeout(() => setSummoning(false), 3000);
  };

  return (
    <section className="min-h-screen relative py-24">
      <div className="absolute inset-0">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <group scale={summoning ? 1.5 : 1}>
            <HolographicToken onSummon={handleSummon} />
            <ParticleField active={summoning} />
          </group>

          <Stars
            radius={50}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Summon Project-X
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interact with the holographic token to witness the power of Project-X
          </p>
        </motion.div>
      </div>
    </section>
  );
}