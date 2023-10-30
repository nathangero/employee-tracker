const inquirer = require("inquirer");
const questions = require("./libs/inquirer/inquirer_questions");
const questions_values = require("./libs/inquirer/questions_values");
const Database = require("./libs/Database.js");
const database = new Database(); // Connect to database 

/**
 * Takes in the data and converts role_id, manager_id, and department_ids to their string equivalent
 * @param {Array} data 
 * @returns Array containing the updated values with text intead of ints
 */
async function getFullEmployeeData(data) {
    const departmentObj = await database.mapDepartmentIdToName();
    const rolesObj = await database.mapRoleIdToTitle();
    const employeesObj = await database.mapEmployeeIdToName();

    return data.map((element) => {
        if (departmentObj[element.Department]) {
            element.Department = departmentObj[element.Department];
        }

        if (rolesObj[element.Role]) {
            element.Role = rolesObj[element.Role];
        }

        if (employeesObj[element.Manager]) {
            element.Manager = employeesObj[element.Manager];
        }

        return element;
    })
}



async function addDepartment() {
    let { department } = await inquirer.prompt(questions.ADD_DEPARTMENT);
    let success = await database.addNewDepartment(department);
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
    let { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt(questions.ADD_ROLE);
    let success = await database.addNewRole(roleTitle, roleSalary, roleDepartment);
    if (success) {
        // Show updated role table if successful;
        [data] = await database.getRoleColumns(["id AS ID", "title AS Title", "ROUND(salary, 2) as Salary", "department_id AS Department"]);
        
        const departments = await database.mapDepartmentIdToName();
        const dataWithDepartment = data.map((element) => {
            if (departments[element.Department]) {
                element.Department = departments[element.Department];
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
    let { employeeFirstName, employeeLastName, employeeRole, employeeManager } = await inquirer.prompt(questions.ADD_EMPLOYEE);
    let success = await database.addNewEmployee(employeeFirstName, employeeLastName, employeeRole, employeeManager);
    if (success) {
        // Show updated employee table if successful;
        [data] = await database.getEmployeeWithRole();
        console.table(await getFullEmployeeData(data));
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
        [data] = await database.getEmployeeWithRole();
        console.table(await getFullEmployeeData(data));
    } else {
        console.log("Couldn't update employee. Please contact developer.");
    }

    askUser(); // Keep asking questions until user quits
}



async function askUser() {
    console.log(); // new line
    let { userChoice } = await inquirer.prompt(questions.MAIN_MENU);
    let data;
    let departmentObj;

    switch (userChoice) {
        case questions_values.VIEW_DEPARTMENTS:
            [data] = await database.getAllDepartments();
            data ? console.table(data) : console.log("Couldn't read from department table");

            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_ROLES:
            [data] = await database.getRoleColumns(["id AS ID", "title AS Title", "ROUND(salary, 2) as Salary", "department_id AS Department"]);

            departmentObj = await database.mapDepartmentIdToName();
            const dataWithDepartment = data.map((element) => {
                if (departmentObj[element.Department]) {
                    element.Department = departmentObj[element.Department];
                } 

                return element;
            })

            data ? console.table(dataWithDepartment) : console.log("Couldn't read from role table");

            askUser(); // Keep asking questions until user quits
            break;

        case questions_values.VIEW_EMPLOYEES:
            // TODO: Use join/union to get the role_ids, department_ids, and manager_ids all in one table
            [data] = await database.getEmployeeWithRole();
            data ? console.table(await getFullEmployeeData(data)) : console.log("Couldn't read from employee table");

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