const { execSync } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetHtml = 'C:\\Users\\a1ypwgg0\\.gemini\\antigravity\\scratch\\sunova_repo\\partner-portal.html';
const destImage = 'C:\\Users\\a1ypwgg0\\.gemini\\antigravity\\brain\\7a012acc-2d38-47f9-b9b2-71ba962b003f\\sunova_enterprise_dashboard.png';

try {
    const cmd = `"${chromePath}" --headless=new --screenshot="${destImage}" --window-size=1280,900 "file:///${targetHtml.replace(/\\/g, '/')}"`;
    console.log('Executing:', cmd);
    execSync(cmd);
    console.log('Exists:', fs.existsSync(destImage));
} catch (err) {
    console.error('Error executing screenshot:', err.message);
}
