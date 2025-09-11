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
import pairedQuestions from "../data/pairedQuestions";

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
  // Add this near the top of your component
  const [excluded, setExcluded] = useState({});

  // Function to toggle exclusion
  //   const handleExcludeToggle = (id) => {
  //     setExcluded((prev) => ({ ...prev, [id]: !prev[id] }));
  //     setSaved(false);
  //   };

  // Inside your handleExcludeToggle
  const handleExcludeToggle = (id) => {
    setExcluded((prev) => {
      const newExcluded = { ...prev, [id]: !prev[id] };

      // Automatically toggle the paired question
      const pairId = pairedQuestions[id];
      if (pairId) {
        newExcluded[pairId] = !prev[id]; // sync the pair
      }

      return newExcluded;
    });

    setSaved(false);
  };

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
  // let totalScore = questions.reduce(
  //   (acc, q) => acc + (scores[q.id] ? q.weight : 0),
  //   0
  // );

  // Use a memoized value so it recomputes dynamically
  //   const totalScore = React.useMemo(() => {
  //     return questions
  //       .filter((q) => !excluded[q.id]) // skip excluded questions
  //       .reduce((acc, q) => acc + (scores[q.id] ? q.weight : 0), 0);
  //   }, [scores, excluded]); // recompute whenever scores or excluded change

  const totalScore = React.useMemo(() => {
    // start with scores not excluded
    let activeExcluded = { ...excluded };

    // automatically exclude paired questions
    Object.keys(activeExcluded).forEach((id) => {
      if (activeExcluded[id] && pairedQuestions[id]) {
        pairedQuestions[id].forEach((pairId) => {
          activeExcluded[pairId] = true;
        });
      }
    });

    return questions
      .filter((q) => !activeExcluded[q.id])
      .reduce((acc, q) => acc + (scores[q.id] ? q.weight : 0), 0);
  }, [scores, excluded]);

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

  // === 6% tails ===
  const leftTailCut = mean - 1.5548 * sd; // z-score ~6% left
  const rightTailCut = mean + 1.5548 * sd; // z-score ~6% right

  //   Map percentile to 1-18 inches scale

  // === Piecewise mapping for size (inches) ===
  const mapScoreToInches = (score) => {
    const leftTailCut = mean - 1.5548 * sd; // ~6% left
    const rightTailCut = mean + 1.5548 * sd; // ~6% right

    // Helper: linear interpolation
    const interpolate = (x, x0, x1, y0, y1) =>
      y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);

    if (score <= leftTailCut) {
      // Left extreme tail: 1 → 5 inches
      return interpolate(score, leftTailCut - 10, leftTailCut, 1, 5); // extend left for smoothness
    } else if (score > leftTailCut && score <= mean) {
      // Left slope to center: 5 → 6 inches
      return interpolate(score, leftTailCut, mean, 5, 6);
    } else if (score > mean && score <= rightTailCut) {
      // Right slope to center: 6 → 7 inches
      return interpolate(score, mean, rightTailCut, 6, 7);
    } else {
      // Right extreme tail: 7 → 18 inches
      return interpolate(score, rightTailCut, rightTailCut + 10, 7, 18); // extend right for smoothness
    }
  };

  //   const sizeInInches = mapScoreToInches(totalScore);
  const sizeInInches = React.useMemo(() => {
    return mapScoreToInches(totalScore);
  }, [totalScore]);

  // === Normalized score calculation ===
  const { earnedScore, maxWeight } = questions
    .filter((q) => !excluded[q.id])
    .reduce(
      (acc, q) => {
        if (scores[q.id] !== undefined) {
          acc.earnedScore += scores[q.id] * q.weight;
          acc.maxWeight += Math.abs(q.weight);
        }
        return acc;
      },
      { earnedScore: 0, maxWeight: 0 }
    );

  const normalizedScore = maxWeight > 0 ? (earnedScore / maxWeight) * 10 : 0;

  // === Memoized normalized size ===
  const normalizedSizeInInches = React.useMemo(() => {
    return mapScoreToInches(normalizedScore);
  }, [normalizedScore]);

  // === Determine dot color based on totalScore / percentile position ===
  const getDotColor = (score) => {
    if (score <= mean - 1.5548 * sd) return "#00ff00"; // left tail → green
    else if (score >= mean + 1.5548 * sd) return "#ff0000"; // right tail → red
    else return "#ffd700"; // center → yellow
  };

  // Update chart dataset for person position
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

  // === Determine entity type based on sizeInInches ===
  let entityComment = "";
  if (sizeInInches > 9) entityComment = "Hedonistic Entity!";
  else if (sizeInInches > 8) entityComment = "Disregarded Entity!";
  else if (sizeInInches > 7)
    entityComment = "Leaning towards Disregarded Entity";
  else entityComment = comment; // use previous comment for <=7

  // === Percentile-based comment ===
  let percentileComment = "";
  if (percentile < 0.005) {
    percentileComment = "Queer"; // bottom 1%
  } else if (percentile < 0.03) {
    percentileComment = "Suitable but too good to be true, Revision Required"; // bottom 3%
  } else if (percentile >= 0.99) {
    percentileComment = "Animalistic"; // top 1%
  } else if (percentile >= 0.97) {
    percentileComment = "BDSM"; // top 3%
  } else if (totalScore <= leftTailCut) {
    percentileComment = "Revision required"; // below left 6%
  } else if (totalScore > leftTailCut && totalScore <= mean) {
    percentileComment = "Suitable to very suitable"; // left slope to top
  } else if (totalScore > rightTailCut) {
    percentileComment = "Revision required, please re-estimate"; // right tail above top 6%
  } else {
    percentileComment = "Balanced / neutral traits."; // center zone
  }

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
          <div
            key={q.id}
            className="criterion-block"
            style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
          >
            {/* Red square exclude toggle */}
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

            <label
              className="checkbox-label"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={!!scores[q.id]}
                disabled={!!excluded[q.id]} // disable if excluded
                onChange={(e) => handleChange(q.id, e.target.checked)}
              />
              <span
                className="criterion-text"
                style={{
                  marginLeft: 4,
                  color: excluded[q.id] ? "#888" : "#fff",
                  textDecoration: excluded[q.id] ? "line-through" : "none",
                }}
              >
                {q.text}
              </span>
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
          <p>
            <b>Approximate size (inches) based on percentile:</b>{" "}
            {sizeInInches.toFixed(1)}" (1–18 scale)
          </p>
          <p>
            <b>Normalized size (adjusted for answered questions):</b>{" "}
            {normalizedSizeInInches.toFixed(1)}" (1–18 scale) and{" "}
            {normalizedScore}
          </p>

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
                {totalScore}/
                {questions
                  .filter((q) => !excluded[q.id])
                  .reduce((acc, q) => acc + q.weight, 0)}
              </b>
            </p>
          </div>

          {/* Result summary */}
          <div className="summary-box" style={{ marginTop: 20 }}>
            <h3>Result for {personName}</h3>
            <textarea
              readOnly
              value={`${personName}'s score is ${totalScore}. ${entityComment}. Percentile note: ${percentileComment}\n ${totalScore}`}
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
              <br />- High f(x) = person near average (peak of the curve)
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
