import React, { useState } from "react";


// ================= HERO =================
function Hero() {
  return (
    <div style={{
      background: "linear-gradient(135deg,#1f4e5f,#2c7da0)",
      color: "white",
      textAlign: "center",
      padding: "40px 15px"
    }}>
      <div style={{ fontSize: 32 }}>🟢</div>

      <h1 style={{ fontSize: "clamp(20px,5vw,28px)", fontWeight: "700" }}>
        ग्रामपंचायत योजना माहिती पोर्टल
      </h1>

      <p style={{ opacity: 0.9, fontSize: 14 }}>
        महाराष्ट्र शासनाच्या विविध योजनांची संपूर्ण माहिती
      </p>

      {/* Stats */}
      <div style={{
        marginTop: 20,
        background: "rgba(255,255,255,0.1)",
        padding: 15,
        borderRadius: 12,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20
      }}>
        <div>
          <h2>50+</h2>
          <p style={{ fontSize: 12 }}>योजना</p>
        </div>
        <div>
          <h2>5</h2>
          <p style={{ fontSize: 12 }}>विभाग</p>
        </div>
        <div>
          <h2>24x7</h2>
          <p style={{ fontSize: 12 }}>ऑनलाइन</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <div style={{
          background: "white",
          borderRadius: 30,
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          width: "90%",
          maxWidth: 400
        }}>
          🔍
          <input
            placeholder="योजना शोधा..."
            style={{ border: "none", outline: "none", marginLeft: 8, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

// ================= TABS =================
const categories = ["सर्व योजना","अर्थ सहाय्य","आवास","आरोग्य","कृषी","पशुपालन","ऊर्जा","महिला व बाल","रोजगार"];

function Tabs({ active, setActive }) {
  return (
    <div style={{
      display: "flex",
      overflowX: "auto",
      gap: 10,
      padding: 10
    }}>
      {categories.map((c, i) => (
        <button
          key={i}
          onClick={() => setActive(c)}
          style={{
            whiteSpace: "nowrap",
            padding: "8px 14px",
            borderRadius: 20,
            border: "none",
            background: active === c ? "#1f4e5f" : "#e5e7eb",
            color: active === c ? "white" : "#333",
            cursor: "pointer"
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

// ================= CARD =================
function Card({ title, color, data }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 350,
      background: "white",
      borderRadius: 12,
      margin: "10px auto",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden"
    }}>

      <div style={{ background: color, color: "white", padding: 12, fontWeight: "600" }}>
        {title}
      </div>

      <div style={{ padding: 15, fontSize: 14 }}>
        {data.map((d, i) => (
          <div key={i} style={{ marginBottom: 6 }}>• {d}</div>
        ))}
      </div>

      <div style={{
        borderTop: "1px solid #eee",
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{ fontSize: 12 }}>mahaonline.gov.in</span>
        <div style={{ width: 40, height: 40, background: "#ddd" }}></div>
      </div>
    </div>
  );
}

// ================= SECTION =================
function Section({ title, children }) {
  return (
    <div style={{ margin: "20px 10px" }}>
      <div style={{
        background: "#1f4e5f",
        color: "white",
        padding: 10,
        borderRadius: 6,
        fontSize: 14,
        fontWeight: "600"
      }}>
        {title}
      </div>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {children}
      </div>
    </div>
  );
}

// ================= MAIN =================
export default function Schemes() {
  const [active, setActive] = useState("सर्व योजना");

  return (
    <div style={{ background: "#f1f5f9" }}>

      <Hero />

      <Tabs active={active} setActive={setActive} />

      <Section title="१. विशेष अर्थ सहाय्य योजना">
        <Card title="संजय गांधी योजना" color="#8e44ad" data={["₹1500 मदत","वृद्ध लाभ","आधार आवश्यक"]} />
        <Card title="श्रावण बाळ योजना" color="#9b59b6" data={["ज्येष्ठ नागरिक","₹1500","ओळखपत्र"]} />
        <Card title="राष्ट्रीय वृद्ध योजना" color="#8e44ad" data={["BPL","वृद्ध लाभ","आधार"]} />
      </Section>

      <Section title="२. आवास योजना">
        <Card title="PMAY-G" color="#3498db" data={["₹1.2 लाख","ग्रामीण घर"]} />
        <Card title="शहरी आवास" color="#2980b9" data={["₹2.5 लाख","शहरी"]} />
        <Card title="आदिवासी आवास" color="#3498db" data={["₹1.2 लाख","ST लाभ"]} />
      </Section>

      <Section title="३. आरोग्य योजना">
        <Card title="PMJAY" color="#e74c3c" data={["₹5 लाख","फ्री उपचार"]} />
      </Section>

      <Section title="४. कृषी योजना">
        <Card title="पीक विमा" color="#27ae60" data={["विमा","नुकसान भरपाई"]} />
        <Card title="PM-KISAN" color="#2ecc71" data={["₹6000","DBT"]} />
        <Card title="महाडीबीटी" color="#27ae60" data={["अनुदान","शेतकरी"]} />
      </Section>

      <Section title="५. पशुपालन योजना">
        <Card title="दुध योजना" color="#6d4c41" data={["अनुदान","जनावर"]} />
        <Card title="शेळी योजना" color="#795548" data={["शेळी","अनुदान"]} />
      </Section>

      <Section title="६. ऊर्जा योजना">
        <Card title="सोलर योजना" color="#f39c12" data={["सौर पंप","अनुदान"]} />
      </Section>

      <Section title="७. महिला व बाल">
        <Card title="माझी लाडकी" color="#e91e63" data={["महिला","₹1500"]} />
        <Card title="मातृत्व योजना" color="#d81b60" data={["गर्भवती","अनुदान"]} />
      </Section>

      <Section title="८. रोजगार योजना">
        <Card title="मनरेगा" color="#f57c00" data={["100 दिवस काम","रोजगार"]} />
      </Section>

    </div>
  );
}
