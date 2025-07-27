import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DisregardedClassifier.css";

const criteria = [
  {
    id: 1,
    text: "The emotional loop is complete — no need for apology, revenge, or reconciliation.",
    points: 1,
    short: "Loop",
    sin: "Pride",
  },
  {
    id: 2,
    text: "Their name, image, or memory no longer causes a physical reaction.",
    points: 1,
    short: "No React",
    sin: "Sloth",
  },
  {
    id: 3,
    text: "The connection was mostly one-way — draining or transactional.",
    points: 1,
    short: "One-Way",
    sin: "Greed",
  },
  {
    id: 4,
    text: "They play no role in your higher self / ideal life vision.",
    points: 1,
    short: "No Role",
    sin: "Envy",
  },
  {
    id: 5,
    text: "They’ve become a symbol or archetype in your mind — not a person.",
    points: 1,
    short: "Symbol",
    sin: "Wrath",
  },
  {
    id: 6,
    text: "You feel you’ve fully learned the lesson they were meant to teach.",
    points: 1,
    short: "Lesson",
    sin: "Pride",
  },
  {
    id: 7,
    text: "You no longer check their social media or wonder about them.",
    points: 1,
    short: "No Check",
    sin: "Sloth",
  },
  {
    id: 8,
    text: "If they reached out now, you’d feel no urgency to respond.",
    points: 1,
    short: "No Urgency",
    sin: "Sloth",
  },
  {
    id: 9,
    text: "They show a pattern of low respect, poor character, or manipulative attitude.",
    points: 2,
    short: "Disrespect",
    sin: "Wrath",
  },
  {
    id: 10,
    text: "Their presence lowered your self-worth, delayed your purpose, or confused your moral compass.",
    points: 2,
    short: "Low Worth",
    sin: "Sloth",
  },
  {
    id: 11,
    text: "They consistently disrespect your boundaries or values.",
    points: 2,
    short: "Boundary Break",
    sin: "Wrath",
  },
  {
    id: 12,
    text: "Their behavior toward you was often passive-aggressive, dismissive, or controlling.",
    points: 2,
    short: "Toxic",
    sin: "Greed",
  },
  {
    id: 13,
    text: "They caused repeated emotional chaos or drama without accountability.",
    points: 2,
    short: "Drama",
    sin: "Wrath",
  },
  {
    id: 14,
    text: "You no longer feel curiosity, longing, or nostalgia toward them.",
    points: 1,
    short: "No Longing",
    sin: "Sloth",
  },
  {
    id: 15,
    text: "Their involvement obstructed your spiritual or personal growth.",
    points: 2,
    short: "Blocked Growth",
    sin: "Envy",
  },
  {
    id: 16,
    text: "You feel mentally and emotionally free when thinking about them, not triggered.",
    points: 1,
    short: "Freedom",
    sin: "Sloth",
  },
];

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
    <svg
      width={width}
      height={height + 60}
      role="img"
      aria-label="Disregarded Entity Criteria Points Graph"
      style={{ backgroundColor: "#121212", borderRadius: "8px" }}
    >
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
          <g
            key={c.id}
            className="dec-graph-bar-group"
            title={`${c.short} (${c.points} pts)\nRelated Sin: ${c.sin} ${
              deadlySinsIcons[c.sin]
            }`}
          >
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={fillColor}
              rx="5"
              ry="5"
            />
            <text
              x={x + barWidth / 2}
              y={y - 8}
              fill={fillColor}
              fontSize="14"
              fontWeight="700"
              textAnchor="middle"
              pointerEvents="none"
              style={{ userSelect: "none" }}
            >
              {c.points}
            </text>
            <text
              x={x + barWidth / 2}
              y={height + 20}
              fill="#ffd633"
              fontSize="11"
              textAnchor="middle"
              pointerEvents="none"
              style={{ userSelect: "none", fontWeight: "600" }}
            >
              {c.short}
            </text>
            <text
              x={x + barWidth / 2}
              y={y + barHeight / 2 + 5}
              fill="rgba(255, 255, 255, 0.85)"
              fontSize={barHeight > 30 ? 16 : 12}
              fontWeight="700"
              textAnchor="middle"
              pointerEvents="none"
              style={{
                userSelect: "none",
                fontStyle: "italic",
                textShadow: "0 0 3px #000000aa",
              }}
            >
              {deadlySinsIcons[c.sin]} {c.sin}
            </text>
          </g>
        );
      })}

      <text
        x={width / 2}
        y={height + 50}
        fill="#ffd633"
        fontSize="20"
        fontWeight="700"
        textAnchor="middle"
      >
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
    if (!name) {
      alert("Please enter a name first.");
      return;
    }
    if (selected.length === 0) {
      alert("Please select at least one criterion.");
      return;
    }
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
          placeholder="e.g. Sumbal or Shemaila"
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
              ✅ <strong>{name}</strong>{" "}
              <a
                href="/DisregardedEntities"
                style={{ color: "#ffd633", textDecoration: "underline" }}
              >
                qualifies as a Disregarded Entity
              </a>
              .
              <blockquote>
                “You once mattered. Now you are mist. I honor your role. I
                release your hold.”
              </blockquote>
            </div>
          ) : (
            <div className="dec-result failed">
              ❌ <strong>{name}</strong>{" "}
              <a
                href="/DisregardedEntities"
                style={{ color: "#ffd633", textDecoration: "underline" }}
              >
                does not yet meet the threshold for being Disregarded
              </a>
              .<p>Further healing or clarity may still be in process.</p>
            </div>
          )
        ) : (
          <p>Enter a name and check applicable criteria above.</p>
        )}
      </div>

      {showGraph && (
        <div className="dec-graph-container">
          <h2>Criteria Points Graph</h2>
          <Graph data={criteria.filter((c) => selected.includes(c.id))} />
        </div>
      )}

      <div
        className="dec-buttons-container"
        style={{ justifyContent: "flex-end" }}
      >
        <button onClick={handleSave} className="dec-button dec-save-button">
          Save
        </button>
        <button
          onClick={() => navigate("/DisregardedEntities")}
          className="dec-button dec-back-button"
        >
          ← Back to Disregarded Entities
        </button>
      </div>
    </div>
  );
};

export default DisregardedClassifier;
