import { describe, it, mockPlatform, expect } from "./testing.ts";
import QW from "./qw.ts";

describe("QW", () => {
  it("prints the version number and exits", () => {
    const platform = mockPlatform();
    new QW(platform).run("version");
    expect(platform.log).toHaveBeenCalledWith("qw (quickwire) 0.1.0");
    expect(platform.exit).toHaveBeenCalled();
  });

  it("exports a project", () => {
    const platform = mockPlatform();
    new QW(platform).run("export");
    expect(platform.log).toHaveBeenCalledWith("Not implemented");
    expect(platform.exit).toHaveBeenCalledWith(1);
  });
});
