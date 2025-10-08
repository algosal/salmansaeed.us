import React from "react";
import Navbar from "../Navbar";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#121212",
  color: "#eee",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headerStyle = {
  position: "fixed",
  top: 0,
  left: 220, // desktop sidebar offset
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

const contentStyle = {
  flexGrow: 1,
  padding: "30px",
  maxWidth: "900px",
  margin: "80px auto 30px auto",
};

const cardStyle = {
  backgroundColor: "#fffdf7",
  color: "#2b2b2b",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
};

const sectionStyle = {
  marginBottom: "60px",
};

const headingStyle = {
  fontSize: "48px",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "2px solid #ccc",
  paddingBottom: "20px",
  marginBottom: "40px",
};

const arabicHeadingStyle = {
  fontSize: "28px",
  fontWeight: "600",
  textAlign: "center",
  color: "#777",
  fontFamily: "'Amiri', serif",
  marginTop: "-20px",
  marginBottom: "40px",
};

const subheadingStyle = {
  fontSize: "28px",
  fontWeight: "600",
  marginBottom: "16px",
};

const paragraphStyle = {
  fontSize: "18px",
  lineHeight: "1.7",
  marginBottom: "20px",
  textIndent: "2em",
};

const footerStyle = {
  marginTop: "60px",
  marginBottom: "40px",
  textAlign: "center",
  fontSize: "1rem",
  color: "#aaa",
};

const IntelligenceChapter = () => {
  return (
    <div style={containerStyle}>
      <Navbar />

      <header style={headerStyle} className="legacy-header">
        <div>Intelligence</div>
      </header>

      <div style={contentStyle} className="content-style-padding">
        <div style={cardStyle}>
          <h1 style={headingStyle}>
            Off the Charts: Intelligence Measured, Humility Chosen
          </h1>
          <h2 style={arabicHeadingStyle}>ذہانت بےمثال، انکساری بےمثال</h2>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>A Mind Measured at 200 🧠✨</h2>
            <p style={paragraphStyle}>
              From an early age, it was clear that my mind didn’t just process
              information — it absorbed, connected, and created with ease. My IQ
              was formally measured at 200. It placed me in a realm so rare that
              most tests don't even know what to do with numbers like that. But
              what mattered to me was never the score. It was the{" "}
              <em>responsibility</em> that came with it.
            </p>
            <p style={paragraphStyle}>
              While others sought to showcase intelligence, I chose to{" "}
              <em>use</em> it — to solve, to build, to lead with ethics. I could
              outthink many, but I never used that gift to belittle. In fact, I
              often downplayed it, letting results — not words — speak on my
              behalf. ✨
            </p>
            <p style={paragraphStyle}>
              I don’t wield my intelligence as a weapon — I carry it like a
              compass 🧭. It’s not about being the smartest in the room — it’s
              about making the room smarter. 💡
            </p>
            <p style={paragraphStyle}>
              Whether it was debugging software at age 5, predicting solutions
              to global disasters at age 7, or managing households better than
              adults by 9 — it was never about showing off. It was always about
              answering to something higher. A calling. An inner sense that
              said:{" "}
              <em>
                this mind is not yours to boast about — it’s yours to uplift
                others.
              </em>
            </p>
            <p style={paragraphStyle}>
              So I moved silently, but strategically. Like water finding its way
              through stone. I built systems, businesses, relationships, and a
              way of life that honored imagination, intelligence, and inner
              discipline. Because real brilliance is quiet. Loud only in
              results.
            </p>
          </section>
        </div>
      </div>

      <footer style={footerStyle}>© سلمان سعید</footer>

      <style>{`
        html, body {
          overflow-x: hidden !important; /* prevent horizontal scroll */
        }

        @media (max-width: 768px) {
          /* Mobile header adjustments */
          .legacy-header {
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            padding: 15px 20px !important;
            font-size: 1.8rem !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important; /* center header text */
            box-sizing: border-box !important;
            z-index: 20001 !important;
            text-align: center;
          }

          /* Push content below mobile header and center */
          .content-style-padding {
            margin: 120px auto 30px auto !important;
            max-width: 90%; /* shrink slightly on small screens */
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

export default IntelligenceChapter;
