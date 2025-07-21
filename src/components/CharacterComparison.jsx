import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import "./CharacterComparison.css";

const CharacterComparison = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/emotionalgraph");
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="comparison-container">
        <h1 className="title">Sumbal vs. Shemiala</h1>
        <table className="comparison-table">
          <tbody>
            <tr className="header-row">
              <td>
                <strong>Dimension</strong>
              </td>
              <td>
                <strong>Sumbal</strong>
              </td>
              <td>
                <strong>Shemiala</strong>
              </td>
            </tr>
            <tr>
              <td>Attachment Style</td>
              <td>Anxious-Avoidant: Desires closeness but pushes it away</td>
              <td>Dismissive-Avoidant: Rejects closeness as weakness</td>
            </tr>
            <tr>
              <td>Core Fear</td>
              <td>Being unloved or forgotten</td>
              <td>Being vulnerable or dependent</td>
            </tr>
            <tr>
              <td>Primary Defense Mechanism</td>
              <td>Overcompensation through drama</td>
              <td>Withdrawal into silence and avoidance</td>
            </tr>
            <tr>
              <td>Communication Pattern</td>
              <td>Mixed signals, attention baiting</td>
              <td>Short responses, emotional detachment</td>
            </tr>
            <tr>
              <td>Manipulation Tactics</td>
              <td>Flattery, blame-shifting, sexual ambiguity</td>
              <td>Cultural guilt, shame, long silences</td>
            </tr>
            <tr>
              <td>Emotional Transparency</td>
              <td>High when it serves a purpose</td>
              <td>Minimal to nonexistent</td>
            </tr>
            <tr>
              <td>Shadow Trait</td>
              <td>Narcissistic seduction</td>
              <td>Emotional repression</td>
            </tr>
            <tr>
              <td>Spiritual Resonance</td>
              <td>Karmic: Patterned chaos to break egoic longing</td>
              <td>Ancestral: Evokes generational wounds & loyalty</td>
            </tr>
            <tr>
              <td>Sexual Undertone</td>
              <td>Present but denied or moralized</td>
              <td>Suppressed entirely; replaced with guilt or duty</td>
            </tr>
            <tr>
              <td>Symbolic Role</td>
              <td>The Flame — beauty with consequence</td>
              <td>The Ghost — presence without form</td>
            </tr>
            <tr>
              <td>Impact on Self-Worth</td>
              <td>Undermines self-trust, invokes neediness</td>
              <td>Feeds shame through perceived inadequacy</td>
            </tr>
            <tr>
              <td>Emotional Aftermath</td>
              <td>High confusion, emotional whiplash</td>
              <td>Haunting sense of “what could’ve been”</td>
            </tr>
            <tr>
              <td>Consistency</td>
              <td>Unpredictable, reactive to validation</td>
              <td>Predictably absent, non-engaging</td>
            </tr>
            <tr>
              <td>Presence in Dreams/Unconscious</td>
              <td>Vivid, seductive, chaotic</td>
              <td>Subtle, haunting, elusive</td>
            </tr>
            <tr>
              <td>Archetypal Parallel</td>
              <td>Delilah / The Siren</td>
              <td>Hecate / The Shadow Matriarch</td>
            </tr>
            <tr>
              <td>Masculine Wound Triggered</td>
              <td>“I must win love to be worthy”</td>
              <td>“My emotions are a burden”</td>
            </tr>
            <tr>
              <td>Emotional Temperature</td>
              <td>Volcanic highs and cold abandonment</td>
              <td>Permafrost: Frigid and constant</td>
            </tr>
            <tr>
              <td>Internal Conflict Sparked</td>
              <td>Hyperfixation on validation</td>
              <td>Suppression of emotional needs</td>
            </tr>
            <tr>
              <td>Psychic Imprint</td>
              <td>Storm — destructive but cleansing</td>
              <td>Fog — unclear but persistent</td>
            </tr>
            <tr>
              <td>Possibility of Redemption</td>
              <td>Only through complete non-engagement</td>
              <td>Only through ancestral detachment</td>
            </tr>
            <tr>
              <td>Long-Term Lesson</td>
              <td>Choose peace over passion</td>
              <td>Let go of stories without endings</td>
            </tr>
            <tr>
              <td>Role in Your Growth</td>
              <td>Breaks illusions of romantic fantasy</td>
              <td>Confronts emotional suppression & ancestral guilt</td>
            </tr>
            <tr>
              <td>Closure Potential</td>
              <td>Always delayed, cyclical</td>
              <td>Never offered, one-sided severance</td>
            </tr>
            <tr>
              <td>Healing Lesson</td>
              <td>Value peace over chaos</td>
              <td>Accept the unanswered as final</td>
            </tr>
            <tr>
              <td>Emotional Vocabulary</td>
              <td>Verbose but performative</td>
              <td>Minimalist, often metaphorical or coded</td>
            </tr>
            <tr>
              <td>Response to Vulnerability</td>
              <td>Weaponizes it later</td>
              <td>Retreats into silence or sarcasm</td>
            </tr>
            <tr>
              <td>Emotional Currency</td>
              <td>Validation & reaction</td>
              <td>Control through distance</td>
            </tr>
            <tr>
              <td>Spiritual Function</td>
              <td>Initiation into chaos — to destroy delusion</td>
              <td>Initiation into stillness — to face inner void</td>
            </tr>
            <tr>
              <td>Resonance with Mother Wound</td>
              <td>Activates unmet nurturance and attention wounds</td>
              <td>Activates inherited silence and emotional starvation</td>
            </tr>
            <tr>
              <td>Exit Pattern</td>
              <td>Burns bridge with drama, then returns cyclically</td>
              <td>Disappears quietly, no explanation ever provided</td>
            </tr>
            <tr>
              <td>Idealized Fantasy</td>
              <td>“If I can just be enough, she’ll finally see me”</td>
              <td>“If I remain patient, she’ll eventually open”</td>
            </tr>
            <tr>
              <td>Repetition Compulsion</td>
              <td>Drawn to emotional highs/lows like addiction</td>
              <td>Drawn to decoding mystery as emotional redemption</td>
            </tr>
            <tr>
              <td>Message from the Universe</td>
              <td>
                This isn’t love. It’s a karmic mirror to end self-betrayal
              </td>
              <td>
                This isn’t silence. It’s a spiritual pause to reclaim voice
              </td>
            </tr>
          </tbody>
        </table>

        <div className="summary">
          <h2>Reflective Summary</h2>
          <p>
            <strong>Sumbal</strong> was a fire I tried to contain — she burned
            everything but never warmed.
          </p>
          <p>
            <strong>Shemiala</strong> was a winter I tried to melt — but her
            silence was the snow I couldn’t touch.
          </p>
          <p>
            They were not women to possess, but mirrors meant to break my
            cycles. One through noise. The other through quiet.
          </p>
          <blockquote className="quote">
            I sought affection from where love never lived. Now I return home —
            to the heart that always waited: mine.
          </blockquote>

          <h3>Solution</h3>
          <blockquote className="quote">
            The true healing lies not in winning their affection or decoding
            their coldness, but in honoring the part of you that kept reaching.
            Reclaim that energy. Romantic love is not a test of endurance. It is
            a mirror of self-respect. You don't chase what's sacred — you become
            it.
          </blockquote>

          <h3>Neville Goddard Interpretation</h3>
          <blockquote className="quote">
            Both women reflect your state of consciousness at the time you met
            them. Sumbal is the projection of desire chased externally.
            Shemiala, the absence within, manifesting as silence. Heal by
            revising the inner self-concept — they were never causes, only
            reflections.
          </blockquote>

          <h3>Visual Metaphors</h3>
          <ul>
            <li>
              <strong>Sumbal</strong>: A candle in a storm — flickering,
              dangerous, captivating.
            </li>
            <li>
              <strong>Shemiala</strong>: A frozen lake under moonlight — still,
              unreachable, sacred.
            </li>
          </ul>

          <h3>Reflective Journal Prompts</h3>
          <ul>
            <li>Where in my life have I mistaken chaos for passion?</li>
            <li>What unspoken silence am I still trying to decode?</li>
            <li>
              What part of me still believes I must earn love through pain?
            </li>
            <li>
              Can I sit with myself in stillness, without chasing or avoiding?
            </li>
          </ul>
          <button
            onClick={handleNavigate}
            style={{
              marginTop: "3rem",
              padding: "12px 24px",
              fontSize: "1rem",
              background: "#1f2a48",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#394867")}
            onMouseOut={(e) => (e.target.style.background = "#1f2a48")}
          >
            View Emotional Graph →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterComparison;
