export async function GET() {
  return new Response(
    JSON.stringify({
      data: [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
        { id: 4, name: "David", email: "david@example.com" }
      ]
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}