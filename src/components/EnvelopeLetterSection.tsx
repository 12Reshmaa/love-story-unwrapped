import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-golden-yellow/20"
    initial={{ 
      x: Math.random() * 100 - 50,
      y: 100,
      opacity: 0,
      scale: Math.random() * 0.5 + 0.5,
    }}
    animate={{ 
      y: -100,
      opacity: [0, 0.4, 0],
      x: Math.random() * 60 - 30,
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      delay: delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// Floating petal component for bouquet reveal
const FloatingPetal = ({ delay, startX }: { delay: number; startX: number }) => (
  <motion.div
    className="absolute"
    style={{ left: `${startX}%` }}
    initial={{ 
      y: 0,
      opacity: 0,
      rotate: 0,
      scale: 0.6,
    }}
    animate={{ 
      y: [0, -50, -30, -80],
      opacity: [0, 0.7, 0.5, 0],
      rotate: [0, 45, -30, 60],
      x: [0, 20, -15, 30],
    }}
    transition={{
      duration: 6 + Math.random() * 2,
      delay: delay,
      ease: "easeOut",
    }}
  >
    <svg 
      width="16" 
      height="20" 
      viewBox="0 0 16 20" 
      className="text-neon-pink/40"
      fill="currentColor"
    >
      <ellipse cx="8" cy="10" rx="6" ry="9" />
    </svg>
  </motion.div>
);

const EnvelopeLetterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'opening' | 'sliding' | 'unfolding1' | 'unfolding2' | 'revealed' | 'bouquet'>('idle');
  const [isHovered, setIsHovered] = useState(false);
  const [hasSeenBouquet, setHasSeenBouquet] = useState(false);

  const handleSealClick = () => {
    if (phase !== 'idle') return;
    
    // Staged reveal with intentional pauses
    setPhase('cracking');
    setTimeout(() => setPhase('opening'), 800);
    setTimeout(() => setPhase('sliding'), 1800);
    setTimeout(() => setPhase('unfolding1'), 2800);
    setTimeout(() => setPhase('unfolding2'), 3600);
    setTimeout(() => setPhase('revealed'), 4400);
  };

  const handleClose = () => {
    if (phase === 'revealed' && !hasSeenBouquet) {
      // Trigger bouquet moment after first reading
      setPhase('bouquet');
      setHasSeenBouquet(true);
      // Auto-dismiss bouquet after viewing
      setTimeout(() => setPhase('idle'), 6000);
    } else {
      setPhase('idle');
    }
  };

  const letterContent = {
    greeting: "My dearest love,",
    paragraphs: [
      "I've been carrying these words in my heart for so long, and now they finally have a place to rest — right here, just for you.",
      "Do you remember the first time we laughed until we couldn't breathe? Or the quiet moments when no words were needed, just being together was enough? Those are the moments I hold closest.",
      "You've taught me what it means to be truly seen, to be loved not despite my flaws but with them. With you, I've found a home I never knew I was searching for.",
    ],
    closing: "Forever and always,",
    signature: "Your person 💕",
  };

  const isOpen = phase !== 'idle' && phase !== 'cracking' && phase !== 'bouquet';
  const showLetter = phase === 'sliding' || phase === 'unfolding1' || phase === 'unfolding2' || phase === 'revealed';
  const letterUnfolded = phase === 'unfolding2' || phase === 'revealed';
  const fullyRevealed = phase === 'revealed';
  const showBouquet = phase === 'bouquet';

  return (
    <section 
      ref={ref} 
      className="py-24 md:py-32 px-6 relative overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(0 0% 8%) 0%, hsl(0 0% 4%) 100%)',
      }}
    >
      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.8} />
        ))}
      </div>

      {/* Subtle warm ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 60%, hsl(var(--golden-yellow) / 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Background blur overlay when letter is open - FIXED: Now separate from letter */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(0 0% 3% / 0.9) 0%, hsl(0 0% 2% / 0.97) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* BOUQUET REVEAL MOMENT */}
      <AnimatePresence>
        {showBouquet && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {/* Soft background overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(330 40% 8% / 0.95) 0%, hsl(0 0% 3% / 0.98) 100%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Floating petals */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <FloatingPetal key={i} delay={0.5 + i * 0.3} startX={20 + Math.random() * 60} />
              ))}
            </div>

            {/* Bouquet assembly */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.3, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 2.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3,
              }}
            >
              {/* Bouquet SVG/Emoji composition */}
              <div className="relative">
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--neon-pink) / 0.2) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    width: '200px',
                    height: '200px',
                    left: '-30px',
                    top: '-30px',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Flowers blooming in sequence */}
                <div className="relative flex items-end justify-center gap-1">
                  {['🌸', '🌷', '💐', '🌷', '🌸'].map((flower, i) => (
                    <motion.span
                      key={i}
                      className="text-4xl md:text-5xl"
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.8 + i * 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      style={{
                        transformOrigin: 'bottom center',
                      }}
                    >
                      {flower}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* "This is for you" text */}
              <motion.p
                className="font-handwritten text-xl md:text-2xl text-neon-pink/80 mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
              >
                This is for you.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !isOpen && !showBouquet ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-golden-yellow/60 mb-4">
            ✉️ Something Private ✉️
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground/90">
            A Letter For You
          </h2>
          <p className="mt-4 text-muted-foreground/70 italic text-sm">
            Break the seal when you're ready...
          </p>
        </motion.div>

        {/* Envelope Container */}
        <motion.div
          className="relative z-10"
          style={{ perspective: '1200px' }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Envelope */}
          <motion.div 
            className="relative w-full max-w-sm md:max-w-md mx-auto"
            style={{ aspectRatio: '4/3' }}
            animate={isOpen ? { y: -20, scale: 1.02 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Envelope shadow */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'hsl(0 0% 0% / 0.4)',
                filter: 'blur(30px)',
                transform: 'translateY(20px) scaleX(0.9)',
              }}
            />

            {/* Envelope Back Layer */}
            <div 
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(165deg, hsl(32 35% 28%) 0%, hsl(28 30% 20%) 50%, hsl(25 28% 16%) 100%)',
                boxShadow: 'inset 0 2px 10px hsl(0 0% 0% / 0.3), 0 20px 60px -15px hsl(0 0% 0% / 0.6)',
              }}
            >
              {/* Paper texture overlay */}
              <div 
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Inner edge shadow for depth */}
              <div 
                className="absolute inset-0"
                style={{
                  boxShadow: 'inset 0 0 40px hsl(0 0% 0% / 0.2)',
                }}
              />
            </div>

            {/* Envelope Flap */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-bottom"
              style={{ 
                height: '55%',
                transformStyle: 'preserve-3d',
                zIndex: phase === 'idle' || phase === 'cracking' ? 20 : 5,
              }}
              animate={isOpen ? { rotateX: -175 } : { rotateX: 0 }}
              transition={{ 
                duration: 1.4, 
                ease: [0.25, 0.46, 0.45, 0.94], 
                delay: phase === 'opening' ? 0 : 0.3 
              }}
            >
              {/* Flap Front */}
              <div 
                className="absolute inset-0 rounded-t-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, hsl(35 40% 32%) 0%, hsl(32 35% 26%) 60%, hsl(30 32% 22%) 100%)',
                  clipPath: 'polygon(0 0, 50% 95%, 100% 0)',
                  backfaceVisibility: 'hidden',
                  boxShadow: 'inset 0 -20px 40px hsl(0 0% 0% / 0.15)',
                }}
              >
                {/* Paper texture */}
                <div 
                  className="absolute inset-0 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                {/* Fold highlight */}
                <div 
                  className="absolute inset-x-0 top-0 h-8"
                  style={{
                    background: 'linear-gradient(180deg, hsl(40 45% 40% / 0.3) 0%, transparent 100%)',
                  }}
                />
              </div>
              
              {/* Flap Back (visible when opened) */}
              <div 
                className="absolute inset-0 rounded-t-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(0deg, hsl(32 25% 18%) 0%, hsl(30 22% 15%) 100%)',
                  clipPath: 'polygon(0 0, 50% 95%, 100% 0)',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </motion.div>

            {/* Envelope Body (Front face) */}
            <div 
              className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden"
              style={{
                height: '72%',
                background: 'linear-gradient(175deg, hsl(36 42% 36%) 0%, hsl(33 38% 30%) 40%, hsl(30 35% 24%) 100%)',
                zIndex: 15,
              }}
            >
              {/* Paper texture */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Bottom fold triangle */}
              <div 
                className="absolute top-0 left-0 right-0 h-[45%]"
                style={{
                  background: 'linear-gradient(0deg, hsl(36 42% 36%) 0%, hsl(34 36% 30%) 100%)',
                  clipPath: 'polygon(0 0, 50% 80%, 100% 0)',
                  boxShadow: '0 4px 15px hsl(0 0% 0% / 0.1)',
                }}
              />
              
              {/* Top edge shadow */}
              <div 
                className="absolute top-0 left-0 right-0 h-4"
                style={{
                  background: 'linear-gradient(180deg, hsl(0 0% 0% / 0.15) 0%, transparent 100%)',
                }}
              />
              
              {/* Side shadows for depth */}
              <div 
                className="absolute inset-0"
                style={{
                  boxShadow: 'inset 3px 0 10px hsl(0 0% 0% / 0.1), inset -3px 0 10px hsl(0 0% 0% / 0.1)',
                }}
              />
            </div>

            {/* Wax Seal */}
            <AnimatePresence>
              {(phase === 'idle' || phase === 'cracking') && (
                <motion.button
                  className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer focus:outline-none group"
                  onClick={handleSealClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  exit={{ 
                    scale: [1, 1.15, 0],
                    opacity: [1, 0.8, 0],
                    rotate: [0, 8, 20],
                  }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Seal base with slow breathing */}
                  <motion.div 
                    className="w-18 h-18 md:w-22 md:h-22 rounded-full flex items-center justify-center relative"
                    style={{
                      width: '72px',
                      height: '72px',
                      background: 'radial-gradient(circle at 35% 35%, hsl(5 65% 48%) 0%, hsl(0 60% 38%) 40%, hsl(355 55% 28%) 80%, hsl(350 50% 22%) 100%)',
                      boxShadow: '0 6px 20px hsl(0 0% 0% / 0.5), inset 0 2px 6px hsl(0 70% 60% / 0.25), inset 0 -2px 4px hsl(0 0% 0% / 0.3)',
                    }}
                    animate={phase === 'idle' ? {
                      scale: isHovered ? 1.08 : [1, 1.015, 1],
                    } : {}}
                    transition={phase === 'idle' && !isHovered ? {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    } : { duration: 0.4 }}
                  >
                    {/* Wax texture */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-40"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />
                    
                    {/* Embossed heart */}
                    <span 
                      className="text-2xl md:text-3xl relative z-10" 
                      style={{ 
                        filter: 'drop-shadow(0 1px 1px hsl(0 0% 0% / 0.4))',
                        textShadow: '0 -1px 0 hsl(0 70% 55% / 0.3)',
                      }}
                    >
                      💕
                    </span>
                    
                    {/* Crack lines (appear on cracking phase) */}
                    {phase === 'cracking' && (
                      <motion.div 
                        className="absolute inset-0 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          background: `
                            linear-gradient(45deg, transparent 48%, hsl(0 0% 0% / 0.6) 49%, hsl(0 0% 0% / 0.6) 51%, transparent 52%),
                            linear-gradient(-30deg, transparent 48%, hsl(0 0% 0% / 0.5) 49%, hsl(0 0% 0% / 0.5) 51%, transparent 52%),
                            linear-gradient(80deg, transparent 48%, hsl(0 0% 0% / 0.4) 49%, hsl(0 0% 0% / 0.4) 51%, transparent 52%)
                          `,
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    animate={isHovered ? {
                      boxShadow: '0 0 30px hsl(var(--hot-coral) / 0.5), 0 0 50px hsl(var(--hot-coral) / 0.2)',
                    } : {
                      boxShadow: '0 0 15px hsl(var(--hot-coral) / 0.2), 0 0 25px hsl(var(--hot-coral) / 0.1)',
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subtle tap hint */}
          <motion.p
            className="text-center mt-10 text-foreground/30 text-xs tracking-wide"
            animate={phase === 'idle' ? {
              opacity: [0.3, 0.5, 0.3],
            } : { opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {phase === 'idle' ? 'break the seal' : ''}
          </motion.p>
        </motion.div>
      </div>

      {/* LETTER MODAL - Separate layer with higher z-index for sharp rendering */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-full max-w-lg md:max-w-xl pointer-events-auto"
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ 
                y: 0, 
                opacity: 1, 
                scale: 1,
              }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 1.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Letter Paper */}
              <motion.div
                className="relative rounded-sm overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(180deg, hsl(48 35% 96%) 0%, hsl(45 30% 92%) 50%, hsl(42 28% 88%) 100%)',
                  boxShadow: '0 25px 80px hsl(0 0% 0% / 0.5), 0 10px 30px hsl(0 0% 0% / 0.3)',
                }}
                animate={{
                  minHeight: letterUnfolded ? '520px' : '280px',
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Paper texture */}
                <div 
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Fold crease line */}
                <motion.div
                  className="absolute left-0 right-0 h-px pointer-events-none"
                  style={{
                    top: '50%',
                    background: 'linear-gradient(90deg, transparent 5%, hsl(35 25% 75%) 20%, hsl(35 25% 75%) 80%, transparent 95%)',
                  }}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: letterUnfolded ? 0 : 0.6 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />

                {/* Letter Content */}
                <motion.div
                  className="p-6 md:p-10 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: letterUnfolded ? 1 : 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {/* Greeting */}
                  <motion.p
                    className="font-handwritten text-xl md:text-2xl text-hot-coral mb-6 text-left"
                    style={{ lineHeight: '1.6' }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {letterContent.greeting}
                  </motion.p>

                  {/* First paragraph */}
                  <motion.p
                    className="font-handwritten text-base md:text-lg mb-6 text-left"
                    style={{ lineHeight: '2.1', color: 'hsl(30 20% 30%)' }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {letterContent.paragraphs[0]}
                  </motion.p>

                  {/* Polaroid Image - Between first and second paragraph */}
                  <motion.div
                    className="my-8 flex justify-center"
                    initial={{ opacity: 0, rotate: -6, scale: 0.85 }}
                    animate={fullyRevealed ? { opacity: 1, rotate: 3, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div 
                      className="relative bg-white p-2 md:p-3"
                      style={{
                        boxShadow: '0 8px 30px hsl(0 0% 0% / 0.18), 0 4px 12px hsl(0 0% 0% / 0.1)',
                        transform: 'rotate(2deg)',
                      }}
                    >
                      {/* Tape - slightly tilted */}
                      <div 
                        className="absolute -top-3 left-1/2 w-12 h-5 rounded-sm"
                        style={{
                          background: 'linear-gradient(180deg, hsl(50 40% 90% / 0.85) 0%, hsl(48 35% 85% / 0.8) 100%)',
                          transform: 'translateX(-50%) rotate(-2deg)',
                          boxShadow: '0 1px 4px hsl(0 0% 0% / 0.08)',
                        }}
                      />
                      
                      {/* Image placeholder */}
                      <div 
                        className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-sm overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, hsl(var(--neon-pink) / 0.12) 0%, hsl(var(--golden-yellow) / 0.12) 100%)',
                        }}
                      >
                        <span className="text-4xl md:text-5xl">💑</span>
                      </div>
                      
                      {/* Caption */}
                      <p className="font-handwritten text-xs md:text-sm text-center mt-2 italic" style={{ color: 'hsl(30 15% 45%)' }}>
                        us, always 💕
                      </p>
                    </div>
                  </motion.div>

                  {/* Remaining paragraphs */}
                  {letterContent.paragraphs.slice(1).map((para, index) => (
                    <motion.p
                      key={index}
                      className="font-handwritten text-base md:text-lg mb-5 text-left"
                      style={{ lineHeight: '2.1', color: 'hsl(30 20% 30%)' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 1.2 + index * 0.25 }}
                    >
                      {para}
                    </motion.p>
                  ))}

                  {/* Closing */}
                  <motion.div
                    className="mt-10 space-y-1 text-left"
                    initial={{ opacity: 0, y: 15 }}
                    animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 2 }}
                  >
                    <p className="font-handwritten text-lg md:text-xl text-hot-coral">
                      {letterContent.closing}
                    </p>
                    <p className="font-handwritten text-lg md:text-xl text-hot-coral">
                      {letterContent.signature}
                    </p>
                  </motion.div>

                  {/* Final fading line */}
                  <motion.div
                    className="mt-12 pt-6"
                    style={{ borderTop: '1px solid hsl(35 30% 85%)' }}
                    initial={{ opacity: 0 }}
                    animate={fullyRevealed ? { opacity: 1 } : {}}
                    transition={{ duration: 1.8, delay: 2.8 }}
                  >
                    <p className="font-handwritten text-sm md:text-base text-center italic" style={{ color: 'hsl(30 15% 55%)' }}>
                      Written just for you.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Close hint */}
              <motion.p
                className="text-center mt-6 text-foreground/40 text-xs"
                initial={{ opacity: 0 }}
                animate={fullyRevealed ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 3.2 }}
              >
                tap outside to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EnvelopeLetterSection;
