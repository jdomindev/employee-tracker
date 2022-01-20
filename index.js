const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root2',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

let departmentArray
let rolesArray
let employeeArray

const questions = [
    { type: 'list', message: 'What would you like to do?', name: 'choice', choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'View Department Budgets', 'Quit']}
  ];

const departmentQuestions = [{ type: 'input', message: 'What is the name of the department?', name: 'department'}];



// const updateEmpRoleQuestions = [{ type: 'list', message: "Which employee's role would you like to update?", name: 'employee_id', choices: employeeArray}, { type: 'input', message: 'Which role do you want to assign the selected employee?', name: 'role_id'}];


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
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'View Department Budgets':
          viewBudget();
          break;
        case 'Quit':
          break;
      }
    });
}

// works
function viewAllEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY id', function (err, results) {
    console.log(err);
    console.table(results);
  });
  askQuestions();
}

const addEmployee = () => {
  db.query('SELECT title, id FROM role', 
  function (err, results) {
      console.log(results);
      rolesArray = results.map(result => result.title);
      db.query('SELECT manager_id FROM employee', function (err, results) {
      managerArray = results.map(result => result.manager_id);
        const addEmployeeQuestions = [{ type: 'input', message: "What is the employee's first name?", name: 'first_name'}, { type: 'input', message: "What is the employee's last name?", name: 'last_name'}, { type: 'list', message: "What is the employee's role?", name: 'role', choices: rolesArray}, { type: 'input', message: "Who is the employee's manager?(give their employee id)", name: 'manager'}]
      inquirer
      .prompt(addEmployeeQuestions)
      .then((answers) =>
      {
        db.query('SELECT * FROM role WHERE title = ?', answers.role, function (err, results) {
            console.log(err);
            console.log(results)
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.first_name, answers.last_name, results[0].id, answers.manager], function (err, results) {
          console.log(err);
          console.log(`Added ${answers.first_name} to the database`)
          askQuestions();
          });
        });
      });
    })
  });
}

const updateEmployeeRole = () => {
  db.query('SELECT first_name, id FROM employee', 
  function (err, results) {
      console.log(results);
      employeeArray = results.map(result => result.first_name);
    db.query('SELECT title, id FROM role', 
    function (err, results) {
      console.log(results);
      rolesArray = results.map(result => result.title);
        const updateEmpRoleQuestions = [{ type: 'list', message: "Which employee's role would you like to update?", name: 'employee_id', choices: employeeArray}, { type: 'list', message: 'Which role do you want to assign the selected employee?', name: 'role_title', choices: rolesArray}];
      inquirer
      .prompt(updateEmpRoleQuestions)
      .then((answers) =>
      {         
        console.log(answers);
        db.query('SELECT * FROM role WHERE title = ?', answers.role_title, function (err, results) {
        console.log(err);
        console.log(results)
          db.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [results[0].id, answers.first_name], function (err, results) {
            console.log(err);
            console.log("Updated Employee Role")
            askQuestions();
          });
        }); 
      });
    });
  })
}

// works
function viewAllRoles() {
  db.query('SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id ORDER BY id', function (err, results) {
    console.log(err);
    console.table(results);
  });
  askQuestions()
}

// forloop 
// works
const addRole = () => {
  db.query('SELECT department_name, id FROM department', 
  function (err, results) {
      console.log(results);
      departmentArray = results.map(result => result.department_name);
      const roleQuestions = [{ type: 'input', message: 'What is the name of the role?', name: 'role'}, { type: 'input', message: 'What is the salary of the role?', name: 'salary'}, { type: 'list', message: 'What department does this role belong to?', name: 'department_name', choices: departmentArray }];
      inquirer
      .prompt(roleQuestions)
      .then((answers) =>
      {
        db.query('SELECT * FROM department WHERE department_name = ?', answers.department_name, function (err, results) {
          console.log(err);
          console.log(results)
          db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.role, answers.salary, results[0].id], function (err, results) {
            console.log(err);
            console.table(results);
            askQuestions();
          });
        });
      });
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
const addDepartment = () => {
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

// Bonus
const viewBudget = () => {
  db.query('SELECT department.department_name, SUM(role.salary) AS department_budget FROM role JOIN department ON role.department_id = department.id GROUP BY department_name', function (err, results) {
    console.log(err);
    console.table(results)
    askQuestions()
  }
)}

askQuestions();
