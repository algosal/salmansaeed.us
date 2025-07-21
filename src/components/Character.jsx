import React from "react";
import Navbar from "./Navbar";

const containerWrapperStyle = {
  margin: "0 auto",
  width: 1100,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#121212",
  color: "#eee",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  paddingTop: 80, // to avoid header overlap
};

const headerStyle = {
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 1100,
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

const mainContentStyle = {
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
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
  width: 1100,
  margin: "40px auto 0",
};

const Character = () => {
  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <header style={headerStyle}>Character</header>

      <div style={containerWrapperStyle}>
        <Navbar />
        <main style={mainContentStyle}>
          <div style={cardStyle}>
            <h1 style={headingStyle}>Character</h1>
            <p style={paragraphIntro}>
              Salman Saeed’s essence shines through a blend of rare qualities
              that define who he is beyond titles and achievements:
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
                  young age, set clear goals like building businesses and
                  creating value, far ahead of his peers.
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
                  <span style={qualityTitle}>System Thinker:</span> Possesses
                  deep IQ and EQ, able to see and navigate complex emotional,
                  economic, and psychological systems.
                </span>
              </li>
              <li style={listItem}>
                <span style={emoji}>🛡️</span>
                <span>
                  <span style={qualityTitle}>Resilient & Forgiving:</span>{" "}
                  Endures betrayal, rejection, and injustice without bitterness,
                  focusing on growth and forward movement.
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
                  <span style={qualityTitle}>Legacy Minded:</span> Lives and
                  works not for fleeting applause but for meaningful, lasting
                  impact.
                </span>
              </li>
              <li style={listItem}>
                <span style={emoji}>🕯️</span>
                <span>
                  <span style={qualityTitle}>Principled & Grounded:</span>{" "}
                  Values silence, duty, and meaning over noise, desire, and
                  superficial success.
                </span>
              </li>
            </ul>
            <p style={closingNote}>
              Intelligence, emotional depth, and unwavering ethics make Salman a
              builder of legacies — not just businesses.
            </p>
          </div>
        </main>
      </div>

      <footer style={footerStyle}>© سلمان سعید</footer>
    </div>
  );
};

export default Character;
