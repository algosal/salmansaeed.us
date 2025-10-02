import React, { useState } from "react";
import "./MetaIQDemo.css";

export default function MetaIQDemo() {
  const [memory, setMemory] = useState(90);
  const [reasoning, setReasoning] = useState(90);
  const [processingSpeed, setProcessingSpeed] = useState(90);
  const [imagination, setImagination] = useState(90);

  const [restState, setRestState] = useState("rested");
  const [intoxication, setIntoxication] = useState(0);
  const [mood, setMood] = useState(50);
  const [metaphysical, setMetaphysical] = useState(false);

  const [simulatedIQ, setSimulatedIQ] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [history, setHistory] = useState([]);

  function applyStateModifiers(base) {
    let score = base;
    const restModifier =
      restState === "rested" ? 1 : restState === "tired" ? 0.85 : 0.7;
    score *= restModifier;
    const intoxModifier = 1 - Math.min(intoxication, 95) / 300;
    score *= intoxModifier;
    const moodModifier = 0.9 + (mood / 100) * 0.2;
    score *= moodModifier;
    return Math.max(0, Math.min(100, score));
  }

  function computeMetaIQ(values) {
    const { mem, reas, speed, imag, meta } = values;
    const cognitiveBase = mem * 0.3 + reas * 0.3 + speed * 0.2 + imag * 0.2;
    const scaled = (cognitiveBase / 100) * 100 + 100;
    const metaMultiplier = meta ? 1 + Math.log10(1 + imag / 50) : 1;
    const final = Math.round(scaled * metaMultiplier);
    return Math.max(40, Math.min(220, final));
  }

  function runSimulation() {
    const mem = applyStateModifiers(memory);
    const reas = applyStateModifiers(reasoning);
    const speed = applyStateModifiers(processingSpeed);
    const imag = applyStateModifiers(imagination);
    const finalIQ = computeMetaIQ({
      mem,
      reas,
      speed,
      imag,
      meta: metaphysical,
    });

    const expl = `Result: ${finalIQ}.

Memory: ${Math.round(mem)}
Reasoning: ${Math.round(reas)}
Processing Speed: ${Math.round(speed)}
Imagination: ${Math.round(imag)}
Metaphysical Factor Included: ${metaphysical ? "Yes" : "No"}

Notes: Includes state and metaphysical factors.`;

    setSimulatedIQ(finalIQ);
    setExplanation(expl);

    const stamp = {
      date: new Date().toLocaleString(),
      finalIQ,
      mem: Math.round(mem),
      reas: Math.round(reas),
      speed: Math.round(speed),
      imag: Math.round(imag),
      restState,
      intoxication,
      mood,
      metaphysical,
    };
    setHistory((h) => [stamp, ...h].slice(0, 8));
  }

  function FacultyBars({ mem, reas, speed, imag }) {
    const items = [
      { key: "Memory", v: Math.round(mem) },
      { key: "Reasoning", v: Math.round(reas) },
      { key: "Speed", v: Math.round(speed) },
      { key: "Imagination", v: Math.round(imag) },
    ];

    return (
      <div className="faculty-bars">
        {items.map((it) => (
          <div key={it.key} className="faculty-row">
            <div className="faculty-label">{it.key}</div>
            <div className="faculty-bar">
              <div style={{ width: `${it.v}%` }} className="faculty-fill">
                <span className="bar-label">{it.v}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="meta-iq-container">
      <h2>MetaIQ Demonstration</h2>
      <p>
        Simulate how IQ can vary with state, imagination, and metaphysical
        factors.
      </p>

      <div className="controls">
        <div className="control-group">
          <label>
            Memory: <strong>{memory}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={memory}
            onChange={(e) => setMemory(Number(e.target.value))}
          />

          <label>
            Reasoning: <strong>{reasoning}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={reasoning}
            onChange={(e) => setReasoning(Number(e.target.value))}
          />

          <label>
            Processing Speed: <strong>{processingSpeed}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={processingSpeed}
            onChange={(e) => setProcessingSpeed(Number(e.target.value))}
          />

          <label>
            Imagination: <strong>{imagination}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={imagination}
            onChange={(e) => setImagination(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Rest State</label>
          <select
            value={restState}
            onChange={(e) => setRestState(e.target.value)}
          >
            <option value="rested">Rested</option>
            <option value="tired">Tired</option>
            <option value="exhausted">Exhausted</option>
          </select>

          <label>
            Intoxication (0 = sober): <strong>{intoxication}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={intoxication}
            onChange={(e) => setIntoxication(Number(e.target.value))}
          />

          <label>
            Mood: <strong>{mood}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
          />

          <label>
            <input
              type="checkbox"
              checked={metaphysical}
              onChange={(e) => setMetaphysical(e.target.checked)}
            />{" "}
            Include Metaphysical Factor
          </label>
        </div>
      </div>

      <div className="buttons">
        <button onClick={runSimulation}>Run Test</button>
        <button
          onClick={() => {
            setMemory(90);
            setReasoning(90);
            setProcessingSpeed(90);
            setImagination(90);
            setRestState("rested");
            setIntoxication(0);
            setMood(50);
            setMetaphysical(false);
            setSimulatedIQ(null);
            setExplanation("");
            setHistory([]);
          }}
        >
          Reset
        </button>
      </div>

      <div className="result">
        {simulatedIQ ? (
          <pre>{explanation}</pre>
        ) : (
          <p>No result yet — run the test to see simulated IQ.</p>
        )}
      </div>

      <h3>Faculty Snapshot</h3>
      <FacultyBars
        mem={applyStateModifiers(memory)}
        reas={applyStateModifiers(reasoning)}
        speed={applyStateModifiers(processingSpeed)}
        imag={applyStateModifiers(imagination)}
      />

      <h3>History</h3>
      <div className="history">
        {history.map((h, i) => (
          <div key={i} className="history-item">
            {h.date} — IQ: {h.finalIQ} — Metaphysical:{" "}
            {h.metaphysical ? "Yes" : "No"}
          </div>
        ))}
      </div>
    </div>
  );
}
