var express = require("express");
var aws = require('aws-sdk')
const bodyParser = require('body-parser');
var db = require("../ormexmaple/Model/sequalize");
var app = express();
app.use(bodyParser.json());
const program = require("./controllers/programecontroller")
app.use("/api/program", program)


aws.config.update({
    accessKeyId: "AKIAY6I3UVV6XQXN3J7Y",
    secretAccessKey: "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",
    region: "us-east-1"
});

app.get("/", (req, res) => {
    db.sequelize.sync().then(() => {
        res.send("Api Running");
    })
});

app.listen(4200, async () => {
    console.log("Server Starts");
});