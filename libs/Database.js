const mysql = require("mysql2/promise");

const PASSWORD = require("../assets/scripts/sql_cred");
const DATABASE_NAME = 'farleymart_db';

// const strings 
const DEPARTMENT = "department";
const ROLE = "role";
const EMPLOYEE = "employee";


class Database {
    constructor() {
        this.connection = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: PASSWORD,
                database: DATABASE_NAME
            },
            console.log(`Connected to the ${DATABASE_NAME} database.`)
        );
    }

    /**
     * Close the database connection
     */
    async closeDb() {
        (await this.connection).end();
    }

    /**
     * Queries the db to get everything inside the department table
     * @returns Promise containing the database's result
     */
    async getAllDepartments() {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT id AS ID, name AS Name FROM ${DEPARTMENT}`);
        } catch (error) {
            console.error(error)
            return;
        }
    }

    /**
     * Gets the department id and name to make into an object. 
     * This will be used to show the role's name instead of just its id.
     * @returns Object where the key is the department's id and the value is the department name
     */
    async mapDepartmentIdToName() {
        try {
            let [departments] = await this.getAllDepartments();
            let departmentObj = {};
            for (let i = 0; i < departments.length; i++) {
                departmentObj[departments[i].ID] = departments[i].Name
            }

            return departmentObj;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Queries the db to get specified columns inside the role table.
     * @returns Promise containing the database's result
     */
    async getRoleColumns(...[columns]) {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT ${columns.join(",")} FROM ${ROLE}`);
        } catch (error) {
            console.error(error)
            return;
        }
    }

    /**
     * Gets the role id and title to make into an object. 
     * This will be used to show the role's title instead of just its id.
     * @returns Object where the key is the role_id and the value is the role title
     */
    async mapRoleIdToTitle() {
        try {
            let [roles] = await this.getRoleColumns(["id", "title"]);
            let rolesObj = {};
            for (let i = 0; i < roles.length; i++) {
                rolesObj[roles[i].id] = roles[i].title
            }

            return rolesObj;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Queries the db to get specified columns inside the employee table.
     * @returns Promise containing the database's result
     */
    async getEmployeeColumns(...[columns]) {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT ${columns.join(",")} FROM ${EMPLOYEE}`);
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Gets the role id and title to make into an object. 
     * This will be used to show the role's title instead of just its id.
     * @returns Object where the key is the role_id and the value is the role title
     */
    async mapEmployeeIdToName() {
        try {
            let [employees] = await this.getEmployeeColumns(["id", "first_name", "last_name"]);
            let remployeesObj = {};
            for (let i = 0; i < employees.length; i++) {
                remployeesObj[employees[i].id] = `${employees[i].first_name} ${employees[i].last_name}`
            }

            return remployeesObj;
        } catch (error) {
            console.error(error);
            return;
        }
    }


    async getEmployeeWithRole() {
        try {
            // Join the whole employee table with the role depratment_id where the role_ids match
            const statement = `
            SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, ROUND(role.salary, 2) AS Salary, employee.role_id AS Role, role.department_id AS Department, employee.manager_id AS Manager
            FROM employee
            JOIN role ON employee.role_id=role.id`

            return (await this.connection).execute(statement);
        } catch (error) {
            console.error(error);
            return;
        }
    }


    /**
     * Add a new department to the department table
     * @param {String} name 
     * @returns Promise containing the database's result
     */
    async addNewDepartment(name) {
        try {
            const data = (await this.connection).execute(
                this.buildInsertStatement(DEPARTMENT), 
                [name]
            );
            console.log(`Added ${name} to "${DEPARTMENT}" table`); // Notify the user
            return data;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Add a new role to the role table
     * @param {String} title 
     * @param {Float} salary 
     * @param {Int} department_id 
     * @returns Promise containing the database's result
     */
    async addNewRole(title, salary, department_id) {
        try {
            const data = (await this.connection).execute(
                this.buildInsertStatement(ROLE), 
                [title, salary, department_id]
            );
            console.log(`Added ${title} to "${ROLE}" table`); // Notify the user
            return data;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Add a new employee to the employee table
     * @param {String} first_name 
     * @param {String} last_name 
     * @param {Int} role_id 
     * @param {Int} manager_id 
     * @returns Promise containing the database's result
     */
    async addNewEmployee(first_name, last_name, role_id, manager_id) {
        try {
            // Allow for null values to exist
            const data = (await this.connection).execute(
                this.buildInsertStatement(EMPLOYEE), 
                [first_name, last_name, role_id ? role_id : null, manager_id ? manager_id : null]
            );
            return data;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Update an employee's role
     * @param {Int} role_id 
     * @param {Int} employee_id 
     * @returns Promise containing the database's result
     */
    async updateEmployee(role_id, employee_id) {
        try {
            const data = (await this.connection).execute(
                this.buildUpdateStatement(EMPLOYEE), 
                [role_id, employee_id]
            );
            return data;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
     * Creates the specific INSERT statement for the given table
     * @param {String} table 
     * @returns String containing the prepared INSERT statement
     */
    buildInsertStatement(table) {
        switch (table) {
            case DEPARTMENT:
                return `
                INSERT INTO ${table} (name)
                VALUES (?);
                `
            case ROLE:
                return `
                INSERT INTO ${table} (title, salary, department_id)
                VALUES (?,?,?);
                `

            case EMPLOYEE:
                return `
                INSERT INTO ${table} (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?);
                `

            default:
                console.log("Error adding to", table, "please contact develoepr");
                return;
        }
    }

    /**
     * Creates the specific UPDATE statement for the given table
     * @param {String} table 
     * @returns String containing the prepared UPDATE statement
     */
    buildUpdateStatement(table) {
        switch (table) {
            case DEPARTMENT:
                return `

                `
            case ROLE:
                return `

                `

            case EMPLOYEE:
                return `
                UPDATE ${table}
                SET role_id=?
                WHERE employee.id=?
                `

            default:
                console.log("Error updating", table, "please contact develoepr");
                return;
        }
    }
}


module.exports = Database;
