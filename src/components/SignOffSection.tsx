import { motion } from 'framer-motion';
import { useConfetti } from '@/hooks/useConfetti';
import FloatingParticles from './FloatingParticles';

const SignOffSection = () => {
  const { celebration } = useConfetti();

  return (
    <footer className="py-24 md:py-32 px-6 animated-gradient relative overflow-hidden">
      <FloatingParticles count={20} />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          onAnimationComplete={celebration}
        >
          <motion.span
            className="text-7xl md:text-8xl block mb-8"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💕
          </motion.span>

          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Here's to Forever
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-12 font-handwritten"
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            And all the beautiful tomorrows yet to come ✨
          </motion.p>

          {/* Simple sign-off */}
          <motion.div 
            className="space-y-2 text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="font-handwritten text-lg">With all my love,</p>
            <p className="font-display text-xl text-white/80">Your Person</p>
            <p className="text-sm mt-4 text-white/40">January 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default SignOffSection;
