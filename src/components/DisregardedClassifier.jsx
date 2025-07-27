import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // added Link
import "../styles/DisregardedClassifier.css";

const criteria = [
  {
    id: 1,
    text: "The emotional loop is complete — no need for apology, revenge, or reconciliation.",
    points: 1,
  },
  {
    id: 2,
    text: "Their name, image, or memory no longer causes a physical reaction.",
    points: 1,
  },
  {
    id: 3,
    text: "The connection was mostly one-way — draining or transactional.",
    points: 1,
  },
  {
    id: 4,
    text: "They play no role in your higher self / ideal life vision.",
    points: 1,
  },
  {
    id: 5,
    text: "They’ve become a symbol or archetype in your mind — not a person.",
    points: 1,
  },
  {
    id: 6,
    text: "You feel you’ve fully learned the lesson they were meant to teach.",
    points: 1,
  },
  {
    id: 7,
    text: "You no longer check their social media or wonder about them.",
    points: 1,
  },
  {
    id: 8,
    text: "If they reached out now, you’d feel no urgency to respond.",
    points: 1,
  },
  {
    id: 9,
    text: "They show a pattern of low respect, poor character, or manipulative attitude.",
    points: 2,
  },
  {
    id: 10,
    text: "Their presence lowered your self-worth, delayed your purpose, or confused your moral compass.",
    points: 2,
  },
  {
    id: 11,
    text: "They consistently disrespect your boundaries or values.",
    points: 2,
  },
  {
    id: 12,
    text: "Their behavior toward you was often passive-aggressive, dismissive, or controlling.",
    points: 2,
  },
  {
    id: 13,
    text: "They caused repeated emotional chaos or drama without accountability.",
    points: 2,
  },
  {
    id: 14,
    text: "You no longer feel curiosity, longing, or nostalgia toward them.",
    points: 1,
  },
  {
    id: 15,
    text: "Their involvement obstructed your spiritual or personal growth.",
    points: 2,
  },
  {
    id: 16,
    text: "You feel mentally and emotionally free when thinking about them, not triggered.",
    points: 1,
  },
];

const POINTS_THRESHOLD = 6;

const DisregardedClassifier = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

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
    alert(
      `Save Request\nName: ${name || "[No name entered]"}\nCriteria matched: ${
        selected.length
      }\nTotal Points: ${totalPoints}`
    );
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
