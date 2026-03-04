# ANTICONSUMPTION — Master Build Document
> **Version:** 1.0  
> **Output target:** Single-file React JSX  
> **Last updated by:** Gift Abah

---

## WHAT YOU ARE BUILDING

A web app called **Anticonsumption**. Its purpose is to encourage people to create more than they consume by helping them discover what kind of creator they are. It is a 4-question quiz that results in one of 6 creator personas. There is also a Manifesto page explaining the philosophy behind the project.

The app should feel **warm, considered, and handmade** — like something a thoughtful person built with care, not a generic SaaS product. Every word, interaction, and layout choice should reinforce the idea that creation matters.

**This is not a flashy app. It is a soulful one.**

---

## FONTS — EMBED CODE

Paste this inside the `<head>` of your HTML, or use `@import` at the top of your CSS. In a React JSX single file, inject it via a `<style>` tag or `useEffect` that appends a `<link>` to the document head.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Young+Serif&display=swap" rel="stylesheet">
```

### Font usage rules — STRICT

| Element | Font | Weight | Notes |
|---|---|---|---|
| All headings (h1, h2, h3) | Young Serif | Regular (400) | Warm, editorial feel |
| Persona name on result card | Young Serif | Regular (400) | Large, 36–48px |
| Manifesto title | Young Serif | Regular (400) | Large, 48–56px |
| "What kind of maker are you?" | Young Serif | Regular (400) | Landing headline |
| Quiz question text | Young Serif | Regular (400) | 28–36px |
| ALL body text | Inconsolata | 400 | All paragraphs |
| ALL buttons | Inconsolata | 500–600 | Uppercase or lowercase, consistent |
| Nav items | Inconsolata | 400 | Uppercase, letter-spaced |
| Option card labels | Inconsolata | 700 (bold) | Orange colour |
| Option card sub-text | Inconsolata | 400 | Body colour |
| Progress label (1 OF 4) | Inconsolata | 400 | Muted, uppercase, letter-spaced |
| Footer | Inconsolata | 400 | Uppercase, letter-spaced |
| YOU'RE label on result | Inconsolata | 400 | Small, orange, letter-spaced |

**NEVER use any other font. Not system fonts, not fallback sans-serif as primary. Always load Young Serif and Inconsolata.**

---

## COLOUR PALETTE — EXACT VALUES

```js
const COLORS = {
  bg:         "#F5F0E8",  // warm off-white — page background
  white:      "#FDFAF4",  // slightly warm white — cards, nav
  ink:        "#1C1410",  // deep brown-black — all primary text
  orange:     "#C4603A",  // primary accent — CTAs, labels, highlights
  orangeHover:"#B8562E",  // darker orange for hover states
  orangeLight:"#E8824A",  // lighter orange — secondary use
  sage:       "#8A9E85",  // calm green — secondary accent
  card:       "#EDE8DF",  // card background colour
  cardHover:  "#E2DBD0",  // card hover state
  border:     "#D4CEC4",  // all borders and dividers
  muted:      "#9A9088",  // secondary text, labels
};
```

**Usage rules:**
- Page background is always `#F5F0E8`
- Cards sit on `#EDE8DF`
- The primary CTA button is always `#C4603A` (orange)
- Orange is used for: CTA buttons, "YOU'RE" label, option card labels when selected, nav active indicator, footer credit name link, "Why you should create" heading, progress labels
- Never use pure black (`#000000`) or pure white (`#ffffff`) anywhere

---

## LOGO

Get the logo file here - "C:\Users\DELL\Vibe Coding\anticonsumption\logo.svg" 

## NAVIGATION

A two-tab nav bar sits at the very top of the page on **Landing** and **Manifesto** pages only. It does NOT appear during the quiz flow.

```
| CREATOR PERSONA          | MANIFESTO               |
```

- Full width, each tab takes 50%
- Separated by a 1px vertical divider in `#D4CEC4`
- Bottom border: `1px solid #D4CEC4`
- Background: `#FDFAF4`
- Font: Inconsolata, 13px, uppercase, letter-spacing 0.1em
- Active tab: bottom border `3px solid #C4603A`, text colour `#1C1410`
- Inactive tab: text colour `#9A9088`
- Clicking CREATOR PERSONA → goes to Landing page
- Clicking MANIFESTO → goes to Manifesto page

