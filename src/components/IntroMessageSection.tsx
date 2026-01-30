import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const IntroMessageSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      {/* Warm gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--neon-pink) / 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Envelope icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -10 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="text-6xl md:text-7xl inline-block"
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💌
          </motion.span>
        </motion.div>

        {/* Welcome message */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Hey, you ✨
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            I've been wanting to put into words just how much you mean to me. 
            So I built this little corner of the internet — just for us.
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-white/50 italic"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Take your time. This is all yours.
          </motion.p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-neon-pink/40" />
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            💕
          </motion.span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-neon-pink/40" />
        </motion.div>
      </div>
    </section>
  );
};

export default IntroMessageSection;
