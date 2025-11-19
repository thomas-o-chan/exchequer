import { describe, it, expect, vi } from "vitest";
import { getDifference, getTimeDifferenceFromNow } from "./index";

describe("getDifference", () => {
  const a = 10;
  const b = 4;
  it("returns the difference between two numbers", () => {
    const result = getDifference(a, b);
    expect(result).toBe(a - b);
  });
  it("returns the same number regardless of order", () => {
    const result1 = getDifference(a, b);
    const result2 = getDifference(b, a);
    expect(result1).toBe(result2);
  });
  it("returns NaN if given NaN values", () => {
    const result = getDifference(NaN, a);
    expect(result).toBeNaN();
  });
});

describe("getTimeDifferenceFromNow", () => {
  global.Date.now = vi.fn(() => 1000);

  it("returns the difference between now and the given past time", () => {
    const result = getTimeDifferenceFromNow(1002);
    expect(result).toBe(2);
  });
});
