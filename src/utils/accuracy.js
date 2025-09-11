// utils/accuracy.js

/**
 * calculateAccuracyRates
 * Computes success and error rates based on exclusions vs total questions.
 *
 * @param {Array} questions - full list of questions
 * @param {Array} excludedIds - IDs of excluded questions
 * @returns {Object} - { successRate, errorRate }
 */
export const calculateAccuracyRates = (questions, excludedIds) => {
  const totalQuestions = questions.length;

  const errorRate = excludedIds.length / totalQuestions;
  const successRate = (totalQuestions - excludedIds.length) / totalQuestions;

  return { successRate, errorRate };
};
