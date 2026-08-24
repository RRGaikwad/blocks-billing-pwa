const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + decodeURIComponent(req.url);
    if (filePath == './') filePath = './index.html';
    if (filePath == './RamArts Billing Receipt_01.html') filePath = './Block Billing PWA.html';
    
    console.log(`Serving: ${filePath}`);

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/manifest+json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpeg'; break;
        case '.jpeg': contentType = 'image/jpeg'; break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(3003, '0.0.0.0', () => {
    console.log('Server running at http://localhost:3003/');
    console.log('Access on your network at http://192.168.1.7:3003');
});
