import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LetterState =
  | "closed"
  | "opening"
  | "open"
  | "closing"
  | "bouquet"
  | "bouquetWithLetter";

const EnvelopeLetterSection = () => {
  const [state, setState] = useState<LetterState>("closed");
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when letter is open
  useEffect(() => {
    if (
      state === "open" ||
      state === "closing" ||
      state === "bouquet" ||
      state === "bouquetWithLetter"
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  const handleSealClick = () => {
    if (state === "closed") {
      setState("opening");
      setTimeout(() => setState("open"), 2200);
    }
  };

  const handleClose = () => {
    if (state === "open") {
      setState("closing");
  
      // Letter closes first
      setTimeout(() => {
        setState("bouquet");
  
        // After bouquet animation finishes, show letter again
        setTimeout(() => {
          setState("bouquetWithLetter");
        }, 3200); // ← bouquet animation duration
      }, 600);
    }
  };
  

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && state === "open") {
      handleClose();
    }
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-primary/10" />

      {/* Static decorative elements - no animation */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-love/5 rounded-full blur-2xl opacity-40" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-35" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        
        {/* Closed Envelope */}
        <AnimatePresence>
          {(state === "closed" || state === "opening") && (
            <motion.div
              className="relative"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Envelope 
                isOpening={state === "opening"} 
                onSealClick={handleSealClick}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open Letter Modal - Fixed position with scroll lock */}
        <AnimatePresence>
          {(state === "open" || state === "closing") && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={handleBackdropClick}
            >
              {/* Blurred backdrop */}
              <motion.div 
                className="absolute inset-0 bg-foreground/30 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              
              {/* Letter */}
              <Letter 
                isClosing={state === "closing"} 
                onClose={handleClose}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rose Bouquet Reveal */}
        <AnimatePresence>
  {(state === "bouquet" || state === "bouquetWithLetter") && (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content layout */}
      <motion.div
        className="
        relative z-10 w-full px-4
        flex flex-col items-center gap-8
        md:flex-row md:items-start md:justify-center md:gap-12
        max-w-6xl"
      >
        {/* Bouquet */}
        <motion.div
          animate={
            state === "bouquetWithLetter"
              ? { x: -120 }
              : { x: 0 }
          }
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <RoseBouquet />
        </motion.div>

        {/* Letter appears AFTER bouquet animation */}
        <AnimatePresence>
          {state === "bouquetWithLetter" && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <Letter isClosing={false} onClose={() => setState("closed")} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div> 
    </motion.div>
  )}
</AnimatePresence>

      </div>

      {/* Instruction text */}
      {state === "closed" && (
        <motion.p
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Tap the seal to open
        </motion.p>
      )}
    </section>
  );
};

// Envelope Component - Static wax seal, no hover animations
const Envelope = ({ 
  isOpening, 
  onSealClick 
}: { 
  isOpening: boolean; 
  onSealClick: () => void;
}) => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-sm mx-auto">
      {/* Envelope body */}
      <div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(30, 40%, 92%) 0%, hsl(25, 35%, 88%) 100%)",
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.15), 0 4px 16px -4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Envelope front V-fold lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="none">
          <path
            d="M0 150 L100 60 L200 150"
            fill="none"
            stroke="hsl(25, 25%, 82%)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Envelope flap (triangular) */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        initial={{ rotateX: 0 }}
        animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <svg viewBox="0 0 200 80" className="w-full" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))" }}>
          <path
            d="M0 0 L100 70 L200 0 L200 0 L0 0 Z"
            fill="url(#flapGradient)"
          />
          <defs>
            <linearGradient id="flapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(30, 40%, 94%)" />
              <stop offset="100%" stopColor="hsl(25, 35%, 90%)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Wax Seal - COMPLETELY STATIC, no hover/idle animations */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        onClick={!isOpening ? onSealClick : undefined}
        style={{ cursor: isOpening ? "default" : "pointer" }}
      >
        <motion.div
          className="relative w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, hsl(350, 55%, 52%), hsl(350, 60%, 38%))",
            boxShadow: "0 4px 12px -2px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.15)",
          }}
          animate={isOpening ? { 
            scale: [1, 1.05, 0],
            opacity: [1, 1, 0],
          } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Seal emboss ring */}
          <div className="absolute inset-2 rounded-full border border-white/15 flex items-center justify-center">
            <span className="text-white/90 text-lg select-none">♥</span>
          </div>
          
          {/* Seal crack effect on opening */}
          {isOpening && (
            <>
              <motion.div
                className="absolute top-1/2 left-1 right-1 h-px bg-black/30 -translate-y-1/2"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
              <motion.div
                className="absolute top-1 bottom-1 left-1/2 w-px bg-black/30 -translate-x-1/2"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Letter sliding out during opening */}
      {isOpening && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[82%] bg-gradient-to-b from-white to-stone-50 rounded-t-sm"
          style={{
            boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
          }}
          initial={{ y: "100%", height: 0 }}
          animate={{ y: "-35%", height: "65%" }}
          transition={{ duration: 1, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </div>
  );
};

// Letter Component - Fixed modal with internal scroll
const Letter = ({ 
  isClosing,
  onClose 
}: { 
  isClosing: boolean;
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="relative w-full max-w-lg z-10"
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={isClosing 
        ? { scale: 0.9, y: 30, opacity: 0 }
        : { scale: 1, y: 0, opacity: 1 }
      }
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Letter paper with max-height and internal scroll */}
      <div 
        className="relative rounded-lg overflow-hidden"
        style={{
          maxHeight: "80vh",
          background: "linear-gradient(180deg, hsl(40, 30%, 98%) 0%, hsl(35, 25%, 95%) 100%)",
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.2), 0 8px 24px -8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Paper texture */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Close button */}
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-200/60 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors z-20"
          onClick={onClose}
        >
          <span className="text-lg leading-none">×</span>
        </button>

        {/* Letter content with internal scroll */}
        <div 
          className="overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <div className="p-6 sm:p-8 font-handwritten">
            {/* Date */}
            <motion.p
              className="text-sm text-stone-500 mb-5 text-right font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              February 14, 2024
            </motion.p>

            {/* Greeting */}
            <motion.h3
              className="font-display text-2xl sm:text-3xl text-pink-600 mb-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              My Dearest Love,
            </motion.h3>

            {/* First paragraph */}
            <motion.p
              className="letter-text text-base sm:text-lg text-stone-800 mb-3 leading-relaxed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              From the moment our paths crossed, my world has been painted 
              in colors I never knew existed. You've shown me what it means 
              to truly love and be loved in return.
            </motion.p>

            {/* Photo placeholder - Polaroid style */}
            <motion.div
              className="relative w-44 h-auto mx-auto my-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div 
                className="bg-white p-2 pb-6 rounded-sm"
                style={{ 
                  transform: "rotate(-2deg)",
                  boxShadow: "0 4px 16px -4px rgba(0,0,0,0.12), 0 2px 6px -2px rgba(0,0,0,0.08)",
                }}
              >
                <div className="w-full aspect-[4/3] bg-stone-100 rounded-sm flex items-center justify-center">
                  <span className="text-stone-500 text-xs italic">Our photo</span>
                </div>
                {/* Tape */}
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm opacity-60"
                  style={{ 
                    background: "linear-gradient(135deg, hsl(45, 40%, 85%) 0%, hsl(40, 35%, 80%) 100%)",
                    transform: "rotate(1deg)",
                  }}
                />
              </div>
            </motion.div>

            {/* Second paragraph */}
            <motion.p
              className="lletter-text text-base sm:text-lg text-stone-800 mb-3 leading-relaxed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >              Every laugh we share, every quiet moment together—these 
              are the treasures I hold closest to my heart.
            </motion.p>

            {/* Closing */}
            <motion.p
              className="letter-text text-base sm:text-lg text-stone-800 mb-3 leading-relaxed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Thank you for being my person, my home. 
              Here's to countless more memories together.
            </motion.p>

            {/* Signature */}
            <motion.div
              className="text-right pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="font-display text-2xl sm:text-3xl text-pink-600 mb-3">
                Forever Yours,
              </p>
              <p className="font-display text-2xl sm:text-3xl text-pink-600 mb-3">
                ♥
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Rose Bouquet Component - Single cohesive composed bouquet
const RoseBouquet = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-56 h-72">
        {/* Single composed bouquet SVG */}
        <svg viewBox="0 0 200 280" className="w-full h-full">
          <defs>
            {/* Gradients */}
            <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(140, 45%, 38%)" />
              <stop offset="100%" stopColor="hsl(140, 40%, 30%)" />
            </linearGradient>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(140, 50%, 42%)" />
              <stop offset="100%" stopColor="hsl(140, 45%, 35%)" />
            </linearGradient>
            <radialGradient id="roseGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="hsl(350, 70%, 58%)" />
              <stop offset="60%" stopColor="hsl(350, 65%, 48%)" />
              <stop offset="100%" stopColor="hsl(350, 60%, 38%)" />
            </radialGradient>
            <linearGradient id="paperWrapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(350, 25%, 94%)" />
              <stop offset="50%" stopColor="hsl(350, 30%, 96%)" />
              <stop offset="100%" stopColor="hsl(350, 20%, 91%)" />
            </linearGradient>
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(350, 55%, 52%)" />
              <stop offset="50%" stopColor="hsl(350, 60%, 58%)" />
              <stop offset="100%" stopColor="hsl(350, 55%, 52%)" />
            </linearGradient>
          </defs>

          {/* Stems - rise together */}
          <motion.g
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "100px 280px" }}
          >
            {/* Center stem */}
            <path d="M100 280 L100 120" stroke="url(#stemGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Left stems */}
            <path d="M100 280 Q85 200 75 130" stroke="url(#stemGradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M100 280 Q70 210 55 145" stroke="url(#stemGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Right stems */}
            <path d="M100 280 Q115 200 125 130" stroke="url(#stemGradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M100 280 Q130 210 145 145" stroke="url(#stemGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Leaves */}
            <ellipse cx="88" cy="190" rx="12" ry="6" fill="url(#leafGradient)" transform="rotate(-35 88 190)" />
            <ellipse cx="112" cy="185" rx="11" ry="5" fill="url(#leafGradient)" transform="rotate(30 112 185)" />
            <ellipse cx="72" cy="170" rx="10" ry="5" fill="url(#leafGradient)" transform="rotate(-45 72 170)" />
            <ellipse cx="128" cy="168" rx="10" ry="5" fill="url(#leafGradient)" transform="rotate(40 128 168)" />
          </motion.g>

          {/* Roses cluster - bloom together as one unit */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {/* Center rose (largest) */}
            <g transform="translate(100, 95)">
              <circle r="22" fill="url(#roseGradient)" />
              <circle r="14" fill="hsl(350, 65%, 52%)" />
              <circle r="7" fill="hsl(350, 60%, 45%)" />
              <circle r="3" fill="hsl(350, 55%, 40%)" />
            </g>
            
            {/* Left roses */}
            <g transform="translate(70, 110)">
              <circle r="18" fill="url(#roseGradient)" />
              <circle r="11" fill="hsl(350, 65%, 52%)" />
              <circle r="5" fill="hsl(350, 60%, 45%)" />
            </g>
            <g transform="translate(52, 135)">
              <circle r="15" fill="url(#roseGradient)" />
              <circle r="9" fill="hsl(350, 65%, 52%)" />
              <circle r="4" fill="hsl(350, 60%, 45%)" />
            </g>
            
            {/* Right roses */}
            <g transform="translate(130, 110)">
              <circle r="18" fill="url(#roseGradient)" />
              <circle r="11" fill="hsl(350, 65%, 52%)" />
              <circle r="5" fill="hsl(350, 60%, 45%)" />
            </g>
            <g transform="translate(148, 135)">
              <circle r="15" fill="url(#roseGradient)" />
              <circle r="9" fill="hsl(350, 65%, 52%)" />
              <circle r="4" fill="hsl(350, 60%, 45%)" />
            </g>

            {/* Top accent roses */}
            <g transform="translate(85, 75)">
              <circle r="12" fill="url(#roseGradient)" />
              <circle r="7" fill="hsl(350, 65%, 52%)" />
            </g>
            <g transform="translate(115, 75)">
              <circle r="12" fill="url(#roseGradient)" />
              <circle r="7" fill="hsl(350, 65%, 52%)" />
            </g>
          </motion.g>

          {/* Paper wrap - folds in */}
          <motion.g
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "100px 280px" }}
          >
            <path
              d="M30 165 L15 280 L185 280 L170 165 Q100 195 30 165"
              fill="url(#paperWrapGradient)"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}
            />
            {/* Paper fold lines */}
            <path d="M50 180 L35 280" stroke="hsl(350, 15%, 88%)" strokeWidth="1" fill="none" />
            <path d="M150 180 L165 280" stroke="hsl(350, 15%, 88%)" strokeWidth="1" fill="none" />
          </motion.g>

          {/* Ribbon bow - ties the bouquet */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "100px 195px" }}
          >
            {/* Ribbon tails */}
            <path d="M85 200 Q75 220 80 240 L88 235 Q85 218 92 202" fill="url(#ribbonGrad)" />
            <path d="M115 200 Q125 220 120 240 L112 235 Q115 218 108 202" fill="url(#ribbonGrad)" />
            
            {/* Bow loops */}
            <ellipse cx="75" cy="192" rx="16" ry="10" fill="url(#ribbonGrad)" transform="rotate(-15 75 192)" />
            <ellipse cx="125" cy="192" rx="16" ry="10" fill="url(#ribbonGrad)" transform="rotate(15 125 192)" />
            
            {/* Center knot */}
            <ellipse cx="100" cy="195" rx="10" ry="8" fill="hsl(350, 50%, 48%)" />
          </motion.g>
        </svg>
      </div>

      {/* Message */}
      <motion.p
        className="mt-8 font-display text-xl sm:text-2xl text-foreground text-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3, ease: [0.4, 0, 0.2, 1] }}
      >
        This is for you.
      </motion.p>

      <motion.div
        className="mt-3 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.4 }}
      >
        <div className="w-10 h-px bg-gradient-to-r from-transparent to-love/30" />
        <span className="text-love text-base">♥</span>
        <div className="w-10 h-px bg-gradient-to-l from-transparent to-love/30" />
      </motion.div>
    </motion.div>
  );
};

export default EnvelopeLetterSection;
