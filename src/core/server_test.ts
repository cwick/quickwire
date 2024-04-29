import { describe, it, mockPlatform, expect, fn } from "qw/core/testing.ts";
import Server from "qw/core/server.ts";
import { assertSnapshot } from "deno-std/testing/snapshot.ts";

describe("Server", () => {
  it("serves", async (t) => {
    const platform = mockPlatform();
    platform.import = fn(() =>
      Promise.resolve({ default: () => "hello" })
    ) as () => Promise<object>;

    const server = new Server(platform);
    await assertSnapshot(t, await request(server, "/"));
  });

  it("serves different paths", async (t) => {
    const platform = mockPlatform();
    platform.import = fn((path: string) => {
      if (path === "routes/index.tsx") {
        return Promise.resolve({ default: () => "index" });
      } else if (path === "routes/about.tsx") {
        return Promise.resolve({ default: () => "about" });
      }
    }) as () => Promise<object>;

    const server = new Server(platform);
    await assertSnapshot(t, await request(server, "/"));
    await assertSnapshot(t, await request(server, "/about"));
  });

  async function request(server: Server, path: string) {
    const response = await server.handleRequest(
      new Request(`http://localhost:8080${path}`)
    );
    expect(response.status).toEqual(200);
    return await response.text();
  }
});
