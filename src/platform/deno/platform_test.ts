import { describe } from "../../core/testing.ts";
import { path } from "../../deps.ts";
import DenoPlatform from "./platform.ts";
import { expect, it } from "./testing.ts";

describe("DenoPlatform", () => {
  describe(".writeTextFile", () => {
    it("writes a file", async () => {
      const projectDir = Deno.makeTempDirSync();
      const tempFile = Deno.makeTempFileSync({
        dir: projectDir,
        suffix: ".txt",
      });

      try {
        const platform = new DenoPlatform(projectDir);
        await platform.writeTextFile(path.basename(tempFile), "Hello world");
        const result = Deno.readTextFileSync(tempFile);
        expect(result).toEqual("Hello world");
      } finally {
        Deno.removeSync(projectDir, { recursive: true });
      }
    });
  });

  describe("import TSX", () => {
    it("imports hello world", async () => {
      const projectDir = Deno.makeTempDirSync();
      const tempFile = Deno.makeTempFileSync({
        dir: projectDir,
        suffix: ".tsx",
      });

      try {
        Deno.writeTextFileSync(
          tempFile,
          "export default () => <h1>Hello world</h1>;"
        );
        const platform = new DenoPlatform(projectDir);

        const module = await platform.import(path.basename(tempFile));
        expect(module.default).toBeDefined();
        expect(module.default()).toEqual("<h1>Hello world</h1>");
      } finally {
        Deno.removeSync(projectDir, { recursive: true });
      }
    });
  });
});
