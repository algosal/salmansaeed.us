// Normal distribution (PDF)
export const normalDistribution = (x, mean = 0, sd = 1) => {
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(sd, 2));
  return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
};

// Error function (approximation)
export const erf = (x) => {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const tau =
    t *
    (0.254829592 +
      t *
        (-0.284496736 +
          t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  return sign * (1 - tau * Math.exp(-x * x));
};

// Percentile (normal CDF)
export const getPercentile = (x, mean = 0, sd = 1) =>
  0.5 * (1 + erf((x - mean) / (sd * Math.sqrt(2))));
