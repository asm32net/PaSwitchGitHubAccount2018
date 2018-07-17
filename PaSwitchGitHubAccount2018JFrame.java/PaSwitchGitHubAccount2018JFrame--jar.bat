@echo off

set strAppName=PaSwitchGitHubAccount2018JFrame
echo Begin ...
echo --------------------

javac -encoding utf-8 -d . %strAppName%.java
echo --------------------
echo Done.

if exist %strAppName%.manifest.txt del /f %strAppName%.manifest.txt

echo Manifest-Version: 1.0> %strAppName%.manifest.txt
echo Created-By: 1.4.2_12 (Sun Microsystems Inc.)>> %strAppName%.manifest.txt
echo Main-Class: %strAppName%>> %strAppName%.manifest.txt

echo Release ...
echo --------------------

jar cvfm .\%strAppName%.jar .\%strAppName%.manifest.txt %strAppName%.class

del %strAppName%.manifest.txt
echo --------------------
echo Done.

pause