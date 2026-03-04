import React, { useState, useEffect, useRef } from 'react';

// --- CONSTANTS ---
const COLORS = {
    bg: "#F5F0E8",  // warm off-white
    white: "#FDFAF4",  // slightly warm white
    ink: "#1C1410",  // deep brown-black
    orange: "#C4603A",  // primary accent
    orangeHover: "#B8562E",  // darker orange
    orangeLight: "#E8824A",  // lighter orange
    sage: "#8A9E85",  // calm green
    card: "#EDE8DF",  // card background
    cardHover: "#E2DBD0",  // card hover
    border: "#D4CEC4",  // borders
    muted: "#9A9088",  // secondary text
};

const QUESTIONS = [
    {
        id: 1,
        label: "1 OF 4 — MEDIUM",
        text: "When you have something to say, how does it usually come out?",
        options: [
            { label: "I write it down:", sub: "notes, journals, captions, threads", value: "write" },
            { label: "I talk it through:", sub: "voice notes, conversations, videos", value: "talk" },
            { label: "I make something:", sub: "a design, a photo, a playlist, a dish", value: "make" },
            { label: "I build or organise it:", sub: "a plan, a system, a spreadsheet, a business", value: "build" },
        ]
    },
    {
        id: 2,
        label: "2 OF 4 — MOTIVATION",
        text: "What feeling makes you want to create something?",
        options: [
            { label: "When I need to make sense of something confusing", value: "sense" },
            { label: "When I want to connect with or move someone", value: "connect" },
            { label: "When I see something beautiful and want to add to it", value: "beauty" },
            { label: "When I spot a problem and can't stop thinking about the fix", value: "problem" },
        ]
    },
    {
        id: 3,
        label: "3 OF 4 — PROCESS",
        text: "How do your best ideas usually show up?",
        options: [
            { label: "Alone and quiet —", sub: "they come when no one's around", value: "alone" },
            { label: "In conversation —", sub: "talking is how I think", value: "convo" },
            { label: "Randomly —", sub: "in the shower, on a walk, at 2am", value: "random" },
            { label: "From research —", sub: "I have to read and gather before anything clicks", value: "research" },
        ]
    },
    {
        id: 4,
        label: "4 OF 4 — HOW YOU FINISH",
        text: "Be honest — what happens after you start something?",
        options: [
            { label: "I usually finish.", sub: "Completion is the whole point.", value: "finish" },
            { label: "I get deep into it,", sub: "then the next idea pulls me away", value: "deep" },
            { label: "I share it before it's \"done\".", sub: "It's never really done", value: "share" },
            { label: "I refine it forever.", sub: "Shipping feels like losing.", value: "refine" },
        ]
    }
];

const PERSONAS = {
    thinker: {
        name: "The Thinker",
        tagline: "You create by making sense of the world.",
        description: "You're probably the one sending long voice notes at midnight, or filling a notes app with ideas nobody asked for — yet. Your mind is the studio. Writing, reflecting, theorising — this is how you make. The world needs your perspective written down.",
        illustration: "/illustrations/thinker.svg"
    },
    storyteller: {
        name: "The Storyteller",
        tagline: "You create by moving people.",
        description: "You feel things deeply and you know how to make others feel them too. Whether it's a caption, a script, a reel, or a conversation — you're drawn to narrative. You don't just share information. You shape how people feel about it.",
        illustration: "/illustrations/storyteller.svg"
    },
    maker: {
        name: "The Maker",
        tagline: "You create by building tangible things.",
        description: "Your hands — or your tools — are your medium. Design, photography, cooking, craft, music production. You think in textures and outputs. You're not done until you can point at something and say: I made that.",
        illustration: "/illustrations/maker.svg"
    },
    connector: {
        name: "The Connector",
        tagline: "You create by bringing things — and people — together.",
        description: "Your superpower is curation and community. You see how ideas link, how people complement each other, how a room (or a group chat) can become more than the sum of its parts. You create ecosystems.",
        illustration: "/illustrations/connector.svg"
    },
    builder: {
        name: "The Builder",
        tagline: "You create by solving problems.",
        description: "You're drawn to things that are broken, missing, or inefficient. Your creativity lives in systems, structures, and solutions. You might not call yourself creative — but everything you build is an act of creation.",
        illustration: "/illustrations/builder.svg"
    },
    nurturer: {
        name: "The Nurturer",
        tagline: "You create by helping others become.",
        description: "You make space. You make people feel seen. You create conditions for growth — in others, in communities, in ideas. Your most important creations might not have your name on them. They have your fingerprints.",
        illustration: "/illustrations/nurturer.svg"
    }
};

