import { motion } from 'framer-motion';

interface HolographicEffectProps {
  children: React.ReactNode;
  active?: boolean;
}

export default function HolographicEffect({ children, active = false }: HolographicEffectProps) {
  return (
    <motion.div
      animate={{
        opacity: active ? [0.5, 1, 0.5] : 1,
        scale: active ? [0.98, 1.02, 0.98] : 1,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      className="relative"
      style={{
        boxShadow: active ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none',
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
      {active && (
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
}
