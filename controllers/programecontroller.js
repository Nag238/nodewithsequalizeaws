const express = require("express");
var emprouter = express.Router();
var db = require("../Model/sequalize");
var cloudWatchLogger = require('../Model/cloudwatchLogger')



emprouter.post('/AddRecord', async (req, res) => {
    const { dept, student } = req.body.deptinfo;
    try {
        var deptres = await db.models.dept.create(dept);
        student.forEach(async (item) => { return await Object.assign(item, { DEPT_ID: deptres.DEPT_ID }) });
        await db.models.student.bulkCreate(student).then(async (response) => {
            var data = await getDepartmentDetails();
            return Promise.resolve(res.status(200).send(data))
        });
    } catch (error) {
        res.status(500).send(error)
    }
})

getDepartmentDetails = async function () {
    await db.models.dept.findAll(
        {
            where: { DEPT_ID: 100 },
            include: [{
                model: db.models.student,
                as: 'st',
                required: false,
                //where: { STU_ID: 3 }
            }]
        }).then((data) => {
            if (data != undefined && data.length) {
                return data;
            }
            else {
                var json = { 'Error': "No Records Found", 'statusCode': "500" }
                res.send(json)
            }
        })
}

emprouter.get("/empinfo", async (req, res) => {
    var result;
    try {
        result = await getUserInfo();
    } catch (error) {
        console.log(error)
    }
    res.status(200).send(result.toString())
});

getUserInfo = async function () {
    return await 100;
}


emprouter.get("/list", async (req, res) => {
    try {
        await cloudWatchLogger.CreateCloudLoggerAndStream("testingGroup", "testStream");
        await cloudWatchLogger.PutEvents("testingGroup", "testStream", '{ "testing": 1234 }')
        return await getDepartmentDetails();
    } catch (error) {
        var json = { 'Error': error, "StatusCode": 500 }
        res.send(json)
    }
});


module.exports = emprouter;