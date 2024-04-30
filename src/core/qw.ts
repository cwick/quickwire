import Platform from "./platform.ts";
import Server from "./server.ts";

export type Command = "start" | "version" | "help";

export default class QW {
  #platform: Platform;

  constructor(platform: Platform) {
    this.#platform = platform;
  }

  run(command: "start" | "version" | "help") {
    if (command === "start") {
      const server = new Server(this.#platform);
      this.#platform.serve(server.handleRequest.bind(server));
    } else if (command === "version") {
      this.#platform.log("qw (quickwire) 0.1.0");
      this.#platform.exit();
    } else {
      this.#platform.log("Usage: qw [options] [COMMAND]");
      this.#platform.log("");
      this.#platform.log("Commands:");
      this.#platform.log(
        "  init\tCreate a new Quickwire project (not implemented)"
      );
      this.#platform.log("  start\tStart the current Quickwire project");
      this.#platform.log("");
      this.#platform.log("Options:");
      this.#platform.log("  --help     Show this message and exit.");
      this.#platform.log("  --version  Print version information and exit.");
      this.#platform.exit();
    }
  }
}
