INSERT INTO department (name)
VALUES 	("Electronics"),
		("Kids clothing"),
        ("Floor"),
        ("Cameras");
       
INSERT INTO role (title, salary, department_id)
VALUES 	("Manager", 20.00, 1),
		("Sales Clerk", 15.00, 1),
        ("Manager", 18.00, 2),
        ("Manager", 18.00, 3),
        ("Specialist", 17.00, 2),
        ("Specialist", 17.00, 3);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Nathan", "Geronimo", 2, 2),
		("Emily", "Vincent", 1, NULL),
        ("Abbie", "Harlow", 3, NULL),
        ("Robert", "Downy", 2, 3),
        ("Chris", "Evans", NULL, 3);
        
