import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";

const mockResponse = {
  avatar:
    "https://images.chesscomfiles.com/uploads/v1/user/1001841.c795c877.200x200o.9d9ebba817cc.jpg",
  player_id: 1001841,
  "@id": "https://api.chess.com/pub/player/undefined",
  url: "https://www.chess.com/member/undefined",
  name: "Matt Nicholson",
  username: "undefined",
  title: "NM",
  followers: 447,
  country: "https://api.chess.com/pub/country/CA",
  location: "Little Current, Ontario",
  last_online: 1763525629,
  joined: 1201115439,
  status: "staff",
  is_streamer: false,
  verified: false,
  league: "Legend",
  streaming_platforms: [],
};

const mockFetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.fetch = mockFetch as any;

describe("GET /api/player-data/[slug]", async () => {
  it("should return data in the correct format", async () => {
    const response = await GET(new Request("https://example.com"), {
      params: new Promise<{ slug: string }>((resolve) => resolve({ slug: "mattnicholson" })),
    });
    const data = await response.json();
    expectSameFormat(data, mockResponse);
  });
  it("should fetch data from the correct URL", async () => {
    await GET(new Request("https://example.com"), {
      params: new Promise<{ slug: string }>((resolve) => resolve({ slug: "mattnicholson" })),
    });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.chess.com/pub/player/mattnicholson"
    );
  });
  it("should return a response with the correct headers", async () => {
    const response = await GET(new Request("https://example.com"), {
      params: new Promise<{ slug: string }>((resolve) => resolve({ slug: "mattnicholson" })),
    });
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });
});

function expectSameFormat(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  const keys1 = Object.keys(obj1);
  keys1.forEach((key) => {
    expect(obj2).toHaveProperty(key);
    expect(typeof obj2[key]).toBe(typeof obj1[key]);
  });
}
