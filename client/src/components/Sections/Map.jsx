export default function Map() {
  return (
    <section style={{
      padding: "50px 16px",
      background: "#f5f7fa",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{
        marginBottom: "20px",
        fontSize: "24px",
        color: "#1a2a4a"
      }}>
        📍 Our Location
      </h2>

      <div style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
      }}>
        <iframe
          title="Gangavhare Map"
          src="https://www.google.com/maps?q=Gangavhare,Maharashtra&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}