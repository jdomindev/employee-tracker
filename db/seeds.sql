INSERT INTO department (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Accounting'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), ('Salesperson', 80000, 1), 
('Lead Engineer', 125000, 2), ('Software Engineer', 175000, 2),
('Accountant', 150000, 3), ('Accountant Manager', 200000, 3),
('Legal Team Lead', 250000, 4), ('Lawyer', 180000, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Mike', 'Chan', 2, 1), ('Ashley', 'Rodriguez', 3, NULL), ('Kevin', 'Tupik', 4, 3), ('Kunal', 'Singh', 5, NULL), ('Malia', 'Brown', 6, 5), ('Sarah', 'Lourd', 7, NULL), ('Tom', 'Allen', 8, 7);
