import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ExtraSurprisesHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-16 md:py-20 px-6 relative overflow-hidden bg-background">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--electric-purple) / 0.2) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="text-4xl md:text-5xl inline-block mb-6"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white/80 mb-3">
            Extra little surprises you can add
          </h2>
          
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto">
            Interactive moments to make your page even more special
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-electric-purple/40 to-transparent" />
          <motion.span
            className="text-xl"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            💕
          </motion.span>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-electric-purple/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default ExtraSurprisesHeader;
