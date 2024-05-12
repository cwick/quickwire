import config from "./deno.json" with { type: "json" };

export function version(): string {
  return config.version;
}

type SyncDataLoader<T> = (...args: unknown[]) => T;
type AsyncDataLoader<T> = (...args: unknown[]) => Promise<T>;
type DataLoader<T> = SyncDataLoader<T> | AsyncDataLoader<T>;
type ComponentProps<T> = { data: Awaited<T>; [key: string]: unknown };
type RenderFunction<T> = (props: ComponentProps<T>) => string;

export type ComponentDefinition<T> = {
  data: DataLoader<T>;
  render: RenderFunction<T>;
};

export function Component<T>(definition: ComponentDefinition<T>) {
  return definition;
}
