import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StoryProvider, useStory } from './context/StoryContext';
import { ParticleBackground } from './components/ParticleBackground';
import { HeaderProgress } from './components/HeaderProgress';
import { MobileFrame } from './components/MobileFrame';

// V3 14-Chapter Imports
import { Scene01TheHook } from './scenes/v3/Scene01TheHook';
import { Scene02WhatsAppChat } from './scenes/v3/Scene02WhatsAppChat';
import { Scene03MemoryGame } from './scenes/v3/Scene03MemoryGame';
import { Scene04BalloonRoom } from './scenes/v3/Scene04BalloonRoom';
import { Scene05OurUniverse } from './scenes/v3/Scene05OurUniverse';
import { Scene06OurStoryVault } from './scenes/v3/Scene06OurStoryVault';
import { Scene07PolaroidFlashback } from './scenes/v3/Scene07PolaroidFlashback';
import { Scene08Statistics } from './scenes/v3/Scene08Statistics';
import { Scene09VoiceMessage } from './scenes/v3/Scene09VoiceMessage';
import { Scene10HandwrittenLetter } from './scenes/v3/Scene10HandwrittenLetter';
import { Scene11TheCandle } from './scenes/v3/Scene11TheCandle';
import { Scene12Promises } from './scenes/v3/Scene12Promises';
import { Scene13TheLastGift } from './scenes/v3/Scene13TheLastGift';
import { Scene14FinalReveal } from './scenes/v3/Scene14FinalReveal';

const SceneRenderer: React.FC = () => {
  const { currentScene } = useStory();

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return <Scene01TheHook />;
      case 2:
        return <Scene02WhatsAppChat />;
      case 3:
        return <Scene03MemoryGame />;
      case 4:
        return <Scene04BalloonRoom />;
      case 5:
        return <Scene05OurUniverse />;
      case 6:
        return <Scene06OurStoryVault />;
      case 7:
        return <Scene07PolaroidFlashback />;
      case 8:
        return <Scene08Statistics />;
      case 9:
        return <Scene09VoiceMessage />;
      case 10:
        return <Scene10HandwrittenLetter />;
      case 11:
        return <Scene11TheCandle />;
      case 12:
        return <Scene12Promises />;
      case 13:
        return <Scene13TheLastGift />;
      case 14:
        return <Scene14FinalReveal />;
      default:
        return <Scene01TheHook />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScene}
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.015 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
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
