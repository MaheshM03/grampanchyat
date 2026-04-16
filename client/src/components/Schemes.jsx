import React, { useState } from "react";
import Navbar from "./Sections/Navbar";


// ================= HERO =================
function Hero({ searchTerm, setSearchTerm }) {
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
export default function Card({ title, dept, beneficiary, eligibility, benefit, documents, color = "#7c3aed" }) {
  return (
    <>
      <style>{`
        .scheme-card {
          max-width: 420px;
          margin: 20px auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          font-family: 'Noto Sans Devanagari', sans-serif;
          background: #f1f5f9;
        }

        .scheme-header {
          background: linear-gradient(135deg,${color},#9333ea);
          color: white;
          padding: 16px;
        }

        .scheme-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }

        .scheme-header p {
          margin: 4px 0 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .scheme-body {
          padding: 16px;
        }

        .section {
          margin-bottom: 14px;
        }

        .section-title {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .list {
          padding-left: 16px;
        }

        .list li {
          font-size: 13px;
          margin-bottom: 4px;
          color: #334155;
        }

        .benefit-box {
          background: #16a34a;
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          font-weight: 700;
          display: inline-block;
          margin-top: 5px;
          box-shadow: 0 4px 10px rgba(22,163,74,0.3);
        }

        .scheme-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-top: 1px solid #e2e8f0;
          font-size: 12px;
        }

        .scheme-footer a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
        }

        .qr {
          width: 60px;
          height: 60px;
          background: #e5e7eb;
          border-radius: 6px;
        }

        @media (max-width: 480px) {
          .scheme-card {
            margin: 10px;
          }
        }
      `}</style>

      <div className="scheme-card">

        <div className="scheme-header">
          <h3>{title}</h3>
          <p>{dept}</p>
        </div>

        <div className="scheme-body">

          {beneficiary && (
            <div className="section">
              <div className="section-title">लाभार्थी</div>
              <ul className="list">
                {beneficiary.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {eligibility && (
            <div className="section">
              <div className="section-title">पात्रता</div>
              <ul className="list">
                {eligibility.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {benefit && (
            <div className="section">
              <div className="section-title">लाभ</div>
              <div className="benefit-box">{benefit}</div>
            </div>
          )}

          {documents && (
            <div className="section">
              <div className="section-title">कागदपत्रे</div>
              <ul className="list">
                {documents.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

        </div>

        <div className="scheme-footer">
          <div>
            संपूर्ण माहितीसाठी लॉग इन करा<br/>
            <a href="https://aaplesarkar.mahaonline.gov.in" target="_blank" rel="noopener noreferrer">aaplesarkar.mahaonline.gov.in</a>
          </div>
          <div className="qr"></div>
        </div>

      </div>
    </>
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
  const [searchTerm, setSearchTerm] = useState(""); // Added search state

  // schemesData matching hardcoded structure
  // Restructured schemesData with detailed props for new Card
  const schemesData = [
    {
      category: "अर्थ सहाय्य",
      title: "१. विशेष अर्थ सहाय्य योजना",
      cards: [
        { 
          title: "संजय गांधी निराधार अनुदान योजना", 
          dept: "सामाजिक न्याय विभाग",
          color: "#7c3aed",
          beneficiary: [
            "विधवा, दिव्यांग, दुर्धर आजारग्रस्त, अनाथ, परित्यक्ता",
            "३५ वर्षांतील अविवाहित निराधार स्त्री"
          ],
          eligibility: [
            "वय: १८-६५, महाराष्ट्र रहिवासी १५ वर्ष, उत्पन्न ₹२१,०००/-"
          ],
          benefit: "दरमहा ₹ १,५००/-",
          documents: [
            "आधार कार्ड, रहिवासी दाखला, उत्पन्न दाखला, बँक पासबुक, पासपोर्ट फोटो"
          ]
        },
        { 
          title: "श्रावण बाळ योजना", 
          dept: "सामाजिक न्याय विभाग",
          color: "#9b59b6",
          beneficiary: ["ज्येष्ठ नागरिक (६५+)"],
          eligibility: ["महाराष्ट्र रहिवासी", "आर्थिकदृष्ट्या दुर्बल"],
          benefit: "दरमहा ₹१,५००/-",
          documents: ["आधार, ओळखपत्र, रहिवासी पुरावा"]
        },
        { 
          title: "राष्ट्रीय वृद्ध योजना", 
          dept: "केंद्रीय सामाजिक न्याय मंत्रालय",
          color: "#8e44ad",
          beneficiary: ["BPL वृद्ध नागरिक"],
          eligibility: ["६०+ वय", "BPL कुटुंब"],
          benefit: "₹२००-५००/महिना",
          documents: ["आधार, वयप्रमाणपत्र"]
        }
      ]
    },
    {
      category: "आवास",
      title: "२. आवास योजना",
      cards: [
        { 
          title: "PMAY-G", 
          dept: "ग्रामीण विकास विभाग",
          color: "#3498db",
          beneficiary: ["ग्रामीण भूमीहीन/कमकुवत"],
          eligibility: ["घर नसलेले BPL कुटुंब"],
          benefit: "₹१.२० लाख पर्यंत अनुदान",
          documents: ["आधार, जमीन दस्तऐवज"]
        },
        { 
          title: "शहरी आवास", 
          dept: "शहरी विकास विभाग",
          color: "#2980b9",
          beneficiary: ["शहरी EWS/LIG"],
          eligibility: ["घर नसलेले शहरी कुटुंब"],
          benefit: "₹२.५० लाख पर्यंत",
          documents: ["आधार, रहिवासी पुरावा"]
        },
        { 
          title: "आदिवासी आवास", 
          dept: " आदिवासी विकास विभाग",
          color: "#3498db",
          beneficiary: ["ST कुटुंब"],
          eligibility: ["आदिवासी, घर नसलेले"],
          benefit: "₹१.२० लाख",
          documents: [" जमीन दस्तऐवज, ST प्रमाणपत्र"]
        }
      ]
    },
    {
      category: "आरोग्य",
      title: "३. आरोग्य योजना",
      cards: [
        { 
          title: "PMJAY", 
          dept: "आरोग्य विभाग",
          color: "#e74c3c",
          beneficiary: ["SECC 2011 डेटाबेस कुटुंब"],
          eligibility: ["अमच्यांची कव्हरेज नसलेले"],
          benefit: "₹५ लाख/कुटुंब/वर्ष",
          documents: ["आधार, रेशन कार्ड"]
        }
      ]
    },
    {
      category: "कृषी",
      title: "४. कृषी योजना",
      cards: [
        { 
          title: "पीक विमा योजना", 
          dept: "कृषी विभाग",
          color: "#27ae60",
          beneficiary: ["पीक विमा घेतलेले शेतकरी"],
          eligibility: ["नोटिफाई क्षेत्रातील पिके"],
          benefit: "नुकसान भरपाई",
          documents: ["पिक विमा पॉलिसी"]
        },
        { 
          title: "PM-KISAN", 
          dept: "कृषी विभाग",
          color: "#2ecc71",
          beneficiary: ["छोटे शेतकरी"],
          eligibility: ["२ हेक्टर पर्यंत जमीन"],
          benefit: "₹६,०००/वर्ष (३ किश्ती)",
          documents: ["आधार, बँक खाते"]
        },
        { 
          title: "महाडीबीटी", 
          dept: "कृषी विभाग",
          color: "#27ae60",
          beneficiary: ["शेतकरी"],
          eligibility: ["नांदेड जिल्हा शेतकरी"],
          benefit: "बियाणे/खते अनुदान",
          documents: ["शेतकरी नोंद"]
        }
      ]
    },
    {
      category: "पशुपालन",
      title: "५. पशुपालन योजना",
      cards: [
        { 
          title: "दुध उत्पादन योजना", 
          dept: "पशुसंवर्धन विभाग",
          color: "#6d4c41",
          beneficiary: ["दुध उत्पादक"],
          eligibility: ["नंदी/म्हशी धारक"],
          benefit: ["अनुदान, प्रशिक्षण"],
          documents: ["जनावर ओळख"]
        },
        { 
          title: "शेळी पालन योजना", 
          dept: "पशुसंवर्धन विभाग",
          color: "#795548",
          beneficiary: ["छोटे शेतकरी"],
          eligibility: ["शेळी पालन इच्छुक"],
          benefit: ["शेळी अनुदान"],
          documents: ["आधार"]
        }
      ]
    },
    {
      category: "ऊर्जा",
      title: "६. ऊर्जा योजना",
      cards: [
        { 
          title: "सोलर पंप योजना", 
          dept: "ऊर्जा विभाग",
          color: "#f39c12",
          beneficiary: ["शेतकरी"],
          eligibility: ["नदी/कूप जवळ शेती"],
          benefit: ["सौर पंप सबसिडी ९०%"],
          documents: ["शेती दस्तऐवज"]
        }
      ]
    },
    {
      category: "महिला व बाल",
      title: "७. महिला व बाल",
      cards: [
        { 
          title: "माझी लाडकी", 
          dept: "महिला व बाल विकास",
          color: "#e91e63",
          beneficiary: ["मुली"],
          eligibility: ["मुलगी १३ वर्षे"],
          benefit: "₹५०,०००/मुलगी",
          documents: ["जन्म प्रमाणपत्र"]
        },
        { 
          title: "मातृत्व वंदना", 
          dept: "महिला व बाल विकास",
          color: "#d81b60",
          beneficiary: ["गर्भवती महिल"],
          eligibility: ["पहिली/दुसरी मुलगी"],
          benefit: "₹५,०००",
          documents: ["लग्न प्रमाणपत्र"]
        }
      ]
    },
    {
      category: "रोजगार",
      title: "८. रोजगार योजना",
      cards: [
        { 
          title: "मनरेगा", 
          dept: "ग्रामीण विकास विभाग",
          color: "#f57c00",
          beneficiary: ["ग्रामीण कुटुंब"],
          eligibility: ["Job Card धारक"],
          benefit: "१०० दिवस काम/वर्ष ₹२५०/दिवस",
          documents: ["Job Card"]
        }
      ]
    }
  ];

  // Filter logic
  const filteredSchemes = schemesData
    .filter(section => active === "सर्व योजना" || section.category === active)
    .map(section => ({
      ...section,
      cards: section.cards.filter(card => {
        const matchesSearch = searchTerm === "" || 
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (card.beneficiary?.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())) ||
           card.eligibility?.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (typeof card.benefit === 'string' && card.benefit.toLowerCase().includes(searchTerm.toLowerCase())) ||
           card.documents?.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())));
        return matchesSearch;
      })
    }))
    .filter(section => section.cards.length > 0); // Hide empty sections

  return (
    <>  
    <Navbar/>
    <div style={{ background: "#f1f5f9" }}>

      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


      <Tabs active={active} setActive={setActive} />

      {filteredSchemes.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
          <h3>कोणतीही योजना सापडली नाही</h3>
          <p>वेगळे शब्द किंवा विभाग वापरा</p>
        </div>
      ) : (
        filteredSchemes.map((section, i) => (
          <Section key={i} title={section.title}>
{section.cards.map((card, j) => (
              <Card 
                key={j} 
                title={card.title}
                dept={card.dept}
                beneficiary={card.beneficiary}
                eligibility={card.eligibility}
                benefit={card.benefit}
                documents={card.documents}
                color={card.color}
              />
            ))}
          </Section>
        ))
      )}

    </div>
    </>
  );
}
