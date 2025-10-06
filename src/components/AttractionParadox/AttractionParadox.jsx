import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AttractionParadox.css";

export default function AttractionParadox() {
  const navigate = useNavigate();
  const [realTimeLevel, setRealTimeLevel] = useState(0);
  const [photoLevel, setPhotoLevel] = useState(0);
  const [view, setView] = useState("real"); // "real" or "photo"

  useEffect(() => {
    if (view === "real") {
      let level = 0;
      const interval = setInterval(() => {
        level += Math.random() * 10;
        if (level > 100) level = 100;
        setRealTimeLevel(level);
      }, 200);
      return () => clearInterval(interval);
    } else {
      setRealTimeLevel(0);
    }
  }, [view]);

  useEffect(() => {
    if (view === "photo") {
      let level = 50;
      const interval = setInterval(() => {
        level -= Math.random() * 5;
        if (level < 5) level = 5;
        setPhotoLevel(level);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setPhotoLevel(0);
    }
  }, [view]);

  return (
    <div className="attraction-paradox-container">
      <h2>Attraction Paradox</h2>

      {/* Buttons with spacing */}
      <div className="button-group">
        <button onClick={() => navigate("/GraphNavPanel")}>
          Back to Graph NavPanel
        </button>

        <button onClick={() => setView(view === "real" ? "photo" : "real")}>
          Toggle View ({view === "real" ? "Photo" : "Real-time"})
        </button>
      </div>

      {/* Graph */}
      <div className="graph">
        <div
          className="bar real"
          style={{ height: `${view === "real" ? realTimeLevel : 0}%` }}
        >
          Real-time Spike
        </div>
        <div
          className="bar photo"
          style={{ height: `${view === "photo" ? photoLevel : 0}%` }}
        >
          Photo Drop
        </div>
      </div>

      {/* Go to Storyboard button */}
      <button
        style={{ marginTop: "1.5rem" }}
        onClick={() => navigate("/AttractionParadoxStoryboard")}
      >
        Go to Storyboard
      </button>

      {/* Explanation block */}
      <div className="explanation">
        {view === "real" ? (
          <p>
            Real-time attraction is driven by dopamine, instinct, and context.
            Movement, lighting, and novelty spike your brain’s reward system.
          </p>
        ) : (
          <p>
            Photo perception removes dynamic cues. Prefrontal evaluation
            overrides instinct, leading to a drop in perceived attraction.
          </p>
        )}
      </div>
    </div>
  );
}
