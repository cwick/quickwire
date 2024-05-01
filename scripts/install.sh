#!/bin/sh

# The plan is to re-work this script to be more than a thin wrapper around Deno's install script.

deno_version="v1.42.4"
deno_install="${DENO_INSTALL:-$HOME/.deno}"
bin_dir="$deno_install/bin"
exe="$bin_dir/deno"

if ! command -v deno >/dev/null; then
  curl -fsSL https://deno.land/install.sh | sh -s $deno_version
fi

$exe install -n qw --force --allow-read --allow-run jsr:@quickwire/core/cli.ts -- __BOOTSTRAP__