import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#F5F0E8",
  white: "#FDFAF4",
  ink: "#1C1410",
  orange: "#C4603A",
  orangeLight: "#E8824A",
  sage: "#8A9E85",
  card: "#EDE8DF",
  cardHover: "#E2DBD0",
  border: "#D4CEC4",
  muted: "#9A9088",
};

const questions = [
  {
    id: 1,
    label: "1 OF 4 — MEDIUM",
    question: "When you have something to say, how does it usually come out?",
    options: [
      { label: "I write it down:", sub: "notes, journals, captions, threads", value: "write" },
      { label: "I talk it through:", sub: "voice notes, conversations, videos", value: "talk" },
      { label: "I make something:", sub: "a design, a photo, a playlist, a dish", value: "make" },
      { label: "I build or organise it:", sub: "a plan, a system, a spreadsheet, a business", value: "build" },
    ],
  },
  {
    id: 2,
    label: "2 OF 4 — MOTIVATION",
    question: "What feeling makes you want to create something?",
    options: [
      { label: "When I need to make sense of something confusing", value: "sense" },
      { label: "When I want to connect with or move someone", value: "connect" },
      { label: "When I see something beautiful and want to add to it", value: "beauty" },
      { label: "When I spot a problem and can't stop thinking about the fix", value: "problem" },
    ],
  },
  {
    id: 3,
    label: "3 OF 4 — PROCESS",
    question: "How do your best ideas usually show up?",
    options: [
      { label: "Alone and quiet —", sub: "they come when no one's around", value: "alone" },
      { label: "In conversation —", sub: "talking is how I think", value: "convo" },
      { label: "Randomly —", sub: "in the shower, on a walk, at 2am", value: "random" },
      { label: "From research —", sub: "I have to read and gather before anything clicks", value: "research" },
    ],
  },
  {
    id: 4,
    label: "4 OF 4 — HOW YOU FINISH",
    question: "Be honest — what happens after you start something?",
    options: [
      { label: "I usually finish.", sub: "Completion is the whole point.", value: "finish" },
      { label: "I get deep into it,", sub: "then the next idea pulls me away", value: "deep" },
      { label: "I share it before it's \"done\".", sub: "It's never really done", value: "share" },
      { label: "I refine it forever.", sub: "Shipping feels like losing.", value: "refine" },
    ],
  },
];

const personas = {
  thinker: {
    name: "The Thinker",
    tagline: "You create by making sense of the world.",
    description: "You're probably the one sending long voice notes at midnight, or filling a notes app with ideas nobody asked for — yet. Your mind is the studio. Writing, reflecting, theorising — this is how you make. The world needs your perspective written down.",
    emoji: "💡",
    color: "#F5C842",
    illustration: ThinkerIllustration,
  },
  storyteller: {
    name: "The Storyteller",
    tagline: "You create by moving people.",
    description: "You feel things deeply and you know how to make others feel them too. Whether it's a caption, a script, a reel, or a conversation — you're drawn to narrative. You don't just share information. You shape how people feel about it.",
    emoji: "☕",
    color: "#E8824A",
    illustration: StorytellerIllustration,
  },
  maker: {
    name: "The Maker",
    tagline: "You create by building tangible things.",
    description: "Your hands — or your tools — are your medium. Design, photography, cooking, craft, music production. You think in textures and outputs. You're not done until you can point at something and say: I made that.",
    emoji: "🎨",
    color: "#C4603A",
    illustration: MakerIllustration,
  },
  connector: {
    name: "The Connector",
    tagline: "You create by bringing things — and people — together.",
    description: "Your superpower is curation and community. You see how ideas link, how people complement each other, how a room (or a group chat) can become more than the sum of its parts. You create ecosystems.",
    emoji: "🧩",
    color: "#8A9E85",
    illustration: ConnectorIllustration,
  },
  builder: {
    name: "The Builder",
    tagline: "You create by solving problems.",
    description: "You're drawn to things that are broken, missing, or inefficient. Your creativity lives in systems, structures, and solutions. You might not call yourself creative — but everything you build is an act of creation.",
    emoji: "🔧",
    color: "#6B8CAE",
    illustration: BuilderIllustration,
  },
  nurturer: {
    name: "The Nurturer",
    tagline: "You create by helping others become.",
    description: "You make space. You make people feel seen. You create conditions for growth — in others, in communities, in ideas. Your most important creations might not have your name on them. They have your fingerprints.",
    emoji: "🌱",
    color: "#C4A882",
    illustration: NurturerIllustration,
  },
};

