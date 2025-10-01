// utils/normalization.js

/**
 * mapNormalizedToInches
 * Dynamically calculates size in inches based on answered/excluded questions.
 * Uses the same piecewise interpolation as mapScoreToInches, but dynamically.
 * Adjusts result based on proportion of active questions to total questions.
 *
 * @param {Array} questions - full list of questions
 * @param {Array} answeredIds - IDs of answered questions
 * @param {Array} excludedIds - IDs of excluded questions
 * @param {number} mean - mean (default 0)
 * @param {number} sd - standard deviation (default 5)
 * @returns {number} - size in inches (1â€“18 scale)
 */
export const mapNormalizedToInches = (
  questions,
  answeredIds,
  excludedIds,
  mean = 0,
  sd = 5
) => {
  const activeQuestions = questions.filter((q) => !excludedIds.includes(q.id));

  // Total score from answered questions
  const totalScore = activeQuestions.reduce(
    (acc, q) => acc + (answeredIds.includes(q.id) ? q.weight ?? 1 : 0),
    0
  );

  // Proportion of active questions to total questions
  const coverageFactor = activeQuestions.length / questions.length;

  const leftTailCut = mean - 1.5548 * sd;
  const rightTailCut = mean + 1.5548 * sd;

  // Linear interpolation helper
  const interpolate = (x, x0, x1, y0, y1) =>
    y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);

  // Compute base size in inches
  let baseInches;
  if (totalScore <= leftTailCut) {
    baseInches = interpolate(totalScore, leftTailCut - 10, leftTailCut, 1, 5);
  } else if (totalScore > leftTailCut && totalScore <= mean) {
    baseInches = interpolate(totalScore, leftTailCut, mean, 5, 6);
  } else if (totalScore > mean && totalScore <= rightTailCut) {
    baseInches = interpolate(totalScore, mean, rightTailCut, 6, 7);
  } else {
    baseInches = interpolate(
      totalScore,
      rightTailCut,
      rightTailCut + 10,
      7,
      18
    );
  }

  // Adjust by coverage factor to reflect accuracy
  return baseInches * coverageFactor;
};
