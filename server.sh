#!/bin/bash

OUTFILE=".env"

env > "$OUTFILE"

pnpm start