import type { OptionDefinition } from "../types";

export const compilerDiagnosticsOptions: Record<string, OptionDefinition> = {
  diagnostics: {
    type: "boolean",
    default: false,
    description:
      "Used to output diagnostic information for debugging. This command is a subset of extendedDiagnostics which are more user-facing results, and easier to interpret.",
    category: "Compiler Diagnostics",
    since: "1.0",
    deprecated: true,
    related: ["extendedDiagnostics"],
    examples: [
      "true  // Output basic diagnostic information",
      "false // No diagnostic output",
    ],
  },

  explainFiles: {
    type: "boolean",
    default: false,
    description:
      "Print names of files which TypeScript sees as a part of your project and the reason they are part of the compilation. This option is intended for debugging how a file has become a part of your compile.",
    category: "Compiler Diagnostics",
    since: "4.2",
    related: ["listFiles"],
    examples: [
      "true  // Explain why each file is included",
      "false // Don't explain file inclusion",
    ],
  },

  extendedDiagnostics: {
    type: "boolean",
    default: false,
    description:
      "You can use this flag to discover where TypeScript is spending its time when compiling. This is a tool used for understanding the performance characteristics of your codebase overall.",
    category: "Compiler Diagnostics",
    since: "2.0",
    related: ["diagnostics"],
    examples: [
      "true  // Output detailed performance diagnostics",
      "false // No extended diagnostics",
    ],
  },

  generateCpuProfile: {
    type: "string",
    default: undefined,
    description:
      "This option gives you the chance to have TypeScript emit a v8 CPU profile during the compiler run. The CPU profile can provide insight into why your builds may be slow. This option can only be used from the CLI via: --generateCpuProfile tsc-output.cpuprofile.",
    category: "Compiler Diagnostics",
    since: "3.7",
    examples: [
      '"tsc-output.cpuprofile" // Generate CPU profile',
      '"profile.cpuprofile"    // Custom profile name',
    ],
  },

  generateTrace: {
    type: "string",
    default: undefined,
    description: "Generates an event trace and a list of types.",
    category: "Compiler Diagnostics",
    since: "4.1",
    examples: [
      '"trace"     // Generate trace in trace directory',
      '"./traces"  // Custom trace directory',
    ],
  },

  listEmittedFiles: {
    type: "boolean",
    default: false,
    description:
      "Print names of generated files part of the compilation to the terminal. This flag is useful in two cases: You want to transpile TypeScript as a part of a build chain in the terminal where the filenames are processed in the next command, or you are not sure that TypeScript has included a file you expected.",
    category: "Compiler Diagnostics",
    since: "2.0",
    examples: [
      "true  // List all emitted files",
      "false // Don't list emitted files",
    ],
  },

  listFiles: {
    type: "boolean",
    default: false,
    description:
      "Print names of files part of the compilation. This is useful when you are not sure that TypeScript has included a file you expected. Note if using TypeScript 4.2, prefer explainFiles which offers an explanation of why a file was added too.",
    category: "Compiler Diagnostics",
    since: "1.5",
    related: ["explainFiles"],
    examples: [
      "true  // List all input files",
      "false // Don't list input files",
    ],
  },

  noCheck: {
    type: "boolean",
    default: false,
    description:
      "Disable full type checking (only critical parse and emit errors will be reported).",
    category: "Compiler Diagnostics",
    since: "5.6",
    examples: [
      "true  // Skip type checking for faster builds",
      "false // Perform full type checking",
    ],
  },

  traceResolution: {
    type: "boolean",
    default: false,
    description:
      "When you are trying to debug why a module isn't being included. You can set traceResolution to true to have TypeScript print information about its resolution process for each processed file.",
    category: "Compiler Diagnostics",
    since: "2.0",
    examples: [
      "true  // Trace module resolution process",
      "false // Don't trace module resolution",
    ],
  },
};
