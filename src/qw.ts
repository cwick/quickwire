import { parseArgs } from "std/cli/parse_args.ts";
import * as devserver from "qw/platform/deno/devserver.ts";

const args = parseArgs(Deno.args, {
  boolean: ["help", "version"],
});

if (args._[0] === "run") {
  devserver.run(Deno.env.get("INIT_CWD") ?? ".");
} else if (args.version) {
  console.log("qw 0.1.0");
  Deno.exit(0);
} else {
  console.log("Usage: qw [options]");
  console.log("Options:");
  console.log("  --help     Show this message and exit.");
  console.log("  --version  Print version information and exit.");
}

// Deno.chdir(Deno.env.get("INIT_CWD") ?? ".");

// console.log(`We are in ${Deno.env.get("INIT_CWD")}`);
// console.log(`CWD is ${Deno.cwd()}`);

// const command = new Deno.Command("deno", {
//   args: ["compile", "index.ts"],
// });
// const { success, stdout } = await command.output();
