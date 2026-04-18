export function getSiteUrl() {
  const envSiteUrl = import.meta.env.VITE_SITE_URL?.trim();

  if (envSiteUrl) {
    return envSiteUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }

  return "";
}

export function buildCanonicalUrl(path = "/") {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!siteUrl) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? `${siteUrl}/` : `${siteUrl}${normalizedPath}`;
}
