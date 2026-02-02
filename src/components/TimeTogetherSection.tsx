import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

interface TimeValues {
  years: number;
  months: number;
  days: number;
  seconds: number;
}

// 🔧 CHANGE START DATE HERE (YYYY-MM-DD)
const START_DATE = new Date("2023-12-25T00:00:00");

const calculateElapsedTime = (): TimeValues => {
  const now = new Date();

  // ---- YEARS (completed anniversaries) ----
  let years = now.getFullYear() - START_DATE.getFullYear();

  const anniversaryThisYear = new Date(
    now.getFullYear(),
    START_DATE.getMonth(),
    START_DATE.getDate()
  );

  if (now < anniversaryThisYear) {
    years -= 1;
  }

  // ---- MONTHS (completed months AFTER last anniversary) ----
  const lastAnniversary = new Date(
    START_DATE.getFullYear() + years,
    START_DATE.getMonth(),
    START_DATE.getDate()
  );

  let months =
    (now.getFullYear() - lastAnniversary.getFullYear()) * 12 +
    (now.getMonth() - lastAnniversary.getMonth());

  if (now.getDate() < lastAnniversary.getDate()) {
    months -= 1;
  }

  months = Math.max(0, Math.min(11, months));

  // ---- DAYS (after months) ----
  const lastMonthMark = new Date(lastAnniversary);
  lastMonthMark.setMonth(lastMonthMark.getMonth() + months);

  const days = Math.floor(
    (now.getTime() - lastMonthMark.getTime()) / (1000 * 60 * 60 * 24)
  );

  // ---- SECONDS (0–59 ticking) ----
  const seconds = now.getSeconds();

  return { years, months, days, seconds };
};

const TimeTogetherSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const [displayValues, setDisplayValues] = useState<TimeValues>({
    years: 0,
    months: 0,
    days: 0,
    seconds: 0,
  });

  // Initial animation trigger
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Live ticking (local only)
  useEffect(() => {
    setDisplayValues(calculateElapsedTime());

    const interval = setInterval(() => {
      setDisplayValues(calculateElapsedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits: TimeUnit[] = [
    { value: displayValues.years, label: displayValues.years === 1 ? "Year" : "Years" },
    { value: displayValues.months, label: displayValues.months === 1 ? "Month" : "Months" },
    { value: displayValues.days, label: displayValues.days === 1 ? "Day" : "Days" },
    { value: displayValues.seconds, label: "Seconds" },
  ];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 relative overflow-hidden bg-background"
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--golden-yellow) / 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Header */}
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
          className="flex justify-center gap-4 md:gap-8 mb-10 flex-wrap"
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
                  background:
                    "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(0 0% 10%) 100%)",
                  boxShadow: "0 15px 40px -10px hsl(0 0% 0% / 0.5)",
                }}
                animate={
                  hasAnimated
                    ? {
                        boxShadow: [
                          "0 15px 40px -10px hsl(0 0% 0% / 0.5)",
                          "0 15px 50px -10px hsl(var(--golden-yellow) / 0.2)",
                          "0 15px 40px -10px hsl(0 0% 0% / 0.5)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  delay: 2 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span
                  className={`font-display font-bold ${
                    unit.label === "Seconds"
                      ? "text-2xl md:text-3xl text-golden-yellow animate-pulse"
                      : "text-3xl md:text-5xl text-white"
                  }`}
                >
                  {unit.value}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground mt-1">
                  {unit.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-white/70 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Still counting… every second ❤️
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center gap-4 mt-10"
          initial={{ opacity: 0 }}
          animate={isInView && hasAnimated ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 0.6 }}
        >
          {["⏰", "💕", "∞"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ y: [0, -4, 0] }}
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