const AVATARS = [
    "/avatars/avatar01.png", "/avatars/avatar02.png", "/avatars/avatar03.png", "/avatars/avatar04.png",
    "/avatars/avatar05.png", "/avatars/avatar06.png", "/avatars/avatar07.png", "/avatars/avatar08.png",
    "/avatars/avatar09.png", "/avatars/avatar10.png", "/avatars/avatar11.png", "/avatars/avatar12.png"
];

// --- HELPER FUNCTIONS ---
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
    if (q3 === "research") { scores.builder += 2; scores.thinker += 1; }

    if (q4 === "finish") { scores.builder += 2; scores.maker += 1; }
    if (q4 === "deep") { scores.thinker += 2; scores.connector += 1; }
    if (q4 === "share") { scores.storyteller += 2; scores.connector += 1; }
    if (q4 === "refine") { scores.maker += 2; scores.thinker += 1; }

    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

// --- COMPONENTS ---

const Logo = ({ style }) => (
    <img src="/logo.svg" alt="Anticonsumption Logo" style={{ height: '52px', width: 'auto', ...style }} />
);

const Footer = () => (
    <footer style={{
        background: COLORS.white,
        borderTop: `1px solid ${COLORS.border}`,
        padding: '16px',
        textAlign: 'center'
    }}>
        <span style={{
            fontFamily: 'Inconsolata, monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: COLORS.muted
        }}>
            CREATED, NOT CONSUMED, BY <a
                href="https://www.linkedin.com/in/abahgift"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: COLORS.orange, textDecoration: 'none' }}
            >GIFT ABAH</a>
        </span>
    </footer>
);

const TaglineStrip = () => (
    <div style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: '20px 32px 0',
        textAlign: 'left'
    }}>
        <h4 style={{
            fontFamily: 'Inconsolata, monospace',
            fontSize: '12px',
            color: COLORS.orange,
            margin: '0 0 4px',
            fontWeight: 400
        }}>Why you should create</h4>
        <p style={{
            fontFamily: 'Inconsolata, monospace',
            fontSize: '12px',
            color: COLORS.muted,
            margin: 0
        }}>
            For the notes app full of unsent ideas · For the thing you keep meaning to make · For you.
        </p>
    </div>
);

