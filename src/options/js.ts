import type { OptionDefinition } from "../types";

export const javascriptSupportOptions: Record<string, OptionDefinition> = {
  allowJs: {
    type: "boolean",
    default: false,
    description:
      "Allow JavaScript files to be imported inside your project, instead of just .ts and .tsx files. This flag can be used as a way to incrementally add TypeScript files into JS projects by allowing the .ts and .tsx files to live along-side existing JavaScript files.",
    category: "JavaScript Support",
    since: "1.8",
    related: ["checkJs", "emitDeclarationOnly"],
    examples: [
      "true  // Allow importing .js files",
      "false // Only allow .ts and .tsx files",
    ],
  },

  checkJs: {
    type: "boolean",
    default: false,
    description:
      "Works in tandem with allowJs. When checkJs is enabled then errors are reported in JavaScript files. This is the equivalent of including // @ts-check at the top of all JavaScript files which are included in your project.",
    category: "JavaScript Support",
    since: "2.3",
    related: ["allowJs", "emitDeclarationOnly"],
    examples: [
      "true  // Type-check JavaScript files",
      "false // Don't type-check JavaScript files",
    ],
  },

  maxNodeModuleJsDepth: {
    type: "number",
    default: 0,
    description:
      "The maximum dependency depth to search under node_modules and load JavaScript files. This flag can only be used when allowJs is enabled, and is used if you want to have TypeScript infer types for all of the JavaScript inside your node_modules.",
    category: "JavaScript Support",
    since: "2.0",
    related: ["allowJs"],
    examples: [
      "0 // Don't search node_modules for JS files",
      "1 // Search one level deep in node_modules",
      "2 // Search two levels deep in node_modules",
    ],
  },
};
