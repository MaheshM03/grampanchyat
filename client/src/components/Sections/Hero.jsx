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
    name: "श्री. ओमकार पवार",
    role: "मुख्य कार्यकारी अधिकारी",
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
    role: "उपसरपंच",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    desc: "Deputy head assisting administration."
  },
  {
    name: "श्री. डी. पुजारी",
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
      <div className="hero">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.welcome")}</p>
      </div>

      {/* MAIN */}
      <div className="container">

        <h2>{t("hero.ministers")}</h2>
        <div className="grid">
          {ministers.map((m, i) => (
            <div key={i} className="card" onClick={() => setSelected(m)}>
              <img src={m.img} alt={m.name} />
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>

        <h2>{t("hero.gpOfficials")}</h2>
        <div className="grid">
          {gpOfficials.map((o, i) => (
            <div key={i} className="card" onClick={() => setSelected(o)}>
              <img src={o.img} alt={o.name} />
              <h3>{o.name}</h3>
              <p>{o.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selected.img} alt="" />
            <h3>{selected.name}</h3>
            <p>{selected.role}</p>
            <p className="desc">{selected.desc}</p>
            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
      
      /* HERO */
      .hero {
        background: linear-gradient(135deg, #1e3a8a, #2563eb);
        color: white;
        text-align: center;
        padding: 50px 20px;
      }

      .hero h1 {
        font-size: 2rem;
        font-weight: 700;
      }

      .hero p {
        opacity: 0.9;
        margin-top: 10px;
      }

      /* CONTAINER */
      .container {
        max-width: 1100px;
        margin: -40px auto 20px;
        background: #fff;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      }

      h2 {
        text-align: center;
        margin: 20px 0;
        color: #1e293b;
      }

      /* GRID */
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 15px;
      }

      /* CARD */
      .card {
        background: #fff;
        padding: 15px;
        border-radius: 12px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      }

      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      }

      .card img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 10px;
        transition: 0.3s;
      }

      .card:hover img {
        transform: scale(1.1);
      }

      .card h3 {
        font-size: 14px;
        margin-bottom: 4px;
      }

      .card p {
        font-size: 12px;
        color: #64748b;
      }

      /* MODAL */
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }

      .modal {
        background: white;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        width: 100%;
        max-width: 350px;
        animation: pop 0.3s ease;
      }

      @keyframes pop {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      .modal img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
      }

      .modal .desc {
        font-size: 13px;
        margin-top: 10px;
        color: #475569;
      }

      .modal button {
        margin-top: 15px;
        padding: 10px;
        width: 100%;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
      }

      /* MOBILE */
      @media (max-width: 500px) {
        .hero h1 {
          font-size: 1.5rem;
        }

        .card img {
          width: 70px;
          height: 70px;
        }

        .container {
          margin-top: -30px;
          padding: 15px;
        }
      }

      `}</style>
    </section>
  );
}