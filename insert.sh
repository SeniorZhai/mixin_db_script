#!/bin/bash

echo "Begin insert"
sqlite3 mixin.db3 < mixin.sql
echo "End insert"
