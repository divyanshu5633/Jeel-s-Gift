import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StoryProvider, useStory } from './context/StoryContext';
import { ParticleBackground } from './components/ParticleBackground';
import { HeaderProgress } from './components/HeaderProgress';
import { MobileFrame } from './components/MobileFrame';

// V2 12-Scene Imports
import { Scene01TheHook } from './scenes/v2/Scene01TheHook';
import { Scene02SecretMessage } from './scenes/v2/Scene02SecretMessage';
import { Scene03MemoryGame } from './scenes/v2/Scene03MemoryGame';
import { Scene04BalloonChallenge } from './scenes/v2/Scene04BalloonChallenge';
import { Scene05OurUniverse } from './scenes/v2/Scene05OurUniverse';
import { Scene06PolaroidFlashback } from './scenes/v2/Scene06PolaroidFlashback';
import { Scene07Statistics } from './scenes/v2/Scene07Statistics';
import { Scene08VoiceMessage } from './scenes/v2/Scene08VoiceMessage';
import { Scene09LetterAndCandle } from './scenes/v2/Scene09LetterAndCandle';
import { Scene10TheLastGift } from './scenes/v2/Scene10TheLastGift';
import { Scene11NextChapter } from './scenes/v2/Scene11NextChapter';
import { Scene12FinalReveal } from './scenes/v2/Scene12FinalReveal';

const SceneRenderer: React.FC = () => {
  const { currentScene } = useStory();

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return <Scene01TheHook />;
      case 2:
        return <Scene02SecretMessage />;
      case 3:
        return <Scene03MemoryGame />;
      case 4:
        return <Scene04BalloonChallenge />;
      case 5:
        return <Scene05OurUniverse />;
      case 6:
        return <Scene06PolaroidFlashback />;
      case 7:
        return <Scene07Statistics />;
      case 8:
        return <Scene08VoiceMessage />;
      case 9:
        return <Scene09LetterAndCandle />;
      case 10:
        return <Scene10TheLastGift />;
      case 11:
        return <Scene11NextChapter />;
      case 12:
        return <Scene12FinalReveal />;
      default:
        return <Scene01TheHook />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScene}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
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
