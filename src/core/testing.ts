import Platform from "qw/core/platform.ts";
import { fn } from "qw/platform/testing.ts";

// Not in the mood to write a custom testing framework. Let the platform handle it.
export * from "qw/platform/testing.ts";

export function mockPlatform(): Platform {
  return {
    log: fn() as () => void,
    serve: fn() as () => void,
    import: fn(() => Promise.resolve({})) as () => Promise<object>,
    projectDir: "test_project",
    exit: fn() as () => void,
  };
}
