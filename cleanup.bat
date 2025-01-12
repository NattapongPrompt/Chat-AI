@echo off
:: Take ownership of node_modules
takeown /F node_modules /R /D Y
icacls node_modules /grant %username%:F /T

:: Take ownership of package-lock.json
takeown /F package-lock.json
icacls package-lock.json /grant %username%:F

:: Remove files
rmdir /S /Q node_modules
del package-lock.json

:: Reinstall dependencies
npm install
