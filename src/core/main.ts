import type Platform from "./platform.ts";
import QW, { type Command } from "./qw.ts";

export function parseArgs(argv: string[]): Command {
  for (const arg of argv) {
    if (arg === "--help") {
      return "help";
    } else if (arg === "--version") {
      return "version";
    } else if (arg === "start") {
      return "start";
    } else if (arg === "export") {
      return "export";
    }
  }

  return "help";
}

export function main(argv: string[], platform: Platform) {
  const qw = new QW(platform);
  const command = parseArgs(argv);
  qw.run(command);
}
