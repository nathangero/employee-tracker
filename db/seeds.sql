INSERT INTO department (name)
VALUES 	("Electronics"),
		("Computers"),
        ("Books"),
        ("Customer Service");
       
INSERT INTO role (title, salary, department_id)
VALUES 	("Manager", 20.00, 1),
		("Sales Clerk", 15.00, 1);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Nathan", "Geronimo", 2, 2),
		("Emily", "Vincent", 1, NULL);