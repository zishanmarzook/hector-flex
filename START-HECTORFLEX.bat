@echo off
setlocal
cd /d "%~dp0"
title HECTORFLEX Official Bot
echo =======================================
echo       HECTORFLEX OFFICIAL BOT
echo =======================================
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed.
  echo Download the LTS version from https://nodejs.org/
  echo After installing it, double-click this file again.
  pause
  exit /b 1
)
where npm >nul 2>&1
if errorlevel 1 (
  echo npm is missing. Reinstall Node.js from https://nodejs.org/
  pause
  exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-windows.ps1"
if errorlevel 1 (
  echo Setup was not completed.
  pause
  exit /b 1
)
if not exist "node_modules\discord.js" (
  echo Installing bot dependencies...
  call npm install
  if errorlevel 1 (
    echo Could not install dependencies. Check your internet connection.
    pause
    exit /b 1
  )
)
echo Starting HECTORFLEX... Close this window to stop the bot.
call npm start
echo Bot stopped.
pause
