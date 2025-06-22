import React from "react";
// import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

// === Consistent Styles (matches MeetSalman) ===

const containerStyle = {
  display: "flex",
  flexDirection: "column", // crucial for vertical layout
  minHeight: "100vh",
  backgroundColor: "#121212",
  color: "#eee",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
  padding: "60px 20px",
  marginLeft: 220,
  marginTop: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  backgroundColor: "#141414",
  borderRadius: "16px",
  padding: "50px",
  maxWidth: "900px",
  width: "100%",
  boxShadow: "0 0 60px rgba(231, 217, 184, 0.15)",
  border: "1px solid #3e3e3e",
};

const headingStyle = {
  fontSize: "3rem",
  fontWeight: 700,
  marginBottom: "20px",
  textAlign: "center",
  color: "#f5e9cd",
  borderBottom: "2px solid #d4c48b",
  paddingBottom: "16px",
};

const paragraphIntro = {
  fontSize: "1.2rem",
  lineHeight: 1.7,
  marginBottom: "32px",
  textAlign: "center",
  color: "#d0c3a8",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  fontSize: "1.15rem",
  lineHeight: 1.9,
};

const listItem = {
  display: "flex",
  alignItems: "start",
  gap: "14px",
  marginBottom: "22px",
};

const emoji = {
  fontSize: "1.3rem",
  color: "#d4c48b",
  flexShrink: 0,
};

const qualityTitle = {
  fontWeight: 600,
  color: "#f9f6e8",
};

const closingNote = {
  marginTop: "40px",
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "1.1rem",
  color: "#bfae94",
};

const footerStyle = {
  marginTop: "40px",
  padding: "20px",
  textAlign: "center",
  color: "#aaa",
  fontSize: "1rem",
  // borderTop: "1px solid #333", // removed this line
};

// === Component ===

const Character = () => {
  return (
    <div style={containerStyle}>
      {/* ✅ Mobile Navbar */}
      <Navbar />

      {/* ✅ Fixed Header */}
      <header style={headerStyle}>Character</header>

      {/* ✅ Main Content */}
      <div className="content" style={contentStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Character</h1>
          <p style={paragraphIntro}>
            Salman Saeed’s essence shines through a blend of rare qualities that
            define who he is beyond titles and achievements:
          </p>
          <ul style={listStyle}>
            <li style={listItem}>
              <span style={emoji}>🧠</span>
              <span>
                <span style={qualityTitle}>Early Visionary:</span> Started
                programming at age 5 and showed financial acumen by age 9,
                managing household finances responsibly.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🎯</span>
              <span>
                <span style={qualityTitle}>Focused & Determined:</span> From a
                young age, set clear goals like building businesses and creating
                value, far ahead of his peers.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🤝</span>
              <span>
                <span style={qualityTitle}>Integrity & Honesty:</span> Returns
                money when owed, repays childhood bets decades later, and
                chooses principle over profit consistently.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🕊️</span>
              <span>
                <span style={qualityTitle}>Humble & Composed:</span> Faces
                challenges with calmness and grace, maintaining poise even in
                the toughest situations.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>❤️</span>
              <span>
                <span style={qualityTitle}>Compassion & Empathy:</span> Treats
                others — from noisy hospital roommates to business partners —
                with kindness and understanding.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🧩</span>
              <span>
                <span style={qualityTitle}>System Thinker:</span> Possesses deep
                IQ and EQ, able to see and navigate complex emotional, economic,
                and psychological systems.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🛡️</span>
              <span>
                <span style={qualityTitle}>Resilient & Forgiving:</span> Endures
                betrayal, rejection, and injustice without bitterness, focusing
                on growth and forward movement.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🔗</span>
              <span>
                <span style={qualityTitle}>Bridge Builder:</span> Creates
                lasting relationships built on respect and trust, even when
                faced with adversity.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🌱</span>
              <span>
                <span style={qualityTitle}>Legacy Minded:</span> Lives and works
                not for fleeting applause but for meaningful, lasting impact.
              </span>
            </li>
            <li style={listItem}>
              <span style={emoji}>🕯️</span>
              <span>
                <span style={qualityTitle}>Principled & Grounded:</span> Values
                silence, duty, and meaning over noise, desire, and superficial
                success.
              </span>
            </li>
          </ul>
          <p style={closingNote}>
            Intelligence, emotional depth, and unwavering ethics make Salman a
            builder of legacies — not just businesses.
          </p>
        </div>
      </div>

      {/* ✅ Footer */}
      <footer style={footerStyle}>© سلمان سعید</footer>

      {/* ✅ Responsive overrides */}
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
            margin-top: 110px !important;
            padding: 20px 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Character;