function getPersona(answers) {
  const scores = { thinker: 0, storyteller: 0, maker: 0, connector: 0, builder: 0, nurturer: 0 };
  const [q1, q2, q3, q4] = answers;
  if (q1 === "write") { scores.thinker += 2; scores.storyteller += 1; }
  if (q1 === "talk") { scores.storyteller += 2; scores.connector += 1; }
  if (q1 === "make") { scores.maker += 2; scores.nurturer += 1; }
  if (q1 === "build") { scores.builder += 2; scores.connector += 1; }
  if (q2 === "sense") { scores.thinker += 2; scores.builder += 1; }
  if (q2 === "connect") { scores.storyteller += 2; scores.nurturer += 1; }
  if (q2 === "beauty") { scores.maker += 2; scores.storyteller += 1; }
  if (q2 === "problem") { scores.builder += 2; scores.thinker += 1; }
  if (q3 === "alone") { scores.thinker += 2; scores.maker += 1; }
  if (q3 === "convo") { scores.connector += 2; scores.storyteller += 1; }
  if (q3 === "random") { scores.maker += 2; scores.nurturer += 1; }
  if (q3 === "research") { scores.thinker += 1; scores.builder += 2; }
  if (q4 === "finish") { scores.builder += 2; scores.maker += 1; }
  if (q4 === "deep") { scores.thinker += 2; scores.connector += 1; }
  if (q4 === "share") { scores.storyteller += 2; scores.connector += 1; }
  if (q4 === "refine") { scores.maker += 2; scores.thinker += 1; }
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

// SVG Illustrations
function ThinkerIllustration() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="130" cy="55" r="38" fill="#F5C842" opacity="0.9"/>
      <path d="M118 55 L130 30 L142 55" stroke="#1C1410" strokeWidth="2.5" fill="none"/>
      <circle cx="130" cy="55" r="6" fill="#1C1410"/>
      {[0,45,90,135,180,225,270,315].map((deg,i) => (
        <line key={i} x1={130 + 22*Math.cos(deg*Math.PI/180)} y1={55 + 22*Math.sin(deg*Math.PI/180)}
          x2={130 + 30*Math.cos(deg*Math.PI/180)} y2={55 + 30*Math.sin(deg*Math.PI/180)}
          stroke="#1C1410" strokeWidth="2"/>
      ))}
      <ellipse cx="72" cy="115" rx="35" ry="42" fill="#C4603A"/>
      <ellipse cx="72" cy="85" rx="22" ry="24" fill="#FDDBB4"/>
      <circle cx="64" cy="82" r="3.5" fill="#1C1410"/>
      <circle cx="80" cy="82" r="3.5" fill="#1C1410"/>
      <path d="M60 95 Q72 102 84 95" stroke="#1C1410" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M50 95 Q45 110 48 125" stroke="#FDDBB4" strokeWidth="8" strokeLinecap="round"/>
      <path d="M48 125 Q52 132 58 128" stroke="#FDDBB4" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="65" cy="79" r="5" fill="none" stroke="#1C1410" strokeWidth="1.5"/>
      <circle cx="79" cy="79" r="5" fill="none" stroke="#1C1410" strokeWidth="1.5"/>
    </svg>
  );
}

function MakerIllustration() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="30" width="75" height="90" rx="8" fill="#E8824A" transform="rotate(12 80 30)"/>
      <rect x="84" y="34" width="67" height="82" rx="6" fill="#FDFAF4" transform="rotate(12 84 34)"/>
      <circle cx="148" cy="48" r="14" fill="#1C1410"/>
      <path d="M142 48 L148 40 L154 48 L148 56 Z" fill="white"/>
      <path d="M40 90 Q45 70 60 75 Q70 78 68 95 Q66 112 50 118 Q35 122 40 90Z" fill="#FDDBB4"/>
      <path d="M60 75 Q75 65 80 75 Q85 85 75 90" stroke="#FDDBB4" strokeWidth="10" strokeLinecap="round"/>
      <path d="M75 90 Q88 95 95 85" stroke="#FDDBB4" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="52" cy="92" r="2.5" fill="#1C1410"/>
      <circle cx="62" cy="90" r="2.5" fill="#1C1410"/>
      <path d="M49 101 Q57 107 66 101" stroke="#C4603A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="130" cy="25" r="5" fill="#F5C842" opacity="0.8"/>
      <circle cx="145" cy="15" r="3" fill="#C4603A" opacity="0.6"/>
      <circle cx="155" cy="30" r="4" fill="#8A9E85" opacity="0.7"/>
    </svg>
  );
}

