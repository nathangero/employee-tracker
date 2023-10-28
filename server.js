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
        console.table(data);
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
        [data] = await database.getRoleColumns(["id", "title", "ROUND(salary, 2) as salary", "department_id"]);
        
        const departments = await database.mapDepartmentIdToName();
        const dataWithDepartment = data.map((element) => {
            if (departments[element.department_id]) {
                element.department_id = departments[element.department_id];
            } 

            return element;
        })

        console.table(dataWithDepartment);
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
        [data] = await database.getEmployeeColumns(["*"]);

        let roleObj = await database.mapRoleIdToTitle();
        const dataWithDepartment = data.map((element) => {
            if (roleObj[element.role_id]) {
                element.role_id = roleObj[element.role_id];
            } 

            return element;
        })

        console.log(`Added ${newEmployeeFirstName} to table`); // Notify the user
        console.table(dataWithDepartment);
    } else {
        console.log("Couldn't add new employee. Please contact developer.");
    }

    askUser(); // Keep asking questions until user quits
}


async function updateEmployee() {
    let [employees] = await database.getEmployeeColumns(["id", "first_name", "last_name"]); // Get 
    let [roles] = await database.getRoleColumns(["id", "title", "department_id"]);

    // Get all departments to show the name
    let departmentObj = await database.mapDepartmentIdToName();

    // Map all the role ids to their title to show what to update the employee to
    let roleObj = await database.mapRoleIdToTitle();

    // Create a list of employees to choose from with the format: "${first_name} ${last_name}, id: ${id}"
    let employeeList = [];
    for (let i = 0; i < employees.length; i++) {
        const id = employees[i].id;
        const firstName = employees[i].first_name;
        const lastName = employees[i].last_name;

        employeeList.push(`${firstName} ${lastName}, id:${id}`)
    }
    
    // Create a list of roles to choose from with the format: "${title} ${department}, id: ${id}"
    let rolesList = [];
    for (let i = 0; i < roles.length; i++) {
        const id = roles[i].id;
        const title = roles[i].title;
        const department = departmentObj[roles[i].department_id];

        rolesList.push(`${title} (${department}), id:${id}`)
    }

    // Ask the user to choose which employee to update and chose which role to update to.
    let { employee, role } = await inquirer.prompt(questions.UPDATE_EMPLOYEE(employeeList, rolesList));

    // Extract the id from the string
    let roleId = role.split("id:")[1];
    let employeeId = employee.split("id:")[1];

    let success = await database.updateEmployee(roleId, employeeId);
    if (success) {
        // Show updated employee table if successful;
        [data] = await database.getEmployeeColumns(["*"]);
        const dataWithDepartment = data.map((element) => {
            if (roleObj[element.role_id]) {
                element.role_id = roleObj[element.role_id];
            } 

            return element;
        })

        console.log(`Updated ${employee.split(", ")[0]}'s role to ${roleObj[roleId]}`); // Notify the user
        console.table(dataWithDepartment);
    } else {
        console.log("Couldn't update employee. Please contact developer.");
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
            data ? console.table(data) : console.log("Couldn't read from department table");

            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_ROLES:
            [data] = await database.getRoleColumns(["id", "title", "ROUND(salary, 2) as salary", "department_id"]);

            const departments = await database.mapDepartmentIdToName();
            const dataWithDepartment = data.map((element) => {
                if (departments[element.department_id]) {
                    element.department_id = departments[element.department_id];
                } 

                return element;
            })

            data ? console.table(dataWithDepartment) : console.log("Couldn't read from role table");

            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_EMPLOYEES:
            [data] = await database.getEmployeeColumns(["*"]);
            const rolesObj = await database.mapRoleIdToTitle();
            const dataWithRoles = data.map((element) => {
                if (rolesObj[element.role_id]) {
                    element.role_id = rolesObj[element.role_id];
                } 

                return element;
            })

            data ? console.table(dataWithRoles) : console.log("Couldn't read from employee table");

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

        case questions_values.UPDATE_EMPLOYEE:
            updateEmployee();
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


module.exports = { database };