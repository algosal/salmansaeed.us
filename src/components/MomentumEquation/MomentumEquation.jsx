import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./MomentumEquation.css";

const data = Array.from({ length: 50 }, (_, i) => {
  const t = i / 5;
  const velocity = Math.sin(t) * Math.exp(-t / 10);
  return {
    t: t.toFixed(1),
    velocity: velocity,
    absVelocity: Math.abs(velocity),
    positiveLoad: velocity > 0 ? velocity : 0,
    negativeLoad: velocity < 0 ? Math.abs(velocity) : 0,
  };
});

const quotes = [
  `“Change your conception of yourself and you will automatically change the world in which you live.” — Neville Goddard`,
  `“Faith is loyalty to the unseen reality.” — Neville Goddard`,
  `“Imagination is the beginning of creation.” — Neville Goddard`,
];

const MomentumEquation = () => {
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content momentum-equation">
        <h2 className="section-title">Computation of Mental Momentum</h2>

        <p className="intro">
          Mental momentum is the compound force of aligned thoughts over time.
          Visualized as an integral, it shows how cognitive velocity builds or
          drains your emotional energy.
        </p>

        <div className="buttons-row">
          <button
            className="toggle-explanation-btn"
            onClick={() => setShowExplanation((prev) => !prev)}
          >
            {showExplanation ? "Graph Only" : "Show Explanation"}
          </button>

          <button className="open-modal-btn" onClick={() => setShowModal(true)}>
            Show Detailed Explanation
          </button>
        </div>

        {showExplanation && (
          <>
            <div className="math-section">
              <div
                className="equation"
                data-tooltip-id="tooltip-v"
                data-tooltip-content="v(t) is the instantaneous rate of emotionally resonant, directed thought."
              >
                <BlockMath math={`v(t) = \\sin(t) \\cdot e^{-t/10}`} />
                <p className="explanation">
                  Here, <strong>v(t)</strong> represents the rate of emotionally
                  resonant, directed thought — a dynamic cognitive velocity
                  function.
                </p>
              </div>
              <Tooltip id="tooltip-v" place="top" effect="solid" />

              <div
                className="equation"
                data-tooltip-id="tooltip-m"
                data-tooltip-content="Integral of velocity over time gives total Mental Momentum."
              >
                <BlockMath
                  math={`\\text{Mental Momentum} = \\int v(t) \\, dt`}
                />

                <p className="explanation">
                  The integral of velocity over time gives the total Mental
                  Momentum.
                </p>
              </div>
              <Tooltip id="tooltip-m" place="top" effect="solid" />

              <div
                className="equation"
                data-tooltip-id="tooltip-s"
                data-tooltip-content="Integral of absolute velocity captures cumulative resistance or tension."
              >
                <BlockMath
                  math={`\\text{Stress Load} = \\int_0^T |v(t)| \\, dt`}
                />
                <p className="explanation">
                  The absolute integral reflects accumulated resistance or
                  internal pressure — the more deviation and tension, the more
                  inertia.
                </p>
              </div>
              <Tooltip id="tooltip-s" place="top" effect="solid" />
            </div>

            <div className="quotes-section">
              {quotes.map((q, i) => (
                <blockquote key={i} className="neville-quote">
                  {q}
                </blockquote>
              ))}
            </div>
          </>
        )}

        {/* Chart Section */}
        <div className="chart-section">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="success" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c853" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00c853" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="stress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff1744" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff1744" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="t" tick={{ fill: "#ccc" }} />
              <YAxis tick={{ fill: "#ccc" }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: "#222", borderRadius: 8 }}
                itemStyle={{ color: "#f8f8f8" }}
              />
              <Area
                type="monotone"
                dataKey="positiveLoad"
                stroke="#00e676"
                fill="url(#success)"
                name="Success Load"
                isAnimationActive={true}
                animationDuration={1200}
              />
              <Area
                type="monotone"
                dataKey="negativeLoad"
                stroke="#ff5252"
                fill="url(#stress)"
                name="Stress Load"
                isAnimationActive={true}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="velocity"
                stroke="#00bcd4"
                dot={false}
                name="v(t)"
                isAnimationActive={true}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="legend-text">
            Cyan line = v(t), Green area = Success, Red area = Stress
          </div>
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

        <footer className="page-footer">
          © سلمان سعید
          <sup>®</sup>
        </footer>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Detailed Explanation</h3>
              <p>
                <strong>v(t):</strong> The instantaneous rate of thought and
                emotional alignment. Positive values represent forward momentum;
                negative values indicate friction or resistance.
              </p>
              <p>
                <strong>Mental Momentum:</strong> The cumulative sum of all
                directed thoughts — how aligned cognition builds energy over
                time.
              </p>
              <p>
                <strong>Stress Load:</strong> Accumulated tension from
                misaligned or resistant thoughts. The greater the deviation, the
                more the inertia.
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
      </div>
    </div>
  );
};

export default MomentumEquation;
