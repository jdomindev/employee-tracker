INSERT INTO department (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Accounting'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 4), ('Salesperson', 80000, 4), 
('Lead Engineer', 125000, 1), ('Software Engineer', 175000, 1),
('Accountant', 150000, 2), ('Accountant Manager', 200000, 2),
('Legal Team Lead', 250000, 3), ('Lawyer', 180000, 3);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Mike', 'Chan', 2, 1), ('Ashley', 'Rodriguez', 3, NULL), ('Kevin', 'Tupik', 4, 2), ('Kunal', 'Singh', 5, NULL), ('Malia', 'Brown', 6, 3), ('Sarah', 'Lourd', 7, NULL), ('Tom', 'Allen', 8, 4);
