/** Joins truthy class names with a space, skipping falsy values. */
export function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
