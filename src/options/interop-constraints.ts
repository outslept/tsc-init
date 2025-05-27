import type { OptionDefinition } from "../types";

export const interopConstraintsOptions: Record<string, OptionDefinition> = {
  allowSyntheticDefaultImports: {
    type: "boolean",
    default: true,
    description:
      'When set to true, allowSyntheticDefaultImports allows you to write an import like `import React from "react"` instead of `import * as React from "react"` when the module does not explicitly specify a default export. This flag does not affect the JavaScript emitted by TypeScript, it\'s only for the type checking.',
    category: "Interop Constraints",
    since: "1.8",
    related: ["esModuleInterop"],
    examples: [
      "true  // Allow synthetic default imports",
      "false // Require explicit namespace imports",
    ],
  },

  erasableSyntaxOnly: {
    type: "boolean",
    default: false,
    description:
      "Node.js supports running TypeScript files directly as of v23.6; however, only TypeScript-specific syntax that does not have runtime semantics are supported. The erasableSyntaxOnly flag will cause TypeScript to error on most TypeScript-specific constructs that have runtime behavior.",
    category: "Interop Constraints",
    since: "5.8",
    related: ["verbatimModuleSyntax"],
    examples: [
      "true  // Only allow erasable TypeScript syntax",
      "false // Allow all TypeScript syntax",
    ],
  },

  esModuleInterop: {
    type: "boolean",
    default: true,
    description:
      "By default TypeScript treats CommonJS/AMD/UMD modules similar to ES6 modules. Turning on esModuleInterop will fix both namespace import and default import issues in the code transpiled by TypeScript. The first changes the behavior in the compiler, the second is fixed by two new helper functions which provide a shim to ensure compatibility.",
    category: "Interop Constraints",
    since: "2.7",
    related: ["allowSyntheticDefaultImports"],
    examples: [
      "true  // Enable ES module interop helpers",
      "false // Use legacy module interop",
    ],
  },

  forceConsistentCasingInFileNames: {
    type: "boolean",
    default: true,
    description:
      "TypeScript follows the case sensitivity rules of the file system it's running on. This can be problematic if some developers are working in a case-sensitive file system and others aren't. When this option is set, TypeScript will issue an error if a program tries to include a file by a casing different from the casing on disk.",
    category: "Interop Constraints",
    since: "1.8",
    examples: [
      "true  // Enforce consistent file name casing",
      "false // Allow inconsistent casing",
    ],
  },

  isolatedDeclarations: {
    type: "boolean",
    default: false,
    description:
      "Require sufficient annotation on exports so other tools can trivially generate declaration files. This ensures that declaration files can be generated without full type checking.",
    category: "Interop Constraints",
    since: "5.5",
    examples: [
      "true  // Require explicit export annotations",
      "false // Allow inferred export types",
    ],
  },

  isolatedModules: {
    type: "boolean",
    default: true,
    description:
      "While you can use TypeScript to produce JavaScript code from TypeScript code, it's also common to use other transpilers such as Babel to do this. Setting the isolatedModules flag tells TypeScript to warn you if you write certain code that can't be correctly interpreted by a single-file transpilation process.",
    category: "Interop Constraints",
    since: "1.5",
    examples: [
      "true  // Ensure single-file transpilation compatibility",
      "false // Allow multi-file dependent features",
    ],
  },

  preserveSymlinks: {
    type: "boolean",
    default: false,
    description:
      "This is to reflect the same flag in Node.js; which does not resolve the real path of symlinks. With this enabled, references to modules and packages are all resolved relative to the location of the symbolic link file, rather than relative to the path that the symbolic link resolves to.",
    category: "Interop Constraints",
    since: "2.5",
    examples: [
      "true  // Don't resolve symlinks",
      "false // Resolve symlinks to real paths",
    ],
  },

  verbatimModuleSyntax: {
    type: "boolean",
    default: true,
    description:
      "TypeScript 5.0 introduces verbatimModuleSyntax to simplify import/export handling. The rules are much simpler - any imports or exports without a type modifier are left around. Anything that uses the type modifier is dropped entirely. This provides a more consistent story than importsNotUsedAsValues and preserveValueImports.",
    category: "Interop Constraints",
    since: "5.0",
    related: ["isolatedModules"],
    examples: [
      "true  // Preserve exact import/export syntax",
      "false // Allow import elision and transformation",
    ],
  },
};
