const inquirer = require('inquirer');
const mysql = require('mysql');
const { type } = require('os');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: '',
    database: 'seed_DB',
});
const start = () => {

    inquirer
        .prompt([

            {
                type: 'list',
                message: 'What would you like to do',
                name: 'options',
                choices: ['View all Employees', 'View all departments', 'View all roles', 'add departments', 'add roles', 'add employees', 'Update Employee Roles','Exit']
            }

        ])

        .then((response) => {

            if (response.options === 'add employees') {
                addEmployee();
            }
            else if (response.options === 'add roles') {
                addRoles();
            }
            else if (response.options === 'add departments') {
                AddDepartments();
            }
            else if(response.options === 'View all Employees'){
                ViewEmployees();
            }
            else if(response.options === 'View all roles'){
                ViewRoles();
            }
            else if(response.options === 'View all departments'){
                ViewDepartments();
            }
            else if(response.options === 'Update Employee Roles'){
                UpdateEmployeRoles();
            }
            else if(response.options === 'Exit'){
                connection.end()
            }
        })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter first name',
                name: "fname"
            },

            {
                type: 'input',
                message: 'Please enter last name',
                name: "lname"
            }
        ])
        .then((response) => {
            getRoles(response.fname, response.lname);
        })
}

function getRoles(firstName, lastName) {
    connection.query('SELECT * FROM role ', (err, results) => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What is the employees role',
                    name: 'role',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ title }) => {
                            choiceArray.push(title);
                        });
                        return choiceArray;
                    }
                },
            ])
            .then((response) => {
                let id;
                connection.query('SELECT id from role where title = ?', [response.role], (err, res) => {
                    id = res[0].id
                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: id
                        },
                        (err, res) => {
                            if (err) throw err;
                            start();
                        }
                    )
                })

                     
            })

    })
}
function addRoles() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter a new role you would like to add',
                name: "NewRole"
            },

            {
                type: 'input',
                message: 'Please enter the salary of this role',
                name: "salary"
            },
        ])

        .then((response) => {
            getDepartment(response.NewRole, response.salary);
        })
}

function getDepartment(NewRole, salary) {
    connection.query('SELECT * FROM department ', (err, results) => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Choose the employees department',
                    name: 'ChooseDepartment',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ name}) => {
                            choiceArray.push(name);
                        });
                        console.log(choiceArray);
                        return choiceArray;

                    }

                },

            ])

            .then((response) => {
                connection.query('SELECT id from department where name = ?', [response.ChooseDepartment], (err, res) => {
                    connection.query(
                        'INSERT INTO role SET ?',
                        {
                            title: NewRole,
                            salary: salary,
                            department_id: res[0].id
                        },

                        (err, res) => {
                            if (err) throw err;
                            start();
                        }
                    )
                })
            })

    })
}

function AddDepartments() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter a new department you would like to add',
                name: 'chooseDepartment'
            }
        ])
        .then((response) => {
            connection.query('INSERT INTO department SET ?',
                {
                    name: response.chooseDepartment
                },
                (err, res) => {
                    if (err) throw err;
                    start();
                }

            )
        })
}
function ViewEmployees(){
    connection.query('SELECT employee.id,employee.first_name,employee.last_name,role.title,department.name as Department,role.salary,employee.manager_id as manager from employee inner join role on employee.role_id = role.id INNER JOIN department on role.department_id = department.id ORDER BY employee.id',function(err,res){
        console.table(res)
        start()
    }) 
}
function ViewRoles(){
    connection.query('SELECT role.id,role.title,role.salary,department.name as Department from role inner join department on role.department_id = department.id',function(err,res){
        console.table(res)
        start()
    })    
}
function ViewDepartments(){
    connection.query('SELECT * FROM department',function(err,res){
        console.table(res);
        start()
    })  
}
function UpdateEmployeRoles(){
    connection.query('SELECT * FROM employee',(err, results) =>{
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Pick an employee',
                    name: 'employee',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({first_name,last_name,id}) => {
                            let object = {name:first_name + " " + last_name,value:id}
                            choiceArray.push(object);
                        });
                        return choiceArray;
                    }
                },

            ])
            .then((response)=>{
                connection.query('SELECT * FROM role ', (err, results) => {
                    inquirer
                        .prompt([ 
                            {
                                type: 'list',
                                message: 'What is the employees new role',
                                name: 'role',
                                choices() {
                                    const choiceArray = [];
                                    results.forEach(({title}) => {
                                        choiceArray.push(title);
                                    });
                                    return choiceArray;
                                }
        
                            },
        
                        ])    
                        .then((choices) => {
                            connection.query('SELECT id from role where title = ?', [choices.role], (err, res) => {
                               let initalid = res[0].id;
                               console.log("nitalid" + initalid);
                               console.log("repsonse.employee " + response.employee);
                                var sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
                                connection.query(sql,[initalid,response.employee],function(err, res){
                                        start();
                                    
                                })
                            })                                
                        })
                })
            })      
    })
}
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});