function StorytellerIllustration() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="90" y="60" width="75" height="55" rx="10" fill="#E8824A"/>
      <rect x="96" y="66" width="63" height="43" rx="7" fill="#FDFAF4"/>
      <line x1="103" y1="78" x2="152" y2="78" stroke="#D4CEC4" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="103" y1="87" x2="145" y2="87" stroke="#D4CEC4" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="103" y1="96" x2="138" y2="96" stroke="#D4CEC4" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M115 115 L110 130 L125 122Z" fill="#E8824A"/>
      <circle cx="155" cy="30" r="4" fill="#F5C842"/>
      <path d="M148 35 Q150 25 158 27" stroke="#F5C842" strokeWidth="2" fill="none"/>
      <path d="M30 55 Q35 30 60 35 Q75 38 72 58 Q69 75 50 80 Q32 84 30 55Z" fill="#FDDBB4"/>
      <path d="M60 35 Q80 20 90 35 Q95 48 80 55" stroke="#FDDBB4" strokeWidth="14" strokeLinecap="round"/>
      <circle cx="45" cy="55" r="3" fill="#1C1410"/>
      <circle cx="58" cy="53" r="3" fill="#1C1410"/>
      <path d="M42 66 Q52 74 63 66" stroke="#C4603A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M72 58 Q80 70 78 85 Q76 98 85 100" stroke="#FDDBB4" strokeWidth="10" strokeLinecap="round"/>
      <path d="M85 100 Q92 103 90 110" stroke="#FDDBB4" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  );
}

function ConnectorIllustration() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="25" width="60" height="55" rx="6" fill="#E8824A"/>
      <rect x="62" y="32" width="46" height="42" rx="4" fill="#1C1410"/>
      <rect x="88" y="75" width="12" height="8" fill="#E8824A"/>
      <rect x="78" y="83" width="32" height="5" rx="2" fill="#C4603A"/>
      <rect x="95" y="55" width="55" height="45" rx="6" fill="#1C1410" transform="rotate(8 95 55)"/>
      <rect x="100" y="60" width="45" height="35" rx="4" fill="#FDFAF4" transform="rotate(8 100 60)"/>
      <circle cx="92" cy="68" r="18" fill="none" stroke="#F5C842" strokeWidth="3" strokeDasharray="5 3"/>
      <circle cx="38" cy="110" r="15" fill="#8A9E85"/>
      <circle cx="78" cy="130" r="15" fill="#C4603A"/>
      <circle cx="118" cy="118" r="15" fill="#E8824A"/>
      <line x1="50" y1="115" x2="65" y2="125" stroke="#1C1410" strokeWidth="2.5"/>
      <line x1="92" y1="125" x2="105" y2="120" stroke="#1C1410" strokeWidth="2.5"/>
    </svg>
  );
}

function BuilderIllustration() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="75" y="20" width="80" height="110" rx="8" fill="#EDE8DF" stroke="#D4CEC4" strokeWidth="1.5"/>
      <rect x="82" y="28" width="66" height="8" rx="2" fill="#C4603A"/>
      <rect x="82" y="42" width="50" height="4" rx="2" fill="#D4CEC4"/>
      <rect x="82" y="50" width="60" height="4" rx="2" fill="#D4CEC4"/>
      <rect x="82" y="58" width="45" height="4" rx="2" fill="#D4CEC4"/>
      <rect x="82" y="72" width="30" height="25" rx="4" fill="#8A9E85" opacity="0.7"/>
      <rect x="118" y="72" width="30" height="25" rx="4" fill="#E8824A" opacity="0.7"/>
      <rect x="82" y="103" width="66" height="4" rx="2" fill="#D4CEC4"/>
      <path d="M25 80 Q30 55 55 62 Q70 67 65 90 Q60 108 42 112 Q24 115 25 80Z" fill="#FDDBB4"/>
      <path d="M55 62 Q70 48 80 60 Q87 70 75 78" stroke="#FDDBB4" strokeWidth="12" strokeLinecap="round"/>
      <path d="M65 90 Q68 105 60 120 Q55 128 58 138" stroke="#C4603A" strokeWidth="9" strokeLinecap="round"/>
      <circle cx="39" cy="80" r="3" fill="#1C1410"/>
      <circle cx="52" cy="78" r="3" fill="#1C1410"/>
      <path d="M36 91 Q46 98 57 91" stroke="#1C1410" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="155" cy="35" r="8" fill="#F5C842" opacity="0.6"/>
      <circle cx="168" cy="52" r="5" fill="#C4603A" opacity="0.5"/>
    </svg>
  );
}

