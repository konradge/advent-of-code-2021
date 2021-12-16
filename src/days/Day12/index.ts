import * as _ from "lodash";

const allCaves: { [key: string]: string[] } = {};
export const init = (input: string) => {
  // Initialization
  input.split("\n").forEach((line) => {
    const [x, y] = line.split("-");
    if (!allCaves[x]) allCaves[x] = [];
    allCaves[x].push(y);
    if (!allCaves[y]) allCaves[y] = [];
    allCaves[y].push(x);
  });
};

export const part1 = (input: string) => {
  // Part 1
  return _.uniq(getPaths("start", [], allCaves, true).map((x) => x.join(",")))
    .length;
};

export const part2 = (input: string) => {
  // Part 2
  return _.uniq(getPaths("start", [], allCaves, false).map((x) => x.join(",")))
    .length;
};

export const cleanup = () => {
  // Cleanup
};

const getPaths = (
  toVisit: string,
  comingFrom: string[],
  allCaves: { [key: string]: string[] },
  alreadyVisitedOneCaveTwice: boolean
) => {
  if (toVisit === "end") {
    return [[...comingFrom, "end"]];
  } else {
    let paths: string[][] = [];
    const nextCaves = allCaves[toVisit];
    for (let visitThisCaveTwice of alreadyVisitedOneCaveTwice ||
    toVisit === "start"
      ? [false]
      : [true, false]) {
      let newAllCaves = {};
      Object.keys(allCaves).forEach((c) => {
        // Filter out the currently visited cave in the map of caves
        if (c !== toVisit || isBig(toVisit) || visitThisCaveTwice) {
          newAllCaves[c] = allCaves[c].filter(
            (n) => n !== toVisit || isBig(toVisit) || visitThisCaveTwice
          );
        }
      });
      for (let n of nextCaves) {
        const p = getPaths(
          n,
          [...comingFrom, toVisit],
          { ...newAllCaves },
          visitThisCaveTwice || alreadyVisitedOneCaveTwice
        );
        paths.push(...p);
      }
    }
    return paths;
  }
};

const isBig = (cave: string) => cave.toUpperCase() === cave;
