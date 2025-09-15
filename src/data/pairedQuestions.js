const pairedQuestions = {
  // Responsibility & Integrity
  1: [3], // Avoid responsibility ↔ Make excuses
  3: [1],
  2: [22], // Stay consistent ↔ Cut corners
  22: [2],
  21: [22], // Admit mistakes ↔ Cut corners
  22: [21],

  // Empathy & Relationships
  4: [5], // Empathy ↔ Criticize
  5: [4],
  6: [7], // Prioritize material gain ↔ Celebrate success
  7: [6],
  23: [24], // Healthy friendships ↔ Gossip
  24: [23],

  // Manipulation & Trust
  8: [10], // Manipulate ↔ Admit wrong
  10: [8],
  25: [26], // Keep secrets ↔ Honor confidentiality (inverse behavior)
  26: [25],

  // Stability & Growth
  13: [28], // Withdraw ↔ Quit commitments
  28: [13],
  14: [13], // Seek growth ↔ Withdraw (opposite behavior)
  13: [14],

  // Social & Spiritual
  16: [18], // Respect boundaries ↔ Use others
  18: [16],
  19: [20], // Gratitude ↔ Drain energy
  20: [19],
  29: [30], // Respect differences ↔ Act entitled
  30: [29],

  // High-intensity extremes
  q_high_6: ["q_high_7"], // More time ↔ Less time
  q_high_7: ["q_high_6"],
};

export default pairedQuestions;
