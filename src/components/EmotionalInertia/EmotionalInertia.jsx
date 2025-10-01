import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import Navbar from "../Navbar";

import "./EmotionalInertia.css";

const EmotionalInertia = () => {
  const chartRef = useRef(null);
  const [showLagModal, setShowLagModal] = useState(false);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const totalPoints = 60;
    const labels = Array.from({ length: totalPoints }, (_, i) => i);

    const T = labels.map((t) => 10 * Math.sin(0.3 * t) + 10);

    const lagShift = 3;
    const L = labels.map((t) =>
      t - lagShift >= 0 ? 0.7 * T[t - lagShift] : 0
    );

    const S = [];
    let cumSum = 0;
    for (let i = 0; i < totalPoints; i++) {
      const diff = T[i] - L[i];
      cumSum += diff > 0 ? diff : 0;
      S.push(cumSum);
    }

    const datasets = [
      {
        label: "Thought (T)",
        data: T,
        borderColor: "#ffd700",
        fill: false,
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: "Lagging Response (L)",
        data: L,
        borderColor: "#4cc9f0",
        fill: false,
        borderDash: [6, 4],
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: "Emotional Load (S)",
        data: S,
        borderColor: "#ff6b6b",
        backgroundColor: "rgba(255, 107, 107, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        yAxisID: "right",
      },
    ];

    let chartInstance;
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        stacked: false,
        plugins: {
          legend: { labels: { color: "#eee", font: { size: 14 } } },
          tooltip: {
            enabled: true,
            backgroundColor: "#222",
            titleColor: "#ffd700",
            bodyColor: "#eee",
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          y: {
            type: "linear",
            position: "left",
            ticks: { color: "#eee" },
            grid: { color: "#333" },
            title: { display: true, text: "Value", color: "#aaa" },
          },
          right: {
            type: "linear",
            position: "right",
            ticks: { color: "#ff6b6b" },
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: "Emotional Load (Integral)",
              color: "#ff6b6b",
            },
            beginAtZero: true,
            min: 0,
          },
          x: {
            ticks: { color: "#ddd" },
            grid: { color: "#333" },
            title: { display: true, text: "Time (t)", color: "#aaa" },
          },
        },
      },
    });

    chartRef.current.chartInstance = chartInstance;

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <header className="header">Emotional Inertia</header>

      <main className="main-content">
        <section className="card">
          <h1 className="heading">Emotional Inertia</h1>
          <p className="intro">
            Emotional Inertia is the silent delay between insight and
            integration. It explains why a powerful realization today might only
            feel real weeks later — because{" "}
            <strong>emotion takes time to catch up with thought.</strong>
          </p>

          <ul className="qualities-list">
            <li>
              <span className="emoji">🧠</span>
              <span>
                <strong>Thought leads:</strong> The conscious mind aligns first
                — affirmations, intention, belief.
              </span>
            </li>
            <li>
              <span className="emoji">💓</span>
              <span>
                <strong>Emotion follows:</strong> The body, heart, and nervous
                system require time to recalibrate.
              </span>
            </li>
            <li>
              <span className="emoji">⚖️</span>
              <span>
                <strong>Lag creates friction:</strong>{" "}
                <button
                  className="info-button"
                  onClick={() => setShowLagModal(true)}
                >
                  What is lagging response?
                </button>
              </span>
            </li>
            <li>
              <span className="emoji">🌊</span>
              <span>
                <strong>Inertia is natural:</strong> Just as waves need time to
                settle, your inner system transitions with grace, not speed.
              </span>
            </li>
            <li>
              <span className="emoji">🕰️</span>
              <span>
                <strong>Trust the timing:</strong> Manifestation only locks in
                when your <strong>feeling</strong> matches your{" "}
                <strong>knowing</strong>.
              </span>
            </li>
          </ul>

          <p className="closing-note">
            If Mental Momentum is the arrow, Emotional Inertia is the arc of its
            release — surrendering to time while trusting your trajectory.
          </p>

          <div className="chart-wrapper">
            <canvas ref={chartRef} />
          </div>

          {/* Equations (keep redundancy) */}
          <div className="equations">
            <h3>Story Board</h3>
            <p>
              <strong>Thought (T):</strong> T(t) = 10 · sin(0.3t) + 10
            </p>
            <p>
              <strong>Lagging Response (L):</strong> L(t) = 0.7 · T(t - 3)
              (shifted by lag)
            </p>
            <p>
              <strong>Emotional Load (S):</strong> S(t) = ∫₀ᵗ max(0, T(u) -
              L(u)) du
            </p>
          </div>
          <div className="equations">
            <h3>Equations</h3>
            <BlockMath math={`T(t) = 10 \\cdot \\sin(0.3 t) + 10`} />
            <BlockMath math={`L(t) = 0.7 \\cdot T(t - 3)`} />
            <BlockMath math={`S(t) = \\int_0^t \\max(0, T(u) - L(u)) \\, du`} />
          </div>
        </section>
      </main>
      <footer className="footer">© سلمان سعید</footer>

      {/* Lagging Response Modal */}
      {showLagModal && (
        <div
          className="lag-modal"
          onClick={() => setShowLagModal(false)}
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
            <h3 style={{ color: "#ffd700" }}>Lagging Response (L)</h3>
            <p>
              Lagging Response models how your emotions react after a delay to
              conscious thought. In this model:
            </p>
            <ul>
              <li>
                <strong>T(t)</strong> is the thought at time t.
              </li>
              <li>
                <strong>L(t)</strong> is the emotional reaction at time t,
                delayed by 3 units: L(t) = 0.7 · T(t - 3)
              </li>
              <li>
                The factor 0.7 indicates emotions may be less intense than the
                thought.
              </li>
              <li>
                This delay explains why emotion often "catches up" after
                cognition.
              </li>
            </ul>
            <p>
              During the lag, friction or doubt may arise because your feeling
              hasn’t yet aligned with your knowing.
            </p>
            <p>
              This delay causes doubt, impatience, or self-sabotage when the
              emotional state hasn't “caught up.”
            </p>
            <button
              onClick={() => setShowLagModal(false)}
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

export default EmotionalInertia;
