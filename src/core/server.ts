import { RequestProps } from "../../mod.ts";
import Index from "./index.tsx";
import type Platform from "./platform.ts";
import { isPageModule } from "./platform.ts";

const DYNAMIC_ROUTE_PATTERN = /\/(?<page>\w+)\/(?<id>\w+)/;

export default class Server {
  constructor(private platform: Platform) {}

  async handleRequest(request: Request) {
    const pageModule = await this.loadPageModule(request);
    if (!pageModule) {
      return this.notFound();
    }

    let renderFunction,
      dataLoader = (request: RequestProps): unknown => request;
    if (typeof pageModule.default === "function") {
      renderFunction = pageModule.default;
    } else {
      renderFunction = pageModule.default.render;
      dataLoader = pageModule.default.data ?? dataLoader;
    }

    const isDynamicMatch = new URL(request.url).pathname.match(
      DYNAMIC_ROUTE_PATTERN
    );
    const pageData = await dataLoader({
      params: isDynamicMatch ? { id: isDynamicMatch.groups!.id } : {},
      body: await request.formData().catch(() => new FormData()),
    });
    const pageContents = renderFunction(pageData);

    if (typeof pageContents == "string") {
      return new Response(Index({ children: pageContents }), {
        status: 200,
        headers: { "Content-type": "text/html" },
      });
    }
    if (pageContents instanceof Response) {
      return pageContents;
    } else {
      return this.notFound();
    }
  }

  private async loadPageModule(request: Request) {
    const pathname = new URL(request.url).pathname;
    const staticBaseName =
      pathname === "/" ? "routes/index" : `routes${pathname}`;

    const dynamicMatch = pathname.match(DYNAMIC_ROUTE_PATTERN);
    const dynamicBaseName = dynamicMatch
      ? `routes/${dynamicMatch.groups!.page}/[id]`
      : null;

    let pageModule;
    try {
      if (request.method === "GET") {
        pageModule = await this.platform.import(`${staticBaseName}.tsx`);
      } else {
        pageModule = await this.platform.import(
          `${staticBaseName}.${request.method.toLowerCase()}.tsx`
        );
      }
    } catch (_) {
      try {
        if (!dynamicBaseName) {
          return null;
        }
        pageModule = await this.platform.import(`${dynamicBaseName}.tsx`);
      } catch (_) {
        return null;
      }
    }

    if (!isPageModule(pageModule)) {
      return null;
    }

    return pageModule;
  }

  private notFound() {
    return new Response("Not found", { status: 404 });
  }
}