function NurturerIllustration() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M65 130 Q55 100 70 80 Q80 65 95 70 Q110 65 120 80 Q135 100 125 130Z" fill="#E8824A"/>
      <path d="M95 70 Q95 45 95 35" stroke="#8A9E85" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="95" cy="28" rx="12" ry="15" fill="#F5C842" opacity="0.9"/>
      <circle cx="91" cy="25" r="2" fill="#1C1410"/>
      <circle cx="99" cy="25" r="2" fill="#1C1410"/>
      <path d="M89 33 Q95 37 101 33" stroke="#C4603A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M45 95 Q35 80 45 68 Q52 60 62 68 Q70 62 78 72" stroke="#FDDBB4" strokeWidth="14" strokeLinecap="round" fill="none"/>
      <path d="M78 72 Q85 82 80 95" stroke="#FDDBB4" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M115 90 Q125 75 138 80 Q148 85 145 98 Q142 110 130 112" stroke="#FDDBB4" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <circle cx="32" cy="68" r="5" fill="#F5C842" opacity="0.7"/>
      <circle cx="155" cy="75" r="4" fill="#8A9E85" opacity="0.7"/>
      <path d="M20 85 L25 80 L30 85 L25 90 Z" fill="#C4603A" opacity="0.5"/>
      <path d="M158 90 L163 85 L168 90 L163 95 Z" fill="#F5C842" opacity="0.5"/>
    </svg>
  );
}

// ---- SPARK MASCOT ----
function Spark({ show, message, onDismiss }) {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", bottom: "20px", right: "20px", zIndex: 1000,
      display: "flex", flexDirection: "column", alignItems: "flex-end",
      animation: "sparkIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
    }}>
      <div style={{
        background: "#FBF5E6", border: "1.5px solid #E8824A", borderRadius: "12px",
        padding: "12px 16px", marginBottom: "8px", maxWidth: "180px",
        boxShadow: "0 4px 20px rgba(196,96,58,0.15)", position: "relative",
      }}>
        <p style={{ fontFamily: "Consolas, monospace", fontSize: "13px", color: COLORS.ink, margin: 0, lineHeight: 1.5 }}>
          {message}
        </p>
        <button onClick={onDismiss} style={{
          position: "absolute", top: "6px", right: "8px", background: "none", border: "none",
          cursor: "pointer", fontSize: "14px", color: COLORS.muted, padding: "2px",
        }}>✕</button>
      </div>
      <svg width="90" height="85" viewBox="0 0 90 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="40" width="50" height="35" rx="4" fill="#1C1410" transform="rotate(-15 15 40)"/>
        <rect x="20" y="44" width="40" height="27" rx="3" fill="#4A9B7F" transform="rotate(-15 20 44)"/>
        <ellipse cx="55" cy="25" rx="15" ry="18" fill="#FDDBB4"/>
        <circle cx="50" cy="22" r="2.5" fill="#1C1410"/>
        <circle cx="60" cy="22" r="2.5" fill="#1C1410"/>
        <path d="M49 30 Q55 34 61 30" stroke="#C4603A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M35 48 Q20 52 18 65" stroke="#FDDBB4" strokeWidth="8" strokeLinecap="round"/>
        <path d="M65 44 Q78 40 80 50 Q82 58 72 62" stroke="#FDDBB4" strokeWidth="8" strokeLinecap="round"/>
        <path d="M42 75 Q38 82 32 80" stroke="#1C1410" strokeWidth="6" strokeLinecap="round"/>
        <path d="M52 76 Q55 83 62 82" stroke="#1C1410" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="72" cy="15" r="5" fill="#F5C842" opacity="0.8"/>
        <circle cx="82" cy="25" r="3" fill="#E8824A" opacity="0.7"/>
      </svg>
    </div>
  );
}

