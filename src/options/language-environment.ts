import type { OptionDefinition } from "../types";

export const languageEnvironmentOptions: Record<string, OptionDefinition> = {
  emitDecoratorMetadata: {
    type: "boolean",
    default: false,
    description:
      "Enables experimental support for emitting type metadata for decorators which works with the module reflect-metadata.",
    category: "Language and Environment",
    since: "1.5",
    related: ["experimentalDecorators"],
    examples: [
      "true  // Emit decorator metadata",
      "false // Don't emit decorator metadata",
    ],
  },

  experimentalDecorators: {
    type: "boolean",
    default: false,
    description:
      "Enables experimental support for decorators, which is a version of decorators that predates the TC39 standardization process. Decorators are a language feature which hasn't yet been fully ratified into the JavaScript specification.",
    category: "Language and Environment",
    since: "1.5",
    related: ["emitDecoratorMetadata"],
    examples: [
      "true  // Enable experimental decorators",
      "false // Use standard decorators (when available)",
    ],
  },
  jsx: {
    type: "string",
    default: undefined,
    choices: ["preserve", "react", "react-native", "react-jsx", "react-jsxdev"],
    description:
      "Controls how JSX constructs are emitted in JavaScript files. This only affects output of JS files that started in .tsx files. react-jsx: Emit .js files with the JSX changed to _jsx calls optimized for production. react-jsxdev: Emit .js files with the JSX changed to _jsx calls for development only. preserve: Emit .jsx files with the JSX unchanged. react-native: Emit .js files with the JSX unchanged. react: Emit .js files with JSX changed to the equivalent React.createElement calls.",
    category: "Language and Environment",
    since: "1.6",
    related: ["jsxFactory", "jsxFragmentFactory", "jsxImportSource"],
    examples: [
      '"react-jsx"    // Modern React JSX transform',
      '"react-jsxdev" // Development React JSX transform',
      '"preserve"     // Keep JSX unchanged',
      '"react"        // Legacy React.createElement calls',
    ],
  },

  jsxFactory: {
    type: "string",
    default: "React.createElement",
    description:
      'Changes the function called in .js files when compiling JSX Elements using the classic JSX runtime. The most common change is to use "h" or "preact.h" instead of the default "React.createElement" if using preact.',
    category: "Language and Environment",
    since: "2.2",
    related: ["jsx", "jsxFragmentFactory", "jsxImportSource"],
    examples: [
      '"React.createElement" // Default React factory',
      '"h"                   // Preact factory function',
      '"preact.h"            // Preact with namespace',
      '"createElement"       // Custom factory function',
    ],
  },

  jsxFragmentFactory: {
    type: "string",
    default: "React.Fragment",
    description:
      "Specify the JSX fragment factory function to use when targeting react JSX emit with jsxFactory compiler option is specified, e.g. Fragment.",
    category: "Language and Environment",
    since: "4.0",
    related: ["jsx", "jsxFactory", "jsxImportSource"],
    examples: [
      '"React.Fragment" // Default React fragment',
      '"Fragment"       // Preact fragment',
      '"h.Fragment"     // Custom fragment factory',
    ],
  },

  jsxImportSource: {
    type: "string",
    default: "react",
    description:
      'Declares the module specifier to be used for importing the jsx and jsxs factory functions when using jsx as "react-jsx" or "react-jsxdev" which were introduced in TypeScript 4.1.',
    category: "Language and Environment",
    since: "4.1",
    related: ["jsx", "jsxFactory"],
    examples: [
      '"react"  // Import from react/jsx-runtime',
      '"preact" // Import from preact/jsx-runtime',
      '"solid"  // Import from solid-js/jsx-runtime',
    ],
  },

  lib: {
    type: "array",
    default: ["es2022"],
    description:
      "TypeScript includes a default set of type definitions for built-in JS APIs (like Math), as well as type definitions for things found in browser environments (like document). TypeScript also includes APIs for newer JS features matching the target you specify.",
    category: "Language and Environment",
    since: "2.0",
    related: ["target", "noLib"],
    examples: [
      '["es2022"]                           // Modern JavaScript APIs only',
      '["es2022", "dom"]                    // JavaScript + DOM APIs',
      '["es2022", "dom", "dom.iterable"]    // JavaScript + DOM + iterables',
      '["es2022", "webworker"]              // JavaScript + Web Worker APIs',
    ],
  },

  libReplacement: {
    type: "boolean",
    default: true,
    description:
      "TypeScript 4.5 introduced the possibility of substituting the default lib files with custom ones. All built-in library files would first try to be resolved from packages named @typescript/lib-*. The libReplacement flag allows you to disable this behavior.",
    category: "Language and Environment",
    since: "4.5",
    related: ["lib"],
    examples: [
      "true  // Allow lib file replacement via npm packages",
      "false // Use only built-in lib files",
    ],
  },

  moduleDetection: {
    type: "string",
    default: "force",
    choices: ["legacy", "auto", "force"],
    description:
      'This setting controls how TypeScript determines whether a file is a script or a module. "auto" (default) - TypeScript will look for import/export statements and package.json type field. "legacy" - The same behavior as 4.6 and prior, using import and export statements. "force" - Ensures that every non-declaration file is treated as a module.',
    category: "Language and Environment",
    since: "4.7",
    examples: [
      '"force"  // Treat all files as modules',
      '"auto"   // Auto-detect based on imports/exports',
      '"legacy" // Legacy detection behavior',
    ],
  },

  noLib: {
    type: "boolean",
    default: false,
    description:
      "Disables the automatic inclusion of any library files. If this option is set, lib is ignored. TypeScript cannot compile anything without a set of interfaces for key primitives like: Array, Boolean, Function, IArguments, Number, Object, RegExp, and String.",
    category: "Language and Environment",
    since: "1.0",
    related: ["lib"],
    examples: [
      "true  // Don't include any library files",
      "false // Include default library files",
    ],
  },

  reactNamespace: {
    type: "string",
    default: "React",
    description:
      "Use jsxFactory instead. Specify the object invoked for createElement when targeting react for TSX files.",
    category: "Language and Environment",
    since: "1.8",
    deprecated: true,
    related: ["jsxFactory"],
    examples: [
      '"React"  // Default React namespace',
      '"Preact" // Preact namespace',
    ],
  },

  target: {
    type: "string",
    default: "es2022",
    choices: [
      "es3",
      "es5",
      "es6",
      "es2015",
      "es2016",
      "es2017",
      "es2018",
      "es2019",
      "es2020",
      "es2021",
      "es2022",
      "es2023",
      "es2024",
      "esnext",
    ],
    description:
      "Modern browsers support all ES6 features, so ES6 is a good choice. You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments. The target setting changes which JS features are downleveled and which are left intact.",
    category: "Language and Environment",
    since: "1.0",
    related: ["lib", "useDefineForClassFields"],
    examples: [
      '"es2022" // Modern JavaScript (recommended)',
      '"es2020" // Slightly older but widely supported',
      '"es5"    // Legacy browser support',
      '"esnext" // Latest JavaScript features',
    ],
  },

  useDefineForClassFields: {
    type: "boolean",
    default: true,
    description:
      "This flag is used as part of migrating to the upcoming standard version of class fields. TypeScript introduced class fields many years before it was ratified in TC39. The latest version of the upcoming specification has a different runtime behavior to TypeScript's implementation but the same syntax.",
    category: "Language and Environment",
    since: "3.7",
    related: ["target"],
    examples: [
      "true  // Use standard class field behavior",
      "false // Use TypeScript legacy class field behavior",
    ],
  },
};
