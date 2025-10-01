import React from "react";
import Navbar from "../Navbar";
import "./MetaphysicalReflections.css";

const reflections = [
  {
    title: "Third-Eye Awakening",
    description:
      "The opening of inner vision and clarity — perceiving layers beyond physical reality, revealing hidden truths.",
    color: "#4cc9f0",
  },
  {
    title: "Ego Detachment",
    description:
      "Releasing identification with the ego-self, embracing humility and spaciousness where true freedom arises.",
    color: "#9467bd",
  },
  {
    title: "Law of Assumption",
    description:
      "Faithful belief that your imagined state is real now, shaping external reality by aligning thoughts and feelings.",
    color: "#ffd700",
  },
  {
    title: "Reflection Principle",
    description:
      "The outer world mirrors your inner state — every external circumstance is a direct reflection of your consciousness.",
    color: "#ff69b4",
  },
  {
    title: "Faith & Surrender",
    description:
      "Trusting the unseen process while relinquishing control — allowing flow and divine timing to manifest your desires.",
    color: "#2ca02c",
  },
];

const MetaphysicalReflections = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <h2 className="section-title">Metaphysical Reflections</h2>
        <p className="intro">
          These are distilled insights from elevated states — moments of
          third-eye awakening, detachment from ego, spiritual laws (like
          assumption, reflection, and faith), and how they shape your inner
          cosmology.
        </p>

        <div className="reflection-grid">
          {reflections.map(({ title, description, color }) => (
            <div
              className="reflection-card"
              key={title}
              style={{ borderColor: color }}
            >
              <h3 className="reflection-title" style={{ color }}>
                {title}
              </h3>
              <p className="reflection-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetaphysicalReflections;
