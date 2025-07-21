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

// Generate evolving metric data
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
      1e10;

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

const GeniusEquationGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  return (
    <div
      className="page"
      style={{
        backgroundColor: "#000",
        color: "#f0f0f0",
        padding: "40px 20px",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2rem", color: "#ffd700", marginBottom: "30px" }}>
        Genius Equation Dynamics
      </h2>

      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          margin: "0 auto",
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
              tick={{ fill: "#ddd" }}
              label={{
                value: "Metric Value",
                angle: -90,
                position: "insideLeft",
                fill: "#aaa",
              }}
            />
            <Tooltip />
            <Legend wrapperStyle={{ color: "#f0f0f0" }} />
            <Line
              type="monotone"
              dataKey="Genius"
              stroke="#ffd700"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="EQ"
              stroke="#ff4c4c"
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="IQ"
              stroke="#4cc9f0"
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="SC"
              stroke="#2ca02c"
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="CO"
              stroke="#ff7f50"
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
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
          <strong>EQ</strong>: Emotional Depth — amplification of empathy and
          sensitivity. Drives resonance and interpersonal mastery.
        </p>
        <p>
          <strong>IQ</strong>: Cognitive Intelligence — oscillates around the
          genius benchmark of 200. Measures logical velocity and abstract
          structuring.
        </p>
        <p>
          <strong>SC</strong>: Spiritual Clarity — awareness beyond form,
          peaking during transcendental moments. Raised to <sup>1.12</sup> to
          reflect its nonlinear perception amplification.
        </p>
        <p>
          <strong>CO</strong>: Creative Originality — novelty generation,
          lateral synthesis, and imaginative intuition. Power <sup>1.06</sup>{" "}
          due to its subtler but persistent contribution.
        </p>
        <p>
          <strong>H</strong>: Humility — inner silence and ego death. Inverse
          factor raised to <sup>1.1</sup> because excessive ego distorts all
          other faculties.
        </p>
        <p style={{ marginTop: "20px", fontStyle: "italic", color: "#aadfff" }}>
          Genius = [(EQ<sup>1.08</sup> × IQ<sup>1.08</sup> × SC<sup>1.12</sup> ×
          CO<sup>1.06</sup>) ÷ H<sup>1.1</sup>] ÷ 10<sup>10</sup>
        </p>
      </div>
    </div>
  );
};

export default GeniusEquationGraph;