---

## FOOTER

Appears on **every page** at the very bottom.

```
CREATED, NOT CONSUMED, BY GIFT ABAH
```

- Font: Inconsolata, 12px, uppercase, letter-spacing 0.05em
- Colour: muted `#9A9088`, except "GIFT ABAH" which is `#C4603A` and is a hyperlink
- Link: `https://www.linkedin.com/in/abahgift` — opens in new tab
- Background: `#FDFAF4`
- Top border: `1px solid #D4CEC4`
- Padding: `16px` top and bottom, centred

---

## BOTTOM TAGLINE STRIP

Appears at the bottom of every **quiz question screen** and the **landing page**, just above the footer. This is NOT a footer — it is a content element.

```
Why you should create
For the notes app full of unsent ideas · For the thing you keep meaning to make · For you.
```

- "Why you should create" — Inconsolata, 12px, `#C4603A`, no bold
- The sentence below — Inconsolata, 12px, `#9A9088`
- Top border: `1px solid #D4CEC4`
- Padding: `20px 32px 0`

---

## PAGE 1 — LANDING PAGE
Inspiration to guide you: "C:\Users\DELL\Vibe Coding\anticonsumption\images\Landing.png" 

### Layout (top to bottom):
1. Nav bar
2. Content area (max-width 640px, centred, padding 40px 32px)
3. Bottom tagline strip
4. Footer

### Content area contains:
1. Logo (top left, 52px)
2. Headline: **"What kind of maker are you?"** — Young Serif, 40–48px, `#1C1410`
3. Subtext (Inconsolata, 14px, line-height 1.7):
   > In a world built for consuming, some of us are wired to make.  
   > Take 2 minutes to find out how you create.
4. Illustration card (see below)
5. CTA button: **"let's do this 🖊"**

### Illustration card:
- White card (`#FDFAF4`), border `1px solid #D4CEC4`, border-radius 16px, padding 24px
- Contains 3 illustration images side by side in equal columns
- Each illustration sits in its own sub-card (`#EDE8DF`, border-radius 10px, padding 16px)
- Below the 3 illustrations, centred text in Inconsolata 12px muted:
  > `Thinker · Maker · Storyteller · Connector · Builder · Nurturer`

#### Illustration image paths for landing card:
```
/illustrations/thinker.svg     ← left card
/illustrations/maker.svg       ← centre card
/illustrations/storyteller.svg ← right card
```

### CTA Button:
- Full width, padding 20px
- Background `#C4603A`, text white
- Inconsolata, 15px, letter-spacing 0.05em
- Border-radius 12px
- Hover: background `#B8562E`
- On click: navigate to Quiz, question 1

---

## PAGE 2 — QUIZ FLOW (4 screens)

### Shared layout for all quiz screens:
1. Header row: Logo (left) + [restart button] + [Go back button] (right)
2. Progress label
3. Question text
4. 2×2 grid of answer option cards
5. Bottom tagline strip
6. Footer

### Header row:
- Logo top-left
- Top-right: a small "restart" text link (Inconsolata 12px, muted, no border) + "← Go back" button
- "← Go back" button: white background, border `1px solid #D4CEC4`, border-radius 8px, padding 10px 18px, Inconsolata 13px
- "restart" link: clicking it resets all answers and returns to Landing page
- "← Go back": on Q1 → returns to Landing; on Q2–Q4 → goes to previous question

### Progress label:
- Inconsolata, 12px, `#9A9088`, uppercase, letter-spacing 0.1em
- Format: `1 OF 4 — MEDIUM` / `2 OF 4 — MOTIVATION` / `3 OF 4 — PROCESS` / `4 OF 4 — HOW YOU FINISH`

### Question text:
- Young Serif, 28–36px, `#1C1410`, line-height 1.2
- Margin bottom 36px

