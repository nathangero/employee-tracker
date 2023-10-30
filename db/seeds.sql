INSERT INTO department (name)
VALUES 	("Electronics"),
		("Kids clothing"),
        ("Snacks"),
        ("Cameras");
       
INSERT INTO role (title, salary, department_id)
VALUES 	("Manager", 80000, 1),
		("Sales Clerk", 50000, 1),
        ("Manager", 80000, 2),
        ("Manager", 80000, 3),
        ("Specialist", 69000, 2),
        ("Floor Associate", 40000, 3);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Nathan", "Geronimo", 2, 1),
		("Bruce", "Banner", 1, NULL),
        ("Chris", "Evans", NULL, 2),
        ("Robert", "Downy", NULL, NULL);
        
