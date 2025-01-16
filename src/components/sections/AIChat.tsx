import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChat() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([
    { type: 'bot', content: 'I am Project-X, your crypto AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    // Simulated bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'I see potential in your inquiry. The markets reveal interesting patterns...'
      }]);
    }, 1000);
    setInput('');
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Consult the AI</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seek guidance from Project-X's advanced neural networks
          </p>
        </motion.div>

        <Card className="max-w-2xl mx-auto bg-background/50 backdrop-blur border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4 mb-4 h-[300px] overflow-y-auto">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''
                      }`}
                  >
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary' : 'bg-muted'
                      }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`flex-1 p-4 rounded-lg ${message.type === 'user'
                      ? 'bg-primary/20 ml-12'
                      : 'bg-muted/50 mr-12'
                      }`}>
                      {message.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Project-X..."
                className="flex-1"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
