import { useTranslator } from "../../context/LanguageContext.js";

import Navbar from "./Navbar.jsx";

export default function Contact() {
  const { t } = useTranslator();

  const styles = {
    section: {
      padding: "60px 16px",
      background: "#f5f7fa",
      fontFamily: "Arial, sans-serif"
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "30px",
      alignItems: "center"
    },
    left: {
      textAlign: "left"
    },
    heading: {
      fontSize: "26px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#1a2a4a"
    },
    text: {
      fontSize: "14px",
      color: "#555",
      lineHeight: "1.6"
    },
    form: {
      background: "#ffffff",
      padding: "22px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    },
    row: {
      display: "flex",
      gap: "10px"
    },
    input: {
      flex: 1,
      padding: "11px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      outline: "none"
    },
    textarea: {
      padding: "11px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      minHeight: "100px",
      resize: "none",
      outline: "none"
    },
    button: {
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      background: "#2563eb",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s"
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container} className="contact-container">

        {/* LEFT */}
        <div style={styles.left}>
          <h2 style={styles.heading}>{t('contact.haveSay')}</h2>
          <p style={styles.text}>{t('contact.desc')}</p>
        </div>

        {/* RIGHT FORM */}
        <div style={styles.form}>
          <div className="form-row" style={styles.row}>
            <input placeholder={t('contact.firstName')} style={styles.input} />
            <input placeholder={t('contact.lastName')} style={styles.input} />
          </div>

          <input placeholder={t('contact.email')} style={styles.input} />
          <input placeholder={t('contact.subject')} style={styles.input} />

          <textarea placeholder={t('contact.message')} style={styles.textarea}></textarea>

          <button
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.background = "#1e40af")}
            onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
          >
            {t('contact.submit')}
          </button>
        </div>

      </div>

      {/* RESPONSIVE CSS */}
      <style>
        {`
          @media (max-width: 992px) {
            .contact-container {
              grid-template-columns: 1fr !important;
              gap: 25px !important;
            }
          }

          @media (max-width: 768px) {
            .form-row {
              flex-direction: column !important;
            }

            h2 {
              font-size: 22px !important;
              text-align: center !important;
            }

            p {
              text-align: center !important;
            }
          }

          @media (max-width: 480px) {
            section {
              padding: 40px 12px !important;
            }
          }
        `}
      </style>
    </section>
  );
}