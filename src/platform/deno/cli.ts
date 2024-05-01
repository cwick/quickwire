import { path } from "../../deps.ts";
import type Platform from "../../core/platform.ts";
import { parseArgs, runCli } from "../../core/cli.ts";
import { version as qwVersion } from "../../../mod.ts";

const join = path.join;

async function main(argv: string[]) {
  // TODO: Something smart that finds the root project dir
  const projectDir = Deno.cwd();
  const platform: Platform = {
    import: (path) => import(join(projectDir, path)),
    log: (message) => console.log(message),
    projectDir,
    serve: (handler) =>
      Deno.serve(
        {
          // TODO: autogenerate certs
          cert: Deno.readTextFileSync("./.quickwire/certs/cert.pem"),
          key: Deno.readTextFileSync("./.quickwire/certs/cert.key"),
        },
        handler
      ),
    exit: (code = 0) => Deno.exit(code),
    watch: (_callback) => {
      // TODO: implement me
      // Watch the current project's files for changes so the core can reload
    },
    version: qwVersion(),
  };

  const isBootstrap = argv[0] === "__BOOTSTRAP__";
  argv = isBootstrap ? argv.slice(1) : argv;

  const config = (
    await import(join(projectDir, "deno.json"), {
      with: { type: "json" },
    })
  ).default;

  const scriptName = `${config.imports["@quickwire/core"]}/cli.ts`;
  const command = parseArgs(argv);

  if (isBootstrap) {
    new Deno.Command(Deno.execPath(), {
      args: [
        "run",
        ...(command === "start" ? ["--watch"] : []),
        "--allow-read",
        "--allow-write",
        "--allow-net",
        scriptName,
        ...argv,
      ],
    }).spawn();
  } else {
    runCli(argv, platform);
  }
}

if (import.meta.main) {
  main(Deno.args);
}
