import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  // LineChart,
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

        <button
          className="toggle-explanation-btn"
          onClick={() => setShowExplanation((prev) => !prev)}
        >
          {showExplanation ? "Graph Only" : "Show Explanation"}
        </button>

        {showExplanation && (
          <>
            <div className="math-section">
              <p
                className="equation"
                data-tooltip-id="tooltip-vt"
                data-tooltip-content="v(t) is the rate of emotionally resonant, directed thought (cognitive velocity)."
              >
                v(t) = sin(t) · e<sup>-t/10</sup>
              </p>
              <Tooltip id="tooltip-vt" place="top" effect="solid" />

              <p className="explanation">
                Here, <strong>v(t)</strong> represents the rate of emotionally
                resonant, directed thought — a dynamic cognitive velocity
                function.
              </p>

              <p
                className="equation"
                data-tooltip-id="tooltip-mm"
                data-tooltip-content="Integral of velocity over time gives total Mental Momentum."
              >
                Mental Momentum = ∫ v(t) dt
              </p>
              <Tooltip id="tooltip-mm" place="top" effect="solid" />

              <p
                className="equation"
                data-tooltip-id="tooltip-stress"
                data-tooltip-content="Integral of absolute velocity captures cumulative resistance or tension."
              >
                Stress Load = ∫₀<sup>T</sup> |v(t)| dt
              </p>
              <Tooltip id="tooltip-stress" place="top" effect="solid" />

              <p className="explanation">
                The absolute integral reflects accumulated resistance or
                internal pressure — the more deviation and tension, the more
                inertia.
              </p>
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
      </div>
    </div>
  );
};

export default MomentumEquation;
