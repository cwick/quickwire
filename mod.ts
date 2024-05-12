import config from "./deno.json" with { type: "json" };

export function version(): string {
  return config.version;
}

type SyncDataLoader = (...args: unknown[]) => unknown;
type AsyncDataLoader = (...args: unknown[]) => Promise<unknown>;

export type DataProps<T extends SyncDataLoader | AsyncDataLoader> = { data: Awaited<ReturnType<T>> }
