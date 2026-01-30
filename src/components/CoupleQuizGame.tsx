import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: Question[] = [
  {
    question: "What's the best way to spend a Sunday together?",
    options: ["Netflix & cuddles", "Adventure outdoors", "Cooking together"],
    correctIndex: 0,
  },
  {
    question: "Which song makes you think of us?",
    options: ["Something upbeat", "A slow romantic ballad", "Our first dance song"],
    correctIndex: 2,
  },
  {
    question: "What's my love language?",
    options: ["Words of affirmation", "Quality time", "Physical touch"],
    correctIndex: 1,
  },
  {
    question: "Where would our dream vacation be?",
    options: ["Beach paradise", "European adventure", "Cozy cabin getaway"],
    correctIndex: 0,
  },
  {
    question: "What do I love most about you?",
    options: ["Your laugh", "Your kindness", "Everything 💕"],
    correctIndex: 2,
  },
  {
    question: "What's our relationship superpower?",
    options: ["Communication", "Making each other laugh", "Supporting each other"],
    correctIndex: 1,
  },
];

const CoupleQuizGame = () => {
  const { burst, shower } = useConfetti();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isSuccess = score >= 4;

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Auto-advance after delay
    setTimeout(() => {
      if (isLastQuestion) {
        setIsComplete(true);
        // Trigger confetti only on success
        if (score + (isCorrect ? 1 : 0) >= 4) {
          burst({ x: 0.5, y: 0.4, count: 20 });
          setTimeout(() => shower(), 300);
        }
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    }, 1200);
  }, [isAnswered, currentQuestion, isLastQuestion, score, burst, shower]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsComplete(false);
  }, []);

  const getAnswerStyle = (index: number) => {
    if (!isAnswered) return {};
    
    if (index === currentQuestion.correctIndex) {
      return {
        background: 'hsl(142 70% 35% / 0.3)',
        borderColor: 'hsl(142 70% 45%)',
      };
    }
    
    if (index === selectedAnswer && index !== currentQuestion.correctIndex) {
      return {
        background: 'hsl(0 70% 40% / 0.3)',
        borderColor: 'hsl(0 70% 50%)',
      };
    }
    
    return { opacity: 0.5 };
  };

  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Progress */}
            <div className="flex justify-center gap-2 mb-6">
              {questions.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index < currentQuestionIndex 
                      ? 'bg-neon-pink' 
                      : index === currentQuestionIndex 
                        ? 'bg-white' 
                        : 'bg-white/20'
                  }`}
                  animate={index === currentQuestionIndex ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <span className="text-white/40 text-sm mb-2 block">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 max-w-md mx-auto">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  className="w-full px-6 py-4 rounded-xl text-left border border-white/10 transition-all duration-300"
                  style={{
                    background: 'hsl(0 0% 12%)',
                    ...getAnswerStyle(index),
                  }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.02, borderColor: 'hsl(var(--neon-pink) / 0.5)' } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-white/80 font-medium">{option}</span>
                  
                  {/* Feedback icons */}
                  <AnimatePresence>
                    {isAnswered && index === currentQuestion.correctIndex && (
                      <motion.span
                        className="float-right text-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        ✓
                      </motion.span>
                    )}
                    {isAnswered && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                      <motion.span
                        className="float-right text-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        ✗
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* Current score */}
            <div className="text-center mt-6">
              <span className="text-white/30 text-xs">
                Score: {score} / {questions.length}
              </span>
            </div>
          </motion.div>
        ) : (
          /* Result Screen */
          <motion.div
            key="result"
            className="flex flex-col items-center justify-center min-h-[350px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Heart Popup */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2,
              }}
            >
              {isSuccess ? (
                <motion.span
                  className="text-8xl block"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: 2,
                    ease: "easeInOut",
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 30px hsl(var(--neon-pink) / 0.6))',
                  }}
                >
                  ❤️
                </motion.span>
              ) : (
                <motion.span
                  className="text-8xl block"
                  animate={{ 
                    x: [-2, 2, -2, 0],
                  }}
                  transition={{ 
                    duration: 0.4, 
                    repeat: 2,
                    ease: "easeInOut",
                  }}
                >
                  💔
                </motion.span>
              )}
            </motion.div>

            {/* Score */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-3xl font-display font-bold text-white mb-2">
                {score} / {questions.length}
              </p>
              <p className="font-handwritten text-xl text-white/80">
                {isSuccess 
                  ? "Okay wow… you really know us 🥺" 
                  : "Hmm… we need more dates 😌"}
              </p>
            </motion.div>

            {/* Play Again Button */}
            <motion.button
              className="px-6 py-3 rounded-full text-sm font-medium text-white transition-all"
              style={{
                background: isSuccess 
                  ? 'linear-gradient(135deg, hsl(var(--neon-pink)) 0%, hsl(var(--hot-coral)) 100%)'
                  : 'hsl(0 0% 20%)',
              }}
              onClick={resetQuiz}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again 💕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoupleQuizGame;
