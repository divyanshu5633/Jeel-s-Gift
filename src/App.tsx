import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StoryProvider, useStory } from './context/StoryContext';
import { ParticleBackground } from './components/ParticleBackground';
import { HeaderProgress } from './components/HeaderProgress';
import { MobileFrame } from './components/MobileFrame';

// Scene Imports
import { Scene00Preloader } from './scenes/Scene00Preloader';
import { Scene01PersonalAccess } from './scenes/Scene01PersonalAccess';
import { Scene02TheWarning } from './scenes/Scene02TheWarning';
import { Scene03WhatsAppChat } from './scenes/Scene03WhatsAppChat';
import { Scene04TheMission } from './scenes/Scene04TheMission';
import { Scene05MemoryQuestion1 } from './scenes/Scene05MemoryQuestion1';
import { Scene06MemoryQuestion2 } from './scenes/Scene06MemoryQuestion2';
import { Scene07BalloonRoom } from './scenes/Scene07BalloonRoom';
import { Scene08OurUniverse } from './scenes/Scene08OurUniverse';
import { Scene09MemoryCard } from './scenes/Scene09MemoryCard';
import { Scene10PolaroidStack } from './scenes/Scene10PolaroidStack';
import { Scene11Statistics } from './scenes/Scene11Statistics';
import { Scene12PrivateMessage } from './scenes/Scene12PrivateMessage';
import { Scene13VoiceMessage } from './scenes/Scene13VoiceMessage';
import { Scene14TheLetter } from './scenes/Scene14TheLetter';
import { Scene15HandwrittenLetter } from './scenes/Scene15HandwrittenLetter';
import { Scene16SecretDiscovery } from './scenes/Scene16SecretDiscovery';
import { Scene17TheCandle } from './scenes/Scene17TheCandle';
import { Scene18TheWish } from './scenes/Scene18TheWish';
import { Scene19TheGift } from './scenes/Scene19TheGift';
import { Scene20TheMisdirection } from './scenes/Scene20TheMisdirection';
import { Scene21TheStoryReveal } from './scenes/Scene21TheStoryReveal';
import { Scene22TheNextChapter } from './scenes/Scene22TheNextChapter';
import { Scene23FutureBucketList } from './scenes/Scene23FutureBucketList';
import { Scene24FinalMessage } from './scenes/Scene24FinalMessage';
import { Scene25FinalPhoto } from './scenes/Scene25FinalPhoto';
import { Scene26OurStoryVault } from './scenes/Scene26OurStoryVault';

const SceneRenderer: React.FC = () => {
  const { currentScene } = useStory();

  const renderScene = () => {
    switch (currentScene) {
      case 0:
        return <Scene00Preloader />;
      case 1:
        return <Scene01PersonalAccess />;
      case 2:
        return <Scene02TheWarning />;
      case 3:
        return <Scene03WhatsAppChat />;
      case 4:
        return <Scene04TheMission />;
      case 5:
        return <Scene05MemoryQuestion1 />;
      case 6:
        return <Scene06MemoryQuestion2 />;
      case 7:
        return <Scene07BalloonRoom />;
      case 8:
        return <Scene08OurUniverse />;
      case 9:
        return <Scene09MemoryCard />;
      case 10:
        return <Scene10PolaroidStack />;
      case 11:
        return <Scene11Statistics />;
      case 12:
        return <Scene12PrivateMessage />;
      case 13:
        return <Scene13VoiceMessage />;
      case 14:
        return <Scene14TheLetter />;
      case 15:
        return <Scene15HandwrittenLetter />;
      case 16:
        return <Scene16SecretDiscovery />;
      case 17:
        return <Scene17TheCandle />;
      case 18:
        return <Scene18TheWish />;
      case 19:
        return <Scene19TheGift />;
      case 20:
        return <Scene20TheMisdirection />;
      case 21:
        return <Scene21TheStoryReveal />;
      case 22:
        return <Scene22TheNextChapter />;
      case 23:
        return <Scene23FutureBucketList />;
      case 24:
        return <Scene24FinalMessage />;
      case 25:
        return <Scene25FinalPhoto />;
      case 26:
        return <Scene26OurStoryVault />;
      default:
        return <Scene01PersonalAccess />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScene}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="w-full flex-1 flex flex-col"
      >
        {renderScene()}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <StoryProvider>
      <ParticleBackground />
      <MobileFrame>
        <HeaderProgress />
        <SceneRenderer />
      </MobileFrame>
    </StoryProvider>
  );
}
