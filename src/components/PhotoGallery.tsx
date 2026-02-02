import { useState, useRef } from "react";
import { Heart, Gift, Sparkles, Star, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Photo {
  id: number;
  caption: string;
  placeholder: string;
  emoji: string;
}

const photos: Photo[] = [
  {
    id: 1,
    caption: "Our favorite memory together 💕",
    placeholder: "hsl(15, 80%, 85%)",
    emoji: "💕",
  },
  {
    id: 2,
    caption: "That time we couldn't stop laughing 😂",
    placeholder: "hsl(340, 60%, 85%)",
    emoji: "😂",
  },
  {
    id: 3,
    caption: "Forever grateful for this friendship 🌟",
    placeholder: "hsl(45, 70%, 85%)",
    emoji: "🌟",
  },
];

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [boxShake, setBoxShake] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const boxRef = useRef<HTMLButtonElement>(null);

  const triggerConfetti = () => {
    // Multi-burst confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#FF6B9D", "#FFB347", "#87CEEB", "#DDA0DD", "#98D8C8"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  };

  const handleBoxClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setBoxShake(true);
    setTimeout(() => setBoxShake(false), 500);

    // Small confetti on each click
    confetti({
      particleCount: 10,
      spread: 30,
      origin: { y: 0.7 },
      colors: ["#FF6B9D", "#FFB347"],
    });

    if (newCount >= 3) {
      triggerConfetti();
      setTimeout(() => {
        setIsRevealed(true);
        setIsOpen(true);
      }, 500);
    }
  };

  const handlePhotoClick = (photoId: number) => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#FF6B9D", "#FFB347", "#DDA0DD"],
    });
  };

  const resetBox = () => {
    setIsRevealed(false);
    setClickCount(0);
    setIsOpen(false);
  };

  return (
    <section className="py-20 px-4 gradient-soft overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-gradient">
            🎁 Mystery Memory Box 🎁
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {!isRevealed
              ? "Click the gift box 3 times to reveal our special memories!"
              : "Our precious memories have been revealed! ✨"}
          </p>
          {!isRevealed && clickCount > 0 && (
            <p className="text-primary font-bold mt-2 animate-pulse">
              {3 - clickCount} more click{3 - clickCount !== 1 ? "s" : ""} to go! 🎉
            </p>
          )}
        </div>

        {/* Mystery Gift Box */}
        {!isRevealed && (
          <div className="flex flex-col items-center justify-center mb-12">
            <button
              ref={boxRef}
              onClick={handleBoxClick}
              className={`relative group cursor-pointer transition-all duration-300 hover:scale-110 ${
                boxShake ? "animate-wiggle" : ""
              }`}
              aria-label="Click to reveal memories"
            >
              {/* Gift Box */}
              <div className="relative">
                {/* Box Lid */}
                <div
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 w-44 h-10 bg-gradient-to-b from-primary to-primary/80 rounded-t-lg shadow-lg transition-all duration-300 ${
                    clickCount >= 2 ? "animate-bounce" : ""
                  }`}
                >
                  {/* Ribbon on lid */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-accent/60" />
                  {/* Bow */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="w-6 h-6 bg-accent rounded-full absolute -left-5 top-0 rotate-45" />
                      <div className="w-6 h-6 bg-accent rounded-full absolute -right-5 top-0 -rotate-45" />
                      <div className="w-4 h-4 bg-accent/80 rounded-full absolute left-1/2 -translate-x-1/2 top-1" />
                    </div>
                  </div>
                </div>

                {/* Box Body */}
                <div className="w-40 h-32 bg-gradient-to-b from-primary/90 to-primary rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
                  {/* Ribbon vertical */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-accent/60" />
                  {/* Sparkle effects */}
                  <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary-foreground/60 animate-pulse" />
                  <Sparkles className="absolute bottom-2 left-2 w-4 h-4 text-primary-foreground/60 animate-pulse delay-300" />
                  <Star className="absolute top-4 left-4 w-3 h-3 text-primary-foreground/40 animate-spin-slow" />
                </div>

                {/* Question marks floating around */}
                <span className="absolute -top-12 -left-8 text-2xl animate-float">❓</span>
                <span className="absolute -top-8 -right-8 text-2xl animate-float delay-200">✨</span>
                <span className="absolute -bottom-4 -left-6 text-xl animate-float delay-500">💝</span>
                <span className="absolute -bottom-4 -right-6 text-xl animate-float delay-700">🎀</span>
              </div>

              {/* Click indicator */}
              <div className="mt-8 flex items-center gap-2 text-muted-foreground">
                <PartyPopper className="w-5 h-5 text-primary animate-bounce" />
                <span className="text-sm font-medium">Tap me!</span>
                <PartyPopper className="w-5 h-5 text-accent animate-bounce delay-150" />
              </div>
            </button>

            {/* Progress dots */}
            <div className="flex gap-3 mt-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    clickCount >= num
                      ? "bg-primary scale-125 shadow-lg"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Revealed Photos Collage */}
        {isRevealed && (
          <div className="animate-scale-in">
            {/* Scattered Polaroid-style photos */}
            <div className="relative h-[500px] max-w-3xl mx-auto">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => handlePhotoClick(photo.id)}
                  className={`absolute bg-card p-3 pb-16 rounded-lg shadow-card hover:shadow-xl transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer group ${
                    index === 0
                      ? "top-0 left-[10%] -rotate-6 hover:rotate-0"
                      : index === 1
                      ? "top-[15%] right-[10%] rotate-3 hover:rotate-0"
                      : "bottom-[5%] left-[30%] -rotate-3 hover:rotate-0"
                  }`}
                  style={{ width: "220px" }}
                >
                  <div
                    className="aspect-square rounded flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: photo.placeholder }}
                  >
                    <div className="text-center p-4">
                      <span className="text-4xl mb-2 block">{photo.emoji}</span>
                      <Heart
                        className="w-12 h-12 text-primary/30 mx-auto animate-heart-beat"
                        fill="currentColor"
                      />
                      <p className="text-muted-foreground/70 text-xs mt-2">
                        Add your photo
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary animate-spin-slow" />
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="absolute bottom-4 left-3 right-3 text-center text-sm font-medium text-foreground/80">
                    {photo.caption}
                  </p>

                  {/* Decorative tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-accent/40 rotate-2" />
                </button>
              ))}

              {/* Floating decorations */}
              <span className="absolute top-[40%] left-[5%] text-3xl animate-float">💕</span>
              <span className="absolute top-[20%] right-[5%] text-3xl animate-float delay-300">✨</span>
              <span className="absolute bottom-[20%] right-[15%] text-2xl animate-float delay-500">🌟</span>
              <span className="absolute bottom-[30%] left-[5%] text-2xl animate-float delay-700">💝</span>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => triggerConfetti()}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
              >
                <PartyPopper className="w-5 h-5" />
                More Confetti!
              </button>
              <button
                onClick={resetBox}
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-full font-medium hover:scale-105 transition-transform shadow-card"
              >
                <Gift className="w-5 h-5" />
                Reset Box
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog for enlarged photo view */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-card to-secondary/20">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-display text-gradient flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Our Precious Memories!
              <Sparkles className="w-6 h-6 text-accent" />
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 p-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-card p-2 pb-8 rounded-lg shadow-card hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handlePhotoClick(photo.id)}
              >
                <div
                  className="aspect-square rounded flex items-center justify-center"
                  style={{ backgroundColor: photo.placeholder }}
                >
                  <div className="text-center">
                    <span className="text-3xl">{photo.emoji}</span>
                    <Heart
                      className="w-8 h-8 text-primary/30 mx-auto mt-2 animate-heart-beat"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <p className="text-center text-xs mt-2 text-muted-foreground">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Click any photo for extra sparkles! ✨
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhotoGallery;
