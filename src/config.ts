// Centralized client config, resolved from public env with safe defaults

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const API_PATH = process.env.NEXT_PUBLIC_API_PATH || "/graphql";

// Prefer explicit URL when provided; else use relative path so it works behind a reverse proxy
export const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || `${BASE_PATH}${API_PATH}`;

// Chat URL (preferred): a full URL pointing to the Socket.IO endpoint or its origin.
// Example: https://chat.example.com/socket.io or https://chat.example.com:2096
const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "";
let CHAT_ORIGIN = "";
let CHAT_PATH = "";
if (CHAT_URL) {
  try {
    const u = new URL(CHAT_URL);
    CHAT_ORIGIN = `${u.protocol}//${u.host}`;
    CHAT_PATH = u.pathname || "/socket.io";
  } catch {
    // ignore invalid URL; fall back to legacy envs
  }
}

// Legacy envs remain supported, but NEXT_PUBLIC_CHAT_URL takes precedence
export const SOCKET_ORIGIN =
  CHAT_ORIGIN || process.env.NEXT_PUBLIC_SOCKET_ORIGIN || "";
export const SOCKET_PATH =
  CHAT_PATH || process.env.NEXT_PUBLIC_SOCKET_PATH || `${BASE_PATH}/socket.io`;
