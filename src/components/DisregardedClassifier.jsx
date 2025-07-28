import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import criteria from "../data/criteria";
import "../styles/DisregardedClassifier.css";

const DisregardedClassifier = () => {
  const [scores, setScores] = useState({});
  const [saved, setSaved] = useState(false);
  const [personName, setPersonName] = useState("");
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();

  const maxPossiblePoints = criteria
    .filter((c) => c.points > 0)
    .reduce((acc, c) => acc + c.points, 0);

  const flaggedThreshold = Math.round(maxPossiblePoints * 0.25);
  const seriousThreshold = Math.round(maxPossiblePoints * 0.35);

  const handleChange = (id, value) => {
    setScores({ ...scores, [id]: value ? 1 : 0 });
    setSaved(false);
  };

  const handleSave = () => {
    if (!personName.trim()) {
      setNameError(true);
      setSaved(false);
      return;
    }
    setNameError(false);
    setSaved(true);
  };

  const totalPoints = criteria.reduce((acc, c) => {
    return acc + (scores[c.id] ? c.points : 0);
  }, 0);

  let classification = "Not flagged";
  if (totalPoints >= seriousThreshold) {
    classification = "Seriously flagged";
  } else if (totalPoints >= flaggedThreshold) {
    classification = "Flagged";
  }

  const sinMap = {};
  criteria.forEach((c) => {
    if (scores[c.id]) {
      sinMap[c.sin] = sinMap[c.sin] || [];
      sinMap[c.sin].push(c);
    }
  });

  const percentage = ((totalPoints / maxPossiblePoints) * 100).toFixed(1);
  // Calculate demand (Disregard Points)
  const disregardPoints = criteria.reduce(
    (acc, c) => acc + (scores[c.id] && c.points > 0 ? c.points : 0),
    0
  );

  // Calculate redemption (Virtue Points)
  const redemptionPoints = Math.abs(
    criteria.reduce(
      (acc, c) => acc + (scores[c.id] && c.points < 0 ? c.points : 0),
      0
    )
  );

  const demand = (disregardPoints / maxPossiblePoints) * 100;
  const supply = (redemptionPoints / maxPossiblePoints) * 100;

  // Deadweight Loss or Surplus
  const deadweightLoss = demand > supply ? demand - supply : 0;
  const surplus = supply > demand ? supply - demand : 0;

  return (
    <div className="classifier-page">
      <h1 className="title">Disregarded Entity Classifier</h1>

      <div className="name-input-container">
        <label htmlFor="person-name" className="name-label">
          Enter Person's Name:
        </label>
        <input
          id="person-name"
          type="text"
          placeholder="e.g., Sumbal"
          value={personName}
          onChange={(e) => {
            setPersonName(e.target.value);
            if (nameError && e.target.value.trim()) setNameError(false);
            setSaved(false);
          }}
          className="name-input"
        />
        {nameError && (
          <p style={{ color: "crimson", marginTop: "6px", fontWeight: "600" }}>
            Please enter a name before saving.
          </p>
        )}
      </div>

      <p className="description">
        Select the statements that apply to the person you're evaluating:
      </p>

      <div className="criteria-list">
        {criteria.map((item) => (
          <div key={item.id} className="criterion-block">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={!!scores[item.id]}
                onChange={(e) => handleChange(item.id, e.target.checked)}
              />
              <span className="criterion-text">{item.text}</span>
            </label>
            <div className="summary">{item.summary}</div>
          </div>
        ))}
      </div>

      <div className="button-row">
        <button
          className="back-button"
          onClick={() => navigate("/DisregardedEntities")}
        >
          ⬅ Go Back
        </button>
        <button
          className="save-button"
          onClick={handleSave}
          disabled={!personName.trim()}
          title={!personName.trim() ? "Enter a name to enable save" : ""}
          style={{
            opacity: !personName.trim() ? 0.6 : 1,
            cursor: !personName.trim() ? "not-allowed" : "pointer",
          }}
        >
          Save & Analyse
        </button>
      </div>

      {saved && (
        <>
          <h2 className="graph-title">Sin-Based Breakdown</h2>
          <div className="bar-graph">
            {Object.entries(sinMap).map(([sin, entries]) => {
              const widthPercent = (entries.length / criteria.length) * 100;
              const shortNames = entries.map((c) => c.shortName || `#${c.id}`);

              return (
                <div key={sin} className="bar-row">
                  <div className="bar-label">{sin}</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${widthPercent}%` }}
                    >
                      <div
                        className="bar-content"
                        title={shortNames.join(", ")}
                      >
                        {shortNames.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="graph-note">
            These represent metaphysical influences this person may embody. High
            scores in any sin may justify conscious detachment.
          </p>

          <div className="summary-box">
            <h3>
              {classification === "Seriously flagged" ? (
                <span style={{ color: "crimson" }}>
                  ⚠️ {personName}{" "}
                  <u>
                    <a href="/DisregardedEntities" className="flag-link">
                      is seriously flagged
                    </a>
                  </u>{" "}
                  as a Disregarded Entity.
                </span>
              ) : classification === "Flagged" ? (
                <span style={{ color: "#ffd700" }}>
                  ⚠️ {personName}{" "}
                  <u>
                    <a href="/DisregardedEntities" className="flag-link">
                      is flagged
                    </a>
                  </u>{" "}
                  and may require cautious detachment.
                </span>
              ) : (
                <span>
                  ✅ {personName}{" "}
                  <u>
                    <a
                      href="/reflections#DisregardedEntities"
                      className="flag-link"
                    >
                      does not qualify
                    </a>
                  </u>{" "}
                  as a Disregarded Entity.
                </span>
              )}
            </h3>
            <p
              style={{ marginTop: "4px", fontWeight: "600", color: "#ffd700" }}
            >
              Score: {totalPoints} / {maxPossiblePoints} points ({percentage}%)
            </p>

            <h4 style={{ color: "#ffd700", marginTop: "1rem" }}>
              ⚠️ Red Flags:
            </h4>
            <ul>
              {criteria
                .filter((c) => scores[c.id] && c.points > 0)
                .map((c) => (
                  <li key={c.id}>
                    <strong style={{ color: "#ffd700" }}>
                      {c.shortName} (+{c.points}):
                    </strong>{" "}
                    {c.summary}
                  </li>
                ))}
            </ul>

            <h4 style={{ color: "#00ffff", marginTop: "1rem" }}>
              ⚖️ Virtue Boosts:
            </h4>
            <ul>
              {criteria
                .filter((c) => scores[c.id] && c.points < 0)
                .map((c) => (
                  <li key={c.id}>
                    <strong style={{ color: "#00ffff" }}>
                      {c.shortName} ({c.points}):
                    </strong>{" "}
                    {c.summary}
                  </li>
                ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: "30px",
              padding: "15px",
              backgroundColor: "#1a1f35",
              borderLeft: "4px solid #00ffff",
              borderRadius: "8px",
              fontFamily: "'Inter', sans-serif",
              color: "#00ffff",
              fontWeight: "600",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            <p>
              <strong>Evaluation Math:</strong> {personName} scored{" "}
              {totalPoints} points out of {maxPossiblePoints} possible points,
              resulting in {percentage}% overall.
            </p>
            <p>
              Disregard thresholds: <br />
              Flagged: {flaggedThreshold} points (~25%) <br />
              Seriously flagged: {seriousThreshold} points (~35%)
            </p>
          </div>
          <h2 className="graph-title">Sins vs Virtues Equilibrium</h2>
          <div className="equilibrium-graph">
            <div className="equilibrium-bars">
              <div className="sin-bar">
                <div className="label">Sins</div>
                <div
                  className="bar-fill red"
                  style={{
                    width: `${(disregardPoints / maxPossiblePoints) * 100}%`,
                  }}
                >
                  +{disregardPoints}
                </div>
              </div>
              <div className="virtue-bar">
                <div className="label">Virtues</div>
                <div
                  className="bar-fill green"
                  style={{
                    width: `${(redemptionPoints / maxPossiblePoints) * 100}%`,
                  }}
                >
                  {redemptionPoints}
                </div>
              </div>
            </div>

            <p className="equilibrium-note">
              The closer the virtue bar gets to balancing or surpassing the sin
              bar, the more worthy this person may be of empathy, despite red
              flags.
            </p>
          </div>

          <h2 className="graph-title">Demand & Supply Reflection</h2>
          <div className="ds-graph-container">
            <div className="ds-bar-row">
              <div className="ds-label">⚖️ Disregard Demand</div>
              <div
                className="ds-bar demand-bar"
                style={{ width: `${(totalPoints / maxPossiblePoints) * 100}%` }}
              ></div>
              <div className="ds-value">
                {((totalPoints / maxPossiblePoints) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="ds-bar-row">
              <div className="ds-label">🕊️ Redemption Supply</div>
              <div
                className="ds-bar supply-bar"
                style={{
                  width: `${
                    ((maxPossiblePoints - totalPoints) / maxPossiblePoints) *
                    100
                  }%`,
                }}
              ></div>
              <div className="ds-value">
                {(
                  ((maxPossiblePoints - totalPoints) / maxPossiblePoints) *
                  100
                ).toFixed(1)}
                %
              </div>
            </div>

            <div className="ds-deadweight-loss">
              Deadweight Loss:{" "}
              <strong>
                {Math.abs(
                  (totalPoints / maxPossiblePoints) * 100 -
                    ((maxPossiblePoints - totalPoints) / maxPossiblePoints) *
                      100
                ).toFixed(1)}
                %
              </strong>
            </div>
          </div>

          <div className="ds-explanation">
            <h3>📘 Psychological Supply-Demand Analysis</h3>
            <p>
              <strong>Disregard Demand (D):</strong> D = (Disregard Points / Max
              Possible Points) × 100
            </p>
            <p>
              <strong>Redemption Supply (S):</strong> S = (Redemption Points /
              Max Possible Points) × 100
            </p>
            <p>
              <strong>Deadweight Loss (if D &gt; S):</strong> You are carrying
              an unnecessary emotional burden — this person costs you more than
              they offer.
            </p>
            <p>
              <strong>Surplus (if S &gt; D):</strong> You may be undervaluing
              their redeeming traits — consider recalibrating.
            </p>
            <p>
              The closer the Demand and Supply curves intersect, the more
              emotionally and spiritually justified your stance.
            </p>
          </div>

          <div className="ds-svg-container">
            <h3>📈 Graphical Representation</h3>
            <svg width="300" height="300" className="ds-cross-graph">
              {/* Axes */}
              <line
                x1="40"
                y1="250"
                x2="280"
                y2="250"
                stroke="#aaa"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="250"
                x2="40"
                y2="40"
                stroke="#aaa"
                strokeWidth="1"
              />

              {/* Demand Curve: Downward Sloping */}
              <line
                x1="40"
                y1="60"
                x2="250"
                y2="250"
                stroke="#00ffff"
                strokeWidth="2"
              />
              <text x="200" y="240" fill="#00ffff">
                Demand (D)
              </text>

              {/* Supply Curve: Upward Sloping */}
              <line
                x1="40"
                y1="250"
                x2="250"
                y2="60"
                stroke="#ffd700"
                strokeWidth="2"
              />
              <text x="200" y="80" fill="#ffd700">
                Supply (S)
              </text>

              {/* Equilibrium Point */}
              <circle cx="145" cy="155" r="4" fill="#fff" />
              <text x="150" y="150" fill="#fff">
                Equilibrium
              </text>
            </svg>
          </div>
          <div className="ds-calculations">
            <h3>🔢 Calculated Values</h3>
            <p>
              <strong>Disregard Demand (D):</strong> {demand.toFixed(1)}%
            </p>
            <p>
              <strong>Redemption Supply (S):</strong> {supply.toFixed(1)}%
            </p>
            {deadweightLoss > 0 ? (
              <p style={{ color: "crimson" }}>
                <strong>Deadweight Loss:</strong> {deadweightLoss.toFixed(1)}%{" "}
                <br />
                (Emotional burden you carry)
              </p>
            ) : (
              <p style={{ color: "#00ff99" }}>
                <strong>Surplus:</strong> {surplus.toFixed(1)}% <br />
                (Positive redeeming qualities outweigh disregard)
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DisregardedClassifier;
