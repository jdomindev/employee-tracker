const inquirer = require('inquirer');

const questions = [
    { type: 'list', message: 'What would you like to do?', name: 'intialOption', choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']}
  ];

inquirer
    .prompt(questions)
    .then((answers) =>
    {
      switch (answers.intialOption) {
        case "View All Employees":
          viewAllEmployees()
          break;
        case "Intern":
          internPrompt()
          break;
        case "I don't want any more team members":
          writeToFile("index1.html", generateHTML(answers));
          break;
      }
    });


function viewAllEmployees() {
    
}