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


const ADD_EMPLOYEE = [
    {
        type: "input",
        message: "Enter the first name of the new employee:",
        name: "newEmployeeFirstName"
    },
    {
        type: "input",
        message: "Enter their last name:",
        name: "newEmployeeLastName"
    },
    {
        type: "input",
        message: "Enter their role ID: (can be blank)",
        name: "newEmployeeRole",
        default: null
    },
    {
        type: "input",
        message: "Enter the ID of their manager: (can be blank)",
        name: "newEmployeeManager",
        default: null
    },
]


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