const http = require("http");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const multer = require("multer");
const config = require("./helper/config");
const url = "mongodb+srv://root:swb1234@cluster0.p8vw5.mongodb.net/Node_Demo";
const { fstat } = require("fs");
const routes = require("./router/user.routes");
const app = express();

const server = http.createServer(app);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on('open', () => {
    console.log('Connected...');
});

app.get('/', (req, res) => { res.send("App Working"); });
app.use('/api', routes);
server.listen(config.port, (err) => {
    if (err) throw (err);
    console.log("Server Up And Running");
});