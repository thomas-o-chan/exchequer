export function searchFilter(items: string[], string: string): string[] {
  const lowerString = string.toLowerCase();
  return items.filter((item) => item.toLowerCase().includes(lowerString));
}
