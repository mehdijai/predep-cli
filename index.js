// import { execSync } from "child_process";
// import config from "./conf.js";

import { transfer } from "./commands/transfer.js";

// const version = config.cliVersion;

// const stdout = execSync("predep -v");

// // Test Command Version
// console.log(stdout.toString().trim() == version);
(async () => {
  await transfer();
})();
