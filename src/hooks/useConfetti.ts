import confetti from 'canvas-confetti';

const colors = ['#ff1b6b', '#a855f7', '#ff6b35', '#fbbf24', '#22d3ee', '#84cc16'];

export const useConfetti = () => {
  const burst = (options?: { x?: number; y?: number; count?: number }) => {
    const { x = 0.5, y = 0.5, count = 30 } = options || {};
    
    confetti({
      particleCount: count,
      spread: 70,
      origin: { x, y },
      colors,
      ticks: 120,
      gravity: 0.6,
      scalar: 1,
      drift: 0.1,
      shapes: ['circle'],
      disableForReducedMotion: true,
    });
  };

  const celebration = () => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 45,
        origin: { x: 0, y: 0.7 },
        colors,
        gravity: 0.5,
        drift: 0.5,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 45,
        origin: { x: 1, y: 0.7 },
        colors,
        gravity: 0.5,
        drift: -0.5,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const explosion = (x = 0.5, y = 0.5) => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x, y },
      colors,
      startVelocity: 30,
      ticks: 150,
      gravity: 0.5,
      scalar: 1.1,
      drift: 0,
      disableForReducedMotion: true,
    });
  };

  const shower = () => {
    let count = 0;
    const maxCount = 12;
    
    const interval = setInterval(() => {
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        return;
      }
      
      confetti({
        particleCount: 4,
        spread: 100,
        origin: { x: Math.random(), y: -0.1 },
        colors,
        ticks: 250,
        gravity: 0.4,
        drift: 0.2,
        disableForReducedMotion: true,
      });
    }, 150);
  };

  return { burst, celebration, explosion, shower };
};
