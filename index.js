const mysql = require("mysql2");
const inquirer = require("inquirer");

// create the database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "warriors989",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to employee_db");
  mainQuestion();
});

function mainQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employees Role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      if (answer.mainQuestion === "View All Departments") {
        viewAllDepartments();
      } else if (answer.mainQuestion === "View All Roles") {
        viewAllRoles();
      } else if (answer.mainQuestion === "View All Employees") {
        viewAllEmployees();
      } else if (answer.mainQuestion === "Add Department") {
        addDepartment();
      } else if (answer.mainQuestion === "Add Role") {
        addRole();
      } else if (answer.mainQuestion === "Add Employee") {
        addEmployee();
      } else if (answer.mainQuestion === "Update Employees Role") {
        updateRole();
      } else {
        connection.end();
      }
    });
}

function viewAllDepartments() {
  // create the logic to view all departments
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    mainQuestion();
  });
}

function viewAllRoles() {
  // create logic to vbiew all roles
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    mainQuestion();
  });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    mainQuestion();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department you want to add? ",
      },
    ])
    .then((answer) => {
      const departmentName = answer.departmentName;
      connection.query(
        "INSERT INTO department (department_name) VALUES (?)",
        [departmentName],
        (err, data) => {
          if (err) throw err;
          console.log("Department added successfully!");
          mainQuestion();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter the title: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary: ",
      },
      {
        type: "input",
        name: "department_id",
        message: "Please enter the departmentId: ",
      },
    ])
    .then((answer) => {
      const roleTitle = answer.title;
      const roleSalary = answer.salary;
      const departmentId = answer.department_id;
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [roleTitle, roleSalary, departmentId],
        (err, data) => {
          if (err) throw err;
          console.log("Role added successfully!");
          mainQuestion();
        }
      );
    });
}

function addEmployee() {
  //first_name, last_name, role_id, manager_id
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the First Name: ",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the Last Name: ",
      },
      {
        type: "input",
        name: "role_id",
        message: "Please enter the role id: ",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Please enter the manager id: ",
        default: "",
      },
    ])
    .then((answer) => {
      const firstName = answer.first_name;
      const lastName = answer.last_name;
      const roleId = answer.role_id;
      const managerID = answer.manager_id !== "" ? answer.manager_id : null;
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) ",
        [firstName, lastName, roleId, managerID],
        (err, data) => {
          if (err) throw err;
          console.log("Successfully added an Employee");
          mainQuestion();
        }
      );
    });
}

function updateRole() {
  // Retrieve list of employees
  connection.query(
    'SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee',
    (err, data) => {
      if (err) throw err;

      const employees = data.reduce((acc, row) => {
        acc[row.id] = row.employee_name;
        return acc;
      }, {});

      // Retrieve list of roles
      connection.query("SELECT id, title FROM role", (err, data) => {
        if (err) throw err;

        const roles = data.reduce((acc, row) => {
          acc[row.id] = row.title;
          return acc;
        }, {});

        // Prompt to select an employee and new role
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Please choose an employee to update: ",
              choices: Object.values(employees),
            },
            {
              type: "list",
              name: "newRole",
              message: "Please choose a new role: ",
              choices: Object.values(roles),
            },
          ])
          .then((answers) => {
            const selectedEmployee = Object.keys(employees).find(
              (key) => employees[key] === answers.employee
            );
            const selectedRole = Object.keys(roles).find(
              (key) => roles[key] === answers.newRole
            );

            // Update the selected employee's role
            connection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [selectedRole, selectedEmployee],
              (err, data) => {
                if (err) throw err;
                console.log("Employee role updated successfully!");
                mainQuestion();
              }
            );
          });
      });
    }
  );
}
