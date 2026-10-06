# Interactive Couple Surprise — Demo V1

A cinematic, mobile-first interactive experience designed to surprise a partner through a series of tactile chapters, secret discoveries, playful questions, and emotional reveals.

---

## 🌟 Quick Start

To launch and explore the experience locally:

```bash
npm run dev
```

Then open the local URL in your browser (usually `http://localhost:5173`).

- **On Desktop:** The app displays an authentic mobile preview frame (390px iPhone-style bezel) with a toggle in the bottom right corner to switch to full-window immersion if desired.
- **On Mobile:** Open the URL on any phone (iOS / Android) for a full-screen, native application feel.

---

## 🎬 Experience Walkthrough (Scenes 00 – 26)

1. **Scene 00 — Entry / Preloader:** Atmospheric dark room with gentle stardust motes, progress dots (`● ○ ○ ○`), expanding into the next scene upon completion.
2. **Scene 01 — Personal Access:** Minimalist dark cinematic intro for **Aanya**, featuring the `ENTER →` button with scale, blur, and radial glow expansion.
3. **Scene 02 — The Warning:** Line-by-line audio prompt asking to put headphones on. Heartbeat-animated `I'M READY` button with a soft flash transition.
4. **Scene 03 — WhatsApp-Style Chat:** Private chat interface from **Arjun** with real-time typing indicators, sequential chat bubbles, and a particle dissolution transition.
5. **Scene 04 — The Mission:** "MISSION 01: Let's see how well you remember us."
6. **Scene 05 — Memory Question #1:** "Where did our story begin?" with interactive cards, playful wobble on incorrect answers, and celebratory chimes + zooming memory photograph on correct answer (*The College*).
7. **Scene 06 — Memory Question #2:** "Who fell first?" with witty diplomatic feedback, transforming into an expanding glowing heart.
8. **Scene 07 — Balloon Room:** Floating balloons that react to touch. Tap to pop each with particle bursts and sound effects, revealing the hidden date, memory, secret, and clue (*"Look for the stars"*).
9. **Scene 08 — Our Universe:** Night sky constellation where every glowing star represents a memory. Hovering or tapping reveals memory tags.
10. **Scene 09 — Memory Card:** Polaroid presentation with romantic captions and intuitive pagination.
11. **Scene 10 — Polaroid Memory Stack:** Interactive swipeable Polaroid deck with lightbox expansion to view photos full-screen with blurred background.
12. **Scene 11 — Relationship Statistics:** Upward count-up animations for conversations (1,284), arguments (327), laughs (583), food thefts (91), and infinite reasons (∞), collapsing into a glowing heart.
13. **Scene 12 — Private Message:** Minimal screen with a 1.5s press-and-hold radial progress unlock mechanism.
14. **Scene 13 — Voice Message:** Profile avatar, interactive audio waveform with real-time audio playback simulation, scrub bar, and transcript preview.
15. **Scene 14 — The Letter:** 3D vintage envelope with wax seal that unfolds physically, sliding out the handwritten letter.
16. **Scene 15 — Handwritten Letter:** Warm textured paper with progressive line-by-line cursive handwriting reveal.
17. **Scene 16 — Secret Discovery:** Interactive scavenger hunt where the user taps to discover 3 hidden secrets (First impression smile, nervous hello, the smile-and-look-away moment).
18. **Scene 17 — The Cake & Candle:** Dark room with a candle flame that flickers and leans when touched. Tap to blow out the candle with a smoke puff sound effect into total darkness.
19. **Scene 18 — The Wish:** Poetic sequential lines: *"I already made mine... And it wasn't for anything I could buy... More us."*
20. **Scene 19 — The Gift:** 3D ribboned gift box with gentle breathing animation. Tapping opens the box and suddenly cuts to pitch black.
21. **Scene 20 — The Misdirection:** Dramatic black screen with musical shift: *"You thought this was the surprise. It isn't. The real surprise is what comes next."*
22. **Scene 21 — The Story Reveal:** Multi-depth photo constellation drifting in 3D parallax, transitioning into a warm golden dawn horizon.
23. **Scene 22 — The Next Chapter:** Horizontal timeline (2026, 2027, 2028, Future) with cards for dreams and journeys yet to come.
24. **Scene 23 — Future Bucket List:** Interactive checklist with checkmark animations and micro-confetti for dreams to achieve together.
25. **Scene 24 — Final Message:** Distraction-free, clean typography leading to the heartfelt declaration: *"But I know who I want beside me. You. ❤️"*
26. **Scene 25 — Final Photo:** Final keepsake photo (*"Happy Birthday, Aanya. Thank you for being my favourite chapter. — Arjun"*) with a 2-second silence before revealing `OUR STORY VAULT` and `PLAY IT AGAIN`.
27. **Scene 26 — Our Story Vault:** Permanent digital archive with tabs for Timeline, Photo Gallery, Bucket List, Voice Memo, Handwritten Letter, and a Replay button.

---

## 🎨 How to Personalize (No Code Changes Required)

All content is centralized in:
[`src/config/storyConfig.ts`](file:///c:/Users/Hp/Desktop/Jeel%20Gift/src/config/storyConfig.ts)

To personalize the experience for any couple:
1. Update recipient (`recipient: '...'`) and sender (`sender: '...'`).
2. Replace photo URLs or drop files into `/public/assets/images/`.
3. Update memories, questions, dates, timeline years, and letter paragraphs.
4. Drop an audio file into `/public/assets/audio/` or use the built-in Web Audio API tone generator.

---

## 🛠 Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom Design System
- **Animations:** Motion for React
- **Icons:** Lucide React
- **Audio:** Web Audio API sound synthesis (procedural ambient chords, key change, balloon pops, UI clicks, chimes, and flame extinguish)
