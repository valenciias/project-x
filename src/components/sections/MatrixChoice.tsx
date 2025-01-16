import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function PillsScene({ onPillClick }: { onPillClick: (pill: 'red' | 'blue') => void }) {
  const bluePillRef = useRef<THREE.Mesh>(null);
  const redPillRef = useRef<THREE.Mesh>(null);
  const [hoveredPill, setHoveredPill] = useState<'red' | 'blue' | null>(null);

  // Hover animations
  const hoverScale = 1.2;
  const normalScale = 1.0;
  const animationDuration = 0.3;

  const handlePillHover = (pill: 'red' | 'blue', isHovering: boolean) => {
    setHoveredPill(isHovering ? pill : null);
    const targetMesh = pill === 'red' ? redPillRef.current : bluePillRef.current;

    if (targetMesh) {
      const scale = isHovering ? hoverScale : normalScale;
      const intensity = isHovering ? 0.5 : 0.3;

      // Animate scale
      targetMesh.scale.setScalar(scale);

      // Animate emission intensity
      const material = targetMesh.material as THREE.MeshStandardMaterial;
      if (material) {
        material.emissiveIntensity = intensity;
      }
    }
  };

  return (
    <>
      {/* Enhanced lighting for better depth and visual appeal */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#fff6e6" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffe0cc" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
      />

      {/* Centered Pills */}
      <group position={[0, 0, 0]}>
        {/* Blue Pill */}
        <mesh
          ref={bluePillRef}
          position={[-1, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          onClick={() => onPillClick('blue')}
          onPointerOver={() => handlePillHover('blue', true)}
          onPointerOut={() => handlePillHover('blue', false)}
        >
          <capsuleGeometry args={[0.3, 0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#0066cc"
            metalness={0.7}
            roughness={0.2}
            emissive="#003366"
            emissiveIntensity={hoveredPill === 'blue' ? 0.5 : 0.3}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Red Pill */}
        <mesh
          ref={redPillRef}
          position={[1, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          onClick={() => onPillClick('red')}
          onPointerOver={() => handlePillHover('red', true)}
          onPointerOut={() => handlePillHover('red', false)}
        >
          <capsuleGeometry args={[0.3, 0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#cc0000"
            metalness={0.7}
            roughness={0.2}
            emissive="#660000"
            emissiveIntensity={hoveredPill === 'red' ? 0.5 : 0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </>
  );
}

export default function MatrixChoice() {
  const [isShaking, setIsShaking] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { toast } = useToast();

  const handleBluePill = () => {
    setIsShaking(true);

    // Create a dramatic glitch effect
    const glitchInterval = setInterval(() => {
      document.body.style.filter = `
        hue-rotate(${Math.random() * 360}deg) 
        blur(${Math.random() * 10}px)
      `;
      document.body.style.transform = `
        translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) 
        rotate(${Math.random() * 10 - 5}deg)
      `;
    }, 50);

    // After a dramatic pause, reload the page
    setTimeout(() => {
      clearInterval(glitchInterval);
      window.location.reload();
    }, 2000);
  };

  const handleRedPill = () => {
    setShowPhoneModal(true);
  };

  const handleSubmitPhone = () => {
    if (!phoneNumber.match(/^\+?[\d\s-]{10,}$/)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number to proceed",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome to the real world",
      description: "You'll receive a call shortly. The truth awaits.",
    });
    setShowPhoneModal(false);
    setPhoneNumber('');
  };

  const handlePillClick = (pill: 'red' | 'blue') => {
    if (pill === 'blue') {
      handleBluePill();
    } else {
      handleRedPill();
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <motion.div
        animate={isShaking ? {
          x: [0, -50, 50, -50, 50, -30, 30, -20, 20, -10, 10, 0],
          rotate: [0, -2, 2, -2, 2, -1, 1, -1, 1, 0],
          filter: [
            'brightness(1) contrast(1)',
            'brightness(1.2) contrast(1.5)',
            'brightness(0.8) contrast(2)',
            'brightness(1.2) contrast(1.5)',
            'brightness(1) contrast(1)',
          ]
        } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Wisely
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="h-[400px] mb-8">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <PillsScene onPillClick={handlePillClick} />
            </Canvas>
          </div>
        </div>

        <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Your Phone Number</DialogTitle>
              <DialogDescription>
                You've chosen to see the truth. Enter your phone number to receive further instructions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button 
                className="w-full"
                onClick={handleSubmitPhone}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </section>
  );
}