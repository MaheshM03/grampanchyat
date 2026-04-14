import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslator } from "../../context/LanguageContext.js";
import { Phone, Mail, Baby, Skull, Home, ListChecks } from "lucide-react";

export default function Navbar() {
const [mobileMenu, setMobileMenu] = useState(false);
  const [citizenOpen, setCitizenOpen] = useState(false);
  const [mobileCitizenOpen, setMobileCitizenOpen] = useState(false);
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
    { key: "nav.aboutus", name: "About Us", to: "/aboutus" },
  ];

  const portalIndex = navLinks.findIndex(link => link.key === "nav.citizenPortal");
  const beforeLinks = portalIndex >= 0 ? navLinks.slice(0, portalIndex) : navLinks;
  const afterLinks = portalIndex >= 0 ? navLinks.slice(portalIndex + 1) : [];

  const desktopLinkStyle = {
    color: "#e2e8f0",
    padding: "8px 10px",
    fontSize: "13px",
    textDecoration: "none",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center"
  };

  const mobileLinkStyle = {
    padding: "12px",
    color: "#fff",
    borderTop: "1px solid #2c3e50",
    textDecoration: "none",
    transition: "background 0.2s ease"
  };

  return (
    <header style={{ fontFamily: "Arial, sans-serif", boxShadow: "0 12px 35px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 999, background: "rgba(250,250,255,0.96)", backdropFilter: "blur(15px)" }}>
      
      {/* TOP BAR */}
      <div style={{
        background: "linear-gradient(90deg, rgba(26,42,74,0.98), rgba(37,99,235,0.96))",
        color: "#fff",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "12px",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Phone size={14} /> {t('navbar.phone') || '+91 9876543210'}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Mail size={14} /> info@gpgangavarhe.com</span>
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
        background: "rgba(15,23,42,0.94)",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)"
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
          {beforeLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="nav-link"
              style={desktopLinkStyle}
            >
              {t(link.key) || link.name}
            </Link>
          ))}

          {/* Citizen Portal Dropdown */}
          <div style={{ position: "relative" }} 
               onMouseEnter={() => setCitizenOpen(true)}
               onMouseLeave={() => setCitizenOpen(false)}>
            <Link
              to="/citizen-portal"
              className="nav-link"
              style={desktopLinkStyle}
            >
              {t('nav.citizenPortal') || "Citizen Portal"}
            </Link>
            {citizenOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#1a2a4a",
                minWidth: "180px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                borderRadius: "8px",
                zIndex: 1001,
                borderTop: "2px solid #e8a020"
              }}>
                <Link to="/birth-certificate" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: "13px"
                }}>
                  <Baby size={16} /> Birth Certificate
                </Link>
                <Link to="/death-certificate" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: "13px"
                }}>
                  <Skull size={16} /> Death Certificate
                </Link>
                <Link to="/residence-certificate" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: "13px"
                }}>
                  <Home size={16} /> Residence Certificate
                </Link>
                <Link to="/schemes" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: "13px"
                }}>
                  <ListChecks size={16} /> Schemes
                </Link>
              </div>
            )}
          </div>

          {afterLinks.map((link, i) => (
            <Link
              key={`after-${i}`}
              to={link.to}
              className="nav-link"
              style={desktopLinkStyle}
            >
              {t(link.key) || link.name}
            </Link>
          ))}
        </div>

        {/* ADMIN BUTTON */}
        <Link
          to="/admin-login"
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
          Admin Login
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
            {beforeLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setMobileMenu(false)}
                className="mobile-nav-link"
                style={mobileLinkStyle}
              >
                {t(link.key) || link.name}
              </Link>
            ))}

            {/* Mobile Citizen Portal */}
            <div>
              <div
                style={{
                  padding: "12px",
                  color: "#fff",
                  borderTop: "1px solid #2c3e50",
                  cursor: "pointer"
                }}
                onClick={() => setMobileCitizenOpen(!mobileCitizenOpen)}
              >
                {t('nav.citizenPortal') || "Citizen Portal"}
              </div>
              {mobileCitizenOpen && (
                <div>
                  <Link to="/birth" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    color: "#e2e8f0",
                    textDecoration: "none",
                    fontSize: "13px",
                    borderTop: "1px solid #2c3e50"
                  }} onClick={() => setMobileMenu(false)}>
                  <Baby size={16} /> Birth Certificate
                  </Link>
                  <Link to="/death" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    color: "#e2e8f0",
                    textDecoration: "none",
                    fontSize: "13px",
                    borderTop: "1px solid #2c3e50"
                  }} onClick={() => setMobileMenu(false)}>
                  <Skull size={16} /> Death Certificate
                  </Link>
                  <Link to="/residence" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    color: "#e2e8f0",
                    textDecoration: "none",
                    fontSize: "13px"
                  }} onClick={() => setMobileMenu(false)}>
                  <Home size={16} /> Residence Certificate
                  </Link>
                  <Link to="/schemes" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    color: "#e2e8f0",
                    textDecoration: "none",
                    fontSize: "13px",
                    borderTop: "1px solid #2c3e50"
                  }} onClick={() => setMobileMenu(false)}>
                    <ListChecks size={16} /> Schemes
                  </Link>
                </div>
              )}
            </div>

            {afterLinks.map((link, i) => (
              <Link
                key={`mobile-after-${i}`}
                to={link.to}
                onClick={() => setMobileMenu(false)}
                className="mobile-nav-link"
                style={mobileLinkStyle}
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

          .nav-link {
            color: #e2e8f0;
            padding: 8px 10px;
            font-size: 13px;
            text-decoration: none;
            border-bottom: 2px solid transparent;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
          }

          .nav-link:hover {
            background: rgba(59,130,246,0.18);
            border-bottom: 2px solid #eab308;
            border-radius: 12px;
          }

          .mobile-nav-link:hover {
            background: rgba(255,255,255,0.08);
          }
        `}
      </style>
    </header>
  );
}