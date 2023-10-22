var express = require("express");
const bodyParser = require('body-parser');
var db = require("../ormexmaple/Model/sequalize");
var app = express();
app.use(bodyParser.json());
const program = require("./controllers/programecontroller")
app.use("/api/program", program)

app.get("/", (req, res) => {
    db.sequelize.sync().then(() => {
        res.send("Api Running");
    })
});

app.listen(4200, async () => {
    console.log("Server Starts");
});