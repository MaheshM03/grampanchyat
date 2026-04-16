import Navbar from "./Navbar";

export default function Activity() {
  return (
    <>
      <Navbar />

      <style>{`
        .activity-header {
          background: linear-gradient(135deg,#1e3a8a,#2563eb);
          text-align: center;
          padding: 22px 15px;
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .activity-container {
          max-width: 1100px;
          margin: auto;
          padding: 30px 20px;
        }

        /* ZIGZAG BASE */
        .section {
          margin-bottom: 50px;
        }

        .zigzag {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 35px;
          align-items: center;
        }

        .reverse {
          direction: rtl;
        }

        .reverse > * {
          direction: ltr;
        }

        /* CARD */
        .card {
          background: #ffffff;
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        .title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #0f172a;
        }

        .desc {
          font-size: 14px;
          line-height: 1.8;
          color: #475569;
        }

        .tag {
          font-size: 13px;
          margin-bottom: 10px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #f97316;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }

        /* IMAGE FIX */
        .img-wrapper {
          width: 100%;
          height: 260px;
          border-radius: 14px;
          overflow: hidden;
          background: #e2e8f0;
        }

        .img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .img-stack {
          display: grid;
          gap: 12px;
        }

        /* QUOTE */
        .quote {
          font-size: 40px;
          color: #f97316;
        }

        .flag-title {
          font-size: 24px;
          font-weight: 700;
          margin: 10px 0;
        }

        .footer {
          margin-top: 10px;
          font-weight: 600;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .zigzag {
            grid-template-columns: 1fr;
          }

          .reverse {
            direction: ltr;
          }

          .img-wrapper {
            height: 200px;
          }

          .title {
            font-size: 18px;
          }

          .flag-title {
            font-size: 18px;
          }
        }
      `}</style>

      {/* HEADER */}
     

      <div className="activity-container">

        {/* ===== SECTION 1 ===== */}
        <div className="section zigzag">

          {/* TEXT */}
          <div className="card">
            <div className="tag">
              <span className="dot"></span>
              25,000 झाडांची लागवड
            </div>

            <div className="title">
              रौप्य महोत्सवी वर्षात २५,००० झाडांची लागवड
            </div>

            <div className="desc">
              सुला विनयार्ड्सने सामाजिक बांधिलकी उपक्रम अंतर्गत २५,००० वृक्षरोपण करून भक्कम योगा साजरा केला आहे. …
(खाली मजकूरात)
पर्यावरणपूरक उपक्रम, जमिनीचे संवर्धन, स्थानिक समाजाच्या सहभागातून प्रकल्प, यामुळे सुला विनयार्ड्सने सामाजिक जबाबदारी जपली आहे.

सदर उपक्रमांतर्गत सुला परिसरात विविध प्रकारच्या झाडांची लागवड करण्यात आली. त्यात २५ हून अधिक प्रजातींचा समावेश आहे. या झाडांमध्ये अंजन, बाभूळ, करंज, खैर, चिंच, सीताफळ, हिरडा, बेहडा, पिंपळ, आंबा, करंजी, वड, जांभूळ, अशोक, गुलमोहर, रानजाई, पळस इत्यादी स्थानिक झाडांचा समावेश करण्यात आला आहे.

सदर उपक्रम राबविताना गाळ हटवणे, जमिनीचे सुपिकरण व पर्यावरण संवर्धन हे तीन उद्दिष्ट ठेवण्यात आले. या उपक्रमामुळे तलावातील गाळ हटल्याने जलसाठवण क्षमता वाढणार आहे, सुपीक माती जमिनीत गेल्याने पिकांचे उत्पादन वाढणार आहे, आणि शेतकऱ्यांचा खर्चही कमी होणार आहे.
            </div>
          </div>

          {/* IMAGES */}
          <div className="img-stack">
            <div className="img-wrapper">
              <img src="/activity.webp" alt="activity" />
            </div>

            <div className="img-wrapper">
              <img src="/activity1.webp" alt="activity" />
            </div>
          </div>

        </div>

        {/* ===== SECTION 2 ===== */}
        <div className="section zigzag reverse">

          {/* TEXT */}
          <div className="card">
            <div className="title">
              महाराष्ट्र राज्य सहकारी व आदिवासी विकास बैठक
            </div>

            <div className="desc">
             महाराष्ट्र राज्य सहकारी व आदिवासी विकास महामंडळ आयोजित या बैठकीत विविध जिल्ह्यांतील अधिकारी, पदाधिकारी व प्रतिनिधी सहभागी झाले. ग्रामविकास, आदिवासी क्षेत्रातील उपक्रम, शाश्वत विकास आणि गावागावात सेवा पोहोचवण्याबाबत विविध मुद्द्यांवर चर्चा झाली. या बैठकीत स्थानिक स्वराज्य संस्था व ग्रामपंचायतींना अधिक सक्षम बनवण्यासाठी तसेच ग्रामीण भागातील सामाजिक-आर्थिक विकासाला चालना देण्यासाठी मार्गदर्शक धोरणे ठरविण्यात आली.
            </div>
          </div>

          {/* IMAGE */}
          <div className="img-wrapper">
            <img src="/meeting.webp" alt="meeting" />
          </div>

        </div>

        {/* ===== SECTION 3 ===== */}
        <div className="section zigzag">

          {/* IMAGES */}
            <div className="img-stack">
              <div className="img-wrapper">
                <img src="/independce day.webp" alt="independence day" />
              </div>

              <div className="img-wrapper">
                <img src="/independce day1.webp" alt="independence day" />
              </div>
            </div>

          {/* TEXT */}
          <div className="card">
            <div className="quote">“</div>

            <div className="flag-title">
              स्वातंत्र्यदिनाच्या निमित्ताने ग्रामपंचायतीत ध्वजवंदन सोहळा
            </div>

            <div className="desc">
             गावातील ग्रामपंचायत कार्यालयात स्वातंत्र्यदिनाच्या निमित्ताने ध्वजवंदनाचा भव्य सोहळा पार पडला. ग्रामपंचायतीचे पदाधिकारी, महिला बचतगट, शाळकरी मुले, नागरिक आणि ग्रामस्थ मोठ्या उत्साहात सहभागी झाले. राष्ट्रध्वजाला सलामी देत देशभक्तीपर घोषणांनी वातावरण दुमदुमून गेले. देशाच्या स्वातंत्र्यसैनिकांचे स्मरण, ग्रामविकासाची शपथ आणि समाजातील ऐक्य-सौहार्द वाढवण्याचा संकल्प या सोहळ्यात करण्यात आला
            </div>

            <div className="footer">
              राष्ट्रध्वजास वंदन, देशभक्तीची शपथ; ग्रामविकासासाठी आपलीच कटीबद्धता!
            </div>
          </div>

        </div>

      </div>
    </>
  );
}