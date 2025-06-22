import React from "react";
// import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import profileImage from "../assets/profile.jpg";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#121212",
  color: "#eee",
};

// const sidebarStyle = {
//   display: "flex",
//   flexDirection: "column",
//   width: 220,
//   height: "100vh",
//   position: "fixed",
//   top: 0,
//   left: 0,
//   padding: 20,
//   backgroundColor: "#1e1e1e",
//   gap: 15,
//   boxSizing: "border-box",
//   zIndex: 100,
// };

// const linkStyle = {
//   color: "#bbb",
//   textDecoration: "none",
//   fontSize: 18,
//   fontWeight: 600,
//   padding: "8px 12px",
//   borderRadius: 6,
//   marginBottom: 8,
// };

// const activeLinkStyle = {
//   ...linkStyle,
//   color: "#00f0ff",
//   backgroundColor: "#333",
// };

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
  justifyContent: "space-between",
  boxSizing: "border-box",
};

const arabicNameStyle = {
  fontSize: "1.5rem",
  color: "#ffcc00",
  fontWeight: "400",
  marginLeft: "20px",
  fontFamily: "'Amiri', serif",
};

const contentStyle = {
  flexGrow: 1,
  padding: 30,
  marginLeft: 220,
  marginTop: 80,
};

const contentFlexStyle = {
  display: "flex",
  gap: "40px",
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const paragraphStyle = {
  maxWidth: "600px",
  lineHeight: 1.8,
  marginTop: "30px",
  textIndent: "2em",
  textAlign: "justify",
};

const lastParagraphStyle = {
  marginTop: "40px",
  fontStyle: "italic",
  fontSize: "1.1rem",
  lineHeight: 1.8,
  textAlign: "justify",
  textIndent: "2em",
  width: "100%",
  maxWidth: "1000px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "0 20px",
};

const footerStyle = {
  marginTop: "60px",
  textAlign: "center",
  fontSize: "1rem",
  color: "#aaa",
};

const imageContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const imageStyle = {
  maxWidth: "600px",
  width: "100%",
  height: "auto",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
  flexShrink: 0,
};

const MeetSalman = () => {
  return (
    <div style={containerStyle}>
      <Navbar />

      {/* <nav className="sidebar" style={sidebarStyle}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Meet Salman
        </NavLink>
        <NavLink
          to="/corporate"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Corporate
        </NavLink>
        <NavLink
          to="/gallery"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Gallery
        </NavLink>
        <NavLink
          to="/legacy"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Legacy
        </NavLink>
        <NavLink
          to="/character"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Character
        </NavLink>
      </nav> */}

      <header style={headerStyle}>
        <div>
          Meet Salman Saeed
          <span style={arabicNameStyle}> — سلمان سعید</span>
        </div>
      </header>

      <div className="content" style={contentStyle}>
        <div className="content-flex" style={contentFlexStyle}>
          <div style={{ flex: 1 }}>
            <p style={paragraphStyle}>
              Salman Saeed is a pioneering entrepreneur, technologist, and
              strategic visionary shaping the future across multiple sectors.
              Leveraging deep expertise in artificial intelligence, finance, and
              software architecture, he designs integrated business ecosystems
              that harmonize innovation with operational excellence.
            </p>
            <p style={paragraphStyle}>
              Mr. Saeed is an avid believer in the power of imagination and the
              laws of manifestation. Deeply influenced by the teachings of
              Neville Goddard and the philosophy of abundance, he has cultivated
              a life and business style that emerges from inner conviction,
              creative visualization, and unwavering self-belief.
            </p>
            <p style={paragraphStyle}>
              To him, the outer world is merely a reflection of the inner state,
              and true transformation begins within. Just as a seed becomes a
              forest, every thought sown with faith manifests into reality. His
              methods are a blend of metaphysical insight and pragmatic action —
              a rare fusion of spirit and strategy.
            </p>
            <p style={paragraphStyle}>
              Through persistent visualization and unwavering inner dialogue,
              Mr. Saeed transforms intention into tangible achievement. He
              believes the mind, when disciplined by faith, becomes the
              architect of destiny — building outcomes long before they appear
              in the material world. His daily life is steeped in meditation,
              scripting, and conscious assumption — not as rituals, but as
              technologies of the self. In his view, imagination is not
              escapism; it is creation. Each inspired thought is a blueprint,
              and each belief is a command. By aligning emotion with thought and
              action with purpose, Salman unlocks an inner harmony that radiates
              outward — into businesses, relationships, and communities. This is
              not mere philosophy — it’s a deliberate way of living, taught by
              mystics and now applied to modern enterprise with elegance and
              force.
            </p>
          </div>
          <div style={imageContainerStyle}>
            <img src={profileImage} alt="Salman Saeed" style={imageStyle} />
          </div>
        </div>

        <p style={lastParagraphStyle}>
          “Imagine better than the best you know,” Neville Goddard once said — a
          principle Salman lives by. His work and character are testimony to the
          transformative power of belief and the creative command of the mind.
          He doesn't just build businesses — he builds realities, one thought at
          a time.
        </p>

        <footer style={footerStyle}>© سلمان سعید</footer>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            display: none !important;
          }
          header {
            position: fixed !important;
            top: 50px !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            padding: 15px 20px !important;
            font-size: 1.8rem !important;
            border-bottom: 1px solid #333 !important;
            z-index: 1500 !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            box-sizing: border-box !important;
          }
          header span {
            font-size: 1.2rem !important;
            margin-left: 0 !important;
            margin-top: 5px !important;
          }
          .content {
            margin-left: 0 !important;
            margin-top: 120px !important;
            padding: 20px 15px !important;
          }
          .content-flex {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
          }
          .content-flex img {
            margin-top: 20px;
            max-width: 280px !important;
          }
          .content-flex p {
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default MeetSalman;
