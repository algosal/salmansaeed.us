import React from "react";
import Navbar from "../Navbar";

const criteria = [
  {
    id: 1,
    title: "Emotional Loop Closure Test",
    emoji: "✅",
    description:
      "Is the emotional loop complete — even if unresolved externally? You don’t need apology, revenge, or reconciliation anymore. There’s no desire to fix or revisit.",
    example: "“I no longer rehearse conversations with them in my head.”",
  },
  {
    id: 2,
    title: "Diminished Nervous System Charge",
    emoji: "✅",
    description:
      "Does their name, image, or memory no longer cause a physical reaction? No spike in heart rate, anxiety, sexual longing, or anger. If they feel like a shadow, not a spark — they’re on the list.",
    example: "“They pass through my awareness like static — not signal.”",
  },
  {
    id: 3,
    title: "Non-Mutual Energetic Drain",
    emoji: "✅",
    description:
      "Was your connection mostly one-way — in energy, attention, or validation? If the connection was asymmetrical, vampiric, or transactional, you were not met — you were used.",
    example: "“Their absence brings more peace than their presence ever did.”",
  },
  {
    id: 4,
    title: "No Role in Your Higher Timeline",
    emoji: "✅",
    description:
      "When you visualize your highest self / ideal life — do they show up? If not, it means their archetypal role has ended. They're no longer encoded into your destiny.",
    example:
      "“They belong to a former version of me I no longer identify with.”",
  },
  {
    id: 5,
    title: "Symbolic Death",
    emoji: "✅",
    description:
      "Have they been transformed into an archetype, rather than a person? E.g., Sumbal is now “Chaos Muse,” not “the girl.” Shemaila becomes “The Elusive Flame.” Symbolization is death of the personal egoic charge.",
    example: "“She is a metaphor now. Not a person I want to call.”",
  },
  {
    id: 6,
    title: "Expired Karmic Contract",
    emoji: "✅",
    description:
      "Do you feel you’ve learned the lesson they were meant to teach you? If you’ve metabolized the lesson — be it faith, boundaries, discernment, or letting go — they’ve served their divine function.",
    example: "“She was not the one. She was the mirror.”",
  },
  {
    id: 7,
    title: "No Curiosity Remains",
    emoji: "✅",
    description:
      "Do you feel no urge to check their social media, ask mutual friends, or keep tabs? If you're not monitoring their timeline, your soul has moved on.",
    example: "“I no longer orbit their gravity.”",
  },
  {
    id: 8,
    title: "Neutrality Toward Closure",
    emoji: "✅",
    description:
      "If they reached out to apologize, confess love, or reconnect — would you feel no urgency to respond? This is the ultimate sign of inner release.",
    example: "“Even their return would not tempt me.”",
  },
  {
    id: 9,
    title: "Attitude Towards Life",
    emoji: "✅",
    description:
      "Does the person demonstrate consistent negativity, entitlement, or disregard for personal and collective growth? If they regularly exhibit destructive or toxic life outlooks that drain your energy and block your growth, they qualify.",
    example: "“Their worldview is a weight, not a lift.”",
  },
  {
    id: 10,
    title: "Respect for Boundaries and Others",
    emoji: "✅",
    description:
      "Does the person routinely disrespect your emotional, mental, or physical boundaries? Repeated boundary violations, gaslighting, or ignoring your consent and limits signals disqualification.",
    example: "“They never honor my limits or feelings.”",
  },
  {
    id: 11,
    title: "Consistency of Character",
    emoji: "✅",
    description:
      "Is the person’s behavior erratic, manipulative, or disingenuous over time? Untrustworthiness, two-faced behavior, or chronic dishonesty are key red flags.",
    example: "“I never know what face they’ll show up with.”",
  },
  {
    id: 12,
    title: "Accountability and Responsibility",
    emoji: "✅",
    description:
      "Does the person take ownership of their actions and apologize sincerely when wrong? Lack of accountability or shifting blame perpetuates toxic dynamics.",
    example: "“They always dodge responsibility.”",
  },
  {
    id: 13,
    title: "Energy Contribution vs. Drain",
    emoji: "✅",
    description:
      "Do they contribute positive energy, support, or growth, or do they primarily drain and destabilize? One-sided energetic relationships that only take attention and never give back belong here.",
    example: "“They suck life, but never add to it.”",
  },
  {
    id: 14,
    title: "Emotional Availability and Reciprocity",
    emoji: "✅",
    description:
      "Is there genuine mutual care and emotional availability? Or is the relationship cold, neglectful, or transactional? If the connection is emotionally barren or self-serving, they fail this test.",
    example: "“Their empathy is a mask, not a gift.”",
  },
  {
    id: 15,
    title: "Impact on Your Mental Peace",
    emoji: "✅",
    description:
      "Do thoughts of this person disturb your peace, provoke anxiety, or trigger old wounds? If they are a persistent source of mental turmoil, it’s a clear sign.",
    example: "“Their presence or memory unsettles me.”",
  },
  {
    id: 16,
    title: "Manipulation and Control Tactics",
    emoji: "✅",
    description:
      "Have they used guilt, shame, emotional blackmail, or covert manipulation? Chronic manipulators create loops that keep you entangled.",
    example: "“They pull strings to keep me hooked.”",
  },
];

const CriteriaList = () => {
  return (
    <div
      style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#eee" }}
    >
      <Navbar />
      <div
        style={{ maxWidth: 900, margin: "100px auto 50px", padding: "0 20px" }}
      >
        <h1
          style={{
            color: "#ffcc00",
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Disregarded Entity Criteria Overview
        </h1>
        <p style={{ fontSize: 16, marginBottom: 20 }}>
          This is a detailed list of criteria to help you identify and
          understand whether a person qualifies as a “Disregarded Entity” — a
          spiritually and psychologically charged classification for emotional
          sovereignty and healing.
        </p>

        {criteria.map(({ id, emoji, title, description, example }) => (
          <div
            key={id}
            style={{
              borderLeft: "4px solid #ffcc00",
              backgroundColor: "#1a1a1a",
              padding: 20,
              marginBottom: 15,
              boxShadow: "0 2px 6px rgba(255, 255, 255, 0.05)",
            }}
          >
            <h2 style={{ margin: "0 0 10px", color: "#ffcc00" }}>
              {emoji} {title}
            </h2>
            <p style={{ marginBottom: 10 }}>{description}</p>
            <em style={{ color: "#ccc" }}>{example}</em>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriteriaList;
