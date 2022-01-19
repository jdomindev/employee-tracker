const inquirer = require('inquirer');
const mysql = require('mysql2');
// const index = require('./index');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root2',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const questions = [
    { type: 'list', message: 'What would you like to do?', name: 'choice', choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']}
  ];

const departmentQuestions = [{ type: 'input', message: 'What is the name of the department?', name: 'department'}];

const roleQuestions = [{ type: 'input', message: 'What is the name of the role?', name: 'role'}, { type: 'input', message: 'What is the salary of the role?', name: 'salary'}, { type: 'list', message: 'What department does this role belong to?', name: 'department_id', choices: ['Sales', 'Engineering', 'Accounting', 'Legal']} ];

const updateEmpRoleQuestions = [{ type: 'input', message: "Which employee's role would you like to update?", name: 'employee_id'}, { type: 'input', message: 'Which role do you want to assign the selected employee?', name: 'role_id'}];

  const askQuestions = () => {
  inquirer
    .prompt(questions)
    .then((answers) =>
    {
      switch (answers.choice) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          askEmployeeQuestions();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          askRoleQuestions();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          askDepartmentQuestions();
          break;
        case 'Quit':
          break;
      }
    });
}

// works
function viewAllEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id', function (err, results) {
    console.log(err);
    console.table(results);
  });
  askQuestions();
}

const askEmployeeQuestions = () => {
  inquirer
    .prompt(roleQuestions)
    .then((answers) =>
    {db.query(`INSERT INTO employee first_name, last_name, role_id, manager_id) VALUES ('')`, function (err, results) {
      console.log(err);
      console.log(`Added ${answers.first_name} to the database`)

    });
    askQuestions();
    });
}

const updateEmployeeRole = () => {
  inquirer
    .prompt(updateEmpRoleQuestions)
    .then((answers) =>
    {db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, `[${answers.role_id, answers.employee_id}]`, function (err, results) {
      console.log(err);
      console.log(`Added ${answers.first_name} to the database`)

    });
    askQuestions();
    });
}

// works
function viewAllRoles() {
  db.query('SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    console.log(err);
    console.table(results);
  });
  askQuestions()
}

const askRoleQuestions = () => {
  inquirer
    .prompt(roleQuestions)
    .then((answers) =>
    {db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', `[${answers.role}, ${answers.salary}, ${answers.department_id}]`, function (err, results) {
      console.log(err);
      console.log(`Added ${answers.role} to the database`)
    });
    askQuestions();
    });
}

// works
function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.log(err);
    console.table(results);
  });
  askQuestions()
}

// works
const askDepartmentQuestions = () => {
  inquirer
    .prompt(departmentQuestions)
    .then((answers) =>
    {db.query('INSERT INTO department (department_name) VALUES (?)', `${answers.department}`, function (err, results) {
      console.log(err);
      console.log(`Added ${answers.department} to the database`)
    });
    askQuestions();
    });
}

askQuestions();
