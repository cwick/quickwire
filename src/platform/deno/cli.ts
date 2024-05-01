import { path } from "../../deps.ts";
import type Platform from "../../core/platform.ts";
import { parseArgs, runCli } from "../../core/cli.ts";

const join = path.join;

function main(argv: string[]) {
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
  };

  const isBootstrap = argv[0] === "__BOOTSTRAP__";
  argv = isBootstrap ? argv.slice(1) : argv;
  const isDev = argv[0] === "__DEV__";
  argv = isDev ? argv.slice(1) : argv;

  const command = parseArgs(argv);

  if (isBootstrap && command === "start") {
    const command = new Deno.Command(Deno.execPath(), {
      args: [
        "run",
        "--watch",
        "--allow-read",
        "--allow-write",
        "--allow-net",
        // TODO: autogenerate config
        "--config=.quickwire/deno/deno.json",
        "--lock=.quickwire/deno/deno.lock",
        // Fix for error:
        // "Importing a JSR package via an HTTPS URL is not implemented. Use a jsr: specifier instead for the time being."
        isDev ? import.meta.url : "jsr:@quickwire/core/cli",
        ...argv,
      ],
    });
    command.spawn();
  } else {
    runCli(argv, platform);
  }
}

if (import.meta.main) {
  main(Deno.args);
}
