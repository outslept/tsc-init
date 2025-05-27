#!/usr/bin/env node
/* eslint-disable no-console */

import process from "node:process";
import { parseCliArgs } from "./cli/args.js";
import { executeCommand } from "./cli/commands.js";

process.on("SIGINT", () => {
  console.log("\nOperation cancelled.");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nOperation terminated.");
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

function main(): void {
  try {
    const args = parseCliArgs();
    executeCommand(args);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

main();
