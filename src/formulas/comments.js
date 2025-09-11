export const getEntityComment = (sizeInInches, comment) => {
  if (sizeInInches > 9) return "Hedonistic Entity!";
  if (sizeInInches > 8) return "Disregarded Entity!";
  if (sizeInInches > 7) return "Leaning towards Disregarded Entity";
  return comment;
};

export const getPercentileComment = (
  percentile,
  totalScore,
  leftTailCut,
  rightTailCut,
  mean
) => {
  if (percentile < 0.005) return "Queer";
  if (percentile < 0.03)
    return "Suitable but too good to be true, Revision Required";
  if (percentile >= 0.99) return "Animalistic";
  if (percentile >= 0.97) return "BDSM";
  if (totalScore <= leftTailCut) return "Revision required";
  if (totalScore > leftTailCut && totalScore <= mean)
    return "Suitable to very suitable";
  if (totalScore > rightTailCut) return "Revision required, please re-estimate";
  return "Balanced / neutral traits.";
};
