import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import "./EmotionalInertia.css"; // We'll create this CSS separately

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
  Filler
);

const EmotionalInertia = () => {
  const chartRef = useRef(null);

  // Constants for graph curves
  const A = 10;
  const k = 0.05;
  const omega = 0.3;
  const totalPoints = 50;

  // Time points
  const time = Array.from({ length: totalPoints + 1 }, (_, i) => i);

  // Thought - leading sine wave
  const thought = time.map((t) => A * Math.sin(omega * t));

  // Emotional Response - lagging sine wave with decay and delay
  const emotionalResponse = time.map((t) => {
    const delay = 5;
    return t - delay >= 0
      ? A * Math.sin(omega * (t - delay)) * Math.exp(-k * t)
      : 0;
  });

  // Emotional Load - cumulative sum of absolute emotional response
  let cumulative = 0;
  const emotionalLoad = emotionalResponse.map((val) => {
    cumulative += Math.abs(val);
    return cumulative;
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Thought (Leading)",
            data: thought,
            borderColor: "#4cc9f0",
            backgroundColor: "rgba(76, 201, 240, 0.2)",
            fill: false,
            tension: 0.3,
            pointRadius: 0,
          },
          {
            label: "Emotional Response (Lagging)",
            data: emotionalResponse,
            borderColor: "#ff6b6b",
            backgroundColor: "rgba(255, 107, 107, 0.2)",
            fill: false,
            tension: 0.3,
            pointRadius: 0,
          },
          {
            label: "Emotional Load (Cumulative)",
            data: emotionalLoad,
            borderColor: "#ffd700",
            backgroundColor: "rgba(255, 215, 0, 0.4)",
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            yAxisID: "emotionalLoadAxis",
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "nearest",
          intersect: false,
        },
        plugins: {
          legend: {
            labels: {
              color: "#eee",
              font: { size: 14 },
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${context.parsed.y.toFixed(
                  2
                )}`;
              },
              afterBody: () => [
                "Definitions:",
                "Lagging Response: The delay between thought and emotional reaction.",
                "Emotional Load: The cumulative 'stress' or 'energy' carried over time.",
              ],
            },
            backgroundColor: "#222",
            titleColor: "#ffd700",
            bodyColor: "#eee",
            footerColor: "#ddd",
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Value",
              color: "#ffd700",
            },
            ticks: { color: "#ddd" },
            grid: { color: "#444" },
          },
          emotionalLoadAxis: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Emotional Load",
              color: "#ffd700",
            },
            grid: { drawOnChartArea: false },
            ticks: { color: "#ffd700" },
          },
          x: {
            title: {
              display: true,
              text: "Time",
              color: "#aaa",
            },
            ticks: { color: "#ddd" },
            grid: { color: "#333" },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="emotional-inertia-container">
      <header className="emotional-inertia-header">Emotional Inertia</header>

      <div className="emotional-inertia-wrapper">
        <Navbar />
        <main className="emotional-inertia-main">
          <div className="emotional-inertia-card">
            <h1>Emotional Inertia</h1>
            <p className="intro">
              Emotional Inertia is the silent delay between insight and
              integration. It explains why a powerful realization today might
              only feel real weeks later — because{" "}
              <strong>emotion takes time to catch up with thought.</strong>
            </p>

            <ul className="qualities-list">
              <li>
                <span className="emoji">🧠</span>
                <span>
                  <strong>Thought leads:</strong> The conscious mind aligns
                  first — affirmations, intention, belief.
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
                  <strong>Lag creates friction:</strong> This delay causes
                  doubt, impatience, or self-sabotage when the emotional state
                  hasn't “caught up.”
                </span>
              </li>
              <li>
                <span className="emoji">🌊</span>
                <span>
                  <strong>Inertia is natural:</strong> Just as waves need time
                  to settle, your inner system transitions with grace, not
                  speed.
                </span>
              </li>
              <li>
                <span className="emoji">🕰️</span>
                <span>
                  <strong>Trust the timing:</strong> Manifestation only locks in
                  when your <em>feeling</em> matches your <em>knowing</em>.
                </span>
              </li>
            </ul>

            <p className="closing-note">
              If Mental Momentum is the arrow, Emotional Inertia is the arc of
              its release — surrendering to time while trusting your trajectory.
            </p>

            <div className="graph-container">
              <canvas ref={chartRef} />
            </div>
          </div>
        </main>
      </div>

      <footer>© سلمان سعید</footer>
    </div>
  );
};

export default EmotionalInertia;
