import config from "./deno.json" with { type: "json" };

export function version(): string {
  return config.version;
}

type SyncDataLoader<T> = (...args: unknown[]) => T;
type AsyncDataLoader<T> = (...args: unknown[]) => Promise<T>;
type DataLoader<T> = SyncDataLoader<T> | AsyncDataLoader<T>;
type DynamicParams = {[key:string]: string}
type ComponentProps<T> = { data: Awaited<T>; params: DynamicParams; [key: string]: unknown };
type RenderFunction<T, PropTypes> = (props: ComponentProps<T> & PropTypes) => string;

export type ComponentDefinition<T, PropTypes> =
  | {
      data: DataLoader<T>;
      render: RenderFunction<T, PropTypes>;
    }
  | {
      data?: never;
      render: RenderFunction<T, PropTypes>;
    };

export function Component<T, PropTypes>(definition: ComponentDefinition<T, PropTypes>) {
  return definition;
}
