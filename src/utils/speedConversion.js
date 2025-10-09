export function metresPerSecondToKilometersPerHour(speed) {
  const inKph = Math.round(speed * 3.6);
  return inKph;
}

export function metresPerSecondToMilesPerHour(speed) {
  const inMph = Math.round(speed * 2.23693629);
  return inMph;
}
