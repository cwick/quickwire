if (import.meta.main) {
  const projectDir = Deno.cwd();
  const m = await import(`${projectDir}/example.ts`);
  console.log(m);
}
