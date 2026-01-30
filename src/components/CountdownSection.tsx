import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const { burst, shower } = useConfetti();

  // Configure your target date and event here
  const targetDate = new Date('2025-02-14'); // Example: Valentine's Day 2025
  const eventName = "Valentine's Day";
  const eventEmoji = "💝";

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      complete: false,
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const result = calculateTimeLeft();
      setTimeLeft({
        days: result.days,
        hours: result.hours,
        minutes: result.minutes,
        seconds: result.seconds,
      });

      if (result.complete && !isComplete) {
        setIsComplete(true);
        if (!hasTriggeredConfetti) {
          setHasTriggeredConfetti(true);
          // Gentle confetti on completion
          burst({ x: 0.3, y: 0.5, count: 15 });
          burst({ x: 0.7, y: 0.5, count: 15 });
          setTimeout(() => shower(), 500);
        }
      }
    }, 1000);

    // Initial calculation
    const initial = calculateTimeLeft();
    setTimeLeft({
      days: initial.days,
      hours: initial.hours,
      minutes: initial.minutes,
      seconds: initial.seconds,
    });
    if (initial.complete) setIsComplete(true);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, isComplete, hasTriggeredConfetti, burst, shower]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
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
            {eventEmoji}
          </motion.span>

          <span className="block text-sm font-medium tracking-widest uppercase text-white/60 mb-4">
            💍 What's Next 💍
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Counting down to {eventName}
          </h2>
          <p className="mt-4 text-white/70 italic font-handwritten text-lg">
            "Counting down to our next big moment…"
          </p>
        </motion.div>

        {/* Countdown Display */}
        {!isComplete ? (
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
                  <motion.span
                    className="font-display text-2xl md:text-3xl font-bold text-white"
                    key={unit.value}
                    initial={{ opacity: 0.8, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
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
        ) : (
          /* Completion State */
          <motion.div
            className="py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="card-wrapped inline-block px-10 py-8"
              style={{
                boxShadow: '0 0 50px hsl(var(--neon-pink) / 0.4)',
              }}
              animate={{
                boxShadow: [
                  '0 0 50px hsl(var(--neon-pink) / 0.4)',
                  '0 0 60px hsl(var(--neon-pink) / 0.5)',
                  '0 0 50px hsl(var(--neon-pink) / 0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="text-5xl block mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🎉
              </motion.span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                It's Here!
              </h3>
              <p className="text-white/70 font-handwritten text-lg">
                Happy {eventName}, my love! 💕
              </p>
            </motion.div>
          </motion.div>
        )}

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
