import Platform from "./platform.ts";
import QW, { Command } from "./qw.ts";

export function parseArgs(argv: string[]): Command {
  for (const arg of argv) {
    if (arg === "--help") {
      return "help";
    } else if (arg === "--version") {
      return "version";
    } else if (arg === "start") {
      return "start";
    }
  }

  return "help";
}

export function runCli(argv: string[], platform: Platform) {
  const qw = new QW(platform);
  const command = parseArgs(argv);
  qw.run(command);
}
