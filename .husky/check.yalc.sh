#!/bin/bash

# https://github.com/wclr/yalc
if command -v node > /dev/null 2>&1 && [ -x ./node_modules/.bin/yalc ]; then
    if [ "$(./node_modules/.bin/yalc check 2>/dev/null)" ]; then
        echo "✋ package.json has yalc references. Run 'npx yalc remove --all' to remove these local testing references."
    fi
else
    echo "🟡 yalc not available, wont check for yalc references"
fi

