import React, { useEffect, useRef } from "react";
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
import { FaIceCube, FaFire } from "react-icons/fa";

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

const EmotionGraph = () => {
  const chartRef = useRef(null);

  // Constants
  const A = 10;
  const k = 0.08;
  const omega = 0.4;
  const totalPoints = 50;

  // Prepare full data arrays
  const time = Array.from({ length: totalPoints + 1 }, (_, i) => i);
  const fullSumbalEmotion = time.map(
    (t) => A * Math.sin(omega * t) * Math.exp(-k * t)
  );
  const fullShemialaEmotion = time.map((t) => A * Math.exp(-k * t));

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Custom plugin to progressively draw lines from left to right
    const drawProgressPlugin = {
      id: "drawProgress",
      beforeDatasetsDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { left, right },
          scales: { x },
        } = chart;

        const progress = options.progress ?? 1;

        // Clip the chart drawing area horizontally according to progress
        ctx.save();
        const clipWidth = left + (right - left) * progress;
        ctx.beginPath();
        ctx.rect(left, 0, clipWidth - left, chart.height);
        ctx.clip();
      },
      afterDatasetsDraw(chart) {
        chart.ctx.restore();
      },
    };

    let progress = 0;
    let animationFrameId;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: time.slice().reverse(), // reverse X-axis
        datasets: [
          {
            label: "🔥 Sumbal (Chaos & Passion)",
            data: fullSumbalEmotion.slice().reverse(),
            borderColor: "#ff4c4c",
            backgroundColor: "rgba(255, 76, 76, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: "🧊 Shemiala (Avoidance & Silence)",
            data: fullShemialaEmotion.slice().reverse(),
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
        animation: false, // disable default animations so custom plugin controls drawing
        plugins: {
          legend: {
            labels: {
              color: "#f0f0f0",
              font: { size: 14 },
              boxWidth: 0,
              usePointStyle: false,
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
          drawProgress: {
            progress: 1,
          },
        },
        scales: {
          x: {
            reverse: true,
            ticks: { color: "#ddd" },
            grid: { color: "#333" },
            title: {
              display: true,
              text: "Time",
              color: "#aaa",
            },
          },
          y: {
            ticks: { color: "#ddd" },
            grid: { color: "#333" },
            title: {
              display: true,
              text: "Emotional Intensity",
              color: "#aaa",
            },
            beginAtZero: true,
          },
        },
      },
      plugins: [drawProgressPlugin],
    });

    function animate() {
      progress += 0.01; // increase progress by 1% per frame ~60fps -> ~1.6s animation
      if (progress > 1) progress = 1;
      chart.options.plugins.drawProgress.progress = progress;
      chart.update();

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      chart.destroy();
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Emotional Arc: Sumbal vs. Shemiala</h2>

      <div style={styles.chartWrapper}>
        <canvas ref={chartRef} style={{ maxWidth: "100%", height: "400px" }} />
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
          <strong>A:</strong> Amplitude: emotional intensity
        </p>
        <p>
          <strong>ω:</strong> Frequency of emotional highs/lows (for Sumbal
          only)
        </p>
        <p>
          <strong>t:</strong> Time
        </p>
        <p>
          <strong>k:</strong> Decay constant — the higher the k, the faster the
          emotion fades
        </p>
        <p>
          <strong>e:</strong> Euler’s number ≈ 2.718, the natural base of
          exponential decay
        </p>
      </div>

      <blockquote style={styles.quote}>
        “In Neville Goddard’s metaphysical lens,{" "}
        <strong>emotional decay</strong> reflects suppression of imagination and
        denial of felt experience.
        <strong> Shemiala</strong> embodies cold withdrawal and silence —
        avoidance rather than peace.
        <strong> Sumbal</strong> rides chaotic loops of reactivity and
        unresolved passion.”
      </blockquote>

      <button
        onClick={() => (window.location.href = "/reflections")}
        style={styles.button}
        onMouseOver={(e) => (e.target.style.background = "#394867")}
        onMouseOut={(e) => (e.target.style.background = "#1f2a48")}
      >
        ← Back to Reflections
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#000000",
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
    maxWidth: "900px",
    height: "400px",
    margin: "0 auto 40px",
    backgroundColor: "#111f3f",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
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
    backgroundColor: "#1a294b",
    padding: "20px",
    borderLeft: "5px solid #4cc9f0",
    borderRadius: "8px",
    maxWidth: "700px",
    margin: "40px auto",
  },
  button: {
    marginTop: "2rem",
    padding: "12px 24px",
    fontSize: "1rem",
    background: "#1f2a48",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default EmotionGraph;
