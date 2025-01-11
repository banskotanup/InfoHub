const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let filepath = path.join(__dirname, 'project', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filepath);
    let contentType = "text/html";

    fs.readFile(filepath, (err, data) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'project', '404.html'), (err, data) => {
                    res.writeHead(404, { 'content-type': contentType });
                    res.write(data);
                    res.end();
                });
            }
            else {
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        }
        else {
            res.writeHead(200, { 'content-type': contentType });
            res.write(data);
            res.end();
       } 
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`); 
});