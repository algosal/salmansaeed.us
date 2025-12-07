import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./GraphNavPanel.css";

const GraphNavPanel = () => {
  const navigate = useNavigate();

  // Internal routes
  const internalSections = [
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
    { label: "Meta IQ Demo", path: "/MetaIQDemo" },
    { label: "Short Mental Training", path: "/ShortMentalTraining" },
    { label: "Attraction Paradox", path: "/AttractionParadox" },
  ];

  // External URLs
  const externalSections = [
    { label: "Eidos Mind", url: "https://salmansaeed.us/eidos/" },
    { label: "Operant Power", url: "https://salmansaeed.us/operant/" },
    { label: "Clarity Engine", url: "https://salmansaeed.us/clarity/" },
    { label: "EroSync", url: "https://salmansaeed.us/erosync/" },
    { label: "Meta Sex", url: "https://salmansaeed.us/meta-sex/" },
  ];

  return (
    <div className="graph-nav-wrapper">
      <Navbar />

      <div className="graph-nav-content">
        <div className="graph-nav-heading-container">
          <h2 className="graph-nav-heading">Navigate Deep Mind Constructs</h2>
        </div>

        <div className="nav-button-grid">
          {/* Internal Route Buttons */}
          {internalSections.map((item, idx) => (
            <button
              key={`int-${idx}`}
              className="nav-button"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}

          {/* External Link Buttons */}
          {externalSections.map((item, idx) => (
            <button
              key={`ext-${idx}`}
              className="nav-button"
              onClick={() => window.open(item.url, "_blank")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphNavPanel;
