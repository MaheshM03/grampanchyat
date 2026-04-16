

export default function Population() {

  const stats = [
    { label: "एकूण लोकसंख्या", value: "5,735" },
    { label: "निवडणूक लोकसंख्या", value: "4,332" },
    { label: "अनुसूचित लोकसंख्या", value: "1,403" },
    { label: "इतर लोकसंख्या", value: "2,493" },
  ];

  return (
    <section style={{ padding: "60px 20px", background: "#ffffff", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ===== STATS ===== */}
        <div style={{ display: "flex", gap: 30, flexWrap: "wrap", marginBottom: 60 }}>
          
          {/* <div style={{ flex: 1, minWidth: 260 }}>
<img
              src="/sp.webp"
              style={{ width: "100%", borderRadius: 16, height: 220, objectFit: "cover" }}
            />
          </div> */}

          <div style={{ flex: 2, minWidth: 280 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800 }}>दृष्टीक्षेपात लोकसंख्या</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: "#fff",
                  padding: 16,
                  borderRadius: 12,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#2563eb" }}>{s.value}</div>
                  <div style={{ fontSize: 13 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SUCCESS STORY ===== */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          alignItems: "center",
          marginBottom: 60
        }}>

          <div>
            <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 10 }}>
              आमची यशोगाथा
            </h2>

            <p style={{ fontSize: 14, marginBottom: 10 }}>
              आदर्श ग्रामसेवक पुरस्कार सन २०२३ - २०२४ सेवा विशेष कामगिरी
            </p>

            <ul style={{ fontSize: 14, lineHeight: 1.8 }}>
              <li>1) ग्रामसेवक नाव:- श्री. प्रविण बंडू कांकरे</li>
              <li>2) जन्म तारीख:- 05/04/1990</li>
              <li>3) शिक्षण:- बी.एस्सी., एम.ए.</li>
              <li>4) सेवा रुजू दिनांक:- 07/03/2013</li>
              <li>5) इतर पात्रता:-</li>
            </ul>

<img
              src="/yashogatha.webp"
              style={{
                width: "100%",
                maxWidth: 350,
                borderRadius: "80px 0 0 80px",
                marginTop: 20
              }}
            />
          </div>

          <div>
<img
              src="/yashogatha1.webp"
              style={{
                width: "100%",
                borderRadius: "50px",
                objectFit: "cover"
              }}
            />

            <p style={{
              marginTop: 10,
              color: "#1e3a8a",
              fontWeight: 600,
              cursor: "pointer"
            }}>
              अधिक माहिती..
            </p>
          </div>

        </div>

        {/* ===== PROJECTS ===== */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800 }}>
            तर्फे राबवण्यात येणारे उपक्रम
          </h2>

          <p style={{ fontSize: 14, color: "#64748b" }}>
            ग्रामपंचायत अंतर्गत विविध योजनांद्वारे विकास कार्य
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 20
        }}>

          {[
            {
              title: "ग्रामीण शौचालय कार्यक्रम",
              desc: "15 वा वित्त आयोग योजना अंतर्गत वैयक्तिक शौचालय बांधकाम",
              img: "/ps.webp"
            },
            {
              title: "जलशुद्धीकरण व पाण्याची टाकी",
              desc: "गावात पाणीपुरवठा सुधारणा",
              img: "/wt.webp"
            },
            {
              title: "डास मुक्ती प्रतिबंध",
              desc: "गावात स्वच्छता व डास नियंत्रण",
              img: "/mf.webp"
            },
            {
              title: "विविध शेड",
              desc: "ग्रुप ग्रामपंचायत गंगावऱ्हे सावरगाव ता.जि.नाशिक येथील दशक्रिया विधी शेड",
              img: "/vs.webp"
            },
            {
              title: "प्राथमिक शाळा",
              desc: "विद्यार्थ्यांसाठी सुविधा",
              img: "/bt.webp"
            },
            {
              title: "सौर पोल",
              desc: "ऊर्जा बचत व प्रकाश व्यवस्था",
              img: "/sp.webp",
            }
          ].map((item, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
            }}>
              <img
                src={item.img}
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />

              <div style={{ padding: 15 }}>
                <h4 style={{ margin: "0 0 5px" }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: "#64748b" }}>{item.desc}</p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}