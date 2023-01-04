import chalk from "chalk";
import { existsSync } from "fs";
import { cp, mkdir, rm } from "fs/promises";
import glob from "glob";
import { basename, join } from "path";
import { get_ignore_patterns } from "../functions/filter-files.js";
import { getDefaults } from "../functions/handle-confs.js";

const CWD = process.cwd();

async function transfer(dest = null, options) {
  try {
    const override_ignore = options.ignore ?? null;

    const clearDest = options.clearDest ?? false;

    if (dest == null) {
      dest = await getDefaults("destination");
      if (dest == null) throw new Error("Not destination is set!");
    }

    const folderName = basename(CWD);
    const destination = join(dest, folderName);

    if (clearDest && existsSync(destination)) {
      await rm(destination, {
        recursive: true,
      });
    }

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

        if (!existsSync(destination)) {
          await mkdir(destination, { recursive: true });
        }

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
