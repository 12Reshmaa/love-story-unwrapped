import { motion, useInView } from 'framer-motion';
import { useCallback, useRef, useState, useEffect } from 'react';

const genres = [
  { name: "ACTION", color: "bg-hot-coral" },
  { name: "ROMANCE", color: "bg-neon-pink" },
  { name: "COMEDY", color: "bg-golden-yellow text-black" },
  { name: "CHAOS", color: "bg-electric-purple" },
];

const MovieSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const isInViewport = useInView(ref, { once: false, margin: "-15%" });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleOpenVideo = () => setIsVideoOpen(true);
  const handleCloseVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsVideoOpen(false);
  }, []);

  useEffect(() => {
    if (!isInViewport && isVideoOpen) {
      handleCloseVideo();
    }
  }, [isInViewport, isVideoOpen, handleCloseVideo]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        handleCloseVideo();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [handleCloseVideo]);

  useEffect(() => {
    if (!isVideoOpen) return;

    const onAnyInteraction = () => {
      handleCloseVideo();
    };

    window.addEventListener('pointerdown', onAnyInteraction, true);
    window.addEventListener('touchstart', onAnyInteraction, true);
    return () => {
      window.removeEventListener('pointerdown', onAnyInteraction, true);
      window.removeEventListener('touchstart', onAnyInteraction, true);
    };
  }, [isVideoOpen, handleCloseVideo]);

  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, []);

  return (
    <section 
      ref={ref} 
      className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden transition-colors duration-[2000ms] ease-in-out"
      style={{ backgroundColor: 'hsl(350 65% 92%)' }}
    >
      {/* Film grain overlay - reduced opacity */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Spotlight effects - slower */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
        }}
        animate={{
          x: ['-20%', '120%', '-20%'],
          y: ['-20%', '20%', '-20%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block text-lg md:text-base font-bold tracking-widest uppercase text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            🎬 Coming Soon 🎬
          </motion.span>
          <motion.h2
            className="font-display text-5xl md:text-5xl lg:text-6xl font-bold text-pink-500"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            If we were
            <br />
             a Movie
          </motion.h2>
        </motion.div>

        {/* Movie poster card */}
        <motion.div
          className="relative mx-auto max-w-md sm:max-w-lg md:max-w-xl"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          {/* Card glow - smoother */}
          <motion.div
            className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
            animate={{
              background: [
                'linear-gradient(135deg, hsl(var(--neon-pink)) 0%, hsl(var(--electric-purple)) 100%)',
                'linear-gradient(135deg, hsl(var(--hot-coral)) 0%, hsl(var(--golden-yellow)) 100%)',
                'linear-gradient(135deg, hsl(var(--electric-purple)) 0%, hsl(var(--cyan-blue)) 100%)',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black/80 backdrop-blur-sm border border-white/20">
            {/* Poster area */}
            <div className="aspect-[4/3] md:aspect-video md:max-h-[360px] bg-gradient-to-br from-deep-magenta to-neon-pink/50 relative overflow-hidden">
              <img
                src="/zootopia-thumbnail.png"
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
              />
              {/* Film strip decorations */}
              <div className="absolute top-2 left-2 right-2 flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 h-4 bg-black/40 rounded-sm"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                  />
                ))}
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 h-4 bg-black/40 rounded-sm"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                  />
                ))}
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/40 cursor-pointer"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.35)', transition: { duration: 0.3 } }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenVideo();
                  }}
                >
                  <motion.svg 
                    className="w-16 h-16 text-white ml-2" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M8 5v14l11-7z"/>
                  </motion.svg>
                </motion.div>
              </div>
            </div>

            {isVideoOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                onClick={handleCloseVideo}
              >
                <div
                  className="absolute inset-0 bg-black/70"
                  onClick={handleCloseVideo}
                />
                <div className="relative z-10 w-full max-w-4xl">
                  <div
                    className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/20"
                  >
                    <video
                      ref={videoRef}
                      src="/sample-testvideo.mp4"
                      className="w-full h-auto"
                      controls
                      preload="metadata"
                      playsInline
                      onEnded={handleCloseVideo}
                    />
                    <button
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
                      onClick={handleCloseVideo}
                      aria-label="Close video"
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Info panel */}
            <div className="p-8">
              {/* Genre badges - staggered smooth entry */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {genres.map((genre, i) => (
                  <motion.span
                    key={genre.name}
                    className={`${genre.color} text-sm md:text-base font-black px-5 py-2 rounded-full shadow-lg`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ 
                      delay: 0.9 + i * 0.12, 
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    {genre.name}
                  </motion.span>
                ))}
              </div>

              {/* Movie details */}
              <div className="space-y-4 text-center">
                <motion.div
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <span className="text-white/60 text-lg">Runtime:</span>
                  <motion.span
                    className="font-display text-2xl md:text-0.5xl font-bold text-black-bold"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    FOREVER
                  </motion.span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <span className="text-white/60 text-lg">Rating:</span>
                  <motion.span
                    className="text-3xl md:text-2xl font-bold text-golden-yellow"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ⭐ ∞/10
                  </motion.span>
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl text-white/80 italic font-display mt-6"
                  initial={{ y: 15, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  ⭐⭐⭐⭐⭐
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MovieSection;
