export default function StatsSection() {
  const stats = [
    { label: "एकूण लोकसंख्या", value: "5,735", icon: "👥" },
    { label: "निवडणूक लोकसंख्या", value: "4,332", icon: "🗳️" },
    { label: "अनुसूचित लोकसंख्या", value: "1,403", icon: "📊" },
    { label: "अनुसूचित लोकसंख्या", value: "2,493", icon: "📋" },
  ];

  return (
    <section style={{ padding: "60px 40px", background: "#f8fafc", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Stats block */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 60 }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=260&fit=crop"
              alt="Gram Panchayat"
              style={{ width: "100%", borderRadius: 12, objectFit: "cover", height: 200 }}
            />
          </div>
          <div style={{ flex: 2, minWidth: 280 }}>
            <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 13, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>लोकसंख्या</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a2a4a", marginBottom: 16, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              दृष्टीक्षेपात लोकसंख्या
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              कडेपूर ग्रामपंचायत लोकसंख्या - राखीव, निवड प्रकार आणि समाजाच्यानुसार अधिकांश व लोकसंख्येची माहिती.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", borderLeft: "4px solid #2563eb" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#2563eb", marginBottom: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pride block */}
        <div style={{ background: "linear-gradient(135deg,#fff8ec,#fffbf3)", border: "1px solid #fde68a", borderRadius: 16, padding: "36px", display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 4, height: 36, background: "#e8a020", borderRadius: 2 }} />
              <h3 style={{ fontSize: 26, fontWeight: 800, color: "#1a2a4a", margin: 0, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>मानाचा  <span style={{ color: "#e8a020" }}>तुरा</span></h3>
            </div>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              ग्रामपंचायत कडेपूरला National e-Governance Awards मध्ये महाराष्ट्र राज्यातून प्रथम क्रमांक मिळाला देश पातळीवर राज्याचे नेतृत्व करत आहे.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 220, position: "relative" }}>
            <div style={{ background: "#1a2a4a", borderRadius: 12, overflow: "hidden", height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&h=200&fit=crop" alt="village" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
              <div style={{ position: "absolute", width: 50, height: 50, background: "rgba(255,255,255,0.9)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>▶</div>
            </div>
          </div>
        </div>

        {/* Citizen portal banner */}
        <div style={{ background: "linear-gradient(90deg,#1a2a4a,#2563eb)", borderRadius: 16, padding: "28px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginTop: 32 }}>
          <div>
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 6px", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>ग्रामपंचायत नागरिक पोर्टल</h3>
            <p style={{ color: "#93c5fd", fontSize: 13, margin: 0, maxWidth: 500 }}>
              ग्रामपंचायत नागरिक पोर्टलद्वारे तुम्हाला सर्व महत्त्वाच्या सेवांचा लाभ घेता येतो. ऑनलाइन अर्ज भरणे सर्व डिजिटल सेवांचा वापर करा.
            </p>
          </div>
          <button style={{ background: "#e8a020", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>
            अधिक जाणून घ्या →
          </button>
        </div>
      </div>
    </section>
  );
}