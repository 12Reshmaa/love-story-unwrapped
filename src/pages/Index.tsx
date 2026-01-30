import HeroSection from '@/components/HeroSection';
import IntroMessageSection from '@/components/IntroMessageSection';
import PhotoMemoriesSection from '@/components/PhotoMemoriesSection';
import MovieSection from '@/components/MovieSection';
import ScratchCardSection from '@/components/ScratchCardSection';
import LoveLetterSection from '@/components/LoveLetterSection';
import SignOffSection from '@/components/SignOffSection';

const Index = () => {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero - "This is for you" */}
      <HeroSection />
      
      {/* 2. Intro Message - Setting the tone */}
      <IntroMessageSection />
      
      {/* 3. Photo Memories - Scrapbook moment */}
      <PhotoMemoriesSection />
      
      {/* 4. Our Story as a Film - Playful emotional lift */}
      <MovieSection />
      
      {/* 5. Surprise Reveal - Scratch Card */}
      <ScratchCardSection />
      
      {/* 6. Love Letter - Emotional climax */}
      <LoveLetterSection />
      
      {/* 7. Sign-Off - Soft landing */}
      <SignOffSection />
    </main>
  );
};

export default Index;
