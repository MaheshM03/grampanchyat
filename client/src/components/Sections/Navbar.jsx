import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslator } from "../../context/LanguageContext.js";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { t, selectLanguage, currentLanguage } = useTranslator();

  const navLinks = [
    { key: "nav.home", name: "Home", to: "/" },
    { key: "nav.adminCommittee", name: "Admin Committee", to: "/admin-committee" },
    { key: "nav.otherCommittee", name: "Other Committee", to: "/committee" },
    { key: "nav.citizenPortal", name: "Citizen Portal", to: "/citizen-portal" },
    { key: "nav.smartVillage", name: "Smart Village", to: "/smart-village" },
    { key: "nav.rti", name: "RTI", to: "/rti" },
    { key: "nav.news", name: "News", to: "/news" },
    { key: "nav.grievance", name: "Grievance", to: "/grievance" },
{ key: "nav.aboutus", name: "About Us", to: "/aboutus" }
  ];

  return (
    <header style={{ fontFamily: "Arial, sans-serif", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      
      {/* TOP BAR */}
      <div style={{
        background: "#1a2a4a",
        color: "#fff",
        padding: "6px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "12px",
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", gap: "15px" }}>
          <span>{t('navbar.phone') || '📞 +91 9876543210'}</span>
'📧 info@gpgangavarhe.com'
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span 
            style={{ 
              cursor: "pointer", 
              padding: "4px 8px",
              borderRadius: "4px",
              background: currentLanguage === 'mr' ? 'transparent' : '#e8a020',
              color: currentLanguage === 'mr' ? '#e2e8f0' : '#1a2a4a'
            }} 
            onClick={() => selectLanguage('mr')}
          >
            🇮🇳 {t('lang.mr')}
          </span>
          <span 
            style={{ 
              cursor: "pointer", 
              padding: "4px 8px",
              borderRadius: "4px",
              background: currentLanguage === 'en' ? '#e8a020' : 'transparent',
              color: currentLanguage === 'en' ? '#1a2a4a' : '#e2e8f0'
            }} 
            onClick={() => selectLanguage('en')}
          >
            🌐 {t('lang.en')}
          </span>
          <span style={{ cursor: "pointer" }}>📷</span>
          <span style={{ cursor: "pointer" }}>f</span>
        </div>
      </div>

      {/* LOGO SECTION */}
      <div style={{
        background: "#fff",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}>
        <div style={{ textAlign: "center", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <img 
            src="/panchayat emblem.jfif" 
            alt="Panchayat Emblem" 
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <img 
            src="/emblem.jfif" 
            alt="Emblem" 
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a2a4a" }}>
              ग्रामपंचायत गंगावऱ्हे-सावरगाव
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              ता. जि. नाशिक
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{
        background: "#1a2a4a",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative"
      }}>

        {/* HAMBURGER */}
        <div
          className="menu-btn"
          style={{
            color: "#fff",
            fontSize: "22px",
            cursor: "pointer",
            display: "none"
          }}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-links" style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap"
        }}>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              style={{
                color: "#e2e8f0",
                padding: "8px 10px",
                fontSize: "13px",
                textDecoration: "none",
                borderBottom: "2px solid transparent",
                transition: "0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#2563eb";
                e.target.style.borderBottom = "2px solid #e8a020";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.borderBottom = "2px solid transparent";
              }}
            >
              {t(link.key) || link.name}
            </Link>
          ))}
        </div>

        {/* ADMIN BUTTON */}
        <Link
          to="/admin"
          style={{
            background: "#16a34a",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: "5px",
            fontSize: "13px",
            textDecoration: "none",
            fontWeight: "600"
          }}
        >
          {t('nav.admin')}
        </Link>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "#1a2a4a",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000
          }}>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setMobileMenu(false)}
                style={{
                  padding: "12px",
                  color: "#fff",
                  borderTop: "1px solid #2c3e50",
                  textDecoration: "none"
                }}
              >
                {t(link.key) || link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* RESPONSIVE CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .menu-btn {
              display: block !important;
            }

            .nav-links {
              display: none !important;
            }
          }
        `}
      </style>
    </header>
  );
}