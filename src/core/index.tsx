export default function Index({ children }: { children: unknown }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title></title>
      </head>
      <body>{children}</body>
    </html>
  );
}
