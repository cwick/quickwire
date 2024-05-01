import { describe, it, expect } from "../../core/testing.ts";
import { path } from "../../deps.ts";
import config from "../../../deno.json" with { type: "json" };


describe("Main script", () => {
  it("prints the version number", async () => {
    const command = new Deno.Command(Deno.execPath(), {
      args: [
        "run",
        "--allow-read",
        path.join(import.meta.dirname!, "cli.ts"),
        "--version",
      ],
    });
    const { code, stdout } = await command.output();

    expect(code).toEqual(0);
    expect(new TextDecoder().decode(stdout)).toEqual(`qw (quickwire) ${config.version}\n`);
  });
});
