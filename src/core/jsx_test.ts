import { describe, it, expect } from "./testing.ts";
import { jsxTemplate } from "./jsx.ts";

describe("jsxTemplate", () => {
  it("concatenates strings", () => {
    const result = jsxTemplate(["foo", "bar"]);
    expect(result).toBe("foobar");
  });
});
