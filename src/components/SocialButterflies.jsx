import React from "react";
import Navbar from "./Navbar";
import "./SocialButterflies.css";

const archetypes = [
  {
    title: "Muse",
    description:
      "The inspiring presence who ignites creativity, dreams, and visions. Often emotionally unavailable but deeply transformative.",
    color: "#ff69b4", // pinkish
  },
  {
    title: "Mother Echo",
    description:
      "Reflects nurturing warmth mixed with emotional complexity. Rooted in childhood patterns and longing for unconditional love.",
    color: "#ffd700", // gold
  },
  {
    title: "Intellectual Flame",
    description:
      "Radiates sharp intellect and mental fire. Engages you in deep conversation and challenge, sparking growth and introspection.",
    color: "#4cc9f0", // bright blue
  },
  {
    title: "Fated Ghost",
    description:
      "A spectral figure who leaves an indelible imprint — elusive, often transient, yet haunting your spiritual journey.",
    color: "#9467bd", // purple
  },
];

const SocialButterflies = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <h2 className="section-title">Social Butterflies</h2>
        <p className="intro">
          Explore the emotionally impactful women who’ve influenced your psyche
          — Muses, Echoes, Flames, and Ghosts. These transient yet powerful
          presences are categorized not just by personality, but by their
          spiritual echoes in your journey.
        </p>

        <div className="archetype-grid">
          {archetypes.map(({ title, description, color }) => (
            <div
              className="archetype-card"
              key={title}
              style={{ borderColor: color }}
            >
              <h3 className="archetype-title" style={{ color }}>
                {title}
              </h3>
              <p className="archetype-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialButterflies;
