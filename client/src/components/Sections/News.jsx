import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function News() {

  // Dynamic date generator (looks real-time)
  const getDate = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toDateString();
  };

  const newsData = [
    {
      title: "Maharashtra Digitizes Land Records for Faster Access",
      desc: "Citizens can now access land records online with improved transparency and reduced processing time.",
      date: getDate(1),
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
    },
    {
      title: "Online Birth Certificate Services Expanded Across Districts",
      desc: "New updates allow faster processing of birth certificates through the online portal.",
      date: getDate(2),
      img: "https://images.unsplash.com/photo-1581090700227-1e8a1a0c4a8e"
    },
    {
      title: "Rural Employment Boost Under MGNREGA Scheme",
      desc: "Government increases budget allocation to support rural employment and digital wage payments.",
      date: getDate(3),
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
    },
    {
      title: "New Smart Village Initiative Launched",
      desc: "Focus on digital services, infrastructure, and e-governance in rural areas.",
      date: getDate(4),
      img: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    }
  ];

  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      background: "#f5f7fa",
      minHeight: "100vh"
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "40px 20px"
    },
    heading: {
      fontSize: "28px",
      fontWeight: "600",
      marginBottom: "25px",
      color: "#2c3e50",
      textAlign: "center"
    },
    card: {
      background: "#ffffff",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    image: {
      width: "100%",
      height: "180px",
      objectFit: "cover"
    },
    content: {
      padding: "15px",
      textAlign: "left",
      flex: 1
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#2d3436"
    },
    desc: {
      fontSize: "14px",
      color: "#636e72",
      marginBottom: "10px"
    },
    date: {
      fontSize: "12px",
      color: "#0984e3",
      fontWeight: "500"
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Latest News & Updates</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          autoplay={{ delay: 2500 }}
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
                <img src={news.img} alt="news" style={styles.image} />

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