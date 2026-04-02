import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const localesDir = path.join(rootDir, "content", "locales");
const baseLocale = "en";

function collectSchemaPaths(value, prefix = "") {
  const paths = new Set();

  if (Array.isArray(value)) {
    const arrayPath = `${prefix}[]`;
    paths.add(arrayPath);
    for (const item of value) {
      if (item !== null && typeof item === "object") {
        for (const childPath of collectSchemaPaths(item, arrayPath)) {
          paths.add(childPath);
        }
      }
    }
    return paths;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      const childPrefix = prefix ? `${prefix}.${key}` : key;
      for (const childPath of collectSchemaPaths(child, childPrefix)) {
        paths.add(childPath);
      }
    }
    return paths;
  }

  if (prefix) {
    paths.add(prefix);
  }

  return paths;
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function toSortedArray(set) {
  return [...set].sort((a, b) => a.localeCompare(b));
}

function main() {
  if (!fs.existsSync(localesDir)) {
    console.error("No content/locales directory found.");
    process.exit(1);
  }

  const localeDirs = fs
    .readdirSync(localesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  if (!localeDirs.includes(baseLocale)) {
    console.error(`Base locale "${baseLocale}" is missing in content/locales.`);
    process.exit(1);
  }

  const baseDir = path.join(localesDir, baseLocale);
  const baseFiles = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  const problems = [];

  for (const locale of localeDirs) {
    if (locale === baseLocale) continue;

    const localeDir = path.join(localesDir, locale);

    for (const fileName of baseFiles) {
      const baseFilePath = path.join(baseDir, fileName);
      const localeFilePath = path.join(localeDir, fileName);

      if (!fs.existsSync(localeFilePath)) {
        problems.push(`[${locale}] Missing file: ${fileName}`);
        continue;
      }

      let baseJson;
      let localeJson;
      try {
        baseJson = readJson(baseFilePath);
      } catch {
        problems.push(`[${baseLocale}] Invalid JSON: ${fileName}`);
        continue;
      }
      try {
        localeJson = readJson(localeFilePath);
      } catch {
        problems.push(`[${locale}] Invalid JSON: ${fileName}`);
        continue;
      }

      const baseSchema = collectSchemaPaths(baseJson);
      const localeSchema = collectSchemaPaths(localeJson);

      const extraPaths = toSortedArray(
        new Set([...localeSchema].filter((schemaPath) => !baseSchema.has(schemaPath)))
      );

      for (const schemaPath of extraPaths) {
        problems.push(`[${locale}] ${fileName} extra path: ${schemaPath}`);
      }
    }
  }

  if (problems.length > 0) {
    console.error("Locale content validation failed:\n");
    for (const issue of problems) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log("Locale content validation passed.");
}

main();
