import { useEffect } from 'react';
import { Hero } from './components/Hero';
import { BackgroundHearts } from './components/BackgroundHearts';
import { EnvelopeSection } from './components/EnvelopeSection';
import { AlbumSection } from './components/AlbumSection';
import { Timeline } from './components/Timeline';
import { ReasonsGrid } from './components/ReasonsGrid';
import { fireConfetti } from './utils/confetti';
import { DailyJudi } from './components/DailyJudi';
import { NightReflection } from './components/NightReflection';
import { MainCharacter } from './components/MainCharacter'; // 1. Import the new component
import { BirthdayCake } from './components/BirthdayCake';
import { MusicPlayer } from './components/MusicPlayer'; // Import it
import { Footer } from './components/Footer';
import { SlideshowSection } from './components/SlideshowSection';
import { SecretsJar } from './components/SecretsJar';
import { GravitySecret } from './components/GravitySecret';
import { ScratchReveal } from './components/ScratchReveal'; // Import it
import { MikesLetter } from './components/MikesLetter'; // Import it


function App() {
  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    /* Added overflow-x-hidden here to stop the side-wiggle */
    <main className="relative min-h-screen bg-white flex flex-col overflow-x-hidden">
      <MusicPlayer />
      <BackgroundHearts />

      <Hero />

      {/* Added w-full and overflow-hidden here as a secondary safety net */}
      <div className="relative z-20 flex flex-col w-full overflow-x-hidden">
        <EnvelopeSection />
        <Timeline />
        <AlbumSection />
        <DailyJudi />
        <MainCharacter />
        <BirthdayCake />
        <ReasonsGrid />
        <NightReflection />
        <SlideshowSection />
        <SecretsJar />
        <MikesLetter />
        <GravitySecret />
        <ScratchReveal />
        <Footer />
      </div>
    </main>
  );
}

export default App;