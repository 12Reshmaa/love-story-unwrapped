import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle' | 'star' | 'circle';
  color: string;
}

const colors = [
  'text-neon-pink',
  'text-electric-purple',
  'text-hot-coral',
  'text-golden-yellow',
  'text-cyan-blue',
  'text-lime-green',
];

const FloatingParticles = ({ count = 20, intense = false }: { count?: number; intense?: boolean }) => {
  // Reduce particle count for performance
  const particleCount = Math.min(count, intense ? 25 : 15);
  
  const particles = useMemo(() => {
    const items: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (intense ? 16 : 12) + 6,
        duration: Math.random() * 6 + 8, // Slower, smoother movement
        delay: Math.random() * 4,
        type: ['heart', 'sparkle', 'star', 'circle'][Math.floor(Math.random() * 4)] as Particle['type'],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, [particleCount, intense]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            rotate: [0, 180, 360],
            scale: [0.9, 1.1, 0.9],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.type === 'heart' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className={particle.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
          {particle.type === 'sparkle' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className={particle.color}>
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
            </svg>
          )}
          {particle.type === 'star' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className={particle.color}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          )}
          {particle.type === 'circle' && (
            <div className={`w-full h-full rounded-full bg-current ${particle.color}`} style={{ opacity: 0.4 }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
