import Index from "./index.tsx";
import type Platform from "./platform.ts";
import type { Module } from "./platform.ts";

export default class Server {
  constructor(private platform: Platform) {}

  async handleRequest(request: Request) {
    const pathname = new URL(request.url).pathname;
    const modulePath =
      pathname === "/" ? "routes/index.tsx" : `routes${pathname}.tsx`;

    let pageModule: Module;
    try {
      pageModule = await this.platform.import(modulePath);
    } catch (_) {
      return this.notFound();
    }

    if (typeof pageModule.default !== "function") {
      return this.notFound();
    }

    const pageContents = (pageModule.default as () => unknown)();
    if (typeof pageContents !== "string") {
      return this.notFound();
    }

    return new Response(Index({ children: pageContents }), {
      status: 200,
      headers: { "Content-type": "text/html" },
    });
  }

  private notFound() {
    return new Response("Not found", { status: 404 });
  }
}
