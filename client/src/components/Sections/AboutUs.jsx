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
    background: #f8fafc;
    font-family: 'Inter', sans-serif;
    color: #0f172a;
  }

  /* HEADER */
  .header {
    background: linear-gradient(135deg,#1e3a8a,#2563eb);
    color: white;
    padding: 32px 15px;
    text-align: center;
    font-size: clamp(20px,4vw,30px);
    font-weight: 800;
    border-radius: 0 0 30px 30px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  /* CONTAINER */
  .container {
    max-width: 1100px;
    margin: auto;
    padding: 24px;
  }

  .section {
    margin-top: 40px;
  }

  /* SECTION TITLE */
  .section-title {
    background: linear-gradient(135deg,#1e293b,#334155);
    color: #fff;
    padding: 14px 18px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  /* CARD */
  .card {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }

  /* GRID */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-top: 10px;
  }

  /* ===== POPULATION ===== */

  .village-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg,#2563eb,#1e40af);
    color: white;
    padding: 16px 18px;
    border-radius: 14px;
    margin-bottom: 14px;
    box-shadow: 0 8px 18px rgba(37,99,235,0.3);
  }

  .village-header h3 {
    font-size: 18px;
    font-weight: 700;
  }

  .village-header b {
    font-size: 22px;
    font-weight: 800;
  }

  .stat-box {
    background: linear-gradient(135deg,#f8fafc,#e0f2fe);
    padding: 16px;
    border-radius: 14px;
    text-align: center;
    border: 1px solid #e2e8f0;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .stat-box:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .stat-box::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent);
    transition: 0.5s;
  }

  .stat-box:hover::before {
    left: 100%;
  }

  .stat-box p {
    font-size: 13px;
    color: #475569;
    margin-bottom: 5px;
  }

  .stat-box b {
    font-size: 20px;
    color: #1e293b;
  }

  /* CATEGORY COLORS */
  .stat-box:nth-child(1) {
    border-left: 4px solid #22c55e;
  }

  .stat-box:nth-child(2) {
    border-left: 4px solid #ec4899;
  }

  .stat-box:nth-child(3) {
    border-left: 4px solid #f59e0b;
  }

  .highlight {
    background: linear-gradient(135deg,#f1f5f9,#e2e8f0);
    padding: 16px;
    border-radius: 14px;
    margin-top: 12px;
    text-align: center;
    font-weight: 700;
    border: 1px solid #cbd5f5;
  }

  /* TEXT */
  .text {
    line-height: 1.9;
    font-size: 14px;
    color: #334155;
  }

  /* SCHOOL IMAGE */
  .school-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
    transition: 0.3s;
  }

  .school-img:hover {
    transform: scale(1.03);
  }

  .card img:hover {
    transform: scale(1.03);
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .container {
      padding: 16px;
    }

    .card {
      padding: 16px;
    }

    .section-title {
      font-size: 14px;
      padding: 10px;
    }

    .header {
      font-size: 18px;
      padding: 20px;
    }

    .village-header {
      flex-direction: column;
      gap: 6px;
      text-align: center;
    }

    .grid {
      grid-template-columns: 1fr 1fr;
    }

    .stat-box {
      padding: 12px;
    }

    .stat-box b {
      font-size: 18px;
    }
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
            गोदावरी नदी व गंगापूर धरणाच्या पश्चिमेस वसलेले गंगावऱ्हे व सावरगाव हि दोन्ही गाव पुनर्वसित असून प्राचीन वारसा असलेली आदिवासी बहुल गावे आहेत. हि दोन्ही गाव नाशिक तालुक्यातील असून नाशिकच्या पश्चिमेस नाशिक पासून गंगापूर मार्गे १७ कि.मी. अंतरावर आहे. मुख्य बाजारपेठ नाशिक व गिरणारे अवघे १० कि. मी. आहे. सावरगाव येथे प्राचीन संगमेश्वर महादेव मंदिर असून एक धार्मिक स्थळ आहे.

गंगावऱ्हे हि ग्रामपंचायत गंगावऱ्हे व सावरगाव या दोन गावांची मिळून ग्रामपंचायत असून दि. ११/०६/१९६६ रोजी स्थापन झालेली आहे. ग्रुप ग्रामपंचायत गंगावऱ्हे-सावरगाव ग्रामपंचायत मध्ये ०३ वार्ड असून सदस्य संख्या १० आहे. 

गावाचा मुख्य व्यवसाय शेती व मासेमारी असून मुख्य पिक भात व बाजीपला आहे. बागायती क्षेत्रामध्ये टोमेटो, कोबी, कांदा,गवार व इतर भाजीपाला तसेच गहू, हरभरा पिकविला जातो. काही ग्रामस्थ पारंपारिक पद्धतीने शेळी पालन, गुरे पालन व कोंबडी पालन करतात. काही ग्रामस्थ नाशिक येथे एम.आय.डी.सी. मध्ये व इतर ठिकाणी कामाला जातात. गावामध्ये द्राक्षापासून वाईन तयार करण्यासाठी वाईनरी असून तेथे देश विदेशातील पर्यटक भेट देत असतात. त्यामुळे गावातील नागरिकांना गावातच रोजगार उपलब्ध झालेला आहे. गाव हे गंगापूर धरणाच्या कडेला वसलेले असल्याने तेथे मोठ्या प्रमाणात पर्यटक भेट देत असतात त्यामुळे गावात पर्यटनाला मोठी चालना मिळत असते. 

गंगावऱ्हे व सावरगाव या गावांसाठी प्राथमिक आरोग्य केंद्र धोंडेगाव येथे ०४ कि.मी. व आरोग्य उपकेंद्र गोवर्धन येथे ०६ कि.मी. अंतरावर आहे. ग्रामीण रुग्णालय १४ कि.मी. अंतरावर गिरणारे येथे आहे.
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
              <img src="/gangavarhe school1.webp" alt="सर्वज्ञ माध्यमिक विद्यालय" className="school-img" />
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
              <img src="/gangavarhe anganwadi.webp" alt="अंगणवाडी" className="school-img" />
              <b><Baby size={18}/> अंगणवाडी</b>

              <div style={infoRow}><span>एकूण</span><span>०२</span></div>
              <div style={infoRow}><span>लाभार्थी</span><span>१५४</span></div>
            </div>

            {/* प्राथमिक */}
            <div className="card">
              <img src="/gangavarhe school2.webp" alt="प्राथमिक शाळा" className="school-img" />
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