import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import HolographicEffect from '@/components/sections/HolographicEffect';
import { useToast } from '@/hooks/use-toast';
import { CELEBRITIES } from '@/lib/constants';
import { Share2, RotateCcw } from 'lucide-react';

interface ChatInterfaceProps {
  selectedCelebrity: string;
  onReset: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// Mock trending data for MVP
const TRENDING_CONSPIRACIES = [
  "Mysterious whale movements detected",
  "Hidden signals in blockchain patterns",
  "Cryptographic anomalies discovered"
];

export default function ChatInterface({ selectedCelebrity, onReset }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const celebrity = CELEBRITIES.find(c => c.id === selectedCelebrity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          celebrity: selectedCelebrity
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: data.message,
        sender: 'ai'
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response from the AI",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (text: string) => {
    const tweetText = encodeURIComponent(`"${text}" - Evil ${celebrity?.name} via Evil Conspiracy Oracle`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <div className="flex gap-4">
      {/* Trending Conspiracies Sidebar */}
      <Card className="hidden md:block w-64 p-4 bg-black/70 backdrop-blur">
        <h3 className="text-lg font-bold text-primary-foreground mb-4">Trending Conspiracies</h3>
        <ul className="space-y-2">
          {TRENDING_CONSPIRACIES.map((conspiracy, index) => (
            <li key={index} className="text-sm text-muted-foreground">{conspiracy}</li>
          ))}
        </ul>
      </Card>

      {/* Main Chat Interface */}
      <Card className="flex-1 p-4 bg-black/70 backdrop-blur">
        <div className="flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-muted-foreground hover:text-primary-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Switch Celebrity
            </Button>

            <HolographicEffect active={true}>
              <div className="w-24 h-24 bg-primary/20 rounded-full mb-2" />
              <h2 className="text-xl font-bold text-center text-primary-foreground">
                Evil {celebrity?.name}
              </h2>
            </HolographicEffect>

            <div className="w-[72px]" /> {/* Spacer for centering */}
          </div>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%]">
                    <div
                      className={`p-3 rounded-lg ${message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                        }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === 'ai' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 text-muted-foreground"
                        onClick={() => handleShare(message.text)}
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share on Twitter
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about crypto conspiracies..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}