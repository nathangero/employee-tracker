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

    async closeDb() {
        (await this.connection).end();
    }

    async getAllDepartments() {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT * FROM ${DEPARTMENT}`);
        } catch (error) {
            console.error(error)
            return;
        }
    }

    async mapDepartmentIdToName() {
        try {
            let [departments] = await this.getAllDepartments();
            let departmentObj = {};
            for (let i = 0; i < departments.length; i++) {
                departmentObj[departments[i].id] = departments[i].name
            }

            return departmentObj;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async getRoleColumns(...[columns]) {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT ${columns.join(",")} FROM ${ROLE}`);
        } catch (error) {
            console.error(error)
            return;
        }
    }


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

    async getAllEmployees() {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT * FROM ${EMPLOYEE}`);
        } catch (error) {
            console.error(error)
            return;
        }
    }


    async getEmployeeColumns(...[columns]) {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT ${columns.join(",")} FROM ${EMPLOYEE}`);
        } catch (error) {
            console.error(error)
            return;
        }
    }

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
