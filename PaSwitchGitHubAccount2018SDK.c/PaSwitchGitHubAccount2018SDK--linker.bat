@echo off

::set strCmd=gcc -finput-charset=UTF-8 -fexec-charset=GBK -mwindows -O2 frame.cpp -o frame.exe

set strCmd=windres PaSwitchGitHubAccount2018SDK.rc -O coff -o PaSwitchGitHubAccount2018SDK.res

echo #%strCmd%
%strCmd%


set strCmd=gcc -finput-charset=UTF-8 -fexec-charset=GBK -mwindows -O2 PaSwitchGitHubAccount2018SDK.c PaSwitchGitHubAccount2018SDK.res -o PaSwitchGitHubAccount2018SDK.exe

echo #%strCmd%
%strCmd%

::del PaSwitchGitHubAccount2018SDK.res

pause