@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在启动采购项目管理原型...
echo.
echo 打开地址: http://127.0.0.1:5190/
echo 关闭此窗口会停止本地预览服务。
echo.
start "" "http://127.0.0.1:5190/"
node server.js
pause
