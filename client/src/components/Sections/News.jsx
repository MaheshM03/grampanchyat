import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function News() {

  const getDate = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toDateString();
  };

  const newsData = [
    {
      title: "Maharashtra Digitizes Land Records",
      desc: "Citizens can now access land records online with improved transparency.",
      date: getDate(1),
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
    },
    {
      title: "Online Birth Certificate Services Expanded",
      desc: "Faster processing through online portal across districts.",
      date: getDate(2),
      img: "https://images.unsplash.com/photo-1581090700227-1e8a1a0c4a8e"
    },
    {
      title: "Rural Employment Boost",
      desc: "Government increases budget allocation under MGNREGA.",
      date: getDate(3),
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
    },
    {
      title: "Smart Village Initiative Launched",
      desc: "Focus on digital services and rural infrastructure.",
      date: getDate(4),
      img: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    }
  ];

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
      objectFit: "cover"
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
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      {/* HERO */}
      <div style={styles.hero}>
        <h2 style={styles.heroTitle}>Latest News & Updates</h2>
        <p style={styles.heroSub}>Stay updated with government announcements</p>
      </div>

      <div style={styles.container}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {newsData.map((news, i) => (
            <SwiperSlide key={i}>
              <div style={styles.card}>

                {/* IMAGE */}
                <div style={styles.imageWrapper}>
                  <img src={news.img} alt="news" style={styles.image} />
                  <div style={styles.overlay}></div>
                </div>

                {/* CONTENT */}
                <div style={styles.content}>
                  <p style={styles.title}>{news.title}</p>
                  <p style={styles.desc}>{news.desc}</p>
                  <p style={styles.date}>{news.date}</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </div>
  );
}