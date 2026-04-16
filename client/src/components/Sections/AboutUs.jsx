import Navbar from "./Navbar";
import { Users, User, Home, GraduationCap, School, Baby } from "lucide-react";

export default function AboutUs() {

  const infoRow = {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px"
  };

  return (
    <>
      <Navbar />

      <style>{`
        body {
          background: #f1f5f9;
          font-family: 'Inter', sans-serif;
        }

        .header {
          background: linear-gradient(135deg,#1e3a8a,#2563eb);
          color: white;
          padding: 30px 15px;
          text-align: center;
          font-size: clamp(20px,4vw,28px);
          font-weight: 800;
          border-radius: 0 0 25px 25px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 20px;
        }

        .section {
          margin-top: 35px;
        }

        .section-title {
          background: #1e293b;
          color: #fff;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .card {
          background: #fff;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .stat-box {
          background: linear-gradient(135deg,#eef2ff,#e0e7ff);
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #c7d2fe;
        }

        .stat-box p {
          font-size: 13px;
        }

        .stat-box b {
          font-size: 20px;
        }

        .village-header {
          display: flex;
          justify-content: space-between;
          background: linear-gradient(135deg,#2563eb,#1e40af);
          color: white;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .highlight {
          background: #f8fafc;
          padding: 12px;
          border-radius: 10px;
          margin-top: 10px;
          text-align: center;
        }

        .text {
          line-height: 1.8;
          font-size: 14px;
        }
      `}</style>

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

            {/* गंगावऱ्हे */}
            <div style={{marginBottom: "25px"}}>
              <div className="village-header">
                <h3>गंगावऱ्हे</h3>
                <b>१३८१</b>
              </div>

              <div className="grid">
                <div className="stat-box"><p>पुरुष</p><b>७५०</b></div>
                <div className="stat-box"><p>स्त्री</p><b>६३१</b></div>
              </div>

              <div className="grid">
                <div className="stat-box"><p>SC</p><b>१६७</b><p>८७ / ८०</p></div>
                <div className="stat-box"><p>ST</p><b>९५०</b><p>५१४ / ४३६</p></div>
                <div className="stat-box"><p>इतर</p><b>२६४</b><p>१४९ / ११५</p></div>
              </div>

              <div className="highlight">
                <Home/> कुटुंब: <b>२३२</b>
              </div>
            </div>

            {/* सावरगाव */}
            <div>
              <div className="village-header">
                <h3>सावरगाव</h3>
                <b>७२२</b>
              </div>

              <div className="grid">
                <div className="stat-box"><p>पुरुष</p><b>३८२</b></div>
                <div className="stat-box"><p>स्त्री</p><b>३४०</b></div>
              </div>

              <div className="grid">
                <div className="stat-box"><p>SC</p><b>१५</b><p>०८ / ०७</p></div>
                <div className="stat-box"><p>ST</p><b>६९५</b><p>३६८ / ३२७</p></div>
                <div className="stat-box"><p>इतर</p><b>१२</b><p>०६ / ०६</p></div>
              </div>

              <div className="highlight">
                <Home/> कुटुंब: <b>११५</b>
              </div>
            </div>

          </div>
        </div>

        {/* VILLAGE INFO */}
        <div className="section">
          <div className="section-title">गावाची माहिती</div>
          <div className="card text">
            गोदावरी नदी व गंगापूर धरणाच्या पश्चिमेस वसलेले गंगावऱ्हे व सावरगाव ही दोन्ही गाव पुनर्वसित असून प्राचीन वारसा असलेली आदिवासी बहुल गावे आहेत.
          </div>
        </div>

        {/* EDUCATION */}
        <div className="section">
          <div className="section-title">
            <GraduationCap size={18}/> शैक्षणिक माहिती
          </div>

          <div className="grid">

            {/* माध्यमिक */}
            <div className="card">
              <b><School size={18}/> माध्यमिक शाळा</b>
              <p>सर्वज्ञ माध्यमिक विद्यालय</p>

              <div style={infoRow}><span>शाळा</span><span>०१</span></div>
              <div style={infoRow}><span>शिक्षक</span><span>०३</span></div>
              <div style={infoRow}><span>विद्यार्थी</span><span>१३३</span></div>
              <div style={infoRow}><span>शौचालय</span><span>०२</span></div>
              <div style={infoRow}><span>मुतारी</span><span>०३</span></div>
            </div>

            {/* अंगणवाडी */}
            <div className="card">
              <b><Baby size={18}/> अंगणवाडी</b>

              <div style={infoRow}><span>एकूण</span><span>०२</span></div>
              <div style={infoRow}><span>लाभार्थी</span><span>१५४</span></div>
            </div>

            {/* प्राथमिक */}
            <div className="card">
              <b><School size={18}/> प्राथमिक शाळा</b>

              <div style={infoRow}><span>शाळा</span><span>२</span></div>
              <div style={infoRow}><span>शिक्षक</span><span>१२</span></div>
              <div style={infoRow}><span>विद्यार्थी</span><span>३३९</span></div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}