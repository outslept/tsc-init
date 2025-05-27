/* eslint-disable no-console */
import { ALL_OPTIONS, OPTION_CATEGORIES } from "../options/index";

export function showHelp(): void {
  console.log(`
USAGE:
  npx tscy [options]

META OPTIONS:
  -o, --output <path>           Output file path (default: ./tsconfig.json)
  -f, --force                   Overwrite existing file
  -h, --help                    Show this help
  --version                     Show version
  --verbose                     Show detailed output
  --preset <name>               Use preset configuration

CONFIGURATION OPTIONS:
  --include <pattern>           Include patterns (JSON array or comma-separated)
  --exclude <pattern>           Exclude patterns (JSON array or comma-separated)
  --extends <path>              Extend from another config
  --files <list>                Specific files to include
  --references <refs>           Project references (JSON array)

COMPILER OPTIONS:
All TypeScript compiler options are supported with -- prefix.
Use --help-options to see detailed information about all options.

EXAMPLES:
  # Generate minimal config
  npx tscy --preset minimal

  # Generate library config
  npx tscy --preset library --outDir dist --declaration true

  # Generate React config
  npx tscy --preset react --jsx react-jsx

  # Custom configuration
  npx tscy --target es2020 --module commonjs --strict true

  # Show all available options
  npx tscy --help-options

For more information: https://www.typescriptlang.org/tsconfig
`);
}

export function showDetailedHelp(): void {
  console.log(`
TypeScript Compiler Options Reference

`);

  for (const [categoryName, options] of Object.entries(OPTION_CATEGORIES)) {
    console.log(`${categoryName.toUpperCase()}:`);
    console.log("=".repeat(categoryName.length + 1));

    for (const [optionName, definition] of Object.entries(options)) {
      console.log(`
  --${optionName}${definition.deprecated ? " (DEPRECATED)" : ""}
    Type: ${definition.type}${definition.choices ? ` (${definition.choices.join(" | ")})` : ""}
    Default: ${definition.default !== undefined ? JSON.stringify(definition.default) : "undefined"}
    Since: TypeScript ${definition.since || "unknown"}

    ${definition.description}`);

      if (definition.examples && definition.examples.length > 0) {
        console.log(`
    Examples:`);
        definition.examples.forEach((example) => {
          console.log(`      ${example}`);
        });
      }

      if (definition.related && definition.related.length > 0) {
        console.log(`
    Related: ${definition.related.join(", ")}`);
      }
    }

    console.log();
  }
}

export function showOptionHelp(optionName: string): void {
  const definition = ALL_OPTIONS[optionName];

  if (!definition) {
    console.error(`Unknown option: ${optionName}`);
    console.log(`
Available options:
${Object.keys(ALL_OPTIONS)
  .sort()
  .map((name) => `  --${name}`)
  .join("\n")}`);
    return;
  }

  console.log(`
Option: --${optionName}${definition.deprecated ? " (DEPRECATED)" : ""}
Category: ${definition.category}
Type: ${definition.type}${definition.choices ? ` (${definition.choices.join(" | ")})` : ""}
Default: ${definition.default !== undefined ? JSON.stringify(definition.default) : "undefined"}
Since: TypeScript ${definition.since || "unknown"}

Description:
${definition.description}`);

  if (definition.examples && definition.examples.length > 0) {
    console.log(`
Examples:`);
    definition.examples.forEach((example) => {
      console.log(`  ${example}`);
    });
  }

  if (definition.related && definition.related.length > 0) {
    console.log(`
Related options: ${definition.related.join(", ")}`);
  }

  if (definition.deprecated && definition.related) {
    console.log(`
This option is deprecated. Consider using: ${definition.related.join(", ")}`);
  }
}

export function showVersion(): void {
  console.log("1.0.0");
}
