import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

const MiniGameSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hearts, setHearts] = useState<boolean[]>([false, false, false, false, false]);
  const [isComplete, setIsComplete] = useState(false);
  const { burst } = useConfetti();

  const complimentMessages = [
    "You make my heart skip a beat 💓",
    "Every moment with you is precious ✨",
    "You're my favorite person 💕",
    "I'm so lucky to have you 🌟",
    "You light up my world 💫",
  ];

  const [revealedMessage] = useState(() => 
    complimentMessages[Math.floor(Math.random() * complimentMessages.length)]
  );

  const filledCount = hearts.filter(Boolean).length;
  const progress = (filledCount / hearts.length) * 100;

  const handleHeartClick = useCallback((index: number) => {
    if (isComplete || hearts[index]) return;

    const newHearts = [...hearts];
    newHearts[index] = true;
    setHearts(newHearts);

    // Small burst on each heart
    burst({ x: 0.5, y: 0.5, count: 8 });

    // Check completion
    const newFilledCount = newHearts.filter(Boolean).length;
    if (newFilledCount === hearts.length) {
      setIsComplete(true);
      setTimeout(() => {
        burst({ x: 0.5, y: 0.4, count: 20 });
      }, 300);
    }
  }, [hearts, isComplete, burst]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--neon-pink) / 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-neon-pink/70 mb-4">
            🎮 Mini Game 🎮
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Fill the Hearts
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tap each heart to unlock a sweet message
          </p>
        </motion.div>

        {/* Hearts Row */}
        <motion.div
          className="flex justify-center gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {hearts.map((filled, index) => (
            <motion.button
              key={index}
              className="relative w-12 h-12 md:w-16 md:h-16 cursor-pointer focus:outline-none"
              onClick={() => handleHeartClick(index)}
              whileHover={!filled && !isComplete ? { scale: 1.1 } : {}}
              whileTap={!filled && !isComplete ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className={`text-4xl md:text-5xl block transition-all duration-300 ${
                  filled ? 'opacity-100' : 'opacity-40 grayscale'
                }`}
                animate={filled ? {
                  scale: [1, 1.3, 1],
                } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {filled ? '❤️' : '🤍'}
              </motion.span>

              {/* Glow effect when filled */}
              {filled && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.4, scale: 1.5 }}
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--neon-pink) / 0.6) 0%, transparent 70%)',
                  }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="max-w-xs mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--neon-pink)) 0%, hsl(var(--hot-coral)) 100%)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <p className="text-white/40 text-xs mt-2">
            {filledCount} of {hearts.length} hearts filled
          </p>
        </motion.div>

        {/* Revealed Message */}
        <motion.div
          className="min-h-[80px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isComplete ? (
            <motion.div
              className="card-wrapped px-8 py-6"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                boxShadow: '0 0 40px hsl(var(--neon-pink) / 0.3)',
              }}
            >
              <motion.p
                className="font-handwritten text-xl md:text-2xl text-white"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {revealedMessage}
              </motion.p>
            </motion.div>
          ) : (
            <p className="text-white/30 text-sm italic">
              Keep tapping to reveal the message...
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MiniGameSection;
