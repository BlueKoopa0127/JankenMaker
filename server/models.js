import Sequelize from "sequelize";

const { DataTypes } = Sequelize;
/*
const url =
    process.env.DATABASE_URL ||
    "postgres://ikko:112358kyx@localhost:5432/template1";
// heroku pg:push postgres://ikko:112358kyx@localhost:5432/template1 DATABASE_URL 
export const sequelize = new Sequelize(url); */

export const sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
  });
  

export const T_JankenList = sequelize.define(
    "jankenList",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        scissors: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paper: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        play: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        win: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    { underscored: true }
);

