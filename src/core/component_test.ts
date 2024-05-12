import { describe, it, expect } from "./testing.ts";
import { Component } from "@quickwire/core";

describe("Components", () => {
  it("renders", () => {
    const DummyComponent = Component({
      render() {
        return "About Page";
      },
    });
    expect(DummyComponent.render({ data: null, params: {} })).toEqual(
      "About Page"
    );
  });

  it("renders with props", () => {
    const DummyComponent = Component({
      render(props: { message: string }) {
        return `Hello, ${props.message}!`;
      },
    });
    expect(
      DummyComponent.render({ data: null, params: {}, message: "world" })
    ).toEqual("Hello, world!");
  });

  it("renders with props and data", async () => {
    type User = { user: string; id: number };

    const DummyComponent = Component<User, { message: string }>({
      data() {
        return { id: 123, user: "Alice" };
      },
      render({ message, data }) {
        return `Hello from ${data.user}: ${message}`;
      },
    });

    expect(
      DummyComponent.render({
        data: await DummyComponent.data!(),
        params: {},
        message: "Nice to meet you",
      })
    ).toEqual("Hello from Alice: Nice to meet you");
  });
});
