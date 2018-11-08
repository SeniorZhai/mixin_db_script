#!/bin/bash

echo "push to sdcard"
adb push mixin.db /sdcard/
wait
echo "copy to app"
adb shell "run-as one.mixin.messenger cp /sdcard/mixin.db databases"
adb shell "run-as one.mixin.messenger rm databases/mixin.db-shm"
adb shell "run-as one.mixin.messenger rm databases/mixin.db-wal"
echo "Done"
