import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

const ScratchCardSection = () => {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const { celebration, explosion } = useConfetti();

  const revealThreshold = 50; // Percentage needed to reveal

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Draw scratch surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#ff6bae');
    gradient.addColorStop(0.5, '#a855f7');
    gradient.addColorStop(1, '#06b6d4');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add shimmer pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 4 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 18px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch to reveal! ✨', rect.width / 2, rect.height / 2);
  }, [isRevealed]);

  // Calculate scratch percentage
  const calculateScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    return (transparent / total) * 100;
  }, []);

  // Handle scratching
  const scratch = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * 2;
      y = (e.touches[0].clientY - rect.top) * 2;
    } else {
      x = (e.clientX - rect.left) * 2;
      y = (e.clientY - rect.top) * 2;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    const newPercentage = calculateScratchPercentage();
    setScratchPercentage(newPercentage);

    if (newPercentage >= revealThreshold && !isRevealed) {
      setIsRevealed(true);
      celebration();
      setTimeout(() => explosion(0.5, 0.5), 200);
    }
  }, [isRevealed, calculateScratchPercentage, celebration, explosion]);

  const handleInteractionStart = () => setIsScratching(true);
  const handleInteractionEnd = () => setIsScratching(false);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden animated-gradient">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {['🎁', '✨', '💝', '🎀', '⭐', '💕', '🌟', '💖'][i]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block text-sm font-medium tracking-widest uppercase text-white/60 mb-4"
          >
            🎁 A Special Surprise 🎁
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Scratch to Reveal
          </h2>
          <p className="mt-4 text-white/70">
            Something special is hiding underneath...
          </p>
        </motion.div>

        {/* Scratch card */}
        <motion.div
          className="relative mx-auto max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 107, 174, 0.2)',
          }}
        >
          {/* Hidden content underneath */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span 
                className="text-6xl md:text-7xl block mb-4"
                animate={isRevealed ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                💝
              </motion.span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                You're My Everything
              </h3>
              <p className="text-white/70 font-handwritten text-lg">
                Every moment with you is a gift 💕
              </p>
            </motion.div>
          </div>

          {/* Scratch canvas */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              onMouseDown={handleInteractionStart}
              onMouseUp={handleInteractionEnd}
              onMouseLeave={handleInteractionEnd}
              onMouseMove={(e) => isScratching && scratch(e)}
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
              onTouchMove={scratch}
            />
          )}

          {/* Progress indicator */}
          {!isRevealed && scratchPercentage > 0 && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-white/80 text-sm">
                {Math.round(scratchPercentage)}% revealed
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Hint text */}
        <motion.p
          className="mt-8 text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView && !isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          {isScratching ? "Keep going! ✨" : "Use your finger or mouse to scratch"}
        </motion.p>

        {/* Celebration text */}
        {isRevealed && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="flex justify-center gap-3"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {['🎉', '💕', '✨', '💕', '🎉'].map((emoji, i) => (
                <span key={i} className="text-2xl">{emoji}</span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ScratchCardSection;
