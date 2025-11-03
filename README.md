UI build and classic subpath

Development

- Copy `.env.example` to `.env` and adjust endpoints if needed.
- Start dev server: `yarn dev`

Static export

- Build: `yarn build` (generates `out/`)

Classic subpath builds

- The UI supports an optional base path via env. To build the UI under a subpath like `/classic` so it can coexist with the primary UI:
  - `NEXT_PUBLIC_BASE_PATH=/classic`
  - `NEXT_PUBLIC_API_PATH=/graphql` (default)
  - `NEXT_PUBLIC_SOCKET_PATH=/classic/socket.io`
  - Omit `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_SOCKET_ORIGIN` to use relative paths against the current origin.

Example:

```
NEXT_PUBLIC_BASE_PATH=/classic \
NEXT_PUBLIC_API_PATH=/graphql \
NEXT_PUBLIC_SOCKET_PATH=/classic/socket.io \
yarn build
```

The resulting `out/` can be deployed under the `/classic` folder on the same domain while the primary UI is served at the root.
