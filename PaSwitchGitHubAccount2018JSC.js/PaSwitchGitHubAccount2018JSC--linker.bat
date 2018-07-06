@echo off

set strLinker=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\jsc.exe
set strAppName=PaSwitchGitHubAccount2018JSC

echo %strLinker%
echo.

set strCmd=%strLinker% /target:winexe %strAppName%.js
echo #%strCmd%
%strCmd%

pause
