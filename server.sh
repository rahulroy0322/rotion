#!/bin/bash

OUTFILE=".env"

env > "$OUTFILE"

cd apps/server
pnpm start