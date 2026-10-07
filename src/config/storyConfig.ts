import type { StoryConfigV3 } from '../types';

/**
 * =========================================================================
 * 💖 V3 STORY CONFIGURATION — "OUR LOVE STORY: THE SECRET SURPRISE"
 * =========================================================================
 * 
 * Centralized personalization file.
 * All texts, dates, photos, questions, inside jokes, letters, promises,
 * and audio parameters can be customized right here without touching any UI code!
 */

export const storyConfig: StoryConfigV3 = {
  recipient: 'Jeel ❤️',
  sender: 'Divyanshu',
  relationshipStart: '21 July 2021',

  // -----------------------------------------------------------------------
  // CHAPTER 01 — THE SECRET MESSAGE (Hook & Audio Permission)
  // -----------------------------------------------------------------------
  hook: {
    heading: 'A LITTLE SOMETHING FOR YOU.',
    subheading: 'But you have to play along.',
    headphonesHint: 'Put your headphones on.',
    buttonText: 'START',
  },

  // -----------------------------------------------------------------------
  // CHAPTER 02 — THE SECRET MESSAGE / MEMORY TEST (WhatsApp Conversation)
  // -----------------------------------------------------------------------
  chat: {
    senderName: 'Divyanshu',
    messages: [
      'Hey.',
      'I made something for you.',
      "But there's a problem.",
      'You have to prove you remember us. 😂',
      'Ready?',
    ],
    buttonText: 'PROVE IT ❤️',
  },

  // -----------------------------------------------------------------------
  // CHAPTER 03 — DO YOU REMEMBER? (Playful Relationship Questions)
  // -----------------------------------------------------------------------
  questions: {
    q1: {
      question: 'Where did our story begin?',
      options: [
        { id: 'q1_a', key: 'A', text: 'The Café', isCorrect: false },
        { id: 'q1_b', key: 'B', text: 'The School', isCorrect: true },
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
        { id: 'q2_b', key: 'B', text: 'You', isCorrect: true },
        { id: 'q2_c', key: 'C', text: "We're still investigating", isCorrect: false },
        { id: 'q2_d', key: 'D', text: 'Obviously both', isCorrect: false },
      ],
      correctFeedback: 'You know it! ❤️',
      wrongFeedback: 'Are you sure about that? 😂',
    },
    q3: {
      question: 'Who takes longer to get ready?',
      options: [
        { id: 'q3_a', key: 'A', text: 'Always you (obviously)', isCorrect: false },
        { id: 'q3_b', key: 'B', text: 'Me (allegedly)', isCorrect: true },
        { id: 'q3_c', key: 'C', text: 'It is a tie', isCorrect: false },
        { id: 'q3_d', key: 'D', text: "Depends on if there's food", isCorrect: false },
      ],
      correctFeedback: 'Allegedly, of course! 😂❤️',
      wrongFeedback: 'Nice try! 😂',
    },
  },

  // -----------------------------------------------------------------------
  // CHAPTER 04 — THE BALLOON ROOM 🎈 (Physical Interactive Room)
  // -----------------------------------------------------------------------
  balloons: [
    {
      id: 'b1',
      color: '#f43f5e',
      highlight: '#fda4af',
      category: 'A SACRED DATE',
      content: '21st July 2021',
      subtext: 'The day everything subtly changed forever.',
      depth: 0.9,
    },
    {
      id: 'b2',
      color: '#8b5cf6',
      highlight: '#c4b5fd',
      category: 'OUR FIRST ADVENTURE',
      content: 'Saputara Hill Station',
      subtext: 'Our first unforgettable adventure together.',
      depth: 0.7,
    },
    {
      id: 'b3',
      color: '#ec4899',
      highlight: '#fbcfe8',
      category: 'A CONFESSION',
      content: 'I was nervous too.',
      subtext: 'My hands were shaking when I first hugged you.',
      depth: 0.85,
    },
    {
      id: 'b4',
      color: '#eab308',
      highlight: '#fef08a',
      category: 'A HIDDEN CLUE',
      content: 'Look up.',
      subtext: 'The whole sky has been waiting for us.',
      depth: 0.75,
    },
  ],

  // -----------------------------------------------------------------------
  // CHAPTER 05 — OUR UNIVERSE ✨ (Constellation of Memories)
  // -----------------------------------------------------------------------
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

  // -----------------------------------------------------------------------
  // CHAPTER 06 — OUR STORY VAULT 🔐 (Private Archive)
  // -----------------------------------------------------------------------
  storyVault: [
    {
      id: 'vault-1',
      title: 'First Conversation',
      subtitle: 'The 3-hour phone call that felt like 5 minutes',
      date: '14 Feb 2025',
      category: 'CONVERSATION',
      isLocked: false,
      previewImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
      story: 'We were supposed to say goodnight after 10 minutes. Before we knew it, the sun was almost up and neither of us wanted to hang up first.',
      tag: 'Unlocked',
    },
    {
      id: 'vault-2',
      title: 'First Adventure',
      subtitle: 'Getting lost in the rain together',
      date: '23 May 2025',
      category: 'ADVENTURE',
      isLocked: false,
      previewImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      story: 'We took the wrong exit three times, our shoes were soaked, and we ended up eating roadside tea under a broken umbrella. Pure happiness.',
      tag: 'Unlocked',
    },
    {
      id: 'vault-3',
      title: 'That Random Day',
      subtitle: 'The grocery store dance routine',
      date: '17 Jul 2025',
      category: 'SILLY MOMENT',
      isLocked: false,
      previewImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
      story: 'We went to buy eggs and ended up choreographing a silly routine down aisle 4. The cashier tried not to smile.',
      tag: 'Unlocked',
    },
    {
      id: 'vault-4',
      title: 'Something I Never Told You',
      subtitle: 'A secret kept until today',
      date: '02 Sep 2025',
      category: 'CONFESSION',
      isLocked: false,
      previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      story: 'The day you wore that oversized green sweater, I sat across from you pretending to check an email, but honestly I was just silently thanking the universe for you.',
      tag: 'Special',
    },
    {
      id: 'vault-5',
      title: 'My Favourite Picture',
      subtitle: 'Unfiltered, completely you',
      date: '18 Nov 2025',
      category: 'PHOTOGRAPH',
      isLocked: false,
      previewImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
      story: 'Your hair in the wind, mid-laugh, not posing at all. This photograph lives rent-free as my favorite lock screen in my mind.',
      tag: 'Unlocked',
    },
    {
      id: 'vault-6',
      title: 'Something For Later...',
      subtitle: 'Reserved for our next chapters together',
      date: 'Our Future',
      category: 'FUTURE',
      isLocked: false,
      previewImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
      story: 'The most extraordinary chapters of our story haven’t even been written yet. And that is what excites me most.',
      tag: 'Forever',
    },
  ],

  // -----------------------------------------------------------------------
  // CHAPTER 07 — POLAROID FLASHBACK 📸
  // -----------------------------------------------------------------------
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

  // -----------------------------------------------------------------------
  // CHAPTER 08 — OUR COMPLETELY SCIENTIFIC DATA 😂
  // -----------------------------------------------------------------------
  statistics: [
    {
      id: 's1',
      label: 'conversations',
      value: 1284,
      color: '#38bdf8',
      subtext: 'and counting every single day',
    },
    {
      id: 's2',
      label: 'unnecessary arguments',
      value: 327,
      color: '#f97316',
      subtext: 'mostly about directions & snacks',
    },
    {
      id: 's3',
      label: 'times someone said "I\'m not hungry" and stole food',
      value: 91,
      color: '#a855f7',
      subtext: 'french fries are never safe',
    },
    {
      id: 's4',
      label: "times I'd choose you again",
      value: '∞',
      color: '#f43f5e',
      subtext: 'every lifetime, without hesitation',
    },
  ],

  // -----------------------------------------------------------------------
  // CHAPTER 09 — PRIVATE VOICE MESSAGE 🎧
  // -----------------------------------------------------------------------
  voiceMessage: {
    senderName: 'Divyanshu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    durationSeconds: 24,
    waveformBars: [
      22, 45, 68, 55, 90, 100, 75, 58, 85, 95, 72, 48, 82, 94, 62, 38, 70, 92, 54, 96,
      82, 52, 84, 66, 44, 62, 88, 74, 94, 52, 42, 68, 84, 62, 98, 82, 46, 28
    ],
    transcript: '“Hey Jeel ❤️... hearing your voice always resets my whole day. Some things are simply better heard than read. I just wanted to leave this quiet reminder of how deeply you are loved.”',
    audioUrl: '', // Optional: supply a real path like '/audio/voice_message.mp3'
  },

  // -----------------------------------------------------------------------
  // CHAPTER 10 — HANDWRITTEN LETTER 💌 (Restored Full V1 Experience)
  // -----------------------------------------------------------------------
  letter: {
    envelopePrompt: 'A letter written just for you.',
    greeting: 'Dear Jeel ❤️,',
    paragraphs: [
      'Somewhere between the conversations, the stupid jokes and all those ordinary days...',
      'you became one of the best parts of my life.',
      'Thank you for being my constant comfort, my funniest companion, and the reason so many ordinary days turn magical.',
      'I cannot wait for every chapter still unwritten.',
    ],
    closing: 'Forever yours,',
    signature: '— Divyanshu',
    stampLabel: 'LOVE',
  },

  // -----------------------------------------------------------------------
  // CHAPTER 11 — MAKE A WISH 🕯️
  // -----------------------------------------------------------------------
  candle: {
    prompt: 'Now make a wish.',
    subtext: 'Tap the candle flame to blow it out.',
    wishThoughts: [
      'I already made mine.',
      'More days like these.',
      'More us.',
    ],
  },

  // -----------------------------------------------------------------------
  // CHAPTER 12 — THINGS I WANT TO DO WITH YOU ❤️ (10 Rich Promises & Bucket List)
  // -----------------------------------------------------------------------
  promises: [
    {
      id: 'p1',
      text: "Travel somewhere we've never been before.",
      isSpecial: true,
      specialResponse: 'Packing only one bag each and letting the roads decide.',
      category: 'Adventure',
    },
    {
      id: 'p2',
      text: 'Watch a sunrise together after talking all night.',
      isSpecial: false,
      category: 'Intimate',
    },
    {
      id: 'p3',
      text: 'Take a completely unplanned road trip.',
      isSpecial: true,
      specialResponse: 'No alarms, no bookings, just music and headlights.',
      category: 'Adventure',
    },
    {
      id: 'p4',
      text: 'Cook an elaborate dinner together from scratch.',
      isSpecial: true,
      specialResponse: 'And ordering emergency pizza when we burn the garlic bread.',
      category: 'Fun',
    },
    {
      id: 'p5',
      text: 'Build a home filled with our stupid little memories.',
      isSpecial: false,
      category: 'Future',
    },
    {
      id: 'p6',
      text: 'Go stargazing far away from city lights under one warm blanket.',
      isSpecial: true,
      specialResponse: 'Spotting constellations and making silly wishes.',
      category: 'Romantic',
    },
    {
      id: 'p7',
      text: 'Have a spontaneous midnight ice cream run in pajamas.',
      isSpecial: false,
      category: 'Fun',
    },
    {
      id: 'p8',
      text: 'Learn a ridiculous new dance together and laugh uncontrollably.',
      isSpecial: true,
      specialResponse: 'Even if we step on each other’s toes every ten seconds.',
      category: 'Playful',
    },
    {
      id: 'p9',
      text: 'Revisit every place where we made our first memories.',
      isSpecial: false,
      category: 'Keepsake',
    },
    {
      id: 'p10',
      text: 'Grow old, stay silly, and still annoy each other every single day.',
      isSpecial: true,
      specialResponse: 'Especially when stealing your desserts when we’re 80.',
      category: 'Forever',
    },
  ],

  // -----------------------------------------------------------------------
  // CHAPTER 13 — THE LAST GIFT 🎁 (Silver Necklace with Pendant)
  // -----------------------------------------------------------------------
  gift: {
    heading: 'ONE LAST THING...',
    buttonText: 'OPEN THE BOX',
    boxPrompt: 'Tap the ribbon or box to reveal what’s waiting for you.',
    necklaceTitle: 'A Sterling Silver Pendant',
    necklaceSubtitle: 'Crafted to be kept close to you, always.',
    necklaceDescription: '“A little piece of my heart in sterling silver, crafted to rest gently against yours everywhere you go.”',
    necklaceDetail: 'Every time you touch this pendant, remember that you are loved unconditionally.',
    continueButtonText: 'CONTINUE TO OUR FINALE ❤️',
    necklaceImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  },

  // -----------------------------------------------------------------------
  // CHAPTER 14 — FINAL REVEAL (Quiet, Pure Emotion)
  // -----------------------------------------------------------------------
  finalReveal: {
    lines: [
      "I don't know exactly what the future looks like.",
      "I don't know where we'll go.",
      "I don't know what life will throw at us.",
      "But I know who I want beside me.",
    ],
    mainHeading: "And it will always be",
    youHeading: "You. ❤️",
    photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
    birthdayWish: 'Happy Birthday, Jeel. ❤️',
    signature: '— Divyanshu',
    whisperAudioNote: '“I love You Sweetheart ❤️”',
  },
};
