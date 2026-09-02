/** Turns share/view URLs (especially Google Drive) into something an <img> can load. */
export function toDisplayImageUrl(raw?: string | null) {
  const value = raw?.trim();
  if (!value) return undefined;

  const driveId = extractGoogleDriveFileId(value);
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w2000`;
  }

  if (value.includes("dropbox.com")) {
    return value
      .replace("www.dropbox.com", "dl.dropboxusercontent.com")
      .replace("&dl=0", "")
      .replace("?dl=0", "");
  }

  return value;
}

function extractGoogleDriveFileId(url: string) {
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (url.includes("drive.google.com") && openMatch?.[1]) return openMatch[1];
  if (url.includes("docs.google.com") && openMatch?.[1]) return openMatch[1];

  return null;
}
