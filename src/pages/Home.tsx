import { useEffect, useState } from 'react';
import Scene3D from '@/components/sections/Scene3D';
import CelebritySelector from '@/components/sections/CelebritySelector';
import ChatInterface from '@/components/sections/ChatInterface';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SiGithub } from 'react-icons/si';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [selectedCelebrity, setSelectedCelebrity] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0">
        <Scene3D />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {!started ? (
          <Card className="p-8 bg-black/70 backdrop-blur">
            <h1 className="text-4xl font-bold mb-4 text-primary-foreground">
              Welcome to the Evil Conspiracy Oracle
            </h1>
            <Button
              className="w-full"
              onClick={() => setStarted(true)}
            >
              Enter the Oracle
            </Button>
          </Card>
        ) : !selectedCelebrity ? (
          <CelebritySelector onSelect={setSelectedCelebrity} />
        ) : (
          <div className="w-full max-w-4xl">
            <ChatInterface
              selectedCelebrity={selectedCelebrity}
              onReset={() => {
                setSelectedCelebrity(null);
              }}
            />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}