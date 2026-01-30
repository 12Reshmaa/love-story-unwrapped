import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const LoveLetterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const letterContent = [
    "To the one who changed everything,",
    "",
    "There are words stuck between my heart and my lips. Things I mean to say but never quite manage. This is my attempt.",
    "",
    "You came into my life like the softest sunrise — gentle, warm, and completely transformative. Before you, I didn't know what it meant to be truly seen.",
    "",
    "Every moment with you feels like coming home. Your laugh is my favorite sound. Your presence is my peace. Your love is my greatest adventure.",
    "",
    "Thank you for every laugh, every late-night conversation, every hand held during uncertain moments. Thank you for choosing me, again and again.",
    "",
    "You are my favorite hello and my hardest goodbye. My best friend. My greatest love.",
    "",
    "This letter is just the beginning. Our story has so many more chapters to write, and I want to write every single one with you.",
    "",
    "Forever and always,",
    "Yours 💕",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      {/* Warm gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--hot-coral) / 0.1) 0%, hsl(var(--golden-yellow) / 0.1) 100%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-golden-yellow/70 mb-4">
            ✉️ From My Heart ✉️
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            A Letter I'll Never Regret Writing
          </h2>
          <p className="mt-4 text-muted-foreground italic">
            Everything I don't say enough.
          </p>
        </motion.div>

        {/* Letter card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Paper shadow layers */}
          <div className="absolute -bottom-2 -right-2 left-2 top-2 bg-hot-coral/10 rounded-2xl" />
          <div className="absolute -bottom-1 -right-1 left-1 top-1 bg-golden-yellow/10 rounded-2xl" />
          
          {/* Main letter */}
          <div 
            className="relative rounded-2xl p-8 md:p-12 shadow-2xl border border-golden-yellow/20"
            style={{
              background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(0 0% 10%) 100%)',
            }}
          >
            {/* Line decoration */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-neon-pink/20" />

            <div className="space-y-4 pl-6 md:pl-8">
              {letterContent.map((line, index) => (
                <motion.p
                  key={index}
                  className={`font-handwritten text-lg md:text-xl lg:text-2xl ${
                    line === '' ? 'h-4' : ''
                  } ${
                    index === 0 || index >= letterContent.length - 2 
                      ? 'text-neon-pink' 
                      : 'text-white/80'
                  }`}
                  style={{ lineHeight: '2rem' }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative hearts */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {['💌', '💕', '💌'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-3xl"
              animate={{
                y: [0, -6, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetterSection;
