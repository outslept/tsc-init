import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  external: ["node:*"],
  format: ["esm", "cjs"],
  target: "es2022",
  platform: "node",
  globalName: "tscy",
});
