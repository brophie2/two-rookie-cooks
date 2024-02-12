#!/bin/bash
webp="webp"

for i in $(find . -name \*.png); do 
    echo "Compressing ${i}"
    cwebp -q 100 $i -o "${i/"png"/webp}"
done

for i in $(find . -name \*.jpg); do 
    echo "Compressing ${i}"
    cwebp -q 70 $i -o "${i/"jpg"/webp}"
done
