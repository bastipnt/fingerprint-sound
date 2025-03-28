import react from "@vitejs/plugin-react";
import { defineConfig, PluginOption } from "vite";

const fullReloadPlugin: PluginOption = {
  name: "full-reload-on-change",
  handleHotUpdate({ file, server }) {
    if (file.endsWith("canvas.ts") || /.*tone\/.*\.ts/.test(file)) {
      console.log("🔄 changed - triggering full page reload");
      server.ws.send({ type: "full-reload" });
    }
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fullReloadPlugin],
});
