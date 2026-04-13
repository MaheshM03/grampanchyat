import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNews } from "../../context/NewsContext";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

export default function News() {
  const { news, loading } = useNews();

  const formatDate = (dateString) => {
    return new Date(dateString).toDateString();
  };

  const styles = {
    page: {
      fontFamily: "Inter, sans-serif",
      background: "#f8fafc",
      minHeight: "100vh"
    },

    /* HERO */
    hero: {
      background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      padding: "60px 20px",
      textAlign: "center",
      color: "white"
    },
    heroTitle: {
      fontSize: "clamp(22px,5vw,34px)",
      fontWeight: "800"
    },
    heroSub: {
      marginTop: 10,
      color: "#cbd5f5"
    },

    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 15px"
    },

    card: {
      background: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      transition: "0.3s",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },

    imageWrapper: {
      position: "relative"
    },

    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      backgroundColor: "#f1f5f9"
    },

    overlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "60%",
      background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent)"
    },

    content: {
      padding: "16px",
      flex: 1
    },

    title: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px"
    },

    desc: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "12px",
      lineHeight: 1.5
    },

    date: {
      fontSize: "12px",
      color: "#2563eb",
      fontWeight: "600"
    },

    loading: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#64748b"
    },

    empty: {
      textAlign: "center",
      padding: "80px 20px",
      color: "#64748b"
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.loading}>
          <h2>Loading latest news...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      {/* HERO */}
      <div style={styles.hero}>
        <h2 style={styles.heroTitle}>Latest News & Updates</h2>
        <p style={styles.heroSub}>Stay updated with government announcements</p>
      </div>

      <div style={styles.container}>
        {news.length === 0 ? (
          <div style={styles.empty}>
            <h3>No news available</h3>
            <p>Check back later for updates</p>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {news.map((item, i) => (
              <SwiperSlide key={item._id || i}>
                <div style={styles.card}>
                  {/* IMAGE */}
                  <div style={styles.imageWrapper}>
                    <img 
                      src={item.img || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"} 
                      alt={item.title} 
                      style={styles.image} 
                    />
                    <div style={styles.overlay}></div>
                  </div>

                  {/* CONTENT */}
                  <div style={styles.content}>
                    <p style={styles.title}>{item.title}</p>
                    <p style={styles.desc}>{item.desc}</p>
                    <p style={styles.date}>{formatDate(item.createdAt)}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <Footer />
    </div>
  );
}
