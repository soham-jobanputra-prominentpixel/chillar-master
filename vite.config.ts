import { defineConfig } from "vite";

export default defineConfig({
  base: "/chillar-master/",
  build: {
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "mixed-decls",
          "color-functions",
          "global-builtin",
        ],
      },
    },
  },
});
