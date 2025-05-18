import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as HTTPServer } from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;

async function createServer() {
  const app = express();

  let ViteServer;
  let SocketIO;

  if (isProd) {
    SocketIO = (await import("../dist/socket/socket-server.js")).default;
  } else {
    let createViteServer = (await import("vite")).createServer;
    ViteServer = await createViteServer({ server: { middlewareMode: true }, appType: "custom" });
    SocketIO = (await ViteServer.ssrLoadModule("./src/backend/socket-server.ts")).default;
    app.use(ViteServer.middlewares);
  }

  app.use("/assets", express.static(path.resolve(__dirname, "../dist/client/assets/")));
  app.use("*all", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = "";
      let render;

      if (isProd) {
        template = await fs.readFileSync("./dist/client/index.html", "utf-8");
        render = (await import("../dist/server/entry-server.js")).render;
      } else {
        template = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
        template = await ViteServer.transformIndexHtml(url, template);
        render = (await ViteServer.ssrLoadModule("/src/entry-server.tsx")).render;
      }

      const appHtml = await render();
      const html = template.replace(`<!--ssr-outlet-->`, () => appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (!isProd) ViteServer.ssrFixStacktrace(e);
      next(e);
    }
  });

  const server = HTTPServer(app);
  SocketIO(server);
  server.listen(port);
  console.log("Running in localhost:" + port);
}

createServer();
