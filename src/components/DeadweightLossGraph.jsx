import React from "react";
import "../styles/DeadweightLossGraph.css";

const DeadweightLossGraph = ({ demand, supply }) => {
  const width = 350;
  const height = 300;

  // Margins (reduced right margin for better fit)
  const margin = { top: 40, right: 20, bottom: 50, left: 60 };

  // Inner drawing area
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Safe numeric values
  const safeDemand = typeof demand === "number" && !isNaN(demand) ? demand : 0;
  const safeSupply = typeof supply === "number" && !isNaN(supply) ? supply : 0;

  // Map percent (0-100) to x coordinate
  const mapPercentToX = (percent) => margin.left + (innerWidth * percent) / 100;

  // Map percent (0-100) to y coordinate (inverted)
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

  // Equilibrium point: midpoint between demand and supply
  const equilibriumPercent = (safeDemand + safeSupply) / 2;
  const equilibriumX = mapPercentToX(equilibriumPercent);
  const equilibriumY = mapPercentToY(100 - equilibriumPercent);

  return (
    <div
      className="page-container"
      style={{
        maxWidth: width,
        margin: "auto",
        padding: "0 15px",
        boxSizing: "border-box",
      }}
    >
      <h2
        className="section-title"
        style={{ textAlign: "center", marginBottom: 12, color: "#fff" }}
      >
        Deadweight Loss Graph
      </h2>

      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="ds-cross-graph"
        style={{
          background: "#0a0f24",
          borderRadius: 8,
          display: "block",
          margin: "auto",
        }}
      >
        {/* Axes */}
        <line
          x1={margin.left}
          y1={margin.top + innerHeight}
          x2={margin.left + innerWidth}
          y2={margin.top + innerHeight}
          stroke="#888"
          strokeWidth={1}
        />
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + innerHeight}
          stroke="#888"
          strokeWidth={1}
        />

        {/* Demand line dashed */}
        <line
          x1={demandStart.x}
          y1={demandStart.y}
          x2={demandEnd.x}
          y2={demandEnd.y}
          stroke="#666"
          strokeWidth={1}
          strokeDasharray="5,5"
        />

        {/* Supply line dashed */}
        <line
          x1={supplyStart.x}
          y1={supplyStart.y}
          x2={supplyEnd.x}
          y2={supplyEnd.y}
          stroke="#666"
          strokeWidth={1}
          strokeDasharray="5,5"
        />

        {/* Solid Demand Line */}
        <line
          x1={demandStart.x}
          y1={demandStart.y}
          x2={demandEnd.x}
          y2={demandEnd.y}
          stroke="#00ffff"
          strokeWidth={3}
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
          stroke="#ffd700"
          strokeWidth={3}
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
          fill="rgba(0,255,255,0.15)"
        />

        {/* Producer Surplus Triangle */}
        <polygon
          points={`${margin.left},${
            margin.top + innerHeight
          } ${equilibriumX},${equilibriumY} ${margin.left},${equilibriumY}`}
          fill="rgba(255,215,0,0.15)"
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
          // Deadweight Loss shaded area (red translucent polygon between demand and supply lines right of EQ)
          <polygon
            points={`
              ${equilibriumX},${equilibriumY}
              ${margin.left + innerWidth},${margin.top + innerHeight}
              ${margin.left + innerWidth},${equilibriumY}
            `}
            fill="rgba(255,0,0,0.3)"
          />
        ) : safeSupply > safeDemand ? (
          // Surplus shaded area (green translucent polygon between demand and supply lines right of EQ)
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

      {/* Legend under the graph */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-around",
          maxWidth: width,
          marginLeft: "auto",
          marginRight: "auto",
          color: "#fff",
          fontWeight: "600",
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          gap: 15,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#00ffff",
              borderRadius: 4,
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
              borderRadius: 4,
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
              borderRadius: 4,
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
              borderRadius: 4,
            }}
          />
          Surplus
        </div>
      </div>
    </div>
  );
};

export default DeadweightLossGraph;
