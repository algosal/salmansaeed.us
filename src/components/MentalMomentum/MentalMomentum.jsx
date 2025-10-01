import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import Navbar from "../Navbar";
import "./MentalMomentum.css";
import { principles } from "../../data/MentalMomentumFactors";
// let principles = [
//   {
//     title: "Aligned Thought",
//     description:
//       "Momentum begins when thought, belief, and emotion align with your vision — creating a focused energetic stream.",
//     color: "#4cc9f0",
//   },
//   {
//     title: "Cognitive Velocity",
//     description:
//       "Ideas reinforced by clarity and emotional resonance accelerate, gaining speed like a rolling wave of intent.",
//     color: "#ffd700",
//   },
//   {
//     title: "Spiritual Surrender",
//     description:
//       "Letting go of resistance allows momentum to become inevitable — the unseen forces begin to conspire in your favor.",
//     color: "#ff6b6b",
//   },
//   {
//     title: "Neural Entrainment",
//     description:
//       "Repeated aligned thoughts condition the subconscious, forming neural circuits that self-reinforce the desired state.",
//     color: "#8eecf5",
//   },
//   {
//     title: "Focused Intention",
//     description:
//       "Clear intention directs mental energy with precision, reducing internal resistance and amplifying momentum.",
//     color: "#ffb300",
//   },
//   {
//     title: "Emotional Resonance",
//     description:
//       "The alignment of emotion with thought strengthens neural pathways, reinforcing the momentum trajectory.",
//     color: "#7c4dff",
//   },
//   {
//     title: "Subconscious Conditioning",
//     description:
//       "Repeated visualization and belief imprint on the subconscious, automating aligned behaviors and responses.",
//     color: "#00bfa5",
//   },
//   {
//     title: "Persistence Over Time",
//     description:
//       "Sustained application of aligned thought, emotion, and belief ensures momentum compounds rather than dissipates.",
//     color: "#d50000",
//   },
//   {
//     title: "Adaptive Awareness",
//     description:
//       "Being conscious of shifts in thought or emotion allows for corrective alignment, maintaining optimal momentum.",
//     color: "#2962ff",
//   },
//   {
//     title: "Integration of Action",
//     description:
//       "Physical action aligned with mental momentum reinforces the force, converting potential into manifested outcomes.",
//     color: "#ff4081",
//   },
//   {
//     title: "Energetic Harmony",
//     description:
//       "When mental, emotional, and physical energies are harmonized, resistance is minimized, and momentum flows effortlessly.",
//     color: "#00e676",
//   },
//   {
//     title: "Clarity of Vision",
//     description:
//       "A vivid and precise mental image of the desired outcome gives direction and focus, amplifying the momentum.",
//     color: "#ffc107",
//   },
//   {
//     title: "Reflective Feedback",
//     description:
//       "Observing results and recalibrating beliefs, emotions, and thoughts ensures continuous alignment and growth.",
//     color: "#8d6e63",
//   },
//   {
//     title: "Energetic Discipline",
//     description:
//       "Maintaining consistent mental and emotional discipline strengthens the force over time, creating unstoppable momentum.",
//     color: "#ff6d00",
//   },
// ];

const MentalMomentum = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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

        {/* Momentum Equations Section */}
        <section className="momentum-equations">
          <h2>Momentum Equations</h2>
          <p>Key formulas describing Mental Momentum dynamics:</p>

          <BlockMath
            math={`M(t) = \\int_0^t F(\\text{aligned thoughts}) \\, dt`}
          />
          <BlockMath
            math={`F(t) = \\text{Thought}(t) \\cdot \\text{Emotion}(t) \\cdot \\text{Belief}(t)`}
          />
          <BlockMath math={`\\text{Velocity of Momentum} = \\frac{dM}{dt}`} />

          <button className="open-modal-btn" onClick={() => setShowModal(true)}>
            Show Detailed Explanation
          </button>
        </section>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Detailed Explanation of Mental Momentum</h3>

              <p>
                <BlockMath
                  math={`M(t) = \\int_0^t F(\\text{aligned thoughts}) \\, dt`}
                />
                <br />
                <em>
                  Mental Momentum (M) represents the cumulative energetic force
                  of your aligned thoughts, beliefs, and emotions. It is the
                  unseen current that drives manifestation — the more consistent
                  and focused the alignment, the stronger and faster the
                  momentum flows.
                </em>
              </p>

              <p>
                <BlockMath
                  math={`F(t) = \\text{Thought}(t) \\cdot \\text{Emotion}(t) \\cdot \\text{Belief}(t)`}
                />
                <br />
                <em>
                  F(t) is the instantaneous force generating momentum. It is a
                  multiplicative synergy:
                </em>
                <ul>
                  <li>
                    <strong>Thought(t):</strong> The clarity and precision of
                    your conscious focus.
                  </li>
                  <li>
                    <strong>Emotion(t):</strong> The intensity and resonance of
                    feeling behind the thought.
                  </li>
                  <li>
                    <strong>Belief(t):</strong> The deep subconscious conviction
                    and faith sustaining it.
                  </li>
                </ul>
                <em>
                  Together, these create a force that transcends mere effort —
                  it channels energy towards inevitable manifestation.
                </em>
              </p>

              <p>
                <BlockMath
                  math={`\\frac{dM}{dt} = \\text{Velocity of Momentum}`}
                />
                <br />
                <em>
                  The derivative reflects the instantaneous velocity of
                  momentum. A high velocity indicates powerful alignment — your
                  energy flows unimpeded, accelerating the manifestation of your
                  intentions. Misalignment slows the flow, reducing efficiency.
                </em>
              </p>

              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default MentalMomentum;
