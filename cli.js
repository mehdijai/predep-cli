#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import { transfer } from "./commands/transfer.js";
import deploy from "./commands/deploy.js";
import config from "./config.js";
import { save_dest, save_ignore } from "./commands/conf-dest.js";

const version = config.cliVersion;

try {
  program
    .command("transfer")
    .argument("[dest]", "Destination path")
    .option("--ignore <path>", "Path to ignore file.")
    .option("--clear-dest", "Remove if exists the destination directory")
    .description(
      "Transfer file to pre-deploy folder. if dest not set, it will lock for the saved path. If not found, an error will be thrown",
    )
    .action(transfer);

  program
    .command("save-dest")
    .argument("[path]", "Destination path.")
    .option("--unset", "unset the default value. if set, saving the path process will be aborted.")
    .description("Save a default destination path")
    .action(save_dest);

  program
    .command("save-ignore")
    .argument("[path]", "Ignore file path.")
    .option("--unset", "unset the default value. if set, saving the path process will be aborted.")
    .description("Save a default ignore file path")
    .action(save_ignore);

  program.command("deploy").description("Deploy to the remote server through sftp").action(deploy);

  program.version(
    chalk.bgYellowBright.black.bold(" v" + version + " "),
    "-v, --version",
    "output the current version",
  );

  program.parse();
} catch (err) {
  console.error(chalk.bgRed.white.bold("Exception:"));
  console.error(chalk.redBright.bold(err));
}
