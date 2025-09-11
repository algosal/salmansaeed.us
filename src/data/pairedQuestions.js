const pairedQuestions = {
  1: [3],
  3: [1],
  2: [12],
  12: [2, 15], // combine both pairs
  4: [5],
  5: [4],
  6: [7],
  7: [6],
  8: [10],
  10: [8],
  9: [11],
  11: [9],
  13: [14],
  14: [13],
  15: [12],
  16: [18, 19], // combine both pairs
  18: [16],
  17: [20],
  20: [17],
  q_high_6: ["q_high_7"],
  q_high_7: ["q_high_6"],
};

export default pairedQuestions;
