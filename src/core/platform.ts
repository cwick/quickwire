export type Module = {
  default?: unknown;
};

export default interface Platform {
  exit(code?: number): void;
  get projectDir(): string;
  import(path: string): Promise<Module>;
  log(message: string): void;
  serve(handler: (request: Request) => Response | Promise<Response>): void;
  watch(callback: () => void): void;
}
