import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const EnvelopeLetterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isOpen, setIsOpen] = useState(false);
  const [letterUnfolded, setLetterUnfolded] = useState(false);

  const handleSealClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Delay letter unfolding after envelope opens
      setTimeout(() => setLetterUnfolded(true), 1200);
    }
  };

  const letterContent = [
    "My dearest love,",
    "",
    "There are moments in life that feel like they were written in the stars — and meeting you was one of them.",
    "",
    "Every day with you feels like unwrapping a gift I never knew I needed. Your smile lights up my darkest days, your laugh is my favorite melody, and your heart... your heart is my home.",
    "",
    "I've tried to find the perfect words to describe what you mean to me, but some feelings are simply too big for language. Just know that you are my everything.",
    "",
    "Thank you for being you. Thank you for choosing us.",
    "",
    "Forever yours,",
    "With all my love 💕",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background min-h-screen flex items-center justify-center">
      {/* Background blur overlay when letter is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => {
              setIsOpen(false);
              setLetterUnfolded(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-golden-yellow/70 mb-4">
            ✉️ A Letter For You ✉️
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Open When You're Ready
          </h2>
          <p className="mt-4 text-muted-foreground italic">
            Tap the seal to reveal what's inside...
          </p>
        </motion.div>

        {/* Envelope Container */}
        <motion.div
          className={`relative mx-auto ${isOpen ? 'z-50' : 'z-10'}`}
          style={{ perspective: '1000px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Envelope */}
          <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
            {/* Envelope Back */}
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, hsl(30 40% 25%) 0%, hsl(25 35% 18%) 100%)',
                boxShadow: '0 25px 50px -12px hsl(0 0% 0% / 0.5)',
              }}
            />

            {/* Envelope Flap (Top Triangle) */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{ 
                height: '50%',
                transformStyle: 'preserve-3d',
              }}
              animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            >
              {/* Flap Front */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, hsl(35 45% 30%) 0%, hsl(30 40% 25%) 100%)',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  backfaceVisibility: 'hidden',
                }}
              />
              {/* Flap Back */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, hsl(35 30% 20%) 0%, hsl(30 35% 22%) 100%)',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </motion.div>

            {/* Envelope Body (Front) */}
            <div 
              className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden"
              style={{
                height: '70%',
                background: 'linear-gradient(180deg, hsl(35 45% 35%) 0%, hsl(30 40% 28%) 100%)',
              }}
            >
              {/* Paper texture overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Bottom flap triangle */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2"
                style={{
                  background: 'linear-gradient(0deg, hsl(35 45% 35%) 0%, hsl(30 38% 30%) 100%)',
                  clipPath: 'polygon(0 0, 50% 70%, 100% 0)',
                }}
              />
            </div>

            {/* Wax Seal */}
            <motion.button
              className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer focus:outline-none"
              onClick={handleSealClick}
              whileHover={!isOpen ? { scale: 1.05 } : {}}
              whileTap={!isOpen ? { scale: 0.95 } : {}}
              animate={isOpen ? { 
                scale: [1, 1.1, 0],
                opacity: [1, 1, 0],
                rotate: [0, 15, 30],
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, hsl(0 70% 45%) 0%, hsl(0 65% 35%) 50%, hsl(0 60% 25%) 100%)',
                  boxShadow: '0 4px 15px hsl(0 0% 0% / 0.4), inset 0 2px 4px hsl(0 70% 60% / 0.3)',
                }}
              >
                {/* Seal emblem */}
                <span className="text-2xl md:text-3xl" style={{ filter: 'drop-shadow(0 1px 2px hsl(0 0% 0% / 0.3))' }}>
                  💕
                </span>
                
                {/* Seal cracks on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  style={{
                    background: 'repeating-conic-gradient(from 0deg, transparent 0deg 30deg, hsl(0 0% 0% / 0.2) 30deg 35deg)',
                  }}
                />
              </div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px hsl(var(--hot-coral) / 0.3)',
                    '0 0 35px hsl(var(--hot-coral) / 0.5)',
                    '0 0 20px hsl(var(--hot-coral) / 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>

            {/* Letter sliding out */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-[90%] origin-bottom"
                  initial={{ y: '50%', opacity: 0 }}
                  animate={{ y: '-50%', opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ top: '-20%' }}
                >
                  {/* Folded Letter */}
                  <motion.div
                    className="relative rounded-lg shadow-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, hsl(45 30% 95%) 0%, hsl(40 25% 90%) 100%)',
                      minHeight: '400px',
                    }}
                    initial={{ scaleY: 0.5 }}
                    animate={letterUnfolded ? { scaleY: 1 } : { scaleY: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {/* Paper texture */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Fold line */}
                    <motion.div
                      className="absolute left-0 right-0 top-1/2 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, hsl(30 20% 70%) 20%, hsl(30 20% 70%) 80%, transparent 100%)',
                      }}
                      initial={{ opacity: 0.5 }}
                      animate={letterUnfolded ? { opacity: 0 } : { opacity: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />

                    {/* Letter Content */}
                    <motion.div
                      className="p-6 md:p-10 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={letterUnfolded ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <div className="space-y-3">
                        {letterContent.slice(0, 5).map((line, index) => (
                          <motion.p
                            key={index}
                            className={`font-handwritten text-lg md:text-xl ${
                              line === '' ? 'h-3' : ''
                            } ${
                              index === 0 ? 'text-hot-coral text-xl md:text-2xl' : 'text-gray-700'
                            }`}
                            style={{ lineHeight: '1.8' }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={letterUnfolded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          >
                            {line}
                          </motion.p>
                        ))}
                      </div>

                      {/* Polaroid Image */}
                      <motion.div
                        className="my-6 flex justify-center md:justify-end"
                        initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                        animate={letterUnfolded ? { opacity: 1, rotate: 3, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        <div 
                          className="relative bg-white p-2 md:p-3 shadow-lg"
                          style={{
                            transform: 'rotate(3deg)',
                            boxShadow: '0 8px 25px hsl(0 0% 0% / 0.2)',
                          }}
                        >
                          {/* Tape effect */}
                          <div 
                            className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 opacity-60"
                            style={{
                              background: 'linear-gradient(180deg, hsl(45 40% 85%) 0%, hsl(45 30% 75%) 100%)',
                              transform: 'rotate(-2deg)',
                            }}
                          />
                          
                          {/* Image placeholder */}
                          <div 
                            className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, hsl(var(--neon-pink) / 0.2) 0%, hsl(var(--golden-yellow) / 0.2) 100%)',
                            }}
                          >
                            <span className="text-4xl">💑</span>
                          </div>
                          
                          {/* Polaroid caption */}
                          <p className="font-handwritten text-sm text-gray-500 text-center mt-2">
                            us 💕
                          </p>
                        </div>
                      </motion.div>

                      {/* Remaining content */}
                      <div className="space-y-3">
                        {letterContent.slice(5).map((line, index) => (
                          <motion.p
                            key={index + 5}
                            className={`font-handwritten text-lg md:text-xl ${
                              line === '' ? 'h-3' : ''
                            } ${
                              index >= letterContent.slice(5).length - 2 
                                ? 'text-hot-coral' 
                                : 'text-gray-700'
                            }`}
                            style={{ lineHeight: '1.8' }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={letterUnfolded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                          >
                            {line}
                          </motion.p>
                        ))}
                      </div>

                      {/* Final fading line */}
                      <motion.div
                        className="mt-10 pt-6 border-t border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={letterUnfolded ? { opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 2.2 }}
                      >
                        <p className="font-handwritten text-base md:text-lg text-gray-400 text-center italic">
                          Written just for you.
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tap hint */}
          <motion.p
            className="text-center mt-8 text-white/40 text-sm"
            animate={!isOpen ? {
              opacity: [0.4, 0.7, 0.4],
            } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {!isOpen ? '✨ tap the seal ✨' : ''}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnvelopeLetterSection;
