import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/DisregardedClassifier.css";

// Deadly sins symbols (simple unicode icons or emojis)
const deadlySinsIcons = {
  Pride: "👑",
  Sloth: "🦥",
  Greed: "💰",
  Wrath: "🔥",
  Envy: "👀",
};

const criteria = [
  {
    id: 1,
    text: "The emotional loop is complete — no need for apology, revenge, or reconciliation.",
    points: 1,
    short: "Loop Closed",
    sin: "Pride",
  },
  {
    id: 2,
    text: "Their name, image, or memory no longer causes a physical reaction.",
    points: 1,
    short: "No Reaction",
    sin: "Sloth",
  },
  {
    id: 3,
    text: "The connection was mostly one-way — draining or transactional.",
    points: 1,
    short: "One-way Drain",
    sin: "Greed",
  },
  {
    id: 4,
    text: "They play no role in your higher self / ideal life vision.",
    points: 1,
    short: "No Role Vision",
    sin: "Sloth",
  },
  {
    id: 5,
    text: "They’ve become a symbol or archetype in your mind — not a person.",
    points: 1,
    short: "Symbolized Ego",
    sin: "Pride",
  },
  {
    id: 6,
    text: "You feel you’ve fully learned the lesson they were meant to teach.",
    points: 1,
    short: "Learned Lesson",
    sin: "Pride",
  },
  {
    id: 7,
    text: "You no longer check their social media or wonder about them.",
    points: 1,
    short: "No Curiosity",
    sin: "Sloth",
  },
  {
    id: 8,
    text: "If they reached out now, you’d feel no urgency to respond.",
    points: 1,
    short: "No Urgency Reply",
    sin: "Wrath",
  },
  {
    id: 9,
    text: "They show a pattern of low respect, poor character, or manipulative attitude.",
    points: 2,
    short: "Poor Respect",
    sin: "Wrath",
  },
  {
    id: 10,
    text: "Their presence lowered your self-worth, delayed your purpose, or confused your moral compass.",
    points: 2,
    short: "Lowered Self-Worth",
    sin: "Envy",
  },
  {
    id: 11,
    text: "They consistently disrespect your boundaries or values.",
    points: 2,
    short: "Disrespects Bound.",
    sin: "Wrath",
  },
  {
    id: 12,
    text: "Their behavior toward you was often passive-aggressive, dismissive, or controlling.",
    points: 2,
    short: "Passive-Aggressive",
    sin: "Wrath",
  },
  {
    id: 13,
    text: "They caused repeated emotional chaos or drama without accountability.",
    points: 2,
    short: "Emotional Chaos",
    sin: "Wrath",
  },
  {
    id: 14,
    text: "You no longer feel curiosity, longing, or nostalgia toward them.",
    points: 1,
    short: "No Nostalgia",
    sin: "Sloth",
  },
  {
    id: 15,
    text: "Their involvement obstructed your spiritual or personal growth.",
    points: 2,
    short: "Obstructed Growth",
    sin: "Envy",
  },
  {
    id: 16,
    text: "You feel mentally and emotionally free when thinking about them, not triggered.",
    points: 1,
    short: "Mentally Free",
    sin: "Pride",
  },
];

const POINTS_THRESHOLD = 6;

const colorGradient = ["#ffcc00", "#ffd633", "#00ffcc"]; // Gold to cyan

