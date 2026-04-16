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
      <div className="activity-header">
        रौप्य महोत्सवी वर्षात २५,००० झाडांची लागवड करून सुला विनयार्ड्सने जपली सामाजिक बांधिलकी
      </div>

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
              सुला विनयार्ड्सने सामाजिक बांधिलकी उपक्रम अंतर्गत २५,००० वृक्षरोपण करून पर्यावरण संवर्धन केले आहे.
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
              महाराष्ट्र राज्य सहकारी व आदिवासी विकास महामंडळ आयोजित बैठकीत विविध विषयांवर चर्चा करण्यात आली.
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
              ग्रामपंचायत कार्यालयात स्वातंत्र्यदिनानिमित्त ध्वजारोहण सोहळा पार पडला.
            </div>

            <div className="footer">
              राष्ट्रध्वज वंदन, देशभक्तीची शपथ!
            </div>
          </div>

        </div>

      </div>
    </>
  );
}