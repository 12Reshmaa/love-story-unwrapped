import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface PlaylistItem {
  title: string;
  artist: string;
  cover: string;
  url: string;
  platform: 'spotify' | 'apple' | 'youtube';
}

const PlaylistPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sample playlist - replace with real songs and links
  const playlist: PlaylistItem[] = [
    {
      title: "Our Song",
      artist: "The Artist",
      cover: "🎵",
      url: "https://open.spotify.com",
      platform: 'spotify',
    },
    {
      title: "First Dance",
      artist: "Love Notes",
      cover: "💿",
      url: "https://music.apple.com",
      platform: 'apple',
    },
    {
      title: "Forever Yours",
      artist: "Heartstrings",
      cover: "🎶",
      url: "https://youtube.com",
      platform: 'youtube',
    },
    {
      title: "When I'm With You",
      artist: "Melody Dreams",
      cover: "🎹",
      url: "https://open.spotify.com",
      platform: 'spotify',
    },
  ];

  const getPlatformIcon = (platform: PlaylistItem['platform']) => {
    switch (platform) {
      case 'spotify': return '🟢';
      case 'apple': return '🍎';
      case 'youtube': return '🔴';
    }
  };

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--lime-green) / 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-lime-green/70 mb-4">
            🎧 Our Songs 🎧
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            The Soundtrack of Us
          </h2>
          <p className="mt-4 text-muted-foreground">
            Songs that remind me of you 💕
          </p>
        </motion.div>

        {/* Playlist Cards */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {playlist.map((song, index) => (
            <motion.a
              key={index}
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative p-4 md:p-5 rounded-2xl flex items-center gap-4 border border-transparent transition-colors"
                style={{
                  background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(0 0% 10%) 100%)',
                }}
                animate={{
                  y: hoveredIndex === index ? -4 : 0,
                  boxShadow: hoveredIndex === index 
                    ? '0 20px 40px -15px hsl(var(--lime-green) / 0.3)' 
                    : '0 10px 30px -15px hsl(0 0% 0% / 0.4)',
                  borderColor: hoveredIndex === index 
                    ? 'hsl(var(--lime-green) / 0.3)' 
                    : 'transparent',
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Album Art */}
                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{
                    background: 'linear-gradient(145deg, hsl(var(--muted)) 0%, hsl(0 0% 15%) 100%)',
                  }}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {song.cover}
                </motion.div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate text-base md:text-lg">
                    {song.title}
                  </h3>
                  <p className="text-muted-foreground text-sm truncate">
                    {song.artist}
                  </p>
                </div>

                {/* Platform Icon */}
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getPlatformIcon(song.platform)}</span>
                  
                  {/* Heart animation on hover */}
                  <motion.span
                    className="text-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    💕
                  </motion.span>

                  {/* Play indicator */}
                  <motion.div
                    className="w-8 h-8 rounded-full bg-lime-green/20 flex items-center justify-center"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      backgroundColor: hoveredIndex === index 
                        ? 'hsl(var(--lime-green) / 0.3)' 
                        : 'hsl(var(--lime-green) / 0.15)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg 
                      className="w-4 h-4 text-lime-green ml-0.5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Sound-on hint */}
        <motion.p
          className="text-center mt-8 text-white/40 text-sm flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🔊
          </motion.span>
          Sound on for the full experience
        </motion.p>
      </div>
    </section>
  );
};

export default PlaylistPreviewSection;
