
@ echo off

set app=%1

if "%1" == "" (
    set /p app="Ӧ�ô���:"
)

rem echo ����APP:%app%

supervisor --watch abs,apps/%app% apps/%app%/%app%.js

pause