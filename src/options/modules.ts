import type { OptionDefinition } from "../types";

export const modulesOptions: Record<string, OptionDefinition> = {
  allowArbitraryExtensions: {
    type: "boolean",
    default: false,
    description:
      "In TypeScript 5.0, when an import path ends in an extension that isn't a known JavaScript or TypeScript file extension, the compiler will look for a declaration file for that path in the form of {file basename}.d.{extension}.ts. This allows you to import files with custom extensions when using bundlers.",
    category: "Modules",
    since: "5.0",
    examples: [
      "true  // Allow imports with arbitrary extensions",
      "false // Only allow known JS/TS extensions",
    ],
  },

  allowImportingTsExtensions: {
    type: "boolean",
    default: false,
    description:
      "allowImportingTsExtensions allows TypeScript files to import each other with a TypeScript-specific extension like .ts, .mts, or .tsx. This flag is only allowed when noEmit or emitDeclarationOnly is enabled, since these import paths would not be resolvable at runtime in JavaScript output files.",
    category: "Modules",
    since: "5.0",
    related: ["noEmit", "emitDeclarationOnly"],
    examples: [
      "true  // Allow importing .ts extensions",
      "false // Require extensionless imports",
    ],
    validation: (value, options) => {
      if (value && !options?.noEmit && !options?.emitDeclarationOnly) {
        return "allowImportingTsExtensions requires noEmit or emitDeclarationOnly";
      }
      return true;
    },
  },

  allowUmdGlobalAccess: {
    type: "boolean",
    default: false,
    description:
      "When set to true, allowUmdGlobalAccess lets you access UMD exports as globals from inside module files. A module file is a file that has imports and/or exports. An example use case for this flag would be a web project where you know the particular library (like jQuery or Lodash) will always be available at runtime.",
    category: "Modules",
    since: "3.5",
    examples: [
      "true  // Allow UMD global access in modules",
      "false // Require explicit imports for UMD modules",
    ],
  },

  baseUrl: {
    type: "string",
    default: undefined,
    description:
      "Sets a base directory from which to resolve bare specifier module names. This feature was designed for use in conjunction with AMD module loaders in the browser, and is not recommended in any other context. As of TypeScript 4.1, baseUrl is no longer required to be set when using paths.",
    category: "Modules",
    since: "2.0",
    related: ["paths"],
    examples: [
      '"."     // Use current directory as base',
      '"src"   // Use src directory as base',
      '"./lib" // Use lib directory as base',
    ],
  },

  customConditions: {
    type: "array",
    default: undefined,
    description:
      "customConditions takes a list of additional conditions that should succeed when TypeScript resolves from an exports or imports field of a package.json. These conditions are added to whatever existing conditions a resolver will use by default. This field is only valid under the node16, nodenext, and bundler options for moduleResolution.",
    category: "Modules",
    since: "5.0",
    related: [
      "moduleResolution",
      "resolvePackageJsonExports",
      "resolvePackageJsonImports",
    ],
    examples: [
      '["my-condition"]           // Single custom condition',
      '["development", "custom"]  // Multiple conditions',
    ],
  },

  module: {
    type: "string",
    default: "NodeNext",
    choices: [
      "none",
      "commonjs",
      "amd",
      "umd",
      "system",
      "es6",
      "es2015",
      "es2020",
      "es2022",
      "esnext",
      "node16",
      "node18",
      "nodenext",
      "preserve",
    ],
    description:
      'Sets the module system for the program. You very likely want "nodenext" for modern Node.js projects and preserve or esnext for code that will be bundled. Changing module affects moduleResolution which also has a reference page.',
    category: "Modules",
    since: "1.0",
    related: ["moduleResolution", "esModuleInterop"],
    examples: [
      '"NodeNext"  // Modern Node.js with ESM/CJS detection',
      '"preserve"  // Keep original import/export syntax',
      '"ES2022"    // ECMAScript 2022 modules',
      '"CommonJS"  // Traditional Node.js modules',
    ],
  },

  moduleResolution: {
    type: "string",
    default: "NodeNext",
    choices: ["classic", "node10", "node", "node16", "nodenext", "bundler"],
    description:
      "Specify the module resolution strategy. node16/nodenext for modern versions of Node.js, bundler for use with bundlers, node10 for Node.js versions older than v10, classic should not be used.",
    category: "Modules",
    since: "1.6",
    related: ["module", "paths", "baseUrl"],
    examples: [
      '"NodeNext" // Modern Node.js resolution',
      '"bundler"  // Bundler-compatible resolution',
      '"node16"   // Node.js 16+ resolution',
      '"classic"  // Legacy TypeScript resolution',
    ],
  },

  moduleSuffixes: {
    type: "array",
    default: undefined,
    description:
      "Provides a way to override the default list of file name suffixes to search when resolving a module. This feature can be useful for React Native projects where each target platform can use a separate tsconfig.json with differing moduleSuffixes.",
    category: "Modules",
    since: "4.7",
    examples: [
      '[".ios", ".native", ""]     // React Native iOS',
      '[".android", ".native", ""] // React Native Android',
      '[".web", ""]                // Web-specific modules',
    ],
  },

  noResolve: {
    type: "boolean",
    default: false,
    description:
      "By default, TypeScript will examine the initial set of files for import and <reference directives and add these resolved files to your program. If noResolve is set, this process doesn't happen. However, import statements are still checked to see if they resolve to a valid module.",
    category: "Modules",
    since: "1.0",
    examples: [
      "true  // Don't resolve imports automatically",
      "false // Resolve imports and references",
    ],
  },

  noUncheckedSideEffectImports: {
    type: "boolean",
    default: true,
    description:
      "When noUncheckedSideEffectImports is enabled, TypeScript will error if it can't find a source file for a side effect import. This masks potential typos on side effect imports.",
    category: "Modules",
    since: "5.6",
    examples: [
      "true  // Error on unresolved side effect imports",
      "false // Allow unresolved side effect imports",
    ],
  },

  paths: {
    type: "object",
    default: undefined,
    description:
      "A series of entries which re-map imports to lookup locations relative to the baseUrl if set, or to the tsconfig file itself otherwise. paths lets you declare how TypeScript should resolve an import in your require/imports.",
    category: "Modules",
    since: "2.0",
    related: ["baseUrl"],
    examples: [
      '{"@/*": ["./src/*"]}                    // Map @/ to src/',
      '{"utils/*": ["./src/utils/*"]}          // Map utils/ to src/utils/',
      '{"@components/*": ["./src/components/*"]} // Map @components/ to src/components/',
    ],
  },

  resolveJsonModule: {
    type: "boolean",
    default: true,
    description:
      "Allows importing modules with a .json extension, which is a common practice in node projects. This includes generating a type for the import based on the static JSON shape.",
    category: "Modules",
    since: "2.9",
    examples: [
      "true  // Allow importing JSON files",
      "false // Disallow JSON imports",
    ],
  },

  resolvePackageJsonExports: {
    type: "boolean",
    default: true,
    description:
      "resolvePackageJsonExports forces TypeScript to consult the exports field of package.json files if it ever reads from a package in node_modules. This option defaults to true under the node16, nodenext, and bundler options for moduleResolution.",
    category: "Modules",
    since: "5.0",
    related: [
      "moduleResolution",
      "customConditions",
      "resolvePackageJsonImports",
    ],
    examples: [
      "true  // Use package.json exports field",
      "false // Ignore package.json exports field",
    ],
  },

  resolvePackageJsonImports: {
    type: "boolean",
    default: true,
    description:
      "resolvePackageJsonImports forces TypeScript to consult the imports field of package.json files when performing a lookup that starts with # from a file whose ancestor directory contains a package.json. This option defaults to true under the node16, nodenext, and bundler options for moduleResolution.",
    category: "Modules",
    since: "5.0",
    related: [
      "moduleResolution",
      "customConditions",
      "resolvePackageJsonExports",
    ],
    examples: [
      "true  // Use package.json imports field",
      "false // Ignore package.json imports field",
    ],
  },

  rewriteRelativeImportExtensions: {
    type: "boolean",
    default: false,
    description:
      "Rewrite .ts, .tsx, .mts, and .cts file extensions in relative import paths to their JavaScript equivalent in output files.",
    category: "Modules",
    since: "5.7",
    examples: [
      "true  // Rewrite TS extensions to JS in output",
      "false // Keep original extensions in output",
    ],
  },

  rootDir: {
    type: "string",
    default: undefined,
    description:
      "Default: The longest common path of all non-declaration input files. When TypeScript compiles files, it keeps the same directory structure in the output directory as exists in the input directory. rootDir also enforces that all files which need to be emitted are underneath the rootDir path.",
    category: "Modules",
    since: "1.5",
    related: ["outDir"],
    examples: [
      '"src"  // Use src as root directory',
      '"."    // Use current directory as root',
      '"lib"  // Use lib as root directory',
    ],
  },

  rootDirs: {
    type: "array",
    default: undefined,
    description:
      'Using rootDirs, you can inform the compiler that there are many "virtual" directories acting as a single root. This allows the compiler to resolve relative module imports within these "virtual" directories, as if they were merged in to one directory.',
    category: "Modules",
    since: "2.0",
    examples: [
      '["src/views", "generated/templates/views"] // Virtual directory merging',
      '["src", "generated"]                       // Source and generated code',
    ],
  },

  typeRoots: {
    type: "array",
    default: undefined,
    description:
      'By default all visible "@types" packages are included in your compilation. If typeRoots is specified, only packages under typeRoots will be included.',
    category: "Modules",
    since: "2.0",
    related: ["types"],
    examples: [
      '["./typings", "./vendor/types"] // Custom type roots',
      '["./types"]                     // Single custom type root',
    ],
  },

  types: {
    type: "array",
    default: undefined,
    description:
      'By default all visible "@types" packages are included in your compilation. If types is specified, only packages listed will be included in the global scope. This feature differs from typeRoots in that it is about specifying only the exact types you want included.',
    category: "Modules",
    since: "2.0",
    related: ["typeRoots"],
    examples: [
      '["node", "jest", "express"] // Only include specific types',
      '["node"]                    // Only include Node.js types',
      "[]                          // Include no @types packages",
    ],
  },
};
