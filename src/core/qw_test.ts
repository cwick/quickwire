import { describe, it, mockPlatform } from "./testing.ts";
import { expect } from "deno-std/expect/expect.ts";
import QW from "./qw.ts";

describe("QW", () => {
  it("prints the version number and exits", () => {
    const platform = mockPlatform();
    new QW(platform).run("version");
    expect(platform.log).toHaveBeenCalledWith("qw (quickwire) 0.1.0");
    expect(platform.exit).toHaveBeenCalled();
  });
});
