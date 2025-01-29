const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../config/db.config.js');
const Student = require('./student.model.js');

// Define the User class by extending Model
class Marks extends Model { }

// initiallizing marks table


Marks.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'students', // Table name in the database
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    subject: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    }
},
    {
        sequelize,             // sequelize instance
        modelName: 'Marks',
        tableName: 'marks',
        timestamps: false,    // This will disable createdAt and updatedAt

    }
);

// Define associations
Marks.belongsTo(Student, {
    foreignKey: 'studentid',
    as: 'student'
});

Student.hasMany(Marks, {
    foreignKey: 'studentid',
    as: 'marks'
});

module.exports = Marks;