import COLORS from "./aoc/colors";
import { prepare } from "./aoc/io";
import { Test } from "./aoc/types";
import { outputStars } from "./constants";

const test = () => {
  console.log(
    COLORS.FGBLUE,
    outputStars,
    " Starting tests ",
    outputStars,
    COLORS.RESET
  );

  const { input, exampleInput, SelectedDay, dayNumber } = prepare();
  const tests: Test = require(`./days/Day${dayNumber}/test`);

  let result = true;

  SelectedDay.cleanup();

  // Tests with normal input
  SelectedDay.init(input);

  if (tests.solution.part1 !== null) {
    result &&= assertEquals(
      tests.solution.part1,
      SelectedDay.part1(input),
      "Part 1 - normal input"
    );
  }

  if (tests.solution.part2 !== null) {
    result &&= assertEquals(
      tests.solution.part2,
      SelectedDay.part2(input),
      "Part 2 - normal input"
    );
  }

  SelectedDay.cleanup();

  // Tests with normal input
  SelectedDay.init(exampleInput);

  if (tests.example.part1 !== null) {
    result &&= assertEquals(
      tests.example.part1,
      SelectedDay.part1(exampleInput),
      "Part 1 - example input"
    );
  }

  if (tests.example.part2 !== null) {
    result &&= assertEquals(
      tests.example.part2,
      SelectedDay.part2(exampleInput),
      "Part 2 - example input"
    );
  }

  SelectedDay.cleanup();

  if (result)
    console.log(
      COLORS.FGGREEN,
      outputStars,
      " All tests successful ",
      outputStars,
      COLORS.RESET
    );
};

const assertEquals = (expected: any, got: any, description: string) => {
  if (got === expected) return true;
  console.log(COLORS.FGRED, `Test "${description}" failed!`);
  console.log(`Expected: ${expected}`);
  console.log(`Got: ${got}`, COLORS.RESET);
};

test();
