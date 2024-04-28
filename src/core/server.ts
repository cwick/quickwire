import Index from "qw/core/index.tsx";
import Platform from "qw/core/platform.ts";

export default class Server {
  #platform: Platform;

  constructor(platform: Platform) {
    this.#platform = platform;
  }

  async handleRequest(_request: Request) {
    const pageContents = (
      (await this.#platform.import(`routes/index.tsx`)).default as () => unknown
    )();

    return new Response(Index({ children: pageContents }), {
      status: 200,
      headers: { "Content-type": "text/html" },
    });
  }
}
