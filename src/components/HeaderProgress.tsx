import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const HeaderProgress: React.FC = () => {
  const { currentScene, isMuted, toggleMute } = useStory();

  // Hide in Scene 1 (Hook) and Scene 12 (Final Reveal) to keep pure cinematic immersion
  if (currentScene === 1 || currentScene === 12) {
    return null;
  }

  const getChapterName = () => {
    switch (currentScene) {
      case 2:
        return 'INCOMING TRANSMISSION';
      case 3:
        return 'MEMORY CHECK';
      case 4:
        return 'THE CLUES';
      case 5:
        return 'OUR UNIVERSE';
      case 6:
        return 'FLASHBACKS';
      case 7:
        return 'THE DATA';
      case 8:
        return 'PRIVATE TRANSMISSION';
      case 9:
        return 'THE WISH';
      case 10:
        return 'THE SURPRISE';
      case 11:
        return 'THE NEXT CHAPTER';
      default:
        return 'A MOMENT';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-rose-300/70">
          {getChapterName()}
        </span>
      </div>

      <div className="flex items-center pointer-events-auto">
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-md active:scale-95"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label="Toggle Audio"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-rose-300" />}
        </button>
      </div>
    </header>
  );
};
