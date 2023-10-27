const inquirer = require("inquirer");
const questions = require("./libs/inquirer/inquirer_questions");
const questions_values = require("./libs/inquirer/questions_values");
const Database = require("./libs/Database.js");
const database = new Database(); // Connect to database 



async function askUser() {
    let { userChoice } = await inquirer.prompt(questions);

    switch (userChoice) {
        case questions_values.VIEW_DEPARTMENTS:
            const [rows] = await database.getAllDepartments();
            console.log("rows:", rows);
            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.QUIT:
            console.log("Good-bye");
            database.closeDb();
            return;

        default:
            console.log("Couldn't find case, good-bye");
            database.closeDb();
            return;
    }
}