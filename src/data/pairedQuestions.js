const pairedQuestions = {
  // Responsibility & Integrity
  1: [3],
  3: [1],
  2: [21, 22], // combine all pairs
  21: [2, 22],
  22: [2, 21],

  // Empathy & Relationships
  4: [5],
  5: [4],
  6: [7],
  7: [6],
  23: [24],
  24: [23],

  // Manipulation & Trust
  8: [10],
  10: [8],
  25: [26],
  26: [25],

  // Stability & Growth
  13: [14, 28], // combine all pairs
  14: [13],
  28: [13],

  // Social & Spiritual
  16: [18],
  18: [16],
  19: [20],
  20: [19],
  29: [30],
  30: [29],

  // High-intensity extremes
  q_high_6: ["q_high_7"],
  q_high_7: ["q_high_6"],
};

export default pairedQuestions;
