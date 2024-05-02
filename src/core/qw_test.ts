import {
  describe,
  it,
  mockPlatform,
  expect,
  assertSnapshot,
} from "./testing.ts";
import QW from "./qw.ts";

describe("QW", () => {
  it("prints the version number and exits", () => {
    const platform = mockPlatform();
    new QW(platform).run("version");
    expect(platform.log).toHaveBeenCalledWith("qw (quickwire) test_version");
    expect(platform.exit).toHaveBeenCalledWith(0);
  });

  it("prints usage information and exits", async (t) => {
    const platform = mockPlatform();
    let stdout = "";
    platform.log = (message: string) => (stdout += message + "\n");

    new QW(platform).run("help");
    await assertSnapshot(t, stdout);
    expect(platform.exit).toHaveBeenCalledWith(0);
  });

  it("exports a project", async () => {
    const platform = mockPlatform();
    platform.import = (path: string) => {
      if (path === "routes/index.tsx") {
        return Promise.resolve({ default: () => "Hello world" });
      }
      throw new Error(`Unexpected import: ${path}`);
    };

    await new QW(platform).run("export");
    expect(platform.writeTextFile).toHaveBeenCalledWith(
      "index.html",
      "Hello world"
    );
    expect(platform.exit).toHaveBeenCalledWith(0);
  });
});
