// src/components/OCDDissolver/OCDDissolver.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { steps } from "./steps";
import { motivationalQuotes } from "./quotes";
import "./OCDDissolver.css";

export default function OCDDissolver() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Move handleNext inside useEffect for stable reference
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") {
        if (stepIndex < steps.length - 1) {
          setStepIndex(stepIndex + 1);
        } else {
          setCompleted(true);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stepIndex]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setCompleted(false);
  };

  const progressPercent = ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="ocd-wrapper">
      <div className="ocd-container">
        <h2 className="ocd-title">🌀 OCD Ritual Dissolver</h2>

        {!completed ? (
          <div className="ocd-content">
            <div className="ocd-progress-bar">
              <div
                className="ocd-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="ocd-step">{steps[stepIndex]}</p>
            <div className="ocd-buttons">
              <button className="ocd-button next" onClick={handleNext}>
                Next Step
              </button>
              <button
                className="ocd-button back"
                onClick={() => navigate("/GraphNavPanel")}
              >
                ← Back
              </button>
            </div>
          </div>
        ) : (
          <div className="ocd-finish">
            <p>✨ Ritual dissolved. You are free in this moment.</p>
            <p className="quote">
              "
              {
                motivationalQuotes[
                  Math.floor(Math.random() * motivationalQuotes.length)
                ]
              }
              "
            </p>
            <div className="ocd-buttons">
              <button className="ocd-button reset" onClick={handleReset}>
                Start Again
              </button>
              <button
                className="ocd-button back"
                onClick={() => navigate("/GraphNavPanel")}
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