// ---- SHARE MODAL ----
function ShareModal({ persona, onClose }) {
  const text = `I just found out I'm ${persona.name} on Anticonsumption! ${persona.tagline} Find out your creator type →`;
  const url = window.location.href;
  const shareLinks = [
    {
      name: "Twitter / X",
      icon: "𝕏",
      color: "#000",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: "in",
      color: "#0A66C2",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: "W",
      color: "#25D366",
      href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    },
  ];
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(28,20,16,0.5)", zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(4px)",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: COLORS.white, borderRadius: "16px", padding: "32px",
        maxWidth: "360px", width: "90%",
        boxShadow: "0 20px 60px rgba(28,20,16,0.2)",
        animation: "slideUp 0.3s ease",
      }}>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", color: COLORS.ink, marginBottom: "8px" }}>
          Share your type
        </h3>
        <p style={{ fontFamily: "Consolas, monospace", fontSize: "13px", color: COLORS.muted, marginBottom: "24px" }}>
          Let people know what kind of maker you are.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {shareLinks.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "14px 18px", borderRadius: "10px", background: COLORS.card,
              textDecoration: "none", color: COLORS.ink, transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.cardHover}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.card}
            >
              <span style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: s.color, display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: "bold", fontSize: "14px", flexShrink: 0,
              }}>{s.icon}</span>
              <span style={{ fontFamily: "Consolas, monospace", fontSize: "14px" }}>{s.name}</span>
            </a>
          ))}
          <button onClick={copyLink} style={{
            display: "flex", alignItems: "center", gap: "14px",
            padding: "14px 18px", borderRadius: "10px", background: COLORS.card,
            border: "none", cursor: "pointer", color: COLORS.ink, transition: "background 0.2s",
            width: "100%",
          }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.cardHover}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.card}
          >
            <span style={{
              width: "36px", height: "36px", borderRadius: "8px", background: COLORS.border,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0,
            }}>🔗</span>
            <span style={{ fontFamily: "Consolas, monospace", fontSize: "14px" }}>
              {copied ? "Copied!" : "Copy link"}
            </span>
          </button>
        </div>
        <button onClick={onClose} style={{
          marginTop: "20px", width: "100%", padding: "12px",
          background: "none", border: `1.5px solid ${COLORS.border}`, borderRadius: "8px",
          fontFamily: "Consolas, monospace", fontSize: "13px", color: COLORS.muted,
          cursor: "pointer",
        }}>close</button>
      </div>
    </div>
  );
}

// ---- QUIZ OPTION CARD ----
function OptionCard({ option, selected, onClick }) {
  const hasLabel = option.label && option.sub;
  return (
    <button onClick={onClick} style={{
      background: selected ? "#E8824A" : COLORS.card,
      border: selected ? "2px solid #C4603A" : `2px solid transparent`,
      borderRadius: "12px", padding: "22px 20px",
      cursor: "pointer", textAlign: "center",
      transition: "all 0.18s ease",
      transform: selected ? "scale(1.02)" : "scale(1)",
      boxShadow: selected ? "0 4px 16px rgba(196,96,58,0.25)" : "none",
    }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = COLORS.cardHover; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = COLORS.card; }}
    >
      {hasLabel ? (
        <>
          <div style={{
            fontFamily: "Consolas, monospace", fontSize: "14px", fontWeight: "bold",
            color: selected ? COLORS.white : COLORS.orange, marginBottom: "6px",
          }}>{option.label}</div>
          <div style={{
            fontFamily: "Consolas, monospace", fontSize: "13px",
            color: selected ? "rgba(255,255,255,0.85)" : COLORS.ink, lineHeight: 1.5,
          }}>{option.sub}</div>
        </>
      ) : (
        <div style={{
          fontFamily: "Consolas, monospace", fontSize: "13.5px",
          color: selected ? COLORS.white : COLORS.ink, lineHeight: 1.6,
        }}>{option.label}</div>
      )}
    </button>
  );
}

// ---- LOGO ----
function Logo({ size = 48 }) {
  return (
    <div style={{
      width: size, height: size, position: "relative", flexShrink: 0,
    }}>
      <svg width={size} height={size} viewBox="0 0 48 48">
        <rect x="12" y="12" width="24" height="24" fill="none" stroke={COLORS.orange} strokeWidth="1.5"/>
        {["ANTI", "·CON", "SUMP", "TION"].map((word, i) => {
          const angle = i * 90;
          const x = 24, y = 24;
          return (
            <text key={i} x={x} y={y}
              fontFamily="Consolas, monospace" fontSize="6" fill={COLORS.orange}
              textAnchor="middle" dominantBaseline="middle"
              transform={`rotate(${angle}, ${x}, ${y}) translate(0, -18)`}
            >{word}</text>
          );
        })}
      </svg>
    </div>
  );
}

