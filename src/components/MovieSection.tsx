import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const genres = ['Romance', 'Comedy', 'Adventure', 'Drama'];

const MovieSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      {/* Cinematic dark overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(0 0% 5%) 50%, hsl(var(--background)) 100%)',
        }}
      />

      {/* Film grain effect */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")',
        }}
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 0.15, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block text-sm font-medium tracking-widest uppercase text-golden-yellow/70 mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            🎬 Now Showing 🎬
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Our Story as a Film
          </motion.h2>
        </motion.div>

        {/* Movie poster card */}
        <motion.div
          className="relative max-w-lg mx-auto"
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-4 rounded-3xl opacity-50 blur-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--golden-yellow)) 0%, hsl(var(--hot-coral)) 50%, hsl(var(--neon-pink)) 100%)',
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(180deg, hsl(0 0% 12%) 0%, hsl(0 0% 8%) 100%)',
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {/* Poster area */}
            <div className="aspect-[3/4] relative bg-gradient-to-br from-neon-pink/20 via-electric-purple/20 to-hot-coral/20 overflow-hidden">
              {/* Film strip decoration */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-black flex items-center justify-around">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-sm bg-white/10" />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-black flex items-center justify-around">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-sm bg-white/10" />
                ))}
              </div>

              {/* Movie content */}
              <div className="absolute inset-8 flex flex-col items-center justify-center text-center">
                <motion.span
                  className="text-7xl md:text-8xl mb-6"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎬
                </motion.span>

                <motion.h3
                  className="font-display text-3xl md:text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Us: The Movie
                </motion.h3>

                <motion.p
                  className="text-white/60 font-handwritten text-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  A love story for the ages
                </motion.p>

                {/* Genre badges */}
                <motion.div
                  className="flex flex-wrap justify-center gap-2 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {genres.map((genre, i) => (
                    <motion.span
                      key={genre}
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/80 border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                    >
                      {genre}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Rating */}
                <motion.div
                  className="flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-golden-yellow text-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.3 + i * 0.1, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="p-6 text-center border-t border-white/10">
              <motion.div
                className="flex items-center justify-center gap-4 text-white/60"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <span className="text-sm uppercase tracking-wider">Runtime:</span>
                <motion.span
                  className="text-2xl font-bold text-gradient-bold"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 1.6, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Forever
                </motion.span>
                <span className="text-2xl">💕</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MovieSection;