### Answer option cards — 2×2 grid:
- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 14px`
- Each card: background `#EDE8DF`, border-radius 12px, padding 22px 20px, text-align centre
- Hover state: background `#E2DBD0`
- **Selected state:** background `#E8824A`, border `2px solid #C4603A`, scale `1.02`, box-shadow `0 4px 16px rgba(196,96,58,0.25)`
- On selection: auto-advance to next question after 280ms delay
- Cards with a label + sub-text: label in Inconsolata bold, `#C4603A` (orange when unselected, white when selected); sub-text in Inconsolata 13px, `#1C1410` (white when selected)
- Cards with only body text (Q2, Q3, Q4 some options): Inconsolata 13.5px, `#1C1410` (white when selected)

### The 4 questions and their options:

---

**Q1 — 1 OF 4 — MEDIUM**  
Inspiration to guide you: "C:\Users\DELL\Vibe Coding\anticonsumption\images\Question 1.png"
*"When you have something to say, how does it usually come out?"*

| Label | Sub-text | Value |
|---|---|---|
| I write it down: | notes, journals, captions, threads | `write` |
| I talk it through: | voice notes, conversations, videos | `talk` |
| I make something: | a design, a photo, a playlist, a dish | `make` |
| I build or organise it: | a plan, a system, a spreadsheet, a business | `build` |

---

**Q2 — 2 OF 4 — MOTIVATION**  
Inspiration to guide you: "C:\Users\DELL\Vibe Coding\anticonsumption\images\Question 2.png"
*"What feeling makes you want to create something?"*

| Full option text | Value |
|---|---|
| When I need to make sense of something confusing | `sense` |
| When I want to connect with or move someone | `connect` |
| When I see something beautiful and want to add to it | `beauty` |
| When I spot a problem and can't stop thinking about the fix | `problem` |

---

**Q3 — 3 OF 4 — PROCESS** 
Inspiration to guide you: "C:\Users\DELL\Vibe Coding\anticonsumption\images\Question 3.png"
*"How do your best ideas usually show up?"*

| Label | Sub-text | Value |
|---|---|---|
| Alone and quiet — | they come when no one's around | `alone` |
| In conversation — | talking is how I think | `convo` |
| Randomly — | in the shower, on a walk, at 2am | `random` |
| From research — | I have to read and gather before anything clicks | `research` |

---

**Q4 — 4 OF 4 — HOW YOU FINISH**  
Inspiration to guide you: "C:\Users\DELL\Vibe Coding\anticonsumption\images\Question 4.png"

*"Be honest — what happens after you start something?"*

| Label | Sub-text | Value |
|---|---|---|
| I usually finish. | Completion is the whole point. | `finish` |
| I get deep into it, | then the next idea pulls me away | `deep` |
| I share it before it's "done". | It's never really done | `share` |
| I refine it forever. | Shipping feels like losing. | `refine` |

---

## PAGE 3 — RESULT PAGE
Inspiration to guide you: "C:\Users\DELL\Vibe Coding\anticonsumption\images\Result_thinker.png"

The result page is a **full standalone page**, not a modal or overlay. It replaces the quiz screen entirely.

### Layout (top to bottom):
1. Header row: Logo (left) + "← Go back" button (right) — same style as quiz header, no restart link here
2. Result card
3. Screenshot nudge text
4. Footer

### Result card:
- White background `#FDFAF4`, border `1px solid #D4CEC4`, border-radius 16px
- Box-shadow: `0 8px 40px rgba(28,20,16,0.08)`
- The card has two sections:

**Top band (the "hero" section):**
- Background: `#EDE8DF`
- Padding: 32px
- Layout: text left, illustration right, both in the same row, illustration sitting at the bottom of the band
- Left side contains:
  - "YOU'RE" — Inconsolata 12px, `#C4603A`, uppercase, letter-spacing 0.12em
  - Persona name — Young Serif, 36–44px, `#1C1410`
- Right side: the persona illustration image (see paths below), no border, bleeds to bottom edge of band

