import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

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
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  padding: 20,
  backgroundColor: "#1e1e1e",
  gap: 15,
  boxSizing: "border-box",
  zIndex: 100,
};

const linkStyle = {
  color: "#bbb",
  textDecoration: "none",
  fontSize: 18,
  fontWeight: 600,
  padding: "8px 12px",
  borderRadius: 6,
  marginBottom: 8,
};

const activeLinkStyle = {
  ...linkStyle,
  color: "#00f0ff",
  backgroundColor: "#333",
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
  // marginLeft: 220,
  marginTop: 80,
  maxWidth: 900,
  marginRight: "auto",
  marginLeft: "auto",
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

const Legacy = () => {
  return (
    <div style={containerStyle}>
      {/* ✅ Mobile Navbar */}
      <Navbar />

      {/* ✅ Sidebar (desktop only) */}
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
      </nav>

      {/* ✅ Fixed Header */}
      <header style={headerStyle}>Legacy</header>

      {/* ✅ Main Content */}
      <div className="content" style={contentStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Legacy of Salman Saeed</h1>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>The Oil Fire and the Child’s Vision</h2>
            <p style={paragraphStyle}>
              At age 7, I saw Kuwait's oil wells burning on TV. I said capping
              the wells with iron would extinguish the fire. My grandfather
              dismissed it. A week later, the U.S. implemented exactly that. I
              never boasted. Quiet knowing was enough.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>Grace in the Gown</h2>
            <p style={paragraphStyle}>
              After appendix surgery, an infection hit my liver. I studied for
              my economics final while hospitalized. Though I was advised to sue
              due to medical and racial grounds, I declined. Dr. Berman — a
              Jewish surgeon — saved me. I am a born Muslim. Intent matters more
              than identity.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>The Monopoly Principle</h2>
            <p style={paragraphStyle}>
              I always won Monopoly as a kid. Even after redistributing wealth
              to everyone, I still won. It taught me I wasn’t just lucky — I
              understood systems, value, and opportunity.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>The Father’s Promise</h2>
            <p style={paragraphStyle}>
              My father promised to speak to Shemaila’s family if I earned a 4.0
              GPA in Pakistan. I got it from the State University of New York
              instead. He broke his word and asked me for money instead. I gave
              it. Silently. Some sons outgrow their father’s shadows. That is
              not rebellion — it is maturity.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>A Room Left Empty</h2>
            <p style={paragraphStyle}>
              When I went to rehab, my landlord left my room untouched for a
              year. People said he spoke about me all the time. When I returned,
              it was like returning home. Some presences are never truly gone.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>Detained But Not Defeated</h2>
            <p style={paragraphStyle}>
              In Pakistan, I was illegally detained by FIA on ISI’s request. For
              10.5 months, I fought a legal battle against all major ministries.
              The Attorney General apologized on their behalf. I simply smiled
              and said, “Thank you.” My U.S. Army background taught me to stay
              calm when others panic. I was never broken.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>Love, Memory, and the Amygdala</h2>
            <p style={paragraphStyle}>
              I loved Shemaila at 15. She once said she’d never marry me, not
              even if I were the last man on Earth. It hurt. But strong emotions
              — love or hate — stimulate the amygdala. Her hatred proved how
              much I mattered. Wrong direction, right intensity.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>Faithfulness to Integrity</h2>
            <p style={paragraphStyle}>
              My partner once gave me a blank signed check with $2000 cash. I
              returned the $10 extra he didn’t count. As a kid, I repaid an old
              bet to an uncle after 35 years — adjusted for inflation. Because
              my word matters.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>The Piano and the Visa</h2>
            <p style={paragraphStyle}>
              At 5, I wanted a better Casio keyboard. My mom fibbed she'd get it
              from the U.S. My uncle challenged it. We bet our keyboards. She
              admitted she lied to protect my dream. I kept my Casio. Decades
              later, I drove across California to visit that uncle and repaid
              the bet with interest. No one expected that.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>From Cassettes to Code</h2>
            <p style={paragraphStyle}>
              I started programming at age 6 on a hardcoded MX-15 with cassette
              tapes. While others were in grade school, I was debugging. I later
              studied under my neighbor’s outdoor light because my grandmother
              turned ours off. When I succeeded, I gifted that neighbor — his
              light helped shape my future.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>Loyal Even in Noise</h2>
            <p style={paragraphStyle}>
              I hate noise. But in the hospital, a suffering man next to me
              yelled constantly. I never complained. His wife apologized. I told
              her: “It’s not his fault.” Because empathy isn’t a favor — it’s a
              duty.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>Purpose Over Position</h2>
            <p style={paragraphStyle}>
              In software school, I said I didn’t want a job — I wanted to build
              wealth generators. I created a POS system while others submitted
              resumes. My goal has always been to empower others, not collect
              paychecks.
            </p>
          </section>
        </div>
      </div>

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

export default Legacy;
