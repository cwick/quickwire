export type Module = {
  default?: unknown;
};

export default interface Platform {
  exit(code: number): void;
  import(path: string): Promise<Module>;
  log(message: string): void;
  get projectDir(): string;
  serve(handler: (request: Request) => Response | Promise<Response>): void;
  get version(): string;
  watch(callback: () => void): void;
  writeTextFile(path: string, data: string): Promise<void>;
}
