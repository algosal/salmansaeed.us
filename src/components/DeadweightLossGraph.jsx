import React from "react";
import "../styles/DeadweightLossGraph.css";

const DeadweightLossGraph = ({ demand, supply }) => {
  // Safety checks to avoid NaN errors
  const safeDemand = typeof demand === "number" && !isNaN(demand) ? demand : 0;
  const safeSupply = typeof supply === "number" && !isNaN(supply) ? supply : 0;

  // SVG dimensions - will scale with CSS max-width & max-height
  const width = 700; // max width desktop
  const height = 400; // max height desktop

  // Margins inside SVG
  const margin = { top: 40, right: 100, bottom: 50, left: 60 };

  // Inner drawing area
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Map percent (0-100) to x coordinate inside SVG
  const mapPercentToX = (percent) => margin.left + (innerWidth * percent) / 100;

  // Map percent (0-100) to y coordinate inside SVG (inverted Y axis)
  const mapPercentToY = (percent) =>
    margin.top + innerHeight - (innerHeight * percent) / 100;

  // Demand line: from top-left to bottom-right
  const demandStart = { x: margin.left, y: margin.top };
  const demandEnd = {
    x: margin.left + innerWidth,
    y: margin.top + innerHeight,
  };

  // Supply line: from bottom-left to top-right
  const supplyStart = { x: margin.left, y: margin.top + innerHeight };
  const supplyEnd = { x: margin.left + innerWidth, y: margin.top };

  // Equilibrium point - midpoint between demand and supply percents
  const equilibriumPercent = (safeDemand + safeSupply) / 2;
  const equilibriumX = mapPercentToX(equilibriumPercent);
  const equilibriumY = mapPercentToY(100 - equilibriumPercent);

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
        {/* Axes */}
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

        {/* Demand line dashed */}
        <line
          x1={demandStart.x}
          y1={demandStart.y}
          x2={demandEnd.x}
          y2={demandEnd.y}
          className="dotted-line"
        />

        {/* Supply line dashed */}
        <line
          x1={supplyStart.x}
          y1={supplyStart.y}
          x2={supplyEnd.x}
          y2={supplyEnd.y}
          className="dotted-line"
        />

        {/* Solid Demand Line */}
        <line
          x1={demandStart.x}
          y1={demandStart.y}
          x2={demandEnd.x}
          y2={demandEnd.y}
          className="demand-line"
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

        {/* Solid Supply Line */}
        <line
          x1={supplyStart.x}
          y1={supplyStart.y}
          x2={supplyEnd.x}
          y2={supplyEnd.y}
          className="supply-line"
        />
        <text
          x={supplyEnd.x - 90}
          y={supplyEnd.y + 30}
          fill="#ffd700"
          fontSize={16}
          fontWeight="600"
        >
          Supply (S)
        </text>

        {/* Consumer Surplus Triangle */}
        <polygon
          points={`${margin.left},${margin.top} ${equilibriumX},${equilibriumY} ${margin.left},${equilibriumY}`}
          className="area-surplus"
        />

        {/* Producer Surplus Triangle */}
        <polygon
          points={`${margin.left},${
            margin.top + innerHeight
          } ${equilibriumX},${equilibriumY} ${margin.left},${equilibriumY}`}
          className="area-loss"
        />

        {/* Equilibrium Marker */}
        <circle cx={equilibriumX} cy={equilibriumY} r={8} fill="#fff" />
        <text
          x={equilibriumX + 12}
          y={equilibriumY - 12}
          fill="#fff"
          fontSize={16}
          fontWeight="600"
        >
          EQ
        </text>

        {/* Dynamic shading for Deadweight Loss or Surplus */}
        {safeDemand > safeSupply ? (
          <polygon
            points={`
              ${equilibriumX},${equilibriumY}
              ${margin.left + innerWidth},${margin.top + innerHeight}
              ${margin.left + innerWidth},${equilibriumY}
            `}
            fill="rgba(255,0,0,0.3)"
          />
        ) : safeSupply > safeDemand ? (
          <polygon
            points={`
              ${equilibriumX},${equilibriumY}
              ${margin.left + innerWidth},${margin.top}
              ${margin.left + innerWidth},${equilibriumY}
            `}
            fill="rgba(0,255,0,0.3)"
          />
        ) : null}
      </svg>

      {/* Legend below SVG */}
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
