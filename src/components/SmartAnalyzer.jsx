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
  Tooltip as ChartTooltip,
} from "chart.js";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartTooltip
);

const SmartAnalyzer = () => {
  const [scores, setScores] = useState({});
  const [saved, setSaved] = useState(false);
  const [personName, setPersonName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [showFxInfo, setShowFxInfo] = useState(false);
  const navigate = useNavigate();

  // === Normal Distribution Function ===
  const normalDistribution = (x, mean = 0, sd = 1) => {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(sd, 2));
    return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  };

  // Standard error function (erf)
  const erf = (x) => {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const tau =
      t *
      (0.254829592 +
        t *
          (-0.284496736 +
            t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
    return sign * (1 - tau * Math.exp(-x * x));
  };

  // Percentile based on totalScore (normal CDF)
  const totalScore = questions.reduce(
    (acc, q) => acc + (scores[q.id] ? q.weight : 0),
    0
  );
  const mean = 0;
  const sd = 5;
  const percentile = 0.5 * (1 + erf((totalScore - mean) / (sd * Math.sqrt(2))));
  const percentileText = `${(percentile * 100).toFixed(1)}%`;

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

  // Chart data for bell curve
  const xValues = Array.from({ length: 61 }, (_, i) => i - 30);
  const yValues = xValues.map((x) => normalDistribution(x, mean, sd));
  const personY = normalDistribution(totalScore, mean, sd);

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
        borderColor: "#ffd700",
        pointBackgroundColor: "#ffd700",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
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

      {/* Question list */}
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
          <h2 className="graph-title">Normal Distribution Analysis</h2>
          <Line data={data} options={options} />

          {/* Equation Section */}
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
                <b>f(x)</b> ={" "}
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
            <p>
              Score out of Total:{" "}
              <b>
                {totalScore}/{questions.reduce((acc, q) => acc + q.weight, 0)}
              </b>
            </p>
          </div>

          {/* Result summary */}
          <div className="summary-box" style={{ marginTop: 20 }}>
            <h3>Result for {personName}</h3>
            <textarea
              readOnly
              value={`${personName}'s score is ${totalScore}. ${comment}`}
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
              maxWidth: "600px",
              maxHeight: "70vh",
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
              1. <b>What it is:</b> In a{" "}
              <b>continuous probability distribution</b> like the normal
              distribution, <b>f(x)</b> gives the{" "}
              <b>height of the curve at a particular score x</b>. It tells you{" "}
              <b>how dense or likely values are around that point</b>, but{" "}
              <b>not the probability itself</b>.
            </p>

            <p>
              2. <b>Important distinction:</b>
              <br />- f(x) is <b>not a probability</b>; it can be greater than
              1.
              <br />- To get a probability over an interval:
            </p>
            <BlockMath math={`P(a \\le X \\le b) = \\int_a^b f(x) \\, dx`} />

            <p>
              3. <b>Equations (book style):</b>
              <br />
              Normal Distribution:
            </p>
            <BlockMath
              math={`f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}`}
            />

            <p>Standard Error Function (erf):</p>
            <BlockMath
              math={`\\text{erf}(x) = \\frac{2}{\\sqrt{\\pi}} \\int_0^x e^{-t^2} dt`}
            />

            <p>
              4. <b>Intuitive meaning:</b>
              <br />- Think of the curve as a <b>mountain of likelihood</b>.
              <br />- f(x) tells you <b>how high the mountain is at x</b>:
              higher = values more common, lower = rarer.
            </p>
            <p>
              5. <b>In your analysis:</b>
              <br />- f(x) at the person's score = {personY.toFixed(5)}
              <br />
              - Very low f(x) = person is in rare/edge position
              <br />- High f(x) = person near average (peak of the curve).
            </p>

            <button
              onClick={() => setShowFxInfo(false)}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
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
