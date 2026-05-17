import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      import("nitro/vite").then(({ nitro }) => nitro({ preset: "vercel" })),
    ],
  },
});
