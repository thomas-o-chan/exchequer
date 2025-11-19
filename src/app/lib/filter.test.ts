import { describe, it, expect } from "vitest";
import { searchFilter } from "./filter";

describe("searchFilter", () => {
  const items = ["Apple", "Banana", "apricot", "Cherry"];
  it("should return all items that include the search term", () => {
    const result = searchFilter(items, "Ap");
    expect(result).toContain("Apple");
  });
  it("should remove all items that do not include the search term", () => {
    const result = searchFilter(items, "Foo");
    expect(result).not.toContain("Apple");
  });
  it("should be case insensitive", () => {
    const result = searchFilter(items, "Ap");
    expect(result).toContain("apricot");
  });
});
