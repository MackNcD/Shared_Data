@echo off

cd /d "%~dp0myproject"
:launch
%PYTHON% python manage.py runserver %*
pause
exit /b