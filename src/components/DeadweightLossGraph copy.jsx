import React from "react";
import "../styles/DeadweightLossGraph.css";

const DeadweightLossGraph = ({ demand, supply }) => {
  const width = 700;
  const height = 400;

  const margin = { top: 40, right: 100, bottom: 50, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const clamp = (v) => Math.min(Math.max(v, 0), 100);

  const safeDemand = clamp(demand);
  const safeSupply = clamp(supply);

  const demandStart = { x: margin.left, y: margin.top };
  const demandEnd = {
    x: margin.left + innerWidth,
    y: margin.top + innerHeight,
  };

  const supplyStart = { x: margin.left, y: margin.top + innerHeight };
  const supplyEnd = { x: margin.left + innerWidth, y: margin.top };

  const mDemand = (demandEnd.y - demandStart.y) / (demandEnd.x - demandStart.x);
  const bDemand = demandStart.y - mDemand * demandStart.x;

  const mSupply = (supplyEnd.y - supplyStart.y) / (supplyEnd.x - supplyStart.x);
  const bSupply = supplyStart.y - mSupply * supplyStart.x;

  const eqX = (bSupply - bDemand) / (mDemand - mSupply);
  const eqY = mDemand * eqX + bDemand;

  const eqXClamped = Math.min(
    Math.max(eqX, margin.left),
    margin.left + innerWidth
  );

  const showDWL = safeDemand > safeSupply;
  const showSurplus = safeSupply > safeDemand;

  return (
    <div className="graph-container">
      <h2
        className="section-title"
        style={{ textAlign: "center", marginBottom: 12 }}
      >
        Deadweight Loss Graph
      </h2>

      <svg
        width={width}
        height={height}
        className="graph-svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          x1={margin.left}
          y1={margin.top + innerHeight}
          x2={margin.left + innerWidth}
          y2={margin.top + innerHeight}
          className="axis-line"
        />
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + innerHeight}
          className="axis-line"
        />

        <line
          x1={demandStart.x}
          y1={demandStart.y}
          x2={demandEnd.x}
          y2={demandEnd.y}
          className="demand-line"
        />
        <line
          x1={supplyStart.x}
          y1={supplyStart.y}
          x2={supplyEnd.x}
          y2={supplyEnd.y}
          className="supply-line"
        />

        <text
          x={demandEnd.x - 80}
          y={demandEnd.y - 15}
          fill="#00ffff"
          fontSize={16}
          fontWeight="600"
        >
          Demand (D)
        </text>
        <text
          x={supplyEnd.x - 90}
          y={supplyEnd.y + 30}
          fill="#ffd700"
          fontSize={16}
          fontWeight="600"
        >
          Supply (S)
        </text>

        <circle cx={eqXClamped} cy={eqY} r={8} fill="#fff" />
        <text
          x={eqXClamped + 12}
          y={eqY - 12}
          fill="#fff"
          fontSize={16}
          fontWeight="600"
        >
          EQ
        </text>

        <line
          x1={eqXClamped}
          y1={eqY}
          x2={eqXClamped}
          y2={margin.top + innerHeight}
          className="dotted-line"
        />
        <line
          x1={margin.left}
          y1={eqY}
          x2={eqXClamped}
          y2={eqY}
          className="dotted-line"
        />

        {showDWL && (
          <polygon
            points={`
              ${eqXClamped},${eqY}
              ${eqXClamped - 30},${eqY - 50}
              ${eqXClamped + 30},${eqY - 50}
            `}
            className="area-loss"
          />
        )}

        {showSurplus && (
          <polygon
            points={`
              ${eqXClamped},${eqY}
              ${eqXClamped - 30},${eqY + 50}
              ${eqXClamped + 30},${eqY + 50}
            `}
            className="area-surplus"
          />
        )}
      </svg>

      <div
        style={{
          maxWidth: width,
          margin: "16px auto 0",
          display: "flex",
          justifyContent: "space-around",
          color: "#ffd700",
          fontWeight: "600",
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          gap: "1rem",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#00ffff",
              borderRadius: 3,
            }}
          />
          Demand (D)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#ffd700",
              borderRadius: 3,
            }}
          />
          Supply (S)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: "rgba(255,0,0,0.3)",
              borderRadius: 3,
              border: "1px solid crimson",
            }}
          />
          Deadweight Loss
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: "rgba(0,255,0,0.3)",
              borderRadius: 3,
              border: "1px solid #00ff00",
            }}
          />
          Surplus
        </div>
      </div>
    </div>
  );
};

export default DeadweightLossGraph;
