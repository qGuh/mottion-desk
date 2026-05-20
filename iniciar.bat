@echo off
echo Iniciando Mottion Desk...
start "Backend API" node "C:\Users\gustavo.dangelo\Documents\SERVICE_DESK\backend\server.js"
start "Frontend" node "C:\Users\gustavo.dangelo\Documents\SERVICE_DESK\_frontend-server.js"
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5500
echo.
pause
