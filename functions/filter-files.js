import { readFile } from "fs/promises";
import { join } from "path";
import { __dirname } from "./dir.js";

async function is_valid_file(fileName) {
  const regexp = await parse_regex();
  return !regexp.test(fileName);
}

async function get_ignore_patterns(override_ignore) {
  const data = await readFile(join(__dirname, ".ignoreconf"), { encoding: "utf8" });
  const conf = data.replace(/\r\n/g, "\n").split("\n");
  return conf;
}

export { is_valid_file, get_ignore_patterns };
