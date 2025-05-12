#!usr/bin/env sh

set -e

npm run build

cd dist

git init
git add .
git commit -m "New Deployment"
git push -f https://avikabir@github.com/avikabir/wish-you-were-here.git master:gh-pages

cd -