import path from "node:path";
import Vue from "@vitejs/plugin-vue";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/_mixins.scss" as *;@use  "~/styles/element/index.scss" as *;`,
        api: "modern-compiler",
      },
    },
  },

  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: [".vue", ".md"],
      dts: "src/typed-router.d.ts",
    }),
    Vue(),
    svgLoader({ defaultImport: "component" }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      dts: "src/components.d.ts",
    }),
  ],

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ["element-plus"],
  },
});
