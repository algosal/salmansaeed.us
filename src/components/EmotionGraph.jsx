import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const EmotionGraph = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Full data arrays (precomputed)
  const A = 10;
  const k = 0.08;
  const omega = 0.4;
  const totalPoints = 51;
  const time = Array.from({ length: totalPoints }, (_, i) => i);
  const fullSumbal = time.map(
    (t) => A * Math.sin(omega * t) * Math.exp(-k * t)
  );
  const fullShemiala = time.map((t) => A * Math.exp(-k * t));

  // State to hold how many points are currently displayed
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Initialize empty datasets (no data points yet)
    const initialData = {
      labels: [],
      datasets: [
        {
          label: "Sumbal (Chaos & Passion)",
          data: [],
          borderColor: "#ff4c4c",
          backgroundColor: "rgba(255, 76, 76, 0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          label: "Shemiala (Avoidance & Silence)",
          data: [],
          borderColor: "#4cc9f0",
          backgroundColor: "rgba(76, 201, 240, 0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
        },
      ],
    };

    // Create chart once
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: initialData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300,
          easing: "easeInOutSine",
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label;
                const val = context.parsed.y.toFixed(2);
                return `${label}: ${val}`;
              },
            },
            backgroundColor: "#222",
            titleColor: "#ffd700",
            bodyColor: "#fff",
            cornerRadius: 6,
            displayColors: false,
            bodyFont: { size: 14 },
            titleFont: { size: 16, weight: "bold" },
          },
          legend: {
            labels: {
              color: "#fff",
              font: { size: 16 },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (t)",
              color: "#fff",
              font: { size: 16 },
            },
            ticks: {
              color: "#ddd",
              font: { size: 12 },
            },
            grid: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Emotional Intensity",
              color: "#fff",
              font: { size: 16 },
            },
            ticks: {
              color: "#ddd",
              font: { size: 12 },
            },
            grid: {
              color: "rgba(255,255,255,0.1)",
            },
            min: 0,
            max: A + 2,
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (displayCount < totalPoints) {
      const timeout = setTimeout(() => {
        setDisplayCount(displayCount + 1);
      }, 60); // Controls speed of growth (60ms per point)

      // Update chart data for current displayCount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.labels = time.slice(0, displayCount);
        chartInstanceRef.current.data.datasets[0].data = fullSumbal.slice(
          0,
          displayCount
        );
        chartInstanceRef.current.data.datasets[1].data = fullShemiala.slice(
          0,
          displayCount
        );
        chartInstanceRef.current.update();
      }

      return () => clearTimeout(timeout);
    }
  }, [displayCount, time, fullSumbal, fullShemiala]);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#ffd700", fontSize: "2rem", marginBottom: "30px" }}>
        Emotional Trajectory: Sumbal vs Shemiala
      </h2>

      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "900px",
          height: "400px",
          margin: "0 auto",
        }}
      >
        <canvas ref={chartRef} />
      </div>

      {/* Explanation Table */}
      <table
        style={{
          margin: "40px auto",
          maxWidth: "600px",
          width: "90%",
          borderCollapse: "collapse",
          color: "#ddd",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <th style={{ padding: "10px" }}>Constant</th>
            <th style={{ padding: "10px" }}>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <td style={{ padding: "8px" }}>A</td>
            <td style={{ padding: "8px" }}>Amplitude: emotional intensity</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <td style={{ padding: "8px" }}>ω</td>
            <td style={{ padding: "8px" }}>
              Frequency of emotional highs/lows (Sumbal only)
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <td style={{ padding: "8px" }}>t</td>
            <td style={{ padding: "8px" }}>Time</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <td style={{ padding: "8px" }}>k</td>
            <td style={{ padding: "8px" }}>
              Decay constant — the higher the k, the faster the emotion fades
            </td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>e</td>
            <td style={{ padding: "8px" }}>
              Euler’s number ≈ 2.718, the natural base of exponential decay
            </td>
          </tr>
        </tbody>
      </table>

      {/* Neville Goddard Interpretation */}
      <blockquote
        style={{
          fontStyle: "italic",
          color: "#aadfff",
          maxWidth: "700px",
          margin: "40px auto",
          backgroundColor: "#101a33",
          padding: "20px",
          borderLeft: "6px solid #4cc9f0",
          borderRadius: "8px",
          fontSize: "1.1rem",
          lineHeight: "1.5",
        }}
      >
        “In Neville Goddard’s metaphysical lens,{" "}
        <strong>emotional decay</strong> represents the silencing of internal
        emotions as a coping mechanism. <strong>Shemiala</strong> embodies cold
        avoidance and self-imposed silence — an icy emotional wall, not peace.{" "}
        <strong>Sumbal</strong> burns with chaotic passion that flickers but
        fades.”
      </blockquote>

      {/* Back Button */}
      <button
        onClick={() => (window.location.href = "/reflections")}
        style={{
          marginTop: "2rem",
          padding: "12px 24px",
          fontSize: "1rem",
          background: "#1f2a48",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#394867")}
        onMouseOut={(e) => (e.target.style.background = "#1f2a48")}
      >
        ← Back to Reflections
      </button>
    </div>
  );
};

export default EmotionGraph;
