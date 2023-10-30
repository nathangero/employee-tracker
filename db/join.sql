USE farleymart_db;

-- SELECT employee.*, role.department_id
-- FROM employee
-- JOIN role ON employee.role_id=role.id

-- SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, employee.role_id AS Role, role.department_id AS Department
-- FROM employee
-- JOIN role ON employee.role_id=role.id
-- WHERE role.title="Manager" OR role.title="manager"

SELECT role.id AS ID, role.title AS Title, ROUND(role.salary, 2) AS Salary, role.department_id AS Department
FROM role
JOIN department ON role.department_id=department.id
