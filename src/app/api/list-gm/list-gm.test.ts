import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";

const mockResponse = {
  players: ["playerName1", "playerName2", "playerName3"],
};

const mockFetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.fetch = mockFetch as any;

describe("GET /api/list-gm", async () => {
  it("should return data in the correct format", async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toEqual(mockResponse.players);
  });
  it("should fetch data from the correct URL", async () => {
    await GET();
    expect(global.fetch).toHaveBeenCalledWith("https://api.chess.com/pub/titled/GM");
  });
  it("should return a response with the correct headers", async () => {
    const response = await GET();
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });
});
