const questions_values = require("./questions_values");

const MAIN_MENU = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "userChoice",
        choices: [
            {
                name: "View all departments",
                value: questions_values.VIEW_DEPARTMENTS,
            },
            {
                name: "View all roles",
                value: questions_values.VIEW_ROLES,
            },
            {
                name: "View all employees",
                value: questions_values.VIEW_EMPLOYEES,
            },
            {
                name: "Add new department",
                value: questions_values.ADD_DEPARTMENT,
            },
            {
                name: "Add new role",
                value: questions_values.ADD_ROLE,
            },
            {
                name: "Add new employee",
                value: questions_values.ADD_EMPLOYEE,
            },
            {
                name: "Update employee",
                value: questions_values.UPDATE_EMPLOYEE,
            },
            {
                name: "Quit",
                value: questions_values.QUIT
            }
        ]
    }
]


const ADD_DEPARTMENT = [
    {
        type: "input",
        message: "Enter the name of the new department:",
        name: "newDepartment"
    }
]


const ADD_ROLE = [
    {
        type: "input",
        message: "Enter the title of the new role:",
        name: "newRoleTitle"
    },
    {
        type: "input",
        message: "Enter the salary of the new role:",
        name: "newRoleSalary"
    },
    {
        type: "input",
        message: "Enter the department ID of the new role:",
        name: "newRoleDepartment"
    },
]

module.exports = { MAIN_MENU, ADD_DEPARTMENT, ADD_ROLE };