**Bottom section (description + actions):**
- Padding: 28px 32px 32px
- Description text — Inconsolata 14px, `#1C1410`, line-height 1.8, margin-bottom 28px
- Action buttons in a row:
  - **SHARE** — primary orange button (`#C4603A`, white text, padding 14px 28px, border-radius 10px)
  - **RETAKE QUIZ** — secondary button (card background, ink text, border `1.5px solid #D4CEC4`)
  - **read the manifesto** — text link style (muted, underline, no border)

### Screenshot nudge (below result card):
- Inconsolata 12px, `#9A9088`, centred
- Text: `Screenshot this to save or share to your story ✦`

### Share modal (triggered by SHARE button):
- Full-screen overlay with `backdrop-filter: blur(4px)`, background `rgba(28,20,16,0.5)`
- Modal card: white, border-radius 16px, padding 32px, max-width 360px, centred
- Title: Young Serif 24px "Share your type"
- Subtitle: Inconsolata 13px muted "Let people know what kind of maker you are."
- Share options (each as a full-width row with icon + label):
  1. **Twitter / X** → `https://twitter.com/intent/tweet?text=[encoded text]&url=[encoded url]`
  2. **LinkedIn** → `https://www.linkedin.com/sharing/share-offsite/?url=[encoded url]`
  3. **WhatsApp** → `https://wa.me/?text=[encoded text + url]`
  4. **Copy link** → copies current URL to clipboard, shows "Copied!" confirmation
- Share text: `I just found out I'm [Persona Name] on Anticonsumption! [tagline] Find out your creator type →`
- Close button at bottom: full width, border `1.5px solid #D4CEC4`, muted text "close"
- Clicking outside modal closes it

---

## THE 6 PERSONAS — FULL CONTENT

### Scoring logic:

```js
function getPersona(answers) {
  const scores = { thinker: 0, storyteller: 0, maker: 0, connector: 0, builder: 0, nurturer: 0 };
  const [q1, q2, q3, q4] = answers; // each is the `value` string from the question

  // Q1
  if (q1 === "write")  { scores.thinker += 2;     scores.storyteller += 1; }
  if (q1 === "talk")   { scores.storyteller += 2;  scores.connector += 1; }
  if (q1 === "make")   { scores.maker += 2;        scores.nurturer += 1; }
  if (q1 === "build")  { scores.builder += 2;      scores.connector += 1; }

  // Q2
  if (q2 === "sense")   { scores.thinker += 2;     scores.builder += 1; }
  if (q2 === "connect") { scores.storyteller += 2;  scores.nurturer += 1; }
  if (q2 === "beauty")  { scores.maker += 2;        scores.storyteller += 1; }
  if (q2 === "problem") { scores.builder += 2;      scores.thinker += 1; }

  // Q3
  if (q3 === "alone")    { scores.thinker += 2;    scores.maker += 1; }
  if (q3 === "convo")    { scores.connector += 2;  scores.storyteller += 1; }
  if (q3 === "random")   { scores.maker += 2;      scores.nurturer += 1; }
  if (q3 === "research") { scores.builder += 2;    scores.thinker += 1; }

  // Q4
  if (q4 === "finish") { scores.builder += 2;      scores.maker += 1; }
  if (q4 === "deep")   { scores.thinker += 2;      scores.connector += 1; }
  if (q4 === "share")  { scores.storyteller += 2;  scores.connector += 1; }
  if (q4 === "refine") { scores.maker += 2;        scores.thinker += 1; }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}
```

---

### Persona 1 — The Thinker

| Field | Content |
|---|---|
| Key | `thinker` |
| Name | The Thinker |
| Tagline | You create by making sense of the world. |
| Description | You're probably the one sending long voice notes at midnight, or filling a notes app with ideas nobody asked for — yet. Your mind is the studio. Writing, reflecting, theorising — this is how you make. The world needs your perspective written down. |
| Illustration path | `/illustrations/thinker.svg` |

---

### Persona 2 — The Storyteller

| Field | Content |
|---|---|
| Key | `storyteller` |
| Name | The Storyteller |
| Tagline | You create by moving people. |
| Description | You feel things deeply and you know how to make others feel them too. Whether it's a caption, a script, a reel, or a conversation — you're drawn to narrative. You don't just share information. You shape how people feel about it. |
| Illustration path | `/illustrations/storyteller.svg` |

