INSERT INTO department (name)
VALUES 	("Electronics"),
		("Kids clothing"),
        ("Snacks"),
        ("Cameras");
       
INSERT INTO role (title, salary, department_id)
VALUES 	("Manager", 20.00, 1),
		("Sales Clerk", 15.00, 1),
        ("Manager", 18.00, 2),
        ("Manager", 18.00, 3),
        ("Specialist", 17.00, 2),
        ("Floor Associate", 12.00, 3);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Nathan", "Geronimo", 2, 1),
		("Emily", "Vincent", 1, NULL),
        ("Chris", "Evans", NULL, 2),
        ("Robert", "Downy", NULL, NULL);
        
