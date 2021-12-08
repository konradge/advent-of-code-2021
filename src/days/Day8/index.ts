import parse from "../../aoc/parse";

const segmentNumbers = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

export const init = (input: string) => {
  // Initialization
  parse(input);
};

export const part1 = (input: string) => {
  // Part 1
  return input
    .replace(/\s\|\s/g, "|")
    .split("\n")
    .map((line: string) => line.split("|")[1])
    .map((line) => line.split(" ").filter((val) => isUnique(val)).length)
    .reduce((acc, line) => acc + line, 0);
};

const isUnique = (val: string) =>
  val.length === 2 || val.length === 4 || val.length === 3 || val.length === 7;

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

const equalArray = (a: any[], b: any[]) => a.every((val, i) => val === b[i]);

export const part2 = (input: string) => {
  const outputs = input.split("\n").map((l) => l.split(" | ")[1]);

  let res = 0;
  input
    .replace(/\s\|\s/g, "|")
    .replace(/ /g, ",")
    .split("\n")
    .map((line) => line.split("|")[0])
    .forEach((line, i) => {
      // Reset mapping for each line
      const map: { [key: string]: string[] } = {};
      // Build map
      allLetters.forEach((letter) => (map[letter] = [...allLetters]));

      line
        .split(/[|,]/)
        .filter((a) => isUnique(a) || a.length === 5)
        .sort((a, b) => (isUnique(a) ? -1 : 1))
        .forEach((signal) => {
          // Iterate over the signals from this line
          findMappings(signal, map);
        });

      const mixedWireToActualWire = {};
      Object.keys(map).forEach(
        (key) => (mixedWireToActualWire[map[key][0]] = key)
      );

      outputs[i]
        .split(" ")
        .reverse()
        .map((o, index) => {
          const x =
            Math.pow(10, index) *
            getNumbers(o.split(""), mixedWireToActualWire);
          res += x;
        });
    });

  // Part 2
  return res;
};

const findMappings = (signal: string, map: { [key: string]: string[] }) => {
  // Get range of possibly displayed numbers
  let displayedNumbers = Object.keys(numberToSegments).filter(
    (num) => numberToSegments[num].length === signal.length
  );

  displayedNumbers = displayedNumbers.filter((num) => {
    let matchable = true;
    const requiredWires = numberToSegments[num].sort();
    // The number of places
    let wiresOnNumber = requiredWires.map((w) => map[w]);
    signal.split("").forEach((wire) => {
      const posOfWire = wiresOnNumber.findIndex((wires) =>
        wires.includes(wire)
      );
      if (posOfWire === -1) {
        matchable = false;
        return;
      } else wiresOnNumber = wiresOnNumber.filter((_, i) => i !== posOfWire);
    });
    return matchable;
  });

  // Get all segments that are needed, to display one of those numbers
  const requiredSegments = displayedNumbers.flatMap(
    (dispNum) => numberToSegments[dispNum]
  );

  requiredSegments.forEach(
    (wire) => (map[wire] = intersect(signal.split(""), map[wire]))
  );
  const unrequiredSegments = complement(requiredSegments);
  // Remove the letters, that are needed for this unique number, from all other segments
  unrequiredSegments.forEach(
    (wire) =>
      (map[wire] = map[wire].filter((w) => !signal.split("").includes(w)))
  );
};

const intersect = (arr1: any[], arr2: any[]) => {
  return unique([
    ...arr1.filter((v) => arr2.includes(v)),
    ...arr2.filter((v) => arr1.includes(v)),
  ]);
};

const unique = (arr: any[]) => arr.filter((v, i, a) => a.indexOf(v) === i);

export const cleanup = () => {
  // Cleanup
};
