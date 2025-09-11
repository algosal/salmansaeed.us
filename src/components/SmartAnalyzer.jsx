import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
} from "chart.js";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import questions from "../data/questions";
import pairedQuestions from "../data/pairedQuestions";

import { getEntityComment, getPercentileComment } from "../formulas/comments";
import { mapScoreToInches } from "../formulas/mapping";
import { normalDistribution, getPercentile } from "../formulas/distributions";
import { mapNormalizedToInches } from "../formulas/normalization";
import { calculateAccuracyRates } from "../utils/accuracy";

import "../styles/DisregardedClassifier.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartTooltip
);

const SmartAnalyzer = () => {
  const [scores, setScores] = useState({});
  const [excluded, setExcluded] = useState({});
  const [saved, setSaved] = useState(false);
  const [personName, setPersonName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [showFxInfo, setShowFxInfo] = useState(false);

  const navigate = useNavigate();

  // Toggle exclusion (with paired questions)
  const handleExcludeToggle = (id) => {
    setExcluded((prev) => {
      const newExcluded = { ...prev, [id]: !prev[id] };
      const pairId = pairedQuestions[id];
      if (pairId) newExcluded[pairId] = !prev[id];
      return newExcluded;
    });
    setSaved(false);
  };

  const handleChange = (id, value) => {
    setScores((prev) => ({ ...prev, [id]: value ? 1 : 0 }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!personName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setSaved(true);
  };

  // === Compute Scores & Normalized ===
  const { totalScore, totalMaxScore, normalizedScore } = useMemo(() => {
    let total = 0;
    let maxScore = 0;
    questions.forEach((q) => {
      if (!excluded[q.id]) {
        const w = q.weight ?? 1;
        maxScore += Math.abs(w);
        total += scores[q.id] ? w : 0;
      }
    });
    const normalized = maxScore > 0 ? total / maxScore : 0;
    // console.log("toal is " + total + "and max is " + maxScore);
    return {
      totalScore: total,
      totalMaxScore: maxScore,
      normalizedScore: normalized,
    };
  }, [scores, excluded]);

  // Mean and SD for chart
  const mean = 0;
  const sd = 5;

  const percentile = getPercentile(totalScore, mean, sd);
  const percentileText = `${(percentile * 100).toFixed(1)}%`;

  const sizeInInches = mapScoreToInches(totalScore, mean, sd);
  // derive arrays first
  const answeredIds = useMemo(
    () => Object.keys(scores).filter((id) => scores[id]),
    [scores]
  );
  const excludedIds = useMemo(
    () => Object.keys(excluded).filter((id) => excluded[id]),
    [excluded]
  );
  //success and error rates
  const { successRate, errorRate } = calculateAccuracyRates(
    questions,
    excludedIds
  );

  //   console.log("Success rate:", successRate.toFixed(2));
  //   console.log("Error rate:", errorRate.toFixed(2));

  const normalizedSizeInInches = useMemo(() => {
    let valueOfNormalizedInches = mapNormalizedToInches(
      questions,
      answeredIds,
      excludedIds,
      mean,
      sd
    );
    // console.log("value of normalized inches" + valueOfNormalizedInches);
    return valueOfNormalizedInches;
  }, [answeredIds, excludedIds, mean, sd]);

  const entityComment = getEntityComment(
    sizeInInches,
    "Balanced / neutral traits."
  );
  const percentileComment = getPercentileComment(
    percentile,
    totalScore,
    mean - 1.5548 * sd,
    mean + 1.5548 * sd,
    mean
  );

  // Chart setup
  const xValues = Array.from({ length: 61 }, (_, i) => i - 30);
  const yValues = xValues.map((x) => normalDistribution(x, mean, sd));
  const personY = normalDistribution(totalScore, mean, sd);
  const leftTailCut = mean - 1.5548 * sd;
  const rightTailCut = mean + 1.5548 * sd;

  const getDotColor = (score) => {
    if (score <= leftTailCut) return "#00ff00";
    if (score >= rightTailCut) return "#ff0000";
    return "#ffd700";
  };

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
        data: xValues.map((x) => (x === totalScore ? personY : null)),
        borderColor: getDotColor(totalScore),
        pointBackgroundColor: getDotColor(totalScore),
        pointRadius: 6,
      },
      {
        label: "6% Tails",
        data: xValues.map((x) =>
          x <= leftTailCut || x >= rightTailCut
            ? normalDistribution(x, mean, sd)
            : null
        ),
        borderColor: "#ff4d4d",
        borderWidth: 1,
        pointRadius: 3,
        pointStyle: "rectRot",
        showLine: false,
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

  return (
    <div className="classifier-page">
      <h1 className="title">Smart Analyzer</h1>

      {/* Name input */}
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
        {questions.map((q) => {
          const pairId = pairedQuestions[q.id];
          // Disable checkbox if excluded OR its contradictory pair is selected
          const isCheckboxDisabled =
            !!excluded[q.id] || (pairId && scores[pairId]);

          return (
            <div
              key={q.id}
              className="criterion-block"
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              {/* Red exclusion box */}
              <button
                type="button"
                title="This question is excluded from analysis."
                onClick={() => handleExcludeToggle(q.id)}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 8,
                  backgroundColor: excluded[q.id] ? "red" : "#ccc",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 3,
                }}
              />
              {/* Checkbox */}
              <label
                className="checkbox-label"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  checked={!!scores[q.id]}
                  disabled={isCheckboxDisabled}
                  onChange={(e) => handleChange(q.id, e.target.checked)}
                />
                <span
                  style={{
                    marginLeft: 4,
                    color: isCheckboxDisabled ? "#888" : "#fff",
                    textDecoration: excluded[q.id] ? "line-through" : "none",
                  }}
                >
                  {q.text}
                </span>
              </label>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
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

      {/* Results */}
      {saved && (
        <>
          {/* Score display under result */}
          <p style={{ marginTop: 10 }}>
            <b>Score:</b> {totalScore} / {totalMaxScore} | Normalized:{" "}
            {(normalizedScore * 100).toFixed(1)}%
          </p>

          <h2 className="graph-title">Normal Distribution Analysis</h2>
          <Line data={data} options={options} />
          <p>
            <b>Approximate Size (inches based on percentile):</b>{" "}
            {sizeInInches.toFixed(1)}" (1–18 scale)
          </p>

          <div className="result-metrics">
            <p style={{ color: "green" }}>
              <strong>Success Rate in Approximation:</strong>{" "}
              {(successRate * 100).toFixed(1)}%
            </p>
            <p style={{ color: "red" }}>
              <strong>Error Rate in Approximation:</strong>{" "}
              {(errorRate * 100).toFixed(1)}%
            </p>
            <p>
              <b>Normalized Size:</b> {normalizedSizeInInches.toFixed(1)}" (1–18
              scale)
            </p>
            <p>
              <b>Likely Likeable Size:</b>{" "}
              {(() => {
                const n1 = parseFloat(normalizedSizeInInches?.toFixed?.(1));
                const n2 = parseFloat(sizeInInches?.toFixed?.(1));

                if (isNaN(n1) || isNaN(n2)) {
                  return "N/A"; // fallback if one is missing or invalid
                }

                return ((n1 + n2) / 2).toFixed(1);
              })()}
              " (1–18 scale)
            </p>
          </div>

          <div className="equation-section" style={{ marginTop: 30 }}>
            <h3>Normal Distribution Formula</h3>
            <BlockMath
              math={`f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}`}
            />
            <ul style={{ marginTop: 10, lineHeight: "1.6" }}>
              <li>
                <b>x</b> = person's score = {totalScore}
              </li>
              <li>
                <b>μ</b> = mean = {mean}
              </li>
              <li>
                <b>σ</b> = standard deviation = {sd}
              </li>
              <li>
                <b>f(x)</b>{" "}
                <span
                  onClick={() => setShowFxInfo(true)}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#ffd700",
                  }}
                >
                  {personY.toFixed(5)}
                </span>
              </li>
            </ul>
            <BlockMath
              math={`f(${totalScore}) = \\frac{1}{${sd} \\sqrt{2\\pi}} e^{-\\frac{(${totalScore}-${mean})^2}{2*${sd}^2}}`}
            />
            <p>
              Percentile: <b>{percentileText}</b> (falls in{" "}
              {percentile > 0.5 ? "right" : "left"} tail)
            </p>
          </div>

          <div className="summary-box" style={{ marginTop: 20 }}>
            <h3>Result for {personName}</h3>
            <textarea
              readOnly
              value={`${personName}'s score is ${totalScore} / ${totalMaxScore}. ${entityComment}. Percentile note: ${percentileComment}`}
              style={{
                width: "100%",
                minHeight: 80,
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

      {/* f(x) Info Modal */}
      {showFxInfo && (
        <div
          className="fx-info-modal"
          onClick={() => setShowFxInfo(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(10,15,36,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            color: "#00ffff",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "700px",
              maxHeight: "75vh",
              overflowY: "auto",
              backgroundColor: "#1a1f35",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 0 20px #00ffff",
              lineHeight: "1.6",
              fontSize: "1rem",
            }}
          >
            <h3 style={{ color: "#ffd700" }}>
              Probability Density Value (f(x))
            </h3>

            <p>
              At <b>{personName}'s</b> score of <b>{totalScore}</b>, the
              probability density value is:{" "}
              <span style={{ color: "#00ff7f", fontWeight: "bold" }}>
                {personY.toFixed(5)}
              </span>
            </p>

            <h4 style={{ marginTop: "15px", color: "#ffd700" }}>
              1. What it is:
            </h4>
            <p>
              In a continuous probability distribution like the normal
              distribution, <code>f(x)</code> gives the height of the curve at a
              particular score <b>x</b>. It tells you how dense or likely values
              are around that point, but <b>not the probability itself</b>.
            </p>

            <h4 style={{ marginTop: "15px", color: "#ffd700" }}>
              2. Important distinction:
            </h4>
            <ul>
              <li>
                <code>f(x)</code> is <b>not a probability</b>; it can be greater
                than 1.
              </li>
              <li>
                To get a probability over an interval:
                <BlockMath math={`P(a \\leq X \\leq b) = \\int_a^b f(x) dx`} />
              </li>
            </ul>

            <h4 style={{ marginTop: "15px", color: "#ffd700" }}>
              3. Equations (book style):
            </h4>
            <p>
              <b>Normal Distribution:</b>
            </p>
            <BlockMath
              math={`f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}`}
            />
            <p>
              <b>Standard Error Function (erf):</b>
            </p>
            <BlockMath
              math={`erf(x) = \\frac{2}{\\sqrt{\\pi}} \\int_0^x e^{-t^2} dt`}
            />

            <h4 style={{ marginTop: "15px", color: "#ffd700" }}>
              4. Intuitive meaning:
            </h4>
            <ul>
              <li>
                Think of the curve as a <b>mountain of likelihood</b>.
              </li>
              <li>
                <code>f(x)</code> tells you how high the mountain is at <b>x</b>
                : higher = values more common, lower = rarer.
              </li>
            </ul>

            <h4 style={{ marginTop: "15px", color: "#ffd700" }}>
              5. In your analysis:
            </h4>
            <ul>
              <li>
                <code>f(x)</code> at <b>{personName}'s</b> score ={" "}
                <span style={{ color: "#00ff7f", fontWeight: "bold" }}>
                  {personY.toFixed(5)}
                </span>
              </li>
              <li>Very low f(x) → {personName} is in a rare/edge position.</li>
              <li>
                High f(x) → {personName} is near the average (peak of curve).
              </li>
            </ul>

            <button
              onClick={() => setShowFxInfo(false)}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#ffd700",
                color: "#0a0f24",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAnalyzer;
