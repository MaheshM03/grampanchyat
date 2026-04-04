# Google Translate (hi/mr/en) in all components - COMPLETE ✓

## Steps:
- [x] 1. Create TODO-translate.md ✓
- [x] 2. Create LanguageContext.js ✓
- [x] 3. Edit App.js (Provider + wrapper) ✓
- [x] 4. Edit NavBar.jsx (professional switcher + widget) ✓
- [x] 5. Test: Widget loads, buttons switch lang, content translates via wrapper
- [x] 6. Complete ✓

Enhanced with body lang classes, active buttons, form protection (notranslate).
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const PILLARS = [
  {
    id: "water",
    icon: "💧",
    title: "Water and Sanitation",
    titleMr: "पाणी आणि स्वच्छता",
    color: "#3b82f6",
    bg: "#1d4ed8",
    desc: "Kadepur Gram Panchayat prioritises a healthy and strong locality. The aim is to ensure clean and safe solar-water supply, implement effective measures for sanitation, and increase public awareness about cleanliness. The village is committed to a healthy and eco-friendly lifestyle through conservation and clean surroundings.",
    link: "#water",
  },
  {
    id: "management",
    icon: "⚙️",
    title: "Management",
    titleMr: "व्यवस्थापन",
    color: "#a855f7",
    bg: "#7c3aed",
    desc: "Kadepur Gram Panchayat ensures transparent, efficient, and accountable functioning. Emphasises the formulation of actionable plans for local development, proper planning of resources, and making administrative contributions through the participation of villagers. A model that guides the progress of the village through sound management.",
    link: "#management",
  },
  {
    id: "identity",
    icon: "💎",
    title: "Identity",
    titleMr: "ओळख",
    color: "#22c55e",
    bg: "#16a34a",
    desc: "Kadepur Gram Panchayat's working style based on transparency, accountability and inclusiveness. Commitment to development goals for the benefit of the villagers. Implementation of plans and commitment to ethical responsibilities is extraordinary. Identity is the main pillar of responsibility. Ideal leadership based on democratic principles for the progress of the village.",
    link: "#identity",
  },
  {
    id: "environment",
    icon: "🌱",
    title: "Green Energy and Environmental Protection",
    titleMr: "हरित ऊर्जा व पर्यावरण",
    color: "#f59e0b",
    bg: "#4c1d95",
    desc: "Kadepur Gram Panchayat advocates the use of green energy and environmental protection. Promotion of solar energy, wind energy, and other environmentally friendly energy sources, as well as effective measures for biodiversity conservation and pollution control. Committed to sustainable development and creating a clean and green future that is in harmony with nature.",
    link: "#environment",
  },
  {
    id: "technology",
    icon: "💻",
    title: "Transparent Technology",
    titleMr: "पारदर्शक तंत्रज्ञान",
    color: "#f97316",
    bg: "#fcd5b8",
    textDark: true,
    desc: "Kadepur Gram Panchayat's modern and innovative initiatives. Focused on the implementation of information-based systems by using digital technology for online services and data analysis, also providing technological development services to the villagers, a modern approach to bring about the overall development of the village with the help of transparent technology.",
    link: "#technology",
  },
];

const STATS = [
  { val: "5,735", label: "लोकसंख्या", en: "Population" },
  { val: "12+",   label: "स्मार्ट उपक्रम", en: "Smart Initiatives" },
  { val: "100%",  label: "डिजिटल सेवा", en: "Digital Services" },
  { val: "2024",  label: "स्मार्ट ग्राम", en: "Smart Village Year" },
];

