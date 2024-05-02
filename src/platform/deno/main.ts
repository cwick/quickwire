import { path } from "../../deps.ts";
import type Platform from "../../core/platform.ts";
import { main as qwMain } from "../../core/main.ts";
import { version as qwVersion } from "../../../mod.ts";

const join = path.join;

function main(argv: string[]) {
  // TODO: Something smart that finds the root project dir
  const projectDir = Deno.cwd();
  const platform: Platform = {
    import: (path) => {
      // Do not inline this. It must not be statically analyzable.
      const url = `file://${join(projectDir, path)}`;
      return import(url);
    },
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

  qwMain(argv, platform);
}

if (import.meta.main) {
  main(Deno.args);
}
