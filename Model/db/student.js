module.exports = (sequalize, DataTypes) => {
    var Student = sequalize.define("student", {
        STU_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        STU_NAME: {
            type: DataTypes.STRING
        },
        STU_PH: {
            type: DataTypes.DECIMAL
        },
        DEPT_ID: {
            type: DataTypes.INTEGER
        }
    },
        {
            freezeTableName: true,
            timestamps: false
        })
    return Student;
};


