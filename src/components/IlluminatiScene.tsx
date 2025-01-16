import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stars, 
  PerspectiveCamera,
  Float,
  Sparkles,
  useTexture,
  MeshDistortMaterial
} from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

function IlluminatiEye() {
  const eyeMaterial = useMemo(() => new THREE.ShaderMaterial({
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
        float iris = smoothstep(0.2, 0.21, dist) * smoothstep(0.45, 0.44, dist);
        float pupil = smoothstep(0.28, 0.27, dist);
        float glow = smoothstep(0.45, 0.2, dist) * 0.8;

        vec3 eyeColor = mix(color, color * 2.0, pupil);
        eyeColor = mix(eyeColor, color * 0.5, iris);
        eyeColor += color * glow * (sin(time) * 0.5 + 0.5);

        gl_FragColor = vec4(eyeColor, 1.0);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(({ clock }) => {
    eyeMaterial.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0.2, 1]} rotation={[0, 0, 0]}>
      <circleGeometry args={[0.5, 32]} />
      <primitive object={eyeMaterial} attach="material" />
    </mesh>
  );
}

function PyramidScene() {
  const pyramidRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create custom shader material for the matrix effect
  const matrixMaterial = useMemo(() => new THREE.ShaderMaterial({
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
        float strength = mod(vUv.y * 10.0 - time + noise, 1.0);
        strength = pow(strength, 3.0);

        vec3 glow = color * (strength * 2.0 + 0.5);
        float alpha = strength * 0.8 * (1.0 - abs(vPosition.y));
        gl_FragColor = vec4(glow, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  }), []);

  // Create particles geometry
  const positions = useMemo(() => {
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (pyramidRef.current) {
      pyramidRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      pyramidRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
      matrixMaterial.uniforms.time.value = clock.getElapsedTime();
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      particlesRef.current.rotation.x = mouse.y * 0.2;
      particlesRef.current.rotation.z = mouse.x * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#37a169" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#37a169" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={pyramidRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0, 2, 2, 3]} />
          <MeshDistortMaterial
            color="#37a169"
            metalness={0.9}
            roughness={0.1}
            emissive="#37a169"
            emissiveIntensity={0.5}
            distort={0.4}
            speed={2}
          />
          <mesh scale={1.05}>
            <cylinderGeometry args={[0, 2.1, 2.1, 3]} />
            <primitive object={matrixMaterial} attach="material" />
          </mesh>
          <IlluminatiEye />
        </mesh>
      </Float>

      <Sparkles 
        count={200}
        scale={12}
        size={4}
        speed={0.4}
        color="#37a169"
        opacity={0.7}
      />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.02} 
          color="#37a169" 
          transparent
          opacity={0.6}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Stars 
        radius={50}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

export default function IlluminatiScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <PyramidScene />
        </Suspense>
      </Canvas>
    </div>
  );
}