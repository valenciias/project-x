import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import MatrixRain from './MatrixRain';

function PyramidScene() {
  // Create shader material with proper uniforms
  const pyramidMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#37a169") }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453123);
          float pulse = sin(vPosition.y * 10.0 + time) * 0.5 + 0.5;
          vec3 glow = color * (pulse * 2.0 + 0.5);
          float alpha = pulse * 0.8 * (1.0 - abs(vPosition.y));
          gl_FragColor = vec4(glow, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);

  const eyeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#37a169") }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;

        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);

          // Enhanced iris pattern
          float iris = smoothstep(0.2, 0.21, dist) * smoothstep(0.45, 0.44, dist);
          // Pulsing pupil
          float pupilSize = sin(time) * 0.05 + 0.25;
          float pupil = smoothstep(pupilSize + 0.02, pupilSize, dist);
          // Dynamic glow
          float glow = smoothstep(0.45, 0.2, dist) * (sin(time * 2.0) * 0.5 + 1.0);

          // Combine layers with enhanced effects
          vec3 eyeColor = mix(color * 2.0, color * 0.5, iris);
          eyeColor = mix(eyeColor, color * 3.0, pupil);
          eyeColor += color * glow * 0.8;

          // Add subtle energy lines
          float energyLines = sin(vUv.y * 40.0 + time * 3.0) * 0.1 + 0.9;
          eyeColor *= energyLines;

          gl_FragColor = vec4(eyeColor, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Update time uniforms in animation frame
  useFrame((state) => {
    pyramidMaterial.uniforms.time.value = state.clock.getElapsedTime();
    eyeMaterial.uniforms.time.value = state.clock.getElapsedTime();
  });

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#37a169" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#37a169" />

      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh scale={2}>
          <cylinderGeometry args={[0, 2, 2, 3]} />
          <primitive object={pyramidMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.2, 0.8]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.6, 32]} />
          <primitive object={eyeMaterial} attach="material" />
        </mesh>
      </Float>

      <points>
        <primitive object={particlesGeometry} attach="geometry" />
        <pointsMaterial
          size={0.02}
          color="#37a169"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Stars
        radius={100}
        depth={50}
        count={7000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />
    </>
  );
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase(1);
      setTimeout(() => {
        setAnimationPhase(2);
        setTimeout(onComplete, 1500);
      }, 4000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      animate={{
        opacity: animationPhase === 2 ? 0 : 1
      }}
      transition={{ duration: 1.5 }}
    >
      <MatrixRain />

      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <PyramidScene />
      </Canvas>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: animationPhase >= 1 ? 1 : 0,
          scale: animationPhase >= 1 ? [1, 1.2, 1] : 0.8
        }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
      >
        <h1 className=" text-6xl lg:text-8xl sm:text-7xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
          Project-X
        </h1>
      </motion.div>
    </motion.div>
  );
}