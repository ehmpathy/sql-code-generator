#!/bin/bash

# posix style fn definition; https://stackoverflow.com/a/12469057/3068233
changed () {
  git diff --name-only HEAD@{1} HEAD | grep "^$1" > /dev/null 2>&1
}

if changed 'package-lock.json'; then
  echo "📦 package-lock.json changed. Run 'npm install' to update your locally installed dependencies."
fi
