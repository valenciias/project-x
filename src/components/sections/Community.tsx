import { Button } from "@/components/ui/button";
import { SiDiscord, SiTelegram, SiGithub } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import MatrixRain from "../MatrixRain";

const socialLinks = [
  { icon: FaXTwitter, label: "Twitter", href: "https://x.com/project-x" },
  { icon: SiDiscord, label: "Discord", href: "#" },
  { icon: SiTelegram, label: "Telegram", href: "#" }
];

export default function Community() {
  return (
    <section className="py-24 bg-black/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute inset-0 pointer-events-none"
      >
        <MatrixRain />
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Project X Community</h2>
          {/* <p className="text-lg text-muted-foreground mb-12">
            Connect with fellow initiates and stay updated on the latest revelations
          </p> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg gap-3 border-primary/20 hover:border-primary/40"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="w-6 h-6" />
                    {link.label}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-background/20 backdrop-blur border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <SiGithub className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">Build the Future with Project X</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Contribute to our open-source AI agent
                  <br /> and shape the next generation of blockchain conspiracies.
                  {/* Open Source AI Agent. <br className="block md:hidden" /> Make your contribution. */}
                </p>
                <Button
                  variant="outline"
                  className="w-full h-12 text-lg border-primary/20 hover:border-primary/40"
                  asChild
                >
                  <a
                    href="https://github.com/valenciias/project-x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <SiGithub className="w-5 h-5" />
                    View Repository
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}