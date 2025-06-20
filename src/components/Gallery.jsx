import React from "react";
import { NavLink } from "react-router-dom";
import salmanImg from "../assets/salman.jpg"; // Replace with your actual image path

const galleryItems = [
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
    <div className="container" style={containerStyle}>
      <nav className="sidebar" style={sidebarStyle}>
        <NavLink to="/" style={linkStyle} end>
          Meet Salman
        </NavLink>
        <NavLink to="/corporate" style={linkStyle}>
          Corporate
        </NavLink>
        <NavLink to="/gallery" style={activeLinkStyle}>
          Gallery
        </NavLink>
      </nav>

      <main className="content" style={contentStyle}>
        <div className="content-header" style={{ marginBottom: "1rem" }}>
          <h1>Gallery</h1>
        </div>

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
    </div>
  );
};

export default Gallery;

// Styles

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#121212",
  color: "#eee",
};

const sidebarStyle = {
  display: "flex",
  flexDirection: "column",
  width: 220,
  padding: 20,
  backgroundColor: "#1e1e1e",
  gap: 15,
  boxSizing: "border-box",
};

const linkStyle = {
  color: "#bbb",
  textDecoration: "none",
  fontSize: 18,
  fontWeight: 600,
  padding: "8px 12px",
  borderRadius: 6,
  marginBottom: 8,
  display: "inline-block",
};

const activeLinkStyle = {
  ...linkStyle,
  color: "#00f0ff",
  backgroundColor: "#333",
};

const contentStyle = {
  flexGrow: 1,
  padding: 30,
  marginTop: 140,
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
