import { describe } from "node:test";
import { expect, it } from "vitest";
import { getHMS } from "./formatDate";

describe("getHMS", () => {
  it("should return a string in HH:MM:SS format", () => {
    const result = getHMS(0);
    // Has 3 parts separated by ':'
    expect(result.split(":").length).toBe(3);
    // Each part is a 2 digit number
    result.split(":").forEach((part) => {
      expect(part.length).toBe(2);
      expect(!isNaN(Number(part))).toBe(true);
    });
  });
  it("should round seconds down", () => {
    const result = getHMS(999);
    const [, , secs] = result.split(":").map(Number);
    expect(secs).toBe(0);
  });
  it("should wrap seconds over 60", () => {
    const result = getHMS(65000); // 65 seconds
    const [, , secs] = result.split(":").map(Number);
    expect(secs).toBe(5);
  });
  it("should wrap mins over 60", () => {
    const result = getHMS(3660000); // 3660 seconds = 61 mins
    const [, mins] = result.split(":").map(Number);
    expect(mins).toBe(1); // 1 min
  });
  it("should not wrap hours", () => {
    const result = getHMS(360000000); // 36000 seconds = 100 hours
    const [hrs] = result.split(":").map(Number);
    expect(hrs).toBe(100); // 100 hours
  });
});