---

### Persona 3 — The Maker

| Field | Content |
|---|---|
| Key | `maker` |
| Name | The Maker |
| Tagline | You create by building tangible things. |
| Description | Your hands — or your tools — are your medium. Design, photography, cooking, craft, music production. You think in textures and outputs. You're not done until you can point at something and say: I made that. |
| Illustration path | `/illustrations/maker.svg` |

---

### Persona 4 — The Connector

| Field | Content |
|---|---|
| Key | `connector` |
| Name | The Connector |
| Tagline | You create by bringing things — and people — together. |
| Description | Your superpower is curation and community. You see how ideas link, how people complement each other, how a room (or a group chat) can become more than the sum of its parts. You create ecosystems. |
| Illustration path | `/illustrations/connector.svg` |

---

### Persona 5 — The Builder

| Field | Content |
|---|---|
| Key | `builder` |
| Name | The Builder |
| Tagline | You create by solving problems. |
| Description | You're drawn to things that are broken, missing, or inefficient. Your creativity lives in systems, structures, and solutions. You might not call yourself creative — but everything you build is an act of creation. |
| Illustration path | `/illustrations/builder.svg` |

---

### Persona 6 — The Nurturer

| Field | Content |
|---|---|
| Key | `nurturer` |
| Name | The Nurturer |
| Tagline | You create by helping others become. |
| Description | You make space. You make people feel seen. You create conditions for growth — in others, in communities, in ideas. Your most important creations might not have your name on them. They have your fingerprints. |
| Illustration path | `/illustrations/nurturer.svg` |

---

## PAGE 4 — MANIFESTO PAGE

### Layout (top to bottom):
1. Nav bar (MANIFESTO tab is active)
2. Content area (max-width 720px, centred, padding 40px 32px)
3. Footer

### Content area contains:
1. Logo (top-left, 52px)
2. Title: **"Manifesto"** — Young Serif, 48–56px, `#1C1410`
3. Three-sentence body text (Inconsolata 15px, line-height 1.9, max-width 600px):
   > We were not built to scroll. Every tool ever made — language, paint, the internet — began as a way to make something, not just receive it. This is a small reminder that you are not just an audience. Made with 🩷
4. Community card

### Community card:
- Background `#F0EDEA`, border-radius 16px, padding 36px 32px, border `1px solid #D4CEC4`
- Top section: a grid of circular avatar images (see paths below)
- Bottom: two-line centred text in Young Serif, ~28–30px:
  - Line 1: **Everyone** (in `#C4603A`) **should**
  - Line 2: **be** **creating...** (where "creating..." is in `#C4603A`)

### Avatar image paths for manifesto community card:
> **Replace these with your actual image paths once available.**  
> Currently placeholder — use 12 circular avatar images, displayed in two rows:  
> Row 1: 8 images  
> Row 2: 4 images, centred

```
/avatars/avatar01.png
/avatars/avatar02.png
/avatars/avatar03.png
/avatars/avatar04.png
/avatars/avatar05.png
/avatars/avatar06.png
/avatars/avatar07.png
/avatars/avatar08.png
/avatars/avatar09.png
/avatars/avatar10.png
/avatars/avatar11.png
/avatars/avatar12.png
```

Each avatar:
- `width: 46px; height: 46px; border-radius: 50%; border: 2.5px solid white; object-fit: cover`

---

## SPARK — THE EASTER EGG MASCOT

Spark is a small illustrated character that appears in the **bottom-right corner** of the screen after the user has been idle for **8 seconds**. It is a warm presence, not an interruption.

### Behaviour:
- Trigger: 8 seconds of user inactivity (no mouse move, scroll, click, or keypress)
- **First appearance:** shows tooltip message: `"Still here? Make something."`
- **Second appearance** (after user dismisses and goes idle again): `"Even a sentence counts."`
- After 2nd dismissal: Spark does not appear again for that session
- The ✕ dismiss button closes Spark immediately
- Spark never repeats the same message twice in a row
- Spark resets idle timer on every user interaction
- Spark can appear on **any page** — landing, quiz, result, or manifesto

