@echo off

set strLinker=%SystemRoot%\Microsoft.NET\Framework\v3.5\csc.exe
set strAppName=PaSwitchGitHubAccount2018CS

echo %strLinker%
echo.

rem %strLinker% /target:winexe /resource:res\%strAppName%.resources /win32icon:res\%strAppName%.ico /optimize %strAppName%.cs
::%strLinker% /target:winexe /optimize %strAppName%.cs
%strLinker% /target:winexe /optimize %strAppName%.cs

pause
