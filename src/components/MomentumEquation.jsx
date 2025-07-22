import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
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

const MomentumEquation = () => {
  const navigate = useNavigate();

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

        <div className="math-section">
          <p className="equation">
            v(t) = sin(t) · e<sup>-t/10</sup>
          </p>
          <p className="explanation">
            Here, <strong>v(t)</strong> represents the rate of emotionally
            resonant, directed thought — a dynamic cognitive velocity function.
          </p>
          <p className="equation">Mental Momentum = ∫ v(t) dt</p>
          <p className="equation">Stress Load = ∫₀^T |v(t)| dt</p>
          <p className="explanation">
            The absolute integral reflects accumulated resistance or internal
            pressure — the more deviation and tension, the more inertia.
          </p>
        </div>

        <div className="chart-section">
          <ResponsiveContainer width="100%" height={300}>
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
              <Tooltip />
              <Area
                type="monotone"
                dataKey="positiveLoad"
                stroke="#00e676"
                fill="url(#success)"
                name="Success Load"
              />
              <Area
                type="monotone"
                dataKey="negativeLoad"
                stroke="#ff5252"
                fill="url(#stress)"
                name="Stress Load"
              />
              <Line
                type="monotone"
                dataKey="velocity"
                stroke="#00bcd4"
                dot={false}
                name="v(t)"
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
