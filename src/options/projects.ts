import type { OptionDefinition } from "../types";

export const projectsOptions: Record<string, OptionDefinition> = {
  composite: {
    type: "boolean",
    default: false,
    description:
      "The composite option enforces certain constraints which make it possible for build tools (including TypeScript itself, under --build mode) to quickly determine if a project has been built yet. When this setting is on: The rootDir setting, if not explicitly set, defaults to the directory containing the tsconfig.json file. All implementation files must be matched by an include pattern or listed in the files array. declaration defaults to true.",
    category: "Projects",
    since: "3.0",
    related: ["incremental", "tsBuildInfoFile", "declaration"],
    examples: [
      "true  // Enable project references support",
      "false // Disable composite project features",
    ],
  },

  disableReferencedProjectLoad: {
    type: "boolean",
    default: false,
    description:
      "In multi-project TypeScript programs, TypeScript will load all of the available projects into memory in order to provide accurate results for editor responses which require a full knowledge graph like 'Find All References'. If your project is large, you can use the flag disableReferencedProjectLoad to disable the automatic loading of all projects.",
    category: "Projects",
    since: "4.0",
    examples: [
      "true  // Don't auto-load referenced projects",
      "false // Auto-load all referenced projects",
    ],
  },

  disableSolutionSearching: {
    type: "boolean",
    default: false,
    description:
      "When working with composite TypeScript projects, this option provides a way to declare that you do not want a project to be included when using features like find all references or jump to definition in an editor. This flag is something you can use to increase responsiveness in large composite projects.",
    category: "Projects",
    since: "3.8",
    examples: [
      "true  // Exclude from solution-wide operations",
      "false // Include in solution-wide operations",
    ],
  },

  disableSourceOfProjectReferenceRedirect: {
    type: "boolean",
    default: false,
    description:
      "When working with composite TypeScript projects, this option provides a way to go back to the pre-3.7 behavior where d.ts files were used to as the boundaries between modules. In 3.7 the source of truth is now your TypeScript files.",
    category: "Projects",
    since: "3.7",
    examples: [
      "true  // Use .d.ts files as module boundaries",
      "false // Use source .ts files as boundaries",
    ],
  },

  incremental: {
    type: "boolean",
    default: false,
    description:
      "Tells TypeScript to save information about the project graph from the last compilation to files stored on disk. This creates a series of .tsbuildinfo files in the same folder as your compilation output. They are not used by your JavaScript at runtime and can be safely deleted.",
    category: "Projects",
    since: "3.4",
    related: ["composite", "tsBuildInfoFile"],
    examples: [
      "true  // Enable incremental compilation",
      "false // Disable incremental compilation",
    ],
  },
  tsBuildInfoFile: {
    type: "string",
    default: undefined,
    description:
      "This setting lets you specify a file for storing incremental compilation information as a part of composite projects which enables faster building of larger TypeScript codebases. The default depends on a combination of other settings: If outFile is set, the default is <outFile>.tsbuildinfo. If rootDir and outDir are set, then the file is <outDir>/<relative path to config from rootDir>/<config name>.tsbuildinfo. If outDir is set, then the default is <outDir>/<config name>.tsbuildInfo. Otherwise, the default is <config name>.tsbuildInfo.",
    category: "Projects",
    since: "3.4",
    related: ["incremental", "composite"],
    examples: [
      '".tsbuildinfo"           // Default build info file',
      '"build/project.tsbuildinfo" // Custom build info location',
      '"dist/.tsbuildinfo"      // Build info in output directory',
    ],
  },
};
