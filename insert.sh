#!/bin/bash

echo "Begin insert"
sqlite3 mixin.db < mixin.sql
echo "End insert"
