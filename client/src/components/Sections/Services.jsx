import { useTranslator } from '../../context/LanguageContext.js';
import { Link } from 'react-router-dom';

export default function OnlineServices() {
  const { t, currentLanguage } = useTranslator();

const serviceKeys = [
{ icon: "📜", titleKey: 'services.birth.title', descKey: 'services.birth.desc', to: '/birth' },
    { icon: "⚰️", titleKey: 'services.death.title', descKey: 'services.death.desc', to: '/death' },
    { icon: "🏠", titleKey: 'services.residence.title', descKey: 'services.residence.desc', to: '/residence' },
    { icon: "📢", titleKey: 'services.grievance.title', descKey: 'services.grievance.desc', to: '/grievance' },
    { icon: "📰", titleKey: 'services.news.title', descKey: 'services.news.desc', to: '/news' },
    { icon: "💳", titleKey: 'services.payment.title', descKey: 'services.payment.desc', to: '/payment' }
  ];

  const services = serviceKeys.map(s => ({
    icon: s.icon,
    title: t(s.titleKey),
    desc: t(s.descKey),
    to: s.to
  }));

  return (
    <section style={{
      padding: "50px 16px",
      background: "#fff",
      fontFamily: "'Noto Sans Devanagari', sans-serif"
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h2 style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#1a2a4a",
            marginBottom: 10
          }}>
            {t('services.title')}
          </h2>

          <p style={{
            color: "#64748b",
            fontSize: "14px",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            {t('services.desc')}
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="services-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: 40
        }}>
          {services.map((s, i) => (
            <Link
              key={i}
              to={s.to || '#'}
              style={{
                background: i === 0
                  ? "linear-gradient(135deg,#e8a020,#f59e0b)"
                  : "#f8fafc",
                borderRadius: 10,
                padding: "18px",
                border: "1px solid #e2e8f0",
                transition: "0.3s",
                cursor: "pointer",
                textAlign: "left",
                textDecoration: 'none',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.background = "#eef6ff";
                }
              }}
              onMouseLeave={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.background = "#f8fafc";
                }
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>
                {s.icon}
              </div>

              <div style={{
                fontWeight: 600,
                fontSize: "14px",
                color: i === 0 ? "#fff" : "#1a2a4a",
                marginBottom: 6
              }}>
                {s.title}
              </div>

              {i === 0 ? (
                <div style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.9)"
                }}>
                  {s.desc}
                </div>
              ) : (
                <div style={{
                  fontSize: "12px",
                  color: "#2563eb",
                  textDecoration: "none"
                }}>
                  ऑनलाइन उपलब्ध →
                </div>
              )}
            </Link>
          ))}
        </div>

       

      </div>

      {/* RESPONSIVE FIXES */}
      <style>
        {`
          @media (max-width: 768px) {
            .services-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }

            .special-grid {
              grid-template-columns: repeat(1, 1fr) !important;
            }

            h2 {
              font-size: 22px !important;
            }
          }

          @media (max-width: 480px) {
            .services-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
}