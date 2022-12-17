import chalk from "chalk";
import { program } from "commander";
import { cacheAvailable, getInput } from "./aoc/index.js";

type RunFunction = (input: string) => [any | undefined, any | undefined] | undefined | string;

program.command("run", {
  isDefault: true,
}).requiredOption("-d, --day <day>", "The day to run").action(async (options) => {
  const day: string = options.day;

  const { default: run } = await import(`./solutions/${day.padStart(2, '0')}.js`);
  if (typeof run !== "function") throw new Error(`Solution for day ${day} is not a function`);
  const result = (run as RunFunction)(await getInput(parseInt(day))) || [];

  let part1: string | undefined;
  let part2: string | undefined;

  if (typeof result === "string") {
    part1 = result;
  } else {
    [part1, part2] = result;
  }
  
  part1 && console.log(chalk.cyanBright("Part 1:"), part1);
  part2 && console.log(chalk.cyanBright("Part 2:"), part2);
  if (!part1 && !part2) {
    console.log(chalk.yellowBright("No output"));
  }
});

program.command("cache").action(async () => {
  console.log(chalk.cyanBright("Caching inputs..."));
  await cacheAvailable();
  console.log(chalk.greenBright("Done!"));
});

program.parse();
