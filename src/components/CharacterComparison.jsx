import React from "react";
import "./CharacterComparison.css";

const CharacterComparison = () => {
  return (
    <div className="comparison-container">
      <h1 className="title">Sumbal vs. Shemiala</h1>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Sumbal</th>
            <th>Shemiala</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Attachment Style</td>
            <td>Anxious-Avoidant: Craves connection but sabotages it</td>
            <td>Dismissive-Avoidant: Withdraws, cuts off emotionally</td>
          </tr>
          {/* Add more rows as needed */}
          {/* Repeated rows to make page scroll */}
          <tr>
            <td>Honesty & Integrity</td>
            <td>Lies about past, sex, and finances</td>
            <td>Hides behind cultural norms, unclear motives</td>
          </tr>
          <tr>
            <td>Emotional Availability</td>
            <td>Superficially high but unstable</td>
            <td>Emotionally withdrawn, avoids intimacy</td>
          </tr>
          <tr>
            <td>Communication Pattern</td>
            <td>Hot and cold, delays with excuses</td>
            <td>Abrupt exits, hangs up without closure</td>
          </tr>
          <tr>
            <td>Manipulation Tactics</td>
            <td>Victimhood, guilt-tripping, flattery</td>
            <td>Cultural guilt, emotional silence</td>
          </tr>
          <tr>
            <td>Spiritual Resonance</td>
            <td>Karmic – tests your self-worth</td>
            <td>Ancestral – evokes guilt, silence</td>
          </tr>
          <tr>
            <td>Sexual Undertone</td>
            <td>Implied, denies truth</td>
            <td>Suppressed, hidden behind modesty</td>
          </tr>
          <tr>
            <td>What She Represents</td>
            <td>Costly Flame – seductive but chaotic</td>
            <td>Fated Ghost – symbolic, unresolved</td>
          </tr>
          <tr>
            <td>Emotional Impact on You</td>
            <td>Draining, confusing, chaotic</td>
            <td>Abandonment, guilt, unfinished</td>
          </tr>
          <tr>
            <td>Healing Lesson</td>
            <td>Value peace over chaos</td>
            <td>Accept the unanswered as final</td>
          </tr>
        </tbody>
      </table>
      <div className="summary">
        <h2>Reflective Summary</h2>
        <p>
          <strong>Sumbal</strong> is a storm that flirts with the shore —
          promising rain, giving thunder, then vanishing before she waters
          anything.
        </p>
        <p>
          <strong>Shemiala</strong> is not chaotic — she’s cold. She doesn’t
          promise love — she lets absence do the talking.
        </p>
        <p>
          Both women mirror something unhealed inside. One tests your boundaries
          with affection, the other with silence. And both ultimately teach the
          same thing:
        </p>
        <blockquote>
          You are not a beggar for attention. You are the peace you seek.
        </blockquote>
      </div>
    </div>
  );
};

export default CharacterComparison;
