const aws = require("aws-sdk")
aws.config.update({
    accessKeyId: "AKIAY6I3UVV6XQXN3J7Y",
    secretAccessKey: "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",
    region: "us-east-1"
});
var cloudWatchLogs = new aws.CloudWatchLogs();

module.exports.CreateCloudLoggerAndStream = async (logGroupName, logStreamName) => {
    try {

        const logGroupNameParams = {
            logGroupNamePrefix: logGroupName
        }
        const logGroups = await cloudWatchLogs.describeLogGroups(logGroupNameParams).promise();
        const logGroupsExists = logGroups.logGroups.some((grp) => grp.logGroupName === logGroupName);
        if (!logGroupsExists) {
            var createLogGroupNameParams = { logGroupName }
            await cloudWatchLogs.createLogGroup(createLogGroupNameParams).promise();
            console.log("log group created")
        }
        const logStreamNameParams = {
            logGroupName,
            logStreamNamePrefix: logStreamName
        }
        const logStreamNames = await cloudWatchLogs.describeLogStreams(logStreamNameParams).promise();
        const logStreamExists = logStreamNames.logStreams.some((grp) => grp.logStreamName === logStreamName);
        if (!logStreamExists) {
            var createLogStreamNameParams = { logGroupName, logStreamName }
            await cloudWatchLogs.createLogStream(createLogStreamNameParams).promise();
            console.log("log Stream created")
        }
    } catch (error) {
        console.log(error.stack)
        return res.status(500).send(error.stack)
    }
}

module.exports.PutEvents = async (logGroupName, logStreamName, message) => {
    try {
        const param = {
            logGroupName,
            logStreamName,
            logEvents: [{
                message,
                timestamp: new Date().getTime()
            }]
        }
        await cloudWatchLogs.putLogEvents(param).promise()
    }
    catch (error) {
        console.log('error occured'+error.stack)
    }
}


