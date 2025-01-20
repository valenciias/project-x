import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CELEBRITIES } from '@/lib/constants';
import HolographicEffect from '@/components/sections/HolographicEffect';

interface CelebritySelectorProps {
  onSelect: (celebrity: string) => void;
}

export default function CelebritySelector({ onSelect }: CelebritySelectorProps) {
  const [hoveredCelebrity, setHoveredCelebrity] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {CELEBRITIES.map((celebrity) => (
        <Card
          key={celebrity.id}
          className="relative overflow-hidden cursor-pointer group"
          onMouseEnter={() => setHoveredCelebrity(celebrity.id)}
          onMouseLeave={() => setHoveredCelebrity(null)}
          onClick={() => onSelect(celebrity.id)}
        >
          <div className="p-6 bg-black/80 backdrop-blur h-full">
            <HolographicEffect active={hoveredCelebrity === celebrity.id}>
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full" />
                <h3 className="text-2xl font-bold text-center text-primary-foreground">
                  Evil {celebrity.name}
                </h3>
                <p className="text-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {celebrity.tagline}
                </p>
              </div>
            </HolographicEffect>
          </div>
        </Card>
      ))}
    </div>
  );
}