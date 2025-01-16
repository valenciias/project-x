import { Card, CardContent } from "@/components/ui/card";
import { Eye, Brain, Zap, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Eye,
    title: "All-Seeing AI",
    description: "Advanced market analysis and pattern recognition across multiple chains"
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description: "Machine learning algorithms that forecast market movements"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute trades at unprecedented speeds with minimal slippage"
  },
  {
    icon: Lock,
    title: "Secure Operations",
    description: "Military-grade encryption and secure trading protocols"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Illuminated Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Harness the power of ancient wisdom combined with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
