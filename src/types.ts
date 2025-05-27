export interface TSConfig {
  $schema: string;
  compilerOptions: CompilerOptions;
  include?: string[];
  exclude?: string[];
  files?: string[];
  extends?: string | string[];
  references?: ProjectReference[];
  watchOptions?: WatchOptions;
  typeAcquisition?: TypeAcquisition;
  buildOptions?: BuildOptions;
}

export interface CompilerOptions {
  allowUnreachableCode?: boolean;
  allowUnusedLabels?: boolean;
  alwaysStrict?: boolean;
  exactOptionalPropertyTypes?: boolean;
  noFallthroughCasesInSwitch?: boolean;
  noImplicitAny?: boolean;
  noImplicitOverride?: boolean;
  noImplicitReturns?: boolean;
  noImplicitThis?: boolean;
  noPropertyAccessFromIndexSignature?: boolean;
  noUncheckedIndexedAccess?: boolean;
  noUnusedLocals?: boolean;
  noUnusedParameters?: boolean;
  strict?: boolean;
  strictBindCallApply?: boolean;
  strictBuiltinIteratorReturn?: boolean;
  strictFunctionTypes?: boolean;
  strictNullChecks?: boolean;
  strictPropertyInitialization?: boolean;
  useUnknownInCatchVariables?: boolean;
  allowArbitraryExtensions?: boolean;
  allowImportingTsExtensions?: boolean;
  allowUmdGlobalAccess?: boolean;
  baseUrl?: string;
  customConditions?: string[];
  module?: ModuleKind;
  moduleResolution?: ModuleResolutionKind;
  moduleSuffixes?: string[];
  noResolve?: boolean;
  noUncheckedSideEffectImports?: boolean;
  paths?: Record<string, string[]>;
  resolveJsonModule?: boolean;
  resolvePackageJsonExports?: boolean;
  resolvePackageJsonImports?: boolean;
  rewriteRelativeImportExtensions?: boolean;
  rootDir?: string;
  rootDirs?: string[];
  typeRoots?: string[];
  types?: string[];
  declaration?: boolean;
  declarationDir?: string;
  declarationMap?: boolean;
  downlevelIteration?: boolean;
  emitBOM?: boolean;
  emitDeclarationOnly?: boolean;
  importHelpers?: boolean;
  inlineSourceMap?: boolean;
  inlineSources?: boolean;
  mapRoot?: string;
  newLine?: NewLineKind;
  noEmit?: boolean;
  noEmitHelpers?: boolean;
  noEmitOnError?: boolean;
  outDir?: string;
  outFile?: string;
  preserveConstEnums?: boolean;
  removeComments?: boolean;
  sourceMap?: boolean;
  sourceRoot?: string;
  stripInternal?: boolean;
  allowJs?: boolean;
  checkJs?: boolean;
  maxNodeModuleJsDepth?: number;
  disableSizeLimit?: boolean;
  plugins?: PluginImport[];
  allowSyntheticDefaultImports?: boolean;
  erasableSyntaxOnly?: boolean;
  esModuleInterop?: boolean;
  forceConsistentCasingInFileNames?: boolean;
  isolatedDeclarations?: boolean;
  isolatedModules?: boolean;
  preserveSymlinks?: boolean;
  verbatimModuleSyntax?: boolean;
  emitDecoratorMetadata?: boolean;
  experimentalDecorators?: boolean;
  jsx?: JsxEmit;
  jsxFactory?: string;
  jsxFragmentFactory?: string;
  jsxImportSource?: string;
  lib?: string[];
  libReplacement?: boolean;
  moduleDetection?: ModuleDetectionKind;
  noLib?: boolean;
  reactNamespace?: string;
  target?: ScriptTarget;
  useDefineForClassFields?: boolean;
  diagnostics?: boolean;
  explainFiles?: boolean;
  extendedDiagnostics?: boolean;
  generateCpuProfile?: string;
  generateTrace?: string;
  listEmittedFiles?: boolean;
  listFiles?: boolean;
  noCheck?: boolean;
  traceResolution?: boolean;
  composite?: boolean;
  disableReferencedProjectLoad?: boolean;
  disableSolutionSearching?: boolean;
  disableSourceOfProjectReferenceRedirect?: boolean;
  incremental?: boolean;
  tsBuildInfoFile?: string;
  noErrorTruncation?: boolean;
  preserveWatchOutput?: boolean;
  pretty?: boolean;
  skipDefaultLibCheck?: boolean;
  skipLibCheck?: boolean;
  charset?: string;
  importsNotUsedAsValues?: ImportsNotUsedAsValues;
  keyofStringsOnly?: boolean;
  noImplicitUseStrict?: boolean;
  noStrictGenericChecks?: boolean;
  out?: string;
  preserveValueImports?: boolean;
  suppressExcessPropertyErrors?: boolean;
  suppressImplicitAnyIndexErrors?: boolean;
  [key: string]: unknown;
}

