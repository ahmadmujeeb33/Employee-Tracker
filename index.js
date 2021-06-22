const inquirer = require('inquirer');
const mysql = require('mysql');

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
  



const start = () =>{

    inquirer
        .prompt([
            
            {
                type:'list',
                message:'What would you like to do',
                name:'options',
                choices: ['View all Employees','View all departments','View all roles','add departments','add roles','add employees','Update Employee Roles']
            }

        ])

        .then((response) =>{

            if(response.options === 'add employees'){
                addEmployee();
            }
            else if(response.options === 'add roles'){
                addRoles();
            }
                // case 'View all Employees':
                //     // something

                // case 'View all departments':
                //     // something 

                // case 'View all roles':
                //     // soemthign

                // case 'add departments':
                //     // soemthuih[onfd]
                // case 'add roles':
                //     //soemthign

                // case 'add employees':
                //     // soemthing
                //     console.log('in this');
                   

                // case 'Update Employee Roles':
                //     // something 
            

        })
}

function addEmployee(){
    inquirer
        .prompt([
            {
                type:'input',
                message: 'Please enter first name',
                name: "fname"
            },

            {
                type:'input',
                message: 'Please enter last name',
                name: "lname"
            }


        ])

        .then((response)=>{
            getRoles(response.fname,response.lname);            
        })
}

function getRoles(firstName,lastName){
    connection.query('SELECT * FROM role ',(err,results) =>{
        inquirer
            .prompt([

            {
                type:'list',
                message: 'What is the employees role',
                name: 'role',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ title }) => {
                      choiceArray.push(title);
                    });
                    console.log(choiceArray);
                    return choiceArray;
        
                }
        
            },

        ])
        
        .then((response) =>{
            console.log(response, 'test'); 
            let id;
            connection.query('SELECT id from role where title = ?',[response.role], (err,res) =>{
                id = res[0].id
                console.log("this");
            })

           setTimeout(function(){
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: firstName,
                        last_name:lastName,
                        role_id: id
            
                    },
            
                    (err, res) => {
                        if (err) throw err;
                        console.log(res)
                        console.log("this ome here");
                        start();
                    }
                )
           },1000)
        })
        
    })
    
}

function addRoles(){
    inquirer
        .prompt([

            {
                type:'input',
                message: 'Please enter a new role you would like to add',
                name: "NewRole"
            },

            {
                type:'input',
                message: 'Please enter the salary of this role',
                name: "salary"
            }, 
        

        ])

        .then((response) =>{
            getDepartment(response.NewRole,response.salary);
        })
}

function getDepartment(NewRole,salary){
    connection.query('SELECT * FROM department ',(err,results) =>{
        inquirer
            .prompt([
                {
                    type:'list',
                    message: 'Choose the employees department',
                    name: 'ChooseDepartment',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({name}) => {
                        choiceArray.push(name);
                        });
                        console.log(choiceArray);
                        return choiceArray;
            
                    }
            
                },

            ])

            .then((response) =>{
                    console.log(response, 'test'); 
                    let id;
                    connection.query('SELECT id from department where name = ?',[response.ChooseDepartment], (err,res) =>{
                        id = res[0].id;                       
                    })
        
                   setTimeout(function(){
                        connection.query(
                            'INSERT INTO role SET ?',
                            {
                                title:NewRole,
                                salary:salary,
                                department_id: id
                    
                            },
                    
                            (err, res) => {
                                if (err) throw err;
                                console.log(res)
                                console.log("this ome here");
                                start();
                            }
                        )
                   },1000)
                })
                
    })
}

// function getManager(){
//     con.query("SELECT * FROM customers", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//       });
// }


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });
  