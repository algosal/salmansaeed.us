import React from "react";
import Navbar from "./Navbar";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#121212", // dark background outside card
  color: "#eee",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headerStyle = {
  position: "fixed",
  top: 0,
  left: 220,
  right: 0,
  backgroundColor: "#121212", // dark header background
  color: "#ffcc00", // gold text
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

const contentStyle = {
  flexGrow: 1,
  padding: "30px",
  maxWidth: "900px",
  margin: "80px auto 30px auto",
  color: "#2b2b2b", // dark text inside card container
};

const cardStyle = {
  backgroundColor: "#fffdf7", // light background inside card
  borderRadius: "16px",
  padding: "50px",
  width: "100%",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid #ddd",
};

const headingStyle = {
  fontSize: "3rem",
  fontWeight: 700,
  marginBottom: "20px",
  textAlign: "center",
  // color: "#7a6a3d", // warm gold/brown
  color: "#000000", // warm gold/brown
  borderBottom: "2px solid #d4c48b",
  paddingBottom: "16px",
};

const paragraphIntro = {
  fontSize: "1.2rem",
  lineHeight: 1.7,
  marginBottom: "32px",
  textAlign: "center",
  color: "#6e6253",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  fontSize: "1.15rem",
  lineHeight: 1.9,
  color: "#3e3a36",
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
  color: "#5a4e32",
};

const closingNote = {
  marginTop: "40px",
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "1.1rem",
  color: "#7a6a3d",
};

const footerStyle = {
  marginTop: "60px",
  marginBottom: "40px",
  textAlign: "center",
  fontSize: "1rem",
  color: "#aaa",
};

const Character = () => {
  return (
    <div style={containerStyle}>
      <Navbar />

      <header style={headerStyle} className="legacy-header">
        Character
      </header>

      <div style={contentStyle} className="content-style-padding">
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

      <footer style={footerStyle}>© سلمان سعید</footer>

      <style>{`
        @media (max-width: 768px) {
          .legacy-header {
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
            background-color: #121212 !important;
            color: #ffcc00 !important;
          }
          .content-style-padding {
            margin-top: 120px !important;
            color: #2b2b2b !important;
          }
          footer {
            margin-top: 60px !important;
            margin-bottom: 40px !important;
            text-align: center !important;
            font-size: 1rem !important;
            color: #aaa !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Character;
