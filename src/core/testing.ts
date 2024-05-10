import type Platform from "./platform.ts";
import { fn } from "../platform/testing.ts";
import { Module } from "./platform.ts";
export * from "../platform/testing.ts";

export function mockPlatform({
  modules = {},
}: { modules?: { [key: string]: Module } } = {}): Platform {
  return {
    exit: fn() as () => void,
    import: fn((path: string) => {
      if (!modules[path]) {
        throw new TypeError(`Module not found: ${path}`);
      }
      return Promise.resolve(modules[path]);
    }) as (path: string) => Promise<Module>,
    log: fn() as () => void,
    projectDir: "test_project",
    serve: fn() as () => void,
    version: "test_version",
    watch: fn() as () => void,
    writeTextFile: fn(() => Promise.resolve()) as () => Promise<void>,
  };
}
