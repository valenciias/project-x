import { Button } from "@/components/ui/button";
import IlluminatiScene from "@/components/IlluminatiScene";
import PriceTracker from "@/components/PriceTracker";
import { motion } from "framer-motion";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState, useRef } from "react";
import MatrixRain from "@/components/MatrixRain";
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
      {/* Enhanced lighting setup */}
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

export default function Hero() {
  const { wallet } = useWallet();
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setShowMatrixRain(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBluePill = () => {
    setIsShaking(true);
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

    setTimeout(() => {
      clearInterval(glitchInterval);
      window.location.reload();
    }, 2000);
  };

  const handleRedPill = () => {
    setShowPhoneModal(true);
  };

  const handlePillClick = (pill: 'red' | 'blue') => {
    if (pill === 'blue') {
      handleBluePill();
    } else {
      handleRedPill();
    }
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

  return (
    <section className="min-h-screen relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute inset-0 pointer-events-none"
      >
        <MatrixRain />
      </motion.div>

      <IlluminatiScene />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-8xl md:text-8xl leading-normal font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
            animate={{
              textShadow: [
                "0 0 10px rgba(55, 161, 105, 0.5)",
                "0 0 20px rgba(55, 161, 105, 0.7)",
                "0 0 10px rgba(55, 161, 105, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Choose Wisely
          </motion.h2>

          <div className="max-w-4xl mx-auto mb-5">
            <div className="h-[400px] sm:h-[600px] px-2 sm:px-4 relative">
              <Canvas
                className="absolute inset-0"
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

          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
            animate={{
              textShadow: [
                "0 0 10px rgba(55, 161, 105, 0.5)",
                "0 0 20px rgba(55, 161, 105, 0.7)",
                "0 0 10px rgba(55, 161, 105, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Project-X
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            The all-seeing AI Crypto assistant that knows more than it should
          </motion.p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !h-12 !px-8 !rounded-lg !text-lg" />
            <Button
              size="lg"
              variant="outline"
              className="h-12 text-lg px-8 border-primary/20 hover:border-primary/40 backdrop-blur"
              onClick={() => toast({
                title: "Coming Soon",
                description: "Check back later for the whitepaper",
              })}            >
              Read Whitepaper
            </Button>
          </div>

          {wallet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-primary/80"
            >
              Connected: {wallet.adapter.name}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <PriceTracker />
        </motion.div>
      </div>

      <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Phone Number</DialogTitle>
            <DialogDescription>
              You've chosen to see the truth. Enter your phone number to receive further instructions from Project-X.
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
    </section>
  );
}