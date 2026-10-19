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
      category: 'A SWEET SECRET',
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
      date: '21 JUL 2021',
      caption: 'The moment two different paths crossed and immediately felt familiar.',
      image: '/assets/images/beginning.webp',
      imagePosition: 'center 40%',
      x: 22,
      y: 28,
      color: '#fb7185',
    },
    {
      id: 'star-2',
      label: 'First Adventure',
      date: 'Saputara Hills',
      caption: "I didn't know this ordinary day would become one of my favourites.",
      image: '/assets/images/first_adventure.webp',
      imagePosition: 'center 62%',
      x: 76,
      y: 24,
      color: '#c084fc',
    },
    {
      id: 'star-3',
      label: 'The Road Trip',
      date: 'Highway Getaway',
      caption: 'Car hood conversations, winding mountain roads, and you smiling right beside me.',
      image: '/assets/images/road_trip.webp',
      imagePosition: 'center 28%',
      x: 32,
      y: 52,
      color: '#38bdf8',
    },
    {
      id: 'star-4',
      label: 'My Favourite',
      date: 'Twin Smiles',
      caption: 'Matching in blue stripes, smiling in the mirror, and knowing you will always be my favourite view.',
      image: '/assets/images/my_favourite.webp',
      imagePosition: 'center 52%',
      x: 78,
      y: 62,
      color: '#facc15',
    },
    {
      id: 'star-5',
      label: 'The Moment',
      date: 'Golden Hour',
      caption: 'Watching the sunset over the waves, hands held tight in the sand, knowing I found my home.',
      image: '/assets/images/the_moment.webp',
      imagePosition: 'center 60%',
      x: 20,
      y: 78,
      color: '#f43f5e',
    },
    {
      id: 'star-6',
      label: 'One I Never Want To Forget',
      date: 'The Day It Became Us',
      caption: 'The unforgettable day our relationship became official. Dressed in red, side by side, choosing each other forever.',
      image: '/assets/images/official_day.webp',
      imagePosition: 'center 15%',
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
      date: '21 Jul 2021',
      category: 'CONVERSATION',
      isLocked: false,
      previewImage: '/assets/images/beginning.webp',
      imagePosition: 'center 40%',
      story: 'We were supposed to say goodnight after 10 minutes. Before we knew it, hours melted away and neither of us wanted to hang up first. That was the night everything changed.',
      tag: 'Beginning',
    },
    {
      id: 'vault-2',
      title: 'Saputara Getaway',
      subtitle: 'Misty hills, chai stops & getting lost in the rain',
      date: 'First Trip',
      category: 'ADVENTURE',
      isLocked: false,
      previewImage: '/assets/images/first_adventure.webp',
      imagePosition: 'center 62%',
      story: 'Winding mountain ghats, chilly breeze, getting lost three times, and having roadside tea under a broken umbrella. It showed me that no matter the road, being with you makes every trip unforgettable.',
      tag: 'Adventure',
    },
    {
      id: 'vault-3',
      title: 'That Random Day',
      subtitle: 'Post-Holi roaming & impromptu photoshoot with friends',
      date: 'Post-Holi Days',
      category: 'THAT RANDOM DAY',
      isLocked: false,
      previewImage: '/assets/images/post_holi.webp',
      imagePosition: 'center 35%',
      story: 'Right after our Holi celebrations, we were just roaming around with our friends having fun and doing random photography. Amidst all the chaos and laughs with everyone, this little candid moment with you became the highlight of my whole day.',
      tag: 'Unplanned',
    },
    {
      id: 'vault-4',
      title: 'The Little Things',
      subtitle: 'Navratri celebration with my sweetheart & endless memories',
      date: 'Navratri Nights',
      category: 'THE LITTLE THINGS',
      isLocked: false,
      previewImage: '/assets/images/navratri.webp',
      imagePosition: 'center 42%',
      story: 'Celebrating Navratri with my sweetheart, dressed up in matching black, dancing and making so many unforgettable memories together. In a festive crowd full of music and lights, looking into your eyes was the only moment that truly mattered.',
      tag: 'Special',
    },
    {
      id: 'vault-5',
      title: 'My Favourite Picture',
      subtitle: 'Matching blue stripes & effortless smiles',
      date: 'Timeless',
      category: 'PHOTOGRAPH',
      isLocked: false,
      previewImage: '/assets/images/my_favourite.webp',
      imagePosition: 'center 52%',
      story: 'Matching in blue stripes, casual mirror selfies, and that effortless smile of yours. Out of all the photographs in my gallery, this one will always be my absolute favourite.',
      tag: 'Treasured',
    },
    {
      id: 'vault-6',
      title: 'Something For Later...',
      subtitle: 'Reserved for the countless chapters still to come',
      date: 'Our Future',
      category: 'OUR FUTURE',
      isLocked: false,
      previewImage: '/assets/images/something_for_later.webp',
      imagePosition: 'center 52%',
      story: 'From spontaneous road trips and new cities to quiet mornings drinking chai together—the most extraordinary chapters of our story haven’t even been written yet. And I want every single one with you.',
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
      date: 'RIVERSIDE BREEZE',
      caption: 'Wind in your hair, warm sun, and the sweetest smile by the water.',
      image: '/assets/images/polaroid_1.webp',
      imagePosition: 'center 38%',
      rotation: -3,
    },
    {
      id: 'pol-2',
      memoryNumber: 'MEMORY 02',
      date: 'SACRED BLESSINGS',
      caption: 'Walking barefoot by the ancient temple, holding hands and praying for us.',
      image: '/assets/images/polaroid_2.webp',
      imagePosition: 'center 58%',
      rotation: 2.5,
    },
    {
      id: 'pol-3',
      memoryNumber: 'MEMORY 03',
      date: 'CELEBRATION NIGHT',
      caption: 'Under the glowing lights and golden balloons, matching in black.',
      image: '/assets/images/polaroid_3.webp',
      imagePosition: 'center 44%',
      rotation: -2,
    },
    {
      id: 'pol-4',
      memoryNumber: 'MEMORY 04',
      date: 'PURE & CANDID US',
      caption: 'Playfully peeking behind my shoulder—just us being silly and completely in love.',
      image: '/assets/images/polaroid_4.webp',
      imagePosition: 'center center',
      rotation: 3,
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
      subtext: "mostly about we couldn't decide what to do & what to eat",
    },
    {
      id: 's3',
      label: 'times I waited downstairs for you 😂',
      value: 147,
      color: '#a855f7',
      subtext: 'every plan starts with me waiting… and you being late. ❤️',
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
    avatar: '/assets/images/beginning.webp',
    durationSeconds: 78,
    waveformBars: [
      22, 45, 68, 55, 90, 100, 75, 58, 85, 95, 72, 48, 82, 94, 62, 38, 70, 92, 54, 96,
      82, 52, 84, 66, 44, 62, 88, 74, 94, 52, 42, 68, 84, 62, 98, 82, 46, 28
    ],
    transcript: '“Hey Jeel ❤️... hearing your voice always resets my whole day. Some things are simply better heard than read. I just wanted to leave this quiet reminder of how deeply you are loved.”',
    audioUrl: '/assets/audio/for_jeelu.m4a',
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
  // CHAPTER 13 — FINAL REVEAL (Quiet, Pure Emotion)
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
    photo: '/assets/images/finale.webp',
    photoPosition: 'center 38%',
    birthdayWish: 'Happy Birthday, Jeel. ❤️',
    signature: '— Divyanshu',
    whisperAudioNote: '“I love You Sweetheart ❤️”',
  },

  // -----------------------------------------------------------------------
  // CHAPTER 14 — THE THIRD MYSTERY 💎 (Treasure Hunt Clue)
  // -----------------------------------------------------------------------
  thirdMystery: {
    badge: 'THE THIRD CLUE • TREASURE HUNT',
    title: 'THE THIRD MYSTERY 💎',
    subtitle: 'Solve the riddle to find the secret waiting for you.',
    stanzas: [
      "Your next treasure isn't far away,",
      "But finding it takes more than words can say.",
      "Two places to sit, a journey to share,",
      "Yet one holds a secret hidden beneath its care.",
      "Don't search the skies or look at the view…",
      "The answer lies below the place reserved for you. ❤️",
    ],
    instruction: 'Look beneath where you are seated right now...',
  },
};
