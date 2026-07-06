// GET /api/download?key=<r2-key>&name=<optional-filename>
// Proxies R2 public objects with Content-Disposition: attachment so browsers
// save files instead of opening them inline (cross-origin download attribute is ignored).

const DOWNLOAD_EXTENSIONS = /\.(mp3|pdf|m4a|wav|mp4|doc|docx|xls|xlsx|ppt|pptx)$/i;

function isValidDownloadKey(key) {
  if (!key || typeof key !== "string") return false;
  if (key.startsWith("/") || key.includes("..") || key.includes("\\")) return false;
  return DOWNLOAD_EXTENSIONS.test(key);
}

function contentDispositionFilename(name) {
  const ascii = name.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_");
  const encoded = encodeURIComponent(name);
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encoded}`;
}

export async function onRequestGet({ env, request }) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key")?.trim();
    const requestedName = url.searchParams.get("name")?.trim();

    if (!isValidDownloadKey(key)) {
      return new Response("Invalid download key", { status: 400 });
    }

    const base = env.R2_BASE.replace(/\/$/, "");
    const r2Response = await fetch(`${base}/${key}`);

    if (!r2Response.ok) {
      return new Response("File not found", { status: r2Response.status });
    }

    const fileName = requestedName || key.split("/").pop() || "download";
    const headers = new Headers();
    const contentType = r2Response.headers.get("Content-Type");
    if (contentType) headers.set("Content-Type", contentType);
    const contentLength = r2Response.headers.get("Content-Length");
    if (contentLength) headers.set("Content-Length", contentLength);
    headers.set("Content-Disposition", contentDispositionFilename(fileName));
    headers.set("Cache-Control", "private, max-age=3600");

    return new Response(r2Response.body, {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(`Download failed: ${String(err)}`, { status: 500 });
  }
}
