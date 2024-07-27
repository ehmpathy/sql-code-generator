#!/bin/bash

# if exists a .nvmrc, then `nvm use`, to use the specified version
[[ -f ".nvmrc" ]] && nvm use
