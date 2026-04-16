import { useState } from "react";
import { useTranslator } from "../../context/LanguageContext.js";

export default function Hero() {
  const { t, currentLanguage } = useTranslator();
  const [selected, setSelected] = useState(null);

  const ministers = [
    {
      nameKey: "hero.minister1.name",
      roleKey: "hero.minister1.role",
      img: "/devndra fadanvis.jfif",
      descKey: "hero.minister1.desc"
    },
    {
      nameKey: "hero.minister2.name",
      roleKey: "hero.minister2.role",
      img: "/eknath shinde.avif",
      descKey: "hero.minister2.desc"
    },
    {
      nameKey: "hero.minister3.name",
      roleKey: "hero.minister3.role",
      img: "/sunetra ajit pawar.jfif",
      descKey: "hero.minister3.desc"
    },
    {
      nameKey: "hero.minister4.name",
      roleKey: "hero.minister4.role",
      img: "/omkar pawar.jfif",
      descKey: "hero.minister4.desc"
    },
  ];

  const gpOfficials = [
    {
      nameKey: "hero.official1.name",
      roleKey: "hero.official1.role",
      icon: "🏛️",
      descKey: "hero.official1.desc"
    },
    {
      nameKey: "hero.official2.name",
      roleKey: "hero.official2.role",
      icon: "🏛️",
      descKey: "hero.official2.desc"
    },
    {
      nameKey: "hero.official3.name",
      roleKey: "hero.official3.role",
      icon: "📋",
      descKey: "hero.official3.desc"
    },
  ];

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
            <div key={i} className="card" onClick={() => setSelected({ ...m, isOfficial: false })}>
              <img
                src={m.img || "/devndra fadanvis.jfif"}
                alt={t(m.nameKey)}
              />
              <h3>{t(m.nameKey)}</h3>
              <p>{t(m.roleKey)}</p>
            </div>
          ))}
        </div>

        <h2>{t("hero.gpOfficials")}</h2>
        <div className="grid">
          {gpOfficials.map((o, i) => (
            <div key={i} className="card" onClick={() => setSelected({ ...o, isOfficial: true })}>
              <img src="/human.jfif" alt={t(o.nameKey)} />
              <h3>{t(o.nameKey)}</h3>
              <p>{t(o.roleKey)}</p>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL */}
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            {selected.isOfficial ? (
              <div className="icon">{selected.icon}</div>
            ) : (
              <img src={selected.img} alt={t(selected.nameKey)} />
            )}

            <h3>{t(selected.nameKey)}</h3>
            <p>{t(selected.roleKey)}</p>
            <p className="desc">{t(selected.descKey)}</p>

            <button onClick={() => setSelected(null)}>
              {t("modal.close") || "Close"}
            </button>

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
        padding: 60px 20px;
      }

      .hero h1 {
        font-size: 2.2rem;
        font-weight: 700;
      }

      .hero p {
        margin-top: 10px;
        opacity: 0.9;
        font-size: 1rem;
      }

      /* CONTAINER */
      .container {
        max-width: 1100px;
        margin: -50px auto 20px;
        background: #fff;
        padding: 25px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      }

      h2 {
        text-align: center;
        margin: 25px 0 15px;
        color: #1e293b;
        font-size: 1.4rem;
      }

      /* GRID */
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 20px;
      }

      /* CARD */
      .card {
        background: #fff;
        padding: 18px;
        border-radius: 14px;
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
        width: 85px;
        height: 85px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 12px;
        transition: 0.3s;
      }

      .card:hover img {
        transform: scale(1.1);
      }

      .card h3 {
        font-size: 15px;
        margin-bottom: 5px;
      }

      .card p {
        font-size: 13px;
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
        padding: 15px;
      }

      .modal {
        background: white;
        padding: 22px;
        border-radius: 14px;
        text-align: center;
        width: 100%;
        max-width: 360px;
        animation: pop 0.3s ease;
      }

      .icon {
        font-size: 60px;
        margin-bottom: 10px;
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
        object-fit: cover;
      }

      .modal .desc {
        font-size: 14px;
        margin-top: 10px;
        color: #475569;
      }

      .modal button {
        margin-top: 15px;
        padding: 12px;
        width: 100%;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 600;
      }

      /* TABLET */
      @media (max-width: 768px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .hero h1 {
          font-size: 1.8rem;
        }
      }

      /* MOBILE */
      @media (max-width: 480px) {
        .grid {
          grid-template-columns: 1fr;
        }

        .hero {
          padding: 40px 10px;
        }

        .hero h1 {
          font-size: 1.5rem;
        }

        .container {
          padding: 15px;
          margin-top: -30px;
        }

        .card img {
          width: 70px;
          height: 70px;
        }

        .modal {
          max-width: 95%;
          padding: 18px;
        }

        .modal img {
          width: 85px;
          height: 85px;
        }
      }

      `}</style>

    </section>
  );
}