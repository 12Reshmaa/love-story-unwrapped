 import { motion, useInView, AnimatePresence } from 'framer-motion';
 import { useEffect, useRef, useState } from 'react';

interface Memory {
  id: number;
  emoji: string;
  caption: string;
  src?: string;
  rotation: number;
  gradient: string;
}

const memories: Memory[] = [
  {
    id: 1,
    emoji: "�",
    caption: "Us, in our own little world",
    src: "/couple4",
    rotation: -3,
    gradient: "from-hot-coral via-sunset-orange to-golden-yellow",
  },
  {
    id: 2,
    emoji: "�",
    caption: "Cat cuddles",
    src: "/cat.png",
    rotation: 2,
    gradient: "from-electric-purple via-deep-magenta to-neon-pink",
  },
  {
    id: 3,
    emoji: "�",
    caption: "Our Baby",
    src: "/dog.png",
    rotation: -2,
    gradient: "from-cyan-blue via-electric-purple to-neon-pink",
  },
  {
    id: 4,
    emoji: "�",
    caption: "Park days",
    src: "/prk.png",
    rotation: 4,
    gradient: "from-golden-yellow via-hot-coral to-neon-pink",
  },
  {
    id: 5,
    emoji: "🚗✨",
    caption: "That spontaneous road trip",
    src: "/roadtrip.png",
    rotation: -4,
    gradient: "from-sunset-orange via-hot-coral to-deep-magenta",
  },
  {
    id: 6,
    emoji: "✈️",
    caption: "Travel memories",
    src: "/travel.png",
    rotation: 3,
    gradient: "from-neon-pink via-electric-purple to-cyan-blue",
  },
];

 const PhotoCard = ({
   memory,
   index,
   onSelect,
 }: {
   memory: Memory;
   index: number;
   onSelect?: (memory: Memory) => void;
 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: memory.rotation * 2 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotate: memory.rotation 
      } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect?.(memory)}
    >
      {/* Polaroid-style frame */}
      <div 
        className="bg-white/10 backdrop-blur-sm p-2 pb-12 rounded-lg shadow-xl border border-white/20"
        style={{
          boxShadow: isHovered 
            ? '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 30px rgba(255,107,174,0.3)' 
            : '0 10px 30px -10px rgba(0,0,0,0.3)',
        }}
      >
        {/* Photo area */}
        <div className={`aspect-square rounded overflow-hidden bg-gradient-to-br ${memory.gradient} relative`}>
          {memory.src ? (
            <motion.img
              src={memory.src}
              alt={memory.caption}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{
                scale: isHovered ? [1, 1.04, 1] : 1,
              }}
              transition={{ duration: 0.6 }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl"
              animate={{ 
                scale: isHovered ? [1, 1.1, 1] : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              {memory.emoji}
            </motion.span>
          )}
          
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ['200% 0%', '-200% 0%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              backgroundSize: '200% 100%' 
            }}
          />
        </div>

        {/* Caption */}
        <motion.p 
          className="absolute bottom-3 left-0 right-0 text-center text-sm md:text-base font-handwritten text-white/80"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {memory.caption}
        </motion.p>
      </div>

      {/* Tape decoration */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/20 rounded-sm rotate-2" />
    </motion.div>
  );
};

const PhotoMemoriesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    if (!selectedMemory) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedMemory]);

  return (
    <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
      {/* Background gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-0 w-[40vw] h-[40vw] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'hsl(var(--neon-pink))' }}
        animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[35vw] h-[35vw] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'hsl(var(--electric-purple))' }}
        animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block text-sm font-medium tracking-widest uppercase text-neon-pink/70 mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            📸 Our Scrapbook 📸
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Moments We've Collected
          </motion.h2>
        </motion.div>

        {/* Scrapbook grid - organic layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {memories.map((memory, index) => (
            <PhotoCard
              key={memory.id}
              memory={memory}
              index={index}
              onSelect={setSelectedMemory}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                className="w-full max-w-xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/20">
                  {selectedMemory.src ? (
                    <img
                      src={selectedMemory.src}
                      alt={selectedMemory.caption}
                      className="w-full max-h-[80vh] object-contain bg-black"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-[60vh] flex items-center justify-center bg-black text-7xl">
                      {selectedMemory.emoji}
                    </div>
                  )}
                </div>
                <p className="mt-3 text-center text-white/80 font-handwritten">
                  {selectedMemory.caption}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom decoration */}
        <motion.div
          className="flex justify-center gap-4 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {['✨', '💕', '✨'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoMemoriesSection;
