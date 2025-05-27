import process from "node:process";
import { ALL_OPTIONS } from "../options/index";
import {
  showDetailedHelp,
  showHelp,
  showOptionHelp,
  showVersion,
} from "../utils/help";
import { parseValue, validateValue } from "../utils/parser";
import { validateConfig } from "../utils/validate";
import { writeConfigFile } from "../utils/write";
import type { CLIArgs, OptionDefinition, TSConfig } from "../types";

export function executeCommand(args: CLIArgs): void {
  if (args.help) {
    showHelp();
    return;
  }

  if (args["help-options"]) {
    showDetailedHelp();
    return;
  }

  if (args["help-option"]) {
    showOptionHelp(args["help-option"]);
    return;
  }

  if (args.version) {
    showVersion();
    return;
  }

  try {
    const config = buildTSConfig(args);
    const validation = validateConfig(config);

    if (validation.warnings.length > 0) {
      console.warn("Warnings:");
      validation.warnings.forEach((warning) => console.warn(`  ${warning}`));
    }

    if (!validation.isValid) {
      console.error("Configuration errors:");
      validation.errors.forEach((error) => console.error(`  ${error}`));
      process.exit(1);
    }

    const outputPath = args.output || "./tsconfig.json";
    const force = args.force || false;
    const verbose = args.verbose || false;

    writeConfigFile(config, outputPath, { force, verbose, indent: 2 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

function buildTSConfig(args: CLIArgs): TSConfig {
  const config: TSConfig = {
    $schema: "https://json.schemastore.org/tsconfig",
    compilerOptions: buildCompilerOptions(args),
  };

  const arrayDefinition: OptionDefinition = {
    type: "array",
    description: "Array option",
    category: "Type Checking",
  };

  if (args.include) {
    const parsed = parseValue(args.include, arrayDefinition);
    if (Array.isArray(parsed)) {
      config.include = parsed;
    }
  } else {
    config.include = ["**/*.ts", "**/*.tsx"];
    if (config.compilerOptions.allowJs) {
      config.include.push("**/*.js", "**/*.jsx");
    }
  }

  if (args.exclude) {
    const parsed = parseValue(args.exclude, arrayDefinition);
    if (Array.isArray(parsed)) {
      config.exclude = parsed;
    }
  } else {
    config.exclude = ["node_modules"];
    if (config.compilerOptions.outDir) {
      config.exclude.push(config.compilerOptions.outDir);
    }
  }

  if (args.files) {
    const parsed = parseValue(args.files, arrayDefinition);
    if (Array.isArray(parsed)) {
      config.files = parsed;
    }
  }

  if (args.extends) {
    config.extends = args.extends;
  }

  if (args.references) {
    const parsed = parseValue(args.references, arrayDefinition);
    if (Array.isArray(parsed)) {
      config.references = parsed.map((ref) =>
        typeof ref === "string" ? { path: ref } : ref,
      );
    }
  }

  return config;
}

function buildCompilerOptions(args: CLIArgs): Record<string, unknown> {
  const options: Record<string, unknown> = {};

  for (const [key, definition] of Object.entries(ALL_OPTIONS)) {
    const argValue = args[key];
    if (key in args && argValue !== undefined) {
      try {
        const valueToProcess =
          typeof argValue === "string" ? argValue : String(argValue);
        const parsedValue = parseValue(valueToProcess, definition);
        const validationResult = validateValue(
          parsedValue,
          definition,
          options,
        );

        if (validationResult !== true) {
          throw new Error(`Invalid value for --${key}: ${validationResult}`);
        }

        options[key] = parsedValue;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Invalid value for --${key}: ${message}`);
      }
    } else if (!(key in options) && definition.default !== undefined) {
      options[key] = definition.default;
    }
  }

  return options;
}