export type ModuleKind =
  | "none"
  | "commonjs"
  | "amd"
  | "umd"
  | "system"
  | "es6"
  | "es2015"
  | "es2020"
  | "es2022"
  | "esnext"
  | "node16"
  | "node18"
  | "nodenext"
  | "preserve";

export type ModuleResolutionKind =
  | "classic"
  | "node10"
  | "node"
  | "node16"
  | "nodenext"
  | "bundler";

export type ScriptTarget =
  | "es3"
  | "es5"
  | "es6"
  | "es2015"
  | "es2016"
  | "es2017"
  | "es2018"
  | "es2019"
  | "es2020"
  | "es2021"
  | "es2022"
  | "es2023"
  | "es2024"
  | "esnext";

export type JsxEmit =
  | "preserve"
  | "react"
  | "react-native"
  | "react-jsx"
  | "react-jsxdev";

export type NewLineKind = "crlf" | "lf";

export type ModuleDetectionKind = "legacy" | "auto" | "force";

export type ImportsNotUsedAsValues = "remove" | "preserve" | "error";

export interface ProjectReference {
  path: string;
  prepend?: boolean;
  circular?: boolean;
}

export interface WatchOptions {
  watchFile?: WatchFileKind;
  watchDirectory?: WatchDirectoryKind;
  fallbackPolling?: PollingWatchKind;
  synchronousWatchDirectory?: boolean;
  excludeDirectories?: string[];
  excludeFiles?: string[];
}

export type WatchFileKind =
  | "fixedpollinginterval"
  | "prioritypollinginterval"
  | "dynamicprioritypolling"
  | "fixedchunksizepolling"
  | "usefsevents"
  | "usefseventsonparentdirectory";

export type WatchDirectoryKind =
  | "usefsevents"
  | "fixedpollinginterval"
  | "dynamicprioritypolling"
  | "fixedchunksizepolling";

export type PollingWatchKind =
  | "fixedinterval"
  | "priorityinterval"
  | "dynamicpriority"
  | "fixedchunksize";

export interface TypeAcquisition {
  enable?: boolean;
  include?: string[];
  exclude?: string[];
  disableFilenameBasedTypeAcquisition?: boolean;
}

export interface BuildOptions {
  dry?: boolean;
  force?: boolean;
  verbose?: boolean;
  preserveWatchOutput?: boolean;
  listEmittedFiles?: boolean;
  listFiles?: boolean;
  incremental?: boolean;
  assumeChangesOnlyAffectDirectDependencies?: boolean;
}

export interface PluginImport {
  name: string;
  [key: string]: unknown;
}

export interface OptionDefinition {
  type: OptionType;
  default?: unknown;
  choices?: readonly string[];
  description: string;
  category: OptionCategory;
  since?: string;
  deprecated?: boolean;
  related?: readonly string[];
  examples?: readonly string[];
  validation?: OptionValidator;
  metadata?: OptionMetadata;
}

export type OptionType = "boolean" | "string" | "number" | "array" | "object";

