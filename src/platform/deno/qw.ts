import { cli } from "../../deps.ts";
import { path } from "../../deps.ts";
import QW from "../../core/qw.ts";
import Platform from "../../core/platform.ts";

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
  };

  const isBootstrap = argv[0] === "__BOOTSTRAP__";
  argv = isBootstrap ? argv.slice(1) : argv;

  const args = cli.parseArgs(argv, {
    boolean: ["help", "version"],
  });
  const qw = new QW(platform);

  if (args._[0] === "run") {
    if (isBootstrap) {
      const command = new Deno.Command(Deno.execPath(), {
        args: [
          "run",
          "--allow-read",
          "--allow-write",
          "--allow-net",
          // TODO: autogenerate config
          "--config=.quickwire/deno/deno.json",
          "--lock=.quickwire/deno/deno.lock",
          import.meta.url,
          ...argv,
        ],
      });
      command.spawn();
    } else {
      qw.run("run");
    }
  } else if (args.version) {
    qw.run("version");
  } else {
    qw.run("help");
  }
}

if (import.meta.main) {
  main(Deno.args);
}
