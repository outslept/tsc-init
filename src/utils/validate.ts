import { ALL_OPTIONS } from "../options/index";
import type { CompilerOptions, TSConfig } from "../types";
import { validateValue } from "./parser";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateConfig(config: TSConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { compilerOptions } = config;

  for (const [key, value] of Object.entries(compilerOptions)) {
    const definition = ALL_OPTIONS[key];
    if (!definition) {
      warnings.push(`Unknown compiler option: ${key}`);
      continue;
    }

    if (definition.deprecated) {
      warnings.push(
        `Option '${key}' is deprecated${definition.related ? `. Consider using: ${definition.related.join(", ")}` : ""}`,
      );
    }

    const validationResult = validateValue(value, definition, compilerOptions);
    if (validationResult !== true) {
      errors.push(`Invalid value for '${key}': ${validationResult}`);
    }
  }

  validateCrossOptionRules(compilerOptions, errors, warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

function validateCrossOptionRules(
  options: CompilerOptions,
  errors: string[],
  warnings: string[],
): void {
  if (
    options.outFile &&
    options.module &&
    !["none", "system", "amd"].includes(options.module)
  ) {
    errors.push("outFile can only be used with module: none, system, or amd");
  }

  if (
    options.allowImportingTsExtensions &&
    !options.noEmit &&
    !options.emitDeclarationOnly
  ) {
    errors.push(
      "allowImportingTsExtensions requires noEmit or emitDeclarationOnly",
    );
  }

  if (options.composite) {
    if (!options.declaration) {
      options.declaration = true;
      warnings.push("Enabled declaration because composite is true");
    }
    if (!options.incremental) {
      warnings.push("Consider enabling incremental when using composite");
    }
  }

  if (options.strict === false) {
    const strictOptions = [
      "alwaysStrict",
      "strictNullChecks",
      "strictBindCallApply",
      "strictBuiltinIteratorReturn",
      "strictFunctionTypes",
      "strictPropertyInitialization",
      "noImplicitAny",
      "noImplicitThis",
      "useUnknownInCatchVariables",
    ];

    const explicitStrictOptions = strictOptions.filter(
      (opt) => opt in options && options[opt] === true,
    );

    if (explicitStrictOptions.length > 0) {
      warnings.push(
        `strict is false but these strict options are explicitly enabled: ${explicitStrictOptions.join(", ")}`,
      );
    }
  }

  if (
    options.moduleResolution === "bundler" &&
    options.module &&
    !["preserve", "esnext"].includes(options.module)
  ) {
    warnings.push(
      "moduleResolution: bundler works best with module: preserve or esnext",
    );
  }

  if (
    options.jsx &&
    options.jsx !== "preserve" &&
    !options.jsxFactory &&
    !options.jsxImportSource
  ) {
    warnings.push(
      "JSX is configured but no jsxFactory or jsxImportSource is set",
    );
  }

  if (
    options.target === "es5" &&
    options.lib &&
    options.lib.some((lib) => lib.startsWith("es2"))
  ) {
    warnings.push("Using ES2015+ lib with ES5 target may cause runtime issues");
  }

  if (options.incremental && !options.composite && !options.tsBuildInfoFile) {
    warnings.push(
      "Consider setting tsBuildInfoFile when using incremental without composite",
    );
  }

  if (options.verbatimModuleSyntax) {
    if (options.allowSyntheticDefaultImports === false) {
      warnings.push(
        "verbatimModuleSyntax may conflict with allowSyntheticDefaultImports: false",
      );
    }
    if (
      options.importsNotUsedAsValues &&
      options.importsNotUsedAsValues !== "remove"
    ) {
      warnings.push("verbatimModuleSyntax replaces importsNotUsedAsValues");
    }
    if (options.preserveValueImports) {
      warnings.push("verbatimModuleSyntax replaces preserveValueImports");
    }
  }

  if (
    options.moduleResolution &&
    ["node16", "nodenext"].includes(options.moduleResolution)
  ) {
    if (!options.resolvePackageJsonExports) {
      warnings.push(
        "resolvePackageJsonExports should be true with Node.js module resolution",
      );
    }
    if (!options.resolvePackageJsonImports) {
      warnings.push(
        "resolvePackageJsonImports should be true with Node.js module resolution",
      );
    }
  }

  if (!options.skipLibCheck) {
    warnings.push("Consider enabling skipLibCheck for faster compilation");
  }

  if (options.noUncheckedSideEffectImports === false) {
    warnings.push(
      "Disabling noUncheckedSideEffectImports may hide import typos",
    );
  }
}
