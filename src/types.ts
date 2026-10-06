export interface StoryConfig {
  recipient: string;
  sender: string;
  relationshipStart: string;
  
  // Scene 00 & 01
  tagline: string;
  subTagline: string;
  
  // Scene 02
  warning: {
    lines: string[];
    subtext: string;
    buttonText: string;
  };

  // Scene 03: WhatsApp chat
  chat: {
    senderName: string;
    senderStatus: string;
    messages: {
      id: string;
      text: string;
      delay: number;
    }[];
    buttonText: string;
  };

  // Scene 04 & 05: Memory Question 1
  question1: {
    title: string;
    subtitle: string;
    question: string;
    options: {
      id: string;
      key: string;
      text: string;
      isCorrect: boolean;
    }[];
    correctFeedback: string;
    correctSubtext: string;
    wrongFeedback: string;
    wrongSubtext: string;
    image: string;
  };

  // Scene 06: Memory Question 2
  question2: {
    question: string;
    options: {
      id: string;
      key: string;
      text: string;
      isCorrect: boolean;
    }[];
    feedback: string;
    subtext: string;
  };

  // Scene 07: Balloons
  balloons: {
    id: string;
    color: string;
    highlight: string;
    category: string;
    content: string;
    subtext?: string;
  }[];

  // Scene 08 & 09: Universe & Stars
  stars: {
    id: string;
    label: string;
    date: string;
    caption: string;
    image: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    color: string;
  }[];

  // Scene 10: Polaroid stack
  polaroids: {
    id: string;
    title: string;
    date: string;
    caption: string;
    image: string;
    rotation: number;
    location?: string;
  }[];

  // Scene 11: Relationship Statistics
  statistics: {
    id: string;
    label: string;
    value: number | string;
    prefix?: string;
    suffix?: string;
    icon: string;
    color: string;
  }[];

  // Scene 12 & 13: Private voice note
  voiceMessage: {
    senderName: string;
    avatar: string;
    durationSeconds: number;
    placeholderNote: string;
    waveformBars: number[];
    transcript: string;
    audioUrl?: string;
  };

  // Scene 14 & 15: Handwritten Letter
  letter: {
    envelopePrompt: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  // Scene 16: Secret Discovery
  secrets: {
    id: string;
    type: 'heart' | 'star' | 'envelope';
    number: string;
    title: string;
    content: string;
    icon: string;
  }[];

  // Scene 17 & 18: Candle & Wish
  wish: {
    candlePrompt: string;
    candleSubtext: string;
    thoughts: string[];
  };

  // Scene 19 & 20: The Gift & Misdirection
  gift: {
    heading: string;
    subtext: string;
    buttonText: string;
    misdirectionLines: string[];
  };

  // Scene 21: Story Reveal
  storyReveal: {
    lines: string[];
    photos: {
      url: string;
      caption: string;
      depth: number;
    }[];
  };

  // Scene 22: Next Chapter Timeline
  timeline: {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
  }[];

  // Scene 23: Bucket list
  bucketList: {
    id: string;
    text: string;
    isSpecial?: boolean;
    specialResponse?: string;
  }[];

  // Scene 24 & 25: Final Message & Photo
  final: {
    lines: string[];
    mainHeading: string;
    youHeading: string;
    photo: string;
    photoTitle: string;
    photoSubtext: string;
    signature: string;
  };
}

export type SceneId = number; // 0 to 26
