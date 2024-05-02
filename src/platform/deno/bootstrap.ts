function bootstrap(argv: string[]) {
  const mainModule = argv[0];
  argv = argv.slice(1);
  new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "--watch",
      "--allow-read",
      "--allow-write",
      "--allow-net",
      mainModule,
      ...argv,
    ],
  }).spawn();
}

if (import.meta.main) {
  bootstrap(Deno.args);
}
