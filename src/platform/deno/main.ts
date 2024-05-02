import { main as qwMain } from "../../core/main.ts";
import DenoPlatform from "./platform.ts";

function main(argv: string[]) {
  // TODO: Something smart that finds the root project dir
  const projectDir = Deno.cwd();

  qwMain(argv, new DenoPlatform(projectDir));
}

if (import.meta.main) {
  main(Deno.args);
}