export type OptionCategory =
  | "Type Checking"
  | "Modules"
  | "Emit"
  | "JavaScript Support"
  | "Editor Support"
  | "Interop Constraints"
  | "Backwards Compatibility"
  | "Language and Environment"
  | "Compiler Diagnostics"
  | "Projects"
  | "Output Formatting"
  | "Completeness"
  | "Watch Options";

export type OptionValidator = (
  value: unknown,
  allOptions?: Record<string, unknown>,
) => boolean | string;

export interface OptionMetadata {
  minVersion?: string;
  maxVersion?: string;
  platforms?: ("windows" | "macos" | "linux")[];
  performance?: "low" | "medium" | "high";
  stability?: "stable" | "experimental" | "deprecated";
  dependencies?: string[];
}

export interface PresetDefinition {
  name: string;
  description: string;
  compilerOptions: CompilerOptions;
  include?: string[];
  exclude?: string[];
  files?: string[];
  references?: ProjectReference[];
  watchOptions?: WatchOptions;
  typeAcquisition?: TypeAcquisition;
  examples?: string[];
  metadata?: PresetMetadata;
}

export interface PresetMetadata {
  useCase?: string;
  recommendedFor?: string[];
  notRecommendedFor?: string[];
  dependencies?: string[];
  optionalDependencies?: string[];
  minNodeVersion?: string;
  tags?: string[];
}

export interface CLIArgs {
  preset?: string;
  output?: string;
  force?: boolean;
  help?: boolean;
  version?: boolean;
  verbose?: boolean;
  "help-options"?: boolean;
  "help-option"?: string;
  "help-preset"?: string;
  include?: string;
  exclude?: string;
  extends?: string;
  files?: string;
  references?: string;
  "watch-file"?: string;
  "watch-directory"?: string;
  "fallback-polling"?: string;
  "synchronous-watch-directory"?: boolean;
  "exclude-directories"?: string;
  "exclude-files"?: string;
  "type-acquisition-enable"?: boolean;
  "type-acquisition-include"?: string;
  "type-acquisition-exclude"?: string;
  "disable-filename-based-type-acquisition"?: boolean;
  [key: string]: unknown;
}

export interface ConfigOptions {
  preset?: string;
  compilerOptions?: Partial<CompilerOptions>;
  include?: string[];
  exclude?: string[];
  files?: string[];
  extends?: string | string[];
  references?: ProjectReference[];
  watchOptions?: WatchOptions;
  typeAcquisition?: TypeAcquisition;
  [key: string]: unknown;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions?: ValidationSuggestion[];
}

export interface ValidationError {
  code: string;
  message: string;
  option?: string;
  severity: "error";
  fix?: string;
}

export interface ValidationWarning {
  code: string;
  message: string;
  option?: string;
  severity: "warning";
  suggestion?: string;
}

export interface ValidationSuggestion {
  code: string;
  message: string;
  option?: string;
  severity: "info";
  suggestedValue?: unknown;
}

export interface WriteOptions {
  force: boolean;
  verbose: boolean;
  indent: number;
  sortKeys?: boolean;
  trailingComma?: boolean;
  formatter?: ConfigFormatter;
}

export type ConfigFormatter = (
  config: TSConfig,
  options: WriteOptions,
) => string;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type OptionsByCategory<C extends OptionCategory> = {
  [K in keyof CompilerOptions]: OptionDefinition extends { category: C }
    ? K
    : never;
}[keyof CompilerOptions];

export type OptionsByType<T extends OptionType> = {
  [K in keyof CompilerOptions]: OptionDefinition extends { type: T }
    ? K
    : never;
}[keyof CompilerOptions];

export const DEFAULT_SCHEMA_URL = "https://json.schemastore.org/tsconfig";

export const DEFAULT_INCLUDE = ["**/*.ts", "**/*.tsx"];

export const DEFAULT_EXCLUDE = ["node_modules"];

export const TS_EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".d.ts"];

export const JS_EXTENSIONS = [".js", ".jsx", ".mjs", ".cjs"];

export const ALL_EXTENSIONS = [...TS_EXTENSIONS, ...JS_EXTENSIONS];
