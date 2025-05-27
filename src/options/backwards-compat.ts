import type { OptionDefinition } from "../types";

export const backwardsCompatibilityOptions: Record<string, OptionDefinition> = {
  charset: {
    type: "string",
    default: "utf8",
    description:
      "In prior versions of TypeScript, this controlled what encoding was used when reading text files from disk. Today, TypeScript assumes UTF-8 encoding, but will correctly detect UTF-16 (BE and LE) or UTF-8 BOMs.",
    category: "Backwards Compatibility",
    since: "1.0",
    deprecated: true,
    examples: [
      '"utf8"  // UTF-8 encoding (default)',
      '"utf16" // UTF-16 encoding',
    ],
  },

  importsNotUsedAsValues: {
    type: "string",
    default: "remove",
    choices: ["remove", "preserve", "error"],
    description:
      "Deprecated in favor of verbatimModuleSyntax. This flag controls how import works, there are 3 different options: remove: The default behavior of dropping import statements which only reference types. preserve: Preserves all import statements whose values or types are never used. error: This preserves all imports (the same as the preserve option), but will error when a value import is only used as a type.",
    category: "Backwards Compatibility",
    since: "3.8",
    deprecated: true,
    related: ["preserveValueImports", "verbatimModuleSyntax"],
    examples: [
      '"remove"   // Remove unused type imports',
      '"preserve" // Keep all imports',
      '"error"    // Error on type-only value imports',
    ],
  },

  keyofStringsOnly: {
    type: "boolean",
    default: false,
    description:
      "This flag changes the keyof type operator to return string instead of string | number when applied to a type with a string index signature. This flag is used to help people keep this behavior from before TypeScript 2.9's release.",
    category: "Backwards Compatibility",
    since: "2.9",
    deprecated: true,
    examples: [
      "true  // keyof returns only string",
      "false // keyof returns string | number",
    ],
  },

  noImplicitUseStrict: {
    type: "boolean",
    default: false,
    description:
      'You shouldn\'t need this. By default, when emitting a module file to a non-ES6 target, TypeScript emits a "use strict"; prologue at the top of the file. This setting disables the prologue.',
    category: "Backwards Compatibility",
    since: "1.8",
    examples: [
      'true  // Don\'t emit "use strict"',
      'false // Emit "use strict" for modules',
    ],
  },

  noStrictGenericChecks: {
    type: "boolean",
    default: false,
    description:
      "TypeScript will unify type parameters when comparing two generic functions. This flag can be used to remove that check.",
    category: "Backwards Compatibility",
    since: "2.5",
    examples: [
      "true  // Disable strict generic checks",
      "false // Enable strict generic checks",
    ],
  },

  out: {
    type: "string",
    default: undefined,
    description:
      "Use outFile instead. The out option computes the final file location in a way that is not predictable or consistent. This option is retained for backward compatibility only and is deprecated.",
    category: "Backwards Compatibility",
    since: "1.0",
    deprecated: true,
    related: ["outDir", "outFile"],
    examples: ['"bundle.js" // Deprecated: use outFile instead'],
  },

  preserveValueImports: {
    type: "boolean",
    default: false,
    description:
      "Deprecated in favor of verbatimModuleSyntax. There are some cases where TypeScript can't detect that you're using an import. preserveValueImports will prevent TypeScript from removing the import, even if it appears unused. When combined with isolatedModules: imported types must be marked as type-only.",
    category: "Backwards Compatibility",
    since: "4.5",
    deprecated: true,
    related: [
      "isolatedModules",
      "importsNotUsedAsValues",
      "verbatimModuleSyntax",
    ],
    examples: [
      "true  // Preserve all value imports",
      "false // Allow import elision",
    ],
  },

  suppressExcessPropertyErrors: {
    type: "boolean",
    default: false,
    description:
      "This disables reporting of excess property errors, such as the one shown in the following example. This flag was added to help people migrate to the stricter checking of new object literals in TypeScript 1.6. We don't recommend using this flag in a modern codebase.",
    category: "Backwards Compatibility",
    since: "1.6",
    examples: [
      "true  // Allow excess properties in object literals",
      "false // Error on excess properties",
    ],
  },

  suppressImplicitAnyIndexErrors: {
    type: "boolean",
    default: false,
    description:
      "Turning suppressImplicitAnyIndexErrors on suppresses reporting the error about implicit anys when indexing into objects. Using suppressImplicitAnyIndexErrors is quite a drastic approach. It is recommended to use a @ts-ignore comment instead.",
    category: "Backwards Compatibility",
    since: "1.4",
    related: ["noImplicitAny"],
    examples: [
      "true  // Suppress implicit any index errors",
      "false // Report implicit any index errors",
    ],
  },
};
