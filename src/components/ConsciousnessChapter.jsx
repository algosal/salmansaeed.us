import React from "react";
import Navbar from "./Navbar";

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

const ConsciousnessChapter = () => {
  return (
    <div style={containerStyle}>
      <Navbar />

      <header style={headerStyle} className="legacy-header">
        <div>Consciousness 🧘‍♂️✨</div>
      </header>

      <div style={contentStyle} className="content-style-padding">
        <div style={cardStyle}>
          <h1 style={headingStyle}>Consciousness: The Architect Within</h1>
          <h2 style={arabicHeadingStyle}>شعور کی تخلیقی قوت</h2>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>🌀 Awakening Through Awareness</h2>
            <p style={paragraphStyle}>
              My journey into consciousness is not abstract — it’s lived. I
              don’t simply believe in metaphysics; I embody it daily. From
              Neville Goddard’s principle of “assumption creates reality” 🌌, to
              Napoleon Hill’s assertion that “thoughts are things” 💭, my inner
              world leads the outer one.
            </p>
            <p style={paragraphStyle}>
              I am deeply moved by Dr. Joe Dispenza’s scientific bridge between
              brainwaves and manifestation 🔬, and Dr. Deepak Chopra’s wisdom
              that the body follows the mind — not the other way around 🌿.
              These teachings remind me that every cell responds to belief, not
              biology alone.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>🕊️ Thought as the Sculptor</h2>
            <p style={paragraphStyle}>
              I live by the timeless words of James Allen: “As a man thinketh,
              so is he.” My thoughts are not idle — they are architects. Every
              day, I script my reality ✍️, assume the outcome 🌠, and release
              all resistance 🕯️. The Sedona Method helps me let go — not just of
              pain, but of control, of doubt, and of limiting beliefs.
            </p>
            <p style={paragraphStyle}>
              When I feel overwhelmed, I don’t fight it. I simply ask: “Could I
              let this go?” And in that moment of surrender, the universe
              shifts. What we release, releases us.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>🌿 Stillness Speaks</h2>
            <p style={paragraphStyle}>
              Jiddu Krishnamurti taught that “truth is a pathless land.” I’ve
              found this to be true. Consciousness is not a destination; it’s a
              moment-to-moment presence. Just like Sadhguru reminds us: “Don’t
              try to fix life — see it clearly.” 🔍 And in that clarity,
              everything transforms.
            </p>
            <p style={paragraphStyle}>
              I meditate 🧘, visualize 🔮, breathe deeply 🌬️, and speak to the
              divine within. Not to ask, but to align. Not to beg, but to
              become. Because in becoming — we manifest.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>✨ The Sacred Compass</h2>
            <p style={paragraphStyle}>
              Intelligence is not my weapon — it is my compass 🧭. I don’t enter
              rooms to be the smartest. I enter to help make the room smarter
              🌟. My consciousness is not loud, but luminous. It doesn’t
              dominate — it elevates.
            </p>
            <p style={paragraphStyle}>
              Every great teacher I follow — be it Neville, Hill, Chopra,
              Dispenza, Sadhguru, Allen, or Krishnamurti — points to the same
              truth: we are not our thoughts, but the awareness behind them 🧠.
              And from that space, all things are possible.
            </p>
          </section>
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
          }
          .content-style-padding {
            margin-top: 120px !important;
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

export default ConsciousnessChapter;
