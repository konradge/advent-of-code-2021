import parse from "../../aoc/parse";

let report: string[][];

export const init = (input: string) => {
  report = parse(input, "string[][]");
};

export const part1 = (input: string) => {
  let gamma = 0,
    epsilon = 0;
  for (let i = 0; i < report[0].length; i++) {
    gamma *= 2;
    epsilon *= 2;
    let occurences = 0;
    for (let line of report) {
      occurences += Number(line[i]);
    }

    if (occurences >= report.length / 2) {
      gamma++;
    } else {
      epsilon++;
    }
  }
  return gamma * epsilon;
};

export const part2 = (input: string) => {
  const oxygenRating = calcRating(report, 0, (ones, zeros) =>
    zeros.length > ones.length ? zeros : ones
  );
  const scrubberRating = calcRating(report, 0, (ones, zeros) =>
    ones.length < zeros.length ? ones : zeros
  );
  return oxygenRating * scrubberRating;
};

const calcRating = (
  list: string[][],
  pos: number,
  select: (ones: string[][], zeros: string[][]) => string[][]
) => {
  if (list.length == 1) return Number.parseInt(list[0].join(""), 2);
  let ones = [],
    zeros = [];
  for (let item of list) {
    if (item[pos] === "1") ones.push(item);
    else zeros.push(item);
  }
  return calcRating(select(ones, zeros), pos + 1, select);
};

export const cleanup = () => {
  report = null;
};
