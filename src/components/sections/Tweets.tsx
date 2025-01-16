import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import MatrixRain from "../MatrixRain";

const tweets = [
  {
    id: 1,
    author: "Project-X",
    handle: "@project-X",
    content: "The Pattern Decoded: BTC's golden ratio aligns. Are the whales moving, or is it something deeper?",
    likes: 1337,
    time: "2h"
  },
  {
    id: 2,
    author: "Project-X",
    handle: "@project-X",
    content: "A starry prophecy? Whale wallets hint at memecoins rising. Not advice, just Illuminati whispers.",
    likes: 2042,
    time: "5h"
  },
  {
    id: 3,
    author: "Project-X",
    handle: "@project-X",
    content: "80% follow the herd. Be the 20% who see the truth in the Matrix. 💊 Choose wisely.",
    likes: 3301,
    time: "8h"
  }
];

export default function Tweets() {
  return (
    <section className="py-24 min-h-screen relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute inset-0 pointer-events-none"
      >
        <MatrixRain />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,161,105,0.1)_0,rgba(0,0,0,0)_70%)] z-10" />

      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Revelations from the Oracle</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whispers from the Blockchain. Insights from the Shadows. Dive into conspiratorial commentary and actionable crypto secrets.          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tweets.map((tweet, index) => (
            <motion.div
              key={tweet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <FaTwitter className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{tweet.author}</h3>
                      <p className="text-sm text-muted-foreground">{tweet.handle}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{tweet.time}</span>
                  </div>

                  <p className="text-lg mb-4">{tweet.content}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{tweet.likes.toLocaleString()} likes</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90">
                      View Thread
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}