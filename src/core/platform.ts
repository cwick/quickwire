import { ComponentDefinition } from "../../mod.ts";

export type Module = {
  default?: unknown;
  [key: string]: unknown;
};

export type ComponentModule = Module & {
  default:
    | ComponentDefinition<unknown, unknown>
    | ComponentDefinition<unknown, unknown>["render"];
};

export function isComponentModule(module: Module): module is ComponentModule {
  return (
    module.default !== undefined &&
    module.default !== null &&
    (module.default instanceof Function ||
      (typeof module.default === "object" &&
        "render" in module.default &&
        module.default.render instanceof Function))
  );
}

export default interface Platform {
  exit(code: number): void;
  import(path: string): Promise<Module>;
  log(message: string): void;
  get projectDir(): string;
  serve(handler: (request: Request) => Response | Promise<Response>): void;
  get version(): string;
  watch(callback: () => void): void;
  writeTextFile(path: string, data: string): Promise<void>;
}
