#!/bin/bash
jpg="jpg"
webp="webp"

for i in $(find . -name \*.png); do 
    cwebp -q 100 $i -o "${i/"png"/webp}"
done