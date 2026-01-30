import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import PicturePuzzleGame from './PicturePuzzleGame';
import CoupleQuizGame from './CoupleQuizGame';

type GameTab = 'puzzle' | 'quiz';

const MiniGameSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeTab, setActiveTab] = useState<GameTab>('quiz');

  const tabs: { id: GameTab; label: string; emoji: string }[] = [
    { id: 'quiz', label: 'Couple Quiz', emoji: '❤️' },
    { id: 'puzzle', label: 'Puzzle', emoji: '🧩' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--neon-pink) / 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-neon-pink/70 mb-4">
            🎮 Interactive Games 🎮
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Play Together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fun little moments to share
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="flex justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/70'
              }`}
              style={{
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, hsl(var(--neon-pink) / 0.3) 0%, hsl(var(--hot-coral) / 0.2) 100%)'
                  : 'transparent',
                border: activeTab === tab.id 
                  ? '1px solid hsl(var(--neon-pink) / 0.3)'
                  : '1px solid transparent',
              }}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.emoji}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Game Content */}
        <motion.div
          className="card-wrapped p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            boxShadow: '0 0 40px hsl(var(--neon-pink) / 0.1)',
          }}
        >
          {activeTab === 'quiz' && <CoupleQuizGame />}
          {activeTab === 'puzzle' && <PicturePuzzleGame />}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          className="text-center mt-6 text-white/30 text-xs"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          ✨ Sample games for preview ✨
        </motion.p>
      </div>
    </section>
  );
};

export default MiniGameSection;
