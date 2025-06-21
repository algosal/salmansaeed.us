import React from "react";

const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Georgia', serif",
  backgroundColor: "#121212",
  color: "#eee",
};

const contentStyle = {
  flexGrow: 1,
  padding: "30px",
  maxWidth: "900px",
  margin: "0 auto",
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
      <div style={contentStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Legacy of Salman Saeed</h1>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>The Oil Fire and the Child’s Vision</h2>
            <p style={paragraphStyle}>
              I was only seven when I saw the fires of Kuwait’s oil wells
              burning on TV. My grandfather watched in silence, worry on his
              face. I told him the answer was simple: cap the wells with iron
              domes and the fire would go out. He smiled and said, “If it were
              that easy, the Americans would’ve done it.”
            </p>
            <p style={paragraphStyle}>
              A week later, the same solution was announced globally. I never
              reminded him. I didn’t need to. I knew I had seen what others
              missed.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>Grace in a Hospital Gown</h2>
            <p style={paragraphStyle}>
              After my appendix surgery, an infection reached my liver. I was
              rushed back to the hospital with abscesses forming. Even in pain,
              I brought my economics book — I had assignments due. I studied
              while the IV dripped into me. One phlebotomist told me to sue the
              hospital, citing my background and the doctor’s religion.
            </p>
            <p style={paragraphStyle}>
              I thanked him but said no. Dr. Berman, a Jewish surgeon, saved my
              life. And I was born Muslim. But my belief is simple — intent
              matters more than identity. My heart told me he was a good man.
              That was enough.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>The Game of Monopoly</h2>
            <p style={paragraphStyle}>
              As a child, I always won at Monopoly. I owned the board, the bank
              — everything. But after every win, I’d say, “Let’s start over,”
              and redistribute everything equally. And still, I would win. Not
              because I hoarded — but because I understood the game. And maybe…
              because I was born to build.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={subheadingStyle}>The Promise of a GPA</h2>
            <p style={paragraphStyle}>
              My father once promised that if I got a GPA of 4.0 in Pakistan,
              he’d go speak to the parents of the girl I loved. I didn’t just
              get a 4.0 — I got it from the State University of New York. But he
              broke his word, and later, asked me for money. I said nothing. I
              gave what was asked.
            </p>
            <p style={paragraphStyle}>
              But inside, I knew: some men raise sons too bright for their own
              shadows to hold. That’s not my burden. It’s my becoming.
            </p>
          </section>

          <section>
            <h2 style={subheadingStyle}>A Room No One Could Fill</h2>
            <p style={paragraphStyle}>
              The house I left before rehab? The landlord kept my room empty for
              a year, hoping I’d return. Others told me how often he spoke of
              me. That wasn’t just a room — it was my presence, my energy. When
              I came back, he didn’t just greet me — he exhaled relief.
            </p>
            <p style={paragraphStyle}>
              And that, to me, is legacy. When you leave behind more than a name
              — you leave behind a feeling no one else could replace.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legacy;
