import type { StoryConfig } from '../types';

export const storyConfig: StoryConfig = {
  recipient: 'Aanya',
  sender: 'Arjun',
  relationshipStart: '14 February 2025',

  tagline: 'PRIVATE EXPERIENCE',
  subTagline: 'Someone made this specifically for you.',

  warning: {
    lines: [
      'Before we begin...',
      'Put your headphones on.',
      'And please don’t skip anything.',
    ],
    subtext: 'You only get to experience this once.',
    buttonText: "I'M READY",
  },

  chat: {
    senderName: 'Arjun',
    senderStatus: 'online',
    messages: [
      { id: 'm1', text: 'Hey.', delay: 600 },
      { id: 'm2', text: 'I made something for you.', delay: 1800 },
      { id: 'm3', text: 'And no... it’s not just another website. 😂', delay: 3200 },
      { id: 'm4', text: 'There are a few things you need to discover first.', delay: 4800 },
      { id: 'm5', text: 'Ready?', delay: 6200 },
    ],
    buttonText: "LET'S GO ❤️",
  },

  question1: {
    title: 'MISSION 01',
    subtitle: "Let's see how well you remember us.",
    question: 'Where did our story begin?',
    options: [
      { id: 'opt_a', key: 'A', text: 'The Café', isCorrect: false },
      { id: 'opt_b', key: 'B', text: 'The College', isCorrect: true },
      { id: 'opt_c', key: 'C', text: 'The Park', isCorrect: false },
      { id: 'opt_d', key: 'D', text: 'Somewhere unexpected', isCorrect: false },
    ],
    correctFeedback: 'Correct. ❤️',
    correctSubtext: 'You remembered.',
    wrongFeedback: 'Hmm... not quite. 😏',
    wrongSubtext: 'Try again.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },

  question2: {
    question: 'Who fell first?',
    options: [
      { id: 'q2_a', key: 'A', text: 'Me', isCorrect: false },
      { id: 'q2_b', key: 'B', text: 'You', isCorrect: false },
      { id: 'q2_c', key: 'C', text: "We're still investigating", isCorrect: false },
      { id: 'q2_d', key: 'D', text: 'Obviously both', isCorrect: true },
    ],
    feedback: "Okay, that's the diplomatic answer. 😂",
    subtext: "I'll allow it.",
  },

  balloons: [
    {
      id: 'b1',
      color: '#f43f5e',
      highlight: '#fda4af',
      category: 'A DATE',
      content: '14.02.2025',
      subtext: 'The day the universe brought us together.',
    },
    {
      id: 'b2',
      color: '#8b5cf6',
      highlight: '#c4b5fd',
      category: 'A MEMORY',
      content: 'Our first adventure.',
      subtext: 'Walking till our feet hurt, talking about everything.',
    },
    {
      id: 'b3',
      color: '#ec4899',
      highlight: '#fbcfe8',
      category: 'A SECRET',
      content: 'I was nervous too.',
      subtext: 'My hands were shaking before I said hello.',
    },
    {
      id: 'b4',
      color: '#eab308',
      highlight: '#fef08a',
      category: 'A CLUE',
      content: 'Look for the stars.',
      subtext: 'Where all our little moments shine.',
    },
  ],

  stars: [
    {
      id: 'star-1',
      label: 'THE BEGINNING',
      date: '14 FEB 2025',
      caption: 'The moment two different worlds collided and instantly felt like home.',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      x: 22,
      y: 28,
      color: '#fb7185',
    },
    {
      id: 'star-2',
      label: 'THE FIRST ADVENTURE',
      date: '23 MAY 2025',
      caption: 'I didn’t know this ordinary day would become one of my favourite memories.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      x: 75,
      y: 22,
      color: '#c084fc',
    },
    {
      id: 'star-3',
      label: 'THAT RIDICULOUS DAY',
      date: '17 JUL 2025',
      caption: 'When nothing went according to plan, but laughing with you made it perfect.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      x: 35,
      y: 52,
      color: '#38bdf8',
    },
    {
      id: 'star-4',
      label: 'MY FAVOURITE PHOTO',
      date: '02 SEP 2025',
      caption: 'The one where your head was thrown back laughing at my terrible joke.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      x: 78,
      y: 60,
      color: '#facc15',
    },
    {
      id: 'star-5',
      label: 'THE DAY I KNEW',
      date: '18 NOV 2025',
      caption: 'A quiet evening where I realized you had become my safe harbor.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      x: 18,
      y: 78,
      color: '#f43f5e',
    },
    {
      id: 'star-6',
      label: 'ONE I NEVER WANT TO FORGET',
      date: '31 DEC 2025',
      caption: 'Watching the midnight sky together, whispering wishes for the future.',
      image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
      x: 62,
      y: 82,
      color: '#a855f7',
    },
  ],

  polaroids: [
    {
      id: 'p1',
      title: 'MEMORY 01',
      date: '14 FEBRUARY 2025',
      caption: 'The coffee went completely cold while we talked for 4 hours.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      rotation: -3,
      location: 'Little Corner Cafe',
    },
    {
      id: 'p2',
      title: 'MEMORY 02',
      date: '23 MAY 2025',
      caption: 'Caught in sudden rain and running under the awning laughing.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      rotation: 2,
      location: 'The Waterfront Walk',
    },
    {
      id: 'p3',
      title: 'MEMORY 03',
      date: '17 JULY 2025',
      caption: 'We had absolutely no idea what we were doing. 😂',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      rotation: -4,
      location: 'Highway Sunset Drive',
    },
    {
      id: 'p4',
      title: 'MEMORY 04',
      date: '02 SEPTEMBER 2025',
      caption: 'One of those days I wish I could replay on an infinite loop.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      rotation: 3,
      location: 'The Old Bookstore',
    },
  ],

  statistics: [
    {
      id: 's1',
      label: 'conversations',
      value: 1284,
      suffix: '',
      icon: 'MessageCircleHeart',
      color: '#38bdf8',
    },
    {
      id: 's2',
      label: 'unnecessary arguments',
      value: 327,
      suffix: '',
      icon: 'Flame',
      color: '#f97316',
    },
    {
      id: 's3',
      label: 'random laughs',
      value: 583,
      suffix: '',
      icon: 'Smile',
      color: '#eab308',
    },
    {
      id: 's4',
      label: '“I’m not hungry” → stealing your food',
      value: 91,
      suffix: '',
      icon: 'UtensilsCrossed',
      color: '#a855f7',
    },
    {
      id: 's5',
      label: 'reasons I would choose you again',
      value: '∞',
      suffix: '',
      icon: 'Heart',
      color: '#f43f5e',
    },
  ],

  voiceMessage: {
    senderName: 'Arjun',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    durationSeconds: 38,
    placeholderNote: 'Your actual voice message will go here.',
    waveformBars: [
      20, 35, 60, 45, 80, 95, 70, 50, 85, 100, 65, 40, 75, 90, 55, 30, 60, 85, 45, 95,
      70, 40, 80, 60, 35, 50, 85, 70, 90, 45, 30, 65, 75, 50, 95, 80, 40, 25
    ],
    transcript: '“Hey Aanya... if you are listening to this, I just wanted to tell you how grateful I am that you came into my life. Every single memory we made this year has been my favourite part of being alive. Keep going, there’s still something left for you...”',
  },

  letter: {
    envelopePrompt: 'For the person who somehow became my favourite part of every day.',
    greeting: 'Dear Aanya,',
    paragraphs: [
      'I don’t know exactly when you became such an important part of my life.',
      'Somewhere between the late-night conversations, the stupid inside jokes, the silly arguments, and all those quiet ordinary days...',
      'you became home.',
      'And if I had to choose all over again in every universe,',
      'I’d still choose you.',
    ],
    closing: 'Always,',
    signature: '— Arjun',
  },

  secrets: [
    {
      id: 'sec-1',
      type: 'heart',
      number: 'SECRET #01',
      title: 'The first thing I noticed about you.',
      content: 'Your smile. It lit up the whole room before you even spoke.',
      icon: 'Heart',
    },
    {
      id: 'sec-2',
      type: 'star',
      number: 'SECRET #02',
      title: 'Something I never told you.',
      content: 'I was so nervous the first time we talked that I rehearsed my hello five times.',
      icon: 'Sparkles',
    },
    {
      id: 'sec-3',
      type: 'envelope',
      number: 'SECRET #03',
      title: 'A memory you probably forgot.',
      content: 'That tiny moment when you smiled at me, blushed slightly, and looked away. That was when I was completely gone.',
      icon: 'Mail',
    },
  ],

  wish: {
    candlePrompt: 'Before the last chapter...',
    candleSubtext: 'Make a wish. (Tap or hold the flame)',
    thoughts: [
      'I already made mine.',
      'And it wasn’t for anything I could buy.',
      'It was for more days like these.',
      'More memories.',
      'More laughter.',
      'More us.',
    ],
  },

  gift: {
    heading: 'ONE LAST THING...',
    subtext: 'A little box holding something for you.',
    buttonText: 'OPEN THE GIFT',
    misdirectionLines: [
      'You thought this was the surprise.',
      'It isn’t.',
      'The real surprise is what comes next.',
    ],
  },

  storyReveal: {
    lines: [
      'Everything you’ve just seen...',
      '...came from moments that already happened.',
      'But our story isn’t finished.',
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
        caption: 'Where it began',
        depth: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
        caption: 'The journeys we took',
        depth: 2,
      },
      {
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
        caption: 'The days we laughed till crying',
        depth: 3,
      },
    ],
  },

  timeline: [
    {
      year: '2026',
      title: 'Where we are now',
      subtitle: 'Living in the present',
      description: 'Cherishing every single phone call, shared coffee, and secret glance.',
      icon: 'Compass',
      color: '#f43f5e',
    },
    {
      year: '2027',
      title: 'Places we’ll go',
      subtitle: 'The first big trip',
      description: 'Boarding flights with messy luggage, discovering hidden streets, watching foreign sunsets together.',
      icon: 'Plane',
      color: '#8b5cf6',
    },
    {
      year: '2028',
      title: 'Things we’ll build',
      subtitle: 'Dreams turning into reality',
      description: 'Creating a cozy space filled with plants, books, late-night cooking experiments, and warmth.',
      icon: 'Home',
      color: '#06b6d4',
    },
    {
      year: 'FUTURE',
      title: 'Everything we haven’t imagined yet',
      subtitle: 'An unwritten masterpiece',
      description: 'Growing old together, still holding hands across dinner tables, still finding each other funny.',
      icon: 'Infinity',
      color: '#eab308',
    },
  ],

  bucketList: [
    { id: 'b1', text: 'Watch a sunrise together from a mountain or beach' },
    { id: 'b2', text: 'Take a completely unplanned road trip with no destination' },
    { id: 'b3', text: 'Visit a place neither of us has ever seen before' },
    { id: 'b4', text: 'Take 1,000 terrible, candid, hilarious photos' },
    { id: 'b5', text: 'Laugh at the exact same stupid inside joke 20 years from now' },
    { id: 'b6', text: 'Build a quiet, beautiful life that we are deeply proud of' },
    {
      id: 'b7',
      text: 'Write our own list together',
      isSpecial: true,
      specialResponse: 'This one is ours to decide. Forever.',
    },
  ],

  final: {
    lines: [
      'I don’t know exactly what the future looks like.',
      'I don’t know where we’ll go.',
      'I don’t know what life will throw at us.',
    ],
    mainHeading: 'But I know who I want beside me.',
    youHeading: 'You. ❤️',
    photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
    photoTitle: 'Happy Birthday, Aanya.',
    photoSubtext: 'Thank you for being my favourite chapter.',
    signature: '— Arjun',
  },
};
