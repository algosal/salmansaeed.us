import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { attractionSteps } from "./steps";
import "./AttractionParadoxStoryboard.css";

export default function AttractionParadoxStoryboard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [level, setLevel] = useState(0);
  const [viewMode, setViewMode] = useState("quick"); // quick or detailed

  // Quick steps selection
  const quickSteps = attractionSteps.filter((step) =>
    [
      "Real-time Attraction",
      "Photo Perception Drop",
      "Personal Growth Takeaway",
      "Channeling Inner Energy",
    ].includes(step.title)
  );

  const stepsToUse = viewMode === "quick" ? quickSteps : attractionSteps;
  const current = stepsToUse[currentStep];

  // Graph level simulation
  useEffect(() => {
    if (!current) return;

    let interval;

    if (current.graphType === "real") {
      let lvl = 0;
      interval = setInterval(() => {
        lvl += Math.random() * 10;
        if (lvl > 100) lvl = 100;
        setLevel(lvl);
      }, 200);
    } else {
      let lvl = 50;
      interval = setInterval(() => {
        lvl -= Math.random() * 5;
        if (lvl < 5) lvl = 5;
        setLevel(lvl);
      }, 300);
    }

    return () => clearInterval(interval);
  }, [currentStep, current]);

  if (!current) return <div>Loading...</div>;

  // Dynamic trend color for graph and text
  const trendColor =
    current.trend === "rising"
      ? "#00ffcc"
      : current.trend === "falling"
      ? "#ff5555"
      : "#ffd700";

  return (
    <div className="storyboard-container">
      <h2>{current.title}</h2>

      {/* View Mode Dropdown */}
      <div className="dropdown">
        <label>View Mode:</label>
        <select
          value={viewMode}
          onChange={(e) => {
            setViewMode(e.target.value);
            setCurrentStep(0);
          }}
        >
          <option value="quick">Quick Rectification</option>
          <option value="detailed">Detailed View</option>
        </select>
      </div>

      {/* Dynamic Graph Type Info */}
      <div className="graph-info">
        <strong>Graph Type Info:</strong> <span>{current.graphInfo}</span>
      </div>

      {/* Pie Graph */}
      <div className="graph">
        <div
          className="pie"
          style={{
            background: `conic-gradient(${trendColor} ${
              level * 3.6
            }deg, #1f2a48 0deg)`,
          }}
        >
          <span>{Math.round(level)}%</span>
        </div>
      </div>

      {/* Trend + Drive */}
      <div className={`trend ${current.trend}`} style={{ color: trendColor }}>
        {current.trend === "rising" && `⬆ Attraction Rising (${current.drive})`}
        {current.trend === "falling" &&
          `⬇ Attraction Falling (${current.drive})`}
        {current.trend === "stable" && `→ Attraction Stable (${current.drive})`}
      </div>

      {/* Description */}
      <p className="description">{current.description}</p>

      {/* Controls */}
      <div className="controls">
        <button onClick={() => navigate("/AttractionParadox")}>
          Back to AttractionParadox
        </button>
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, stepsToUse.length - 1))
          }
          disabled={currentStep === stepsToUse.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
