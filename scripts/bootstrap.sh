#!/bin/sh

set -e

yarn

cd packages/cli 

yarn build

cd -

yarn clean && yarn

cd packages/vue-hooks

yarn build

cd -

cd packages/vue-icons

yarn build

cd -

echo "✅ Bootstrap completed"