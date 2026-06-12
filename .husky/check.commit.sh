#!/bin/bash

if command -v node > /dev/null 2>&1 && [ -x ./node_modules/.bin/commitlint ]; then
    ./node_modules/.bin/commitlint --edit "$1"
else
    echo "🟡 commitlint not available, wont check commit message"
fi
