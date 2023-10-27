const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");

const PASSWORD = require("./assets/scripts/sql_cred");
const DATABASE_NAME = 'farleymart_db';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: PASSWORD,
        database: DATABASE_NAME
    },
    console.log(`Connected to the ${DATABASE_NAME} database.`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
