import Index from "qw/core/index.tsx";
import Platform, { Module } from "qw/core/platform.ts";

export default class Server {
  #platform: Platform;

  constructor(platform: Platform) {
    this.#platform = platform;
  }

  async handleRequest(request: Request) {
    const pathname = new URL(request.url).pathname;
    const modulePath =
      pathname === "/" ? "routes/index.tsx" : `routes${pathname}.tsx`;

    let pageModule: Module;
    try {
      pageModule = await this.#platform.import(modulePath);
    } catch (_) {
      return new Response("Not found", { status: 404 });
    }

    const pageContents = (pageModule.default as () => unknown)();

    return new Response(Index({ children: pageContents }), {
      status: 200,
      headers: { "Content-type": "text/html" },
    });
  }
}
