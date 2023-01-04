import chalk from "chalk";
import { existsSync } from "fs";
import { isAbsolute, join } from "path";

function deploy() {
  try {
    const cwd = process.cwd();

    
  } catch (err) {
    console.error(chalk.bgRed.white.bold("Exception:"));
    console.error(chalk.redBright.bold(err));
  }
}

export default deploy;
