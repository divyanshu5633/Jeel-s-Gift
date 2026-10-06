# Interactive Couple Surprise — Demo V2

A 3.5–4.5 minute interactive cinematic mini-film experience designed to surprise a partner through tactile chapters, seamless continuous transitions, secret discoveries, and emotional reveals.

---

## ⚡ Quick Start

```bash
npm run dev
```

- **Local:** `http://localhost:5173/`
- **Network (on your phone):** `http://192.168.29.106:5173/`

On desktop, the experience renders in an authentic mobile frame with a toggle to full window. On mobile browsers, it expands into a full-screen, native application feel.

---

## 🎬 V2 Flow (12 Core Scenes)

1. **Scene 01 — The Hook (~10–15s):** Dark cinematic opening with headphone prompt and heartbeat `START` button that zooms directly into the experience.
2. **Scene 02 — The Secret Message (~15–20s):** Stylized private message exchange from Arjun culminating in `PROVE IT ❤️`, where the chat bubbles float upward directly into the question.
3. **Scene 03 — Quick Memory Game (~30–40s):** Fast 2-question challenge. Correct answers glow and physically morph into a floating balloon.
4. **Scene 04 — Balloon Challenge (~25–35s):** 4 floating balloons revealing the date (`14.02.2025`), memory (`Our first adventure.`), secret (`I was nervous too.`), and clue (`Look up.`), dissolving upward into the night sky.
5. **Scene 05 — Our Universe (~40–50s):** 6 glowing stars in a constellation. Tapping a star triggers a camera zoom into a full-screen photograph memory with swipe navigation.
6. **Scene 06 — Polaroid Flashback (~25–30s):** Stack of 3 swipeable Polaroids with tap-to-expand lightbox. Cards scatter into the next scene.
7. **Scene 07 — Relationship Statistics (~20–25s):** Rapid count-up counters (1,284 conversations, 327 arguments, 91 food thefts, ∞ reasons) collapsing into a single glowing heart.
8. **Scene 08 — Private Voice Message (~25–35s):** Emotional pause with a 1.5s circular hold-to-unlock mechanism and interactive audio waveform player.
9. **Scene 09 — Letter + Candle Combined (~30–40s):** Seamless sequence combining the handwritten letter (`Dear Aanya...`) which folds back into an envelope, revealing a birthday candle that flickers and extinguishes into darkness upon tap/hold.
10. **Scene 10 — The Last Gift (~20–25s):** Centered gift box that opens into a pitch black screen with musical key shift (*"You thought that was the surprise. It isn't."*).
11. **Scene 11 — The Next Chapter (~25–35s):** 3 future ideas (*"Places we'll go"*, *"Things we'll experience"*, *"Things we haven't even imagined yet"*).
12. **Scene 12 — Final Reveal (~30–40s):** Quiet, clean typography (*"But I know who I want beside me. You. ❤️"*), keepsake photograph, and replay controls (*`PLAY AGAIN`* / *`START OUR STORY AGAIN`*).

---

## 🎨 Personalization

To replace names, photos, dates, questions, voice transcripts, or letter text for any recipient, simply edit:
[`src/config/storyConfig.ts`](file:///c:/Users/Hp/Desktop/Jeel%20Gift/src/config/storyConfig.ts)
