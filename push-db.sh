#!/bin/bash

echo "push to sdcard"
adb push mixin.db /sdcard/
wait
echo "copy to app"
adb shell "run-as one.mixin.messenger cp /sdcard/mixin.db3 databases"
adb shell "run-as one.mixin.messenger rm databases/mixin.db3-shm"
adb shell "run-as one.mixin.messenger rm databases/mixin.db3-wal"
echo "Done"
