import React, { useState } from "react";
import "./AlcoholRelease.css";
import { useNavigate } from "react-router-dom";

export default function AlcoholRelease() {
  const navigate = useNavigate();

  const [alcoholLevel, setAlcoholLevel] = useState(5); // scale 0-10
  const [detoxProgress, setDetoxProgress] = useState(0);

  const handleDetox = () => {
    // Simple simulation: reduce alcoholLevel gradually
    const reduction = Math.min(alcoholLevel, 1); // max 1 per click
    const newLevel = alcoholLevel - reduction;
    setAlcoholLevel(newLevel);

    const progress = ((5 - newLevel) / 5) * 100; // percentage of detox
    setDetoxProgress(progress);
  };

  return (
    <div className="alcohol-release-container">
      <h2 style={{ textAlign: "center", color: "#ffd700" }}>
        🍷 Alcohol Release Simulator
      </h2>

      <button
        className="alcohol-release-button"
        onClick={() => navigate("/GraphNavPanel")}
      >
        ← Back
      </button>

      <div>
        <label style={{ fontWeight: "bold" }}>
          Current Alcohol Level: {alcoholLevel.toFixed(1)} / 5
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={alcoholLevel}
          onChange={(e) => setAlcoholLevel(Number(e.target.value))}
          className="alcohol-release-slider"
        />
      </div>

      <button className="alcohol-release-button" onClick={handleDetox}>
        🌀 Detox / Reduce
      </button>

      <div className="alcohol-release-progress">
        <div
          className="alcohol-release-progress-fill"
          style={{ width: `${detoxProgress}%` }}
        >
          {detoxProgress.toFixed(0)}%
        </div>
      </div>

      <p style={{ marginTop: "1rem", color: "#00ffff" }}>
        Move the slider to simulate current alcohol influence. Click “Detox”
        repeatedly to gradually reduce the level to zero.
      </p>
    </div>
  );
}
