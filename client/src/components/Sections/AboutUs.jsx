import Navbar from "./Navbar";
import { Users, User, Home, GraduationCap, School, Baby } from "lucide-react";

export default function AboutUs() {

  const infoRow = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px"
  };

  return (
    <>
      <Navbar />

      <style>{`
        body {
          background: #f8fafc;
          font-family: Inter, sans-serif;
          color: #0f172a;
        }

        /* HEADER */
        .header {
          background: linear-gradient(135deg,#020617,#1e3a8a,#2563eb);
          color: white;
          padding: 30px 15px;
          text-align: center;
          font-size: clamp(18px,4vw,24px);
          font-weight: 800;
          border-radius: 0 0 30px 30px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 20px;
        }

        .section {
          margin: 35px 0;
        }

        /* SECTION TITLE */
        .section-title {
          background: linear-gradient(135deg,#1e3a8a,#2563eb);
          color: #fff;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 700;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        /* CARD */
        .card {
          background: #ffffff;
          border-radius: 16px;
          padding: 18px;
          margin-top: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.12);
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        /* STAT BOX */
        .stat-box {
          background: linear-gradient(135deg,#f1f5f9,#e2e8f0);
          padding: 18px;
          text-align: center;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          transition: 0.3s;
        }

        .stat-box:hover {
          transform: scale(1.03);
          background: #e0e7ff;
        }

        .stat-box p {
          margin: 5px 0;
          font-size: 14px;
          color: #475569;
        }

        .stat-box b {
          font-size: 18px;
          color: #1e293b;
        }

        .label {
          color: #64748b;
        }

        /* TEXT */
        .text {
          line-height: 1.8;
          font-size: 14px;
          color: #334155;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .container {
            padding: 15px;
          }

          .card {
            padding: 14px;
          }

          .section-title {
            font-size: 14px;
            padding: 10px;
          }
        }
      `}</style>

      {/* HEADER */}
      <div className="header">
        ग्रामपंचायत गंगावऱ्हे - सावरगाव
      </div>

      <div className="container">

        {/* POPULATION */}
        <div className="section">
          <div className="section-title">
            <Users size={18}/> लोकसंख्या माहिती (2011)
          </div>

          <div className="card">
            <div className="grid">
              <div className="stat-box">
                <Users size={20}/>
                <p>एकूण</p>
                <b>2103</b>
              </div>

              <div className="stat-box">
                <User size={20}/>
                <p>पुरुष</p>
                <b>1132</b>
              </div>

              <div className="stat-box">
                <User size={20}/>
                <p>स्त्री</p>
                <b>971</b>
              </div>

              <div className="stat-box">
                <Home size={20}/>
                <p>कुटुंब</p>
                <b>347</b>
              </div>
            </div>
          </div>
        </div>

        {/* VILLAGE INFO */}
        <div className="section">
          <div className="section-title">गावाची माहिती</div>

          <div className="card text">
            {/* YOUR ORIGINAL TEXT SAME */}
            गोदावरी नदी व गंगापूर धरणाच्या पश्चिमेस वसलेले गंगावऱ्हे व सावरगाव...
          </div>
        </div>

        {/* EDUCATION */}
        <div className="section">
          <div className="section-title">
            <GraduationCap size={18}/> शैक्षणिक माहिती
          </div>

          <div className="grid">

            <div className="card">
              <b><School size={16}/> माध्यमिक शाळा</b>
              <p>सर्वज्ञ माध्यमिक विद्यालय</p>

              <div style={infoRow}><span className="label">शाळा</span><span>०१</span></div>
              <div style={infoRow}><span className="label">शिक्षक</span><span>०३</span></div>
              <div style={infoRow}><span className="label">विद्यार्थी</span><span>१३३</span></div>
              <div style={infoRow}><span className="label">वर्ग</span><span>८ ते १०</span></div>
            </div>

            <div className="card">
              <b><Baby size={16}/> अंगणवाडी</b>

              <div style={infoRow}><span className="label">एकूण</span><span>०२</span></div>
              <div style={infoRow}><span className="label">गंगावऱ्हे</span><span>०१</span></div>
              <div style={infoRow}><span className="label">सावरगाव</span><span>०१</span></div>
              <div style={infoRow}><span className="label">लाभार्थी</span><span>१५४</span></div>
            </div>

            <div className="card">
              <b>प्राथमिक शाळा</b>

              <div style={infoRow}><span className="label">शाळा</span><span>२</span></div>
              <div style={infoRow}><span className="label">शिक्षक</span><span>१२</span></div>
              <div style={infoRow}><span className="label">विद्यार्थी</span><span>३३९</span></div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}