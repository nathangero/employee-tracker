# Employee Tracker

## Description

The purpose of this repo is to create a local database to track the records of a business called Farleymart. It uses `node.js` and node packages to communicate to a local MySQL database. The node packages necessary for this are `inquirer` and `mysql2`. Right now the current features the user can do are:
* View departments, roles, and employees
* Add a department, role, or employee
* Update an employee's role.

[inquirer](https://www.npmjs.com/package/inquirer) is what prompts the user to make selections via a menu system. 

[mysql2](https://www.npmjs.com/package/mysql2) is an interface to talk to the database to make queries on the db's data.

This project was created to learn how to use `node.js` and `MySQL` together. In later projects I'll be making a webpage interface to use all these togther, and deploying the database to a backend server. I had a lot of fun making this project and it gave me some insight on how CLI systems were potentially created. I could see myself creating different webpages that talk to a database, whether it's a personal project or for an actual company.

## Installation

There are three parts for this installation, downloading MySQL, cloning/downloading the code, and setting up the database, its tables, and some seed data.

### Install MySQL

1. Go to the [MySQL download page](https://dev.mysql.com/downloads/mysql/) and download the latest version for your respective system.
2. Follow the steps in this on this [page](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide)
3. (Optional) Install [MySQL Workbench](https://www.mysql.com/products/workbench/)
4. Move on to cloning/downloading the code

### Clone/download the code

1. Clone/download the code from this repo.
2. Go to the directory where you downloaded the code and install the packages using the terminal command:
```js
npm i
```
3. Find and open the file `Database.js` in the code directory.
4. Go to line 17 where it says `password: PASSWORD,`. Replace the text `PASSWORD` with the password you used during the MySQL installation. This is so the code can access the database.

### Setup the database

1. In the code directory, navigate to the `db` directory. 
2. Copy all the contents from the `schema.sql` file and paste it into the MySQL Workbench or in the MySQL shell in your terminal/command prompt. This is the structure for the database.
3. (Optional) Copy all the contents from the `seed.sql` file and paste it under the pasted `schema.sql` code.
4. Click the lightning bolt ⚡ to run the SQL statements to setup the database.

## Usage

1. Go to the directory where the code was cloned/downloaded to.
2. Open the terminal/command prompt in the directory and type in: 
```js
node server.js
```
3. Follow the prompts given in the program.
4. You can View/Add departments, roles, employees
5. To exit, select "Quit" and the program will end.

## Video Walkthrough

https://github.com/nathangero/employee-tracker/assets/25491849/fcfe5359-6111-4bbe-9de9-1243e19df92b


## Learning Points

* Using async/await with `mysql2` promises is like using `fetch()`, when you receive the response from the database query, you must return/resolve that response before being able to parse it. An example is below in [Code Snippets](#code-snippets)
* JavaScript Objects are like a "mini-relational database". It has a (key, value) pair kind of like how this app's database has a relationsihp between "role" and "department".
* `console.table()` is a very easy way to show formated data. Very handy when using SQL!
* Using the spread operator to make a function robust to select certain columns from a table is incredibly useful. An example is below in [Code Snippets](#code-snippets)
* Using preppared statements not only helps sanitize user input, but it helps keep the code nicely organized.

## Code Snippets

Example of receiving a query from the database, and needing to return it to resolve the promise.
```js
// Database.js
async getAllDepartments() {
    try {
        return (await this.connection).execute(`SELECT * FROM ${DEPARTMENT}`);
    } catch (error) {
        console.error(error)
        return;
    }
}

// server.js
case questions_values.VIEW_DEPARTMENTS:
    [data] = await database.getAllDepartments();
    data ? console.log("departments:\n", data) : console.log("Couldn't read from department table");

    askUser(); // Keep asking questions until user quits
    break;
```

Using spread operator to select columns to use only 1 function
```js
// Database.js
async getRoleColumns(...[columns]) {
    try {
        // return the data to where this function is called to see the db data
        return (await this.connection).execute(`SELECT ${columns.join(",")} FROM ${ROLE}`);
    } catch (error) {
        console.error(error)
        return;
    }
}

// server.js
[data] = await database.getRoleColumns(["id", "title", "ROUND(salary, 2) as salary", "department_id"]);

```

## Credits

[Returning data from async/await mysql2 promise](https://www.reddit.com/r/node/comments/l50xvc/help_with_mysql2_promises_and_asyncawait/gkrxy9t/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

### Resources

[MySQL2 node package docs](https://www.npmjs.com/package/mysql2)

[Round float/decimal in SELECT](https://www.w3schools.com/sql/func_mysql_round.asp)

[UPDATE statement](https://www.w3schools.com/sql/sql_update.asp)