### Visual description:
Spark is a small illustrated person (approximately 85px tall) who appears to be working on a laptop, leaning forward with energy. The character is rendered in the app's colour palette (orange body, dark hair, warm skin tones). Above Spark is a speech bubble tooltip.

### Spark image path:
```
/images/Mascot_Spark.svg
```
> Use this SVG file for the Spark character. Do not draw Spark in code — load from this path.

### Spark tooltip bubble:
- Background `#FBF5E6`
- Border: `1.5px solid #E8824A`
- Border-radius: 12px
- Padding: 12px 16px
- Box-shadow: `0 4px 20px rgba(196,96,58,0.15)`
- Font: Inconsolata 13px, `#1C1410`, line-height 1.5
- ✕ button: top-right of bubble, Inconsolata 14px, muted colour, no background, no border
- The bubble sits **above** the character illustration
- Margin between bubble bottom and character top: 8px

### Spark container positioning:
```css
position: fixed;
bottom: 20px;
right: 20px;
z-index: 1000;
display: flex;
flex-direction: column;
align-items: flex-end;
```

### Spark entrance animation:
```css
@keyframes sparkIn {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0)    scale(1);   }
}
animation: sparkIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
```

---

## APP STATE STRUCTURE

```js
// Pages
const [page, setPage] = useState("landing");
// Values: "landing" | "quiz" | "result" | "manifesto"

// Quiz
const [questionIndex, setQuestionIndex] = useState(0);
// Values: 0 | 1 | 2 | 3

const [answers, setAnswers] = useState([null, null, null, null]);
// Each index maps to a question; value is the option's `value` string or null

// Result
const [personaKey, setPersonaKey] = useState(null);
// Values: "thinker" | "storyteller" | "maker" | "connector" | "builder" | "nurturer"

// Spark
const [sparkShow, setSparkShow] = useState(false);
const [sparkMessage, setSparkMessage] = useState("Still here? Make something.");
const [sparkDismissed, setSparkDismissed] = useState(false);
const sparkCount = useRef(0);
const idleTimer = useRef(null);
```

---

## NAVIGATION FLOW

```
Landing
  ├── [let's do this] → Quiz Q1
  └── [MANIFESTO nav] → Manifesto

Quiz Q1
  ├── [select answer] → Quiz Q2 (after 280ms)
  ├── [← Go back]    → Landing
  └── [restart]      → Landing (resets all answers)

Quiz Q2
  ├── [select answer] → Quiz Q3
  ├── [← Go back]    → Quiz Q1
  └── [restart]      → Landing

Quiz Q3
  ├── [select answer] → Quiz Q4
  ├── [← Go back]    → Quiz Q2
  └── [restart]      → Landing

Quiz Q4
  ├── [select answer] → Result (after 280ms, compute persona)
  ├── [← Go back]    → Quiz Q3
  └── [restart]      → Landing

Result
  ├── [SHARE]             → Share modal
  ├── [RETAKE QUIZ]       → Landing (resets all answers)
  ├── [read the manifesto]→ Manifesto
  └── [← Go back]        → Quiz Q4

Manifesto
  ├── [CREATOR PERSONA nav] → Landing
  └── No quiz access directly (user goes to Landing first)
```

---

## ANIMATIONS & TRANSITIONS

| Interaction | Animation |
|---|---|
| Option card hover | `background` transitions in 0.18s ease |
| Option card selected | `transform: scale(1.02)` + box-shadow, 0.18s ease |
| Page transitions | Simple fade or instant swap — keep it clean, no sliding |
| Share modal open | `slideUp` — opacity 0→1, translateY 16px→0, 0.3s ease |
| Spark appearance | `sparkIn` — see above, 0.5s cubic-bezier bounce |
| CTA button press | `transform: scale(0.99)` on mousedown |
| All colour transitions | `transition: background 0.2s` on buttons and cards |

---

## RESPONSIVE BEHAVIOUR

The app is designed mobile-first. The content container should be centred with a max-width:

