# Employee Tracker

## Description


## Installation


## Usage


## Video Walkthrough

https://github.com/nathangero/employee-tracker/assets/25491849/fcfe5359-6111-4bbe-9de9-1243e19df92b


## Learning Points

* Using async/await with `mysql2` promises is like using `fetch()`, when you receive the response from the database query, you must return/resolve that response before being able to parse it. An example is below in [Code Snippets](#code-snippets)
* JavaScript Objects are like a "mini-relational database". It has a (key, value) pair kind of like how this app's database has a relationsihp between "role" and "department".
* `console.table()` is a very easy way to show formated data. Very handy when using SQL!
* Using the spread operator to make a function robust to select certain columns from a table is incredibly useful. An example is below in [Code Snippets](#code-snippets)

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
