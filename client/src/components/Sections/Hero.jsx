import { useState } from "react";
import { useTranslator } from "../../context/LanguageContext.js";

const ministers = [
  {
    name: "देवेंद्र फडणवीस",
    role: "मा. मुख्यमंत्री",
    img: "/devndra fadanvis.jfif",
    desc: "Chief Minister of Maharashtra."
  },
  {
    name: "एकनाथ शिंदे",
    role: "मा. उपमुख्यमंत्री",
    img: "/eknath shinde.avif",
    desc: "Deputy Chief Minister."
  },
  {
    name: "सुनेत्रा अजित पवार",
    role: "मा. उपमुख्यमंत्री",
    img: "/sunetra ajit pawar.jfif",
    desc: "Deputy Chief Minister."
  },
  {
    name: "श्री. ओमकार पवार ",
    role: "मुख्य कार्यकारी अधिकारी, जिल्हा परिषद नाशिक",
    img: "/omkar pawar.jfif",
    desc: "Administrative officer."
  },
];

const gpOfficials = [
  {
    name: "हरिदास गणक",
    role: "सरपंच",
    img: "https://randomuser.me/api/portraits/men/21.jpg",
    desc: "Village head responsible for governance."
  },
  {
    name: "हनुमान गणक",
    role: "उपसरपंच ",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    desc: "Deputy head assisting administration."
  },
  {
    name: " श्री. डी. पुजारी",
    role: "ग्रामपंचायत अधिकारी",
    img: "https://randomuser.me/api/portraits/men/23.jpg",
    desc: "Administrative officer."
  },
  
];

export default function Hero() {
  const { t } = useTranslator();
  const [selected, setSelected] = useState(null);

  return (
    <section>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#1a2a4a,#2563eb)",
        padding: "60px 20px",
        textAlign: "center",
        color: "#fff"
      }}>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.welcome')}</p>
      </div>

      {/* MAIN CARD */}
      <div style={{
        maxWidth: "1100px",
        margin: "-40px auto 0",
        padding: "30px 20px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
      }}>

        {/* MINISTERS */}
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {t('hero.ministers')}
        </h2>

        <div style={gridStyle}>
          {ministers.map((m, i) => (
            <div key={i} style={cardStyle} onClick={() => setSelected(m)}>
              <div style={imgWrapper}>
                <img src={m.img} alt={m.name} className="zoom-img" />
              </div>
              <div style={nameStyle}>{m.name}</div>
              <div style={roleStyle}>{m.role}</div>
            </div>
          ))}
        </div>

        {/* GP OFFICIALS */}
        <h2 style={{ textAlign: "center", margin: "30px 0 20px" }}>
          {t('hero.gpOfficials')}
        </h2>

        <div style={gridStyle}>
          {gpOfficials.map((o, i) => (
            <div key={i} style={cardStyle} onClick={() => setSelected(o)}>
              <div style={imgWrapper}>
                <img src={o.img} alt={o.name} className="zoom-img" />
              </div>
              <div style={nameStyle}>{o.name}</div>
              <div style={roleStyle}>{o.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div style={overlay} onClick={() => setSelected(null)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <img src={selected.img} style={modalImg} alt="" />
            <h3>{selected.name}</h3>
            <p>{selected.role}</p>
            <p style={{ marginTop: 10 }}>{selected.desc}</p>

            <button style={btn} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* HOVER CSS */}
      <style>
        {`
          .zoom-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.4s;
          }

          .zoom-img:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </section>
  );
}

/* STYLES */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#fff",
  padding: "16px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "0.3s"
};

const imgWrapper = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "0 auto"
};

const nameStyle = {
  fontWeight: "600",
  marginTop: "10px"
};

const roleStyle = {
  fontSize: "13px",
  color: "#64748b"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center",
  width: "90%",
  maxWidth: "400px"
};

const modalImg = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "10px"
};

const btn = {
  marginTop: "15px",
  padding: "10px 20px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};