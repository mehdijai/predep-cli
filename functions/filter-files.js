import { readFile } from "fs/promises";
import { isAbsolute, join } from "path";
import { __dirname } from "./dir.js";
import { getDefaults } from "./handle-confs.js";

async function is_valid_file(fileName) {
  const regexp = await parse_regex();
  return !regexp.test(fileName);
}

async function get_ignore_patterns(override_ignore) {
  let ignoreFilePath = join(__dirname, ".ignoreconf");
  const defaultIgnore = await getDefaults("ignore");
  if (defaultIgnore !== null && override_ignore == null) {
    override_ignore = defaultIgnore;
  }
  if (override_ignore != null) {
    if (!isAbsolute(override_ignore)) override_ignore = join(process.cwd(), override_ignore);
    ignoreFilePath = override_ignore;
  }
  const data = await readFile(ignoreFilePath, { encoding: "utf8" });
  const conf = data.replace(/\r\n/g, "\n").split("\n");
  return conf;
}

export { is_valid_file, get_ignore_patterns };
