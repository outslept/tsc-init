import type { OptionDefinition } from "../types";

export const outputFormattingOptions: Record<string, OptionDefinition> = {
  noErrorTruncation: {
    type: "boolean",
    default: false,
    description:
      "Do not truncate error messages. With false (the default), long type names in error messages are truncated. With true, the full type information is shown.",
    category: "Output Formatting",
    since: "1.0",
    examples: [
      "true  // Show full error messages",
      "false // Truncate long error messages",
    ],
  },

  preserveWatchOutput: {
    type: "boolean",
    default: false,
    description:
      "Whether to keep outdated console output in watch mode instead of clearing the screen every time a change happened.",
    category: "Output Formatting",
    since: "2.8",
    examples: [
      "true  // Keep previous output in watch mode",
      "false // Clear screen on each watch rebuild",
    ],
  },

  pretty: {
    type: "boolean",
    default: true,
    description:
      "Stylize errors and messages using color and context, this is on by default — offers you a chance to have less terse, single colored messages from the compiler.",
    category: "Output Formatting",
    since: "1.8",
    examples: [
      "true  // Use colors and formatting in output",
      "false // Plain text output",
    ],
  },
};
