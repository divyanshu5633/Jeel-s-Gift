import React, { createContext, useContext, useState, useEffect } from 'react';
import { storyConfig } from '../config/storyConfig';
import { sounds } from '../utils/soundEffects';

interface StoryContextType {
  currentScene: number;
  config: typeof storyConfig;
  isMuted: boolean;
  toggleMute: () => void;
  goToScene: (scene: number) => void;
  nextScene: () => void;
  prevScene: () => void;
  restartExperience: () => void;
  
  // Scene-specific states
  poppedBalloons: string[];
  popBalloon: (id: string) => void;
  
  discoveredStars: string[];
  discoverStar: (id: string) => void;
  activeStarId: string | null;
  setActiveStarId: (id: string | null) => void;
  
  currentPolaroidIdx: number;
  setCurrentPolaroidIdx: (idx: number) => void;
  
  isPrivateUnlocked: boolean;
  setPrivateUnlocked: (unlocked: boolean) => void;
  
  voicePlaying: boolean;
  voiceProgress: number;
  toggleVoicePlay: () => void;
  
  discoveredSecrets: string[];
  discoverSecret: (id: string) => void;
  
  candleExtinguished: boolean;
  extinguishCandle: () => void;
  
  giftOpened: boolean;
  openGift: () => void;
  
  checkedBucketItems: string[];
  toggleBucketItem: (id: string) => void;
}

const StoryContext = createContext<StoryContextType | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  const [poppedBalloons, setPoppedBalloons] = useState<string[]>([]);
  const [discoveredStars, setDiscoveredStars] = useState<string[]>([]);
  const [activeStarId, setActiveStarId] = useState<string | null>(null);
  const [currentPolaroidIdx, setCurrentPolaroidIdx] = useState<number>(0);
  const [isPrivateUnlocked, setPrivateUnlocked] = useState<boolean>(false);
  const [voicePlaying, setVoicePlaying] = useState<boolean>(false);
  const [voiceProgress, setVoiceProgress] = useState<number>(0);
  const [discoveredSecrets, setDiscoveredSecrets] = useState<string[]>([]);
  const [candleExtinguished, setCandleExtinguished] = useState<boolean>(false);
  const [giftOpened, setGiftOpened] = useState<boolean>(false);
  const [checkedBucketItems, setCheckedBucketItems] = useState<string[]>([]);

  // Cleanup function for voice audio
  const stopVoiceRef = React.useRef<(() => void) | null>(null);

  // Auto transition from scene 0 to 1 after preloader
  useEffect(() => {
    if (currentScene === 0) {
      const timer = setTimeout(() => {
        setCurrentScene(1);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [currentScene]);

  // Audio atmosphere changes
  useEffect(() => {
    // Start ambient music from Scene 02 onwards
    if (currentScene >= 2 && currentScene < 20) {
      sounds.startAmbientMusic('calm');
    } else if (currentScene >= 20) {
      // Brighter cinematic atmosphere for reveals
      sounds.startAmbientMusic('reveal');
    }
  }, [currentScene]);

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const goToScene = (scene: number) => {
    sounds.playTap();
    // Stop voice if changing scene
    if (stopVoiceRef.current) {
      stopVoiceRef.current();
      setVoicePlaying(false);
    }
    setCurrentScene(scene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextScene = () => {
    goToScene(Math.min(26, currentScene + 1));
  };

  const prevScene = () => {
    goToScene(Math.max(0, currentScene - 1));
  };

  const restartExperience = () => {
    sounds.playTap();
    if (stopVoiceRef.current) {
      stopVoiceRef.current();
    }
    setVoicePlaying(false);
    setVoiceProgress(0);
    setPoppedBalloons([]);
    setDiscoveredStars([]);
    setActiveStarId(null);
    setCurrentPolaroidIdx(0);
    setPrivateUnlocked(false);
    setDiscoveredSecrets([]);
    setCandleExtinguished(false);
    setGiftOpened(false);
    setCheckedBucketItems([]);
    setCurrentScene(1); // Return to Scene 01 with faster transition as per spec
  };

  const popBalloon = (id: string) => {
    if (!poppedBalloons.includes(id)) {
      sounds.playPop();
      setPoppedBalloons((prev) => [...prev, id]);
    }
  };

  const discoverStar = (id: string) => {
    sounds.playStarChime();
    setActiveStarId(id);
    if (!discoveredStars.includes(id)) {
      setDiscoveredStars((prev) => [...prev, id]);
    }
  };

  const toggleVoicePlay = () => {
    if (voicePlaying) {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
        stopVoiceRef.current = null;
      }
      setVoicePlaying(false);
    } else {
      sounds.playTap();
      setVoicePlaying(true);
      stopVoiceRef.current = sounds.playVoiceAudio(
        storyConfig.voiceMessage.durationSeconds,
        (prog) => setVoiceProgress(prog),
        () => {
          setVoicePlaying(false);
          setVoiceProgress(1);
          stopVoiceRef.current = null;
        }
      );
    }
  };

  const discoverSecret = (id: string) => {
    if (!discoveredSecrets.includes(id)) {
      sounds.playCelebration();
      setDiscoveredSecrets((prev) => [...prev, id]);
    }
  };

  const extinguishCandle = () => {
    if (!candleExtinguished) {
      sounds.playExtinguish();
      setCandleExtinguished(true);
    }
  };

  const openGift = () => {
    sounds.playUnlock();
    setGiftOpened(true);
  };

  const toggleBucketItem = (id: string) => {
    sounds.playTap();
    setCheckedBucketItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <StoryContext.Provider
      value={{
        currentScene,
        config: storyConfig,
        isMuted,
        toggleMute,
        goToScene,
        nextScene,
        prevScene,
        restartExperience,
        poppedBalloons,
        popBalloon,
        discoveredStars,
        discoverStar,
        activeStarId,
        setActiveStarId,
        currentPolaroidIdx,
        setCurrentPolaroidIdx,
        isPrivateUnlocked,
        setPrivateUnlocked,
        voicePlaying,
        voiceProgress,
        toggleVoicePlay,
        discoveredSecrets,
        discoverSecret,
        candleExtinguished,
        extinguishCandle,
        giftOpened,
        openGift,
        checkedBucketItems,
        toggleBucketItem,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
