module.exports = (sequalize, DataTypes) => {
    var Dept = sequalize.define("dept", {
        DEPT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        NAME: {
            type: DataTypes.STRING
        },
        HOD: {
            type: DataTypes.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false
        })
    return Dept;
};


