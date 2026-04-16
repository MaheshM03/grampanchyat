import Navbar from "./Navbar";
import { useTranslator } from "../../context/LanguageContext.js";

const conflictFreeMembers = [
  {
    sr: 1,
    position: "Sarpanch",
    positionMr: "सरपंच",
    name: "Shri. Laxman Jagannath Bendkule",
    role: "Sarpanch",
    roleMr: "सरपंच"
  },
  {
    sr: 2,
    position: "Up-Sarpanch",
    positionMr: "उपसरपंच",
    name: "Smt. Rohini Vinayak Gade",
    role: "Up-Sarpanch",
    roleMr: "उपसरपंच"
  },
  {
    sr: 3,
    position: "Member",
    positionMr: "सदस्य",
    name: "Shri. Raja Rajaram Dhongade",
    role: "Member",
    roleMr: "सदस्य"
  },
  {
    sr: 4,
    position: "Member",
    positionMr: "सदस्य",
    name: "Shri. Nitin Chhagan Dhongade",
    role: "Member",
    roleMr: "सदस्य"
  },
  {
    sr: 5,
    position: "Member",
    positionMr: "सदस्या",
    name: "Smt. Archana Vijay Dande",
    role: "Member",
    roleMr: "सदस्या"
  },
  {
    sr: 6,
    position: "Member",
    positionMr: "सदस्य",
    name: "Shri. Prakash Tanajirao Dhongade",
    role: "Member",
    roleMr: "सदस्य"
  },
  {
    sr: 7,
    position: "Member",
    positionMr: "सदस्य",
    name: "Shri. Sanjay Hiraman Gotarne",
    role: "Member",
    roleMr: "सदस्य"
  },
  {
    sr: 8,
    position: "Member",
    positionMr: "सदस्या",
    name: "Smt. Anjana Deepak Bendkule",
    role: "Member",
    roleMr: "सदस्या"
  },
  {
    sr: 9,
    position: "Member",
    positionMr: "सदस्या",
    name: "Smt. Rupali Satish More",
    role: "Member",
    roleMr: "सदस्या"
  },
  {
    sr: 10,
    position: "Member",
    positionMr: "सदस्या",
    name: "Smt. Usha Rohidas Gotarne",
    role: "Member",
    roleMr: "सदस्या"
  },
  {
    sr: 11,
    position: "Gram Panchayat Officer",
    positionMr: "ग्रामपंचायत अधिकारी",
    name: "Shri. Prashant Bankat Kanade",
    role: "Officer",
    roleMr: "अधिकारी"
  },
  {
    sr: 12,
    position: "Tax Clerk",
    positionMr: "वसुली लिपिक",
    name: "Shri. Motiram Damu Bendkule",
    role: "Clerk",
    roleMr: "लिपिक"
  },
  {
    sr: 13,
    position: "Staff",
    positionMr: "पाणी पुरवठा कर्मचारी",
    name: "Shri. Vinod Chandu Gotarne",
    role: "Employee",
    roleMr: "कर्मचारी"
  },
  {
    sr: 14,
    position: "Staff",
    positionMr: "पाणी पुरवठा कर्मचारी",
    name: "Shri. Dhananjay Ramu Bendkule",
    role: "Employee",
    roleMr: "कर्मचारी"
  }
];

export default function OtherCommittee() {
  const { currentLanguage } = useTranslator();

  return (
    <section className="section">
      <Navbar />

      {/* HERO */}
      <div className="hero">
        <div className="heroContent">
          <h2>Other Committee Members</h2>
          <p>Gram Panchayat Executive Committee Details</p>
        </div>
        <div className="heroIcon">🏛️</div>
      </div>

      {/* TITLE */}
      <h3 className="title">
        {currentLanguage === "mr"
          ? "ग्रामपंचायत कार्यकारी मंडळ"
          : "Gram Panchayat Executive Committee"}
      </h3>

      {/* TABLE */}
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>{currentLanguage === "mr" ? "पद" : "Position"}</th>
              <th>{currentLanguage === "mr" ? "नाव" : "Name"}</th>
              <th>{currentLanguage === "mr" ? "भूमिका" : "Role"}</th>
            </tr>
          </thead>

          <tbody>
            {conflictFreeMembers.map((m, i) => (
              <tr key={i}>
                <td>{m.sr}</td>

                <td>
                  {currentLanguage === "mr"
                    ? m.positionMr
                    : m.position}
                </td>

                <td className="name">{m.name}</td>

                <td>
                  <span className="badge">
                    {currentLanguage === "mr"
                      ? m.roleMr
                      : m.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CSS */}
      <style>{`

      .section {
        background: #f8fafc;
        min-height: 100vh;
      }

      .hero {
        background: linear-gradient(135deg,#1e3a8a,#2563eb);
        color: white;
        padding: 50px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .heroContent h2 {
        font-size: 2rem;
      }

      .heroContent p {
        opacity: 0.9;
        margin-top: 8px;
      }

      .heroIcon {
        font-size: 60px;
      }

      .title {
        text-align: center;
        margin: 25px 0;
        color: #1e3a8a;
      }

      .tableWrapper {
        max-width: 1000px;
        margin: auto;
        background: white;
        border-radius: 12px;
        overflow-x: auto;
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
      }

      .table th {
        background: #1e3a8a;
        color: white;
        padding: 12px;
        text-align: left;
      }

      .table td {
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
      }

      .table tr:nth-child(even) {
        background: #f1f5f9;
      }

      .name {
        font-weight: 600;
      }

      .badge {
        background: #dbeafe;
        color: #1d4ed8;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
      }

      /* MOBILE */
      @media (max-width: 600px) {
        .hero {
          flex-direction: column;
          text-align: center;
        }

        .heroIcon {
          margin-top: 10px;
        }

        .heroContent h2 {
          font-size: 1.5rem;
        }

        .table {
          min-width: 500px;
        }
      }

      `}</style>
    </section>
  );
}