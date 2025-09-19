@echo off
echo 🚀 Starting Doctors.com Test Suite
echo ==================================

echo 📋 Running Unit Tests...
call npm run test:run

echo.
echo 🌐 Running E2E Tests...
call npm run e2e

echo.
echo 📊 Generating Coverage Report...
call npm run coverage

echo.
echo ✅ All tests completed!
echo Check the coverage/ directory for detailed reports
echo Check the cypress/videos/ directory for E2E test recordings

pause
