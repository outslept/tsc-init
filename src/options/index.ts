import type { OptionDefinition } from "../types";
import { backwardsCompatibilityOptions } from "./backwards-compat";
import { compilerDiagnosticsOptions } from "./compiler-diagnostics";
import { completenessOptions } from "./completeness";
import { editorSupportOptions } from "./editor";
import { emitOptions } from "./emit";
import { interopConstraintsOptions } from "./interop-constraints";
import { javascriptSupportOptions } from "./js";
import { languageEnvironmentOptions } from "./language-environment";
import { modulesOptions } from "./modules";
import { outputFormattingOptions } from "./output-formatting";
import { projectsOptions } from "./projects";
import { typeCheckingOptions } from "./type-checking";

export const ALL_OPTIONS: Record<string, OptionDefinition> = {
  ...typeCheckingOptions,
  ...modulesOptions,
  ...emitOptions,
  ...javascriptSupportOptions,
  ...editorSupportOptions,
  ...interopConstraintsOptions,
  ...backwardsCompatibilityOptions,
  ...languageEnvironmentOptions,
  ...compilerDiagnosticsOptions,
  ...projectsOptions,
  ...outputFormattingOptions,
  ...completenessOptions,
};

export const OPTION_CATEGORIES = {
  "Type Checking": typeCheckingOptions,
  Modules: modulesOptions,
  Emit: emitOptions,
  "JavaScript Support": javascriptSupportOptions,
  "Editor Support": editorSupportOptions,
  "Interop Constraints": interopConstraintsOptions,
  "Backwards Compatibility": backwardsCompatibilityOptions,
  "Language and Environment": languageEnvironmentOptions,
  "Compiler Diagnostics": compilerDiagnosticsOptions,
  Projects: projectsOptions,
  "Output Formatting": outputFormattingOptions,
  Completeness: completenessOptions,
} as const;

export {
  backwardsCompatibilityOptions,
  compilerDiagnosticsOptions,
  completenessOptions,
  editorSupportOptions,
  emitOptions,
  interopConstraintsOptions,
  javascriptSupportOptions,
  languageEnvironmentOptions,
  modulesOptions,
  outputFormattingOptions,
  projectsOptions,
  typeCheckingOptions,
};
