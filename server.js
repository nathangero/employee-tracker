const inquirer = require("inquirer");
const questions = require("./libs/inquirer/inquirer_questions");
const questions_values = require("./libs/inquirer/questions_values");
const Database = require("./libs/Database.js");
const database = new Database(); // Connect to database 

async function addDepartment() {
    let { newDepartment } = await inquirer.prompt(questions.ADD_DEPARTMENT);
    let success = await database.addNewDepartment(newDepartment);
    if (success) {
        // Show updated department table if successful;
        [data] = await database.getAllDepartments();
        console.log("updated departments:\n", data);
    } else {
        console.log("Couldn't add new department. Please contact developer.");
    }

    askUser(); // Keep asking questions until user quits
}

async function addRole() {
    let { newRoleTitle, newRoleSalary, newRoleDepartment } = await inquirer.prompt(questions.ADD_ROLE);
    let success = await database.addNewRole(newRoleTitle, newRoleSalary, newRoleDepartment);
    if (success) {
        // Show updated role table if successful;
        [data] = await database.getAllRoles();
        console.log("updated roles:\n", data);
    } else {
        console.log("Couldn't add new role. Please contact developer.");
    }

    askUser(); // Keep asking questions until user quits
}


async function addEmployee() {
    let { newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager } = await inquirer.prompt(questions.ADD_EMPLOYEE);
    let success = await database.addNewEmployee(newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager);
    if (success) {
        // Show updated employee table if successful;
        [data] = await database.getAllEmployees();
        console.log(`Added ${newEmployeeFirstName} to table`); // Notify the user
        console.log("updated employees:\n", data);
    } else {
        console.log("Couldn't add new employee. Please contact developer.");
    }

    askUser(); // Keep asking questions until user quits
}


async function askUser() {
    console.log(); // new line
    let { userChoice } = await inquirer.prompt(questions.MAIN_MENU);
    let data;

    switch (userChoice) {
        case questions_values.VIEW_DEPARTMENTS:
            [data] = await database.getAllDepartments();
            data ? console.log("departments:\n", data) : console.log("Couldn't read from department table");

            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_ROLES:
            [data] = await database.getAllRoles();
            data ? console.log("roles:\n", data) : console.log("Couldn't read from role table");

            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_EMPLOYEES:
            [data] = await database.getAllEmployees();
            data ? console.log("employees:\n", data) : console.log("Couldn't read from employee table");

            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.ADD_DEPARTMENT:
            addDepartment();
            break;

        case questions_values.ADD_ROLE:
            addRole();
            break;

        case questions_values.ADD_EMPLOYEE:
            addEmployee();
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