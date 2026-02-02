import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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

const EnvelopeLetterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'opening' | 'sliding' | 'unfolding1' | 'unfolding2' | 'revealed'>('idle');
  const [isHovered, setIsHovered] = useState(false);

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
    setPhase('idle');
  };

  const letterContent = {
    greeting: "My dearest love,",
    paragraphs: [
      "There are moments in life that feel like they were written in the stars — and meeting you was one of them. You changed everything without even trying.",
      "Every day with you feels like unwrapping a gift I never knew I needed. Your smile lights up my darkest days, your laugh is my favorite melody, and your heart... your heart is my home.",
      "I've tried to find the perfect words to describe what you mean to me, but some feelings are simply too big for language. Just know that you are my everything.",
      "Thank you for being you. Thank you for choosing us. Thank you for every moment we share.",
    ],
    closing: "Forever yours,",
    signature: "With all my love 💕",
  };

  const isOpen = phase !== 'idle' && phase !== 'cracking';
  const showLetter = phase === 'sliding' || phase === 'unfolding1' || phase === 'unfolding2' || phase === 'revealed';
  const letterUnfolded = phase === 'unfolding2' || phase === 'revealed';
  const fullyRevealed = phase === 'revealed';

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

      {/* Background blur overlay when letter is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(0 0% 3% / 0.85) 0%, hsl(0 0% 2% / 0.95) 100%)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-golden-yellow/60 mb-4">
            ✉️ Something Private ✉️
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white/90">
            A Letter For You
          </h2>
          <p className="mt-4 text-muted-foreground/70 italic text-sm">
            Break the seal when you're ready...
          </p>
        </motion.div>

        {/* Envelope Container */}
        <motion.div
          className={`relative mx-auto ${isOpen ? 'z-50' : 'z-10'}`}
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

            {/* Letter sliding out */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className="absolute left-1/2 w-[88%] origin-bottom"
                  style={{ 
                    top: '50%',
                    zIndex: 10,
                  }}
                  initial={{ y: '0%', x: '-50%', opacity: 0 }}
                  animate={{ 
                    y: letterUnfolded ? '-120%' : '-80%', 
                    x: '-50%', 
                    opacity: 1 
                  }}
                  transition={{ 
                    duration: 1.4, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {/* Letter Paper */}
                  <motion.div
                    className="relative rounded-sm overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, hsl(48 35% 96%) 0%, hsl(45 30% 92%) 50%, hsl(42 28% 88%) 100%)',
                      boxShadow: '0 15px 50px hsl(0 0% 0% / 0.3), 0 5px 15px hsl(0 0% 0% / 0.2)',
                      minHeight: letterUnfolded ? '500px' : '250px',
                    }}
                    animate={{
                      minHeight: letterUnfolded ? '500px' : '250px',
                    }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {/* Paper texture */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Fold crease line */}
                    <motion.div
                      className="absolute left-0 right-0 h-px"
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
                        className="font-handwritten text-xl md:text-2xl text-hot-coral mb-6"
                        style={{ lineHeight: '1.6' }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {letterContent.greeting}
                      </motion.p>

                      {/* First paragraph */}
                      <motion.p
                        className="font-handwritten text-base md:text-lg text-gray-700 mb-6"
                        style={{ lineHeight: '2' }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {letterContent.paragraphs[0]}
                      </motion.p>

                      {/* Polaroid Image */}
                      <motion.div
                        className="my-8 flex justify-center md:justify-end md:mr-4"
                        initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                        animate={fullyRevealed ? { opacity: 1, rotate: 4, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div 
                          className="relative bg-white p-2 md:p-3"
                          style={{
                            boxShadow: '0 8px 25px hsl(0 0% 0% / 0.15), 0 3px 8px hsl(0 0% 0% / 0.1)',
                          }}
                        >
                          {/* Tape */}
                          <div 
                            className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm"
                            style={{
                              background: 'linear-gradient(180deg, hsl(50 35% 88% / 0.9) 0%, hsl(48 30% 82% / 0.85) 100%)',
                              transform: 'translateX(-50%) rotate(-1deg)',
                              boxShadow: '0 1px 3px hsl(0 0% 0% / 0.1)',
                            }}
                          />
                          
                          {/* Image placeholder */}
                          <div 
                            className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-sm"
                            style={{
                              background: 'linear-gradient(135deg, hsl(var(--neon-pink) / 0.15) 0%, hsl(var(--golden-yellow) / 0.15) 100%)',
                            }}
                          >
                            <span className="text-3xl md:text-4xl">💑</span>
                          </div>
                          
                          {/* Caption */}
                          <p className="font-handwritten text-xs md:text-sm text-gray-500 text-center mt-2 italic">
                            us, always 💕
                          </p>
                        </div>
                      </motion.div>

                      {/* Remaining paragraphs */}
                      {letterContent.paragraphs.slice(1).map((para, index) => (
                        <motion.p
                          key={index}
                          className="font-handwritten text-base md:text-lg text-gray-700 mb-5"
                          style={{ lineHeight: '2' }}
                          initial={{ opacity: 0, y: 15 }}
                          animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                        >
                          {para}
                        </motion.p>
                      ))}

                      {/* Closing */}
                      <motion.div
                        className="mt-8 space-y-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={fullyRevealed ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1.8 }}
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
                        className="mt-12 pt-6 border-t border-gray-200/50"
                        initial={{ opacity: 0 }}
                        animate={fullyRevealed ? { opacity: 1 } : {}}
                        transition={{ duration: 1.5, delay: 2.4 }}
                      >
                        <p className="font-handwritten text-sm md:text-base text-gray-400 text-center italic">
                          Written just for you.
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subtle tap hint */}
          <motion.p
            className="text-center mt-10 text-white/30 text-xs tracking-wide"
            animate={phase === 'idle' ? {
              opacity: [0.3, 0.5, 0.3],
            } : { opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {phase === 'idle' ? 'break the seal' : ''}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnvelopeLetterSection;
