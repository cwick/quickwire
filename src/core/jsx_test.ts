import { describe, it, expect } from "./testing.ts";
import { jsxTemplate } from "./jsx.ts";

describe("jsxTemplate", () => {
  it("concatenates strings", () => {
    const result = jsxTemplate(["foo", "bar"]);
    expect(result).toEqual("foobar");
  });

  it("concatenates strings and dynamic number values", () => {
    const result = jsxTemplate(["The answer is: "], 42);
    expect(result).toEqual("The answer is: 42");
  });

  it("concatenates strings and dynamic string array values", () => {
    const result = jsxTemplate(
      ["First list: ", ". Second list: "],
      ["a", "b", "c"],
      ["d", "e", "f"]
    );
    expect(result).toEqual("First list: abc. Second list: def");
  });

  it("concatenates strings and dynamic JSX elements", () => {
    const result = jsxTemplate(["<h1>", "</h1>"], {
      type: ({ message }) => message,
      props: { message: "Hello" },
    });
    expect(result).toEqual("<h1>Hello</h1>");
  });

  it("concatenates strings and dynamic mixed values", () => {
    const element = {
      type: ({ message }: { message: string }) => message,
      props: { message: "Hello" },
    };
    const result = jsxTemplate(
      ["First list: ", ". Second list: "],
      [1, ", ", "two", ", ", 3],
      ["four", ", ", element, ", ", "six"]
    );
    expect(result).toEqual(
      "First list: 1, two, 3. Second list: four, Hello, six"
    );
  });
});