// ---- FOOTER STRIP ----
function FooterStrip() {
  return (
    <div style={{
      padding: "16px 0", textAlign: "center",
      borderTop: `1px solid ${COLORS.border}`,
      background: COLORS.white,
    }}>
      <span style={{ fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.muted, letterSpacing: "0.05em" }}>
        CREATED, NOT CONSUMED, BY{" "}
        <a href="https://www.linkedin.com/in/abahgift" target="_blank" rel="noopener noreferrer"
          style={{ color: COLORS.orange, textDecoration: "none", fontWeight: "bold" }}>
          GIFT ABAH
        </a>
      </span>
    </div>
  );
}

// ---- BOTTOM TAGLINE ----
function BottomTagline() {
  return (
    <div style={{ padding: "20px 32px 0", borderTop: `1px solid ${COLORS.border}` }}>
      <p style={{ fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.orange, margin: "0 0 4px" }}>
        Why you should create
      </p>
      <p style={{ fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.muted, margin: 0 }}>
        For the notes app full of unsent ideas · For the thing you keep meaning to make · For you.
      </p>
    </div>
  );
}

// ---- LANDING PAGE ----
function LandingPage({ onStart, onManifesto }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <nav style={{
        display: "flex", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.white,
      }}>
        <button onClick={onStart} style={{
          flex: 1, padding: "18px", fontFamily: "Consolas, monospace", fontSize: "13px",
          letterSpacing: "0.1em", color: COLORS.ink, background: COLORS.white,
          border: "none", cursor: "pointer", borderRight: `1px solid ${COLORS.border}`,
        }}>CREATOR PERSONA</button>
        <button onClick={onManifesto} style={{
          flex: 1, padding: "18px", fontFamily: "Consolas, monospace", fontSize: "13px",
          letterSpacing: "0.1em", color: COLORS.ink, background: COLORS.white,
          border: "none", cursor: "pointer",
        }}>MANIFESTO</button>
      </nav>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: "640px", margin: "0 auto", padding: "40px 32px", width: "100%" }}>
        <Logo size={52} />
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 5vw, 48px)",
          color: COLORS.ink, margin: "28px 0 16px", lineHeight: 1.15,
        }}>
          What kind of maker are you?
        </h1>
        <p style={{
          fontFamily: "Consolas, monospace", fontSize: "14px", color: COLORS.ink,
          lineHeight: 1.7, margin: "0 0 32px",
        }}>
          In a world built for consuming, some of us are wired to make.<br />
          Take 2 minutes to find out how you create.
        </p>

        {/* Illustration strip */}
        <div style={{
          background: COLORS.white, borderRadius: "16px", padding: "24px",
          marginBottom: "24px", border: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            {[ThinkerIllustration, MakerIllustration, StorytellerIllustration].map((Illus, i) => (
              <div key={i} style={{
                flex: 1, background: COLORS.card, borderRadius: "10px",
                padding: "16px 8px", display: "flex", justifyContent: "center", alignItems: "center",
                minHeight: "100px",
              }}>
                <div style={{ transform: "scale(0.65)", transformOrigin: "center" }}>
                  <Illus />
                </div>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.muted,
            textAlign: "center", margin: 0, letterSpacing: "0.08em",
          }}>
            Thinker · Maker · Storyteller · Connector · Builder · Nurturer
          </p>
        </div>

        <button onClick={onStart} style={{
          width: "100%", padding: "20px", background: COLORS.orange, color: "white",
          border: "none", borderRadius: "12px", fontFamily: "Consolas, monospace",
          fontSize: "15px", cursor: "pointer", letterSpacing: "0.05em",
          transition: "background 0.2s, transform 0.1s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#B8562E"}
          onMouseLeave={e => e.currentTarget.style.background = COLORS.orange}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.99)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          let's do this 🖊
        </button>

        <div style={{ marginTop: "40px" }}>
          <BottomTagline />
        </div>
      </div>
      <FooterStrip />
    </div>
  );
}

// ---- QUIZ PAGE ----
function QuizPage({ questionIndex, answers, onAnswer, onBack, onRestart }) {
  const q = questions[questionIndex];
  const selected = answers[questionIndex];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, maxWidth: "640px", margin: "0 auto", padding: "32px 32px 0", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <Logo size={44} />
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button onClick={onRestart} style={{
              fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.muted,
              background: "none", border: "none", cursor: "pointer", padding: "8px",
              letterSpacing: "0.05em",
            }}>restart</button>
            <button onClick={onBack} style={{
              fontFamily: "Consolas, monospace", fontSize: "13px", color: COLORS.ink,
              background: COLORS.white, border: `1px solid ${COLORS.border}`,
              borderRadius: "8px", padding: "10px 18px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px",
            }}>← Go back</button>
          </div>
        </div>

        <p style={{
          fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.muted,
          letterSpacing: "0.1em", margin: "0 0 20px",
        }}>{q.label}</p>

        <h2 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: "clamp(24px, 4vw, 36px)",
          color: COLORS.ink, lineHeight: 1.2, margin: "0 0 36px",
        }}>{q.question}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "40px" }}>
          {q.options.map(opt => (
            <OptionCard key={opt.value} option={opt} selected={selected === opt.value}
              onClick={() => onAnswer(questionIndex, opt.value)} />
          ))}
        </div>

        <BottomTagline />
      </div>
      <div style={{ height: "20px" }} />
      <FooterStrip />
    </div>
  );
}

