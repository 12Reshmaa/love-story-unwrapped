import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const CountdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayValues, setDisplayValues] = useState({ days: 12, hours: 7, minutes: 34, seconds: 52 });

  // Demo mode: Randomize digits every second (never reaches zero)
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayValues({
        days: Math.floor(Math.random() * 30) + 1,    // 1-30
        hours: Math.floor(Math.random() * 24),        // 0-23
        minutes: Math.floor(Math.random() * 60),      // 0-59
        seconds: Math.floor(Math.random() * 60),      // 0-59
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: displayValues.days, label: 'Days' },
    { value: displayValues.hours, label: 'Hours' },
    { value: displayValues.minutes, label: 'Minutes' },
    { value: displayValues.seconds, label: 'Seconds' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden animated-gradient-slow">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="text-5xl md:text-6xl inline-block mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💝
          </motion.span>

          <span className="block text-sm font-medium tracking-widest uppercase text-white/60 mb-4">
            💍 What's Next 💍
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Counting Down to Something Special
          </h2>
          <p className="mt-4 text-white/70 italic font-handwritten text-lg">
            "Counting down to our next big moment…"
          </p>
        </motion.div>

        {/* Demo Countdown Display */}
        <motion.div
          className="flex justify-center gap-3 md:gap-6 mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                className="w-16 h-20 md:w-20 md:h-24 rounded-xl flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, hsl(0 0% 10% / 0.8) 0%, hsl(0 0% 5% / 0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 30px -10px hsl(0 0% 0% / 0.5)',
                }}
                animate={{
                  boxShadow: [
                    '0 10px 30px -10px hsl(0 0% 0% / 0.5)',
                    '0 10px 35px -10px hsl(var(--neon-pink) / 0.2)',
                    '0 10px 30px -10px hsl(0 0% 0% / 0.5)',
                  ],
                }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Animated number with smooth transition */}
                <motion.span
                  className="font-display text-2xl md:text-3xl font-bold text-white"
                  key={unit.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
                <span className="text-[10px] md:text-xs text-white/50 mt-1 uppercase tracking-wider">
                  {unit.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo indicator */}
        <motion.p
          className="text-white/40 text-xs tracking-wider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          ✨ Sample countdown preview ✨
        </motion.p>

        {/* Decorative floating hearts */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {['✨', '💕', '✨'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;
