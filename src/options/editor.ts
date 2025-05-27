import type { OptionDefinition } from "../types";

export const editorSupportOptions: Record<string, OptionDefinition> = {
  disableSizeLimit: {
    type: "boolean",
    default: false,
    description:
      "To avoid a possible memory bloat issues when working with very large JavaScript projects, there is an upper limit to the amount of memory TypeScript will allocate. Turning this flag on will remove the limit.",
    category: "Editor Support",
    since: "2.0",
    examples: [
      "true  // Remove memory limit for large projects",
      "false // Use default memory limit",
    ],
  },

  plugins: {
    type: "array",
    default: undefined,
    description:
      "List of language service plugins to run inside the editor. Language service plugins are a way to provide additional information to a user based on existing TypeScript files. They can enhance existing messages between TypeScript and an editor, or to provide their own error messages.",
    category: "Editor Support",
    since: "2.2",
    examples: [
      '[{"name": "typescript-styled-plugin"}]           // CSS linting in template strings',
      '[{"name": "ts-sql-plugin"}]                      // SQL linting in template strings',
      '[{"name": "typescript-eslint-language-service"}] // ESLint integration',
    ],
  },
};
