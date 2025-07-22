import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./MentalMomentum.css";

const principles = [
  {
    title: "Aligned Thought",
    description:
      "Momentum begins when thought, belief, and emotion align with your vision — creating a focused energetic stream.",
    color: "#4cc9f0",
  },
  {
    title: "Cognitive Velocity",
    description:
      "Ideas reinforced by clarity and emotional resonance accelerate, gaining speed like a rolling wave of intent.",
    color: "#ffd700",
  },
  {
    title: "Spiritual Surrender",
    description:
      "Letting go of resistance allows momentum to become inevitable — the unseen forces begin to conspire in your favor.",
    color: "#ff6b6b",
  },
  {
    title: "Neural Entrainment",
    description:
      "Repeated aligned thoughts condition the subconscious, forming neural circuits that self-reinforce the desired state.",
    color: "#8eecf5",
  },
];

const MentalMomentum = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar />

      <header className="fixed-header">Mental Momentum</header>

      <main className="page-content">
        <p className="intro-text">
          Mental Momentum is the compounding force of aligned thought, belief,
          and intention. It is built through sustained clarity, emotional
          resonance, and deep spiritual surrender. When your mental current
          flows without inner contradiction, manifestation becomes a natural
          consequence.
        </p>

        <section className="principles-grid">
          {principles.map(({ title, description, color }) => (
            <article
              key={title}
              className="principle-card"
              style={{ borderColor: color }}
            >
              <h3 className="principle-title" style={{ color }}>
                {title}
              </h3>
              <p className="principle-desc">{description}</p>
            </article>
          ))}
        </section>

        <div className="button-container">
          <button
            className="navigate-btn"
            onClick={() => navigate("/MomentumEquation")}
          >
            View Momentum Equation →
          </button>
        </div>

        <footer className="page-footer">
          © سلمان سعید
          <sup>®</sup>
        </footer>
      </main>

      {/* Mobile responsive CSS inline here for convenience */}
      <style>{`
        @media (max-width: 768px) {
          .fixed-header {
            top: 50px !important; /* below mobile navbar */
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            font-size: 2rem !important;
            padding: 15px 20px !important;
            height: 60px !important;
            border-bottom: 1px solid #333 !important;
            z-index: 1500 !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }
          .page-content {
            margin-left: 0 !important;
            margin-top: 110px !important; /* navbar + header */
            padding: 20px 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MentalMomentum;
