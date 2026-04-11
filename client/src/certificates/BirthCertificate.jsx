import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Sections/Navbar";

export default function BirthCertificate() {
  return (
    <>
    <Navbar/>
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#e5e7eb",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          जन्म प्रमाणपत्र
        </h1>

        <button
          style={{
            marginTop: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            color: "#374151",
            backgroundColor: "#facc15",
            padding: "6px 12px",
            borderRadius: "999px",
            border: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={14} /> BACK TO HOME
        </button>
      </div>

      {/* Top Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1c1c3a",
            color: "white",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            padding: "32px",
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
            ग्रामपंचायत पोर्टलवरून जन्म प्रमाणपत्र मिळवा
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "#d1d5db",
              marginBottom: "24px",
              lineHeight: "1.6",
            }}
          >
            खालील प्रमाणपत्र मिळवण्यासाठी क्लिक करा जन्म प्रमाणपत्रासाठी अर्ज
            सबमिट करा अर्ज सबमिट केल्यानंतर तुम्हाला टोकन नंबर मिळेल तो जतन ठेवा.
          </p>

         
        </div>
      </div>

      {/* Details Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            padding: "24px",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
            जन्म दाखला / Birth Certificate
          </h3>

          <p style={{ fontSize: "14px", marginBottom: "10px", color: "#374151" }}>
            💰 शुल्क: ₹20
          </p>

          <hr />

          <h4 style={{ marginTop: "12px", fontSize: "15px", fontWeight: "600" }}>
            आवश्यक कागदपत्रे / Required Documents
          </h4>
          <ul style={{ fontSize: "14px", paddingLeft: "18px", lineHeight: "1.8" }}>
            <li>बाळाचा जन्म नोंद</li>
            <li>पालकांचा आधार कार्ड</li>
            <li>रुग्णालय प्रमाणपत्र</li>
          </ul>

          <h4 style={{ marginTop: "12px", fontSize: "15px", fontWeight: "600" }}>
            प्रक्रिया / Process
          </h4>
          <ul style={{ fontSize: "14px", paddingLeft: "18px", lineHeight: "1.8" }}>
            <li>ऑनलाइन अर्ज करा</li>
            <li>कागदपत्रे अपलोड करा</li>
            <li>फी भरा</li>
            <li>प्रमाणपत्र डाउनलोड करा</li>
          </ul>

          <h4 style={{ marginTop: "12px", fontSize: "15px", fontWeight: "600" }}>
            कालावधी / Timeline
          </h4>
          <p style={{ fontSize: "14px" }}>2–3 दिवस</p>
        </div>
      </div>

      {/* Apply Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "40px",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1c1c3a",
            color: "white",
            borderRadius: "12px",
            padding: "20px",
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>अर्ज करण्यासाठी तयार आहात?</h4>

          <Link to="/birth-apply" style={{
              backgroundColor: "#facc15",
              color: "#1f2937",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              textDecoration: "none",
              display: "inline-block"
            }}>
            Apply Now
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}