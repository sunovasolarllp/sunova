@echo off
echo ==================================================
echo   SUNOVA SOLAR LLP - LOCAL MAIL SERVER START
echo ==================================================
echo.
echo 1. Installing Node.js dependencies (express, nodemailer, imapflow)...
call npm install
echo.
echo 2. Launching Web Portal at http://localhost:3000...
start "" "http://localhost:3000"
echo.
echo 3. Starting secure Mail Server proxy...
node server.js
pause