// ---- RESULT PAGE ----
function ResultPage({ personaKey, onRestart, onManifesto }) {
  const persona = personas[personaKey];
  const IllusComp = persona.illustration;
  const [showShare, setShowShare] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, maxWidth: "680px", margin: "0 auto", padding: "32px 32px 0", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <Logo size={44} />
          <button onClick={onRestart} style={{
            fontFamily: "Consolas, monospace", fontSize: "13px", color: COLORS.ink,
            background: COLORS.white, border: `1px solid ${COLORS.border}`,
            borderRadius: "8px", padding: "10px 18px", cursor: "pointer",
          }}>← Go back</button>
        </div>

        {/* Result card */}
        <div style={{
          background: COLORS.white, borderRadius: "16px", overflow: "hidden",
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 8px 40px rgba(28,20,16,0.08)",
          marginBottom: "24px",
        }}>
          {/* Header band with illustration */}
          <div style={{
            background: COLORS.card, padding: "32px 32px 0",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            minHeight: "160px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ paddingBottom: "24px" }}>
              <p style={{
                fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.orange,
                letterSpacing: "0.12em", margin: "0 0 8px",
              }}>YOU'RE</p>
              <h2 style={{
                fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 5vw, 44px)",
                color: COLORS.ink, margin: 0, lineHeight: 1.1,
              }}>{persona.name}</h2>
            </div>
            <div style={{ flexShrink: 0 }}>
              <IllusComp />
            </div>
          </div>

          {/* Description */}
          <div style={{ padding: "28px 32px 32px" }}>
            <p style={{
              fontFamily: "Consolas, monospace", fontSize: "14px", color: COLORS.ink,
              lineHeight: 1.8, margin: "0 0 28px",
            }}>
              {persona.description}
            </p>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => setShowShare(true)} style={{
                padding: "14px 28px", background: COLORS.orange, color: "white",
                border: "none", borderRadius: "10px", fontFamily: "Consolas, monospace",
                fontSize: "13px", letterSpacing: "0.08em", cursor: "pointer",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#B8562E"}
                onMouseLeave={e => e.currentTarget.style.background = COLORS.orange}
              >SHARE</button>
              <button onClick={onRestart} style={{
                padding: "14px 28px", background: COLORS.card, color: COLORS.ink,
                border: `1.5px solid ${COLORS.border}`, borderRadius: "10px",
                fontFamily: "Consolas, monospace", fontSize: "13px",
                letterSpacing: "0.08em", cursor: "pointer", transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.cardHover}
                onMouseLeave={e => e.currentTarget.style.background = COLORS.card}
              >RETAKE QUIZ</button>
              <button onClick={onManifesto} style={{
                padding: "14px 28px", background: "none", color: COLORS.muted,
                border: "none", borderRadius: "10px",
                fontFamily: "Consolas, monospace", fontSize: "13px",
                cursor: "pointer", textDecoration: "underline",
              }}>read the manifesto</button>
            </div>
          </div>
        </div>

        <p style={{
          fontFamily: "Consolas, monospace", fontSize: "12px", color: COLORS.muted,
          textAlign: "center", margin: "0 0 20px",
        }}>
          Screenshot this to save or share to your story ✦
        </p>
      </div>

      <FooterStrip />
      {showShare && <ShareModal persona={persona} onClose={() => setShowShare(false)} />}
    </div>
  );
}

// ---- MANIFESTO PAGE ----
function ManifestoPage({ onQuiz }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <nav style={{
        display: "flex", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.white,
      }}>
        <button onClick={onQuiz} style={{
          flex: 1, padding: "18px", fontFamily: "Consolas, monospace", fontSize: "13px",
          letterSpacing: "0.1em", color: COLORS.muted, background: COLORS.white,
          border: "none", cursor: "pointer", borderRight: `1px solid ${COLORS.border}`,
        }}>CREATOR PERSONA</button>
        <button style={{
          flex: 1, padding: "18px", fontFamily: "Consolas, monospace", fontSize: "13px",
          letterSpacing: "0.1em", color: COLORS.ink, background: COLORS.white,
          border: "none", cursor: "default",
          borderBottom: `3px solid ${COLORS.orange}`,
        }}>MANIFESTO</button>
      </nav>

      <div style={{ flex: 1, maxWidth: "720px", margin: "0 auto", padding: "40px 32px", width: "100%" }}>
        <Logo size={52} />
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px, 5vw, 56px)",
          color: COLORS.ink, margin: "28px 0 24px",
        }}>Manifesto</h1>

        <p style={{
          fontFamily: "Consolas, monospace", fontSize: "15px", color: COLORS.ink,
          lineHeight: 1.9, margin: "0 0 40px", maxWidth: "600px",
        }}>
          We were not built to scroll. Every tool ever made — language, paint, the internet —
          began as a way to make something, not just receive it. This is a small reminder that
          you are not just an audience. Made with 🩷
        </p>

        {/* Community card */}
        <div style={{
          background: "#F0EDEA", borderRadius: "16px", padding: "36px 32px",
          border: `1px solid ${COLORS.border}`,
        }}>
          {/* Face avatars */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
            {["#C4A882","#8A9E85","#C4603A","#E8824A","#6B8CAE","#F5C842","#FDDBB4","#D4CEC4","#9A9088","#1C1410","#C4603A","#8A9E85"].map((color, i) => (
              <div key={i} style={{
                width: "46px", height: "46px", borderRadius: "50%",
                background: color, border: "2.5px solid white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>
                {["🧑","👩","👨","🧓","👱","🧕","👦","👧","🧔","👩‍🦱","🧑‍🦳","👩‍🦰"][i]}
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "'Instrument Serif', serif", fontSize: "clamp(22px, 3vw, 30px)",
            color: COLORS.ink, textAlign: "center", margin: 0, lineHeight: 1.3,
          }}>
            <span style={{ color: COLORS.orange }}>Everyone</span> should<br />
            be <span style={{ color: COLORS.orange }}>creating...</span>
          </p>
        </div>
      </div>
      <FooterStrip />
    </div>
  );
}

// ---- MAIN APP ----
export default function App() {
  const [page, setPage] = useState("landing"); // landing | quiz | result | manifesto
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [personaKey, setPersonaKey] = useState(null);
  const [sparkShow, setSparkShow] = useState(false);
  const [sparkMessage, setSparkMessage] = useState("Still here? Make something.");
  const [sparkDismissed, setSparkDismissed] = useState(false);
  const idleTimer = useRef(null);
  const sparkCount = useRef(0);

  // Idle detection for Spark
  useEffect(() => {
    if (sparkDismissed) return;
    const resetTimer = () => {
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        if (!sparkDismissed) {
          setSparkMessage(sparkCount.current === 0 ? "Still here? Make something." : "Even a sentence counts.");
          setSparkShow(true);
          sparkCount.current += 1;
        }
      }, 8000);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);
    resetTimer();
    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [sparkDismissed]);

  const handleAnswer = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (qIndex < 3) {
        setQuestionIndex(qIndex + 1);
      } else {
        const pk = getPersona(newAnswers);
        setPersonaKey(pk);
        setPage("result");
      }
    }, 280);
  };

  const handleBack = () => {
    if (questionIndex === 0) {
      setPage("landing");
    } else {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleRestart = () => {
    setAnswers([null, null, null, null]);
    setQuestionIndex(0);
    setPage("landing");
  };

  const handleDismissSpark = () => {
    setSparkShow(false);
    if (sparkCount.current >= 2) setSparkDismissed(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${COLORS.bg}; }
        @keyframes sparkIn {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {page === "landing" && (
        <LandingPage onStart={() => { setPage("quiz"); setQuestionIndex(0); }} onManifesto={() => setPage("manifesto")} />
      )}
      {page === "quiz" && (
        <QuizPage questionIndex={questionIndex} answers={answers} onAnswer={handleAnswer} onBack={handleBack} onRestart={handleRestart} />
      )}
      {page === "result" && personaKey && (
        <ResultPage personaKey={personaKey} onRestart={handleRestart} onManifesto={() => setPage("manifesto")} />
      )}
      {page === "manifesto" && (
        <ManifestoPage onQuiz={() => setPage("landing")} />
      )}

      <Spark show={sparkShow} message={sparkMessage} onDismiss={handleDismissSpark} />
    </>
  );
}