| Page | Max-width |
|---|---|
| Landing | 640px |
| Quiz | 640px |
| Result | 680px |
| Manifesto | 720px |

- Padding: 32px on sides (desktop), 20px on mobile (below 480px)
- The 2×2 option grid stays as 2 columns down to 360px wide
- The result card hero section (text + illustration) stacks vertically on mobile (illustration moves above text)
- Nav tabs remain side by side at all screen sizes
- Spark appears at `bottom: 20px; right: 20px` on all screen sizes; on very small screens reduce character size to 65px

---

## ASSET DIRECTORY STRUCTURE

```
/illustrations/
  thinker.svg       ← The Thinker persona illustration
  storyteller.svg   ← The Storyteller persona illustration
  maker.svg         ← The Maker persona illustration
  connector.svg     ← The Connector persona illustration
  builder.svg       ← The Builder persona illustration
  nurturer.svg      ← The Nurturer persona illustration
/avatars/
  avatar01.png     ← Community grid avatars (12 total)
  avatar02.png
  avatar03.png
  avatar04.png
  avatar05.png
  avatar06.png
  avatar07.png
  avatar08.png
  avatar09.png
  avatar10.png
  avatar11.png
  avatar12.png
/images/
    Mascot_Spark.svg  ← Spark character illustration
```

> **IMPORTANT FOR AI TOOLS:** Do not generate placeholder illustrations or emoji substitutes. Load every illustration from its exact path above using `<img src="..." />`. If a file is missing, show a clearly labelled empty box so the developer knows what to replace.

---

## WHAT NOT TO DO — CRITICAL CONSTRAINTS

1. **Never use Inter, Roboto, Arial, or any system sans-serif as the primary font.** Only Young Serif and Inconsolata.
2. **Never use pure black or pure white.** Use `#1C1410` and `#FDFAF4`.
3. **Never show the result as a modal or overlay.** It is a full page.
4. **Never use a progress bar** for the quiz. Only the text label `"X OF 4 — LABEL"`.
5. **Never generate SVG illustrations in code** for the personas or Spark. Load from file paths.
6. **Never add extra pages or sections** not described in this document.
7. **Never add cookie banners, newsletter popups, or any unsolicited overlays** — Spark is the only overlay element, and it is earned by idle behaviour.
8. **Never make the quiz feel like a form.** No submit buttons. Selection auto-advances.
9. **Never use gradients** on backgrounds or cards. Flat, warm solid colours only.
10. **Never use drop shadows heavier than:** `0 8px 40px rgba(28,20,16,0.08)` on the result card. Everything else is borderless or very subtle.

---

## CREDITS & LINKS

| Item | Value |
|---|---|
| Creator | Gift Abah |
| LinkedIn | https://www.linkedin.com/in/abahgift |
| Footer text | CREATED, NOT CONSUMED, BY GIFT ABAH |
| App name | Anticonsumption |
| App tagline | What kind of maker are you? |

---

## PROMPT INSTRUCTION FOR AI TOOLS

When handing this document to any AI coding tool (Cursor, v0, Bolt, ChatGPT, Claude, etc.), use the following prompt:

---

> **Prompt to paste:**
>
> "Build the complete Anticonsumption web app as a single React JSX file following the ANTICONSUMPTION_MASTER.md document exactly. 
>
> Requirements:
> - Single file React JSX output only
> - Use exactly the fonts, colours, content, layout, and logic specified in the document
> - Load all illustrations from the SVG paths specified — do not generate them in code
> - Load the Spark mascot from `/images/Mascot_Spark.svg` — do not draw it in code
> - Inject the Google Fonts embed code into the document head via useEffect
> - Implement the full scoring logic and all 6 persona results
> - Implement Spark idle detection with the exact behaviour described
> - Implement the Share modal with Twitter/X, LinkedIn, WhatsApp, and copy link
> - The result page must be a full page, not a modal
> - Follow the navigation flow exactly as diagrammed
> - Do not add anything not described in this document
> - Do not use Tailwind — use inline styles only, referencing the exact colour values from the document"

---

*End of document. Version 1.0. Built with care by Gift Abah + Claude.*
