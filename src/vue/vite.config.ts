import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "https://file%2B.vscode-resource.vscode-cdn.net/e%3A/mycode/Metrix-Mission-VSCode/src/vue/dist/",
});
