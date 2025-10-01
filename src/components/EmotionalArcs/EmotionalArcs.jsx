import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./EmotionalArcs.css";

const arcs = [
  {
    name: "Sumbal",
    description:
      "A volatile emotional pattern marked by fiery intensity, deep attachment, and recurring waves of passion and withdrawal.",
    color: "#ff4c4c",
  },
  {
    name: "Shemaila",
    description:
      "A graceful, elusive presence whose emotional influence flows like gentle waves — magnetic but often intangible and transient.",
    color: "#4cc9f0",
  },
  {
    name: "The Muse",
    description:
      "The spark that ignites creative fire — an emotional catalyst inspiring transformation and self-expression.",
    color: "#ffd700",
  },
  {
    name: "The Ghost",
    description:
      "A haunting emotional echo — lingering memories and unresolved feelings that shape subconscious patterns.",
    color: "#9467bd",
  },
];

const EmotionalArcs = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <h2 className="fixed-heading">Emotional Arcs</h2>

        <p className="intro">
          Emotional patterns shape the contours of your psyche — dynamic flows
          of attachment, intensity, longing, and release. The characters
          explored here, including <strong>Sumbal</strong> and{" "}
          <strong>Shemaila</strong>, are fictionalized constructs representing
          archetypal energies, created solely for self-reflection and inner
          exploration.
        </p>

        <div className="arc-grid">
          {arcs.map(({ name, description, color }) => (
            <div className="arc-card" key={name} style={{ borderColor: color }}>
              <h3 className="arc-title" style={{ color }}>
                {name}
              </h3>
              <p className="arc-description">{description}</p>
            </div>
          ))}
        </div>

        <button className="nav-button" onClick={() => navigate("/reflections")}>
          Go to Reflections
        </button>
      </div>
    </div>
  );
};

export default EmotionalArcs;
