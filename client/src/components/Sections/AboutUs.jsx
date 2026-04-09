import Navbar from "./Navbar";
import { Users, User, Home, GraduationCap, School, Baby } from "lucide-react";

export default function AboutUs() {

  const infoRow = {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
    fontSize: "14px"
  };

  return (
    <>
      <Navbar />

      <style>{`
        body {
          background: #f1f5f9;
          font-family: Arial, sans-serif;
          color: #000;
        }

        .header {
          background: #0b3d91;
          color: white;
          padding: 15px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
        }

        .container {
          max-width: 1100px;
          margin: auto;
          padding: 15px;
        }

        .section {
          margin: 25px 0;
        }

        .section-title {
          background: #0b3d91;
          color: #fff;
          padding: 8px 12px;
          font-size: 16px;
          font-weight: bold;
        }

        .card {
          background: #fff;
          border: 1px solid #ccc;
          padding: 12px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
        }

        .stat-box {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          background: #fff;
        }

        .label {
          color: #555;
        }

        @media (max-width: 600px) {
          .section-title {
            font-size: 14px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        ग्रामपंचायत गंगावऱ्हे - सावरगाव
      </div>

      <div className="container">

        {/* ===== POPULATION ===== */}
        <div className="section">
          <div className="section-title">
            <Users size={16}/> लोकसंख्या माहिती (2011)
          </div>

          <div className="card">
            <div className="grid">
              <div className="stat-box">
                <Users size={16}/>
                <p>एकूण</p>
                <b>2103</b>
              </div>

              <div className="stat-box">
                <User size={16}/>
                <p>पुरुष</p>
                <b>1132</b>
              </div>

              <div className="stat-box">
                <User size={16}/>
                <p>स्त्री</p>
                <b>971</b>
              </div>

              <div className="stat-box">
                <Home size={16}/>
                <p>कुटुंब</p>
                <b>347</b>
              </div>
            </div>
          </div>
        </div>

        {/* ===== VILLAGE INFO ===== */}
        <div className="section">
          <div className="section-title">गावाची माहिती</div>

          <div className="card">
            गोदावरी नदी व गंगापूर धरणाच्या पश्चिमेस वसलेले गंगावऱ्हे व सावरगाव हि दोन्ही गाव पुनर्वसित असून प्राचीन वारसा असलेली आदिवासी बहुल गावे आहेत. हि दोन्ही गाव नाशिक तालुक्यातील असून नाशिकच्या पश्चिमेस नाशिक पासून गंगापूर मार्गे १७ कि.मी. अंतरावर आहे. मुख्य बाजारपेठ नाशिक व गिरणारे अवघे १० कि. मी. आहे. सावरगाव येथे प्राचीन संगमेश्वर महादेव मंदिर असून एक धार्मिक स्थळ आहे.

गंगावऱ्हे हि ग्रामपंचायत गंगावऱ्हे व सावरगाव या दोन गावांची मिळून ग्रामपंचायत असून दि. ११/०६/१९६६ रोजी स्थापन झालेली आहे. ग्रुप ग्रामपंचायत गंगावऱ्हे-सावरगाव ग्रामपंचायत मध्ये ०३ वार्ड असून सदस्य संख्या १० आहे. 

गावाचा मुख्य व्यवसाय शेती व मासेमारी असून मुख्य पिक भात व बाजीपला आहे. बागायती क्षेत्रामध्ये टोमेटो, कोबी, कांदा,गवार व इतर भाजीपाला तसेच गहू, हरभरा पिकविला जातो. काही ग्रामस्थ पारंपारिक पद्धतीने शेळी पालन, गुरे पालन व कोंबडी पालन करतात. काही ग्रामस्थ नाशिक येथे एम.आय.डी.सी. मध्ये व इतर ठिकाणी कामाला जातात. गावामध्ये द्राक्षापासून वाईन तयार करण्यासाठी वाईनरी असून तेथे देश विदेशातील पर्यटक भेट देत असतात. त्यामुळे गावातील नागरिकांना गावातच रोजगार उपलब्ध झालेला आहे. गाव हे गंगापूर धरणाच्या कडेला वसलेले असल्याने तेथे मोठ्या प्रमाणात पर्यटक भेट देत असतात त्यामुळे गावात पर्यटनाला मोठी चालना मिळत असते. 

गंगावऱ्हे व सावरगाव या गावांसाठी प्राथमिक आरोग्य केंद्र धोंडेगाव येथे ०४ कि.मी. व आरोग्य उपकेंद्र गोवर्धन येथे ०६ कि.मी. अंतरावर आहे. ग्रामीण रुग्णालय १४ कि.मी. अंतरावर गिरणारे येथे आहे.
          </div>
        </div>

        {/* ===== EDUCATION ===== */}
        <div className="section">
          <div className="section-title">
            <GraduationCap size={16}/> शैक्षणिक माहिती
          </div>

          <div className="grid">

            {/* Secondary */}
            <div className="card">
              <b><School size={16}/> माध्यमिक शाळा</b>
              <p>सर्वज्ञ माध्यमिक विद्यालय</p>

              <div style={infoRow}><span className="label">शाळा</span><span>०१</span></div>
              <div style={infoRow}><span className="label">शिक्षक</span><span>०३</span></div>
              <div style={infoRow}><span className="label">विद्यार्थी</span><span>१३३</span></div>
              <div style={infoRow}><span className="label">वर्ग</span><span>८ ते १०</span></div>
              <div style={infoRow}><span className="label">शौचालय</span><span>०२</span></div>
              <div style={infoRow}><span className="label">मुतारी</span><span>०३</span></div>
            </div>

            {/* Anganwadi */}
            <div className="card">
              <b><Baby size={16}/> अंगणवाडी</b>

              <div style={infoRow}><span className="label">एकूण</span><span>०२</span></div>
              <div style={infoRow}><span className="label">गंगावऱ्हे</span><span>०१</span></div>
              <div style={infoRow}><span className="label">सावरगाव</span><span>०१</span></div>
              <div style={infoRow}><span className="label">लाभार्थी</span><span>१५४</span></div>
            </div>

            {/* Primary */}
            <div className="card">
              <b>प्राथमिक शाळा</b>

              <div style={infoRow}><span className="label">शाळा</span><span>२</span></div>
              <div style={infoRow}><span className="label">शिक्षक</span><span>१२</span></div>
              <div style={infoRow}><span className="label">विद्यार्थी</span><span>३३९</span></div>
              <div style={infoRow}><span className="label">गंगावऱ्हे</span><span>२३०</span></div>
              <div style={infoRow}><span className="label">सावरगाव</span><span>१०९</span></div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}