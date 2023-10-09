import express from 'express';
import expressWs from 'express-ws';

var app = express();
expressWs(app);

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    console.log('get route', req.testing);
    res.end();
});

app.ws('/', function (ws, req) {

    ws.on('connection', function () {
        ws.send("CONNECTED!")
    })

    // ws.clients.forEach((client)=>{
    //     client.send("HELLo")
    // })

    ws.on('message', function (msg) {
        ws.send(`[user]: ${msg}`)
        console.log(msg);
    });
    console.log('socket', req.testing);
});

app.listen(3000);