import { describe, it, mockPlatform, expect, fn } from "qw/core/testing.ts";
import Server from "qw/core/server.ts";
import { assertSnapshot } from "deno-std/testing/snapshot.ts";

describe("Server", () => {
  it("serves", async (t) => {
    const platform = mockPlatform();
    platform.import = fn(() =>
      Promise.resolve({ default: () => "hello" })
    ) as () => Promise<object>;
    const dummyRequest = new Request("http://localhost:8080");
    const response = await new Server(platform).handleRequest(dummyRequest);

    expect(response.status).toEqual(200);
    await assertSnapshot(t, await response.text());
  });
});
