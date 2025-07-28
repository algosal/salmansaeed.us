import React from "react";
import "../styles/DeadweightLossGraph.css";

const DeadweightLossGraph = ({ demand, supply }) => {
  const width = 700;
  const height = 400;

  const margin = { top: 40, right: 100, bottom: 50, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Clamp and convert input demand and supply (0-100) to Y coordinates on graph (price axis)
  const clamp = (v) => Math.min(Math.max(v, 0), 100);

  const safeDemand = clamp(demand);
  const safeSupply = clamp(supply);

  // Coordinates of demand line (downward sloping)
  // Demand line goes from top-left (x0, y0) to bottom-right (x1, y1)
  const demandStart = { x: margin.left, y: margin.top };
  const demandEnd = {
    x: margin.left + innerWidth,
    y: margin.top + innerHeight,
  };

  // Coordinates of supply line (upward sloping)
  // Supply line goes from bottom-left (x0, y2) to top-right (x1, y3)
  const supplyStart = { x: margin.left, y: margin.top + innerHeight };
  const supplyEnd = { x: margin.left + innerWidth, y: margin.top };

  // Map percent (0-100) to y-coordinate on price axis (vertical)
  // 0% = bottom (max y), 100% = top (min y)
  const percentToY = (percent) =>
    margin.top + innerHeight - (innerHeight * percent) / 100;

  // At right edge (x = margin.left + innerWidth), y values from inputs:
  const demandY = percentToY(safeDemand);
  const supplyY = percentToY(safeSupply);

  // Equilibrium is intersection of the two lines:
  // Demand line: y = m1 * x + b1
  // Supply line: y = m2 * x + b2
  // Calculate slopes and intercepts:

  // Demand line slope (downward)
  const mDemand = (demandEnd.y - demandStart.y) / (demandEnd.x - demandStart.x); // positive (bottom - top)/(right - left)
  const bDemand = demandStart.y - mDemand * demandStart.x;

  // Supply line slope (upward)
  const mSupply = (supplyEnd.y - supplyStart.y) / (supplyEnd.x - supplyStart.x); // negative (top - bottom)/(right - left)
  const bSupply = supplyStart.y - mSupply * supplyStart.x;

  // However, your demand line goes top-left to bottom-right: slope >0 (positive)
  // Your supply line goes bottom-left to top-right: slope <0 (negative)
  // So mDemand >0, mSupply <0

  // Solve for intersection x:
  const eqX = (bSupply - bDemand) / (mDemand - mSupply);
  const eqY = mDemand * eqX + bDemand;

  // Clamp eqX to graph bounds
  const eqXClamped = Math.min(
    Math.max(eqX, margin.left),
    margin.left + innerWidth
  );

  // Deadweight Loss area is the triangle between demand, supply and equilibrium,
  // shaded either above or below equilibrium depending on demand/supply

  // Determine which is higher at right edge:
  const showDWL = safeDemand > safeSupply; // demand > supply => deadweight loss (consumer burden)
  const showSurplus = safeSupply > safeDemand; // surplus (producer benefit)

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

        {/* Demand line (downward) */}
        <line
          x1={demandStart.x}
          y1={demandStart.y}
          x2={demandEnd.x}
          y2={demandEnd.y}
          className="demand-line"
        />
        {/* Supply line (upward) */}
        <line
          x1={supplyStart.x}
          y1={supplyStart.y}
          x2={supplyEnd.x}
          y2={supplyEnd.y}
          className="supply-line"
        />

        {/* Labels */}
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

        {/* Equilibrium marker */}
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

        {/* Equilibrium dotted guide lines */}
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

        {/* Deadweight Loss Polygon */}
        {showDWL && (
          <polygon
            points={`
              ${eqXClamped},${eqY}
              ${demandEnd.x},${demandEnd.y}
              ${demandEnd.x},${eqY}
            `}
            className="area-loss"
          />
        )}

        {/* Surplus Polygon */}
        {showSurplus && (
          <polygon
            points={`
              ${eqXClamped},${eqY}
              ${supplyEnd.x},${supplyEnd.y}
              ${supplyEnd.x},${eqY}
            `}
            className="area-surplus"
          />
        )}
      </svg>

      {/* Legend */}
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
