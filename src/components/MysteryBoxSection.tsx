import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

const MysteryBoxSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isRevealed, setIsRevealed] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const { burst } = useConfetti();

  // Sample images - can be replaced with real photos
  const revealImages = [
    { emoji: '💕', label: 'Our love' },
    { emoji: '🌟', label: 'You shine' },
    { emoji: '💝', label: 'My heart' },
    { emoji: '✨', label: 'Magic' },
  ];

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap < DOUBLE_TAP_DELAY && !isRevealed) {
      setIsRevealed(true);
      burst({ x: 0.5, y: 0.5, count: 25 });
    }
    setLastTap(now);
  }, [lastTap, isRevealed, burst]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--deep-magenta) / 0.2) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-deep-magenta/70 mb-4">
            🎁 Mystery Box 🎁
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Double-Tap to Reveal
          </h2>
          <p className="mt-4 text-muted-foreground">
            A hidden treasure awaits your curiosity
          </p>
        </motion.div>

        {/* Mystery Box Container */}
        <motion.div
          className="relative mx-auto w-48 h-48 md:w-64 md:h-64 cursor-pointer select-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={handleDoubleTap}
          onTouchEnd={handleDoubleTap}
        >
          {/* Closed Box */}
          <AnimatePresence mode="wait">
            {!isRevealed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-full h-full rounded-3xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(145deg, hsl(var(--deep-magenta)) 0%, hsl(var(--electric-purple)) 100%)',
                    boxShadow: '0 20px 60px -15px hsl(var(--deep-magenta) / 0.5)',
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      '0 20px 60px -15px hsl(var(--deep-magenta) / 0.5)',
                      '0 25px 70px -15px hsl(var(--deep-magenta) / 0.7)',
                      '0 20px 60px -15px hsl(var(--deep-magenta) / 0.5)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span
                    className="text-7xl md:text-8xl"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🎁
                  </motion.span>
                </motion.div>

                {/* Subtle sparkles */}
                {[...Array(4)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-lg text-golden-yellow"
                    style={{
                      top: `${15 + (i * 20)}%`,
                      left: i % 2 === 0 ? '5%' : '85%',
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ✨
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Revealed Images */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div className="absolute inset-0">
                {revealImages.map((item, index) => {
                  const angle = (index / revealImages.length) * 360;
                  const radius = 90;
                  const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                  const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
                  const rotation = (index - 1.5) * 8;

                  return (
                    <motion.div
                      key={index}
                      className="absolute left-1/2 top-1/2 w-16 h-16 md:w-20 md:h-20 -ml-8 -mt-8 md:-ml-10 md:-mt-10"
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        scale: 0, 
                        opacity: 0,
                        rotate: 0,
                      }}
                      animate={{ 
                        x, 
                        y: y - 20, 
                        scale: 1, 
                        opacity: 1,
                        rotate: rotation,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.12,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <motion.div
                        className="w-full h-full rounded-xl flex items-center justify-center text-3xl md:text-4xl"
                        style={{
                          background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(0 0% 12%) 100%)',
                          boxShadow: '0 10px 30px -10px hsl(0 0% 0% / 0.6)',
                        }}
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: index * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {item.emoji}
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Center heart */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    💝
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Instruction text */}
        <motion.p
          className="mt-10 text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {isRevealed ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-neon-pink/70"
            >
              ✨ Surprise unlocked! ✨
            </motion.span>
          ) : (
            "Double-tap the box to open"
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default MysteryBoxSection;
