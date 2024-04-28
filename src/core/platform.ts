type Module = {
  default?: unknown;
};

export default interface Platform {
  import(path: string): Promise<Module>;
  log(message: string): void;
  get projectDir(): string;
  serve(handler: (request: Request) => Response | Promise<Response>): void;
}
