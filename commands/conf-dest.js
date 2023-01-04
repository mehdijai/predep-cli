import chalk from "chalk";
import { saveDest, saveIgnore } from "../functions/handle-confs.js";

async function save_dest(dest, options) {
  try {
    await saveDest(dest, options);
  } catch (err) {
    console.error(chalk.bgRed.white.bold("Exception:"));
    console.error(chalk.redBright.bold(err));
  }
}
async function save_ignore(ignore, options) {
  try {
    await saveIgnore(ignore, options);
  } catch (err) {
    console.error(chalk.bgRed.white.bold("Exception:"));
    console.error(chalk.redBright.bold(err));
  }
}

export { save_dest, save_ignore };
