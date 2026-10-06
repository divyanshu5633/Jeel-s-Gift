export interface StoryConfigV2 {
  recipient: string;
  sender: string;
  relationshipStart: string;

  // Scene 01: The Hook
  hook: {
    heading: string;
    subheading: string;
    headphonesHint: string;
    buttonText: string;
  };

  // Scene 02: Secret Message
  chat: {
    senderName: string;
    messages: string[];
    buttonText: string;
  };

  // Scene 03: Quick Memory Game (2 questions only)
  questions: {
    q1: {
      question: string;
      options: { id: string; key: string; text: string; isCorrect: boolean }[];
      correctFeedback: string;
      wrongFeedback: string;
    };
    q2: {
      question: string;
      options: { id: string; key: string; text: string; isCorrect: boolean }[];
      feedback: string;
    };
  };

  // Scene 04: Balloon Challenge
  balloons: {
    id: string;
    color: string;
    highlight: string;
    category: string;
    content: string;
  }[];

  // Scene 05: Our Universe (5-6 stars only)
  stars: {
    id: string;
    label: string;
    date: string;
    caption: string;
    image: string;
    x: number;
    y: number;
    color: string;
  }[];

  // Scene 06: Polaroid Flashback (Stack of 3)
  polaroids: {
    id: string;
    memoryNumber: string;
    date: string;
    caption: string;
    image: string;
    rotation: number;
  }[];

  // Scene 07: Relationship Statistics (4 fast counters)
  statistics: {
    id: string;
    label: string;
    value: number | string;
    color: string;
  }[];

  // Scene 08: Private Voice Message
  voiceMessage: {
    senderName: string;
    avatar: string;
    durationSeconds: number;
    waveformBars: number[];
    transcript: string;
  };

  // Scene 09: Letter + Candle Combined
  letterAndCandle: {
    letterPrompt: string;
    greeting: string;
    body: string[];
    signature: string;
    candlePrompt: string;
    wishThoughts: string[];
  };

  // Scene 10: The Last Gift
  gift: {
    heading: string;
    buttonText: string;
    misdirectionLines: string[];
  };

  // Scene 11: The Next Chapter (3 future ideas)
  futureIdeas: {
    title: string;
    image: string;
    description: string;
  }[];

  // Scene 12: Final Reveal
  finalReveal: {
    lines: string[];
    mainHeading: string;
    youHeading: string;
    photo: string;
    birthdayWish: string;
    signature: string;
    whisperAudioNote?: string;
  };
}

export type SceneId = number; // 1 to 12
