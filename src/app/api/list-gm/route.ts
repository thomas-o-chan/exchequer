export async function GET() {
  const res = await fetch("https://api.chess.com/pub/titled/GM");
  const data = await res.json();
  const gmList: string[] = data.players;
  return new Response(JSON.stringify(gmList), {
    headers: { "Content-Type": "application/json" },
  });
}
