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

    async getAllRoles() {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT * FROM ${ROLE}`);
        } catch (error) {
            console.error(error)
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

                break;

            default:
                console.log("Error adding to", table, "please contact develoepr");
                return;
        }
    }
}


module.exports = Database;
