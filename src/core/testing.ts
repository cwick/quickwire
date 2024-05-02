import type Platform from "./platform.ts";
import { fn } from "../platform/testing.ts";
export * from "../platform/testing.ts";

export function mockPlatform(): Platform {
  return {
    exit: fn() as () => void,
    import: fn(() => Promise.resolve({})) as () => Promise<object>,
    log: fn() as () => void,
    projectDir: "test_project",
    serve: fn() as () => void,
    version: "test_version",
    watch: fn() as () => void,
    writeTextFile: fn(() => Promise.resolve()) as () => Promise<void>,
  };
}
