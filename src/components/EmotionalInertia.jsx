import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Navbar from "./Navbar";
import "./EmotionalInertia.css";

const EmotionalInertia = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Data for Thought (T), Emotional Lag (L), Emotional Load (S)
    // Using sample functions for demonstration:
    // T(t) = 10 * sin(0.3 * t) + 10 (Thought leading)
    // L(t) = 0.7 * T(t - 3) (Lagging response, shifted right)
    // S(t) = Integral from 0 to t of (T(u) - L(u)) du (Emotional load)

    const totalPoints = 60;
    const labels = Array.from({ length: totalPoints }, (_, i) => i);

    // Generate T and L data arrays:
    const T = labels.map((t) => 10 * Math.sin(0.3 * t) + 10);

    // For lag, shift by 3 points, pad with initial values
    const lagShift = 3;
    const L = labels.map((t) =>
      t - lagShift >= 0 ? 0.7 * T[t - lagShift] : 0
    );

    // Calculate emotional load S as cumulative integral approx (sum of differences)
    const S = [];
    let cumSum = 0;
    for (let i = 0; i < totalPoints; i++) {
      // difference T - L, approximate integral by summing differences
      const diff = T[i] - L[i];
      cumSum += diff > 0 ? diff : 0; // only positive differences contribute
      S.push(cumSum);
    }

    // Prepare datasets
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

    // Destroy previous chart if any
    let chartInstance;
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          legend: {
            labels: {
              color: "#eee",
              font: { size: 14 },
            },
          },
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
            title: {
              display: true,
              text: "Value",
              color: "#aaa",
            },
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
            title: {
              display: true,
              text: "Time (t)",
              color: "#aaa",
            },
          },
        },
      },
    });

    // Attach instance for cleanup
    chartRef.current.chartInstance = chartInstance;

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      {/* <header className="header">Emotional Inertia</header> */}
      <h2 className="section-title">Emotional Inertia</h2>

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
                <strong>Lag creates friction:</strong> This delay causes doubt,
                impatience, or self-sabotage when the emotional state hasn't
                “caught up.”
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

          {/* Graph Container */}
          <div className="chart-wrapper">
            <canvas ref={chartRef} />
          </div>

          {/* Equations with integrals */}
          <div className="equations">
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
        </section>
      </main>
      <footer className="footer">© سلمان سعید</footer>
    </div>
  );
};

export default EmotionalInertia;
