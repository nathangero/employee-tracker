const inquirer = require("inquirer");
const questions = require("./libs/inquirer/inquirer_questions");
const questions_values = require("./libs/inquirer/questions_values");
const Database = require("./libs/Database.js");
const database = new Database(); // Connect to database 

async function addDepartment() {
    let { newDepartment } = await inquirer.prompt(questions.ADD_DEPARTMENT);
    await database.addNewDepartment(newDepartment);
    [data] = await database.getAllDepartments();
    console.log("departments:\n", data);
    askUser(); // Keep asking questions until user quits
}

async function askUser() {
    console.log(); // new line
    let { userChoice } = await inquirer.prompt(questions.MAIN_MENU);
    let data;

    switch (userChoice) {
        case questions_values.VIEW_DEPARTMENTS:
            [data] = await database.getAllDepartments();
            console.log("departments\n:", data);
            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_ROLES:
            [data] = await database.getAllRoles();
            console.log("roles\n:", data);
            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_EMPLOYEES:
            [data] = await database.getAllEmployees();
            console.log("employees\n:", data);
            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.ADD_DEPARTMENTS:
            addDepartment();
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

askUser();