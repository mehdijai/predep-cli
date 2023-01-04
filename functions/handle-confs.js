import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { __dirname } from "./dir.js";

const defaultsFile = join(__dirname, "../defaults.json");

async function saveDest(dest = null, options) {
  if (!dest && !options.unset) throw new Error("destination path or unset flag must be set!");

  if (options.unset) {
    await unsetDefault("destination");
    return;
  }

  let data = await getDefaults();
  if (data == null) {
    data = {
      destination: dest,
    };
  } else {
    data.destination = dest;
  }
  await writeFile(defaultsFile, JSON.stringify(data, null, 2), { encoding: "utf8" });
}

async function saveIgnore(dest = null, options) {
  if (!dest && !options.unset) throw new Error("ignore file path or unset flag must be set!");

  if (options.unset) {
    await unsetDefault("ignore");
    return;
  }

  let data = await getDefaults();
  if (data == null) {
    data = {
      ignore: dest,
    };
  } else {
    data.ignore = dest;
  }
  await writeFile(defaultsFile, JSON.stringify(data, null, 2), { encoding: "utf8" });
}

async function getDefaults(key = null) {
  if (!existsSync(defaultsFile)) return null;

  let data = await readFile(defaultsFile, { encoding: "utf8" });

  if (data == "") return null;

  data = JSON.parse(data);

  if (key != null) {
    if (data.hasOwnProperty(key)) return data[key];
    return null;
  }

  return data;
}

async function unsetDefault(type) {
  const data = await getDefaults();
  if (data == null) return;
  if (data.hasOwnProperty(type)) {
    delete data[type];
    await writeFile(defaultsFile, JSON.stringify(data, null, 2), { encoding: "utf8" });
  }
}

export { saveDest, getDefaults, saveIgnore };
