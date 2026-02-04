import { motion } from 'framer-motion';

const loveReasons = [
  "The way you smile when you're sleepy.",
  "How you remember the smallest things.",
  "The way you make hard days lighter.",
  "Your laugh that fills every room.",
  "How you always know what to say.",
  "The warmth of your presence.",
];

const ThingsILoveSection = () => {
  return (
    <section className="py-34 px-6 bg-background relative">
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--neon-pink) / 0.2) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-2xl font-medium tracking-widest uppercase text-neon-pink/60 mb-4">
            The Quiet Part
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-5xl font-bold text-white">
            Things I Love About You
          </h2>
        </motion.div>

        <div className="space-y-40 md:space-y-90">
          {loveReasons.map((reason, index) => (
            <motion.div
              key={index}
              className="min-h-[40vh] flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.p
                className="font-display text-3xl md:text-4xlg:text-3xl text-center text-white/90 leading-relaxed max-w-3xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.10 }}
                transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
              >
                <span className="text-neon-pink">"</span>
                {reason}
                <span className="text-neon-pink">"</span>
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Single heart */}
        <motion.div
          className="flex justify-center mt-24"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="text-5xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💕
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default ThingsILoveSection;
