USE employee_db;

INSERT INTO department (department_name) VALUES ('Sales'), ('Engineering'), ('Finance');

INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 100000, 1), ('Frontend Engineer', 100000, 2), ('Accountant', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Peter', 'Parker', 1, NULL), ('Miles', 'Moralas', 2, 1), ('Gwen', 'Stacey', 3, 1);