import type Platform from "./platform.ts";
import Server from "./server.ts";

export type Command = "start" | "version" | "help" | "export";

export default class QW {
  #platform: Platform;

  constructor(platform: Platform) {
    this.#platform = platform;
  }

  async run(command: Command) {
    if (command === "start") {
      const server = new Server(this.#platform);
      this.#platform.serve(server.handleRequest.bind(server));
    } else if (command === "export") {
      const Index = (await this.#platform.import("routes/index.tsx"))
        .default! as () => string;
      await this.#platform.writeTextFile("index.html", Index());
      this.#platform.exit(0);
    } else if (command === "version") {
      this.#platform.log(`qw (quickwire) ${this.#platform.version}`);
      this.#platform.exit(0);
    } else {
      this.#platform.log("Usage: qw [options] [COMMAND]");
      this.#platform.log("");
      this.#platform.log("Commands:");
      this.#platform.log(
        "  init\tCreate a new Quickwire project (not implemented)"
      );
      this.#platform.log("  export\tExport the current project");
      this.#platform.log("  start\tStart the current project");
      this.#platform.log("");
      this.#platform.log("Options:");
      this.#platform.log("  --help     Show this message and exit.");
      this.#platform.log("  --version  Print version information and exit.");
      this.#platform.exit(0);
    }
  }
}
