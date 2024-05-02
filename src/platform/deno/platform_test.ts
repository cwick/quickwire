import { describe } from "../../core/testing.ts";
import DenoPlatform from "./platform.ts";
import { expect } from "./testing.ts";

describe("DenoPlatform", () => {
  describe(".writeTextFile", async () => {
    try {
      const platform = new DenoPlatform(".");
      await platform.writeTextFile("hello.txt", "Hello world");
      const result = Deno.readTextFileSync("hello.txt");
      expect(result).toEqual("Hello world");
    } finally {
      Deno.removeSync("hello.txt");
    }
  });
});
