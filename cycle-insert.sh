#!/bin/bash

count=$1

for ((i=1;i<=$count;i++))
do
node generate.js
echo "insert start!!!"
sqlite3 mixin.db < new.sql
echo "insert success $i"
done