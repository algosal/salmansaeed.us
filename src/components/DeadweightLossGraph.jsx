import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
  LabelList,
} from "recharts";
import "../styles/DeadweightLossGraph.css";

const DeadweightLossGraph = ({ demand, supply }) => {
  const safeDemand = typeof demand === "number" && !isNaN(demand) ? demand : 0;
  const safeSupply = typeof supply === "number" && !isNaN(supply) ? supply : 0;

  const equilibrium = (safeDemand + safeSupply) / 2;
  const surplus = safeSupply - safeDemand;
  const showSurplus = surplus > 0;
  const showDWL = surplus < 0;

  const data = [
    { x: 0, demand: 100 - safeDemand, supply: safeSupply },
    { x: 50, demand: 50 - safeDemand / 2, supply: safeSupply / 2 },
    { x: 100, demand: 0, supply: 0 },
  ];

  return (
    <div className="graph-container">
      <h2>Deadweight Loss / Surplus Graph</h2>
      <div className="graph-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="x">
              <Label value="Quantity" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label value="Price" angle={-90} position="insideLeft" />
            </YAxis>

            {/* Demand Line (Downward) */}
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#00C49F"
              strokeWidth={2}
              dot={false}
              name="Demand"
            >
              <LabelList value="Demand" position="top" />
            </Line>

            {/* Supply Line (Upward) */}
            <Line
              type="monotone"
              dataKey="supply"
              stroke="#FF8042"
              strokeWidth={2}
              dot={false}
              name="Supply"
            >
              <LabelList value="Supply" position="bottom" />
            </Line>

            {/* Crosshair Reference Lines at Equilibrium */}
            <ReferenceLine
              x={50}
              stroke="black"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <ReferenceLine
              y={100 - equilibrium}
              stroke="black"
              strokeDasharray="3 3"
              strokeWidth={1}
            />

            {/* Surplus Triangle (above equilibrium) */}
            {showSurplus && (
              <>
                <polygon
                  points="50,200 50,100 100,150"
                  fill="rgba(0, 255, 0, 0.3)"
                />
                <text x="60" y="120" fill="green" fontSize="12">
                  Surplus
                </text>
              </>
            )}

            {/* DWL Triangle (below equilibrium) */}
            {showDWL && (
              <>
                <polygon
                  points="50,200 50,300 100,250"
                  fill="rgba(255, 0, 0, 0.3)"
                />
                <text x="60" y="270" fill="red" fontSize="12">
                  Deadweight Loss
                </text>
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="legend">
        <div>
          <span
            className="legend-color"
            style={{ background: "#00C49F" }}
          ></span>{" "}
          Disregard Demand
        </div>
        <div>
          <span
            className="legend-color"
            style={{ background: "#FF8042" }}
          ></span>{" "}
          Supply
        </div>
        <div>
          <span
            className="legend-color"
            style={{ background: "rgba(0,255,0,0.3)" }}
          ></span>{" "}
          Surplus
        </div>
        <div>
          <span
            className="legend-color"
            style={{ background: "rgba(255,0,0,0.3)" }}
          ></span>{" "}
          Deadweight Loss
        </div>
      </div>
    </div>
  );
};

export default DeadweightLossGraph;
