#!/bin/bash

echo "copy from app to sdcard"
adb shell "run-as one.mixin.messenger cp databases/mixin.db /sdcard/"
wait
echo "pull from sdcard"
adb pull /sdcard/mixin.db
