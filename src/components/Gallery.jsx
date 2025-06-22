import React from "react";
// import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import salmanImg from "../assets/salman.jpg"; // replace with your actual path

const galleryItems = [
  // same items you provided...
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    alt: "FinSln Holdings",
    caption: "FinSln Holdings (Parent Holding Company)",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    alt: "FinSln LLC",
    caption: "FinSln LLC – Financial & Accounting Solutions",
  },
  {
    src: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=400&q=80",
    alt: "Conscience Neurons LLC",
    caption: "Conscience Neurons LLC – AI & Neural Integrations",
  },
  {
    src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=400&q=80",
    alt: "Mellow Enclave LLC",
    caption: "Mellow Enclave LLC – Billionaires Club",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
    alt: "Suit De Vital LLC",
    caption: "Suit De Vital LLC – Elite Custom Suiting",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
    alt: "Budson Valley Smokehouse",
    caption: "Budson Valley Smokehouse – THC Dispensary",
  },
  {
    src: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=80",
    alt: "420 CannaCore LLC",
    caption: "420 CannaCore LLC – THC Dispensary",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
    alt: "Floating Koala LLC",
    caption: "Floating Koala LLC – THC Dispensary",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    alt: "Wellness & Beyond",
    caption: "Wellness & Beyond – Wellness Products",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    alt: "Alba Gold Systems LLC",
    caption: "Alba Gold Systems LLC – Software Company",
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
    alt: "Alba Points LLC",
    caption: "Alba Points LLC – Blockchain Point System",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    alt: "Mergers and Acquisitions",
    caption: "Mergers & Acquisitions for Salman Saeed LLC",
  },
  {
    src: salmanImg,
    alt: "Salman Saeed Corporate Solutions",
    caption: "Salman Saeed Corporate Solutions – Original Entity",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    alt: "Savvy Inventory LLC",
    caption: "Savvy Inventory LLC – Retail Inventory Management",
  },
  {
    src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
    alt: "Financial Data LLC",
    caption: "Financial Data LLC – Data Analytics & Reporting",
  },
];

const Gallery = () => {
  return (
    <div style={containerStyle}>
      {/* ✅ Mobile Navbar */}
      <Navbar />

      {/* ✅ Fixed Header */}
      <header style={headerStyle}>Gallery</header>

      {/* ✅ Main Content */}
      <main className="content" style={contentStyle}>
        <div className="gallery-grid" style={galleryGridStyle}>
          {galleryItems.map(({ src, alt, caption }, index) => (
            <div className="gallery-item" style={galleryItemStyle} key={index}>
              <img
                src={src}
                alt={alt}
                style={{ width: "100%", borderRadius: 8, display: "block" }}
              />
              <div className="caption" style={captionStyle}>
                {caption}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ✅ Responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            display: none !important;
          }
          header {
            position: fixed !important;
            top: 50px !important; /* below Navbar height */
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            padding: 15px 20px !important;
            font-size: 2rem !important;
            border-bottom: 1px solid #333 !important;
            z-index: 1500 !important;
            height: 60px !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }
          .content {
            margin-left: 0 !important;
            margin-top: 110px !important; /* Navbar + header */
            padding: 20px 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;

// === Consistent Styles ===

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#121212",
  color: "#eee",
};

const headerStyle = {
  position: "fixed",
  top: 0,
  left: 220,
  right: 0,
  backgroundColor: "#121212",
  color: "#ffcc00",
  borderBottom: "1px solid #333",
  padding: "15px 30px",
  fontSize: "2.5rem",
  fontWeight: "bold",
  zIndex: 150,
  height: 80,
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
};

const contentStyle = {
  flexGrow: 1,
  padding: 30,
  marginLeft: 220,
  marginTop: 80,
  overflowY: "auto",
};

const galleryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 20,
};

const galleryItemStyle = {
  backgroundColor: "#222",
  padding: 10,
  borderRadius: 8,
  boxShadow: "0 0 10px rgba(0,0,0,0.7)",
};

const captionStyle = {
  marginTop: 8,
  fontSize: 14,
  textAlign: "center",
  color: "#ccc",
};
