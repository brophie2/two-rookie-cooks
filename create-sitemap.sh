#!/bin/bash

directory="_recipes"
sitemap="public/sitemap.txt"

if [ ! -d "$directory" ]; then
  exit 1
fi

# Add new static pages here
echo "https://tworookiecooks.github.io/" >$sitemap
echo "https://tworookiecooks.github.io/allrecipes" >>$sitemap

# Loop all the recipes
for file in "$directory"/*; do
  if [ -f "$file" ]; then
    filename="$(basename ${file} .yaml)"
    if [[ $filename != _* ]]; then
      echo https://tworookiecooks.github.io/recipes/$filename >>$sitemap
    fi
  fi
done
