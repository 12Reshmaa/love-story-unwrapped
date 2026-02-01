import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface TimeUnit {
  value: number;
  label: string;
}

const TimeTogetherSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState({ 
    years: 0, 
    months: 0, 
    totalDays: 0, 
    totalSeconds: 0 
  });

  // Configure your relationship start date here (YYYY-MM-DD format)
  const START_DATE = '2023-01-15'; // Change this to your actual start date

  const calculateElapsedTime = () => {
    const now = new Date();
    const start = new Date(START_DATE);
    
    // Calculate total elapsed time
    const totalDiff = now.getTime() - start.getTime();
    const totalSeconds = Math.floor(totalDiff / 1000);
    const totalDays = Math.floor(totalDiff / (1000 * 60 * 60 * 24));
    
    // Calculate calendar-based years
    let years = 0;
    let testDate = new Date(start);
    
    while (true) {
      const nextYear = new Date(testDate);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      
      if (nextYear > now) {
        break;
      }
      
      years++;
      testDate = nextYear;
    }
    
    // Calculate calendar-based months after the last full year
    const lastAnniversary = new Date(start);
    lastAnniversary.setFullYear(lastAnniversary.getFullYear() + years);
    
    let months = 0;
    let testMonth = new Date(lastAnniversary);
    
    while (true) {
      const nextMonth = new Date(testMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      if (nextMonth > now) {
        break;
      }
      
      months++;
      testMonth = nextMonth;
    }

    return { years, months, totalDays, totalSeconds };
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Live update interval - updates every second
  useEffect(() => {
    // Calculate initial values
    const initialValues = calculateElapsedTime();
    setDisplayValues(initialValues);

    // Set up interval to update every second
    const interval = setInterval(() => {
      const elapsed = calculateElapsedTime();
      setDisplayValues(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits: TimeUnit[] = [
    { value: displayValues.years, label: displayValues.years === 1 ? 'Year' : 'Years' },
    { value: displayValues.months, label: displayValues.months === 1 ? 'Month' : 'Months' },
    { value: displayValues.totalDays, label: displayValues.totalDays === 1 ? 'Day' : 'Days' },
    { value: displayValues.totalSeconds, label: displayValues.totalSeconds === 1 ? 'Second' : 'Seconds' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--golden-yellow) / 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-golden-yellow/70 mb-4">
            ⏳ Years of Us ⏳
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Time Together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every second with you is a treasure
          </p>
        </motion.div>

        {/* Time Counter */}
        <motion.div
          className="flex justify-center gap-4 md:gap-8 mb-10"
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
                className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(0 0% 10%) 100%)',
                  boxShadow: '0 15px 40px -10px hsl(0 0% 0% / 0.5)',
                }}
                animate={hasAnimated ? {
                  boxShadow: [
                    '0 15px 40px -10px hsl(0 0% 0% / 0.5)',
                    '0 15px 50px -10px hsl(var(--golden-yellow) / 0.2)',
                    '0 15px 40px -10px hsl(0 0% 0% / 0.5)',
                  ],
                } : {}}
                transition={{ 
                  duration: 3, 
                  delay: 2 + index * 0.2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="font-display text-3xl md:text-5xl font-bold text-white">
                  {unit.label === 'Seconds' || unit.label === 'Second' 
                    ? unit.value.toLocaleString() 
                    : unit.value}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground mt-1">
                  {unit.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Total days note */}
        <motion.div
          className="card-wrapped inline-block px-6 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            boxShadow: '0 0 30px hsl(var(--golden-yellow) / 0.15)',
          }}
        >
          <p className="text-white/70 text-sm md:text-base">
            That's <span className="text-golden-yellow font-semibold">{displayValues.totalDays.toLocaleString()}</span> days of loving you 💕
          </p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center gap-4 mt-10"
          initial={{ opacity: 0 }}
          animate={isInView && hasAnimated ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 0.6 }}
        >
          {['⏰', '💕', '∞'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
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

export default TimeTogetherSection;
