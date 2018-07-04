@echo off

set strLinker=%SystemRoot%\Microsoft.NET\Framework\v2.0.50727\csc.exe
set strAppName=PaSwitchGitHubAccount2018CS

echo %strLinker%
echo.

rem %strLinker% /target:winexe /resource:res\%strAppName%.resources /win32icon:res\%strAppName%.ico /optimize %strAppName%.cs
::%strLinker% /target:winexe /optimize %strAppName%.cs
%strLinker% /target:exe /optimize %strAppName%.cs

pause
