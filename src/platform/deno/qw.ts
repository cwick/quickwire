import { cli } from "../../deps.ts";
import { path } from "../../deps.ts";
import QW from "../../core/qw.ts";
import Platform from "../../core/platform.ts";

const join = path.join;

function main() {
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

  const args = cli.parseArgs(Deno.args, {
    boolean: ["help", "version"],
  });
  const qw = new QW(platform);

  if (Deno.args[0] === "__BOOTSTRAP__") {
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
        ...Deno.args.slice(1),
      ],
    });
    command.spawn();
  } else {
    if (args._[0] === "run") {
      qw.run("run");
    } else if (args.version) {
      qw.run("version");
    } else {
      qw.run("help");
    }
  }
}

if (import.meta.main) {
  main();
}
