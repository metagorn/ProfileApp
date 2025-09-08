export const API_BASE_URL = /* process.env.EXPO_PUBLIC_API_BASE_URL ||  */"http://10.10.19.22:3000";

export async function apiFetch(path, { token, method = "GET", headers = {}, body, onUnauthorized } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (res.status === 401 && typeof onUnauthorized === "function") {
    await onUnauthorized();
  }
  return res;
}
