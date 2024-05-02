import { describe, it, expect } from "./testing.ts";
import { jsxTemplate } from "./jsx.ts";

describe("jsxTemplate", () => {
  it("concatenates strings", () => {
    const result = jsxTemplate(["foo", "bar"]);
    expect(result).toEqual("foobar");
  });

  it("concatenates strings and dynamic values", () => {
    const result = jsxTemplate(["The answer is: "], 42);
    expect(result).toEqual("The answer is: 42");
  });
});
