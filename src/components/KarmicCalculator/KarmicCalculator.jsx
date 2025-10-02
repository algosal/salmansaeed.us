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
import { useNavigate } from "react-router-dom";

export default function KarmicQuadrant() {
  const [baseValue, setBaseValue] = useState(50);
  const [severity, setSeverity] = useState(1.0);
  const [context, setContext] = useState(1.0);
  const [domain, setDomain] = useState(1.0);
  const [factor, setFactor] = useState(1.0);
  const [income, setIncome] = useState(0);
  const [eventType, setEventType] = useState("Non-Financial");
  const [amountAsked, setAmountAsked] = useState(0);
  const navigate = useNavigate();

  // const computeContextFactor = (factor, income, amountAsked) => {
  //   const comfortThresholdStruggling = 1000;
  //   const billionaireThreshold = 100000;
  //   let contextFactor = 1;

  //   if (income <= 5000) {
  //     contextFactor = 1 + amountAsked / comfortThresholdStruggling;
  //   } else if (income > 5000 && income <= billionaireThreshold) {
  //     const comfortAmount = income * 0.01;
  //     contextFactor = Math.min(2, 1 + amountAsked / comfortAmount);
  //   } else {
  //     if (amountAsked <= 1000) {
  //       contextFactor = 1;
  //     } else {
  //       contextFactor = 1 + (amountAsked - 1000) / 100000;
  //     }
  //   }
  //   return contextFactor;
  // };
  const computeContextFactor = (factor, income, amountAsked) => {
    const base =
      income <= 5000
        ? 1 + amountAsked / 1000
        : income <= 100000
        ? Math.min(2, 1 + amountAsked / (income * 0.01))
        : amountAsked <= 1000
        ? 1
        : 1 + (amountAsked - 1000) / 100000;

    return Math.min(factor, base); // 🔑 Factor acts as a cap
  };

  const contextFactor =
    eventType === "Financial"
      ? computeContextFactor(factor, income, amountAsked)
      : 0;

  const karmicScore =
    eventType === "Financial"
      ? baseValue * severity * context * domain * contextFactor
      : baseValue * severity * domain;

  const normalizedX =
    eventType === "Financial"
      ? ((context + domain + contextFactor) / (3 + 2 + 2)) * 5
      : (domain / 2) * 5;

  const normalizedY =
    eventType === "Financial"
      ? ((severity + baseValue / 200) / (5 + 5)) * 5
      : ((severity + baseValue / 200) / (5 + 5)) * 5;

  const data = [
    {
      x: normalizedX,
      y: normalizedY,
      severity,
      context,
      domain,
      factor: contextFactor,
      score: karmicScore,
    },
  ];

  const quadrantLabel = (x, y) => {
    if (x > 2.5 && y > 2.5) return "Heavy Karmic Debt";
    if (x > 2.5 && y <= 2.5) return "Harsh Misstep";
    if (x <= 2.5 && y > 2.5) return "Forgivable Act";
    return "Minor Ripple";
  };

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
      financialOnly: true,
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

  const currentDotColor = dotColor(normalizedX, normalizedY);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const severityVal = data.severity ? data.severity.toFixed(2) : "-";
      const contextVal = data.context ? data.context.toFixed(2) : "-";
      const domainVal = data.domain ? data.domain.toFixed(2) : "-";
      const factorVal = data.factor ? data.factor.toFixed(2) : "-";
      const scoreVal = data.score ? data.score.toFixed(2) : "-";

      return (
        <div
          style={{
            background: "#0a0f24",
            color: "#ffffff",
            border: "1px solid #00ffff",
            borderRadius: 8,
            padding: "8px",
            fontSize: "14px",
          }}
        >
          <div>
            <strong>Severity:</strong> {severityVal}
          </div>
          <div>
            <strong>Context:</strong> {contextVal}
          </div>
          <div>
            <strong>Domain:</strong> {domainVal}
          </div>
          <div>
            <strong>Factor:</strong> {factorVal}
          </div>
          <div>
            <strong>Karmic Score:</strong> {scoreVal}
          </div>
        </div>
      );
    }
    return null;
  };

  const xPercent = ((normalizedX / 5) * 100).toFixed(2);
  const yPercent = ((normalizedY / 5) * 100).toFixed(2);

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

      <button
        onClick={() => navigate("/GraphNavPanel")}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "1px solid #00ffff",
          background: "#1f2a48",
          color: "#ffd700",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        ← Back
      </button>

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
            <div>KarmicScore = BaseValue × Severity × Domain</div>
            <div>Context and Factor do not affect non-financial events</div>
          </div>
        )}
      </div>

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

      {eventType === "Financial" && (
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "bold" }}>
            Amount Asked: ${amountAsked}
          </label>
          <input
            type="number"
            value={amountAsked}
            onChange={(e) => setAmountAsked(Number(e.target.value))}
            style={{ width: "100%", padding: "0.3rem" }}
          />
          <small style={{ color: "#00ffff" }}>
            How much money is being requested / involved in this event
          </small>
        </div>
      )}

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
                min={0.0}
                max={d.max}
                step={d.step}
                value={d.value}
                onChange={(e) => d.setter(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>
          )
      )}

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <h3>
          Karmic Score:{" "}
          <span style={{ color: currentDotColor }}>
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

      <div style={{ marginTop: "2rem" }}>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 50, left: 20 }}>
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
                dy={55} // pushed further down
                offset={20}
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
                offset={0}
              />
            </YAxis>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Scatter
              name="Event"
              data={data}
              fill={currentDotColor}
              line={{ stroke: "#00ffff" }}
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

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
            padding: "1.5rem",
            borderRadius: "10px",
            color: "#f8f9fc",
            lineHeight: 1.6,
            fontSize: "15px",
            border: "1px solid #00ffff",
          }}
        >
          <strong style={{ fontSize: "16px", color: "#ffd700" }}>
            📘 DR / CR Explanation
          </strong>
          <p>
            <span style={{ color: "red", fontWeight: "bold" }}>DR (Debit)</span>{" "}
            – Negative Karmic actions (Heavy Karmic Debt, Harsh Misstep) – Red
            dot
          </p>
          <p>
            <span style={{ color: "lightgreen", fontWeight: "bold" }}>
              CR (Credit)
            </span>{" "}
            – Positive Karmic actions (Forgivable Act, Minor Ripple) – Green dot
          </p>
          <p>Add these points in database as DR or CR depending on quadrant.</p>
        </div>
        <div
          style={{
            background: "#111",
            padding: "1rem",
            borderRadius: "8px",
            color: "#f8f9fc",
          }}
        >
          <p>
            <strong>Current X Tendency Towards Malice(% of max):</strong>{" "}
            {xPercent}% | <strong>Current Y Intensity (% of max):</strong>{" "}
            {yPercent}%
          </p>
        </div>
      </div>
    </div>
  );
}
