import type { StoryConfigV2 } from '../types';

export const storyConfig: StoryConfigV2 = {
  recipient: 'Aanya',
  sender: 'Arjun',
  relationshipStart: '14 February 2025',

  // Scene 01: The Hook
  hook: {
    heading: 'A LITTLE SOMETHING FOR YOU.',
    subheading: 'But you have to play along.',
    headphonesHint: 'Put your headphones on.',
    buttonText: 'START',
  },

  // Scene 02: The Secret Message
  chat: {
    senderName: 'Arjun',
    messages: [
      'Hey.',
      'I made something for you.',
      "But there's a problem.",
      'You have to prove you remember us. 😂',
      'Ready?',
    ],
    buttonText: 'PROVE IT ❤️',
  },

  // Scene 03: Quick Memory Game (2 questions only)
  questions: {
    q1: {
      question: 'Where did our story begin?',
      options: [
        { id: 'q1_a', key: 'A', text: 'The Café', isCorrect: false },
        { id: 'q1_b', key: 'B', text: 'The College', isCorrect: true },
        { id: 'q1_c', key: 'C', text: 'The Park', isCorrect: false },
        { id: 'q1_d', key: 'D', text: 'Somewhere unexpected', isCorrect: false },
      ],
      correctFeedback: 'You remembered. ❤️',
      wrongFeedback: 'Nope 😂 Try again.',
    },
    q2: {
      question: 'Who fell first?',
      options: [
        { id: 'q2_a', key: 'A', text: 'Me', isCorrect: false },
        { id: 'q2_b', key: 'B', text: 'You', isCorrect: false },
        { id: 'q2_c', key: 'C', text: "We're still investigating", isCorrect: false },
        { id: 'q2_d', key: 'D', text: 'Obviously both', isCorrect: true },
      ],
      feedback: "Okay... I'll give you that one.",
    },
  },

  // Scene 04: Balloon Challenge
  balloons: [
    {
      id: 'b1',
      color: '#f43f5e',
      highlight: '#fda4af',
      category: 'A DATE',
      content: '14.02.2025',
    },
    {
      id: 'b2',
      color: '#8b5cf6',
      highlight: '#c4b5fd',
      category: 'A MEMORY',
      content: 'Our first adventure.',
    },
    {
      id: 'b3',
      color: '#ec4899',
      highlight: '#fbcfe8',
      category: 'A SECRET',
      content: 'I was nervous too.',
    },
    {
      id: 'b4',
      color: '#eab308',
      highlight: '#fef08a',
      category: 'A CLUE',
      content: 'Look up.',
    },
  ],

  // Scene 05: Our Universe (6 stars only)
  stars: [
    {
      id: 'star-1',
      label: 'The Beginning',
      date: '14 FEB 2025',
      caption: 'The moment two different paths crossed and immediately felt familiar.',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      x: 22,
      y: 28,
      color: '#fb7185',
    },
    {
      id: 'star-2',
      label: 'First Adventure',
      date: '23 MAY 2025',
      caption: "I didn't know this ordinary day would become one of my favourites.",
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      x: 76,
      y: 24,
      color: '#c084fc',
    },
    {
      id: 'star-3',
      label: 'That Ridiculous Day',
      date: '17 JUL 2025',
      caption: 'When nothing went to plan, but laughing with you made it unforgettable.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      x: 32,
      y: 52,
      color: '#38bdf8',
    },
    {
      id: 'star-4',
      label: 'My Favourite',
      date: '02 SEP 2025',
      caption: 'You laughing out loud with no filter—my favourite view in the world.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      x: 78,
      y: 62,
      color: '#facc15',
    },
    {
      id: 'star-5',
      label: 'The Moment',
      date: '18 NOV 2025',
      caption: 'A quiet evening where I suddenly realized you had become home to me.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      x: 20,
      y: 78,
      color: '#f43f5e',
    },
    {
      id: 'star-6',
      label: 'One I Never Want To Forget',
      date: '31 DEC 2025',
      caption: 'Watching the midnight sky together, whispering hopes for tomorrow.',
      image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
      x: 64,
      y: 82,
      color: '#a855f7',
    },
  ],

  // Scene 06: Polaroid Flashback (Stack of 3)
  polaroids: [
    {
      id: 'pol-1',
      memoryNumber: 'MEMORY 01',
      date: '23 MAY 2025',
      caption: 'We had absolutely no idea what we were doing. 😂',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      rotation: -3,
    },
    {
      id: 'pol-2',
      memoryNumber: 'MEMORY 02',
      date: '17 JULY 2025',
      caption: "One of those days I'd replay if I could.",
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      rotation: 2,
    },
    {
      id: 'pol-3',
      memoryNumber: 'MEMORY 03',
      date: '02 SEPTEMBER 2025',
      caption: 'One of my favourite photographs of us.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      rotation: -4,
    },
  ],

  // Scene 07: Relationship Statistics (4 fast counters)
  statistics: [
    {
      id: 's1',
      label: 'conversations',
      value: 1284,
      color: '#38bdf8',
    },
    {
      id: 's2',
      label: 'unnecessary arguments',
      value: 327,
      color: '#f97316',
    },
    {
      id: 's3',
      label: 'times someone said "I\'m not hungry" and stole food',
      value: 91,
      color: '#a855f7',
    },
    {
      id: 's4',
      label: "times I'd choose you again",
      value: '∞',
      color: '#f43f5e',
    },
  ],

  // Scene 08: Private Voice Message
  voiceMessage: {
    senderName: 'Arjun',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    durationSeconds: 26,
    waveformBars: [
      25, 45, 70, 55, 90, 100, 75, 60, 85, 95, 70, 50, 80, 95, 60, 40, 70, 90, 55, 95,
      80, 50, 85, 65, 45, 60, 90, 75, 95, 55, 40, 70, 85, 60, 100, 85, 45, 30
    ],
    transcript: '“Hey Aanya... hearing your voice always resets my whole day. I just wanted to leave this small reminder of how much you mean to me...”',
  },

  // Scene 09: Letter + Candle Combined
  letterAndCandle: {
    letterPrompt: 'ONE THING I NEVER SAY ENOUGH',
    greeting: 'Dear Aanya,',
    body: [
      'Somewhere between the conversations, the stupid jokes and all those ordinary days...',
      'you became one of the best parts of my life.',
    ],
    signature: '— Arjun',
    candlePrompt: 'Now make a wish.',
    wishThoughts: [
      'I already made mine.',
      'More days like these.',
      'More us.',
    ],
  },

  // Scene 10: The Last Gift
  gift: {
    heading: 'ONE LAST THING...',
    buttonText: 'OPEN',
    misdirectionLines: [
      'You thought that was the surprise.',
      "It isn't.",
    ],
  },

  // Scene 11: The Next Chapter (3 future ideas)
  futureIdeas: [
    {
      title: "Places we'll go.",
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      description: 'Foreign streets, spontaneous train rides, and finding hidden coffee shops together.',
    },
    {
      title: "Things we'll experience.",
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      description: 'Sunset drives with no destination, concerts under the rain, and building quiet dreams.',
    },
    {
      title: "Things we haven't even imagined yet.",
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      description: 'The best chapters are the ones we haven’t written a single word of.',
    },
  ],

  // Scene 12: Final Reveal
  finalReveal: {
    lines: [
      "I don't know exactly what the future looks like.",
      "I don't know where we'll go.",
      "I don't know what life will throw at us.",
    ],
    mainHeading: "But I know who I want beside me.",
    youHeading: "You. ❤️",
    photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
    birthdayWish: 'Happy Birthday, Aanya.',
    signature: '— Arjun',
    whisperAudioNote: '“I love you.”',
  },
};
