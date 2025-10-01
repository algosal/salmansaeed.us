const pairedQuestions = {
  // Responsibility & Integrity
  1: [21], // avoid responsibility â†” admit mistakes
  21: [1],
  2: [22], // stay consistent with promises â†” cut corners
  22: [2],

  // Empathy & Relationships
  4: [5], // empathy â†” frequent criticism
  5: [4],
  6: [7], // prioritize material gain â†” genuinely celebrate others
  7: [6],
  23: [24], // maintain healthy friendships â†” gossip/spread rumors
  24: [23],

  // Manipulation & Trust
  8: [10], // manipulate/guilt-trip â†” admit when wrong
  10: [8],
  11: [26], // break trust â†” honor confidentiality
  26: [11],
  9: [25], // exaggerate/twist facts â†” keep secrets
  25: [9],

  // Stability & Growth
  12: [13], // consistent values â†” lose interest/withdraw
  13: [12],
  14: [28], // personal growth â†” quit commitments
  28: [14],
  15: [27], // blame others â†” stay resilient and calm
  27: [15],

  // Social & Spiritual
  16: [18], // respect boundaries â†” use others for convenience
  18: [16],
  17: [29], // public vs private â†” respect differences
  29: [17, 30],
  19: [20], // acknowledge gratitude â†” drain energy
  20: [19],
  30: [29], // act entitled â†” respect differences

  // High-intensity extremes
  q_high_6: ["q_high_7"], // long intimacy â†” very short intimacy
  q_high_7: ["q_high_6"],
};

export default pairedQuestions;
