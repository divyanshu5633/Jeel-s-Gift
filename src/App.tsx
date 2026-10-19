import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StoryProvider, useStory } from './context/StoryContext';
import { ParticleBackground } from './components/ParticleBackground';
import { HeaderProgress } from './components/HeaderProgress';
import { MobileFrame } from './components/MobileFrame';

// Chapters 01 & 02 are statically imported to ensure instant initial render and zero wait on Start
import { Scene01TheHook } from './scenes/v3/Scene01TheHook';
import { Scene02WhatsAppChat } from './scenes/v3/Scene02WhatsAppChat';

// Chapters 03 to 14 are lazily loaded to keep the initial JavaScript bundle tiny
const sceneLoaders: Record<number, () => Promise<{ default: React.ComponentType }>> = {
  3: () => import('./scenes/v3/Scene03MemoryGame').then((m) => ({ default: m.Scene03MemoryGame })),
  4: () => import('./scenes/v3/Scene04BalloonRoom').then((m) => ({ default: m.Scene04BalloonRoom })),
  5: () => import('./scenes/v3/Scene05OurUniverse').then((m) => ({ default: m.Scene05OurUniverse })),
  6: () => import('./scenes/v3/Scene06OurStoryVault').then((m) => ({ default: m.Scene06OurStoryVault })),
  7: () => import('./scenes/v3/Scene07PolaroidFlashback').then((m) => ({ default: m.Scene07PolaroidFlashback })),
  8: () => import('./scenes/v3/Scene08Statistics').then((m) => ({ default: m.Scene08Statistics })),
  9: () => import('./scenes/v3/Scene09VoiceMessage').then((m) => ({ default: m.Scene09VoiceMessage })),
  10: () => import('./scenes/v3/Scene10HandwrittenLetter').then((m) => ({ default: m.Scene10HandwrittenLetter })),
  11: () => import('./scenes/v3/Scene11TheCandle').then((m) => ({ default: m.Scene11TheCandle })),
  12: () => import('./scenes/v3/Scene12Promises').then((m) => ({ default: m.Scene12Promises })),
  13: () => import('./scenes/v3/Scene13FinalReveal').then((m) => ({ default: m.Scene13FinalReveal })),
  14: () => import('./scenes/v3/Scene14TheThirdMystery').then((m) => ({ default: m.Scene14TheThirdMystery })),
};

const Scene03MemoryGame = React.lazy(sceneLoaders[3]);
const Scene04BalloonRoom = React.lazy(sceneLoaders[4]);
const Scene05OurUniverse = React.lazy(sceneLoaders[5]);
const Scene06OurStoryVault = React.lazy(sceneLoaders[6]);
const Scene07PolaroidFlashback = React.lazy(sceneLoaders[7]);
const Scene08Statistics = React.lazy(sceneLoaders[8]);
const Scene09VoiceMessage = React.lazy(sceneLoaders[9]);
const Scene10HandwrittenLetter = React.lazy(sceneLoaders[10]);
const Scene11TheCandle = React.lazy(sceneLoaders[11]);
const Scene12Promises = React.lazy(sceneLoaders[12]);
const Scene13FinalReveal = React.lazy(sceneLoaders[13]);
const Scene14TheThirdMystery = React.lazy(sceneLoaders[14]);

const SceneRenderer: React.FC = () => {
  const { currentScene } = useStory();

  // Intelligent prefetching: prefetch the next upcoming scene in idle network time
  React.useEffect(() => {
    const nextChapter = currentScene + 1;
    if (sceneLoaders[nextChapter]) {
      sceneLoaders[nextChapter]();
    }
  }, [currentScene]);

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
        return <Scene13FinalReveal />;
      case 14:
        return <Scene14TheThirdMystery />;
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
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="w-full flex-1 flex flex-col"
      >
        <React.Suspense fallback={<div className="w-full flex-1 min-h-dvh bg-black" />}>
          {renderScene()}
        </React.Suspense>
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
