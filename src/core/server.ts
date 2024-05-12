import Index from "./index.tsx";
import type Platform from "./platform.ts";
import { isComponentModule } from "./platform.ts";

export default class Server {
  constructor(private platform: Platform) {}

  async handleRequest(request: Request) {
    const pathname = new URL(request.url).pathname;
    const match = pathname.match(/\/(?<page>\w+)\/(?<id>\w+)/);
    const modulePath =
      pathname === "/"
        ? "routes/index.tsx"
        : match
        ? `routes/${match.groups!.page}/[id].tsx`
        : `routes${pathname}.tsx`;

    let componentModule;
    try {
      componentModule = await this.platform.import(modulePath);
    } catch (_) {
      return this.notFound();
    }

    if (!isComponentModule(componentModule)) {
      return this.notFound();
    }

    let renderFunction, dataLoader;
    if (typeof componentModule.default === "function") {
      renderFunction = componentModule.default;
      dataLoader = () => undefined;
    } else {
      renderFunction = componentModule.default.render;
      dataLoader = componentModule.default.data ?? (() => undefined);
    }

    const pageData = await dataLoader();
    const pageContents = renderFunction({
      data: pageData,
      params: match ? { id: match.groups!.id } : {},
    });
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
