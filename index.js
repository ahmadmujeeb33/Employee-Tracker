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
                addEmployee()
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

            let roleChosen = getRoles();
            console.log("rolechosen " + roleChosen);

            const query = connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: response.fname,
                    last_name: response.lname,
                    role_id: roleChosen

                }
            )
            // connection.end()

        })
}

async function getRoles(){
    let value;
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
            connection.query('SELECT id from role where title = ?',[response.role], (err,res) =>{
                value = res[0].id;
            })
            
        })
        return value
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
  