import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const EnvelopeLetterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [heartsFlying, setHeartsFlying] = useState(false);

  useEffect(() => {
    if (!showLetter) {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [showLetter]);

  const letterContent = [
    "To the one who makes ordinary days extraordinary,",
    "",
    "There are words stuck between my heart and my lips. Things I mean to say but never quite manage. This is my attempt.",
    "",
    "You came into my life like the softest sunrise — gentle, warm, and completely transformative. Before you, I didn't know what it meant to be truly seen.",
    "",
    "Thank you for every laugh, every late-night conversation, every hand held during uncertain moments.",
    "",
    "You are my favorite hello and my hardest goodbye.",
    "",
    "This letter is just the beginning. Our story has so many more chapters to write.",
    "",
    "Forever and always,",
    "Yours 💕",
  ];

  const handleSealClick = () => {
    if (isOpen) return;
    
    setIsOpen(true);
    setTimeout(() => {
      setShowLetter(true);
    }, 600);
  };

  const handleCloseLetter = () => {
    setShowLetter(false);
    setTimeout(() => {
      setIsOpen(false);
      setHeartsFlying(true);
      
      setTimeout(() => {
        setHeartsFlying(false);
      }, 3500);
    }, 300);
  };

  // Generate flying hearts - more variety
  const flyingHearts = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2.5 + Math.random() * 2,
    size: 14 + Math.random() * 20,
    heart: ['❤️', '💕', '💗', '💖', '🩷'][Math.floor(Math.random() * 5)],
  }));

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden bg-background min-h-screen flex items-center justify-center">
      {/* Warm gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--hot-coral) / 0.1) 0%, hsl(var(--golden-yellow) / 0.1) 100%)',
        }}
      />

      {/* Flying hearts animation - only hearts, no confetti */}
      <AnimatePresence>
        {heartsFlying && flyingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: `${heart.x}%`,
              bottom: '40%',
              fontSize: heart.size,
            }}
            initial={{ y: 0, opacity: 1, scale: 0 }}
            animate={{
              y: -700,
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0, 1, 1.1, 1, 0.9],
              x: [0, (Math.random() - 0.5) * 80],
              rotate: [0, (Math.random() - 0.5) * 40],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
          >
            {heart.heart}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-golden-yellow/70 mb-4">
            ✉️ A Special Message ✉️
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Open Your Letter
          </h2>
          <p className="mt-4 text-muted-foreground italic">
            {isOpen ? "Read what's inside..." : "Tap the seal to reveal..."}
          </p>
        </motion.div>

        {/* Envelope Container */}
        <motion.div
          className="relative mx-auto cursor-pointer"
          style={{ perspective: '1000px' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={handleSealClick}
        >
          {/* Envelope Back - Blue marbled paper like reference */}
          <div 
            className="relative w-full aspect-[5/3] rounded-2xl overflow-visible"
            style={{
              background: 'linear-gradient(145deg, #9bb8d3 0%, #b5cce0 25%, #8eabc8 50%, #a3c1d9 75%, #c5d9ea 100%)',
              boxShadow: '0 8px 32px -8px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)',
              border: '1px solid rgba(120,150,180,0.4)',
            }}
          >
            {/* Blue marbled texture overlay */}
            <div 
              className="absolute inset-0 opacity-60 rounded-lg"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 40%),
                  radial-gradient(ellipse at 40% 70%, rgba(255,255,255,0.35) 0%, transparent 45%),
                  radial-gradient(ellipse at 70% 60%, rgba(139,173,204,0.5) 0%, transparent 50%),
                  radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.25) 0%, transparent 35%)
                `,
              }}
            />
            {/* Additional marble veining */}
            <div 
              className="absolute inset-0 opacity-30 rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Letter peeking out when open */}
            <AnimatePresence>
              {isOpen && !showLetter && (
                <motion.div
                  className="absolute left-4 right-4 md:left-6 md:right-6 rounded-sm"
                  style={{
                    background: 'linear-gradient(145deg, #e8f0f8 0%, #f0e8f0 50%, #e5eef5 100%)',
                    top: '10%',
                    height: '60%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                  initial={{ y: 0 }}
                  animate={{ y: -30 }}
                  exit={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Envelope flap (top triangle) - Blue marbled */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top z-10"
              style={{
                height: '55%',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(180deg, #a8c4db 0%, #8fb3ce 50%, #9dbdd5 100%)',
                transformStyle: 'preserve-3d',
                boxShadow: isOpen ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
              }}
              animate={{
                rotateX: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Marbled texture on flap */}
              <div 
                className="absolute inset-0 opacity-50"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backgroundImage: `
                    radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.4) 0%, transparent 45%),
                    radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 40%)
                  `,
                }}
              />
              
              {/* Flap inner side (slightly darker blue) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(180deg, #7a9fb8 0%, #8aadca 100%)',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </motion.div>

            {/* Bottom fold triangles - Blue marbled */}
            <div 
              className="absolute bottom-0 left-0 right-0 z-5"
              style={{
                height: '65%',
                clipPath: 'polygon(0 100%, 50% 25%, 100% 100%)',
                background: 'linear-gradient(0deg, #8aabc5 0%, #9fc0d8 100%)',
              }}
            />
            
            {/* Left fold */}
            <div 
              className="absolute bottom-0 left-0 z-4"
              style={{
                width: '52%',
                height: '100%',
                clipPath: 'polygon(0 0, 0 100%, 96% 100%, 50% 50%)',
                background: 'linear-gradient(135deg, #95b5cc 0%, #a5c3d8 100%)',
              }}
            />
            
            {/* Right fold */}
            <div 
              className="absolute bottom-0 right-0 z-4"
              style={{
                width: '52%',
                height: '100%',
                clipPath: 'polygon(100% 0, 100% 100%, 4% 100%, 50% 50%)',
                background: 'linear-gradient(-135deg, #9ab8d0 0%, #a8c5da 100%)',
              }}
            />

            {/* Golden/Bronze Wax Seal - Like reference image */}
            {!isOpen && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                style={{ marginTop: '-5%' }}
              >
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #d4a574 0%, #c4915a 25%, #b07d48 50%, #9a6b3a 75%, #8a5c30 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,220,180,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Wax drips - golden brown */}
                  <div 
                    className="absolute -bottom-1.5 left-2.5 w-3.5 h-5 rounded-b-full"
                    style={{ background: 'radial-gradient(circle at 50% 0%, #c4915a 0%, #a87040 100%)' }}
                  />
                  <div 
                    className="absolute -bottom-2 right-3 w-2.5 h-4 rounded-b-full"
                    style={{ background: 'radial-gradient(circle at 50% 0%, #b88550 0%, #996538 100%)' }}
                  />
                  <div 
                    className="absolute -bottom-1 left-8 w-2 h-3 rounded-b-full"
                    style={{ background: 'radial-gradient(circle at 50% 0%, #c08048 0%, #a06530 100%)' }}
                  />
                  
                  {/* Ornate emblem - decorative swirl pattern */}
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                    style={{
                      filter: 'drop-shadow(0 1px 0 rgba(255,220,180,0.4)) drop-shadow(0 -1px 0 rgba(0,0,0,0.2))',
                    }}
                  >
                    <svg 
                      viewBox="0 0 40 40" 
                      fill="none" 
                      className="w-full h-full"
                    >
                      {/* Decorative circular pattern */}
                      <circle cx="20" cy="20" r="12" stroke="#6b4423" strokeWidth="1" fill="none" opacity="0.4"/>
                      <circle cx="20" cy="20" r="8" stroke="#6b4423" strokeWidth="0.5" fill="none" opacity="0.3"/>
                      {/* Central ornate design */}
                      <path 
                        d="M20 10c-2 2-4 4-4 6s2 4 4 4 4-2 4-4-2-4-4-6z"
                        fill="#7a5030"
                        opacity="0.5"
                      />
                      <path 
                        d="M20 30c2-2 4-4 4-6s-2-4-4-4-4 2-4 4 2 4 4 6z"
                        fill="#7a5030"
                        opacity="0.5"
                      />
                      <path 
                        d="M10 20c2 2 4 4 6 4s4-2 4-4-2-4-4-4-4 2-6 4z"
                        fill="#7a5030"
                        opacity="0.5"
                      />
                      <path 
                        d="M30 20c-2-2-4-4-6-4s-4 2-4 4 2 4 4 4 4-2 6-4z"
                        fill="#7a5030"
                        opacity="0.5"
                      />
                      {/* Center dot */}
                      <circle cx="20" cy="20" r="2" fill="#6b4020" opacity="0.6"/>
                    </svg>
                  </div>
                  
                  {/* Highlight for metallic sheen */}
                  <div 
                    className="absolute top-1.5 left-2.5 w-6 h-4 rounded-full opacity-50"
                    style={{ background: 'linear-gradient(180deg, rgba(255,220,180,0.7) 0%, transparent 100%)' }}
                  />
                  
                  {/* Outer ring detail */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      border: '2px solid rgba(139,90,43,0.3)',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Letter Modal */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/70"
                onClick={handleCloseLetter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Letter - Blue and pinkish pastel background */}
              <motion.div
                className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-sm p-6 md:p-10 z-10"
                style={{
                  background: 'linear-gradient(145deg, #e8f4fa 0%, #f5e8f2 25%, #e5eef8 50%, #f8e8f0 75%, #e8f0f8 100%)',
                  boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.05)',
                }}
                initial={{ y: 80, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Subtle watercolor texture overlay */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none rounded-sm"
                  style={{
                    backgroundImage: `
                      radial-gradient(ellipse at 20% 20%, rgba(200,220,240,0.5) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 30%, rgba(240,210,230,0.4) 0%, transparent 45%),
                      radial-gradient(ellipse at 30% 70%, rgba(210,230,245,0.4) 0%, transparent 40%),
                      radial-gradient(ellipse at 70% 80%, rgba(245,215,235,0.3) 0%, transparent 50%)
                    `,
                  }}
                />

                {/* Couple photo placeholder */}
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/80"
                    style={{
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)',
                    }}
                  >
                    <img 
                      src="/couple1.jpg" 
                      alt="Our photo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Letter content - Handwritten style */}
                <div className="relative space-y-3">
                  {letterContent.map((line, index) => (
                    <p
                      key={index}
                      className={`font-handwritten text-xl md:text-2xl ${
                        line === '' ? 'h-4' : ''
                      } ${
                        index === 0 || index >= letterContent.length - 2 
                          ? 'text-rose-400' 
                          : 'text-slate-600'
                      }`}
                      style={{ 
                        lineHeight: '2',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Close button */}
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-100/50 hover:bg-rose-100 flex items-center justify-center text-slate-500 hover:text-rose-400 transition-colors"
                  onClick={handleCloseLetter}
                >
                  ✕
                </button>

                {/* Close hint */}
                <p className="text-center mt-8 text-sm text-slate-400">
                  Click anywhere outside or ✕ to close 💕
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements - static */}
        <div className="flex justify-center gap-4 mt-12">
          {['💌', '💕', '💌'].map((emoji, i) => (
            <span key={i} className="text-3xl">
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnvelopeLetterSection;
