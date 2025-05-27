/* eslint-disable no-console */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import process from "node:process";
import type { TSConfig } from "../types";

export interface WriteOptions {
  force: boolean;
  verbose: boolean;
  indent: number;
}

export function writeConfigFile(
  config: TSConfig,
  outputPath: string,
  options: WriteOptions = { force: false, verbose: false, indent: 2 },
): void {
  const resolvedPath = resolve(outputPath);

  // Check if file exists
  if (existsSync(resolvedPath) && !options.force) {
    throw new Error(
      `File ${outputPath} already exists. Use --force to overwrite.`,
    );
  }

  // Ensure directory exists
  ensureDirectoryExists(resolvedPath);

  // Generate content with proper formatting
  const content = formatTSConfig(config, options.indent);

  // Write file
  writeFileSync(resolvedPath, content, "utf8");

  // Output result
  if (options.verbose) {
    logVerboseOutput(config, resolvedPath);
  } else {
    console.log(`Generated ${relative(process.cwd(), resolvedPath)}`);
  }
}

function ensureDirectoryExists(filePath: string): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function formatTSConfig(config: TSConfig, indent: number): string {
  const orderedConfig = {
    $schema: config.$schema,
    ...(config.extends && { extends: config.extends }),
    compilerOptions: formatCompilerOptions(config.compilerOptions),
    ...(config.include && { include: config.include }),
    ...(config.exclude && { exclude: config.exclude }),
    ...(config.files && { files: config.files }),
    ...(config.references && { references: config.references }),
    ...(config.watchOptions && { watchOptions: config.watchOptions }),
    ...(config.typeAcquisition && { typeAcquisition: config.typeAcquisition }),
  };

  return `${JSON.stringify(orderedConfig, null, indent)}\n`;
}

function formatCompilerOptions(
  options: Record<string, unknown>,
): Record<string, unknown> {
  // Order compiler options by category for better readability
  const categoryOrder = [
    // Core options first
    "target",
    "module",
    "moduleResolution",
    "lib",

    // Strict type checking
    "strict",
    "noImplicitAny",
    "strictNullChecks",
    "strictFunctionTypes",
    "strictBindCallApply",
    "strictPropertyInitialization",
    "noImplicitReturns",
    "noImplicitThis",
    "noImplicitOverride",
    "exactOptionalPropertyTypes",
    "noUncheckedIndexedAccess",

    // Module resolution
    "baseUrl",
    "paths",
    "rootDirs",
    "typeRoots",
    "types",
    "resolveJsonModule",
    "resolvePackageJsonExports",
    "resolvePackageJsonImports",

    // Emit
    "outDir",
    "outFile",
    "rootDir",
    "declaration",
    "declarationDir",
    "declarationMap",
    "sourceMap",
    "inlineSourceMap",
    "removeComments",
    "noEmit",
    "emitDeclarationOnly",

    // Interop
    "esModuleInterop",
    "allowSyntheticDefaultImports",
    "isolatedModules",
    "verbatimModuleSyntax",
    "forceConsistentCasingInFileNames",

    // Advanced
    "skipLibCheck",
    "allowJs",
    "checkJs",
  ];

  const ordered: Record<string, unknown> = {};

  // Add options in preferred order
  for (const key of categoryOrder) {
    if (key in options) {
      ordered[key] = options[key];
    }
  }

  // Add remaining options
  for (const [key, value] of Object.entries(options)) {
    if (!(key in ordered)) {
      ordered[key] = value;
    }
  }

  return ordered;
}

function logVerboseOutput(config: TSConfig, resolvedPath: string): void {
  const relativePath = relative(process.cwd(), resolvedPath);

  console.log(`Generated TypeScript configuration:`);
  console.log(`  Output: ${relativePath}`);
  console.log(`  Target: ${config.compilerOptions.target || "es5"}`);
  console.log(`  Module: ${config.compilerOptions.module || "commonjs"}`);
  console.log(
    `  Module Resolution: ${config.compilerOptions.moduleResolution || "classic"}`,
  );
  console.log(`  Strict: ${config.compilerOptions.strict ?? false}`);
  console.log(`  Declaration: ${config.compilerOptions.declaration ?? false}`);
  console.log(`  Source Maps: ${config.compilerOptions.sourceMap ?? false}`);

  if (config.compilerOptions.outDir) {
    console.log(`  Output Directory: ${config.compilerOptions.outDir}`);
  }

  if (config.include) {
    console.log(`  Include: ${JSON.stringify(config.include)}`);
  }

  if (config.exclude) {
    console.log(`  Exclude: ${JSON.stringify(config.exclude)}`);
  }

  console.log();
}
