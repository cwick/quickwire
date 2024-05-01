import config from "./deno.json" with { type: "json" };

export function version(): string {
  return config.version;
}
