// V3 Complete Experience Data Models and Types (Streamlined without QR)

export interface BalloonClue {
  id: string;
  color: string;
  highlight: string;
  category: string;
  content: string;
  subtext?: string;
  depth?: number;
}

export interface UniverseStar {
  id: string;
  label: string;
  date: string;
  caption: string;
  image: string;
  x: number;
  y: number;
  color: string;
}

export interface StoryVaultItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  isLocked: boolean;
  lockHint?: string;
  previewImage?: string;
  fullImage?: string;
  story: string;
  tag?: string;
}

export interface PolaroidMemory {
  id: string;
  memoryNumber: string;
  date: string;
  caption: string;
  image: string;
  rotation: number;
}

export interface StatisticCounter {
  id: string;
  label: string;
  value: number | string;
  color: string;
  subtext?: string;
}

export interface PromiseItem {
  id: string;
  text: string;
  isSpecial?: boolean;
  specialResponse?: string;
  category?: string;
}

export interface StoryConfigV3 {
  recipient: string;
  sender: string;
  relationshipStart: string;

  // Chapter 01: The Secret Message (Hook)
  hook: {
    heading: string;
    subheading: string;
    headphonesHint: string;
    buttonText: string;
  };

  // Chapter 02: Secret Message (WhatsApp Chat)
  chat: {
    senderName: string;
    messages: string[];
    buttonText: string;
  };

  // Chapter 03: Do You Remember? (Memory Questions)
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
      correctFeedback: string;
      wrongFeedback: string;
    };
    q3?: {
      question: string;
      options: { id: string; key: string; text: string; isCorrect: boolean }[];
      correctFeedback: string;
      wrongFeedback: string;
    };
  };

  // Chapter 04: The Balloon Room (Physical 3D Room)
  balloons: BalloonClue[];

  // Chapter 05: Our Universe (Star Constellation)
  stars: UniverseStar[];

  // Chapter 06: Our Story Vault (Private Archive)
  storyVault: StoryVaultItem[];

  // Chapter 07: Polaroid Flashback
  polaroids: PolaroidMemory[];

  // Chapter 08: Our Completely Scientific Data
  statistics: StatisticCounter[];

  // Chapter 09: Private Voice Message
  voiceMessage: {
    senderName: string;
    avatar: string;
    durationSeconds: number;
    waveformBars: number[];
    transcript: string;
    audioUrl?: string;
  };

  // Chapter 10: Handwritten Letter
  letter: {
    envelopePrompt: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    stampLabel?: string;
  };

  // Chapter 11: Make A Wish (Candle)
  candle: {
    prompt: string;
    subtext: string;
    wishThoughts: string[];
  };

  // Chapter 12: Things I Want To Do With You (Expanded Promises)
  promises: PromiseItem[];

  // Chapter 13: The Last Gift (Silver Necklace & Pendant)
  gift: {
    heading: string;
    buttonText: string;
    boxPrompt: string;
    necklaceTitle: string;
    necklaceSubtitle: string;
    necklaceDescription: string;
    necklaceDetail: string;
    continueButtonText: string;
    necklaceImage?: string;
  };

  // Chapter 14: Final Reveal
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

export type SceneId = number; // 1 to 14
