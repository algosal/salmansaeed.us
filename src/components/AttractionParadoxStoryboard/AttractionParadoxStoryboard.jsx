import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AttractionParadoxStoryboard.css";

const steps = [
  {
    title: "Real-time Attraction",
    description: "Real life triggers dopamine spike, context enhances appeal.",
    graphType: "real",
    graphColor: "cyan",
  },
  {
    title: "Photo Perception Drop",
    description: "Static photo removes dynamic cues; attraction drops.",
    graphType: "photo",
    graphColor: "gold",
  },
  {
    title: "Memory vs Reality",
    description:
      "Brain reconstructs idealized memory; static images rarely match.",
    graphType: "photo",
    graphColor: "magenta",
  },
  {
    title: "Porn Comparison",
    description:
      "Porn creates a distorted baseline via selection, makeup, lighting.",
    graphType: "photo",
    graphColor: "orange",
  },
  {
    title: "Personal Growth Takeaway",
    description: "Observe attraction without over-identifying; channel energy.",
    graphType: "real",
    graphColor: "lime",
  },
];

export default function AttractionParadoxStoryboard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [level, setLevel] = useState(0);

  const step = steps[currentStep];

  useEffect(() => {
    let interval;
    if (step.graphType === "real") {
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
  }, [currentStep, step.graphType]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1 < steps.length ? prev + 1 : prev));
  };
  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div className="storyboard-container">
      <h2>{step.title}</h2>

      <div className="graph">
        <div
          className="bar"
          style={{
            height: `${level}%`,
            backgroundColor: step.graphColor,
          }}
        >
          {step.graphType === "real" ? "Real-time Spike" : "Photo Drop"}
        </div>
      </div>

      <p className="description">{step.description}</p>

      <div className="controls">
        <button onClick={() => navigate("/AttractionParadox")}>
          Back to AttractionParadox
        </button>
        <button onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </button>
        <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
