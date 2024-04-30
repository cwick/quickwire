import { parseArgs, runCli } from "./cli.ts";
import { describe, it, expect, mockPlatform } from "./testing.ts";

describe("parseArgs", () => {
  it("parses help", () => {
    expect(parseArgs(["--help"])).toEqual("help");
  });

  it("parses version", () => {
    expect(parseArgs(["--version"])).toEqual("version");
  });

  it("parses start", () => {
    expect(parseArgs(["start"])).toEqual("start");
  });
});

describe("runCli", () => {
  it("prints version number", () => {
    const platform = mockPlatform();
    runCli(["--version"], platform);
    expect(platform.log).toHaveBeenCalledWith("qw (quickwire) 0.1.0");
  });
});
