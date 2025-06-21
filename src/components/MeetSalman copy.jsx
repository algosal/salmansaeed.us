import React from "react";
import { NavLink } from "react-router-dom";

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

const sectionTitle = {
  fontSize: "2rem",
  marginBottom: 16,
  fontWeight: "600",
};

const paragraphStyle = {
  maxWidth: "800px",
  lineHeight: 1.7,
  fontSize: "1.1rem",
  textIndent: "2rem",
  marginBottom: 20,
};

const Legacy = () => {
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
        <NavLink
          to="/legacy"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Legacy
        </NavLink>
      </nav>

      {/* Main Content */}
      <div className="content" style={contentStyle}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
          Legacy of Salman Saeed
        </h1>

        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionTitle}>The Oil Fire and the Child Prophet</h2>
          <p style={paragraphStyle}>
            I was only seven when I saw the fires of Kuwait’s oil wells burning
            on TV. My grandfather watched in silence, worry on his face. I told
            him the answer was simple: cap the wells with iron domes and the
            fire would go out. He smiled and said, “If it were that easy, the
            Americans would’ve done it.”
          </p>
          <p style={paragraphStyle}>
            A week later, the same solution was announced globally. I never
            reminded him. I didn’t need to. I knew I had seen what others
            missed.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionTitle}>Grace in a Hospital Gown</h2>
          <p style={paragraphStyle}>
            After my appendix surgery, an infection reached my liver. I was
            rushed back to the hospital. Even in pain, I brought my economics
            book — I had assignments due. I studied while the IV dripped into
            me. One phlebotomist suggested I sue the hospital, citing religion
            and ethnicity.
          </p>
          <p style={paragraphStyle}>
            I thanked him but declined. Dr. Berman, a Jewish surgeon, saved my
            life. And I was born Muslim. My belief is simple — intent matters
            more than identity. My heart told me he was a good man. That was
            enough.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionTitle}>The Game of Monopoly</h2>
          <p style={paragraphStyle}>
            As a child, I always won at Monopoly. I owned the board, the bank —
            everything. But after every win, I’d say, “Let’s start over,” and
            redistribute everything equally. And still, I would win. Not because
            I hoarded — but because I understood the game. And maybe… because I
            was born to build.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={sectionTitle}>The Promise of a GPA</h2>
          <p style={paragraphStyle}>
            My father once promised that if I got a GPA of 4.0 in Pakistan, he’d
            go speak to the parents of the girl I loved. I didn’t just get a 4.0
            — I got it from the State University of New York. But he broke his
            word, and later, asked me for money.
          </p>
          <p style={paragraphStyle}>
            I said nothing. I gave what was asked. But some men raise sons too
            bright for their own shadows to hold. That’s not my burden. It’s my
            becoming.
          </p>
        </section>

        <section>
          <h2 style={sectionTitle}>A Room No One Could Fill</h2>
          <p style={paragraphStyle}>
            The house I left before rehab? The landlord kept my room empty for a
            year, hoping I’d return. Others told me how often he spoke of me.
            That wasn’t just a room — it was my presence, my energy. When I came
            back, he didn’t just greet me — he exhaled relief.
          </p>
          <p style={paragraphStyle}>
            And that, to me, is legacy. When you leave behind more than a name —
            you leave behind a feeling no one else could replace.
          </p>
        </section>
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
        }
      `}</style>
    </div>
  );
};

export default Legacy;
