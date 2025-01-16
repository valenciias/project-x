import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function Scene() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0, 2, 2, 3]} />
      <meshStandardMaterial color="#37a169" metalness={0.6} roughness={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ambientLight intensity={0.5} />
    </mesh>
  );
}

export default function IlluminatiSymbol({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`${className} relative`}
      animate={{ rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <Canvas className="w-full h-full">
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
        <Scene />
      </Canvas>
    </motion.div>
  );
}