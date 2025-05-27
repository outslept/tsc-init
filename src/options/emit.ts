import type { OptionDefinition } from "../types";

export const emitOptions: Record<string, OptionDefinition> = {
  declaration: {
    type: "boolean",
    default: false,
    description:
      "Generate .d.ts files for every TypeScript or JavaScript file inside your project. These .d.ts files are type definition files which describe the external API of your module. With .d.ts files, tools like TypeScript can provide intellisense and accurate types for un-typed code.",
    category: "Emit",
    since: "1.0",
    related: ["declarationDir", "emitDeclarationOnly"],
    examples: [
      "true  // Generate .d.ts declaration files",
      "false // Don't generate declaration files",
    ],
  },

  declarationDir: {
    type: "string",
    default: undefined,
    description:
      "Offers a way to configure the root directory for where declaration files are emitted.",
    category: "Emit",
    since: "2.0",
    related: ["declaration"],
    examples: [
      '"./types"  // Emit declarations to types directory',
      '"./dist/types" // Emit to dist/types directory',
    ],
  },

  declarationMap: {
    type: "boolean",
    default: false,
    description:
      "Generates a source map for .d.ts files which map back to the original .ts source file. This will allow editors such as VS Code to go to the original .ts file when using features like Go to Definition. You should strongly consider turning this on if you're using project references.",
    category: "Emit",
    since: "2.9",
    related: ["declaration", "sourceMap"],
    examples: [
      "true  // Generate source maps for .d.ts files",
      "false // Don't generate declaration source maps",
    ],
  },

  downlevelIteration: {
    type: "boolean",
    default: false,
    description:
      "Downleveling is TypeScript's term for transpiling to an older version of JavaScript. This flag is to enable support for a more accurate implementation of how modern JavaScript iterates through new concepts in older JavaScript runtimes.",
    category: "Emit",
    since: "2.3",
    related: ["importHelpers"],
    examples: [
      "true  // Use accurate iteration for older targets",
      "false // Use simple iteration downleveling",
    ],
  },

  emitBOM: {
    type: "boolean",
    default: false,
    description:
      "Controls whether TypeScript will emit a byte order mark (BOM) when writing output files. Some runtime environments require a BOM to correctly interpret a JavaScript files; others require that it is not present.",
    category: "Emit",
    since: "1.0",
    examples: ["true  // Emit BOM in output files", "false // Don't emit BOM"],
  },

  emitDeclarationOnly: {
    type: "boolean",
    default: false,
    description:
      "Only emit .d.ts files; do not emit .js files. This setting is useful in two cases: You are using a transpiler other than TypeScript to generate your JavaScript, or you are using TypeScript to only generate d.ts files for your consumers.",
    category: "Emit",
    since: "2.8",
    related: ["declaration"],
    examples: [
      "true  // Only emit declaration files",
      "false // Emit both JS and declaration files",
    ],
  },

  importHelpers: {
    type: "boolean",
    default: false,
    description:
      "For certain downleveling operations, TypeScript uses some helper code for operations like extending class, spreading arrays or objects, and async operations. By default, these helpers are inserted into files which use them. If the importHelpers flag is on, these helper functions are instead imported from the tslib module.",
    category: "Emit",
    since: "2.1",
    related: ["noEmitHelpers", "downlevelIteration"],
    examples: [
      "true  // Import helpers from tslib",
      "false // Inline helpers in each file",
    ],
  },

  inlineSourceMap: {
    type: "boolean",
    default: false,
    description:
      "When set, instead of writing out a .js.map file to provide source maps, TypeScript will embed the source map content in the .js files. Although this results in larger JS files, it can be convenient in some scenarios.",
    category: "Emit",
    since: "1.5",
    related: ["sourceMap", "inlineSources"],
    examples: [
      "true  // Embed source maps in JS files",
      "false // Generate separate .map files",
    ],
  },

  inlineSources: {
    type: "boolean",
    default: false,
    description:
      "When set, TypeScript will include the original content of the .ts file as an embedded string in the source map (using the source map's sourcesContent property). This is often useful in the same cases as inlineSourceMap.",
    category: "Emit",
    since: "1.5",
    related: ["sourceMap", "inlineSourceMap"],
    examples: [
      "true  // Include source content in source maps",
      "false // Don't include source content",
    ],
  },

  mapRoot: {
    type: "string",
    default: undefined,
    description:
      "Specify the location where debugger should locate map files instead of generated locations. This string is treated verbatim inside the source-map.",
    category: "Emit",
    since: "1.0",
    related: ["sourceMap", "sourceRoot"],
    examples: [
      '"https://my-website.com/debug/sourcemaps/" // Remote source map location',
      '"../maps/"                                  // Relative map directory',
      '"/debug/maps/"                             // Absolute map directory',
    ],
  },

  newLine: {
    type: "string",
    default: "lf",
    choices: ["crlf", "lf"],
    description:
      "Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix).",
    category: "Emit",
    since: "1.5",
    examples: [
      String.raw`"lf"   // Unix line endings (\n)`,
      String.raw`"crlf" // Windows line endings (\r\n)`,
    ],
  },

  noEmit: {
    type: "boolean",
    default: false,
    description:
      "Do not emit compiler output files like JavaScript source code, source-maps or declarations. This makes room for another tool like Babel, or swc to handle converting the TypeScript file to a file which can run inside a JavaScript environment.",
    category: "Emit",
    since: "1.5",
    examples: [
      "true  // Don't emit any output files",
      "false // Emit JavaScript and other output files",
    ],
  },

  noEmitHelpers: {
    type: "boolean",
    default: false,
    description:
      "Instead of importing helpers with importHelpers, you can provide implementations in the global scope for the helpers you use and completely turn off emitting of helper functions.",
    category: "Emit",
    since: "1.5",
    related: ["importHelpers"],
    examples: [
      "true  // Don't emit helper functions",
      "false // Emit helper functions as needed",
    ],
  },

  noEmitOnError: {
    type: "boolean",
    default: false,
    description:
      "Do not emit compiler output files like JavaScript source code, source-maps or declarations if any errors were reported. This defaults to false, making it easier to work with TypeScript in a watch-like environment.",
    category: "Emit",
    since: "1.4",
    examples: [
      "true  // Don't emit if there are errors",
      "false // Emit even with errors",
    ],
  },

  outDir: {
    type: "string",
    default: undefined,
    description:
      "If specified, .js (as well as .d.ts, .js.map, etc.) files will be emitted into this directory. The directory structure of the original source files is preserved.",
    category: "Emit",
    since: "1.0",
    related: ["rootDir", "outFile"],
    examples: [
      '"dist"     // Emit to dist directory',
      '"build"    // Emit to build directory',
      '"./output" // Emit to output directory',
    ],
  },

  outFile: {
    type: "string",
    default: undefined,
    description:
      "If specified, all global (non-module) files will be concatenated into the single output file specified. If module is system or amd, all module files will also be concatenated into this file after all global content. Note: outFile cannot be used unless module is None, System, or AMD.",
    category: "Emit",
    since: "1.6",
    related: ["module", "outDir"],
    examples: [
      '"bundle.js"     // Concatenate all files into bundle.js',
      '"dist/app.js"   // Output concatenated file to dist/app.js',
    ],
    validation: (value, options) => {
      if (
        value &&
        options?.module &&
        !["none", "system", "amd"].includes(options.module as string)
      ) {
        return "outFile can only be used with module: none, system, or amd";
      }
      return true;
    },
  },

  preserveConstEnums: {
    type: "boolean",
    default: false,
    description:
      "Do not erase const enum declarations in generated code. const enums provide a way to reduce the overall memory footprint of your application at runtime by emitting the enum value instead of a reference.",
    category: "Emit",
    since: "1.4",
    examples: [
      "true  // Keep const enum declarations in output",
      "false // Inline const enum values",
    ],
  },

  removeComments: {
    type: "boolean",
    default: false,
    description:
      "Strips all comments from TypeScript files when converting into JavaScript. Defaults to false.",
    category: "Emit",
    since: "1.0",
    examples: [
      "true  // Remove all comments from output",
      "false // Preserve comments in output",
    ],
  },

  sourceMap: {
    type: "boolean",
    default: false,
    description:
      "Enables the generation of sourcemap files. These files allow debuggers and other tools to display the original TypeScript source code when actually working with the emitted JavaScript files.",
    category: "Emit",
    since: "1.0",
    related: ["inlineSourceMap", "mapRoot", "sourceRoot"],
    examples: [
      "true  // Generate .js.map source map files",
      "false // Don't generate source maps",
    ],
  },

  sourceRoot: {
    type: "string",
    default: undefined,
    description:
      "Specify the location where a debugger should locate TypeScript files instead of relative source locations. This string is treated verbatim inside the source-map.",
    category: "Emit",
    since: "1.0",
    related: ["sourceMap", "mapRoot"],
    examples: [
      '"https://my-website.com/debug/source/" // Remote source location',
      '"../src/"                              // Relative source directory',
      '"/debug/src/"                          // Absolute source directory',
    ],
  },

  stripInternal: {
    type: "boolean",
    default: false,
    description:
      "Do not emit declarations for code that has an @internal annotation in its JSDoc comment. This is an internal compiler option; use at your own risk, because the compiler does not check that the result is valid.",
    category: "Emit",
    since: "1.5",
    examples: [
      "true  // Strip @internal declarations",
      "false // Keep all declarations",
    ],
  },
};
