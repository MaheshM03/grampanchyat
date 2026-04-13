import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useTranslator } from "../../context/LanguageContext.js";
import { Search, Download, Printer, Share2, FileText } from "lucide-react";
import { motion } from "framer-motion";

const tableRowsData = [
  ["1", "जन्म दाखले", "2023-24", "45", "42", "3", "-"],
  ["2", "मृत्यू दाखले", "2023-24", "28", "28", "0", "-"],
  ["3", "रहिवास दाखले", "2023-24", "112", "109", "3", "-"],
  ["4", "विवाह दाखले", "2023-24", "18", "18", "0", "-"],
  ["5", "संपत्ती कर", "2023-24", "234", "220", "14", "-"],
];



export default function RTI() {
  const { t } = useTranslator();
  const [search, setSearch] = useState("");

  const headers = Array.from({length: 7}, (_, i) => t(`rti.headers.${i}`));

  const filtered = tableRowsData.filter(row =>
    row.some(cell => cell.toLowerCase().includes(search.toLowerCase()))
  );


  const downloadCSV = () => {
    const csv = [headers, ...tableRowsData].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rti-data.csv";
    a.click();
  };

  const printPage = () => window.print();

  return (
    <section style={{ background: "#f8fafc" }}>
      <Navbar />

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "70px 20px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        borderRadius: "0 0 40px 40px"
      }}>
        <div>
          <h2 style={{ color: "#fff", fontSize: "clamp(22px,5vw,34px)", fontWeight: 800 }}>
            {t('rti.title')} <br /> {t('rti.subtitle')}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "50px 20px", textAlign: "center" }}>

        {/* SEARCH */}
        <input
          placeholder={t('rti.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}

          style={{
            padding: 10,
            width: "90%",
            maxWidth: 400,
            borderRadius: 8,
            border: "1px solid #ccc",
            marginBottom: 20
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 25,
            maxWidth: 700,
            margin: "auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >

          {/* TABLE */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#e2e8f0" }}>
                  {headers.map((h, i) => (
                    <th key={i} style={{ padding: 10 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: 8, border: "1px solid #ddd" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOOLBAR */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
            <IconBtn><Search size={16} /></IconBtn>
            <IconBtn><FileText size={16} /></IconBtn>
            <IconBtn onClick={downloadCSV}><Download size={16} /></IconBtn>
            <IconBtn onClick={printPage}><Printer size={16} /></IconBtn>
            <IconBtn><Share2 size={16} /></IconBtn>
          </div>

        </motion.div>
      </div>

      <Footer />
    </section>
  );
}

function IconBtn({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      style={{
        background: "#e0e7ff",
        color: "#1e40af",
        border: "none",
        borderRadius: 8,
        padding: "8px 12px",
        cursor: "pointer"
      }}
    >
      {children}
    </motion.button>
  );
}
