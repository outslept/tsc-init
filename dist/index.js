#!/usr/bin/env node
#!/usr/bin/env node

// lib/index.ts
import { writeFileSync } from "node:fs";
import process from "node:process";
import { confirm, isCancel, select } from "@clack/prompts";
import pc from "picocolors";
var args = new Set(process.argv.slice(2));
var isVerbose = args.has("--verbose") || args.has("-v");
var showHelp = args.has("--help") || args.has("-h");
var HELP_MESSAGE = `
${pc.bold(
  "@outslept/tsc-init"
)} - Interactive TypeScript configuration generator

${pc.dim("Usage:")}
  npx @outslept/tsc-init [options]

${pc.dim("Options:")}
  -h, --help     Show this help message
  -v, --verbose  Show detailed descriptions

${pc.dim("Examples:")}
  npx @outslept/tsc-init
  npx @outslept/tsc-init --verbose
`;
var DESCRIPTIONS = {
  transpiling: {
    short: "Transpile TypeScript to JavaScript?",
    verbose: `${pc.dim("Choose compilation strategy:")}

    ${pc.green("\u2713")} YES - Compile TS \u2192 JS (${pc.dim(
      "Generates JavaScript files"
    )})
    ${pc.red("\u2717")} NO  - Type-check only (${pc.dim("No output files")})`
  },
  library: {
    short: "Building a library package?",
    verbose: `${pc.dim("Select project type:")}

    ${pc.green("\u2713")} YES - Library/Package (${pc.dim("Generates .d.ts files")})
    ${pc.red("\u2717")} NO  - Application (${pc.dim("Skip type definitions")})`
  },
  monorepo: {
    short: "Part of a monorepo?",
    verbose: `${pc.dim("Project structure:")}

    ${pc.green("\u2713")} YES - Monorepo (${pc.dim("Enables project references")})
    ${pc.red("\u2717")} NO  - Standalone (${pc.dim("Single package setup")})`
  },
  environment: {
    dom: {
      short: "Browser",
      verbose: "Browser-only (DOM + Web APIs)"
    },
    node: {
      short: "Node.js",
      verbose: "Node.js runtime (Server-side)"
    },
    both: {
      short: "Universal",
      verbose: "Cross-platform (Browser + Node.js)"
    }
  }
};
function handleExit() {
  process.stdout.write(pc.dim("\n\nOperation cancelled. Exiting...\n"));
  process.exit(0);
}
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
function printSuccess(path) {
  process.stdout.write("\n");
  process.stdout.write(`${pc.green("\u2713")} Created ${pc.bold(path)}
`);
  process.stdout.write("\n");
  process.stdout.write(pc.dim("Next steps:\n"));
  process.stdout.write("\n");
  process.stdout.write(pc.dim("  1. Review the generated configuration\n"));
  process.stdout.write(pc.dim(`     ${pc.cyan("cat")} tsconfig.json
`));
  process.stdout.write("\n");
  process.stdout.write(pc.dim("  2. Install dependencies (if needed)\n"));
  process.stdout.write(
    pc.dim(`     ${pc.cyan("npm")} install typescript @types/node --save-dev
`)
  );
  process.stdout.write("\n");
}
async function main() {
  if (showHelp) {
    process.stdout.write(HELP_MESSAGE);
    process.exit(0);
  }
  const compilerOptions = {
    esModuleInterop: true,
    skipLibCheck: true,
    target: "es2022",
    allowJs: true,
    resolveJsonModule: true,
    moduleDetection: "force",
    isolatedModules: true,
    verbatimModuleSyntax: true,
    strict: true,
    noUncheckedIndexedAccess: true,
    noImplicitOverride: true
  };
  const isTranspilingWithTS = await confirm({
    message: isVerbose ? DESCRIPTIONS.transpiling.verbose : DESCRIPTIONS.transpiling.short
  });
  if (isCancel(isTranspilingWithTS))
    handleExit();
  if (isTranspilingWithTS) {
    compilerOptions.module = "NodeNext";
    compilerOptions.outDir = "dist";
    compilerOptions.sourceMap = true;
    const isBuildingLibrary = await confirm({
      message: isVerbose ? DESCRIPTIONS.library.verbose : DESCRIPTIONS.library.short
    });
    if (isCancel(isBuildingLibrary))
      handleExit();
    if (isBuildingLibrary) {
      compilerOptions.declaration = true;
      const isMonorepo = await confirm({
        message: isVerbose ? DESCRIPTIONS.monorepo.verbose : DESCRIPTIONS.monorepo.short
      });
      if (isCancel(isMonorepo))
        handleExit();
      if (isMonorepo) {
        compilerOptions.composite = true;
        compilerOptions.declarationMap = true;
      }
    }
  } else {
    compilerOptions.module = "preserve";
    compilerOptions.noEmit = true;
  }
  const environment = await select({
    message: `${pc.dim("Target environment:")}`,
    options: [
      {
        value: "dom",
        label: isVerbose ? DESCRIPTIONS.environment.dom.verbose : DESCRIPTIONS.environment.dom.short,
        hint: isVerbose ? void 0 : pc.dim("DOM + Web APIs")
      },
      {
        value: "node",
        label: isVerbose ? DESCRIPTIONS.environment.node.verbose : DESCRIPTIONS.environment.node.short,
        hint: isVerbose ? void 0 : pc.dim("Server-side runtime")
      },
      {
        value: "both",
        label: isVerbose ? DESCRIPTIONS.environment.both.verbose : DESCRIPTIONS.environment.both.short,
        hint: isVerbose ? void 0 : pc.dim("Browser + Node.js")
      }
    ]
  });
  if (isCancel(environment))
    handleExit();
  compilerOptions.lib = environment === "dom" ? ["es2022", "dom", "dom.iterable"] : environment === "both" ? ["es2022", "dom", "dom.iterable"] : ["es2022"];
  const tsconfig = {
    $schema: "https://json.schemastore.org/tsconfig",
    compilerOptions
  };
  const path = "tsconfig.json";
  try {
    writeFileSync(path, JSON.stringify(tsconfig, null, 2));
    printSuccess(path);
  } catch (error) {
    process.stderr.write(
      pc.red(`
\u2717 Failed to write configuration file: ${error.message}
`)
    );
    process.exit(1);
  }
}
main().catch((error) => {
  process.stderr.write(pc.red(`
\u2717 ${error.message}
`));
  process.exit(1);
});
