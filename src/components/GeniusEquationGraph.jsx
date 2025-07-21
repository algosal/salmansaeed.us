import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./Navbar";

const headerStyle = {
  position: "fixed",
  top: 0,
  left: 220, // desktop: leave space for sidebar
  right: 0,
  backgroundColor: "#121212",
  color: "#ffcc00",
  borderBottom: "1px solid #333",
  padding: "15px 30px",
  fontSize: "2.5rem",
  fontWeight: "bold",
  zIndex: 150,
  height: 80,
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
};

const GeniusEquationGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // generate data on mount
    const generateData = () => {
      const data = [];
      for (let t = 0; t <= 100; t += 5) {
        const EQ = 280 + 20 * Math.sin(t / 7);
        const IQ = 200 + 20 * Math.sin(t / 3);
        const SC = 80 + 50 * Math.exp(-Math.pow((t - 50) / 18, 2));
        const CO = 70 + 25 * Math.sin(t / 5);
        const H = 50 - 10 * Math.sin(t / 20);

        const genius =
          (Math.pow(EQ, 1.08) *
            Math.pow(IQ, 1.08) *
            Math.pow(SC, 1.12) *
            Math.pow(CO, 1.06)) /
          Math.pow(H, 1.1) /
          1e8;

        data.push({
          time: t,
          EQ: EQ.toFixed(2),
          IQ: IQ.toFixed(2),
          SC: SC.toFixed(2),
          CO: CO.toFixed(2),
          H: H.toFixed(2),
          Genius: parseFloat(genius.toFixed(4)),
        });
      }
      return data;
    };

    setData(generateData());
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#222",
            padding: "10px",
            border: "1px solid #888",
            color: "#fff",
            fontSize: "0.9rem",
          }}
        >
          <p>
            <strong>Time:</strong> {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name === "Genius"
                ? `${entry.name}: ${entry.value} × 10⁸`
                : `${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#000",
        color: "#f0f0f0",
      }}
    >
      {/* Sidebar Navbar */}
      <Navbar />

      {/* Main content container with marginLeft for sidebar */}
      <div
        className="page"
        style={{
          flexGrow: 1,
          padding: "40px 20px",
          marginLeft: 220,
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Fixed header styled exactly like Corporate */}
        <header style={headerStyle}>Genius Equation</header>

        {/* Add margin top equal to header height + some spacing */}
        <div
          style={{
            marginTop: 100,
            maxWidth: 900,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p
            style={{ color: "#aaa", marginBottom: "30px", fontStyle: "italic" }}
          >
            * Genius values are scaled down by 10⁸ for visualization for{" "}
            <strong>سلمان سعید</strong>
          </p>

          <div
            style={{
              backgroundColor: "#111f3f",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
              marginBottom: "30px",
            }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "#ddd" }}
                  label={{
                    value: "Time (t)",
                    position: "insideBottomRight",
                    offset: -5,
                    fill: "#aaa",
                  }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: "#ddd" }}
                  label={{
                    value: "Metric Value",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#aaa",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#ffd700" }}
                  label={{
                    value: "Genius × 10⁸",
                    angle: 90,
                    position: "insideRight",
                    fill: "#ffd700",
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#f0f0f0" }} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Genius"
                  stroke="#ffd700"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="EQ"
                  stroke="#ff4c4c"
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="IQ"
                  stroke="#4cc9f0"
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="SC"
                  stroke="#2ca02c"
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="CO"
                  stroke="#ff7f50"
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="H"
                  stroke="#9467bd"
                  strokeDasharray="2 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              fontSize: "0.95rem",
              color: "#ccc",
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.7",
            }}
          >
            <p>
              <strong>EQ</strong>: Emotional Depth — amplification of empathy
              and sensitivity. Drives resonance and interpersonal mastery.
            </p>
            <p>
              <strong>IQ</strong>: Cognitive Intelligence — oscillates around
              the genius benchmark of 200. Measures logical velocity and
              abstract structuring.
            </p>
            <p>
              <strong>SC</strong>: Spiritual Clarity — awareness beyond form,
              peaking during transcendental moments.
            </p>
            <p>
              <strong>CO</strong>: Creative Originality — novelty generation,
              lateral synthesis, and imaginative intuition.
            </p>
            <p>
              <strong>H</strong>: Humility — inner silence and ego death.
              Inverse factor because excessive ego distorts all other faculties.
            </p>
          </div>
        </div>
      </div>

      {/* Responsive CSS for mobile */}
      <style>{`
        @media (max-width: 768px) {
          header {
            position: fixed !important;
            top: 50px !important; /* below mobile navbar height */
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            padding: 15px 20px !important;
            font-size: 2rem !important;
            border-bottom: 1px solid #333 !important;
            z-index: 1500 !important;
            height: 60px !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }
          .page {
            margin-left: 0 !important;
            margin-top: 110px !important; /* navbar + header */
            padding: 20px 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GeniusEquationGraph;
