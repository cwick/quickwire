import Index from "../../core/index.tsx";

export function run(rootDir: string) {
  Deno.serve(
    {
      cert: Deno.readTextFileSync("./cert.pem"),
      key: Deno.readTextFileSync("./cert.key"),
    },
    async (_req) => {
      // if server rendered
      const pageContents = (await import(`${rootDir}/index.tsx`)).default();

      return new Response(Index({ children: pageContents }), {
        status: 200,
        headers: { "Content-type": "text/html" },
      });

      // if client rendered
      //
    }
  );
}
