import config from "./deno.json" with { type: "json" };

export function version(): string {
  return config.version;
}

type SyncDataLoader<T> = (...args: unknown[]) => T;
type AsyncDataLoader<T> = (...args: unknown[]) => Promise<T>;
type DataLoader<T> = SyncDataLoader<T> | AsyncDataLoader<T>;
type DynamicParams = {[key:string]: string}
type PageProps<T> = { data: Awaited<T>; params: DynamicParams; [key: string]: unknown };
type RenderFunction<T> = (props: PageProps<T>) => string;

export type PageDefinition<T> =
  | {
      data: DataLoader<T>;
      render: RenderFunction<T>;
    }
  | {
      data?: never;
      render: RenderFunction<T>;
    };

export function Page<T>(definition: PageDefinition<T>) {
  return definition;
}
