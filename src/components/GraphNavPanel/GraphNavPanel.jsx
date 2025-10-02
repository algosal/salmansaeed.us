import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./GraphNavPanel.css";

const GraphNavPanel = () => {
  const navigate = useNavigate();

  const sections = [
    { label: "Genius Equation", path: "/GeniusEquationGraph" },
    { label: "Emotional Arcs", path: "/EmotionalArcs" },
    { label: "Social Butterfly Map", path: "/SocialButterflies" },
    { label: "Metaphysical Reflections", path: "/MetaphysicalReflections" },
    { label: "Mental Momentum", path: "/MentalMomentum" },
    { label: "Emotional Inertia", path: "/EmotionalInertia" },
    { label: "Disregarded Entities", path: "/DisregardedEntities" },
    { label: "DE Criteria List", path: "/CriteriaList" },
    { label: "Smart Analyzer", path: "/SmartAnalyzer" },
    { label: "Karmic Calculator", path: "/KarmicCalculator" },
    { label: "OCD Dissolver", path: "/OCDDissolver" },
    { label: "Alcohol Release", path: "/AlcoholRelease" },
  ];

  return (
    <div className="graph-nav-wrapper">
      <Navbar />
      <div className="graph-nav-content">
        <h2 className="graph-nav-heading">Navigate Deep Mind Constructs</h2>
        <div className="nav-button-grid">
          {sections.map((section, idx) => (
            <button
              key={idx}
              className="nav-button"
              onClick={() => navigate(section.path)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphNavPanel;
