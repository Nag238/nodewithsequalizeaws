var sequelize = require("sequelize");

var sequelizeDb = new sequelize(
    'mydb',
    'root',
    'admin',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: true
    }
)
sequelizeDb.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

var db = {}
db.sequelize = sequelizeDb;
db.models = {}
db.models.dept = require("../Model/db/dept")(sequelizeDb, sequelize.DataTypes)
db.models.student = require("../Model/db/student")(sequelizeDb, sequelize.DataTypes)
db.models.dept.hasMany(db.models.student, { as: "st", foreignKey: "DEPT_ID" });
db.models.student.belongsTo(db.models.dept, { foreignKey: "DEPT_ID", as: "dept" });
module.exports = db;
