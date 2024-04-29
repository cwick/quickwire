import Platform from "qw/core/platform.ts";
import Server from "qw/core/server.ts";

export default class QW {
  #platform: Platform;

  constructor(platform: Platform) {
    this.#platform = platform;
  }

  run(command: "run" | "version" | "help") {
    if (command === "run") {
      const server = new Server(this.#platform);
      this.#platform.serve(server.handleRequest.bind(server));
    } else if (command === "version") {
      this.#platform.log("qw (quickwire) 0.1.0");
      this.#platform.exit();
    } else {
      this.#platform.log("Usage: qw [options]");
      this.#platform.log("Options:");
      this.#platform.log("  --help     Show this message and exit.");
      this.#platform.log("  --version  Print version information and exit.");
      this.#platform.exit();
    }
  }
}
