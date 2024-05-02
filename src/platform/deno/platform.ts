import Platform from "../../core/platform.ts";
import { version as qwVersion } from "../../../mod.ts";
import { path } from "../../deps.ts";

const join = path.join;

export default class DenoPlatform implements Platform {
  #projectDir: string;

  constructor(projectDir: string) {
    this.#projectDir = projectDir;
  }

  import(path: string) {
    // Do not inline this. It must not be statically analyzable.
    const url = `file://${join(this.projectDir, path)}`;
    return import(url);
  }

  log(message: string) {
    console.log(message);
  }

  get projectDir() {
    return this.#projectDir;
  }

  serve(handler: (request: Request) => Response | Promise<Response>) {
    Deno.serve(
      {
        // TODO: autogenerate certs
        cert: Deno.readTextFileSync("./.quickwire/certs/cert.pem"),
        key: Deno.readTextFileSync("./.quickwire/certs/cert.key"),
      },
      handler
    );
  }

  exit(code = 0) {
    Deno.exit(code);
  }

  watch(_callback: () => void) {
    // TODO: implement me
    // Watch the current project's files for changes so the core can reload
  }

  get version() {
    return qwVersion();
  }

  writeTextFile(path: string, data: string) {
    return Deno.writeTextFile(path, data);
  }
}
