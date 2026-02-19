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

function App() {
  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <main className="relative min-h-screen bg-white flex flex-col">
      <MusicPlayer /> {/* Add it here */}
      <BackgroundHearts />

      <Hero />

      <div className="relative z-20 flex flex-col">
        <EnvelopeSection />

        <Timeline />

        <AlbumSection />

        <DailyJudi />

        {/* 2. Place it here to break up the vertical flow with horizontal motion */}
        <MainCharacter />
        <BirthdayCake />
        <ReasonsGrid />

        <NightReflection />
        <SlideshowSection /> {/* Place it here */}
        <SecretsJar />
        <GravitySecret />
        <Footer />
      </div>

    </main>
  );
}

export default App;