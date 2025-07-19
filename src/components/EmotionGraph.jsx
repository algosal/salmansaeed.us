import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const EmotionGraph = () => {
  const navigate = useNavigate();

  const A = 10;
  const k = 0.08;
  const omega = 0.4;

  const time = Array.from({ length: 51 }, (_, i) => i);
  const sumbalEmotion = time.map(
    (t) => A * Math.sin(omega * t) * Math.exp(-k * t)
  );
  const shemialaEmotion = time.map((t) => A * Math.exp(-k * t));

  const data = {
    labels: time,
    datasets: [
      {
        label: "Sumbal (Chaos & Passion)",
        data: sumbalEmotion,
        borderColor: "#ff4c4c",
        backgroundColor: "rgba(255, 76, 76, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Shemiala (Avoidance & Silence)",
        data: shemialaEmotion,
        borderColor: "#4cc9f0",
        backgroundColor: "rgba(76, 201, 240, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.formattedValue}`,
        },
      },
      legend: {
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
        title: {
          display: true,
          text: "Time",
          color: "#ccc",
        },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#444" },
        title: {
          display: true,
          text: "Emotional Intensity",
          color: "#ccc",
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Emotional Arc: Sumbal vs. Shemiala</h2>

      <div style={styles.chartWrapper}>
        <Line key="emotion-graph" data={data} options={options} />
      </div>

      <div style={styles.equations}>
        <p style={styles.eqText}>
          <strong>Sumbal:</strong> E(t) = A · sin(ωt) · e<sup>-kt</sup>
        </p>
        <p style={styles.eqText}>
          <strong>Shemiala:</strong> E(t) = A · e<sup>-kt</sup>
        </p>
      </div>

      <div style={styles.explanation}>
        <p>
          <strong>A:</strong> Emotional amplitude (initial intensity)
        </p>
        <p>
          <strong>ω:</strong> Frequency of emotional fluctuation (chaotic
          cycles)
        </p>
        <p>
          <strong>k:</strong> Decay constant — how fast the emotions fade over
          time
        </p>
        <p>
          <strong>e:</strong> Euler’s number (~2.718) — base of natural
          logarithm, modeling organic decay or growth
        </p>
      </div>

      <blockquote style={styles.quote}>
        “In Neville Goddard’s metaphysical lens,{" "}
        <strong>emotional decay</strong> can mirror suppression of imagination
        and denial of felt experience. <strong>Shemiala</strong> embodies the
        cold withdrawal of unexpressed assumptions — not peace, but avoidance.{" "}
        <strong>Sumbal</strong>, by contrast, rides the chaotic loop of
        reactivity and unresolved passion.”
      </blockquote>
      <button
        onClick={() => (window.location.href = "/reflections")}
        style={{
          backgroundColor: "#dcdcdc",
          color: "#1f2a48",
          border: "1px solid #bbb",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginBottom: "20px",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#c0c0c0";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#dcdcdc";
        }}
      >
        ← Back to Reflections
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1f2a48",
    color: "#f8f9fc",
    padding: "40px 20px",
    fontFamily: "Inter, sans-serif",
    textAlign: "center",
    minHeight: "100vh",
  },
  header: {
    fontSize: "2rem",
    color: "#ffd700",
    marginBottom: "30px",
  },
  chartWrapper: {
    width: "90%",
    maxWidth: "800px",
    height: "400px",
    margin: "0 auto",
    backgroundColor: "#2c365a",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
  },
  equations: {
    marginTop: "30px",
    color: "#d0d0ff",
  },
  eqText: {
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  explanation: {
    marginTop: "20px",
    fontSize: "0.95rem",
    color: "#ccc",
  },
  quote: {
    marginTop: "40px",
    fontStyle: "italic",
    color: "#aadfff",
    backgroundColor: "#2a3b63",
    padding: "20px",
    borderLeft: "5px solid #4cc9f0",
    borderRadius: "8px",
    maxWidth: "700px",
    margin: "40px auto",
  },
  button: {
    marginTop: "30px",
    backgroundColor: "#ffd700",
    color: "#1f2a48",
    border: "none",
    padding: "12px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default EmotionGraph;
