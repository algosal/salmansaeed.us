// src/components/DisregardedClassifier.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DisregardedClassifier.css";
import criteria from "../data/criteria";

const POINTS_THRESHOLD = 6;

const deadlySinsIcons = {
  Pride: "👑",
  Greed: "💰",
  Wrath: "🔥",
  Envy: "👀",
  Lust: "❤️",
  Gluttony: "🍽️",
  Sloth: "😴",
};

const interpolateColor = (color1, color2, factor) => {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `rgb(${r},${g},${b})`;
};

const Graph = ({ data }) => {
  const width = 700;
  const height = 300;
  const padding = 50;
  const barWidth = (width - padding * 2) / data.length - 10;

  const maxPoints = Math.max(...data.map((d) => d.points));
  const integral = data.reduce((sum, d) => sum + d.points, 0);
  const colorGradient = ["#ffcc00", "#ffd633", "#00cc66"];

  return (
    <svg width={width} height={height + 60} className="dec-graph-svg">
      <line
        x1={padding}
        y1={height}
        x2={width - padding}
        y2={height}
        stroke="#ffd633"
        strokeWidth="2"
      />

      {data.map((c, i) => {
        const barHeight = (c.points / maxPoints) * (height - 40);
        const x = padding + i * (barWidth + 10);
        const y = height - barHeight;
        const t = i / (data.length - 1 || 1);
        const fillColor = interpolateColor(
          colorGradient[0],
          colorGradient[2],
          t
        );

        return (
          <g key={c.id} className="dec-graph-bar-group">
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={fillColor}
              rx="5"
              ry="5"
            />
            <text x={x + barWidth / 2} y={y - 8} className="dec-bar-points">
              {c.points}
            </text>
            <text
              x={x + barWidth / 2}
              y={height + 20}
              className="dec-bar-short"
            >
              {c.shortName}
            </text>
            <text
              x={x + barWidth / 2}
              y={y + barHeight / 2}
              className="dec-bar-sin"
              dominantBaseline="middle"
            >
              {deadlySinsIcons[c.sin]} {c.sin}
            </text>
          </g>
        );
      })}

      <text x={width / 2} y={height + 50} className="dec-integral-label">
        Total Score (Integral): {integral}
      </text>
    </svg>
  );
};

const DisregardedClassifier = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalPoints = selected.reduce((sum, id) => {
    const crit = criteria.find((c) => c.id === id);
    return crit ? sum + crit.points : sum;
  }, 0);

  const isDisregarded = totalPoints >= POINTS_THRESHOLD;

  const handleSave = () => {
    if (!name) return alert("Please enter a name.");
    if (selected.length === 0) return alert("Select at least one criterion.");
    setShowGraph(true);
  };

  return (
    <div className="dec-page-container">
      <h1 className="dec-section-title">Disregarded Entity Classifier</h1>

      <div className="dec-input-block">
        <label htmlFor="nameInput">Enter their name:</label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Samra or Jibran"
        />
      </div>

      <div className="dec-criteria-list">
        {criteria.map((c) => (
          <label key={c.id} className="dec-criteria-item">
            <input
              type="checkbox"
              checked={selected.includes(c.id)}
              onChange={() => handleToggle(c.id)}
            />
            <span>
              {c.text} <em>(Points: {c.points})</em>
            </span>
          </label>
        ))}
      </div>

      <div className="dec-result-block">
        <h2>Result:</h2>
        {name ? (
          isDisregarded ? (
            <div className="dec-result passed">
              ✅ <strong>{name}</strong> qualifies as a{" "}
              <em>Disregarded Entity</em>.
              <blockquote>
                “You once mattered. Now you are mist. I honor your role. I
                release your hold.”
              </blockquote>
            </div>
          ) : (
            <div className="dec-result failed">
              ❌ <strong>{name}</strong> does not yet meet the threshold.
              <p>Further clarity or healing may be in process.</p>
            </div>
          )
        ) : (
          <p>Please enter a name and select criteria.</p>
        )}
      </div>

      {showGraph && (
        <div className="dec-graph-container">
          <h2>Criteria Graph</h2>
          <Graph data={criteria.filter((c) => selected.includes(c.id))} />
        </div>
      )}

      <div className="dec-buttons-container">
        <button onClick={handleSave} className="dec-button dec-save-button">
          Save
        </button>
        <button
          onClick={() => navigate("/DisregardedEntities")}
          className="dec-button dec-back-button"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default DisregardedClassifier;
