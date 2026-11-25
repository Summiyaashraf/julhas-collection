export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly ClassValue[]
  | Readonly<Record<string, boolean | null | undefined>>;

function toClassName(value: ClassValue): string {
  if (
    value === null ||
    value === undefined ||
    value === false ||
    value === true
  ) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map(toClassName)
      .filter(Boolean)
      .join(" ");
  }

  return Object.entries(value)
    .filter(([, enabled]) => enabled)
    .map(([className]) => className)
    .join(" ");
}

export function cn(...values: readonly ClassValue[]): string {
  return values
    .map(toClassName)
    .filter(Boolean)
    .join(" ");
}
