# Employee Management System

## Description

This command-line application allows you to manage employee data within a database. You can perform various actions such as viewing departments, roles, and employees, adding departments, roles, and employees, and updating an employee's role.

## Video Demo

A video demonstration of the application can be found [here](https://www.youtube.com/watch?v=eHruLGipWnI&ab_channel=MuzzammilNawab).

## Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install the required dependencies.

## Usage

1. Make sure your MySQL server is running.
2. Open the terminal and navigate to the project directory.
3. Run `node index.js` to start the application.
4. Choose one of the following options from the presented menu:
   - View All Departments
   - View All Roles
   - View All Employees
   - Add Department
   - Add Role
   - Add Employee
   - Update Employee Role
   - Quit
5. Follow the prompts to perform the desired action.
6. You can continue selecting options until you choose to quit the application.

## Features

- View all departments: Displays a table with department names and IDs.
- View all roles: Displays a table with job titles, role IDs, departments, and salaries.
- View all employees: Displays a table with employee data, including IDs, names, job titles, departments, salaries, and managers.
- Add department: Prompts you to enter the name of a new department and adds it to the database.
- Add role: Prompts you to enter the name, salary, and department of a new role and adds it to the database.
- Add employee: Prompts you to enter the first name, last name, role, and manager of a new employee and adds them to the database.
- Update employee role: Prompts you to select an employee and their new role, and updates the employee's role in the database.

## Technologies Used

- JavaScript
- Node.js
- MySQL
- Inquirer

## Credits

This application was developed by [Your Name]. For questions or inquiries, please contact [Your Email Address].

