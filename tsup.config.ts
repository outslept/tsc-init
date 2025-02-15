import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['esm'],
  clean: true,
  dts: true,
  shims: true,
  banner: { js: '#!/usr/bin/env node' },
})
