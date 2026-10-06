import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  RotateCcw,
  Sparkles,
  Check,
  Play,
  Pause,
} from 'lucide-react';
import { useStory } from '../context/StoryContext';

export const Scene26OurStoryVault: React.FC = () => {
  const {
    config,
    restartExperience,
    voicePlaying,
    voiceProgress,
    toggleVoicePlay,
    checkedBucketItems,
    toggleBucketItem,
  } = useStory();

  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery' | 'bucket' | 'letter'>('timeline');

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#07050d] text-white p-4 sm:p-6 pb-20 select-none overflow-y-auto">
      {/* Vault Header */}
      <div className="pt-6 pb-4 text-center max-w-sm mx-auto w-full">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-xs text-rose-300 font-semibold mb-2">
          <Sparkles size={12} />
          <span>PERMANENT ARCHIVE</span>
        </div>
        <h1 className="font-cinzel text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300">
          OUR STORY VAULT
        </h1>
        <p className="mt-1 text-xs text-neutral-400 italic">
          {config.recipient} & {config.sender} • Since {config.relationshipStart}
        </p>
      </div>

      {/* Mini Voice Note Widget */}
      <div className="my-3 w-full max-w-sm mx-auto rounded-2xl bg-[#151122] border border-rose-500/20 p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleVoicePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow active:scale-95 transition-transform"
          >
            {voicePlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          <div>
            <h4 className="text-xs font-semibold text-white">Voice Note from {config.sender}</h4>
            <p className="text-[10px] text-neutral-400">
              {voicePlaying ? `Playing... ${Math.floor(voiceProgress * 100)}%` : `${config.voiceMessage.durationSeconds}s audio memo`}
            </p>
          </div>
        </div>
        <Volume2 size={16} className={`text-rose-400 ${voicePlaying ? 'animate-pulse' : ''}`} />
      </div>

      {/* Vault Navigation Tabs */}
      <div className="my-3 flex w-full max-w-sm mx-auto items-center justify-between rounded-xl bg-white/5 border border-white/10 p-1 text-[11px] font-semibold">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 rounded-lg py-2 transition-all ${
            activeTab === 'timeline' ? 'bg-rose-500 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex-1 rounded-lg py-2 transition-all ${
            activeTab === 'gallery' ? 'bg-rose-500 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Gallery
        </button>
        <button
          onClick={() => setActiveTab('bucket')}
          className={`flex-1 rounded-lg py-2 transition-all ${
            activeTab === 'bucket' ? 'bg-rose-500 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Bucket List
        </button>
        <button
          onClick={() => setActiveTab('letter')}
          className={`flex-1 rounded-lg py-2 transition-all ${
            activeTab === 'letter' ? 'bg-rose-500 text-white shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Letter
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 w-full max-w-sm mx-auto mt-2">
        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {config.timeline.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl bg-[#141021] border border-white/8 p-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 tracking-wider">
                    {item.year}
                  </span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="mt-1 font-cinzel text-base font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-neutral-300 italic">"{item.description}"</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 gap-3">
            {config.polaroids.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl bg-white p-2.5 pb-3 text-neutral-900 shadow-md border border-neutral-100"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-900">
                  <img src={photo.image} alt={photo.title} className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 text-[10px] font-bold text-rose-600 uppercase tracking-wider text-center">
                  {photo.date}
                </p>
                <p className="text-xs font-semibold text-neutral-900 text-center truncate">
                  {photo.title}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bucket List Tab */}
        {activeTab === 'bucket' && (
          <div className="space-y-2">
            {config.bucketList.map((item) => {
              const isChecked = checkedBucketItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleBucketItem(item.id)}
                  className={`flex items-center gap-3 rounded-xl p-3 border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-[#141021] border-white/8 text-neutral-300'
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                      isChecked ? 'bg-rose-500 border-rose-400 text-white' : 'border-white/20'
                    }`}
                  >
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className={`text-xs ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Letter Tab */}
        {activeTab === 'letter' && (
          <div className="rounded-2xl paper-texture p-6 text-neutral-900 shadow-lg border border-[#e8dac1]">
            <p className="font-handwriting text-2xl font-bold mb-3">{config.letter.greeting}</p>
            <div className="space-y-2 font-handwriting text-xl text-neutral-800 leading-relaxed">
              {config.letter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-4 text-right font-handwriting text-2xl font-bold text-rose-700">
              <p>{config.letter.closing}</p>
              <p className="text-3xl text-rose-600 mt-1">{config.letter.signature}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Replay Action */}
      <div className="mt-8 max-w-xs mx-auto w-full">
        <button
          onClick={restartExperience}
          className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          <span>REPLAY EXPERIENCE</span>
        </button>
      </div>
    </div>
  );
};
