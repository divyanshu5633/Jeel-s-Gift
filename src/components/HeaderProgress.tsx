import React from 'react';
import { Volume2, VolumeX, ChevronLeft, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const HeaderProgress: React.FC = () => {
  const { currentScene, isMuted, toggleMute, prevScene, discoveredSecrets } = useStory();

  // Hide in intro preloader & clean emotional scenes
  if (currentScene === 0 || currentScene === 1 || currentScene === 24) {
    return null;
  }

  const getChapterName = () => {
    switch (currentScene) {
      case 2:
        return 'PROLOGUE';
      case 3:
        return 'INCOMING MESSAGE';
      case 4:
      case 5:
        return 'MISSION 01';
      case 6:
        return 'MISSION 02';
      case 7:
        return 'CHAPTER 01 · BALLOON ROOM';
      case 8:
      case 9:
        return 'CHAPTER 02 · OUR UNIVERSE';
      case 10:
        return 'CHAPTER 03 · POLAROIDS';
      case 11:
        return 'OUR STATISTICS';
      case 12:
      case 13:
        return 'PRIVATE TRANSMISSION';
      case 14:
      case 15:
        return 'HANDWRITTEN LETTER';
      case 16:
        return `SECRET VAULT · ${discoveredSecrets.length}/3 FOUND`;
      case 17:
      case 18:
        return 'THE CANDLE WISH';
      case 19:
      case 20:
      case 21:
        return 'THE REVEAL';
      case 22:
      case 23:
        return 'THE NEXT CHAPTER';
      case 25:
        return 'SPECIAL CHAPTER';
      case 26:
        return 'OUR STORY VAULT';
      default:
        return 'JOURNEY';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-xs max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2">
        {currentScene > 2 && currentScene !== 20 && currentScene !== 24 && (
          <button
            onClick={prevScene}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-md active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-rose-300/80">
          <Sparkles size={11} className="text-rose-400 animate-pulse" />
          <span>{getChapterName()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-md active:scale-95"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label="Toggle Audio"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-rose-300" />}
        </button>
      </div>
    </header>
  );
};
