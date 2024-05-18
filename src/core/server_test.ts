import { describe, it, mockPlatform, expect } from "./testing.ts";
import Server from "./server.ts";
import { Page } from "@quickwire/core";

describe("Server", () => {
  it("serves", async () => {
    const platform = mockPlatform({
      modules: { "routes/index.tsx": { default: () => "hello" } },
    });
    const server = new Server(platform);
    expect(await requestText(server, "/")).toContain("hello");
  });

  it("serves different paths", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/index.tsx": { default: () => "Index Page" },
        "routes/about.tsx": { default: () => "About Page" },
      },
    });

    const server = new Server(platform);
    expect(await requestText(server, "/")).toContain("Index Page");
    expect(await requestText(server, "/about")).toContain("About Page");
  });

  it("returns 404 when page module not found", async () => {
    const platform = mockPlatform();
    const server = new Server(platform);
    const response = await request("GET", server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("returns 404 when page module has no default export", async () => {
    const platform = mockPlatform({
      modules: { "routes/not-found.tsx": { something: "else" } },
    });
    const server = new Server(platform);
    const response = await request("GET", server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("returns 404 if page module's default export is not valid", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/not-found.tsx": { default: "not a valid page module" },
      },
    });
    const server = new Server(platform);
    const response = await request("GET", server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("returns 404 if page module's default export is not a function that returns a string", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/not-found.tsx": { default: () => 42 },
      },
    });
    const server = new Server(platform);
    const response = await request("GET", server, "/not-found");
    expect(response.status).toEqual(404);
  });

  it("loads async data for a page", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/page.tsx": {
          default: Page({
            data() {
              return Promise.resolve({ id: 1, message: "Dummy async data" });
            },
            render({ data }) {
              return data.message;
            },
          }),
        },
      },
    });
    const server = new Server(platform);
    const result = await requestText(server, "/page");
    expect(result).toContain("Dummy async data");
  });

  it("loads synchronous data for a page", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/page.tsx": {
          default: Page({
            data() {
              return { id: 1, message: "Dummy synchronous data" };
            },
            render({ data }) {
              return data.message;
            },
          }),
        },
      },
    });
    const server = new Server(platform);
    const result = await requestText(server, "/page");
    expect(result).toContain("Dummy synchronous data");
  });

  it("loads a static page with no data", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/about.tsx": {
          default: Page({
            render() {
              return "About Page";
            },
          }),
        },
      },
    });
    const server = new Server(platform);
    const result = await requestText(server, "/about");
    expect(result).toContain("");
  });

  it("renders a dynamic route", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/notes/[id].tsx": {
          default: Page({
            render({ params }) {
              return `This is Note ${params.id}`;
            },
          }),
        },
      },
    });
    const server = new Server(platform);
    expect(await requestText(server, "/notes/1")).toContain("This is Note 1");
    expect(await requestText(server, "/notes/2")).toContain("This is Note 2");
  });

  it("renders different dynamic routes", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/notes/[id].tsx": {
          default: Page({
            render({ params }) {
              return `This is Note ${params.id}`;
            },
          }),
        },
        "routes/comments/[id].tsx": {
          default: Page({
            render({ params }) {
              return `This is Comment ${params.id}`;
            },
          }),
        },
      },
    });
    const server = new Server(platform);
    const result = await requestText(server, "/comments/abc");
    expect(result).toContain("This is Comment abc");
  });

  it("a static route takes precedence over a dynamic route", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/notes/[id].tsx": {
          default: Page({
            render({ params }) {
              return `This is Note ${params.id}`;
            },
          }),
        },
        "routes/notes/new.tsx": {
          default: Page({
            render() {
              return `This is the New Note page`;
            },
          }),
        },
      },
    });
    const server = new Server(platform);
    const result = await requestText(server, "/notes/new");
    expect(result).toContain("This is the New Note page");
  });

  it("handles form submission", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/notes/new.post.tsx": {
          default: Page({
            render() {
              return new Response(null, {
                status: 303,
                headers: { Location: "/notes" },
              });
            },
          }),
        },
      },
    });
    const server = new Server(platform);
    const result = await request("POST", server, "/notes/new");
    expect(result.status).toEqual(303);
    expect(result.headers.get("Location")).toEqual("/notes");
  });

  it("handles form submission for different methods", async () => {
    const platform = mockPlatform({
      modules: {
        "routes/notes.post.tsx": {
          default: Page({
            render() {
              return new Response(null, {
                status: 201,
              });
            },
          }),
        },
        "routes/notes.delete.tsx": {
          default: Page({
            render() {
              return new Response(null, {
                status: 204,
              });
            },
          }),
        },
      },
    });

    const server = new Server(platform);
    let result = await request("POST", server, "/notes");
    expect(result.status).toEqual(201);
    result = await request("DELETE", server, "/notes");
    expect(result.status).toEqual(204);
  });

  async function requestText(server: Server, path: string) {
    const response = await request("GET", server, path);
    expect(response.status).toEqual(200);
    return await response.text();
  }

  function request(
    method: "GET" | "POST" | "DELETE",
    server: Server,
    path: string
  ) {
    return server.handleRequest(
      new Request(`http://localhost:8080${path}`, { method })
    );
  }
});
