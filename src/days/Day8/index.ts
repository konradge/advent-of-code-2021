const segmentNumbers = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

let outputValues: string[][];
let signalPatterns: string[][];

export const init = (input: string) => {
  // Initialization
  outputValues = input
    .split("\n")
    .map((line) => line.split(" | ")[1].split(" "));
  signalPatterns = input
    .split("\n")
    .map((line) => line.split(" | ")[0].split(" "));
};

export const part1 = (input: string) => {
  // Part 1: Count the signals, that have a length of 2, 3, 4 or 7
  return outputValues
    .flatMap((x) => x)
    .reduce((acc, signal) => acc + Number(isUnique(signal)), 0);
};

// Tests wether a signal must be a specific number (1, 7, 4, 8)
const isUnique = (signal: string) =>
  signal.length === 2 ||
  signal.length === 4 ||
  signal.length === 3 ||
  signal.length === 7;

const getNumbers = (wires: string[], map) => {
  const x = Object.keys(numberToSegments).findIndex(
    (num) =>
      wires
        .map((w) => map[w][0])
        .sort()
        .join("") === numberToSegments[num].sort().join("")
  );
  return x;
};

const allLetters = ["a", "b", "c", "d", "e", "f", "g"];
const numberToSegments: { [key: string]: string[] } = {
  "0": ["a", "b", "c", "e", "f", "g"],
  "1": ["c", "f"],
  "2": ["a", "c", "d", "e", "g"],
  "3": ["a", "c", "d", "f", "g"],
  "4": ["b", "c", "d", "f"],
  "5": ["a", "b", "d", "f", "g"],
  "6": ["a", "b", "d", "e", "f", "g"],
  "7": ["a", "c", "f"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
};

const complement = (letters: string[]) =>
  allLetters.filter((l) => !letters.includes(l));

const lengthToSegment: { [key: number]: string[] } = {};
Object.keys(numberToSegments).forEach(
  (num) =>
    (lengthToSegment[numberToSegments[num].length] = [
      ...(lengthToSegment[num] || []),
      ...numberToSegments[num],
    ])
);

export const part2 = (input: string) => {
  // Iterate over the different pattern-sequences (line by line)
  return signalPatterns.reduce((acc, signalSequence, lineIndex) => {
    // Maps the segments of the display to the mixed wires
    const segmentsToWires: { [key: string]: string[] } = {};

    allLetters.forEach((letter) => (segmentsToWires[letter] = [...allLetters]));

    // Handle unique signals
    signalSequence
      .filter((s) => isUnique(s))
      .forEach((signal) => {
        const usedSegments =
          numberToSegments[
            Object.keys(numberToSegments).find(
              (num) => numberToSegments[num].length === signal.length
            )
          ];

        updateMap(segmentsToWires, usedSegments, signal);
      });

    // Handle ununique signals
    const ununiqueSignals = signalSequence.filter((s) => !isUnique(s));

    // Find 3:
    const three = ununiqueSignals
      .filter((signal) => signal.length === 5)
      .find(
        (signal) =>
          signal.includes(segmentsToWires["c"][0]) &&
          signal.includes(segmentsToWires["c"][1])
      );
    updateMap(segmentsToWires, numberToSegments["3"], three);

    // Find 2:
    const two = ununiqueSignals
      .filter((signal) => signal.length === 5 && signal !== three)
      .find((signal) => signal.includes(segmentsToWires["e"][0]));

    updateMap(segmentsToWires, numberToSegments["2"], two);

    const outputSignals = outputValues[lineIndex].map((signal) =>
      signal.split("").map((wire) => findKeyByValue(segmentsToWires, wire))
    );

    const outputNumbers = outputSignals.map((signal) =>
      Object.keys(numberToSegments).find(
        (key) =>
          numberToSegments[key].sort().join(",") === signal.sort().join(",")
      )
    );

    // Accumulate
    return (
      acc +
      outputNumbers
        .reverse()
        .reduce((a, n, i) => a + Number(n) * Math.pow(10, i), 0)
    );
  }, 0);
};

const updateMap = (map, usedSegments, signal) => {
  // Remove other wires than the current ones from the possible segments
  usedSegments.forEach(
    (wire) => (map[wire] = intersect(map[wire], signal.split("")))
  );

  // Remove all wires, that are needed for the current number, from all other segments
  complement(usedSegments).forEach(
    (wire) => (map[wire] = intersect(map[wire], complement(signal.split(""))))
  );
};

const intersect = (arr1: any[], arr2: any[]) => {
  return unique([
    ...arr1.filter((v) => arr2.includes(v)),
    ...arr2.filter((v) => arr1.includes(v)),
  ]);
};

const unique = (arr: any[]) => arr.filter((v, i, a) => a.indexOf(v) === i);

const findKeyByValue = (map: { [key: string]: any[] }, value: any) => {
  return Object.keys(map).find((key) => map[key][0] === value);
};

export const cleanup = () => {
  // Cleanup
};
