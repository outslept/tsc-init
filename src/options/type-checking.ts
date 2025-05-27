import type { OptionDefinition } from "../types";

export const typeCheckingOptions: Record<string, OptionDefinition> = {
  allowUnreachableCode: {
    type: "boolean",
    default: undefined,
    description:
      "Allow unreachable code. When undefined (default) provide suggestions as warnings to editors, true unreachable code is ignored, false raises compiler errors about unreachable code.",
    category: "Type Checking",
    since: "1.8",
    examples: [
      "true  // Ignore unreachable code",
      "false // Error on unreachable code",
    ],
  },

  allowUnusedLabels: {
    type: "boolean",
    default: undefined,
    description:
      "Allow unused labels. When undefined (default) provide suggestions as warnings to editors, true unused labels are ignored, false raises compiler errors about unused labels.",
    category: "Type Checking",
    since: "1.8",
    examples: [
      "true  // Ignore unused labels",
      "false // Error on unused labels",
    ],
  },

  alwaysStrict: {
    type: "boolean",
    default: true,
    description:
      'Ensures that your files are parsed in the ECMAScript strict mode, and emit "use strict" for each source file. ECMAScript strict mode was introduced in ES5 and provides behavior tweaks to the runtime of the JavaScript engine to improve performance, and makes a set of errors throw instead of silently ignoring them.',
    category: "Type Checking",
    since: "2.1",
    related: ["strict"],
    examples: [
      'true  // Emit "use strict" and parse in strict mode',
      "false // No strict mode enforcement",
    ],
  },

  exactOptionalPropertyTypes: {
    type: "boolean",
    default: true,
    description:
      "With exactOptionalPropertyTypes enabled, TypeScript applies stricter rules around how it handles properties on type or interfaces which have a ? prefix. Makes TypeScript truly enforce the definition provided as an optional property.",
    category: "Type Checking",
    since: "4.4",
    examples: [
      "true  // Exact optional property types",
      "false // Allow undefined assignment to optional properties",
    ],
  },

  noFallthroughCasesInSwitch: {
    type: "boolean",
    default: true,
    description:
      "Report errors for fallthrough cases in switch statements. Ensures that any non-empty case inside a switch statement includes either break, return, or throw. This means you won't accidentally ship a case fallthrough bug.",
    category: "Type Checking",
    since: "1.8",
    examples: [
      "true  // Error on switch fallthrough",
      "false // Allow switch fallthrough",
    ],
  },

  noImplicitAny: {
    type: "boolean",
    default: true,
    description:
      "In some cases where no type annotations are present, TypeScript will fall back to a type of any for a variable when it cannot infer the type. Turning on noImplicitAny however TypeScript will issue an error whenever it would have inferred any.",
    category: "Type Checking",
    since: "1.0",
    related: ["strict"],
    examples: ["true  // Error on implicit any", "false // Allow implicit any"],
  },

  noImplicitOverride: {
    type: "boolean",
    default: true,
    description:
      'When working with classes which use inheritance, it\'s possible for a sub-class to get "out of sync" with the functions it overloads when they are renamed in the base class. Using noImplicitOverride you can ensure that the sub-classes never go out of sync, by ensuring that functions which override include the keyword override.',
    category: "Type Checking",
    since: "4.3",
    examples: [
      "true  // Require override keyword",
      "false // Allow implicit overrides",
    ],
  },

  noImplicitReturns: {
    type: "boolean",
    default: true,
    description:
      "When enabled, TypeScript will check all code paths in a function to ensure they return a value.",
    category: "Type Checking",
    since: "1.8",
    examples: [
      "true  // Error on missing return statements",
      "false // Allow missing return statements",
    ],
  },

  noImplicitThis: {
    type: "boolean",
    default: true,
    description:
      "Raise error on 'this' expressions with an implied 'any' type.",
    category: "Type Checking",
    since: "2.0",
    related: ["strict"],
    examples: [
      "true  // Error on implicit any this",
      "false // Allow implicit any this",
    ],
  },

  noPropertyAccessFromIndexSignature: {
    type: "boolean",
    default: false,
    description:
      'This setting ensures consistency between accessing a field via the "dot" (obj.key) syntax, and "indexed" (obj["key"]) and the way which the property is declared in the type. The goal of this flag is to signal intent in your calling syntax about how certain you are this property exists.',
    category: "Type Checking",
    since: "4.2",
    examples: [
      "true  // Require bracket notation for index signatures",
      "false // Allow dot notation for index signatures",
    ],
  },

  noUncheckedIndexedAccess: {
    type: "boolean",
    default: true,
    description:
      "TypeScript has a way to describe objects which have unknown keys but known values on an object, via index signatures. Turning on noUncheckedIndexedAccess will add undefined to any un-declared field in the type.",
    category: "Type Checking",
    since: "4.1",
    examples: [
      "true  // Add undefined to unchecked index access",
      "false // Don't add undefined to index access",
    ],
  },

  noUnusedLocals: {
    type: "boolean",
    default: false,
    description: "Report errors on unused local variables.",
    category: "Type Checking",
    since: "2.0",
    examples: [
      "true  // Error on unused local variables",
      "false // Allow unused local variables",
    ],
  },

  noUnusedParameters: {
    type: "boolean",
    default: false,
    description: "Report errors on unused parameters in functions.",
    category: "Type Checking",
    since: "2.0",
    examples: [
      "true  // Error on unused parameters",
      "false // Allow unused parameters",
    ],
  },

  strict: {
    type: "boolean",
    default: true,
    description:
      "The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning this on is equivalent to enabling all of the strict mode family options. Future versions of TypeScript may introduce additional stricter checking under this flag.",
    category: "Type Checking",
    since: "2.3",
    related: [
      "alwaysStrict",
      "strictNullChecks",
      "strictBindCallApply",
      "strictBuiltinIteratorReturn",
      "strictFunctionTypes",
      "strictPropertyInitialization",
      "noImplicitAny",
      "noImplicitThis",
      "useUnknownInCatchVariables",
    ],
    examples: [
      "true  // Enable all strict checks",
      "false // Disable strict mode",
    ],
  },

  strictBindCallApply: {
    type: "boolean",
    default: true,
    description:
      "When set, TypeScript will check that the built-in methods of functions call, bind, and apply are invoked with correct argument for the underlying function.",
    category: "Type Checking",
    since: "3.2",
    related: ["strict"],
    examples: [
      "true  // Check call/bind/apply arguments",
      "false // Don't check call/bind/apply arguments",
    ],
  },

  strictBuiltinIteratorReturn: {
    type: "boolean",
    default: true,
    description:
      "Built-in iterators are instantiated with a TReturn type of undefined instead of any.",
    category: "Type Checking",
    since: "5.6",
    related: ["strict"],
    examples: [
      "true  // Strict iterator return types",
      "false // Loose iterator return types",
    ],
  },

  strictFunctionTypes: {
    type: "boolean",
    default: true,
    description:
      "When enabled, this flag causes functions parameters to be checked more correctly. During development of this feature, we discovered a large number of inherently unsafe class hierarchies, including some in the DOM. Because of this, the setting only applies to functions written in function syntax, not to those in method syntax.",
    category: "Type Checking",
    since: "2.6",
    related: ["strict"],
    examples: [
      "true  // Strict function type checking",
      "false // Loose function type checking",
    ],
  },

  strictNullChecks: {
    type: "boolean",
    default: true,
    description:
      "When strictNullChecks is false, null and undefined are effectively ignored by the language. This can lead to unexpected errors at runtime. When strictNullChecks is true, null and undefined have their own distinct types and you'll get a type error if you try to use them where a concrete value is expected.",
    category: "Type Checking",
    since: "2.0",
    related: ["strict"],
    examples: [
      "true  // Strict null and undefined checking",
      "false // Allow null/undefined anywhere",
    ],
  },

  strictPropertyInitialization: {
    type: "boolean",
    default: true,
    description:
      "When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.",
    category: "Type Checking",
    since: "2.7",
    related: ["strict"],
    examples: [
      "true  // Require property initialization",
      "false // Allow uninitialized properties",
    ],
  },

  useUnknownInCatchVariables: {
    type: "boolean",
    default: true,
    description:
      "In TypeScript 4.0, support was added to allow changing the type of the variable in a catch clause from any to unknown. This pattern ensures that error handling code becomes more comprehensive because you cannot guarantee that the object being thrown is a Error subclass ahead of time.",
    category: "Type Checking",
    since: "4.4",
    related: ["strict"],
    examples: [
      "true  // Use unknown in catch variables",
      "false // Use any in catch variables",
    ],
  },
};
