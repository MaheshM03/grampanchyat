import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── shared helpers ─────────────────────────────── */
const Input = ({ label, marathi, name, value, onChange, type = "text", placeholder = "", required = true, disabled = false }) => (
  <div style={s.fieldWrap}>
    <label style={s.label}>
      <span style={s.labelMr}>{marathi}</span>
      <span style={s.labelEn}>{label}{required && <span style={s.req}> *</span>}</span>
    </label>
    <input
      className="notranslate"
      style={{ ...s.input, ...(disabled ? s.inputDisabled : {}) }}
      type={type} name={name} value={value}
      onChange={onChange} placeholder={placeholder}
      disabled={disabled} autoComplete="off"
    />
  </div>
);

const Select = ({ label, marathi, name, value, onChange, options, required = true }) => (
  <div style={s.fieldWrap}>
    <label style={s.label}>
      <span style={s.labelMr}>{marathi}</span>
      <span style={s.labelEn}>{label}{required && <span style={s.req}> *</span>}</span>
    </label>
    <select className="notranslate" style={s.input} name={name} value={value} onChange={onChange}>
      <option value="">-- निवडा / Select --</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

/* ── Stepper ────────────────────────────────────── */
const STEPS = [
  { n: 1, mr: "OTP सत्यापन", en: "Verification" },
  { n: 2, mr: "मुलाची माहिती", en: "Child Details" },
  { n: 3, mr: "पालकांची माहिती", en: "Parent Details" },
  { n: 4, mr: "कागदपत्रे", en: "Documents" },
  { n: 5, mr: "पेमेंट", en: "Payment" },
];

function Stepper({ current }) {
  return (
    <div style={s.stepperOuter}>
      <div style={s.stepperInner}>
        {STEPS.map((step, i) => {
          const done = current > step.n;
          const active = current === step.n;
          return (
            <div key={step.n} style={s.stepCol}>
              {i > 0 && (
                <div style={{ ...s.connector, background: done ? "#e8b84b" : "#d8dde6" }} />
              )}
              <div style={{
                ...s.circle,
                background: active ? "#e8b84b" : done ? "#e8b84b" : "#fff",
                border: `2.5px solid ${active || done ? "#e8b84b" : "#c8cfd9"}`,
                color: active || done ? "#1a2235" : "#9aa3ae",
                boxShadow: active ? "0 0 0 4px rgba(232,184,75,0.2)" : "none",
              }}>
                {done ? "✓" : step.n}
              </div>
              <div style={s.stepTexts}>
                <span style={{ ...s.stepMr, color: active ? "#1a2235" : done ? "#e8b84b" : "#9aa3ae" }}>{step.mr}</span>
                <span style={{ ...s.stepEn, color: active ? "#555" : "#aaa" }}>{step.en}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── STEP 1: OTP ─────────────────────────────────── */
function Step1({ onNext }) {
  const [mobile, setMobile] = useState("");
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  const send = () => {
    if (!/^\d{10}$/.test(mobile)) { setErr("कृपया 10 अंकी मोबाईल नंबर टाका"); return; }
    setErr(""); setSent(true);
  };
  const verify = () => {
    if (otp.length < 4) { setErr("OTP टाका"); return; }
    setErr(""); onNext();
  };

  return (
    <div style={s.stepCard}>
      <div style={s.stepHeader}>
        <div style={s.stepIcon}>📱</div>
        <h2 style={s.stepTitle}>मोबाईल सत्यापन</h2>
        <p style={s.stepSubtitle}>Mobile Verification</p>
      </div>
      <p style={s.stepDesc}>कृपया आपला मोबाईल नंबर टाका आणि OTP सत्यापित करा</p>

      <Input label="Mobile Number" marathi="मोबाईल नंबर" name="mobile"
        value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/,"").slice(0,10))}
        placeholder="10 digit mobile number" disabled={sent} />

      {sent && (
        <>
          <div style={s.otpSentBadge}>✓ OTP पाठवला / Sent to +91 {mobile}</div>
          <div style={s.fieldWrap}>
            <label style={s.label}>
              <span style={s.labelMr}>OTP</span>
              <span style={s.labelEn}>Enter OTP <span style={s.req}>*</span></span>
            </label>
            <div style={s.otpRow}>
              {[0,1,2,3,4,5].map(i => (
                <input key={i} style={s.otpBox} type="tel" maxLength={1}
                  value={otp[i] || ""}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/,"");
                    const arr = otp.split("");
                    arr[i] = v; setOtp(arr.join("").slice(0,6));
                    if (v && e.target.nextSibling) e.target.nextSibling.focus();
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {err && <p style={s.err}>{err}</p>}

      {!sent
        ? <button style={s.primaryBtn} onClick={send}>✈ OTP पाठवा / Send OTP</button>
        : <div style={s.btnRow}>
            <button style={s.ghostBtn} onClick={() => { setSent(false); setOtp(""); }}>नंबर बदला</button>
            <button style={s.primaryBtn} onClick={verify}>सत्यापित करा / Verify →</button>
          </div>
      }
    </div>
  );
}

/* ── STEP 2: Child Details ───────────────────────── */
function Step2({ data, setData, onNext, onBack }) {
  const [err, setErr] = useState("");
  const upd = e => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const next = () => {
    if (!data.childName || !data.dob || !data.gender || !data.birthPlace || !data.birthTime) {
      setErr("कृपया सर्व अनिवार्य फील्ड भरा / Fill all required fields"); return;
    }
    setErr(""); onNext();
  };

  return (
    <div style={s.stepCard}>
      <div style={s.stepHeader}>
        <div style={s.stepIcon}>👶</div>
        <h2 style={s.stepTitle}>मुलाची माहिती</h2>
        <p style={s.stepSubtitle}>Child Information</p>
      </div>

      <div style={s.grid2}>
        <Input label="Child's Full Name" marathi="मुलाचे / मुलीचे पूर्ण नाव" name="childName"
          value={data.childName} onChange={upd} placeholder="Full name as on hospital record" />
        <Input label="Date of Birth" marathi="जन्म तारीख" name="dob"
          value={data.dob} onChange={upd} type="date" />
      </div>

      <div style={s.grid2}>
        <Select label="Gender" marathi="लिंग" name="gender" value={data.gender} onChange={upd}
          options={[{value:"male",label:"मुलगा / Male"},{value:"female",label:"मुलगी / Female"},{value:"other",label:"इतर / Other"}]} />
        <Input label="Time of Birth" marathi="जन्म वेळ" name="birthTime"
          value={data.birthTime} onChange={upd} type="time" />
      </div>

      <div style={s.grid2}>
        <Select label="Place of Birth" marathi="जन्म ठिकाण प्रकार" name="birthPlaceType" value={data.birthPlaceType} onChange={upd}
          options={[{value:"hospital",label:"रुग्णालय / Hospital"},{value:"home",label:"घर / Home"},{value:"other",label:"इतर / Other"}]} />
        <Input label="Hospital / Village Name" marathi="रुग्णालय / गाव" name="birthPlace"
          value={data.birthPlace} onChange={upd} placeholder="Hospital or village name" />
      </div>

      <div style={s.fieldWrap}>
        <label style={s.label}>
          <span style={s.labelMr}>जन्म ठिकाण पत्ता</span>
          <span style={s.labelEn}>Birth Address</span>
        </label>
        <textarea className="notranslate" style={s.textarea} name="birthAddress" value={data.birthAddress}
          onChange={upd} placeholder="Full address of birth place" />
      </div>

      {err && <p style={s.err}>{err}</p>}
      <div style={s.btnRow}>
        <button style={s.ghostBtn} onClick={onBack}>← मागे / Back</button>
        <button style={s.primaryBtn} onClick={next}>पुढे / Next →</button>
      </div>
    </div>
  );
}

/* ── STEP 3: Parent Details ──────────────────────── */
function Step3({ data, setData, onNext, onBack }) {
  const [err, setErr] = useState("");
  const upd = e => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const next = () => {
    if (!data.fatherName || !data.motherName || !data.fatherAadhaar || !data.motherAadhaar || !data.address) {
      setErr("कृपया सर्व अनिवार्य फील्ड भरा / Fill all required fields"); return;
    }
    if (data.fatherAadhaar.length !== 12 || data.motherAadhaar.length !== 12) {
      setErr("आधार क्रमांक 12 अंकी असावा / Aadhaar must be 12 digits"); return;
    }
    setErr(""); onNext();
  };

  return (
    <div style={s.stepCard}>
      <div style={s.stepHeader}>
        <div style={s.stepIcon}>👨‍👩‍👦</div>
        <h2 style={s.stepTitle}>पालकांची माहिती</h2>
        <p style={s.stepSubtitle}>Parent Information</p>
      </div>

      <div style={s.sectionDivider}>वडिलांची माहिती / Father's Details</div>
      <div style={s.grid2}>
        <Input label="Father's Full Name" marathi="वडिलांचे पूर्ण नाव" name="fatherName"
          value={data.fatherName} onChange={upd} placeholder="As per Aadhaar" />
        <Input label="Father's Aadhaar No." marathi="वडिलांचा आधार क्रमांक" name="fatherAadhaar"
          value={data.fatherAadhaar} onChange={e => setData(d => ({ ...d, fatherAadhaar: e.target.value.replace(/\D/,"").slice(0,12) }))}
          placeholder="12 digit Aadhaar" />
      </div>
      <div style={s.grid2}>
        <Input label="Father's Mobile" marathi="वडिलांचा मोबाईल" name="fatherMobile"
          value={data.fatherMobile} onChange={upd} placeholder="10 digit number" required={false} />
        <Input label="Father's Occupation" marathi="वडिलांचा व्यवसाय" name="fatherOccupation"
          value={data.fatherOccupation} onChange={upd} placeholder="e.g. Farmer, Government" required={false} />
      </div>

      <div style={s.sectionDivider}>आईची माहिती / Mother's Details</div>
      <div style={s.grid2}>
        <Input label="Mother's Full Name" marathi="आईचे पूर्ण नाव" name="motherName"
          value={data.motherName} onChange={upd} placeholder="As per Aadhaar" />
        <Input label="Mother's Aadhaar No." marathi="आईचा आधार क्रमांक" name="motherAadhaar"
          value={data.motherAadhaar} onChange={e => setData(d => ({ ...d, motherAadhaar: e.target.value.replace(/\D/,"").slice(0,12) }))}
          placeholder="12 digit Aadhaar" />
      </div>
      <div style={s.grid2}>
        <Input label="Mother's Mobile" marathi="आईचा मोबाईल" name="motherMobile"
          value={data.motherMobile} onChange={upd} placeholder="10 digit number" required={false} />
        <Input label="Mother's Occupation" marathi="आईचा व्यवसाय" name="motherOccupation"
          value={data.motherOccupation} onChange={upd} placeholder="e.g. Homemaker, Teacher" required={false} />
      </div>

      <div style={s.sectionDivider}>कायमचा पत्ता / Permanent Address</div>
      <div style={s.fieldWrap}>
        <label style={s.label}>
          <span style={s.labelMr}>पत्ता</span>
          <span style={s.labelEn}>Full Address <span style={s.req}>*</span></span>
        </label>
        <textarea style={s.textarea} name="address" value={data.address}
          onChange={upd} placeholder="House no., Street, Village/City, Taluka, District, PIN" />
      </div>

      {err && <p style={s.err}>{err}</p>}
      <div style={s.btnRow}>
        <button style={s.ghostBtn} onClick={onBack}>← मागे / Back</button>
        <button style={s.primaryBtn} onClick={next}>पुढे / Next →</button>
      </div>
    </div>
  );
}

/* ── STEP 4: Documents ───────────────────────────── */
function Step4({ docs, setDocs, onNext, onBack }) {
  const [err, setErr] = useState("");

  const required = [
    { key: "discharge", mr: "रुग्णालय डिस्चार्ज पेपर", en: "Hospital Discharge Paper", icon: "🏥" },
    { key: "fatherAadhaar", mr: "वडिलांचे आधार कार्ड", en: "Father's Aadhaar Card", icon: "👨" },
    { key: "motherAadhaar", mr: "आईचे आधार कार्ड", en: "Mother's Aadhaar Card", icon: "👩" },
  ];
  const optional = [
    { key: "marriageCert", mr: "विवाह प्रमाणपत्र", en: "Marriage Certificate", icon: "💍" },
    { key: "affidavit", mr: "शपथपत्र", en: "Affidavit (if home birth)", icon: "📜" },
  ];

  const handleFile = (key, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setErr(`${key}: File must be under 2MB`); return; }
    setErr("");
    setDocs(d => ({ ...d, [key]: file }));
  };

  const next = () => {
    const missing = required.filter(r => !docs[r.key]);
    if (missing.length) { setErr(`कृपया अपलोड करा: ${missing.map(m => m.en).join(", ")}`); return; }
    setErr(""); onNext();
  };

  const DocRow = ({ item, optional: isOpt }) => (
    <div style={{ ...s.docRow, ...(docs[item.key] ? s.docRowDone : {}) }}>
      <div style={s.docIcon}>{item.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={s.docName}>{item.mr} / {item.en}
          {!isOpt && <span style={s.req}> *</span>}
          {isOpt && <span style={s.optBadge}>Optional</span>}
        </p>
        {docs[item.key]
          ? <p style={s.docDone}>✓ {docs[item.key].name}</p>
          : <p style={s.docHint}>PDF, JPG, PNG — max 2MB</p>}
      </div>
      <label style={{ ...s.uploadBtn, ...(docs[item.key] ? s.uploadBtnDone : {}) }}>
        {docs[item.key] ? "बदला" : "अपलोड"}
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }}
          onChange={e => handleFile(item.key, e.target.files[0])} />
      </label>
    </div>
  );

  return (
    <div style={s.stepCard}>
      <div style={s.stepHeader}>
        <div style={s.stepIcon}>📁</div>
        <h2 style={s.stepTitle}>कागदपत्रे अपलोड करा</h2>
        <p style={s.stepSubtitle}>Upload Documents</p>
      </div>

      <div style={s.sectionDivider}>अनिवार्य कागदपत्रे / Required Documents</div>
      {required.map(r => <DocRow key={r.key} item={r} />)}

      <div style={s.sectionDivider}>ऐच्छिक कागदपत्रे / Optional Documents</div>
      {optional.map(r => <DocRow key={r.key} item={r} optional />)}

      {err && <p style={s.err}>{err}</p>}
      <div style={s.btnRow}>
        <button style={s.ghostBtn} onClick={onBack}>← मागे / Back</button>
        <button style={s.primaryBtn} onClick={next}>पुढे / Next →</button>
      </div>
    </div>
  );
}

/* ── STEP 5: Payment ─────────────────────────────── */
function Step5({ data, child, parents, docs, onBack, onSuccess }) {
  const [method, setMethod] = useState("");
  const [err, setErr] = useState("");
  const [processing, setProcessing] = useState(false);

  const methods = [
    { id: "upi", label: "UPI / GPay / PhonePe / Paytm", icon: "📱" },
    { id: "card", label: "Credit / Debit Card", icon: "💳" },
    { id: "netbanking", label: "Net Banking", icon: "🏦" },
    { id: "cash", label: "Cash at Gram Panchayat Office", icon: "🏛️" },
  ];

  const pay = async () => {
    if (!method) { setErr("पेमेंट पद्धत निवडा / Select payment method"); return; }
    setErr(""); setProcessing(true);

    try {
      // Step 1: Create Razorpay order
      const orderRes = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 20,
          certificateType: 'birth',
          mobile: data.fatherMobile || data.motherMobile || ''
        })
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error('Order creation failed');

      // Step 2: Open Razorpay checkout
      const options = {
        key: orderData.data.key,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: orderData.data.name,
        description: orderData.data.description,
        order_id: orderData.data.order_id,
        handler: async function (response) {
          // Step 3: Verify payment and submit form
          const verifyRes = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              certificateType: 'birth'
            })
          });

          const verifyData = await verifyRes.json();
          if (!verifyData.success) throw new Error('Payment verification failed');

          // Step 4: Submit form with verified payment
          const formData = {
            mobile: data.fatherMobile || data.motherMobile || "",
            childDetails: {
              name: child.childName,
              gender: child.gender,
              dob: child.dob,
              placeOfBirth: child.birthPlace,
              birthTime: child.birthTime
            },
            fatherDetails: { 
              name: parents.fatherName, 
              aadhaar: parents.fatherAadhaar,
              mobile: parents.fatherMobile
            },
            motherDetails: { 
              name: parents.motherName, 
              aadhaar: parents.motherAadhaar,
              mobile: parents.motherMobile 
            },
            documents: Object.entries(docs).map(([key, file]) => ({
              name: file.name,
              type: file.type || file.name.split('.').pop(),
              required: ['discharge','fatherAadhaar','motherAadhaar'].includes(key)
            })),
            payment: {
              ...response,
              method,
              amount: 20,
              verified: true
            }
          };

          const submitRes = await fetch(`${process.env.REACT_APP_API_URL}/api/birth-certificates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });

          if (!submitRes.ok) throw new Error('Submission failed');
          
          const result = await submitRes.json();
          console.log('Application submitted:', result.data.token);
          
        },
        prefill: orderData.data.prefill,
        notes: orderData.data.notes,
        theme: orderData.data.theme,
        modal: orderData.data.modal
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      setErr('Payment error. Please try again.');
      console.error('Pay error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={s.stepCard}>
      <div style={s.stepHeader}>
        <div style={s.stepIcon}>💰</div>
        <h2 style={s.stepTitle}>पेमेंट</h2>
        <p style={s.stepSubtitle}>Payment</p>
      </div>

      {/* Summary */}
      <div style={s.summaryBox}>
        <h3 style={s.summaryTitle}>अर्ज सारांश / Application Summary</h3>
        <div style={s.summaryRow}><span>मुलाचे नाव / Child Name</span><strong>{data.childName || "—"}</strong></div>
        <div style={s.summaryRow}><span>जन्म तारीख / Date of Birth</span><strong>{data.dob || "—"}</strong></div>
        <div style={s.summaryRow}><span>वडिलांचे नाव / Father</span><strong>{data.fatherName || "—"}</strong></div>
        <div style={s.summaryRow}><span>आईचे नाव / Mother</span><strong>{data.motherName || "—"}</strong></div>
        <div style={{ ...s.summaryRow, borderTop: "1.5px solid #e8b84b", paddingTop: 12, marginTop: 4 }}>
          <span style={{ fontWeight: 800 }}>अर्ज शुल्क / Fee</span>
          <strong style={{ color: "#e8b84b", fontSize: "1.2rem" }}>₹20</strong>
        </div>
      </div>

      <p style={{ ...s.stepDesc, marginBottom: 10 }}>पेमेंट पद्धत निवडा / Select Payment Method <span style={s.req}>*</span></p>
      {methods.map(m => (
        <div key={m.id} onClick={() => setMethod(m.id)}
          style={{ ...s.methodCard, ...(method === m.id ? s.methodCardActive : {}) }}>
          <span style={{ fontSize: "1.4rem" }}>{m.icon}</span>
          <span style={{ fontWeight: 600, fontSize: "0.9rem", flex: 1 }}>{m.label}</span>
          <div style={{ ...s.radio, ...(method === m.id ? s.radioActive : {}) }} />
        </div>
      ))}

      {err && <p style={s.err}>{err}</p>}
      <div style={s.btnRow}>
        <button style={s.ghostBtn} onClick={onBack} disabled={processing}>← मागे</button>
        <button style={{ ...s.primaryBtn, opacity: processing ? 0.8 : 1, flex: 2 }}
          onClick={pay} disabled={processing}>
          {processing
            ? <span style={s.loader}>⏳ Processing payment...</span>
            : "💳 ₹20 भरा / Pay Now"}
        </button>
      </div>
    </div>
  );
}

/* ── SUCCESS ─────────────────────────────────────── */
function Success({ data, onHome }) {
  const token = "BC" + Date.now().toString().slice(-8);
  return (
    <div style={{ ...s.stepCard, textAlign: "center", padding: "44px 32px" }}>
      <div style={s.successRing}>
        <div style={s.successCheck}>✓</div>
      </div>
      <h2 style={{ ...s.stepTitle, marginBottom: 6 }}>अर्ज यशस्वी!</h2>
      <p style={{ ...s.stepSubtitle, marginBottom: 6 }}>Application Submitted Successfully</p>
      <p style={{ ...s.stepDesc, marginBottom: 24 }}>
        {data.childName} यांचा जन्म दाखला अर्ज नोंदवला गेला आहे.
      </p>

      <div style={s.tokenCard}>
        <p style={s.tokenLabel}>टोकन नंबर / Token Number</p>
        <p style={s.tokenVal}>{token}</p>
        <p style={s.tokenHint}>हा नंबर सांभाळून ठेवा — प्रमाणपत्र तयार झाल्यावर SMS येईल</p>
      </div>

      <div style={s.infoGrid}>
        {[
          ["📋", "प्रक्रिया वेळ", "2–3 कार्यदिवस"],
          ["📧", "अधिसूचना", "SMS + Email"],
          ["💰", "भरलेले शुल्क", "₹20"],
          ["🔍", "स्थिती तपासा", "Token वापरून"],
        ].map(([ic, t, v]) => (
          <div key={t} style={s.infoCell}>
            <span style={{ fontSize: "1.4rem" }}>{ic}</span>
            <span style={s.infoCellLabel}>{t}</span>
            <span style={s.infoCellVal}>{v}</span>
          </div>
        ))}
      </div>

      <button style={{ ...s.primaryBtn, marginTop: 8 }} onClick={onHome}>
        🏠 मुख्यपृष्ठ / Back to Home
      </button>
    </div>
  );
}

/* ── MAIN COMPONENT ──────────────────────────────── */
export default function BirthCertificateForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const [child, setChild] = useState({
    childName: "", dob: "", gender: "", birthPlaceType: "",
    birthPlace: "", birthTime: "", birthAddress: "",
  });
  const [parents, setParents] = useState({
    fatherName: "", fatherAadhaar: "", fatherMobile: "", fatherOccupation: "",
    motherName: "", motherAadhaar: "", motherMobile: "", motherOccupation: "",
    address: "",
  });
  const [docs, setDocs] = useState({});

  const allData = { ...child, ...parents };

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{margin:0}
        input:focus,select:focus,textarea:focus{
          outline:none;border-color:#e8b84b !important;
          box-shadow:0 0 0 3px rgba(232,184,75,0.15) !important;
        }
        input:disabled{cursor:not-allowed}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .step-enter{animation:fadeUp 0.35s ease both}
        button:hover{filter:brightness(0.95)}
        .upload-label:hover{background:#1a2235 !important;color:#fff !important}
      `}</style>

      {/* TOP BAR */}
      <div style={s.topBar}>
        <div style={s.topBarLeft}>
          <button
            onClick={() => navigate("/birth-certificate")}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.2rem", color:"#8a9ab8", padding:"0 4px 0 0" }}
            title="Back"
          >←</button>
          <div style={s.topBarLogo}>🏛️</div>
          <div>
            <div style={s.topBarTitle}>जन्म दाखला अर्ज</div>
            <div style={s.topBarSub}>Birth Certificate Application · Kadepur Gram Panchayat</div>
          </div>
        </div>
        <div style={s.topBarRight}>शुल्क / Fee: <strong>₹20</strong></div>
      </div>

      {!done && <Stepper current={step} />}

      <div style={s.body}>
        {done ? (
          <Success data={allData} onHome={() => navigate("/birth-certificate")} />
        ) : (
          <div className="step-enter">
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 data={child} setData={setChild} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step3 data={parents} setData={setParents} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <Step4 docs={docs} setDocs={setDocs} onNext={() => setStep(5)} onBack={() => setStep(3)} />}
{step === 5 && <Step5 data={allData} child={child} parents={parents} docs={docs} onBack={() => setStep(4)} onSuccess={() => setDone(true)} />}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── STYLES ──────────────────────────────────────── */
const s = {
  page: { fontFamily: "'Baloo 2', 'Noto Sans Devanagari', sans-serif", background: "#f0f2f7", minHeight: "100vh" },

  topBar: {
    background: "#1a2235", padding: "14px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
  },
  topBarLeft: { display: "flex", alignItems: "center", gap: 14 },
  topBarLogo: { fontSize: "1.8rem" },
  topBarTitle: { color: "#e8b84b", fontWeight: 800, fontSize: "1rem", lineHeight: 1.2 },
  topBarSub: { color: "#8a9ab8", fontSize: "0.75rem", marginTop: 2 },
  topBarRight: { color: "#8a9ab8", fontSize: "0.88rem" },

  // Stepper
  stepperOuter: { background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: "20px 16px 16px" },
  stepperInner: { display: "flex", alignItems: "flex-start", justifyContent: "center", maxWidth: 860, margin: "0 auto", position: "relative" },
  stepCol: { display: "flex", alignItems: "center", flex: 1, justifyContent: "center", flexDirection: "column", position: "relative", gap: 6 },
  connector: { position: "absolute", top: 19, left: "-50%", right: "50%", height: 2.5, zIndex: 0, transition: "background 0.4s" },
  circle: {
    width: 38, height: 38, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: "0.9rem", zIndex: 1, position: "relative",
    transition: "all 0.35s", cursor: "default",
  },
  stepTexts: { display: "flex", flexDirection: "column", alignItems: "center", gap: 1 },
  stepMr: { fontSize: "0.7rem", fontWeight: 700, textAlign: "center", transition: "color 0.3s" },
  stepEn: { fontSize: "0.65rem", textAlign: "center" },

  body: { maxWidth: 780, margin: "0 auto", padding: "28px 16px 60px" },

  // Card
  stepCard: {
    background: "#fff", borderRadius: 16, padding: "32px 32px 28px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },
  stepHeader: { display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 20, gap: 2 },
  stepIcon: { fontSize: "2rem", marginBottom: 4 },
  stepTitle: { fontSize: "1.35rem", fontWeight: 800, color: "#1a2235" },
  stepSubtitle: { fontSize: "0.82rem", color: "#7a8a9e", fontWeight: 500, letterSpacing: "0.03em" },
  stepDesc: { fontSize: "0.86rem", color: "#5a6a7a", marginBottom: 20, lineHeight: 1.6 },

  // Fields
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0 20px" },
  fieldWrap: { marginBottom: 16 },
  label: { display: "flex", flexDirection: "column", gap: 1, marginBottom: 6, cursor: "default" },
  labelMr: { fontSize: "0.8rem", fontWeight: 700, color: "#1a2235" },
  labelEn: { fontSize: "0.74rem", color: "#7a8a9e", fontWeight: 500 },
  req: { color: "#e83e6c", fontWeight: 800 },
  input: {
    width: "100%", padding: "10px 13px",
    border: "1.5px solid #d8dde8", borderRadius: 8,
    fontFamily: "'Baloo 2', 'Noto Sans Devanagari', sans-serif",
    fontSize: "0.88rem", color: "#1a2235", background: "#fafbfd",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  inputDisabled: { background: "#f0f2f7", color: "#7a8a9e" },
  textarea: {
    width: "100%", padding: "10px 13px", minHeight: 80,
    border: "1.5px solid #d8dde8", borderRadius: 8,
    fontFamily: "'Baloo 2', 'Noto Sans Devanagari', sans-serif",
    fontSize: "0.88rem", color: "#1a2235", background: "#fafbfd",
    resize: "vertical", transition: "border-color 0.2s, box-shadow 0.2s",
  },
  err: { color: "#e74c3c", fontSize: "0.82rem", fontWeight: 600, marginBottom: 10 },
  sectionDivider: {
    fontSize: "0.8rem", fontWeight: 800, color: "#e8b84b",
    letterSpacing: "0.06em", textTransform: "uppercase",
    borderBottom: "2px solid #fdf0d0", paddingBottom: 6,
    marginBottom: 16, marginTop: 20,
  },

  // OTP
  otpSentBadge: {
    background: "#eafaf1", border: "1.5px solid #27ae60", borderRadius: 8,
    padding: "8px 14px", fontSize: "0.82rem", color: "#27ae60",
    fontWeight: 700, marginBottom: 16,
  },
  otpRow: { display: "flex", gap: 8 },
  otpBox: {
    width: 44, height: 52, border: "1.5px solid #d8dde8", borderRadius: 8,
    textAlign: "center", fontSize: "1.2rem", fontWeight: 800, color: "#1a2235",
    fontFamily: "'Baloo 2',sans-serif", background: "#fafbfd",
    transition: "border-color 0.2s",
  },

  // Buttons
  btnRow: { display: "flex", gap: 12, marginTop: 20 },
  primaryBtn: {
    flex: 1, padding: "13px 16px",
    background: "#e8b84b", border: "none", borderRadius: 9,
    fontFamily: "'Baloo 2', sans-serif", fontSize: "0.96rem", fontWeight: 800,
    color: "#1a2235", cursor: "pointer",
    boxShadow: "0 4px 18px rgba(232,184,75,0.32)",
    transition: "transform 0.15s, box-shadow 0.15s",
    letterSpacing: "0.01em",
  },
  ghostBtn: {
    flex: "0 0 auto", padding: "12px 20px",
    background: "#f0f2f7", border: "1.5px solid #d8dde8", borderRadius: 9,
    fontFamily: "'Baloo 2', sans-serif", fontSize: "0.88rem", fontWeight: 700,
    color: "#5a6a7a", cursor: "pointer", transition: "background 0.2s",
  },

  // Docs
  docRow: {
    display: "flex", alignItems: "center", gap: 14,
    border: "1.5px solid #e8ecf4", borderRadius: 10,
    padding: "13px 16px", marginBottom: 10, transition: "border-color 0.2s",
  },
  docRowDone: { borderColor: "#27ae60", background: "#f6fef9" },
  docIcon: { fontSize: "1.5rem", flexShrink: 0 },
  docName: { fontSize: "0.84rem", fontWeight: 700, color: "#1a2235", marginBottom: 2 },
  docDone: { fontSize: "0.76rem", color: "#27ae60", fontWeight: 600 },
  docHint: { fontSize: "0.74rem", color: "#9aa3ae" },
  optBadge: {
    display: "inline-block", marginLeft: 8, background: "#eef0ff",
    color: "#6c7ae0", fontSize: "0.68rem", fontWeight: 700,
    borderRadius: 999, padding: "1px 7px",
  },
  uploadBtn: {
    padding: "7px 14px", background: "#f0f2f7", border: "1.5px solid #d8dde8",
    borderRadius: 7, fontSize: "0.8rem", fontWeight: 700, color: "#1a2235",
    cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
    transition: "background 0.2s, color 0.2s",
  },
  uploadBtnDone: { background: "#eafaf1", borderColor: "#27ae60", color: "#27ae60" },

  // Payment
  summaryBox: {
    background: "#fafbfd", border: "1.5px solid #e8ecf4", borderRadius: 10,
    padding: "18px 20px", marginBottom: 20,
  },
  summaryTitle: { fontSize: "0.82rem", fontWeight: 800, color: "#7a8a9e", marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" },
  summaryRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    fontSize: "0.86rem", color: "#3a4a5a", padding: "6px 0",
    borderBottom: "1px solid #edf0f5",
  },
  methodCard: {
    display: "flex", alignItems: "center", gap: 12,
    border: "1.5px solid #e8ecf4", borderRadius: 9,
    padding: "12px 16px", marginBottom: 10,
    cursor: "pointer", transition: "all 0.2s",
  },
  methodCardActive: { border: "1.5px solid #e8b84b", background: "#fffbee" },
  radio: { width: 18, height: 18, borderRadius: "50%", border: "2px solid #c8cfd9", transition: "all 0.2s", marginLeft: "auto" },
  radioActive: { border: "5px solid #e8b84b" },
  loader: { fontSize: "0.9rem" },

  // Success
  successRing: {
    width: 72, height: 72, borderRadius: "50%",
    border: "4px solid #e8b84b", display: "flex",
    alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px", background: "#fffbee",
  },
  successCheck: { fontSize: "1.8rem", fontWeight: 900, color: "#27ae60" },
  tokenCard: {
    background: "#fffbee", border: "2px dashed #e8b84b", borderRadius: 10,
    padding: "18px 24px", marginBottom: 20, textAlign: "center",
  },
  tokenLabel: { fontSize: "0.78rem", fontWeight: 700, color: "#7a8a9e", marginBottom: 6 },
  tokenVal: { fontSize: "1.8rem", fontWeight: 900, color: "#e8b84b", letterSpacing: "0.1em" },
  tokenHint: { fontSize: "0.74rem", color: "#7a8a9e", marginTop: 6 },
  infoGrid: {
    display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10,
    marginBottom: 20,
  },
  infoCell: {
    background: "#f5f7fa", borderRadius: 8, padding: "12px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
  },
  infoCellLabel: { fontSize: "0.72rem", color: "#7a8a9e", fontWeight: 700 },
  infoCellVal: { fontSize: "0.84rem", color: "#1a2235", fontWeight: 700 },
};