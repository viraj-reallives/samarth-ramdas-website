export function jsonResponse(body, { status = 200, cache = false } = {}) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (cache) {
    headers["Cache-Control"] = "public, max-age=300";
  }
  return new Response(JSON.stringify(body), { status, headers });
}
