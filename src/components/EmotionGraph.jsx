import React, { useEffect, useRef, useState } from "react";
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
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend
);

const EmotionGraph = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [frame, setFrame] = useState(0);

  const totalFrames = 100;
  const A = 10;
  const k = 0.08;
  const omega = 0.4;
  const time = Array.from({ length: totalFrames }, (_, i) => i);

  const fullSumbal = time.map(
    (t) => A * Math.sin(omega * t) * Math.exp(-k * t)
  );
  const fullShemiala = time.map((t) => A * Math.exp(-k * t));

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: time.slice(0, frame + 1).map((t) => t.toString()),
        datasets: [
          {
            label: "🔥 Sumbal (Chaos & Passion)",
            data: fullSumbal.slice(0, frame + 1),
            borderColor: "#ff4c4c",
            backgroundColor: "rgba(255, 76, 76, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: "🧊 Shemiala (Avoidance & Silence)",
            data: fullShemiala.slice(0, frame + 1),
            borderColor: "#4cc9f0",
            backgroundColor: "rgba(76, 201, 240, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#f0f0f0",
              font: { size: 14 },
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) =>
                `${
                  context.dataset.label.split(" ")[1]
                }: ${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#ddd" },
            grid: { color: "#444" },
            title: {
              display: true,
              text: "Time",
              color: "#ccc",
            },
          },
          y: {
            ticks: { color: "#ddd" },
            grid: { color: "#444" },
            title: {
              display: true,
              text: "Emotional Intensity",
              color: "#ccc",
            },
          },
        },
      },
    });

    setChartInstance(newChart);

    return () => {
      newChart.destroy();
    };
  }, [frame]);

  useEffect(() => {
    if (frame < totalFrames - 1) {
      const timer = setTimeout(() => setFrame(frame + 1), 30);
      return () => clearTimeout(timer);
    }
  }, [frame]);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#f8f9fc",
        padding: "40px 20px",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "2rem", color: "#ffd700", marginBottom: "30px" }}>
        Emotional Arc: Sumbal vs. Shemiala
      </h2>

      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          height: "450px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#1f2a48",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
        }}
      >
        <canvas ref={chartRef} />
      </div>

      <div
        style={{
          marginTop: "30px",
          color: "#d0d0ff",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
        }}
      >
        <h3>📐 Equations</h3>
        <p>
          <strong>Sumbal:</strong> E(t) = A · sin(ωt) · e<sup>-kt</sup>
        </p>
        <p>
          <strong>Shemiala:</strong> E(t) = A · e<sup>-kt</sup>
        </p>

        <h3>🧠 Constants & Meanings</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#d0d0ff",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #555",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Constant
              </th>
              <th
                style={{
                  borderBottom: "1px solid #555",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px" }}>A</td>
              <td style={{ padding: "8px" }}>Amplitude: emotional intensity</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>ω</td>
              <td style={{ padding: "8px" }}>
                Frequency of emotional highs/lows (for Sumbal only)
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>t</td>
              <td style={{ padding: "8px" }}>Time</td>
            </tr>
            <tr>
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

        <blockquote
          style={{
            marginTop: "30px",
            fontStyle: "italic",
            color: "#aadfff",
            backgroundColor: "#1a2b46",
            padding: "20px",
            borderLeft: "5px solid #4cc9f0",
            borderRadius: "8px",
          }}
        >
          “In Neville Goddard’s metaphysical lens, emotional decay mirrors the
          suppression of imagination and denial of felt experience.{" "}
          <strong>Shemiala</strong> embodies cold withdrawal and silencing — not
          peace, but avoidance and emotional absence. <strong>Sumbal</strong>{" "}
          rides the chaotic loop of reactivity and unresolved passion.”
        </blockquote>
      </div>

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
