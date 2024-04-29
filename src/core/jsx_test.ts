import { describe, it, expect } from "qw/core/testing.ts";
import { jsxTemplate } from "qw/jsx-runtime";

describe("jsxTemplate", () => {
  it("concatenates strings", () => {
    const result = jsxTemplate(["foo", "bar"]);
    expect(result).toBe("foobar");
  });
});
