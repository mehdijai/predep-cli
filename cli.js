#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import transfer from "./commands/transfer.js";
import deploy from "./commands/deploy.js";
import config from "./config.js";

const version = config.cliVersion;

try {
  program
    .command("transfer")
    .description("Transfer file to pre-deploy folder")
    .action(transfer);
  
  program
    .command("deploy")
    .description("deploy to the remote server through sftp")
    .action(deploy);

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