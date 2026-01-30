import { motion } from 'framer-motion';
import { useEffect } from 'react';
import FloatingParticles from './FloatingParticles';
import { useConfetti } from '@/hooks/useConfetti';

const HeroSection = () => {
  const { explosion, shower } = useConfetti();

  useEffect(() => {
    // Delayed gentle confetti on load
    const timer = setTimeout(() => {
      explosion(0.5, 0.5);
      shower();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient">
      <FloatingParticles count={30} intense />
      
      {/* Smooth spinning background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(var(--electric-purple)) 0%, transparent 70%)',
          }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(var(--neon-pink)) 0%, transparent 70%)',
          }}
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Personal headline */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block text-lg md:text-xl uppercase tracking-[0.3em] text-white/60 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            This is for you
          </motion.span>
        </motion.div>

        {/* Main name/headline */}
        <motion.h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-none"
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.span
            className="text-gradient-bold inline-block"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            My Love
          </motion.span>
        </motion.h1>

        {/* Emotional subtitle */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-2xl mx-auto font-medium"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          I made something special just for you 💕
        </motion.p>

        {/* Decorative heart */}
        <motion.div
          className="mt-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="text-6xl md:text-7xl inline-block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            💝
          </motion.span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex flex-col items-center gap-2 text-white/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm uppercase tracking-widest">Scroll to begin</span>
            <motion.svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
