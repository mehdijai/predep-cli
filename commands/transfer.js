import chalk from "chalk";
import { existsSync } from "fs";
import { cp, mkdir } from "fs/promises";
import glob from "glob";
import { basename, isAbsolute, join } from "path";
import { get_ignore_patterns } from "../functions/filter-files.js";

const CWD = process.cwd();
const DEST = "D:\\medostudios_predeploy\\sogesoft";
const override_ignore = null;

async function transfer() {
  try {
    // TODO: Check the file
    const pattern = await get_ignore_patterns(override_ignore);
    glob(
      "**/*",
      {
        ignore: pattern,
        matchBase: true,
        nodir: true,
      },
      async (err, files) => {
        if (err) throw new Error(err);
        // TODO: Create a directory in the destination if not exiting
        const folderName = basename(CWD);
        const destination = join(DEST, folderName);
        if (existsSync(destination)) {
          await mkdir(destination);
        }
        // TODO: Loop through all directory's files

        files.forEach(async (file) => {
          await cp(join(CWD, file), join(destination, file), {
            recursive: true,
            preserveTimestamps: true,
          });
        });
      },
    );
  } catch (err) {
    console.error(chalk.bgRed.white.bold("Exception:"));
    console.error(chalk.redBright.bold(err));
  }
}

export { transfer };
