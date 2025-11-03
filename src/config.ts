// Centralized client config, resolved from public env with safe defaults

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const API_PATH = process.env.NEXT_PUBLIC_API_PATH || '/graphql';

// Prefer explicit URL when provided; else use relative path so it works behind a reverse proxy
export const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || `${BASE_PATH}${API_PATH}`;

// Socket origin: if unset, use current window origin in runtime; path defaults under basePath
export const SOCKET_ORIGIN = process.env.NEXT_PUBLIC_SOCKET_ORIGIN || '';
export const SOCKET_PATH =
  process.env.NEXT_PUBLIC_SOCKET_PATH || `${BASE_PATH}/socket.io`;