const SparkMascot = ({ dismissed, onDismiss }) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("Still here? Make something.");
    const idleTimer = useRef(null);
    const sparkCount = useRef(0);

    useEffect(() => {
        const resetTimer = () => {
            setShow(false);
            clearTimeout(idleTimer.current);
            if (!dismissed) {
                idleTimer.current = setTimeout(() => {
                    if (sparkCount.current === 0) {
                        setMessage("Still here? Make something.");
                        setShow(true);
                    } else if (sparkCount.current === 1) {
                        setMessage("Even a sentence counts.");
                        setShow(true);
                    }
                }, 8000);
            }
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('scroll', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keydown', resetTimer);

        resetTimer();

        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('scroll', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            clearTimeout(idleTimer.current);
        };
    }, [dismissed]);

    const handleClose = () => {
        setShow(false);
        sparkCount.current += 1;
        if (sparkCount.current >= 2) {
            onDismiss();
        }
    };

    if (!show || dismissed) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            animation: 'sparkIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}>
            <div style={{
                background: '#FBF5E6',
                border: '1.5px solid #E8824A',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 4px 20px rgba(196,96,58,0.15)',
                marginBottom: '8px',
                position: 'relative',
                maxWidth: '200px'
            }}>
                <p style={{
                    fontFamily: 'Inconsolata, monospace',
                    fontSize: '13px',
                    color: COLORS.ink,
                    margin: 0,
                    lineHeight: 1.5
                }}>{message}</p>
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '4px',
                        right: '8px',
                        background: 'none',
                        border: 'none',
                        fontFamily: 'Inconsolata, monospace',
                        fontSize: '14px',
                        color: COLORS.muted,
                        cursor: 'pointer'
                    }}
                >✕</button>
            </div>
            <img src="/images/Mascot_Spark.svg" alt="Spark" className="spark-img" style={{ height: '85px', width: 'auto' }} />
        </div>
    );
};

