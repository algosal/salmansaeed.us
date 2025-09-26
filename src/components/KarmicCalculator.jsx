import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function KarmicQuadrant() {
  const [baseValue, setBaseValue] = useState(50);
  const [severity, setSeverity] = useState(1.0);
  const [context, setContext] = useState(1.0);
  const [domain, setDomain] = useState(1.0);
  const [factor, setFactor] = useState(1.0);
  const [income, setIncome] = useState(0);
  const [eventType, setEventType] = useState("Non-Financial");

  // ContextFactor only for financial events
  const contextFactor =
    eventType === "Financial"
      ? Math.min(factor, 1 + 0.3 * (income / 100000))
      : 0;

  // Equal weight normalized score for plotting
  const normalizedX =
    ((context + domain + contextFactor) /
      (3 + 2 + (eventType === "Financial" ? 2 : 0))) *
    5;
  const normalizedY = ((severity + baseValue / 200) / (5 + 5)) * 5; // baseValue scaled down

  const karmicScore =
    eventType === "Financial"
      ? baseValue * severity * context * domain * (contextFactor || 1)
      : baseValue * severity * context * domain;

  const data = [
    {
      x: normalizedX,
      y: normalizedY,
      score: karmicScore,
    },
  ];

  const quadrantLabel = (x, y) => {
    if (x > 2.5 && y > 2.5) return "Heavy Karmic Debt";
    if (x > 2.5 && y <= 2.5) return "Harsh Misstep";
    if (x <= 2.5 && y > 2.5) return "Forgivable Act";
    return "Minor Ripple";
  };

  // Color based on quadrant (DR / CR)
  const dotColor = (x, y) => {
    const label = quadrantLabel(x, y);
    if (label === "Heavy Karmic Debt" || label === "Harsh Misstep")
      return "red";
    return "lightgreen";
  };

  const sliders = [
    {
      name: "BaseValue",
      value: baseValue,
      setter: setBaseValue,
      max: 1000,
      step: 1,
      desc: "Raw moral weight of action",
      example: "Birthday forgotten = 10, Fraud = 1000",
    },
    {
      name: "Severity",
      value: severity,
      setter: setSeverity,
      max: 5,
      step: 0.1,
      desc: "Intentionality / harm multiplier",
      example: "Accidental lie = 0.5, Malicious betrayal = 5",
    },
    {
      name: "Context",
      value: context,
      setter: setContext,
      max: 3,
      step: 0.1,
      desc: "Circumstances adjustment",
      example: "Needed $20 = 0.1, Took $2000 = 3",
    },
    {
      name: "Domain",
      value: domain,
      setter: setDomain,
      max: 2,
      step: 0.1,
      desc: "Domain-specific moral weight",
      example: "Family betrayal = 2, Workplace lateness = 0.5",
    },
    {
      name: "Factor",
      value: factor,
      setter: setFactor,
      max: 2,
      step: 0.1,
      desc: "Privilege / income cap adjustment",
      example:
        "Billionaire greed = 1.2 (less effect), Struggling = 1.8 (more effect)",
      financialOnly: true,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "2rem",
        background: "#0a0f24",
        borderRadius: "12px",
        color: "#f8f9fc",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#ffd700" }}>
        ⚖️ Karmic Quadrant Analyzer
      </h2>

      {/* Event Type */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
          Event Type:
        </label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          style={{
            marginLeft: "1rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid #00ffff",
            background: "#1f2a48",
            color: "#f8f9fc",
            fontWeight: "bold",
          }}
        >
          <option value="Non-Financial">Non-Financial</option>
          <option value="Financial">Financial</option>
        </select>
      </div>

      {/* Formula display */}
      <div
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #00ffff",
          borderRadius: "8px",
          background: "#1f2a48",
          color: "#00ffff",
          fontFamily: "monospace",
        }}
      >
        {eventType === "Financial" ? (
          <div>
            <strong>Financial Karmic Formula:</strong>
            <div>
              KarmicScore = BaseValue × Severity × Context × Domain ×
              ContextFactor
            </div>
            <div>ContextFactor = min(Factor, 1 + 0.3 × (Income ÷ 100,000))</div>
            <div>
              Factor: Adjusts moral weight based on privilege; struggling person
              gets more weight, billionaire less
            </div>
          </div>
        ) : (
          <div>
            <strong>Non-Financial Karmic Formula:</strong>
            <div>KarmicScore = BaseValue × Severity × Context × Domain</div>
            <div>Factor does not affect non-financial events</div>
          </div>
        )}
      </div>

      {/* Income input for financial */}
      {eventType === "Financial" && (
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Monthly Disposable Income: ${income}
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            style={{ width: "100%", padding: "0.3rem" }}
          />
          <small style={{ color: "#00ffff" }}>
            Only affects financial events (Generosity, Selfishness)
          </small>
        </div>
      )}

      {/* Sliders */}
      {sliders.map(
        (d) =>
          (!d.financialOnly || eventType === "Financial") && (
            <div key={d.name} style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>
                {d.name}: {d.value.toFixed(2)}
              </label>
              <small style={{ display: "block", color: "#00ffff" }}>
                {d.desc}
              </small>
              <small style={{ display: "block", color: "#aaa" }}>
                Example: {d.example}
              </small>
              <input
                type="range"
                min={0.1}
                max={d.max}
                step={d.step}
                value={d.value}
                onChange={(e) => d.setter(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>
          )
      )}

      {/* Karmic score display */}
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <h3>
          Karmic Score:{" "}
          <span style={{ color: karmicScore >= 0 ? "lightgreen" : "red" }}>
            {karmicScore.toFixed(2)}
          </span>
        </h3>
        <h4>
          Quadrant:{" "}
          <span style={{ color: "#ffd700" }}>
            {quadrantLabel(normalizedX, normalizedY)}
          </span>
        </h4>
      </div>

      {/* Quadrant ScatterChart */}
      <div style={{ marginTop: "2rem" }}>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke="#333" />
            <XAxis
              type="number"
              dataKey="x"
              name="Context/Domain"
              domain={[0, 5]}
              stroke="#f8f9fc"
              tickFormatter={(val) => val.toFixed(2)}
            >
              <Label
                value="Context / Domain / Factor →"
                position="insideBottom"
                fill="#ffd700"
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name="Severity/Base"
              domain={[0, 5]}
              stroke="#f8f9fc"
              tickFormatter={(val) => val.toFixed(2)}
            >
              <Label
                value="Severity / Base ↑"
                angle={-90}
                position="insideLeft"
                fill="#ffd700"
              />
            </YAxis>
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(val, name, props) => [
                `${val}`,
                `${name} | Karmic Score: ${props.payload.score.toFixed(2)}`,
              ]}
              contentStyle={{
                background: "#1f2a48",
                borderRadius: 8,
                color: "#f8f9fc",
              }}
            />
            <Scatter
              name="Event"
              data={data}
              fill={dotColor(normalizedX, normalizedY)}
              line={{ stroke: "#00ffff" }}
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* DR/CR Storyboard */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            background: "#111",
            padding: "1rem",
            borderRadius: "8px",
            color: "#f8f9fc",
          }}
        >
          <strong>📘 DR / CR Explanation</strong>
          <p>
            DR (Debit) – Negative Karmic actions (Heavy Karmic Debt, Harsh
            Misstep) – Red dot
          </p>
          <p>
            CR (Credit) – Positive Karmic actions (Forgivable Act, Minor Ripple)
            – Green dot
          </p>
          <p>Add these points in database as DR or CR depending on quadrant.</p>
        </div>
      </div>
    </div>
  );
}
