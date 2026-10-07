import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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

  // Scene 04 Balloon Room
  poppedBalloons: string[];
  popBalloon: (id: string) => void;

  // Scene 05 Our Universe
  visitedStars: string[];
  visitStar: (id: string) => void;

  // Scene 06 Story Vault
  unlockedVaultItems: string[];
  unlockVaultItem: (id: string) => void;

  // Scene 07 Polaroid Flashback
  polaroidIdx: number;
  setPolaroidIdx: (idx: number) => void;

  // Scene 09 Voice Message
  isPrivateUnlocked: boolean;
  setPrivateUnlocked: (unlocked: boolean) => void;
  voicePlaying: boolean;
  voiceProgress: number;
  toggleVoicePlay: () => void;

  // Scene 11 Candle
  candleExtinguished: boolean;
  extinguishCandle: () => void;

  // Scene 12 Promises
  checkedPromises: string[];
  togglePromise: (id: string) => void;

  // Scene 13 Gift
  giftOpened: boolean;
  openGift: () => void;
}

const StoryContext = createContext<StoryContextType | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Scene State tracking
  const [poppedBalloons, setPoppedBalloons] = useState<string[]>([]);
  const [visitedStars, setVisitedStars] = useState<string[]>([]);
  const [unlockedVaultItems, setUnlockedVaultItems] = useState<string[]>([
    'vault-1',
    'vault-2',
    'vault-3',
    'vault-4',
    'vault-5',
    'vault-6',
  ]);
  const [polaroidIdx, setPolaroidIdx] = useState<number>(0);
  const [isPrivateUnlocked, setPrivateUnlocked] = useState<boolean>(false);
  const [voicePlaying, setVoicePlaying] = useState<boolean>(false);
  const [voiceProgress, setVoiceProgress] = useState<number>(0);
  const [candleExtinguished, setCandleExtinguished] = useState<boolean>(false);
  const [checkedPromises, setCheckedPromises] = useState<string[]>([]);
  const [giftOpened, setGiftOpened] = useState<boolean>(false);

  const stopVoiceRef = useRef<(() => void) | null>(null);

  // Ambient soundscape handling based on emotional progression
  useEffect(() => {
    if (currentScene >= 2 && currentScene < 13) {
      sounds.startAmbientMusic('calm');
    } else if (currentScene >= 13) {
      sounds.startAmbientMusic('reveal');
    }
  }, [currentScene]);

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const goToScene = (scene: number) => {
    sounds.playTap();
    if (stopVoiceRef.current) {
      stopVoiceRef.current();
      setVoicePlaying(false);
    }
    const targetScene = Math.max(1, Math.min(14, scene));
    setCurrentScene(targetScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextScene = () => {
    goToScene(currentScene + 1);
  };

  const prevScene = () => {
    goToScene(currentScene - 1);
  };

  const restartExperience = () => {
    sounds.playTap();
    if (stopVoiceRef.current) {
      stopVoiceRef.current();
    }
    setVoicePlaying(false);
    setVoiceProgress(0);
    setPoppedBalloons([]);
    setVisitedStars([]);
    setPolaroidIdx(0);
    setPrivateUnlocked(false);
    setCandleExtinguished(false);
    setCheckedPromises([]);
    setGiftOpened(false);
    setCurrentScene(1);

    if (window.location.search || window.location.hash || window.location.pathname !== '/') {
      window.history.replaceState({}, '', '/');
    }
  };

  const popBalloon = (id: string) => {
    if (!poppedBalloons.includes(id)) {
      sounds.playPop();
      setPoppedBalloons((prev) => [...prev, id]);
    }
  };

  const visitStar = (id: string) => {
    sounds.playStarChime();
    if (!visitedStars.includes(id)) {
      setVisitedStars((prev) => [...prev, id]);
    }
  };

  const unlockVaultItem = (id: string) => {
    sounds.playUnlock();
    if (!unlockedVaultItems.includes(id)) {
      setUnlockedVaultItems((prev) => [...prev, id]);
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

  const extinguishCandle = () => {
    if (!candleExtinguished) {
      sounds.playExtinguish();
      setCandleExtinguished(true);
    }
  };

  const togglePromise = (id: string) => {
    sounds.playTap();
    setCheckedPromises((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const openGift = () => {
    sounds.playRibbonOpen();
    setGiftOpened(true);
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
        visitedStars,
        visitStar,
        unlockedVaultItems,
        unlockVaultItem,
        polaroidIdx,
        setPolaroidIdx,
        isPrivateUnlocked,
        setPrivateUnlocked,
        voicePlaying,
        voiceProgress,
        toggleVoicePlay,
        candleExtinguished,
        extinguishCandle,
        checkedPromises,
        togglePromise,
        giftOpened,
        openGift,
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
