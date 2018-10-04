const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer(function(req,res){
    console.log(`${req.method} request for ${req.url}.`);

    if(req.url == "/"){
        fs.readFile(path.join(__dirname,"tributePage.html"),"UTF-8", function(err,html){
            if(err) throw err;

        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(html);
        console.log("Successfully created web server");

        });
    }
    else if(req.url.match(/.css$/)){

        let filestream = fs.createReadStream(path.join(__dirname,req.url),"UTF-8");
        res.writeHead(200,{"Content-Type":"text/css"});

        filestream.pipe(res);


    }
    else{
        res.writeHead(404,{"Content-Type" : "text/plain"});
        res.end("404 file not found");
    }

}).listen(3000);