/* ══════════════════════════════════════════
   PILLAR CARD
══════════════════════════════════════════ */
function PillarCard({ p, idx }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...c.pillarCard,
        background: p.bg,
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
        transition: `opacity 0.55s ease ${idx * 0.1}s, transform 0.55s ease ${idx * 0.1}s, box-shadow 0.25s`,
        boxShadow:  hovered
          ? `0 20px 48px ${p.color}55`
          : `0 4px 20px ${p.color}30`,
      }}
    >
      {/* Icon bubble */}
      <div style={{
        ...c.pillarIconWrap,
        background: p.textDark ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.2)",
        transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.3s ease",
      }}>
        <span style={c.pillarIcon}>{p.icon}</span>
      </div>

      {/* Title */}
      <h3 style={{
        ...c.pillarTitle,
        color: p.textDark ? "#1a2235" : "#fff",
      }}>
        {p.title}
      </h3>
      <p style={{
        ...c.pillarTitleMr,
        color: p.textDark ? "#4a5a6a" : "rgba(255,255,255,0.7)",
      }}>
        {p.titleMr}
      </p>

      {/* Description */}
      <p style={{
        ...c.pillarDesc,
        color: p.textDark ? "#3a4a5a" : "rgba(255,255,255,0.85)",
      }}>
        {p.desc}
      </p>

      {/* CTA button */}
      <button style={{
        ...c.pillarBtn,
        background:   p.textDark ? "#1a2235" : "rgba(255,255,255,0.2)",
        color:        p.textDark ? "#fff" : "#fff",
        borderColor:  p.textDark ? "#1a2235" : "rgba(255,255,255,0.5)",
        transform:    hovered ? "translateY(-2px)" : "translateY(0)",
        transition:   "transform 0.2s, background 0.2s",
      }}>
        अधिक माहिती / More Information →
      </button>

      {/* Decorative corner dot */}
      <div style={{
        ...c.cornerDot,
        background: p.textDark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.1)",
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function SmartVillage() {
  const [heroRef,    heroVisible]    = useInView(0.1);
  const [journeyRef, journeyVisible] = useInView(0.15);
  const [statsRef,   statsVisible]   = useInView(0.2);

  return (
    <div style={c.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes floatGirl {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(1.08); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .hero-illus { animation: floatGirl 5s ease-in-out infinite; }
        .glow-ring  { animation: pulseGlow 3s ease-in-out infinite; }
        .spin-icon  { animation: spinSlow 12s linear infinite; }

        .pillar-btn-hover:hover { filter: brightness(1.15); }
      `}</style>

      {/* ══════════════════════════════════
          HERO SECTION
      ══════════════════════════════════ */}
      <div style={c.hero}>
        {/* Background decorative shapes */}
        <div style={c.heroBg1} />
        <div style={c.heroBg2} />
        <div style={c.heroBg3} />

        <div ref={heroRef} style={{
          ...c.heroInner,
          opacity:   heroVisible ? 1 : 0,
          transform: heroVisible ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {/* Illustration */}
          <div style={c.heroIllus}>
            {/* Glow */}
            <div className="glow-ring" style={c.glowRing} />
            <div className="hero-illus">
              <svg width="260" height="220" viewBox="0 0 260 220" fill="none">
                {/* Desk */}
                <rect x="30" y="155" width="200" height="8" rx="4" fill="#2d9a6a" opacity="0.7"/>
                <rect x="50" y="163" width="8" height="40" rx="2" fill="#2d9a6a" opacity="0.5"/>
                <rect x="202" y="163" width="8" height="40" rx="2" fill="#2d9a6a" opacity="0.5"/>

                {/* Laptop */}
                <rect x="80" y="115" width="100" height="42" rx="5" fill="#1a2235" opacity="0.9"/>
                <rect x="82" y="117" width="96" height="38" rx="4" fill="#2a3a55"/>
                <rect x="85" y="120" width="90" height="32" rx="3" fill="#1e3a5f" opacity="0.9"/>
                {/* Screen glow */}
                <rect x="87" y="122" width="86" height="28" rx="2" fill="#0f4a8a" opacity="0.7"/>
                <rect x="90" y="125" width="30" height="4" rx="2" fill="#4fc3f7" opacity="0.6"/>
                <rect x="90" y="132" width="50" height="3" rx="1" fill="#81d4fa" opacity="0.4"/>
                <rect x="90" y="138" width="40" height="3" rx="1" fill="#4fc3f7" opacity="0.3"/>
                {/* Keyboard base */}
                <rect x="72" y="156" width="116" height="6" rx="3" fill="#1a2235" opacity="0.6"/>

                {/* Person body */}
                <ellipse cx="130" cy="90" rx="28" ry="36" fill="#2d9a6a" opacity="0.85"/>
                {/* Arms */}
                <path d="M102,110 Q90,125 100,138" stroke="#2d9a6a" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.8"/>
                <path d="M158,110 Q170,125 160,138" stroke="#2d9a6a" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.8"/>
                {/* Head */}
                <circle cx="130" cy="58" r="26" fill="#ffd5b0"/>
                {/* Hair */}
                <ellipse cx="130" cy="42" rx="26" ry="18" fill="#1a0a00"/>
                <ellipse cx="108" cy="60" rx="8" ry="20" fill="#1a0a00" transform="rotate(-10 108 60)"/>
                {/* Eyes */}
                <circle cx="122" cy="60" r="3" fill="#1a2235"/>
                <circle cx="138" cy="60" r="3" fill="#1a2235"/>
                <circle cx="123" cy="59" r="1" fill="#fff"/>
                <circle cx="139" cy="59" r="1" fill="#fff"/>
                {/* Smile */}
                <path d="M123,68 Q130,74 137,68" stroke="#e87050" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Cat */}
                <circle cx="72" cy="145" r="14" fill="#e8d0a0"/>
                <path d="M60,133 L64,140 L72,138 Z" fill="#e8d0a0"/>
                <path d="M84,133 L80,140 L72,138 Z" fill="#e8d0a0"/>
                <circle cx="69" cy="146" r="2.5" fill="#1a0a00"/>
                <circle cx="75" cy="146" r="2.5" fill="#1a0a00"/>
                <path d="M70,150 Q72,153 74,150" stroke="#e87050" strokeWidth="1.2" fill="none"/>
                {/* Coffee cup */}
                <rect x="186" y="140" width="20" height="16" rx="3" fill="#c87030" opacity="0.8"/>
                <path d="M206,146 Q214,146 214,152 Q214,158 206,158" stroke="#c87030" strokeWidth="2" fill="none"/>
                {/* Steam */}
                <path d="M191,137 Q193,132 191,127" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path d="M197,136 Q199,131 197,126" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                {/* Floating elements */}
                <circle cx="40" cy="50" r="6" fill="#4fc3f7" opacity="0.5"/>
                <circle cx="220" cy="40" r="8" fill="#a78bfa" opacity="0.4"/>
                <rect x="220" y="80" width="14" height="14" rx="3" fill="#34d399" opacity="0.5" transform="rotate(15 227 87)"/>
                <circle cx="30" cy="110" r="4" fill="#f472b6" opacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Text content */}
          <div style={c.heroText}>
            <p style={c.heroTag}>Smart Kadepur Village</p>
            <h1 style={c.heroTitle}>Smart Village Kadepur</h1>
            <p style={c.heroDesc}>
              A model of modern technology, transparent governance, and sustainable development. Through innovations in education, health, and digital services, Kadepur Village has become a proud example of a progressive and empowered Gram Panchayat. Setting new standards of rural development through smart solutions, Kadepur Village is poised for a prosperous and green future.
            </p>
            <button style={c.heroBtn}>Find out!</button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          STATS BAR
      ══════════════════════════════════ */}
      <div ref={statsRef} style={c.statsBar}>
        {STATS.map((st, i) => (
          <div key={i} style={{
            ...c.statItem,
            opacity:   statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
          }}>
            <p style={c.statVal}>{st.val}</p>
            <p style={c.statLabel}>{st.label}</p>
            <p style={c.statEn}>{st.en}</p>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════
          JOURNEY SECTION
      ══════════════════════════════════ */}
      <div ref={journeyRef} style={{
        ...c.journeySection,
        opacity:   journeyVisible ? 1 : 0,
        transform: journeyVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <h2 style={c.journeyTitle}>
          Smart Village Kadepur: <em style={{ fontStyle: "italic", color: "#2d9a6a" }}>A journey to an ideal modernity</em>
        </h2>
        <div style={c.journeyDots}>
          {[0,1,2].map(i => (
            <div key={i} style={{ ...c.dot, ...(i===1 ? c.dotActive : {}) }} />
          ))}
        </div>
        <p style={c.journeyDesc}>
          A unique blend of advanced technology, sustainable development, and transparent governance. Balancing renewable energy, sanitation,
          water management, environmental conservation, and digital connectivity, Kadepur Village is creating a model of holistic development.
          Continuous efforts are being made to establish the village as a Smart Village through active participation of the villagers and innovative
          solutions.
        </p>
      </div>

      {/* ══════════════════════════════════
          PILLARS GRID
      ══════════════════════════════════ */}
      <div style={c.pillarsSection}>
        {/* Top row — 3 cards */}
        <div style={c.pillarsTop}>
          {PILLARS.slice(0, 3).map((p, i) => (
            <PillarCard key={p.id} p={p} idx={i} />
          ))}
        </div>
        {/* Bottom row — 2 cards */}
        <div style={c.pillarsBottom}>
          {PILLARS.slice(3).map((p, i) => (
            <PillarCard key={p.id} p={p} idx={i + 3} />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          INITIATIVES SECTION
      ══════════════════════════════════ */}
      <div style={c.initSection}>
        <h2 style={c.initTitle}>स्मार्ट ग्राम उपक्रम / Smart Village Initiatives</h2>
        <div style={c.initDots}>
          {[0,1,2].map(i => (
            <div key={i} style={{ ...c.dot, background: i===1?"#2d9a6a":"#c8d8c8", ...(i===1?{width:28}:{}) }} />
          ))}
        </div>
        <div style={c.initGrid}>
          {[
            { icon: "☀️", title: "Solar Energy",         mr: "सौर ऊर्जा",          desc: "Rooftop solar panels installed on government buildings and homes." },
            { icon: "📶", title: "Free Wi-Fi",           mr: "मोफत Wi-Fi",          desc: "High-speed internet connectivity across the village." },
            { icon: "💧", title: "Water ATM",            mr: "वॉटर एटीएम",          desc: "24x7 purified drinking water available via digital kiosks." },
            { icon: "📹", title: "CCTV Surveillance",    mr: "CCTV सुरक्षा",        desc: "Smart surveillance system installed at key locations." },
            { icon: "🏫", title: "Smart School",         mr: "स्मार्ट शाळा",         desc: "Digital classrooms and e-learning infrastructure for students." },
            { icon: "🏥", title: "Telemedicine",         mr: "टेलिमेडिसिन",          desc: "Online health consultations for villagers via mobile devices." },
            { icon: "🌿", title: "Waste Management",     mr: "कचरा व्यवस्थापन",      desc: "Smart segregation and composting units in every ward." },
            { icon: "🌾", title: "Smart Agriculture",    mr: "स्मार्ट शेती",          desc: "Drone surveys, soil health cards, and drip irrigation support." },
            { icon: "💳", title: "Digital Payments",     mr: "डिजिटल पेमेंट",        desc: "Cashless transactions enabled at all village institutions." },
          ].map((item, i) => {
            const [ref, vis] = useInView(0.1);
            return (
              <div key={i} ref={ref} style={{
                ...c.initCard,
                opacity:   vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              }}>
                <div style={c.initIcon}>{item.icon}</div>
                <div>
                  <p style={c.initCardTitle}>{item.mr}</p>
                  <p style={c.initCardEn}>{item.title}</p>
                  <p style={c.initCardDesc}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   STYLES
══════════════════════════════════════════ */
const c = {
  page: { fontFamily: "'Nunito','Noto Sans Devanagari',sans-serif", background: "#fff", minHeight: "100vh" },

  /* ── Hero ── */
  hero:    { background: "#f0fdf4", position: "relative", overflow: "hidden", padding: "48px 6% 52px" },
  heroBg1: { position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,154,106,0.12),transparent)", top: -60, right: "8%", pointerEvents: "none" },
  heroBg2: { position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(79,195,247,0.1),transparent)", bottom: -40, left: "5%", pointerEvents: "none" },
  heroBg3: { position: "absolute", width: 160, height: 160, background: "rgba(45,154,106,0.05)", top: 40, left: "15%", borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%", pointerEvents: "none" },

  heroInner: { maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" },
  heroIllus: { flex: "0 0 auto", position: "relative" },
  glowRing:  { position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,154,106,0.15),transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" },
  heroText:  { flex: "1 1 300px", maxWidth: 440 },
  heroTag:   { fontSize: "0.72rem", fontWeight: 800, color: "#2d9a6a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 },
  heroTitle: { fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, color: "#1a2235", lineHeight: 1.2, marginBottom: 14 },
  heroDesc:  { fontSize: "0.84rem", color: "#4a6a5a", lineHeight: 1.75, marginBottom: 20, maxWidth: 400 },
  heroBtn:   { background: "#2d9a6a", color: "#fff", border: "none", borderRadius: 6, padding: "10px 28px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(45,154,106,0.3)", transition: "transform 0.15s, box-shadow 0.15s" },

  /* ── Stats Bar ── */
  statsBar:  { background: "#1a2235", padding: "28px 6%", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" },
  statItem:  { textAlign: "center" },
  statVal:   { fontSize: "1.8rem", fontWeight: 900, color: "#2d9a6a", lineHeight: 1 },
  statLabel: { fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginTop: 4 },
  statEn:    { fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", marginTop: 2 },

  /* ── Journey ── */
  journeySection: { maxWidth: 860, margin: "0 auto", padding: "52px 6% 36px", textAlign: "center" },
  journeyTitle:   { fontSize: "clamp(1.2rem,2.5vw,1.7rem)", fontWeight: 900, color: "#1a2235", marginBottom: 10, lineHeight: 1.3 },
  journeyDots:    { display: "flex", gap: 6, justifyContent: "center", margin: "10px 0 18px" },
  journeyDesc:    { fontSize: "0.86rem", color: "#5a6a7a", lineHeight: 1.8, maxWidth: 720, margin: "0 auto" },
  dot:            { width: 8, height: 4, background: "#c8d8c8", borderRadius: 2 },
  dotActive:      { width: 28, background: "#2d9a6a" },

  /* ── Pillars ── */
  pillarsSection: { padding: "4px 6% 52px", maxWidth: 1000, margin: "0 auto" },
  pillarsTop:     { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 18 },
  pillarsBottom:  { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, maxWidth: 660, margin: "0 auto" },

  pillarCard: {
    borderRadius: 16, padding: "28px 24px 24px",
    position: "relative", overflow: "hidden",
    display: "flex", flexDirection: "column", gap: 10,
    cursor: "pointer",
  },
  pillarIconWrap: { width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 4 },
  pillarIcon:     { fontSize: "1.6rem" },
  pillarTitle:    { fontSize: "0.95rem", fontWeight: 900, lineHeight: 1.3 },
  pillarTitleMr:  { fontSize: "0.72rem", fontWeight: 600, marginTop: -4 },
  pillarDesc:     { fontSize: "0.72rem", lineHeight: 1.7, flex: 1 },
  pillarBtn: {
    alignSelf: "flex-start", marginTop: 8,
    padding: "6px 14px", borderRadius: 6, border: "1.5px solid",
    fontSize: "0.68rem", fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit",
  },
  cornerDot: { position: "absolute", width: 80, height: 80, borderRadius: "50%", bottom: -20, right: -20, pointerEvents: "none" },

  /* ── Initiatives ── */
  initSection:   { background: "#f0fdf4", padding: "48px 6% 60px" },
  initTitle:     { fontSize: "1.2rem", fontWeight: 900, color: "#1a2235", textAlign: "center", marginBottom: 8, fontFamily: "'Noto Sans Devanagari','Nunito',sans-serif" },
  initDots:      { display: "flex", gap: 6, justifyContent: "center", margin: "8px 0 28px" },
  initGrid:      { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16, maxWidth: 960, margin: "0 auto" },
  initCard:      { background: "#fff", borderRadius: 12, padding: "18px 16px", display: "flex", gap: 14, alignItems: "flex-start", border: "1.5px solid #d4eedd", boxShadow: "0 2px 10px rgba(45,154,106,0.06)", transition: "box-shadow 0.2s" },
  initIcon:      { fontSize: "1.6rem", flexShrink: 0 },
  initCardTitle: { fontSize: "0.88rem", fontWeight: 800, color: "#1a2235", fontFamily: "'Noto Sans Devanagari','Nunito',sans-serif", marginBottom: 2 },
  initCardEn:    { fontSize: "0.68rem", color: "#2d9a6a", fontWeight: 700, marginBottom: 4 },
  initCardDesc:  { fontSize: "0.72rem", color: "#5a6a7a", lineHeight: 1.6 },
};# Google Translate (hi/mr/en) in all components

## Steps:
- [ ] 1. Create TODO-translate.md ✓
- [ ] 2. Create LanguageContext.jsx
- [ ] 3. Edit App.js (Provider + script)
- [ ] 4. Edit NavBar.jsx (language switcher)
- [ ] 5. Test
- [ ] 6. Complete
