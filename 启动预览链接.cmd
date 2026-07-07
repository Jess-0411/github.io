@echo off
cd /d "%~dp0"
echo 正在启动教学采购项目管理原型...
echo.
echo 打开地址: http://127.0.0.1:4173
echo 关闭此窗口会停止预览服务。
echo.
start "" "http://127.0.0.1:4173"
node server.js
