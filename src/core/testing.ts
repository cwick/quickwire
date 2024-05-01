import type Platform from "./platform.ts";
import { fn } from "../platform/testing.ts";
export * from "../platform/testing.ts";

export function mockPlatform(): Platform {
  return {
    log: fn() as () => void,
    serve: fn() as () => void,
    import: fn(() => Promise.resolve({})) as () => Promise<object>,
    projectDir: "test_project",
    exit: fn() as () => void,
    watch: fn() as () => void,
    version: "test_version",
  };
}
