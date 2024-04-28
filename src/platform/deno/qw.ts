import { parseArgs } from "std/cli/parse_args.ts";
import { join } from "std/path/mod.ts";
import QW from "qw/core/qw.ts";
import Platform from "qw/core/platform.ts";

const projectDir = Deno.env.get("INIT_CWD") ?? ".";
const platform: Platform = {
  import: (path) => import(join(projectDir, path)),
  log: (message) => console.log(message),
  projectDir,
  serve: (handler) =>
    Deno.serve(
      {
        cert: Deno.readTextFileSync("./cert.pem"),
        key: Deno.readTextFileSync("./cert.key"),
      },
      handler
    ),
};

const args = parseArgs(Deno.args, {
  boolean: ["help", "version"],
});
const qw = new QW(platform);

if (args._[0] === "run") {
  qw.run("run");
} else if (args.version) {
  qw.run("version");
} else {
  qw.run("help");
}
