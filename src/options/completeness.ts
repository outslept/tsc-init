import type { OptionDefinition } from "../types";

export const completenessOptions: Record<string, OptionDefinition> = {
  skipDefaultLibCheck: {
    type: "boolean",
    default: false,
    description:
      "Use skipLibCheck instead. Skip type checking of default library declaration files.",
    category: "Completeness",
    since: "1.6",
    deprecated: true,
    related: ["skipLibCheck"],
    examples: [
      "true  // Skip checking default lib files",
      "false // Check all declaration files",
    ],
  },

  skipLibCheck: {
    type: "boolean",
    default: true,
    description:
      "Skip type checking of declaration files. This can save time during compilation at the expense of type-system accuracy. For example, two libraries could define two copies of the same type in an inconsistent way. Rather than doing a full check of all d.ts files, TypeScript will type check the code you specifically refer to in your app's source code.",
    category: "Completeness",
    since: "2.0",
    examples: [
      "true  // Skip type checking .d.ts files (recommended)",
      "false // Type check all .d.ts files",
    ],
  },
};
