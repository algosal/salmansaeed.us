import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import criteria from "../data/criteria";
import "../styles/DisregardedClassifier.css";

const DisregardedClassifier = () => {
  const [scores, setScores] = useState({});
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleChange = (id, value) => {
    setScores({ ...scores, [id]: value ? 1 : 0 });
    setSaved(false);
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const sinMap = {};
  criteria.forEach((c) => {
    if (scores[c.id]) {
      sinMap[c.sin] = sinMap[c.sin] || [];
      sinMap[c.sin].push(c.shortName || `#${c.id}`);
    }
  });

  const handleSave = () => setSaved(true);

  const isDisregarded = totalScore >= 5;

  return (
    <div className="classifier-page">
      <h1 className="title">Disregarded Entity Classifier</h1>
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
          onClick={() => navigate("/reflections")}
        >
          ⬅ Go Back
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      {saved && (
        <>
          <h2 className="graph-title">Sin-Based Breakdown</h2>
          <div className="bar-graph">
            {Object.entries(sinMap).map(([sin, items]) => {
              const widthPercent = (items.length / criteria.length) * 100;
              return (
                <div key={sin} className="bar-row">
                  <div className="bar-label">{sin}</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${widthPercent}%` }}
                    >
                      <span className="bar-content">{items.join(", ")}</span>
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
              {isDisregarded ? (
                <span>
                  ✅ This person{" "}
                  <u>
                    <a href="/reflections#DisregardedEntities">qualifies</a>
                  </u>{" "}
                  as a Disregarded Entity.
                </span>
              ) : (
                <span>
                  ❌ This person{" "}
                  <u>
                    <a href="/reflections#DisregardedEntities">
                      does not qualify
                    </a>
                  </u>{" "}
                  as a Disregarded Entity.
                </span>
              )}
            </h3>
            <ul>
              {criteria
                .filter((c) => scores[c.id])
                .map((c) => (
                  <li key={c.id}>
                    <strong>{c.shortName}:</strong> {c.summary}
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DisregardedClassifier;
