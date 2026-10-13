export function detectColumnType(values) {
  const nonNull = values.filter(
    (v) => v !== "" && v !== "N/A" && v !== null && v !== undefined && v !== "null"
  );
  if (nonNull.length === 0) return "Unknown";
  const allNumbers = nonNull.every((v) => !isNaN(Number(v)));
  if (allNumbers) {
    const hasFloat = nonNull.some((v) => String(v).includes("."));
    return hasFloat ? "Float (Number)" : "Integer (Number)";
  }
  const datePattern = /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$|^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/;
  if (nonNull.every((v) => datePattern.test(v) || (!isNaN(Date.parse(v)) && isNaN(Number(v)) && v.length >= 8))) {
    return "Date";
  }
  return "String (Text)";
}

export function computeColumnStats(values) {
  const numericValues = values.map((v) => Number(v)).filter((v) => !isNaN(v));
  if (numericValues.length === 0) return null;

  const count = numericValues.length;
  const sum = numericValues.reduce((a, b) => a + b, 0);
  const mean = sum / count;
  const sorted = [...numericValues].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const variance =
    numericValues.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) /
    (count > 1 ? count - 1 : 1);
  const std = Math.sqrt(variance);

  const getPercentile = (p) => {
    const idx = (sorted.length - 1) * p;
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    if (upper === lower) return sorted[idx];
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  return {
    count,
    mean: mean.toFixed(2),
    std: std.toFixed(2),
    min: min,
    p25: getPercentile(0.25).toFixed(2),
    median: getPercentile(0.5).toFixed(2),
    p75: getPercentile(0.75).toFixed(2),
    max: max
  };
}

export function analyzeQuality(headers, rows) {
  let totalMissing = 0;
  const missingByCol = {};

  headers.forEach((h, c) => {
    let colMiss = 0;
    rows.forEach((r) => {
      const v = r[c];
      if (v === undefined || v === null || String(v).trim() === "" || v === "N/A" || v === "null") {
        colMiss++;
        totalMissing++;
      }
    });
    missingByCol[h] = colMiss;
  });

  const uniqueRowStrings = new Set();
  let duplicateRowsCount = 0;
  rows.forEach((r) => {
    const key = JSON.stringify(r);
    if (uniqueRowStrings.has(key)) {
      duplicateRowsCount++;
    } else {
      uniqueRowStrings.add(key);
    }
  });

  const totalCells = headers.length * rows.length;
  const completeness =
    totalCells > 0 ? (((totalCells - totalMissing) / totalCells) * 100).toFixed(1) : "100.0";

  return {
    totalMissing,
    missingByCol,
    duplicateRowsCount,
    completeness
  };
}
