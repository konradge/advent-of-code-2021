import * as fs from "fs";
import { Output } from "./types";

export const dayDirectory = "./src/days";

const loadInput = (day: string | number) =>
  fs.readFileSync(`${dayDirectory}/Day${day}/input`, "utf8").replace(/\r/g, "");

const loadExampleInput = (day: string | number) =>
  fs
    .readFileSync(`${dayDirectory}/Day${day}/example`, "utf8")
    .replace(/\r/g, "");

export const prepare = () => {
  const dayNumber = Number(process.argv[2]);

  let SelectedDay: {
    init: (input: string) => Output;
    part1: (input: string) => Output;
    part2: (input: string) => Output;
    cleanup: () => void;
  };

  if (Number.isNaN(dayNumber)) {
    throw new Error(
      `First parameter must be a number!\n Provided ${dayNumber}`
    );
  }

  try {
    SelectedDay = require(`../days/Day${dayNumber}/index`);
  } catch (err) {
    console.log(err);

    throw new Error(`Day ${dayNumber} has not been implemented yet`);
  }

  const input = loadInput(dayNumber).trim();

  const exampleInput = loadExampleInput(dayNumber).trim();

  return { SelectedDay, dayNumber, input, exampleInput };
};
