import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import confetti from "canvas-confetti";

interface ScratchRevealProps {
  revealContent: {
    title: string;
    message: string;
    link?: string;
  };
}

const ScratchReveal = ({ revealContent }: ScratchRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const isDrawing = useRef(false);

  const fireSparkle = useCallback((x: number, y: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    confetti({
      particleCount: 3,
      spread: 30,
      origin: { 
        x: (rect.left + x) / window.innerWidth, 
        y: (rect.top + y) / window.innerHeight 
      },
      colors: ["#f5c6d6", "#ffd700", "#e8a4b8"],
      ticks: 50,
      gravity: 0.8,
      scalar: 0.6,
      shapes: ["circle"],
    });
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Romantic gold/pink gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "hsl(40, 50%, 82%)");
    gradient.addColorStop(0.5, "hsl(350, 40%, 85%)");
    gradient.addColorStop(1, "hsl(40, 45%, 80%)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle shimmer texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    for (let i = 0; i < canvas.width; i += 15) {
      for (let j = 0; j < canvas.height; j += 15) {
        if (Math.random() > 0.7) {
          ctx.beginPath();
          ctx.arc(i, j, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Add text prompt with heart
    ctx.fillStyle = "rgba(100, 60, 70, 0.5)";
    ctx.font = "16px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch to reveal your surprise ✨", canvas.width / 2, canvas.height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas, isRevealed]);
  // FIX #1: Lock body scroll ONLY while actively scratching, restore immediately when revealed
  useEffect(() => {
    // If revealed, always restore scroll regardless of drawing state
    if (isRevealed) {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      return;
    }
    
    // Only lock scroll while actively drawing
    if (isDrawing.current) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  
    return () => {
      // Cleanup: always restore scroll on unmount
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
    };
  }, [scratchPercentage, isRevealed]);

  // FIX #1: Additional safeguard - restore scroll when revealed state changes
  useEffect(() => {
    if (isRevealed) {
      // Immediately restore scroll when scratch is completed
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      isDrawing.current = false; // Ensure drawing state is cleared
    }
  }, [isRevealed]);
  
  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    
    const radius = 35;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(0.6, "rgba(0, 0, 0, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Sparkle effect while scratching
    if (Math.random() > 0.85) {
      fireSparkle(x, y);
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }
    
    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 45 && !isRevealed) {
      setIsRevealed(true);
      // Celebration burst
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#e8a4b8", "#f5c6d6", "#ffd700", "#ffb6c1"],
        ticks: 150,
        gravity: 0.6,
        scalar: 1.2,
      });
    }
  }, [isRevealed, fireSparkle]);

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); 
    isDrawing.current = true;
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();  
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
  };

  return (
    <section className="py-28 px-6 relative gradient-warm overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-20 text-gold/30 text-4xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-20 text-love/30 text-3xl"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎁
      </motion.div>

      <div className="max-w-md mx-auto text-center relative z-10">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.2em] text-love mb-4">
            🎁 A little surprise 🎁
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-light text-foreground mb-4">
            You've Got a Gift!
          </h2>
          <p className="text-muted-foreground mb-10">
            Scratch below to reveal what's waiting for you
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <motion.div
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated bg-card"
            whileHover={{ scale: isRevealed ? 1 : 1.02 }}
          >
            {/* Hidden content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-card to-muted/50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: isRevealed ? 1 : 0.2, 
                  scale: isRevealed ? 1 : 0.9 
                }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="text-center"
              >
                <motion.span
                  className="text-5xl block mb-4"
                  animate={isRevealed ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  🎉
                </motion.span>
                <h3 className="text-2xl font-display font-light text-foreground mb-3">
                  {revealContent.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-xs">
                  {revealContent.message}
                </p>
                {/* FIX #2: Removed "Claim your gift" button - scratch card is informational only */}
              </motion.div>
            </div>

            {/* Scratch overlay */}
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 scratch-canvas touch-none"
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              animate={{ opacity: isRevealed ? 0 : 1 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ pointerEvents: isRevealed ? "none" : "auto",
              touchAction: "none"}}
            />
          </motion.div>
        </ScrollReveal>

        <motion.p
          className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2"
          animate={{ opacity: isRevealed ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {scratchPercentage > 0 ? (
            <>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
              {Math.round(scratchPercentage)}% revealed... keep going!
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
              >
                ✨
              </motion.span>
            </>
          ) : (
            "👆 Use your finger or mouse to scratch"
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default ScratchReveal;
