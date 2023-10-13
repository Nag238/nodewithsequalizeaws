var express = require("express");
var db = require("../ormexmaple/Model/sequalize");
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const program = require("./controllers/programecontroller")
app.use("/api/program", program)

app.get("/", (req, res) => {
    db.sequelize.sync({ force: true }).then(() => {
        res.send("Api Running");
    })
});

app.listen(4200, async () => {
    console.log("Server Starts");
});