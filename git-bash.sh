#!/bin/bash

# git config --global alias.ac '!sh git-bash.sh'
# git ac "commit message" will run this script

./create-sitemap.sh
git add .
git status
git commit -m "$*"
