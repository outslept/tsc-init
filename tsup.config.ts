import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: true,
  dts: true,
  noExternal: ["pathe", "picocolors", "@clack/prompts"],
})
