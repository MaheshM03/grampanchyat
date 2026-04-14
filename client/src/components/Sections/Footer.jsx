import { useTranslator } from '../../context/LanguageContext.js';

export default function Footer() {
  const { t } = useTranslator();

  const quickLinks = [t('footer.quick.birth'), t('footer.quick.plans'), t('footer.quick.meetings')];
  const servicesList = [t('footer.services.citizen'), t('footer.services.taxes'), t('footer.services.projects')];
  const infoList = [t('footer.info.roads'), t('footer.info.loans')];
  const sponsors = [t('footer.sponsors.digital'), t('footer.sponsors.mygov'), t('footer.sponsors.azadi'), t('footer.sponsors.eco')];


  return (
    <footer style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>

      {/* MAIN FOOTER */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        color: "#e2e8f0",
        padding: "50px 16px"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* TOP TEXT */}
          <div style={{ marginBottom: 30, textAlign: "center" }}>
            <h3 style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#fff",
              marginBottom: 10
            }}>
              आपल्या विकासासाठी, आपल्या सेवेसाठी – ग्रामपंचायत गंगावऱ्हे-सावरगाव
            </h3>

            <p style={{
              fontSize: "14px",
              color: "#cbd5e1",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: "1.75"
            }}>
              ग्रामपंचायत गंगावऱ्हे-सावरगाव अधिकृत वेबसाईट – नागरिकांसाठी माहिती, योजना आणि डिजिटल सुविधा.
            </p>
          </div>

          <div className="footer-cta" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "18px",
            marginBottom: "32px",
            padding: "24px 24px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)"
          }}>
            <div>
              <h4 style={{ margin: 0, fontSize: "1.15rem", color: "#fff" }}>
                त्वरित मदत आणि माहिती मिळवा
              </h4>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.7, maxWidth: "540px" }}>
                प्रमाणपत्र, तक्रार किंवा योजना संबंधी मदतीसाठी आमच्याशी आजच संपर्क साधा.
              </p>
            </div>
            <a href="mailto:contact@grampanchayat.com" style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 22px",
              background: "#eab308",
              color: "#0f172a",
              borderRadius: "999px",
              fontWeight: 700
            }}>
              आम्हाला ईमेल करा
            </a>
          </div>

          {/* GRID */}
          <div className="footer-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
            marginBottom: "30px"
          }}>

            {/* ABOUT */}
            <div>
              <h4 style={{ color: "#e8a020", marginBottom: 14 }}>{t('footer.about')}</h4>
              {quickLinks.map((l, i) => (
                <a key={i} href="#" style={linkStyle}>
                  ▸ {l}
                </a>
              ))}
            </div>

            {/* SERVICES */}
            <div>
              <h4 style={{ color: "#e8a020", marginBottom: 14 }}>{t('footer.services')}</h4>
              {servicesList.map((l, i) => (
                <a key={i} href="#" style={linkStyle}>
                  ▸ {l}
                </a>
              ))}
            </div>

            {/* CONTACT */}
            <div>
              <h4 style={{ color: "#e8a020", marginBottom: 14 }}>{t('footer.contact')}</h4>
              <p style={textStyle}>✉ {t('footer.email')}</p>
              <p style={textStyle}>📞 {t('footer.phone')}</p>
              <p style={{ ...textStyle, lineHeight: 1.6 }}>
                {t('footer.address')}
              </p>

              <div style={{
                marginTop: 10,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#000",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer"
              }}>
                ▶ {t('footer.play')}
              </div>
            </div>

          </div>

          {/* SPONSORS */}
          <div className="footer-sponsors" style={{
            borderTop: "1px solid #334155",
            paddingTop: 20,
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap"
          }}>
            {sponsors.map((s, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: "600",
                color: "#1a2a4a"
              }}>
                {s}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div style={{
        background: "#e8a020",
        padding: "12px 16px",
        textAlign: "center",
        fontSize: 12,
        color: "#1a2a4a"
      }}>
        © 2025 grampanchayatgangavarhe.com | Developed by Mahesh
      </div>

      {/* COMMON STYLES */}
      <style>
        {`
          a {
            display: block;
            margin-bottom: 8px;
            color: #cbd5e1;
          }

          .footer-cta a {
            display: inline-flex;
          }

          @media (max-width: 992px) {
            .footer-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              text-align: center;
            }

            .footer-sponsors {
              justify-content: center !important;
            }

            .footer-cta {
              flex-direction: column;
              text-align: center;
            }
          }
        `}
      </style>
    </footer>
  );
}

// reusable styles
const linkStyle = {
  color: "#94a3b8",
  fontSize: "13px",
  textDecoration: "none",
  marginBottom: "8px"
};

const textStyle = {
  fontSize: "13px",
  color: "#94a3b8",
  marginBottom: "6px"
};