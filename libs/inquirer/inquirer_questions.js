const questions_values = require("./questions_values");

const QUESTIONS = [
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
                value: questions_values.ADD_DEPARTMENTS,
            },
            {
                name: "Add new role",
                value: questions_values.ADD_ROLES,
            },
            {
                name: "Add new employee",
                value: questions_values.ADD_EMPLOYEES,
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

module.exports = QUESTIONS;