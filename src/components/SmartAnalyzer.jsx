import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import "../styles/DisregardedClassifier.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

const SmartAnalyzer = () => {
  const [scores, setScores] = useState({});
  const [saved, setSaved] = useState(false);
  const [personName, setPersonName] = useState("");
  const [nameError, setNameError] = useState(false);
  const navigate = useNavigate();

  // === Normal Distribution Function ===
  const normalDistribution = (x, mean = 0, sd = 1) => {
    const exponent = -Math.pow(x - mean, 2) / (2 * sd * sd);
    return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  };

  // Simple erf approximation
  const erf = (x) => {
    // Abramowitz and Stegun approximation
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x >= 0 ? 1 : -1;
    const absX = Math.abs(x);
    const t = 1 / (1 + p * absX);
    const y =
      1 -
      ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
        t *
        Math.exp(-absX * absX);
    return sign * y;
  };

  // Normal CDF for percentile
  const normalCDF = (x, mean = 0, sd = 1) =>
    0.5 * (1 + erf((x - mean) / (sd * Math.sqrt(2))));

  const handleChange = (id, value) => {
    setScores({ ...scores, [id]: value ? 1 : 0 });
    setSaved(false);
  };

  const handleSave = () => {
    if (!personName.trim()) {
      setNameError(true);
      setSaved(false);
      return;
    }
    setNameError(false);
    setSaved(true);
  };

  // Total score
  const totalScore = questions.reduce(
    (acc, q) => acc + (scores[q.id] ? q.weight : 0),
    0
  );

  // Percentile
  const percentile = normalCDF(totalScore, 0, 5) * 100;
  let positionComment = "";
  if (percentile < 6)
    positionComment = "Falls in the first 6% (far left tail).";
  else if (percentile > 94)
    positionComment = "Falls in the last 6% (far right tail).";
  else positionComment = "Falls in the central 88% (normal range).";

  // Chart data
  const xValues = Array.from({ length: 61 }, (_, i) => i - 30);
  const yValues = xValues.map((x) => normalDistribution(x, 0, 5));
  const data = {
    labels: xValues,
    datasets: [
      {
        label: "Normal Distribution",
        data: yValues,
        borderColor: "#00ffff",
        borderWidth: 2,
        fill: false,
      },
      {
        label: `${personName}'s Position`,
        data: xValues.map((x) =>
          Math.abs(x - totalScore) < 0.5
            ? normalDistribution(totalScore, 0, 5)
            : null
        ),
        borderColor: "#ffd700",
        pointBackgroundColor: "#ffd700",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { tooltip: { mode: "index", intersect: false } },
    scales: {
      x: { title: { display: true, text: "Score (x)" } },
      y: { title: { display: true, text: "f(x)" } },
    },
  };

  let comment = "";
  if (totalScore < -2) comment = "Strongly aligned with virtues.";
  else if (totalScore >= -2 && totalScore <= 2)
    comment = "Balanced / neutral traits.";
  else comment = "Red flags detected; leaning toward disregard.";

  return (
    <div className="classifier-page">
      <h1 className="title">Smart Analyzer</h1>

      <div className="name-input-container">
        <label htmlFor="person-name" className="name-label">
          Enter Person's Name:
        </label>
        <input
          id="person-name"
          type="text"
          placeholder="e.g., Shemaila"
          value={personName}
          onChange={(e) => {
            setPersonName(e.target.value);
            if (nameError && e.target.value.trim()) setNameError(false);
            setSaved(false);
          }}
          className="name-input"
        />
        {nameError && (
          <p style={{ color: "crimson", marginTop: 6, fontWeight: 600 }}>
            Please enter a name before saving.
          </p>
        )}
      </div>

      <p className="description">
        Select the statements that apply to the person you're evaluating:
      </p>

      <div className="criteria-list">
        {questions.map((q) => (
          <div key={q.id} className="criterion-block">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={!!scores[q.id]}
                onChange={(e) => handleChange(q.id, e.target.checked)}
              />
              <span className="criterion-text">{q.text}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="button-row">
        <button className="back-button" onClick={() => navigate("/")}>
          ⬅ Go Back
        </button>
        <button
          className="save-button"
          onClick={handleSave}
          disabled={!personName.trim()}
          style={{
            opacity: !personName.trim() ? 0.6 : 1,
            cursor: !personName.trim() ? "not-allowed" : "pointer",
          }}
        >
          Save & Analyse
        </button>
      </div>

      {saved && (
        <>
          <h2 className="graph-title">Normal Distribution Analysis</h2>
          <Line data={data} options={options} />

          <div className="equation-section" style={{ marginTop: 30 }}>
            <h3>Normal Distribution Formula</h3>
            <p style={{ fontFamily: "monospace", fontSize: "1.1rem" }}>
              f(x) = (1 / (σ √(2π))) * e^(-(x - μ)² / (2σ²))
            </p>
            <ul style={{ marginTop: 10, lineHeight: "1.6" }}>
              <li>
                <b>x</b> = person’s score = {totalScore}
              </li>
              <li>
                <b>μ</b> = mean = 0
              </li>
              <li>
                <b>σ</b> = standard deviation = 5
              </li>
              <li>
                <b>f(x)</b> = probability density at x
              </li>
            </ul>
            <p style={{ marginTop: 15 }}>
              Substitution: f({totalScore}) = (1 / (5 √(2π))) * e^(-(
              {totalScore} - 0)² / 50)
            </p>
            <p>
              Computed Value:{" "}
              <b>{normalDistribution(totalScore, 0, 5).toFixed(5)}</b>
            </p>
          </div>

          <div className="summary-box" style={{ marginTop: 20 }}>
            <h3>Result for {personName}</h3>
            <textarea
              readOnly
              value={`${personName}'s score is ${totalScore}. ${comment}
Percentile: ${percentile.toFixed(2)}%. ${positionComment}`}
              style={{
                width: "100%",
                minHeight: 100,
                background: "#1a1f35",
                color: "#00ffff",
                fontWeight: 600,
                border: "none",
                borderRadius: 8,
                padding: 10,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SmartAnalyzer;