// Helper to interpolate color between two colors by t [0-1]
const interpolateColor = (color1, color2, t) => {
  const c1 = color1.match(/\w\w/g).map((x) => parseInt(x, 16));
  const c2 = color2.match(/\w\w/g).map((x) => parseInt(x, 16));
  const c = c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

const Graph = ({ selectedCriteria }) => {
  const width = 700;
  const height = 220;
  const padding = 50;

  // Selected criteria data sorted
  const data = criteria
    .filter((c) => selectedCriteria.includes(c.id))
    .sort((a, b) => a.id - b.id);

  if (data.length === 0) return null;

  const maxPoints = 2;
  const barWidth = (width - padding * 2) / data.length - 10;

  // Total integral scaling factor, scale a bit higher than threshold for visual breathing room
  const integralMax = POINTS_THRESHOLD * 2;

  return (
    <svg
      width={width}
      height={height + padding}
      style={{
        background: "#121212",
        borderRadius: 8,
        marginTop: "2rem",
        boxShadow: "0 0 10px #ffd633aa",
      }}
    >
      {/* Axes */}
      <line
        x1={padding}
        y1={height}
        x2={width - padding}
        y2={height}
        stroke="#ffcc00"
        strokeWidth="2"
      />
      <line
        x1={padding}
        y1={0}
        x2={padding}
        y2={height}
        stroke="#ffcc00"
        strokeWidth="2"
      />

      {/* Bars */}
      {data.map((c, i) => {
        const barHeight = (c.points / maxPoints) * (height - 40);
        const x = padding + i * (barWidth + 10);
        const y = height - barHeight;

        // Color interpolation for bars based on index to give gradient effect
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
            {/* Bar */}
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={fillColor}
              rx="5"
              ry="5"
            />
            {/* Bar label - short name */}
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
            {/* Sin icon */}
            <text
              x={x + barWidth / 2}
              y={height + 35}
              fill="#ff9933"
              fontSize="14"
              textAnchor="middle"
              pointerEvents="none"
              style={{
                userSelect: "none",
                fontWeight: "700",
                fontStyle: "italic",
              }}
              aria-label={`Related sin: ${c.sin}`}
            >
              {deadlySinsIcons[c.sin]}
            </text>
            {/* Points above bar */}
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
          </g>
        );
      })}

      {/* Integral polyline */}
      <polyline
        fill="none"
        stroke="#00ffcc"
        strokeWidth="3"
        points={data
          .map((c, i) => {
            const x = padding + i * (barWidth + 10) + barWidth / 2;
            const cumulativePoints = data
              .slice(0, i + 1)
              .reduce((sum, item) => sum + item.points, 0);
            const y = height - (cumulativePoints / integralMax) * (height - 50);
            return `${x},${y}`;
          })
          .join(" ")}
      />

      {/* Total points text */}
      <text
        x={width - padding}
        y={padding / 2}
        fill="#00ffcc"
        fontSize="20"
        fontWeight="700"
        textAnchor="end"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        Total: {data.reduce((sum, c) => sum + c.points, 0)}
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
    setShowGraph(false); // hide graph on change to refresh visualization
  };

  const totalPoints = selected.reduce((sum, id) => {
    const crit = criteria.find((c) => c.id === id);
    return crit ? sum + crit.points : sum;
  }, 0);

  const isDisregarded = totalPoints >= POINTS_THRESHOLD;

  const handleSave = () => {
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
          <label
            key={c.id}
            className="dec-criteria-item"
            title={`${c.text} (Points: ${c.points}, Sin: ${c.sin} ${
              deadlySinsIcons[c.sin]
            })`}
          >
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

      {showGraph && <Graph selectedCriteria={selected} />}

      <div className="dec-result-block">
        <h2>Result:</h2>
        {name ? (
          isDisregarded ? (
            <div className="dec-result passed">
              ✅ <strong>{name}</strong> qualifies as a{" "}
              <Link to="/DisregardedEntities" className="dec-result-link">
                <u>Disregarded Entity</u>
              </Link>
              .
              <blockquote>
                “You once mattered. Now you are mist. I honor your role. I
                release your hold.”
              </blockquote>
            </div>
          ) : (
            <div className="dec-result failed">
              ❌ <strong>{name}</strong> does{" "}
              <Link to="/DisregardedEntities" className="dec-result-link">
                <u>not yet</u>
              </Link>{" "}
              meet the threshold for being Disregarded.
              <p>Further healing or clarity may still be in process.</p>
            </div>
          )
        ) : (
          <p>Enter a name and check applicable criteria above.</p>
        )}
      </div>

      <div className="dec-buttons-container">
        <button onClick={handleSave} className="dec-button">
          Save & Show Graph
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
