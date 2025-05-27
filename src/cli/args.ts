import process from "node:process";
import { parseArgs } from "node:util";
import { ALL_OPTIONS } from "../options/index";
import type { CLIArgs } from "../types";

export function buildArgvOptions() {
  const options: Record<string, any> = {};

  // Add compiler options
  for (const [key, definition] of Object.entries(ALL_OPTIONS)) {
    options[key] = {
      type:
        definition.type === "number"
          ? "string"
          : definition.type === "array" || definition.type === "object"
            ? "string"
            : definition.type,
    };
  }

  // Add meta options
  options.preset = { type: "string" };
  options.output = { type: "string", short: "o" };
  options.force = { type: "boolean", short: "f" };
  options.help = { type: "boolean", short: "h" };
  options["help-options"] = { type: "boolean" };
  options["help-option"] = { type: "string" };
  options["help-preset"] = { type: "string" };
  options.version = { type: "boolean", short: "v" };
  options.verbose = { type: "boolean" };
  options.include = { type: "string" };
  options.exclude = { type: "string" };
  options.extends = { type: "string" };
  options.files = { type: "string" };
  options.references = { type: "string" };

  return options;
}

export function parseCliArgs(): CLIArgs {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: buildArgvOptions(),
    allowPositionals: false,
    strict: false,
  });

  return values;
}
