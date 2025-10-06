import React, { useState, useEffect, useRef } from "react";
import "./ShortMentalTraining.css";
import { defaultSteps, phrases } from "./smtData"; // <-- import here
import { useNavigate } from "react-router-dom";

export default function ShortMentalTraining() {
  const [steps] = useState(defaultSteps);
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(steps[0].duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const [journal, setJournal] = useState(() => {
    try {
      const s = localStorage.getItem("smt_journal");
      return s ? JSON.parse(s) : [];
    } catch (e) {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => setRemaining(steps[index].duration), [index, steps]);

  useEffect(() => {
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setRunning(false);
            setTimeout(() => {
              if (index < steps.length - 1) {
                setIndex((i) => i + 1);
                setRunning(true);
              }
            }, 500);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, index, steps.length]);

  const toggle = () => setRunning((r) => !r);
  const next = () => {
    setIndex((i) => Math.min(steps.length - 1, i + 1));
    setRunning(false);
  };
  const prev = () => {
    setIndex((i) => Math.max(0, i - 1));
    setRunning(false);
  };
  const reset = () => {
    setRemaining(steps[index].duration);
    setRunning(false);
  };
  const practiceAll = () => {
    setIndex(0);
    setRunning(true);
  };

  const [phrase, setPhrase] = useState(phrases[0]);
  const randomPhrase = () => {
    const p = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(p);
    try {
      navigator.clipboard.writeText(p);
    } catch (e) {}
  };

  const saveJournalEntry = (text) => {
    const entry = { text, date: new Date().toISOString() };
    const newJ = [entry, ...journal];
    setJournal(newJ);
    try {
      localStorage.setItem("smt_journal", JSON.stringify(newJ));
    } catch (e) {}
  };

  const exportLog = () => {
    try {
      const blob = new Blob(
        [journal.map((e) => `${e.date}\n${e.text}`).join("\n\n")],
        { type: "text/plain" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "smt_journal.txt";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {}
  };

  const progressPercent = Math.round(
    ((steps[index].duration - remaining) / steps[index].duration) * 100
  );

  const clearLog = () => {
    if (window.confirm("Are you sure you want to clear all journal entries?")) {
      setJournal([]);
      try {
        localStorage.removeItem("smt_journal");
      } catch (e) {}
    }
  };

  return (
    <div className="smt-container">
      <h2 className="smt-title">Short Mental Training — Practice</h2>

      <div className="smt-steps">
        <div className="smt-step-list">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`smt-step-item ${i === index ? "active" : ""}`}
              onClick={() => {
                setIndex(i);
                setRunning(false);
              }}
            >
              <div>
                <strong>
                  {i + 1}. {s.title}
                </strong>
              </div>
              <div>
                {Math.floor(s.duration / 60)}:
                {String(s.duration % 60).padStart(2, "0")}
              </div>
            </div>
          ))}
          <button onClick={practiceAll}>Practice All</button>
          <button
            onClick={() => {
              setIndex(0);
              reset();
            }}
          >
            Reset
          </button>
        </div>

        <div className="smt-main">
          <div>
            <div className="smt-step-title">{steps[index].title}</div>
            <div className="smt-description">{steps[index].description}</div>
            <div className="smt-timer">
              {Math.floor(remaining / 60)}:
              {String(remaining % 60).padStart(2, "0")}
            </div>

            <div className="smt-controls">
              <button onClick={toggle}>{running ? "Pause" : "Start"}</button>
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
              <button onClick={reset}>Reset</button>
            </div>
            <div className="smt-progress-bar-container">
              <div
                className="smt-progress-bar"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="smt-neutral-box">
              <div>
                <strong>Neutral Phrase</strong>
              </div>
              <div className="smt-neutral-phrase">{phrase}</div>
              <button onClick={randomPhrase}>Random</button>
            </div>

            <div className="smt-log-box">
              <LogBox onSave={saveJournalEntry} />
              <button onClick={exportLog}>Export Log</button>
              <button onClick={clearLog}>Clear Log</button>
            </div>
          </div>

          <div className="smt-journal">
            {journal.length === 0 && <div>No entries yet.</div>}
            {journal.map((e, i) => (
              <div key={i} className="smt-journal-entry">
                <div>{new Date(e.date).toLocaleString()}</div>
                <div>{e.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="smt-back-button"
        onClick={() => navigate("/GraphNavPanel")}
      >
        ← Back
      </button>
    </div>
  );
}

function LogBox({ onSave }) {
  const [text, setText] = useState("");
  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="One-line note (what triggered, what helped)"
        rows={3}
        style={{ width: "100%", padding: "0.5rem", borderRadius: "8px" }}
      />
      <div style={{ marginTop: "0.5rem" }}>
        <button
          onClick={() => {
            if (text.trim()) {
              onSave(text.trim());
              setText("");
            }
          }}
        >
          Save
        </button>
        <button onClick={() => setText("")}>Clear</button>
      </div>
    </div>
  );
}
