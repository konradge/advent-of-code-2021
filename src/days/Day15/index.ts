// 2967 -> to high

import { timeStamp } from "console";
import COLORS from "../../aoc/colors";
import MinHeap, { NumValue } from "../../helpers/MinHeap";

let smallCave: number[][];
let bigCave: number[][] = [];
let smallRiskMap = {};
let bigRiskMap = {};
export const init = (input: string) => {
  // Initialization
  smallCave = input
    .split("\n")
    .map((line) => line.split("").map((r) => Number(r)));

  for (let j = 0; j < 5; j++)
    for (let r = 0; r < smallCave.length; r++) {
      bigCave.push([]);
      for (let i = 0; i < 5; i++) {
        bigCave[smallCave.length * j + r] = [
          ...bigCave[smallCave.length * j + r],
          ...smallCave[r].map((risk) => ((risk + i + j - 1) % 9) + 1),
        ];
      }
    }

  //console.log(bigCave.map((x) => x.join("")).join("\n"));
};
export const part1 = (_) => {
  // Part 1

  return getRisk(smallCave);
};

export const part2 = (_) => {
  // Part 2
  return getRisk(bigCave);
};

export const cleanup = () => {
  // Cleanup
};

const getRisk = (cave: number[][]) => {
  const fastFindMap: { [key: string]: Distance } = {};
  let minHeap = new MinHeap<Distance>();
  minHeap.insert(new Distance(0, "0,0", fastFindMap));
  while (true) {
    // Find the node with the smallest distance, that is active (not negative)
    while (minHeap.peak().getValue() < 0) {
      minHeap.extractMin();
    }
    const minimalNode = minHeap.extractMin();

    if (
      minimalNode.row === cave.length - 1 &&
      minimalNode.col === cave[0].length - 1
    )
      return minimalNode.getValue();

    // For all Neighbours of that smallest node: Set/Update their distance
    goThroughNeighbours([minimalNode.row, minimalNode.col], cave, (i, j) => {
      if (!fastFindMap[i + "," + j])
        minHeap.insert(
          new Distance(Number.MAX_VALUE, i + "," + j, fastFindMap)
        );
      minHeap.setValue(
        fastFindMap[i + "," + j],
        Math.min(minimalNode.dist + cave[i][j], fastFindMap[i + "," + j].dist)
      );
    });
  }
};

class Distance implements NumValue {
  dist: number;
  node: string;
  row: number;
  col: number;
  constructor(dist: number, node: string, map: { [key: string]: Distance }) {
    this.dist = dist;
    this.node = node;
    map[node] = this;
    const [row, col] = node.split(",");
    this.row = Number(row);
    this.col = Number(col);
  }
  getValue(): number {
    return this.dist;
  }
  setValue(value: number) {
    this.dist = value;
  }
}

const goThroughNeighbours = (
  n: number[],
  allNodes: number[][],
  callback: (i: number, j: number) => any
) => {
  if (n[0] > 0) {
    callback(n[0] - 1, n[1]);
  }
  if (n[1] > 0) {
    callback(n[0], n[1] - 1);
  }
  if (n[0] < allNodes.length - 1) {
    callback(n[0] + 1, n[1]);
  }
  if (n[1] < allNodes.length - 1) {
    callback(n[0], n[1] + 1);
  }
};

const checkNeigbour = (n: number[], activeNodes: number[][]) => {};
