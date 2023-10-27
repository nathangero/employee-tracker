const inquirer = require("inquirer");
const express = require("express");
const Database = require("./libs/Database.js");
const database = new Database(); // Connect to database 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
});


database.getAllDepartments().then(([rows]) => {
    console.log("rows:", rows);
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
