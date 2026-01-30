import HeroSection from '@/components/HeroSection';
import IntroMessageSection from '@/components/IntroMessageSection';
import PhotoMemoriesSection from '@/components/PhotoMemoriesSection';
import MovieSection from '@/components/MovieSection';
import ScratchCardSection from '@/components/ScratchCardSection';
import LoveLetterSection from '@/components/LoveLetterSection';
import SignOffSection from '@/components/SignOffSection';
import ExtraSurprisesHeader from '@/components/ExtraSurprisesHeader';
import MysteryBoxSection from '@/components/MysteryBoxSection';
import MiniGameSection from '@/components/MiniGameSection';
import PlaylistPreviewSection from '@/components/PlaylistPreviewSection';
import TimeTogetherSection from '@/components/TimeTogetherSection';
import CountdownSection from '@/components/CountdownSection';

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

      {/* === Extra Interactive Add-ons === */}
      <ExtraSurprisesHeader />
      
      {/* 7. Mystery Box - Double-tap reveal */}
      <MysteryBoxSection />
      
      {/* 8. Mini Game - Fill the hearts */}
      <MiniGameSection />
      
      {/* 9. Playlist Preview - Our songs */}
      <PlaylistPreviewSection />
      
      {/* 10. Time Together Counter */}
      <TimeTogetherSection />
      
      {/* 11. Upcoming Moment Countdown */}
      <CountdownSection />
      
      {/* 12. Sign-Off - Soft landing */}
      <SignOffSection />
    </main>
  );
};

export default Index;
