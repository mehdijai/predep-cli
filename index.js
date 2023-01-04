import { execSync } from "child_process";
import config from "./config.js";

const version = config.cliVersion;

const stdout = execSync("predep -v");

// Test Command Version
console.log(stdout.toString().trim() == "v" + version);
