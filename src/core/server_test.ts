import {
  describe,
  it,
  mockPlatform,
  expect,
  assertSnapshot,
} from "./testing.ts";
import Server from "./server.ts";
import { Component } from "@quickwire/core";

describe("Server", () => {
  it("serves", async (t) => {
    const platform = mockPlatform({
      modules: { "routes/index.tsx": { default: () => "hello" } },
    });
    const server = new Server(platform);
    await assertSnapshot(t, await requestText(server, "/"));
  });

  it("serves different paths", async (t) => {
    const platform = mockPlatform({
      modules: {
        "routes/index.tsx": { default: () => "index" },
        "routes/about.tsx": { default: () => "about" },
      },
    });

    const server = new Server(platform);
    await assertSnapshot(t, await requestText(server, "/"));
    await assertSnapshot(t, await requestText(server, "/about"));
  });

  it("returns 404 when page module not found", async () => {
    const platform = mockPlatform();
    const server = new Server(platform);
    const response = await request(server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("returns 404 when page module has no default export", async () => {
    const platform = mockPlatform({
      modules: { "routes/not-found.tsx": { something: "else" } },
    });
    const server = new Server(platform);
    const response = await request(server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("returns 404 if page module's default export is not valid", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/not-found.tsx": { default: "not a valid page module" },
      },
    });
    const server = new Server(platform);
    const response = await request(server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("returns 404 if page module's default export is not a function that returns a string", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/not-found.tsx": { default: () => 42 },
      },
    });
    const server = new Server(platform);
    const response = await request(server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("loads async data for a page", async () => {
    const dummyPageComponent = Component({
      data() {
        return Promise.resolve({ id: 1, message: "Dummy async data" });
      },
      render({ data }) {
        return data.message;
      },
    });

    const platform = mockPlatform({
      modules: {
        "routes/page.tsx": {
          default: dummyPageComponent,
        },
      },
    });
    const server = new Server(platform);
    const result = await requestText(server, "/page");
    expect(result).toContain("Dummy async data");
  });

  it("loads synchronous data for a page", async () => {
    const dummyPageComponent = Component({
      data() {
        return { id: 1, message: "Dummy synchronous data" };
      },
      render({ data }) {
        return data.message;
      },
    });

    const platform = mockPlatform({
      modules: {
        "routes/page.tsx": {
          default: dummyPageComponent,
        },
      },
    });
    const server = new Server(platform);
    const result = await requestText(server, "/page");
    expect(result).toContain("Dummy synchronous data");
  });

  async function requestText(server: Server, path: string) {
    const response = await request(server, path);
    expect(response.status).toEqual(200);
    return await response.text();
  }

  function request(server: Server, path: string) {
    return server.handleRequest(new Request(`http://localhost:8080${path}`));
  }
});
