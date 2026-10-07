import React from 'react';
import { Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const HeaderProgress: React.FC = () => {
  const { currentScene, isMuted, toggleMute, nextScene } = useStory();

  // Hide in Scene 1 (Hook) and Scene 14 (Final Reveal) for cinematic immersion
  if (currentScene === 1 || currentScene === 14) {
    return null;
  }

  const getChapterInfo = () => {
    switch (currentScene) {
      case 2:
        return { num: '02', name: 'INCOMING TRANSMISSION' };
      case 3:
        return { num: '03', name: 'DO YOU REMEMBER?' };
      case 4:
        return { num: '04', name: 'THE BALLOON ROOM' };
      case 5:
        return { num: '05', name: 'OUR UNIVERSE' };
      case 6:
        return { num: '06', name: 'OUR STORY VAULT' };
      case 7:
        return { num: '07', name: 'POLAROID FLASHBACK' };
      case 8:
        return { num: '08', name: 'OUR SCIENTIFIC DATA' };
      case 9:
        return { num: '09', name: 'PRIVATE TRANSMISSION' };
      case 10:
        return { num: '10', name: 'HANDWRITTEN LETTER' };
      case 11:
        return { num: '11', name: 'MAKE A WISH' };
      case 12:
        return { num: '12', name: 'THINGS I WANT WITH YOU' };
      case 13:
        return { num: '13', name: 'THE LAST GIFT' };
      default:
        return { num: '•', name: 'OUR STORY' };
    }
  };

  const info = getChapterInfo();
  const progressPercent = Math.round(((currentScene - 1) / 13) * 100);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex flex-col bg-gradient-to-b from-black/85 via-black/50 to-transparent pointer-events-none max-w-lg mx-auto w-full px-4 pt-3 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/20 text-[10px] font-bold text-rose-300">
            {info.num}
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-rose-200/80">
            {info.name}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Subtle quick forward button ensuring user is NEVER stuck */}
          <button
            onClick={nextScene}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all backdrop-blur-md active:scale-95 text-[10px] tracking-wider font-semibold uppercase cursor-pointer"
            title="Move to next chapter"
          >
            <span>Next</span>
            <ChevronRight size={12} />
          </button>

          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all backdrop-blur-md active:scale-95 cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-rose-300" />}
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="mt-2 h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
