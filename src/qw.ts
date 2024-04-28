import { parseArgs } from "std/cli/parse_args.ts";

const args = parseArgs(Deno.args, {
  boolean: ["help", "version"],
});

if (args._[0] === "run") {
  await import(`${Deno.env.get("INIT_CWD")}/index.jsx`);
  Deno.serve(
    {
      cert: Deno.readTextFileSync("./cert.pem"),
      key: Deno.readTextFileSync("./cert.key"),
    },
    (_req) => new Response("Hello, world")
  );
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
