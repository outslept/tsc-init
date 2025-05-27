import type { OptionDefinition } from "../types";

export function parseValue(
  value: string,
  definition: OptionDefinition,
): unknown {
  switch (definition.type) {
    case "boolean":
      if (value === "true") return true;
      if (value === "false") return false;
      throw new Error(
        `Invalid boolean value: ${value}. Expected 'true' or 'false'`,
      );

    case "number": {
      const num = Number(value);
      if (Number.isNaN(num)) throw new Error(`Invalid number value: ${value}`);
      return num;
    }

    case "string":
      if (definition.choices && !definition.choices.includes(value)) {
        throw new Error(
          `Invalid choice: ${value}. Expected one of: ${definition.choices.join(", ")}`,
        );
      }
      return value;

    case "array": {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
          throw new TypeError("Expected array");
        }
        return parsed;
      } catch {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    case "object": {
      try {
        const parsed = JSON.parse(value);
        if (
          typeof parsed !== "object" ||
          parsed === null ||
          Array.isArray(parsed)
        ) {
          throw new Error("Expected object");
        }
        return parsed;
      } catch {
        throw new Error(`Invalid JSON object: ${value}`);
      }
    }

    default:
      return value;
  }
}

export function validateValue(
  value: unknown,
  definition: OptionDefinition,
  allOptions?: Record<string, unknown>,
): boolean | string {
  if (definition.validation) {
    return definition.validation(value, allOptions);
  }
  return true;
}
