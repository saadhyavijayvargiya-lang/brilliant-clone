export function randomStep(pUp: number): 1 | -1 {
  return Math.random() < pUp ? 1 : -1;
}

export function runWalk(stepCount: number, pUp = 0.5): number {
  let position = 0;
  for (let i = 0; i < stepCount; i += 1) {
    position += randomStep(pUp);
  }
  return position;
}

export function runPath(stepCount: number, pUp = 0.5): number[] {
  const path = [0];
  for (let i = 0; i < stepCount; i += 1) {
    path.push(path[path.length - 1] + randomStep(pUp));
  }
  return path;
}

export function runManyTrials(
  trialCount: number,
  stepCount: number,
  pUp = 0.5
): number[] {
  return Array.from({ length: trialCount }, () => runWalk(stepCount, pUp));
}

export function buildHistogram(values: number[], binWidth = 2) {
  if (values.length === 0) return [];

  const min = Math.min(...values);
  const max = Math.max(...values);
  const start = Math.floor(min / binWidth) * binWidth;
  const end = Math.ceil(max / binWidth) * binWidth;
  const bins = new Map<number, number>();

  for (let bin = start; bin <= end; bin += binWidth) {
    bins.set(bin, 0);
  }

  for (const value of values) {
    const bin = Math.floor(value / binWidth) * binWidth;
    bins.set(bin, (bins.get(bin) ?? 0) + 1);
  }

  return Array.from(bins.entries())
    .sort(([a], [b]) => a - b)
    .map(([binStart, count]) => ({ binStart, count }));
}

export function expectedPosition(stepCount: number, pUp: number): number {
  return stepCount * (2 * pUp - 1);
}
