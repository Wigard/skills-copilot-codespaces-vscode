// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var port = 3000;

// Create server
http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        pathname = '/index.html';
    }
    if (pathname === '/index.html') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, 'Not Found');
                res.end('<h1>404 Not Found</h1>');
                return;
            }
            res.writeHead(200, 'OK');
            res.write(data);
            res.end();
        });
    } else if (pathname === '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.writeHead(200, 'OK');
        res.end();
    } else if (pathname === '/getComments') {
        var str = JSON.stringify(comments);
        res.writeHead(200, 'OK');
        res.end(str);
    } else {
        staticRoot(path.resolve(__dirname, '.'), req, res);
    }
}).listen(port);

console.log('Server is running at http://