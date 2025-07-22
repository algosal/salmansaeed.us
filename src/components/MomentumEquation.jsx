import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./MomentumEquation.css";

const MomentumEquation = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar />
      <div className="content momentum-equation">
        <h2 className="section-title">Computation of Mental Momentum</h2>

        <p className="intro">
          Mental momentum is the product of aligned thought and persistent
          focus. In this system, we visualize it as a function of cognitive
          velocity over time. The total "load" — stress or success — is the area
          under the curve:
        </p>

        <div className="math-section">
          <p className="equation">Mental Momentum (MM) = ∫ v(t) dt</p>
          <p className="explanation">
            Where <strong>v(t)</strong> is cognitive velocity — the rate of
            directed, emotionally resonant thought over time.
          </p>
          <p className="equation">Stress Load = ∫₀^T |v(t)| dt</p>
          <p className="explanation">
            The absolute value captures mental strain or resistance regardless
            of direction. The longer the resistance, the more cumulative stress
            builds.
          </p>
        </div>

        <div className="math-section">
          <p className="equation">d(MM)/dt = v(t)</p>
          <p className="explanation">
            The rate of change of mental momentum at any point is your current
            velocity of thought. Breaking a toxic loop means disrupting this
            derivative — shifting v(t) intentionally.
          </p>
        </div>

        <div className="guidance">
          <h3>Disrupting or Reinforcing Momentum</h3>
          <ul>
            <li>
              <strong>To Interrupt:</strong> Introduce a thought with opposing
              emotional charge (reset v(t)).
            </li>
            <li>
              <strong>To Reinforce:</strong> Stack aligned thoughts in rhythm
              (entrainment).
            </li>
            <li>
              <strong>To Shift the Curve:</strong> Visualize the new trajectory
              and emotionally commit to the arc — this changes the integral's
              shape.
            </li>
          </ul>
        </div>

        <div className="navigate-button-container">
          <button
            className="navigate-button"
            onClick={() => navigate("/MentalMomentum")}
          >
            ← Back to Mental Momentum
          </button>
        </div>
      </div>
    </div>
  );
};

export default MomentumEquation;
