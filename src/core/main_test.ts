import { parseArgs, main } from "./main.ts";
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

  it("parses export", () => {
    expect(parseArgs(["export"])).toEqual("export");
  });
});

describe("main", () => {
  it("prints version number", () => {
    const platform = mockPlatform();
    main(["--version"], platform);
    expect(platform.log).toHaveBeenCalledWith("qw (quickwire) test_version");
  });
});
