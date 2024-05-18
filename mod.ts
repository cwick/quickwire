import config from "./deno.json" with { type: "json" };

export function version(): string {
  return config.version;
}

type SyncDataLoader<T> = (props: RequestProps) => T;
type AsyncDataLoader<T> = (props: RequestProps) => Promise<T>;
type DataLoader<T> = SyncDataLoader<T> | AsyncDataLoader<T>;
type DynamicParams = { [key: string]: string };
export type RequestProps = {
  params: DynamicParams;
  body: FormData;
};

type RenderFunction<T> = (props: T) => string | Response;

export type PageDefinition<T> = {
  data?: DataLoader<T>;
  render: RenderFunction<Awaited<T>>;
};

export function Page<T=RequestProps>(definition: PageDefinition<T>) {
  return definition;
}
