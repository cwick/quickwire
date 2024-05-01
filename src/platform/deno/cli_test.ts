import { describe, it, expect } from "../../core/testing.ts";
import { join } from "@std/path";

describe("Main script", () => {
  it("prints the version number", async () => {
    const command = new Deno.Command(Deno.execPath(), {
      args: [
        "run",
        "--allow-read",
        join(import.meta.dirname!, "cli.ts"),
        "--version",
      ],
    });
    const { code, stdout } = await command.output();

    expect(code).toEqual(0);
    expect(new TextDecoder().decode(stdout)).toEqual("qw (quickwire) 0.1.0\n");
  });
});
