import Index from "./index.tsx";
import type Platform from "./platform.ts";
import { isPageModule } from "./platform.ts";

export default class Server {
  constructor(private platform: Platform) {}

  async handleRequest(request: Request) {
    const pathname = new URL(request.url).pathname;
    const staticModulePath =
      pathname === "/" ? "routes/index.tsx" : `routes${pathname}.tsx`;

    const dynamicMatch = pathname.match(/\/(?<page>\w+)\/(?<id>\w+)/);
    const dynamicModulePath = dynamicMatch
      ? `routes/${dynamicMatch.groups!.page}/[id].tsx`
      : null;

    let pageModule;
    try {
      pageModule = await this.platform.import(staticModulePath);
    } catch (_) {
      try {
        pageModule = await this.platform.import(
          `routes${pathname}.${request.method.toLowerCase()}.tsx`
        );
      } catch (_) {
        try {
          if (!dynamicModulePath) {
            return this.notFound();
          }
          pageModule = await this.platform.import(dynamicModulePath);
        } catch (_) {
          return this.notFound();
        }
      }
    }

    if (!isPageModule(pageModule)) {
      return this.notFound();
    }

    let renderFunction, dataLoader;
    if (typeof pageModule.default === "function") {
      renderFunction = pageModule.default;
      dataLoader = () => undefined;
    } else {
      renderFunction = pageModule.default.render;
      dataLoader = pageModule.default.data ?? (() => undefined);
    }

    const pageData = await dataLoader();
    const pageContents = renderFunction({
      data: pageData,
      params: dynamicMatch ? { id: dynamicMatch.groups!.id } : {},
    });

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

  private notFound() {
    return new Response("Not found", { status: 404 });
  }
}
