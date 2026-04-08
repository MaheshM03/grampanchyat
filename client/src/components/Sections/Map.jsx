export default function Map() {
  return (
    <section style={{ padding: "40px 20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>📍 Our Location</h2>

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Kadepur,Maharashtra&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}