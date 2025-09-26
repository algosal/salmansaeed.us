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

  // Only apply income factor for financial events
  const contextFactor =
    eventType === "Financial"
      ? Math.min(factor, 1 + 0.3 * (income / 100000)) // 30% cap for high income
      : 1;

  const karmicScore =
    eventType === "Financial"
      ? baseValue * severity * context * domain * contextFactor
      : baseValue * severity * context * domain;

  // Quadrant labels and color mapping
  const quadrantLabel = (s, c) => {
    if (s > 2.5 && c > 1.5) return "Heavy Karmic Debt";
    if (s > 2.5 && c <= 1.5) return "Harsh Misstep";
    if (s <= 2.5 && c > 1.5) return "Forgivable Act";
    return "Minor Ripple";
  };

  const quadrantColor = (s, c) => {
    if (s > 2.5 && c > 1.5) return "red"; // DR
    if (s > 2.5 && c <= 1.5) return "orange"; // mild DR
    if (s <= 2.5 && c > 1.5) return "yellow"; // neutral
    return "lightgreen"; // CR
  };

  // Definitions with examples
  const sliders = [
    {
      name: "BaseValue",
      value: baseValue,
      setter: setBaseValue,
      max: 1000,
      step: 1,
      desc: "Raw moral weight of the action",
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
      desc: "Privilege / income cap adjustment (financial only)",
      example: "Billionaire greed = 2, Struggling = 0.5",
      financialOnly: true,
    },
  ];

  // Data point for scatter
  const data = [{ severity, context, score: karmicScore }];

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

      {/* Formula display with explanations */}
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
            <div>
              <strong>BaseValue:</strong> Raw moral weight of action (e.g.,
              Birthday forgotten = 10, Fraud = 1000)
            </div>
            <div>
              <strong>Severity:</strong> Intentionality/harm multiplier
              (Accidental lie = 0.5, Malicious betrayal = 5)
            </div>
            <div>
              <strong>Context:</strong> Circumstances adjustment (Needed $20 =
              0.1, Took $2000 = 3)
            </div>
            <div>
              <strong>Domain:</strong> Domain-specific moral weight (Family
              betrayal = 2, Workplace lateness = 0.5)
            </div>
            <div>
              <strong>ContextFactor:</strong> min(Factor, 1 + 0.3 × (Income ÷
              100,000))
            </div>
          </div>
        ) : (
          <div>
            <strong>Non-Financial Karmic Formula:</strong>
            <div>KarmicScore = BaseValue × Severity × Context × Domain</div>
            <div>
              <strong>BaseValue:</strong> Raw moral weight of action (e.g.,
              Saying sorry = 1, Betrayal = 100)
            </div>
            <div>
              <strong>Severity:</strong> Intentionality/harm multiplier (Minor
              mistake = 0.5, Major intentional harm = 5)
            </div>
            <div>
              <strong>Context:</strong> Circumstances adjustment (Small
              misunderstanding = 0.5, Large impact = 3)
            </div>
            <div>
              <strong>Domain:</strong> Domain-specific moral weight (Family = 2,
              Workplace = 1)
            </div>
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
      {sliders.map((d) => {
        if (d.financialOnly && eventType === "Non-Financial") return null;
        return (
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
        );
      })}

      {/* Karmic score display */}
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <h3>
          Karmic Score:{" "}
          <span style={{ color: quadrantColor(severity, context) }}>
            {karmicScore.toFixed(2)}
          </span>
        </h3>
        <h4>
          Quadrant:{" "}
          <span style={{ color: "#ffd700" }}>
            {quadrantLabel(severity, context)}
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
              dataKey="severity"
              name="Severity"
              domain={[0, 5]}
              stroke="#f8f9fc"
            >
              <Label
                value="Severity →"
                position="insideBottom"
                fill="#ffd700"
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="context"
              name="Context"
              domain={[0, 3]}
              stroke="#f8f9fc"
            >
              <Label
                value="Context ↑"
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
              fill={quadrantColor(severity, context)}
              line={{ stroke: quadrantColor(severity, context) }}
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* DR / CR guidance box */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          border: "1px solid #00ffff",
          borderRadius: "8px",
          background: "#1f2a48",
          color: "#00ffff",
        }}
      >
        <strong>Database Guidance (DR / CR):</strong>
        <div>
          <span style={{ color: "red" }}>Red / DR:</span> Events in "Heavy
          Karmic Debt" quadrant.
          <span style={{ color: "orange" }}> Orange / mild DR:</span> "Harsh
          Misstep" quadrant.
          <span style={{ color: "yellow" }}> Yellow / neutral:</span>{" "}
          "Forgivable Act".
          <span style={{ color: "lightgreen" }}> Green / CR:</span> "Minor
          Ripple".
        </div>
      </div>
    </div>
  );
}
