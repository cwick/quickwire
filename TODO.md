- export to different targets: web, static web, standalone, desktop etc...

- qw init

- transpile TS on the fly with [deno_emit](https://github.com/denoland/deno_emit)

  - Need to do this when qw is compiled, since dynamic imports don't work.
  - Generate source map. Precompile JSX. See CompilerOptions

- Distribution methods

  - Heroku: self-contained tarball. Includes deno exe
  - Surge: Globally installed script. Requires deno / node preinstalled
  - Django: Local manage.py script
  - Rails: Bootstrap script locates and runs the real script

- SSL certs for dev

  - Autogenerate
  - [node-forge](https://github.com/digitalbazaar/forge) x509 certs
    - Look at [minica](https://github.com/jsha/minica/blob/master/main.go)

- Code generation with [ts-morph](https://ts-morph.com/)

- Fix hard coded temp directory in deno.json: --watch-exclude=/tmp

- Example weather app
