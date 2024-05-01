if (import.meta.main) {
  const projectDir = Deno.cwd();
  const importPath = `file://${projectDir}/example.ts`;
  const m = await import(importPath);
  console.log(m);
}
