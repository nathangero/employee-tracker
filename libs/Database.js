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

    async getAllDepartments() {
        try {
            // return the data to where this function is called to see the db data
            return (await this.connection).execute(`SELECT * FROM ${DEPARTMENT}`);
        } catch (error) {
            console.error(error)
        }
    }
}


module.exports = Database;
