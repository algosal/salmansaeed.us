import React from "react";
import { NavLink } from "react-router-dom";
import profileImage from "../assets/profile.jpg";

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
  overflowY: "auto",
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
  marginTop: "50px",
  textIndent: "2em",
  textAlign: "justify",
};

const lastParagraphStyle = {
  ...paragraphStyle,
  marginTop: "40px",
  paddingTop: "30px",
  borderTop: "1px solid #333",
  fontStyle: "italic",
  fontFamily: "'Georgia', serif",
};

const imageStyle = {
  maxWidth: "280px",
  width: "100%",
  height: "auto",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
  flexShrink: 0,
};

const MeetSalman = () => {
  return (
    <div style={containerStyle}>
      {/* Sidebar Navigation */}
      <nav className="sidebar" style={sidebarStyle}>
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
      </nav>

      {/* Main Content */}
      <div className="content" style={contentStyle}>
        <header style={{ marginBottom: "0rem", position: "relative" }}>
          <h1 className="main-heading" style={{ margin: 0 }}>
            Meet Saeed, Salman
          </h1>
          <h2 className="arabic-name">سلمان سعید</h2>

          <style>{`
            .arabic-name {
              margin: 0;
              position: absolute;
              top: 100%;
              right: 0;
              font-size: 1.5rem;
              color: #ffcc00;
              direction: rtl;
              transition: all 0.3s ease;
            }

            @media (min-width: 769px) {
              .main-heading {
                font-size: 2.5rem !important;
              }
              .arabic-name {
                right: auto !important;
                left: 0 !important;
                margin-left: 300px !important;
              }
            }
          `}</style>
        </header>

        <div className="content-flex" style={contentFlexStyle}>
          <div>
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
              creative visualization, and unwavering self-belief. To him, the
              outer world is merely a reflection of the inner state, and true
              transformation begins with thought.
            </p>
          </div>
          <img src={profileImage} alt="Salman Saeed" style={imageStyle} />
        </div>

        <p style={lastParagraphStyle}>
          “Imagine better than the best you know,” Neville Goddard once said — a
          principle Salman lives by. His work and character are testimony to the
          transformative power of belief and the creative command of the mind.
          He doesn't just build businesses — he builds realities, one thought at
          a time.
        </p>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            display: none !important;
          }

          .content {
            margin-left: 0 !important;
            margin-top: 60px;
          }

          .content-flex {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
          }

          .content-flex img {
            margin-top: 20px;
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
