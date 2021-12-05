import COLORS from "./aoc/colors";
import { prepare } from "./aoc/io";
import { outputStars } from "./constants";

const run = (isExample?: boolean) => {
  const { input, SelectedDay, exampleInput, dayNumber } = prepare();

  console.log(
    COLORS.FGRED,
    `${outputStars} Day  ${dayNumber}${
      isExample ? " - Example data" : ""
    } ${outputStars}`,
    COLORS.RESET
  );

  let actualInput = isExample ? exampleInput : input;

  SelectedDay.cleanup();

  SelectedDay.init(actualInput);
  console.log(COLORS.FGYELLOW, SelectedDay.part1(actualInput), COLORS.RESET);

  console.log(COLORS.FGYELLOW, SelectedDay.part2(actualInput), COLORS.RESET);

  SelectedDay.cleanup();
};

export default run;
