USE farleymart_db;

SELECT employee.*, role.department_id
FROM employee
JOIN role ON employee.role_id=role.id