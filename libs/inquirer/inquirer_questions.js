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
        name: "department"
    }
]

// TODO: Change to function to let user choose which department this role belongs to
const ADD_ROLE = [
    {
        type: "input",
        message: "Enter the title of the new role:",
        name: "roleTitle"
    },
    {
        type: "input",
        message: "Enter the salary of the new role:",
        name: "roleSalary"
    },
    {
        type: "input",
        message: "Enter the department ID of the new role:",
        name: "roleDepartment"
    },
]


function ADD_EMPLOYEE(roleList, managerList) {
    return [
    {
        type: "input",
        message: "Enter the first name of the new employee:",
        name: "employeeFirstName"
    },
    {
        type: "input",
        message: "Enter their last name:",
        name: "employeeLastName"
    },
    {
        type: "list",
        message: "Select their role: ",
        name: "employeeRole",
        choices: roleList,
    },
    {
        type: "list",
        message: "Enter the ID of their manager: (can be blank)",
        name: "employeeManager",
        choices: managerList,
    },
]}


function UPDATE_EMPLOYEE(employeeList, roleList) {
    return [
        {
            type: "list",
            message:"Which employee do you want to update?",
            name: "employee",
            choices: employeeList,
        },
        {
            type: "list",
            message:"Which role do you want to give them?",
            name: "role",
            choices: roleList
        }
    ]
}

module.exports = { MAIN_MENU, ADD_DEPARTMENT, ADD_ROLE, ADD_EMPLOYEE, UPDATE_EMPLOYEE };