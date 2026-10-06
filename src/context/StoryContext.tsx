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

  // Scene state
  poppedBalloons: string[];
  popBalloon: (id: string) => void;

  visitedStars: string[];
  visitStar: (id: string) => void;

  polaroidIdx: number;
  setPolaroidIdx: (idx: number) => void;

  isPrivateUnlocked: boolean;
  setPrivateUnlocked: (unlocked: boolean) => void;

  voicePlaying: boolean;
  voiceProgress: number;
  toggleVoicePlay: () => void;

  candleExtinguished: boolean;
  extinguishCandle: () => void;

  giftOpened: boolean;
  openGift: () => void;
}

const StoryContext = createContext<StoryContextType | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [poppedBalloons, setPoppedBalloons] = useState<string[]>([]);
  const [visitedStars, setVisitedStars] = useState<string[]>([]);
  const [polaroidIdx, setPolaroidIdx] = useState<number>(0);
  const [isPrivateUnlocked, setPrivateUnlocked] = useState<boolean>(false);
  const [voicePlaying, setVoicePlaying] = useState<boolean>(false);
  const [voiceProgress, setVoiceProgress] = useState<number>(0);
  const [candleExtinguished, setCandleExtinguished] = useState<boolean>(false);
  const [giftOpened, setGiftOpened] = useState<boolean>(false);

  const stopVoiceRef = useRef<(() => void) | null>(null);

  // Audio atmosphere changes
  useEffect(() => {
    if (currentScene >= 1 && currentScene < 10) {
      sounds.startAmbientMusic('calm');
    } else if (currentScene >= 10) {
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
    setCurrentScene(Math.max(1, Math.min(12, scene)));
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
    setGiftOpened(false);
    setCurrentScene(1);
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

  const openGift = () => {
    sounds.playUnlock();
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
        polaroidIdx,
        setPolaroidIdx,
        isPrivateUnlocked,
        setPrivateUnlocked,
        voicePlaying,
        voiceProgress,
        toggleVoicePlay,
        candleExtinguished,
        extinguishCandle,
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