const ShareModal = ({ persona, onClose }) => {
    const [copied, setCopied] = useState(false);
    const shareText = `I just found out I'm ${persona.name} on Anticonsumption! ${persona.tagline} Find out your creator type →`;
    const shareUrl = window.location.href;

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(28,20,16,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
        }} onClick={onClose}>
            <div style={{
                background: COLORS.white,
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '360px',
                width: '90%',
                animation: 'slideUp 0.3s ease'
            }} onClick={e => e.stopPropagation()}>
                <h3 style={{ fontFamily: 'Young Serif, serif', fontSize: '24px', margin: '0 0 8px' }}>Share your type</h3>
                <p style={{ fontFamily: 'Inconsolata, monospace', fontSize: '13px', color: COLORS.muted, margin: '0 0 24px' }}>
                    Let people know what kind of maker you are.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" style={shareItemStyle}>
                        <span>Twitter / X</span>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" style={shareItemStyle}>
                        <span>LinkedIn</span>
                    </a>
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noreferrer" style={shareItemStyle}>
                        <span>WhatsApp</span>
                    </a>
                    <button onClick={copyLink} style={{ ...shareItemStyle, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                        <span>{copied ? "Copied!" : "Copy link"}</span>
                    </button>
                </div>

                <button onClick={onClose} style={{
                    marginTop: '24px',
                    width: '100%',
                    padding: '12px',
                    border: `1.5px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    fontFamily: 'Inconsolata, monospace',
                    background: 'none',
                    color: COLORS.muted,
                    cursor: 'pointer'
                }}>close</button>
            </div>
        </div>
    );
};

const shareItemStyle = {
    display: 'block',
    padding: '14px 18px',
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '10px',
    fontFamily: 'Inconsolata, monospace',
    fontSize: '14px',
    color: COLORS.ink,
    textDecoration: 'none'
};

// --- MAIN PAGES ---

const LandingPage = ({ onQuizStart, onGoManifesto }) => (
    <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={navStyle}>
            <div style={{ ...navItemStyle, borderBottom: `3px solid ${COLORS.orange}`, color: COLORS.ink }}>CREATOR PERSONA</div>
            <div style={{ ...navItemStyle, color: COLORS.muted, cursor: 'pointer' }} onClick={onGoManifesto}>MANIFESTO</div>
        </nav>
        <main className="main-container" style={{ flex: 1, maxWidth: '640px', margin: '0 auto', padding: '40px 32px', width: '100%' }}>
            <Logo />
            <h1 style={{ fontFamily: 'Young Serif, serif', fontSize: '48px', color: COLORS.ink, margin: '24px 0 16px', lineHeight: 1.1 }}>
                What kind of maker are you?
            </h1>
            <p style={{ fontFamily: 'Inconsolata, monospace', fontSize: '14px', lineHeight: 1.7, margin: '0 0 32px', color: COLORS.ink }}>
                In a world built for consuming, some of us are wired to make.<br />
                Take 2 minutes to find out how you create.
            </p>

            <div style={{ background: COLORS.white, borderRadius: '16px', border: `1px solid ${COLORS.border}`, padding: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    {['thinker', 'maker', 'storyteller'].map(type => (
                        <div key={type} style={{ background: COLORS.card, borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={`/illustrations/${type}.svg`} alt={type} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    ))}
                </div>
                <p style={{ fontFamily: 'Inconsolata, monospace', fontSize: '12px', color: COLORS.muted, textAlign: 'center', margin: 0 }}>
                    Thinker · Maker · Storyteller · Connector · Builder · Nurturer
                </p>
            </div>

            <button onClick={onQuizStart} style={{
                width: '100%',
                background: COLORS.orange,
                color: 'white',
                border: 'none',
                padding: '20px',
                borderRadius: '12px',
                fontFamily: 'Inconsolata, monospace',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'background 0.2s'
            }} onMouseOver={e => e.target.style.background = COLORS.orangeHover} onMouseOut={e => e.target.style.background = COLORS.orange}>
                let's do this 🖊
            </button>

            <div style={{ marginTop: '40px' }}>
                <TaglineStrip />
            </div>
        </main>
        <Footer />
    </div>
);

const QuizPage = ({ index, answers, onSelect, onBack, onRestart }) => {
    const q = QUESTIONS[index];
    const selectedValue = answers[index];

    return (
        <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
                <Logo style={{ height: '40px' }} />
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inconsolata, monospace', fontSize: '12px', color: COLORS.muted, cursor: 'pointer' }} onClick={onRestart}>restart</span>
                    <button onClick={onBack} style={{
                        background: COLORS.white,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: '8px',
                        padding: '10px 18px',
                        fontFamily: 'Inconsolata, monospace',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>← Go back</button>
                </div>
            </header>

            <main className="quiz-container" style={{ flex: 1, maxWidth: '640px', margin: '0 auto', padding: '0 32px 40px', width: '100%' }}>
                <p style={{ fontFamily: 'Inconsolata, monospace', fontSize: '12px', color: COLORS.muted, letterSpacing: '0.1em', margin: '0 0 16px' }}>
                    {q.label}
                </p>
                <h2 style={{ fontFamily: 'Young Serif, serif', fontSize: '32px', color: COLORS.ink, lineHeight: 1.2, margin: '0 0 36px' }}>
                    {q.text}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {q.options.map(opt => {
                        const isSelected = selectedValue === opt.value;
                        return (
                            <button
                                key={opt.value}
                                onClick={() => onSelect(index, opt.value)}
                                style={{
                                    background: isSelected ? COLORS.orangeLight : COLORS.card,
                                    border: isSelected ? `2px solid ${COLORS.orange}` : 'none',
                                    borderRadius: '12px',
                                    padding: '22px 20px',
                                    cursor: 'pointer',
                                    transition: '0.18s ease',
                                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: isSelected ? '0 4px 16px rgba(196,96,58,0.25)' : 'none',
                                    textAlign: 'center'
                                }}
                            >
                                {opt.sub ? (
                                    <>
                                        <div style={{ fontFamily: 'Inconsolata, monospace', fontWeight: 700, color: isSelected ? 'white' : COLORS.orange, marginBottom: '4px' }}>{opt.label}</div>
                                        <div style={{ fontFamily: 'Inconsolata, monospace', fontSize: '13px', color: isSelected ? 'white' : COLORS.ink }}>{opt.sub}</div>
                                    </>
                                ) : (
                                    <div style={{ fontFamily: 'Inconsolata, monospace', fontSize: '13.5px', color: isSelected ? 'white' : COLORS.ink }}>{opt.label}</div>
                                )}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: '60px' }}>
                    <TaglineStrip />
                </div>
            </main>
            <Footer />
        </div>
    );
};

const ResultPage = ({ personaKey, onRestart, onGoManifesto, onBack }) => {
    const persona = PERSONAS[personaKey];
    const [showShare, setShowShare] = useState(false);

    return (
        <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '680px', margin: '0 auto', width: '100%' }}>
                <Logo style={{ height: '40px' }} />
                <button onClick={onBack} style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontFamily: 'Inconsolata, monospace',
                    fontSize: '13px',
                    cursor: 'pointer'
                }}>← Go back</button>
            </header>

            <main className="quiz-container" style={{ flex: 1, maxWidth: '680px', margin: '0 auto', padding: '0 32px 40px', width: '100%' }}>
                <div style={{
                    background: COLORS.white,
                    borderRadius: '16px',
                    border: `1px solid ${COLORS.border}`,
                    overflow: 'hidden',
                    boxShadow: '0 8px 40px rgba(28,20,16,0.08)',
                    marginBottom: '24px'
                }}>
                    <div className="result-hero" style={{ background: COLORS.card, padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', minHeight: '180px' }}>
                        <div>
                            <p style={{ fontFamily: 'Inconsolata, monospace', fontSize: '12px', color: COLORS.orange, letterSpacing: '0.12em', margin: '0 0 4px' }}>YOU'RE</p>
                            <h1 style={{ fontFamily: 'Young Serif, serif', fontSize: '40px', margin: 0 }}>{persona.name}</h1>
                        </div>
                        <img src={persona.illustration} alt={persona.name} style={{ height: '120px', width: 'auto', marginBottom: '-32px' }} />
                    </div>
                    <div style={{ padding: '28px 32px 32px' }}>
                        <p style={{ fontFamily: 'Inconsolata, monospace', fontSize: '14px', lineHeight: 1.8, margin: '0 0 28px', color: COLORS.ink }}>
                            {persona.description}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <button onClick={() => setShowShare(true)} style={{ background: COLORS.orange, color: 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', fontFamily: 'Inconsolata, monospace', cursor: 'pointer' }}>SHARE</button>
                            <button onClick={onRestart} style={{ background: COLORS.card, border: `1.5px solid ${COLORS.border}`, padding: '14px 28px', borderRadius: '10px', fontFamily: 'Inconsolata, monospace', cursor: 'pointer' }}>RETAKE QUIZ</button>
                            <span style={{ fontFamily: 'Inconsolata, monospace', fontSize: '13px', color: COLORS.muted, borderBottom: `1px solid ${COLORS.muted}`, cursor: 'pointer' }} onClick={onGoManifesto}>read the manifesto</span>
                        </div>
                    </div>
                </div>

                <p style={{ textAlign: 'center', fontFamily: 'Inconsolata, monospace', fontSize: '12px', color: COLORS.muted }}>
                    Screenshot this to save or share to your story ✦
                </p>
            </main>

            {showShare && <ShareModal persona={persona} onClose={() => setShowShare(false)} />}
            <Footer />
        </div>
    );
};

const ManifestoPage = ({ onGoQuiz }) => (
    <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={navStyle}>
            <div style={{ ...navItemStyle, color: COLORS.muted, cursor: 'pointer' }} onClick={onGoQuiz}>CREATOR PERSONA</div>
            <div style={{ ...navItemStyle, borderBottom: `3px solid ${COLORS.orange}`, color: COLORS.ink }}>MANIFESTO</div>
        </nav>
        <main style={{ flex: 1, maxWidth: '720px', margin: '0 auto', padding: '40px 32px', width: '100%' }}>
            <Logo />
            <h1 style={{ fontFamily: 'Young Serif, serif', fontSize: '56px', margin: '28px 0 24px' }}>Manifesto</h1>
            <p style={{ fontFamily: 'Inconsolata, monospace', fontSize: '15px', lineHeight: 1.9, margin: '0 0 40px', maxWidth: '600px' }}>
                We were not built to scroll. Every tool ever made — language, paint, the internet — began as a way to make something, not just receive it. This is a small reminder that you are not just an audience. Made with 🩷
            </p>

            <div style={{ background: '#F0EDEA', borderRadius: '16px', border: `1px solid ${COLORS.border}`, padding: '36px 32px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', maxWidth: '400px', margin: '0 auto 28px' }}>
                    {AVATARS.map((src, i) => (
                        <img key={i} src={src} alt="Community Member" style={{ width: '46px', height: '46px', borderRadius: '50%', border: '2.5px solid white', objectFit: 'cover' }} />
                    ))}
                </div>
                <h3 style={{ fontFamily: 'Young Serif, serif', fontSize: '30px', lineHeight: 1.3, margin: 0 }}>
                    <span style={{ color: COLORS.orange }}>Everyone</span> should<br />
                    be <span style={{ color: COLORS.orange }}>creating...</span>
                </h3>
            </div>
        </main>
        <Footer />
    </div>
);

const navStyle = {
    display: 'flex',
    borderBottom: `1px solid ${COLORS.border}`,
    background: COLORS.white
};

const navItemStyle = {
    flex: 1,
    padding: '18px',
    fontFamily: 'Inconsolata, monospace',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textAlign: 'center',
    borderRight: `1px solid ${COLORS.border}`
};

// --- APP COMPONENT ---

export default function App() {
    const [page, setPage] = useState("landing");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([null, null, null, null]);
    const [personaKey, setPersonaKey] = useState(null);
    const [sparkDismissed, setSparkDismissed] = useState(false);

    useEffect(() => {
        // Inject Fonts
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Young+Serif&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Inject Animations & Responsive Styles
        const style = document.createElement('style');
        style.innerHTML = `
      @keyframes sparkIn {
        from { opacity: 0; transform: translateY(20px) scale(0.9); }
        to   { opacity: 1; transform: translateY(0)    scale(1);   }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      body { margin: 0; background: ${COLORS.bg}; }
      
      /* Mobile adjustments */
      @media (max-width: 480px) {
        .main-container { padding: 40px 20px !important; }
        .quiz-container { padding: 0 20px 40px !important; }
        .result-hero { flex-direction: column-reverse !important; align-items: flex-start !important; }
        .result-hero img { height: 100px !important; width: auto !important; margin-bottom: 0 !important; margin-top: -20px; align-self: flex-end; }
        .spark-img { height: 65px !important; }
      }
    `;
        document.head.appendChild(style);
    }, []);

    const handleStart = () => {
        setAnswers([null, null, null, null]);
        setQuestionIndex(0);
        setPage("quiz");
    };

    const handleAnswer = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);

        setTimeout(() => {
            if (index < 3) {
                setQuestionIndex(index + 1);
            } else {
                const finalPersona = getPersona(newAnswers);
                setPersonaKey(finalPersona);
                setPage("result");
            }
        }, 280);
    };

    const handleBack = () => {
        if (page === "result") {
            setPage("quiz");
            setQuestionIndex(3);
        } else if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
        } else {
            setPage("landing");
        }
    };

    const handleRestart = () => {
        setAnswers([null, null, null, null]);
        setPage("landing");
    };

    return (
        <div style={{ color: COLORS.ink }}>
            {page === "landing" && <LandingPage onQuizStart={handleStart} onGoManifesto={() => setPage("manifesto")} />}
            {page === "quiz" && <QuizPage index={questionIndex} answers={answers} onSelect={handleAnswer} onBack={handleBack} onRestart={handleRestart} />}
            {page === "result" && <ResultPage personaKey={personaKey} onRestart={handleRestart} onGoManifesto={() => setPage("manifesto")} onBack={handleBack} />}
            {page === "manifesto" && <ManifestoPage onGoQuiz={() => setPage("landing")} />}

            <SparkMascot dismissed={sparkDismissed} onDismiss={() => setSparkDismissed(true)} />
        </div>
    );
}
