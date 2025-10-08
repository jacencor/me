#!/bin/sh

for file in *.json; do
    if grep -q '"language".*"lat"\]' "$file"  && \
        ! grep -q '"categories".*\[.*"adult".*\]' "$file"; then
            filename=$(basename $file .json)
            count=0
            sed -n '/canonical = {/,/}/p' $filename.py | grep -o '"https://[^"]*"' | sort -u | while read line || [[ -n $line ]];
            do
                ((count+=1))
                echo $line,
            done
    fi
done

