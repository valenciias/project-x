import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as THREE from 'three';

const illuminatiAlphabet: Record<string, string> = {
  'A': '∆', 'B': '฿', 'C': '©', 'D': '⌭', 'E': '€', 
  'F': 'Ƒ', 'G': 'Ğ', 'H': 'Ħ', 'I': 'ῗ', 'J': 'J',
  'K': 'Ҡ', 'L': '⅃', 'M': 'M', 'N': 'Ṅ', 'O': '◎',
  'P': 'Ᵽ', 'Q': 'Q', 'R': 'Ɍ', 'S': '§', 'T': '₮',
  'U': 'Ʊ', 'V': '∀', 'W': 'Ш', 'X': 'Ж', 'Y': 'Ψ',
  'Z': 'Ƶ', ' ': ' '
};

function HolographicSymbol({ onClick }: { onClick: () => void }) {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh onClick={onClick}>
        <torusGeometry args={[1.5, 0.4, 16, 32]} />
        <meshStandardMaterial
          color="#37a169"
          metalness={0.9}
          roughness={0.1}
          emissive="#37a169"
          emissiveIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function IlluminatiCodeTranslator() {
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  const translateText = (text: string) => {
    return text.toUpperCase().split('')
      .map(char => illuminatiAlphabet[char] || char)
      .join('');
  };

  const handleTranslate = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setTranslated(translateText(input));
      setIsRevealing(false);
    }, 1000);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,161,105,0.1)_0,rgba(0,0,0,0)_70%)]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Illuminati Code Translator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Decode the ancient symbols and reveal hidden truths
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-background/50 backdrop-blur border-primary/20">
            <CardContent className="p-6">
              <div className="mb-6">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your message..."
                  className="mb-4"
                />
                <Button 
                  onClick={handleTranslate}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Translate to Illuminati Code
                </Button>
              </div>

              <motion.div
                animate={{
                  opacity: isRevealing ? [1, 0, 1] : 1,
                  scale: isRevealing ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 1 }}
                className="p-4 border border-primary/20 rounded-lg min-h-[100px] flex items-center justify-center text-2xl"
              >
                {translated || 'Awaiting translation...'}
              </motion.div>
            </CardContent>
          </Card>

          <div className="h-[400px]">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <HolographicSymbol onClick={handleTranslate} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}