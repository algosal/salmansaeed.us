import React, { useState } from "react";
import "../styles/DisregardedClassifier.css";
import { Bar } from "react-chartjs-2";
import criteria from "../data/criteria";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const DisregardedClassifier = () => {
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedCriteria((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    setShowGraph(true);
  };

  const getSinSummary = () => {
    const sinCounts = {};
    selectedCriteria.forEach((id) => {
      const criterion = criteria.find((c) => c.id === id);
      if (criterion) {
        sinCounts[criterion.sin] = (sinCounts[criterion.sin] || 0) + 1;
      }
    });
    return sinCounts;
  };

  const sinCounts = getSinSummary();
  const totalPoints = selectedCriteria.length;
  const qualifies = totalPoints >= 7;

  const chartData = {
    labels: Object.keys(sinCounts),
    datasets: [
      {
        label: "Sin Weight",
        data: Object.values(sinCounts),
        backgroundColor: "#ffd700",
        borderColor: "#00ffff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Count: ${context.raw}`;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: { color: "#f8f9fc" },
        grid: { color: "#333" },
      },
      y: {
        ticks: { color: "#f8f9fc" },
        grid: { color: "#333" },
      },
    },
  };

  const getSummary = () => {
    if (selectedCriteria.length === 0) return ["No criteria selected."];
    return selectedCriteria.map((id) => {
      const item = criteria.find((c) => c.id === id);
      return `• ${item.sin}: ${item.summary}`;
    });
  };

  return (
    <div className="dc-container">
      <h2 className="dc-title">Disregarded Entity Classifier</h2>

      <div className="dc-criteria-list">
        {criteria.map((c) => (
          <label key={c.id} className="dc-criteria-item">
            <input
              type="checkbox"
              checked={selectedCriteria.includes(c.id)}
              onChange={() => handleCheckboxChange(c.id)}
            />
            {c.text}
          </label>
        ))}
      </div>

      <div className="dc-button-row">
        <button
          className="dc-button back"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <button className="dc-button save" onClick={handleSave}>
          Save & Analyze
        </button>
      </div>

      {showGraph && (
        <div className="dc-result-section">
          <div className="dc-result-summary">
            <p className="dc-result-line">
              <strong>
                <a href="/DisregardedEntities" className="dc-result-link">
                  This person {qualifies ? "qualifies" : "does not qualify"} as
                  a Disregarded Entity.
                </a>
              </strong>
            </p>
            <p className="dc-total-points">
              Total Emotional Points: <span>{totalPoints}</span>
            </p>
          </div>

          <div className="dc-graph-wrapper">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="dc-sin-summary">
            <h3>Sin Analysis & Emotional Summary</h3>
            <ul>
              {getSummary().map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisregardedClassifier;
