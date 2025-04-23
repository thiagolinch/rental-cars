import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/shared/http/server.ts", "src/shared/typeorm/migrations/**/*.ts"],
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["cjs"],
  target: "node18",
  shims: false,
});
