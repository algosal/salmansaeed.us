// Linear interpolation helper
const interpolate = (x, x0, x1, y0, y1) =>
  y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);

// Map score â†’ size in inches (piecewise)
export const mapScoreToInches = (score, mean = 0, sd = 5) => {
  const leftTailCut = mean - 1.5548 * sd;
  const rightTailCut = mean + 1.5548 * sd;

  if (score <= leftTailCut) {
    return interpolate(score, leftTailCut - 10, leftTailCut, 1, 5);
  } else if (score > leftTailCut && score <= mean) {
    return interpolate(score, leftTailCut, mean, 5, 6);
  } else if (score > mean && score <= rightTailCut) {
    return interpolate(score, mean, rightTailCut, 6, 7);
  } else {
    return interpolate(score, rightTailCut, rightTailCut + 10, 7, 18);
  }
};
