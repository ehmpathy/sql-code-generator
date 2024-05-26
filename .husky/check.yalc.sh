#!/bin/bash

# https://github.com/wclr/yalc
if [ "$(npx yalc check)" ]; then
    echo "✋ package.json has yalc references. Run 'npx yalc remove --all' to remove these local testing references."
fi

